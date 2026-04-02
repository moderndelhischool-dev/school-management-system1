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

/** Normalize fee-structure month labels to canonical English names (January…December). */
export function normalizeExamMonthNames(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((raw) => {
      const s = String(raw || "").trim();
      const hit = MONTHS.find((m) => m.toLowerCase() === s.toLowerCase());
      return hit || null;
    })
    .filter(Boolean);
}

export function isExamMonthForStudent(examMonthsMap, student, feeMonthKey) {
  const ck = normalizeClassKey(student.class);
  const list = examMonthsMap[ck];
  if (!list || !list.length) return false;
  const name = monthNameFromKey(feeMonthKey);
  return list.some((m) => String(m) === name);
}

export function examFeeForMonth(examFeeMap, examMonthsMap, student, feeMonthKey) {
  if (!isExamMonthForStudent(examMonthsMap, student, feeMonthKey)) return 0;
  const ck = normalizeClassKey(student.class);
  return Number(examFeeMap[ck] || 0);
}

export function monthlyTotalWithExam(
  tuitionMap,
  busMap,
  examFeeMap,
  examMonthsMap,
  student,
  feeMonthKey,
  busRatePerKmMap = {},
) {
  const base = monthlyBaseForStudent(
    tuitionMap,
    busMap,
    student,
    busRatePerKmMap,
  );
  const exam = examFeeForMonth(
    examFeeMap || {},
    examMonthsMap || {},
    student,
    feeMonthKey,
  );
  return { ...base, exam, total: base.total + exam };
}

export async function loadActiveSessionClassTuitionBusMap(db) {
  const sessionsSnap = await getDocs(collection(db, "academicSessions"));
  const active = sessionsSnap.docs.find((d) => {
    const x = d.data() || {};
    return x.isActive && !x.isExpired;
  });
  const activeSessionId = active?.id || "";

  const feeSnap = await getDocs(collection(db, "feeStructures"));
  const tuitionMap = {};
  const busMap = {};
  const busRatePerKmMap = {};
  const examFeeMap = {};
  const examMonthsMap = {};
  const scholarshipMap = {};

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
    busRatePerKmMap[classKey] = Number(data.busFeePerKm) || 0;
    examFeeMap[classKey] = Number(data.examFee) || 0;
    examMonthsMap[classKey] = normalizeExamMonthNames(data.examFeeMonths);
    scholarshipMap[classKey] =
      Number(data.defaultScholarshipAmount ?? data.scholarshipAmount ?? 0) || 0;
  });

  return {
    activeSessionId,
    tuitionMap,
    busMap,
    busRatePerKmMap,
    examFeeMap,
    examMonthsMap,
    scholarshipMap,
  };
}


export function scholarshipAppliesForCurrentSession(student) {
  const grant = student.scholarshipSessionId;
  const cur = student.sessionId;
  if (grant === undefined || grant === null || grant === "") return true;
  if (cur === undefined || cur === null || cur === "") return true;
  return String(grant) === String(cur);
}


export function monthlyBaseForStudent(
  tuitionMap,
  busMap,
  student,
  busRatePerKmMap = {},
) {
  const ck = normalizeClassKey(student.class);
  const rawTuition = Number(tuitionMap[ck] || 0);
  const sessionOk = scholarshipAppliesForCurrentSession(student);
  let scholarshipAmt = Math.max(
    0,
    Number(student.scholarshipAmount ?? student.scholarshipMonthly ?? 0),
  );
  let sp = Math.min(
    100,
    Math.max(0, Number(student.scholarshipPercent ?? student.scholarship ?? 0)),
  );
  if (!sessionOk) {
    scholarshipAmt = 0;
    sp = 0;
  }
  let tuition;
  if (scholarshipAmt > 0) {
    tuition =
      Math.max(0, Math.round((rawTuition - scholarshipAmt) * 100) / 100);
  } else {
    tuition = Math.round(rawTuition * (1 - sp / 100) * 100) / 100;
  }
  const defaultBus = Number(busMap[ck] || 0);
  const ratePerKm = Number(busRatePerKmMap[ck] || 0);
  const km = Number(student.busDistanceKm ?? student.busKm ?? 0);
  const usesBus = !!student.usesBus;
  const manualBus = Number(student.monthlyBusFee || 0);

  let bus = 0;
  if (!usesBus) {
    bus = 0;
  } else if (ratePerKm > 0 && km > 0) {
    bus = Math.round(km * ratePerKm * 100) / 100;
  } else if (manualBus > 0) {
    bus = manualBus;
  } else {
    bus = defaultBus;
  }

  return {
    tuition,
    bus,
    total: tuition + bus,
    tuitionBeforeScholarship: rawTuition,
    scholarshipPercentApplied: sp,
    scholarshipAmountApplied:
      sessionOk && scholarshipAmt > 0
        ? Math.min(scholarshipAmt, rawTuition)
        : 0,
  };
}

export function scheduleCycleTotalForStudent(
  tuitionMap,
  busMap,
  student,
  examFeeMap = {},
  examMonthsMap = {},
  busRatePerKmMap = {},
) {
  const feeMonthKey = student.feeMonth || currentMonthKey();
  const { total } = monthlyTotalWithExam(
    tuitionMap,
    busMap,
    examFeeMap,
    examMonthsMap,
    student,
    feeMonthKey,
    busRatePerKmMap,
  );
  const carry = Number(student.carryForwardTotal || 0);
  return total + carry;
}


