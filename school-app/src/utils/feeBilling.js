import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

const MONTHS = [
  "!invalid",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function normalizeClassKey(cls) {
  return String(cls || "")
    .replace("+", "")
    .trim()
    .toLowerCase();
}

export function currentMonthKey(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return `${y}-${String(m).padStart(2, "0")}`;
}

export function nextMonthKey(feeMonthId) {
  const [y, m] = feeMonthId.split("-").map(Number);
  let ny = y;
  let nm = m + 1;
  if (nm > 12) {
    nm = 1;
    ny += 1;
  }
  return `${ny}-${String(nm).padStart(2, "0")}`;
}

export function monthNameFromKey(feeMonthId) {
  const m = Number(feeMonthId.split("-")[1]);
  return MONTHS[m] || "Unknown";
}

export async function loadActiveSessionClassTuitionBusMap(db) {
  const sessionsSnap = await getDocs(collection(db, "academicSessions"));
  const active = sessionsSnap.docs.find((d) => d.data().isActive);
  const activeSessionId = active?.id || "";

  const feeSnap = await getDocs(collection(db, "feeStructures"));
  const tuitionMap = {};
  const busMap = {};

  feeSnap.docs.forEach((d) => {
    const data = d.data() || {};
    if (activeSessionId && data.sessionId !== activeSessionId) return;

    const classKey = normalizeClassKey(data.className);
    if (!classKey) return;

    const monthlyTuition =
      Number(data.monthlyTuitionFee) ||
      Math.round((Number(data.tuitionFee || 0) / 12) * 100) / 100;
    const monthlyBus =
      Number(data.monthlyBusFee) ||
      Math.round((Number(data.busFee || 0) / 12) * 100) / 100;

    tuitionMap[classKey] = monthlyTuition;
    busMap[classKey] = monthlyBus;
  });

  return { activeSessionId, tuitionMap, busMap };
}

export function monthlyBaseForStudent(tuitionMap, busMap, student) {
  const ck = normalizeClassKey(student.class);
  const tuition = Number(tuitionMap[ck] || 0);
  const defaultBus = Number(busMap[ck] || 0);
  const usesBus = !!student.usesBus;
  const busOverride = Number(student.monthlyBusFee || 0);
  const bus = usesBus ? (busOverride > 0 ? busOverride : defaultBus) : 0;
  return { tuition, bus, total: tuition + bus };
}

/** Active fee structure + carry-forward — expected cycle total for display/sync checks */
export function scheduleCycleTotalForStudent(tuitionMap, busMap, student) {
  const { total } = monthlyBaseForStudent(tuitionMap, busMap, student);
  const carry = Number(student.carryForwardTotal || 0);
  return total + carry;
}

/**
 * When Firestore totalFees is far below the fee-structure total, treat as stale
 * (e.g. ₹200 saved vs ₹6000 tuition) and show the schedule-based total.
 */
export function resolveDisplayTotalFees(student, tuitionMap, busMap) {
  const schedule = scheduleCycleTotalForStudent(tuitionMap, busMap, student);
  const hasStored =
    student.totalFees !== undefined &&
    student.totalFees !== null &&
    student.totalFees !== "";
  if (!hasStored) return schedule;
  const stored = Number(student.totalFees) || 0;
  const tinyVsSchedule =
    schedule > 0 &&
    stored < schedule &&
    stored <= Math.max(200, schedule * 0.05);
  if (tinyVsSchedule) return schedule;
  return stored;
}

export function resolveDisplayPendingFees(student, tuitionMap, busMap) {
  const total = resolveDisplayTotalFees(student, tuitionMap, busMap);
  const paid = Number(student.paidFees || 0);
  return Math.max(total - paid, 0);
}

export function proportionalPendingSplit(amount, tuitionFee, busFee, paid) {
  const amt = Number(amount) || 0;
  const t = Number(tuitionFee) || 0;
  const b = Number(busFee) || 0;
  const p = Math.min(Math.max(Number(paid) || 0, 0), amt);
  const pend = Math.max(amt - p, 0);
  if (pend <= 0) {
    return { tuitionPending: 0, busPending: 0, totalPending: 0 };
  }
  if (amt <= 0) {
    return { tuitionPending: pend, busPending: 0, totalPending: pend };
  }
  const ratioT = t / amt;
  const ratioB = b / amt;
  const tuitionPending = Math.round(pend * ratioT * 100) / 100;
  const busPending = Math.round(pend * ratioB * 100) / 100;
  return {
    tuitionPending,
    busPending,
    totalPending: pend,
  };
}

export async function rollStudentToNextMonthClean(db, studentId, student) {
  const { tuitionMap, busMap, activeSessionId } =
    await loadActiveSessionClassTuitionBusMap(db);
  const { tuition, bus, total } = monthlyBaseForStudent(
    tuitionMap,
    busMap,
    student,
  );

  const prevFeeMonth = student.feeMonth || currentMonthKey();
  const nextId = nextMonthKey(prevFeeMonth);
  const nextName = monthNameFromKey(nextId);
  const now = Timestamp.now();
  const y = Number(nextId.split("-")[0]);
  const monthLabel = `${nextName} ${y}`;
  const dateOnly = new Date().toISOString().slice(0, 10);

  const studentRef = doc(db, "students", studentId);

  await setDoc(
    doc(db, "students", studentId, "fees", prevFeeMonth),
    {
      amount: Number(student.totalFees) || 0,
      paid: Number(student.totalFees) || 0,
      status: "Completed",
      month: student.selectedMonth || monthNameFromKey(prevFeeMonth),
      tuitionFee:
        Number(student.monthlyTuitionFeeApplied) ||
        monthlyBaseForStudent(tuitionMap, busMap, student).tuition,
      busFee: student.usesBus
        ? Number(student.monthlyBusFeeApplied ?? student.monthlyBusFee ?? 0)
        : 0,
      date: now,
      updatedAt: now,
    },
    { merge: true },
  );

  await setDoc(
    doc(db, "students", studentId, "fees", nextId),
    {
      sessionId: activeSessionId || student.sessionId || "",
      feeMonth: nextId,
      month: nextName,
      amount: total,
      paid: 0,
      status: "Pending",
      tuitionFee: tuition,
      busFee: bus,
      carryForwardTuition: 0,
      carryForwardBus: 0,
      carryFromMonth: "",
      date: now,
      updatedAt: now,
    },
    { merge: true },
  );

  await updateDoc(studentRef, {
    sessionId: activeSessionId || student.sessionId || "",
    feeMonth: nextId,
    selectedMonth: nextName,
    month: monthLabel,
    monthlyTuitionFeeApplied: tuition,
    monthlyBusFeeApplied: bus,
    carryForwardTuition: 0,
    carryForwardBus: 0,
    carryForwardTotal: 0,
    carryFromMonth: "",
    currentMonthTuition: tuition,
    currentMonthBus: bus,
    totalFees: total,
    paidFees: 0,
    pendingFees: total,
    feeStatus: "Pending",
    feeDate: now,
    feesDate: dateOnly,
    approvedAt: null,
    updatedAt: now,
  });
}

export async function advanceOneMonthWithCarryForward(db, studentId, student) {
  const { tuitionMap, busMap, activeSessionId } =
    await loadActiveSessionClassTuitionBusMap(db);

  const feeMonth = student.feeMonth || currentMonthKey();
  const feeSnap = await getDoc(doc(db, "students", studentId, "fees", feeMonth));
  const feeData = feeSnap.exists() ? feeSnap.data() : {};

  const amt = Number(feeData.amount || student.totalFees || 0);
  const paid = Number(feeData.paid ?? student.paidFees ?? 0);
  const tPart = Number(
    feeData.tuitionFee ??
      student.monthlyTuitionFeeApplied ??
      monthlyBaseForStudent(tuitionMap, busMap, student).tuition,
  );
  const bPart = Number(
    feeData.busFee ??
      (student.usesBus
        ? student.monthlyBusFeeApplied ?? student.monthlyBusFee ?? 0
        : 0),
  );

  const { tuitionPending, busPending, totalPending } = proportionalPendingSplit(
    amt,
    tPart,
    bPart,
    paid,
  );

  const nextId = nextMonthKey(feeMonth);
  const nextName = monthNameFromKey(nextId);
  const { tuition: newT, bus: newB, total: newTotal } = monthlyBaseForStudent(
    tuitionMap,
    busMap,
    student,
  );

  const grandTotal =
    Math.round((totalPending + newTotal) * 100) / 100;
  const carryT = Math.round(tuitionPending * 100) / 100;
  const carryB = Math.round(busPending * 100) / 100;

  const mergedTuitionLine = Math.round((carryT + newT) * 100) / 100;
  const mergedBusLine = Math.round((carryB + newB) * 100) / 100;

  const now = Timestamp.now();
  const y = Number(nextId.split("-")[0]);
  const monthLabel = `${nextName} ${y}`;
  const dateOnly = new Date().toISOString().slice(0, 10);
  const studentRef = doc(db, "students", studentId);

  await setDoc(
    doc(db, "students", studentId, "fees", feeMonth),
    {
      amount: amt,
      paid,
      status: totalPending <= 0 ? "Completed" : "Pending",
      month: student.selectedMonth || monthNameFromKey(feeMonth),
      tuitionFee: tPart,
      busFee: bPart,
      updatedAt: now,
    },
    { merge: true },
  );

  await setDoc(
    doc(db, "students", studentId, "fees", nextId),
    {
      sessionId: activeSessionId || student.sessionId || "",
      feeMonth: nextId,
      month: nextName,
      amount: grandTotal,
      paid: 0,
      status: "Pending",
      tuitionFee: mergedTuitionLine,
      busFee: mergedBusLine,
      carryForwardTuition: carryT,
      carryForwardBus: carryB,
      carryFromMonth: feeMonth,
      prevMonthBreakdown: {
        tuitionFee: tPart,
        busFee: bPart,
        tuitionPending: carryT,
        busPending: carryB,
        totalPending,
      },
      currentMonthBreakdown: {
        tuition: newT,
        bus: newB,
      },
      date: now,
      updatedAt: now,
    },
    { merge: true },
  );

  await updateDoc(studentRef, {
    sessionId: activeSessionId || student.sessionId || "",
    feeMonth: nextId,
    selectedMonth: nextName,
    month: monthLabel,
    monthlyTuitionFeeApplied: newT,
    monthlyBusFeeApplied: newB,
    carryForwardTuition: carryT,
    carryForwardBus: carryB,
    carryForwardTotal: Math.round((carryT + carryB) * 100) / 100,
    carryFromMonth: feeMonth,
    currentMonthTuition: newT,
    currentMonthBus: newB,
    totalFees: grandTotal,
    paidFees: 0,
    pendingFees: grandTotal,
    feeStatus: "Pending",
    feeDate: now,
    feesDate: dateOnly,
    approvedAt: null,
    updatedAt: now,
  });
}

export async function catchUpStudentBillingMonth(db, studentId, student) {
  const target = currentMonthKey();

  if (!student.feeMonth) {
    await updateDoc(doc(db, "students", studentId), {
      feeMonth: target,
      updatedAt: Timestamp.now(),
    });
  }

  for (let i = 0; i < 24; i += 1) {
    const snap = await getDoc(doc(db, "students", studentId));
    if (!snap.exists()) break;
    const s = { id: studentId, ...snap.data() };
    const feeMonth = s.feeMonth || target;
    if (feeMonth >= target) break;
    await advanceOneMonthWithCarryForward(db, studentId, s);
  }
}

export async function autoRollAfterFullPayment(db, studentEmail) {
  const ref = doc(db, "students", studentEmail);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const s = { id: studentEmail, ...snap.data() };
  if (s.feeStatus !== "Completed") return;

  await rollStudentToNextMonthClean(db, studentEmail, s);
}