export function resolveDisplayTotalFees(
  student,
  tuitionMap,
  busMap,
  examFeeMap = {},
  examMonthsMap = {},
  busRatePerKmMap = {},
) {
  const schedule = scheduleCycleTotalForStudent(
    tuitionMap,
    busMap,
    student,
    examFeeMap,
    examMonthsMap,
    busRatePerKmMap,
  );
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

export function resolveDisplayPendingFees(
  student,
  tuitionMap,
  busMap,
  examFeeMap = {},
  examMonthsMap = {},
  busRatePerKmMap = {},
) {
  const total = resolveDisplayTotalFees(
    student,
    tuitionMap,
    busMap,
    examFeeMap,
    examMonthsMap,
    busRatePerKmMap,
  );
  const paid = Number(student.paidFees || 0);
  return Math.max(total - paid, 0);
}

export function proportionalPendingSplit(
  amount,
  tuitionFee,
  busFee,
  paid,
  examFee = 0,
) {
  const amt = Number(amount) || 0;
  const t = Number(tuitionFee) || 0;
  const b = Number(busFee) || 0;
  const e = Number(examFee) || 0;
  const sum = t + b + e;
  const p = Math.min(Math.max(Number(paid) || 0, 0), amt);
  const pend = Math.max(amt - p, 0);
  if (pend <= 0) {
    return {
      tuitionPending: 0,
      busPending: 0,
      examPending: 0,
      totalPending: 0,
    };
  }
  if (sum <= 0) {
    return {
      tuitionPending: pend,
      busPending: 0,
      examPending: 0,
      totalPending: pend,
    };
  }
  const ratioT = t / sum;
  const ratioB = b / sum;
  const ratioE = e / sum;
  return {
    tuitionPending: Math.round(pend * ratioT * 100) / 100,
    busPending: Math.round(pend * ratioB * 100) / 100,
    examPending: Math.round(pend * ratioE * 100) / 100,
    totalPending: pend,
  };
}

export async function rollStudentToNextMonthClean(db, studentId, student) {
  const {
    tuitionMap,
    busMap,
    busRatePerKmMap,
    examFeeMap,
    examMonthsMap,
    activeSessionId,
  } = await loadActiveSessionClassTuitionBusMap(db);
  const prevFeeMonth = student.feeMonth || currentMonthKey();
  const nextId = nextMonthKey(prevFeeMonth);
  const nextName = monthNameFromKey(nextId);
  const { tuition, bus, exam, total } = monthlyTotalWithExam(
    tuitionMap,
    busMap,
    examFeeMap,
    examMonthsMap,
    student,
    nextId,
    busRatePerKmMap || {},
  );
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
        monthlyBaseForStudent(tuitionMap, busMap, student, busRatePerKmMap || {})
          .tuition,
      busFee: student.usesBus
        ? Number(student.monthlyBusFeeApplied ?? student.monthlyBusFee ?? 0)
        : 0,
      examFee: Number(student.examFeeApplied || 0),
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
      examFee: exam,
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
    examFeeApplied: exam,
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
  const {
    tuitionMap,
    busMap,
    busRatePerKmMap,
    examFeeMap,
    examMonthsMap,
    activeSessionId,
  } = await loadActiveSessionClassTuitionBusMap(db);

  const feeMonth = student.feeMonth || currentMonthKey();
  const feeSnap = await getDoc(doc(db, "students", studentId, "fees", feeMonth));
  const feeData = feeSnap.exists() ? feeSnap.data() : {};

  const amt = Number(feeData.amount || student.totalFees || 0);
  const paid = Number(feeData.paid ?? student.paidFees ?? 0);
  const tPart = Number(
    feeData.tuitionFee ??
      student.monthlyTuitionFeeApplied ??
      monthlyBaseForStudent(tuitionMap, busMap, student, busRatePerKmMap || {})
        .tuition,
  );
  const bPart = Number(
    feeData.busFee ??
      (student.usesBus
        ? student.monthlyBusFeeApplied ?? student.monthlyBusFee ?? 0
        : 0),
  );
  const ePart = Number(feeData.examFee ?? student.examFeeApplied ?? 0);

  const { tuitionPending, busPending, examPending, totalPending } =
    proportionalPendingSplit(amt, tPart, bPart, paid, ePart);

  const nextId = nextMonthKey(feeMonth);
  const nextName = monthNameFromKey(nextId);
  const { tuition: newT, bus: newB, exam: newE, total: newTotal } =
    monthlyTotalWithExam(
      tuitionMap,
      busMap,
      examFeeMap,
      examMonthsMap,
      student,
      nextId,
      busRatePerKmMap || {},
    );

  const grandTotal = Math.round((totalPending + newTotal) * 100) / 100;
  const carryT = Math.round(tuitionPending * 100) / 100;
  const carryB = Math.round(busPending * 100) / 100;
  const carryE = Math.round(examPending * 100) / 100;

  const mergedTuitionLine = Math.round((carryT + newT) * 100) / 100;
  const mergedBusLine = Math.round((carryB + newB) * 100) / 100;
  const mergedExamLine = Math.round((carryE + newE) * 100) / 100;

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
      examFee: ePart,
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
      examFee: mergedExamLine,
      carryForwardTuition: carryT,
      carryForwardBus: carryB,
      carryForwardExam: carryE,
      carryFromMonth: feeMonth,
      prevMonthBreakdown: {
        tuitionFee: tPart,
        busFee: bPart,
        examFee: ePart,
        tuitionPending: carryT,
        busPending: carryB,
        examPending: carryE,
        totalPending,
      },
      currentMonthBreakdown: {
        tuition: newT,
        bus: newB,
        exam: newE,
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
    examFeeApplied: newE,
    carryForwardTuition: carryT,
    carryForwardBus: carryB,
    carryForwardTotal: Math.round((carryT + carryB + carryE) * 100) / 100,
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
