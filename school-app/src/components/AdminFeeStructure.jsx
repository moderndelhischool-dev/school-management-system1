import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp,
  query,
  where,
  writeBatch,
  deleteField,
} from "firebase/firestore";
import {
  normalizeClassKey,
  monthlyTotalWithExam,
  normalizeExamMonthNames,
} from "../utils/feeBilling";

/** Firestore Timestamp, plain seconds, or Date → readable string */
function formatSessionDate(value) {
  if (value === null || value === undefined) return "—";
  try {
    if (typeof value?.toDate === "function") {
      return value.toDate().toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
    if (typeof value?.seconds === "number") {
      return new Date(value.seconds * 1000).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
    if (value instanceof Date) {
      return value.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
    return String(value);
  } catch {
    return "—";
  }
}

/** Calendar date only — e.g. Monday, 1 April 2025 */
function formatSessionDateCalendar(value) {
  if (value === null || value === undefined) return "—";
  try {
    let d;
    if (typeof value?.toDate === "function") d = value.toDate();
    else if (typeof value?.seconds === "number") {
      d = new Date(value.seconds * 1000);
    } else return "—";
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

/** Firestore value → YYYY-MM-DD for <input type="date" /> */
function dateInputFromFirestore(value) {
  if (value === null || value === undefined) return "";
  try {
    let d;
    if (typeof value?.toDate === "function") d = value.toDate();
    else if (typeof value?.seconds === "number") {
      d = new Date(value.seconds * 1000);
    } else return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch {
    return "";
  }
}

function timestampFromDateInput(isoDateString) {
  if (!isoDateString || !/^\d{4}-\d{2}-\d{2}$/.test(isoDateString)) {
    return null;
  }
  const d = new Date(`${isoDateString}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return Timestamp.fromDate(d);
}

const CLASS_OPTIONS = [
  "nursery",
  "lkg",
  "ukg",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

function AdminFeeStructure({ darkMode }) {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("1");
  const [monthlyTuitionFee, setMonthlyTuitionFee] = useState("");
  const [defaultScholarshipAmount, setDefaultScholarshipAmount] = useState("");
  const [busFeePerKm, setBusFeePerKm] = useState("");
  const [examFee, setExamFee] = useState("");
  const [examFeeMonths, setExamFeeMonths] = useState([]);
  const [admissionFee, setAdmissionFee] = useState("");
  const [sundryCharges, setSundryCharges] = useState("");
  const [newSessionStartDate, setNewSessionStartDate] = useState("");
  const [newSessionEndDate, setNewSessionEndDate] = useState("");
  const [sessionStartInput, setSessionStartInput] = useState("");
  const [sessionEndInput, setSessionEndInput] = useState("");

  const MONTH_CHECKBOXES = [
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

  const toggleExamMonth = (name) => {
    setExamFeeMonths((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name],
    );
  };
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const canSave = useMemo(() => {
    return selectedSession && selectedClass && monthlyTuitionFee !== "";
  }, [selectedSession, selectedClass, monthlyTuitionFee]);

  const yearlyTuitionPreview = (Number(monthlyTuitionFee) || 0) * 12;

  const selectedSessionRow = sessions.find((s) => s.id === selectedSession);
  const isSelectedSessionExpired = !!selectedSessionRow?.isExpired;

  const showMessage = (text, type = "success") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 2500);
  };

  const loadSessions = async () => {
    const snap = await getDocs(collection(db, "academicSessions"));
    const data = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    setSessions(data);

    if (!selectedSession && data.length) {
      const active = data.find((s) => s.isActive && !s.isExpired);
      setSelectedSession(active?.id || data[data.length - 1].id);
    }
  };

  const loadFeeConfig = async (sessionId, className) => {
    if (!sessionId || !className) return;
    setLoading(true);
    try {
      const configId = `${sessionId}_${className}`;
      const q = query(
        collection(db, "feeStructures"),
        where("__name__", "==", configId),
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        setMonthlyTuitionFee("");
        setDefaultScholarshipAmount("");
        setBusFeePerKm("");
        setExamFee("");
        setExamFeeMonths([]);
        setAdmissionFee("");
        setSundryCharges("");
        return;
      }

      const data = snap.docs[0].data();
      const storedMonthlyTuition = data.monthlyTuitionFee;

      if (storedMonthlyTuition !== undefined) {
        setMonthlyTuitionFee(String(storedMonthlyTuition));
      } else {
        setMonthlyTuitionFee(
          String(Math.round((Number(data.tuitionFee || 0) / 12) * 100) / 100),
        );
      }

      if (data.busFeePerKm !== undefined && data.busFeePerKm !== null) {
        setBusFeePerKm(String(data.busFeePerKm));
      } else {
        setBusFeePerKm("");
      }
      if (data.defaultScholarshipAmount !== undefined && data.defaultScholarshipAmount !== null) {
        setDefaultScholarshipAmount(String(data.defaultScholarshipAmount));
      } else {
        setDefaultScholarshipAmount("");
      }
      setExamFee(String(data.examFee ?? ""));
      setExamFeeMonths(
        Array.isArray(data.examFeeMonths) ? data.examFeeMonths : [],
      );
      setAdmissionFee(String(data.admissionFee ?? ""));
      setSundryCharges(String(data.sundryCharges ?? ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    loadFeeConfig(selectedSession, selectedClass);
  }, [selectedSession, selectedClass]);

  useEffect(() => {
    const row = sessions.find((s) => s.id === selectedSession);
    if (!row) {
      setSessionStartInput("");
      setSessionEndInput("");
      return;
    }
    setSessionStartInput(dateInputFromFirestore(row.sessionStartDate));
    setSessionEndInput(dateInputFromFirestore(row.sessionEndDate));
  }, [selectedSession, sessions]);

  const saveSessionCalendarDates = async () => {
    if (!selectedSession) {
      showMessage("Select a session first.", "error");
      return;
    }
    const startTs = timestampFromDateInput(sessionStartInput);
    const endTs = timestampFromDateInput(sessionEndInput);
    if (sessionStartInput && !startTs) {
      showMessage("Invalid start date.", "error");
      return;
    }
    if (sessionEndInput && !endTs) {
      showMessage("Invalid end date.", "error");
      return;
    }
    if (startTs && endTs && startTs.seconds > endTs.seconds) {
      showMessage("End date must be on or after the start date.", "error");
      return;
    }

    setSaving(true);
    try {
      const calPayload = {
        updatedAt: Timestamp.now(),
      };
      calPayload.sessionStartDate = startTs
        ? startTs
        : deleteField();
      calPayload.sessionEndDate = endTs ? endTs : deleteField();

      await setDoc(
        doc(db, "academicSessions", selectedSession),
        calPayload,
        { merge: true },
      );
      await loadSessions();
      showMessage("Session start / end dates saved.");
    } catch (error) {
      console.error(error);
      showMessage("Could not save session dates.", "error");
    } finally {
      setSaving(false);
    }
  };

  const createSession = async () => {
    const trimmed = newSession.trim();
    if (!trimmed) {
      showMessage("Enter a session identifier (e.g. 2026–2027).", "error");
      return;
    }

    const id = trimmed;
    const startTs = timestampFromDateInput(newSessionStartDate);
    const endTs = timestampFromDateInput(newSessionEndDate);
    if (newSessionStartDate && !startTs) {
      showMessage("Invalid planned start date.", "error");
      return;
    }
    if (newSessionEndDate && !endTs) {
      showMessage("Invalid planned end date.", "error");
      return;
    }
    if (startTs && endTs && startTs.seconds > endTs.seconds) {
      showMessage("End date must be on or after the start date.", "error");
      return;
    }

    setSaving(true);
    try {
      const sessionDoc = {
        name: trimmed,
        isActive: false,
        isExpired: false,
        expiredAt: null,
        updatedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
      };
      if (startTs) sessionDoc.sessionStartDate = startTs;
      if (endTs) sessionDoc.sessionEndDate = endTs;

      await setDoc(doc(db, "academicSessions", id), sessionDoc, { merge: true });
      setNewSession("");
      setNewSessionStartDate("");
      setNewSessionEndDate("");
      await loadSessions();
      setSelectedSession(id);
      showMessage("Session created.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to create session.", "error");
    } finally {
      setSaving(false);
    }
  };

  const saveFeeStructure = async () => {
    if (!canSave) {
      showMessage("Select session, class, and enter monthly tuition.", "error");
      return;
    }
    const sel = sessions.find((s) => s.id === selectedSession);
    if (sel?.isExpired) {
      showMessage(
        "This session has ended. You cannot save changes; select an active session.",
        "error",
      );
      return;
    }

    setSaving(true);
    try {
      const payload = {
        sessionId: selectedSession,
        className: selectedClass,
        monthlyTuitionFee: Number(monthlyTuitionFee) || 0,
        defaultScholarshipAmount: Math.max(
          0,
          Number(defaultScholarshipAmount) || 0,
        ),
        monthlyBusFee: 0,
        busFeePerKm: Number(busFeePerKm) || 0,
        tuitionFee: yearlyTuitionPreview,
        busFee: 0,
        examFee: Number(examFee) || 0,
        examFeeMonths,
        admissionFee: Number(admissionFee) || 0,
        sundryCharges: Number(sundryCharges) || 0,
        updatedAt: Timestamp.now(),
      };

      const configId = `${selectedSession}_${selectedClass}`;
      await setDoc(
        doc(db, "feeStructures", configId),
        {
          ...payload,
          createdAt: Timestamp.now(),
        },
        { merge: true },
      );

      showMessage("Fee structure saved successfully.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to save fee structure.", "error");
    } finally {
      setSaving(false);
    }
  };

  const markActiveSession = async () => {
    if (!selectedSession) {
      showMessage("Select an academic session first.", "error");
      return;
    }

    const picked = sessions.find((s) => s.id === selectedSession);
    if (picked?.isExpired) {
      showMessage("This session has ended. Activate a different session.", "error");
      return;
    }

    setSaving(true);
    try {
      await Promise.all(
        sessions.map((session) =>
          setDoc(
            doc(db, "academicSessions", session.id),
            {
              name: session.name || session.id,
              isActive: session.id === selectedSession && !session.isExpired,
              updatedAt: Timestamp.now(),
            },
            { merge: true },
          ),
        ),
      );

      await loadSessions();
      showMessage("Active session has been updated.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update active session.", "error");
    } finally {
      setSaving(false);
    }
  };

  const expireSelectedSession = async () => {
    if (!selectedSession) {
      showMessage("Select an academic session first.", "error");
      return;
    }
    const picked = sessions.find((s) => s.id === selectedSession);
    if (picked?.isExpired) {
      showMessage("This session is already ended.", "error");
      return;
    }
    const ok = window.confirm(
      "Mark this academic session as ended? It will be removed as the active session. You can still open it to view saved fee settings, but saving or applying fees will be disabled.",
    );
    if (!ok) return;

    setSaving(true);
    try {
      await setDoc(
        doc(db, "academicSessions", selectedSession),
        {
          isExpired: true,
          expiredAt: Timestamp.now(),
          isActive: false,
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );
      await loadSessions();
      showMessage("Session has been marked as ended.");
    } catch (error) {
      console.error(error);
      showMessage("Could not update session.", "error");
    } finally {
      setSaving(false);
    }
  };

  const applyFeesToExistingStudents = async () => {
    if (!selectedSession || !selectedClass || monthlyTuitionFee === "") {
      showMessage(
        "Select a session and class, and enter monthly tuition first.",
        "error",
      );
      return;
    }
    const selApply = sessions.find((s) => s.id === selectedSession);
    if (selApply?.isExpired) {
      showMessage(
        "This session has ended. Fee application is disabled for ended sessions.",
        "error",
      );
      return;
    }

    const tuition = Number(monthlyTuitionFee) || 0;
    const exam = Number(examFee) || 0;
    const admission = Number(admissionFee) || 0;
    const sundry = Number(sundryCharges) || 0;
    const now = new Date();
    const monthName = now.toLocaleString("default", { month: "long" });
    const monthLabel = `${monthName} ${now.getFullYear()}`;
    const monthId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const dateOnly = now.toISOString().slice(0, 10);
    setApplying(true);
    try {
      const studentsSnap = await getDocs(collection(db, "students"));
      const students = studentsSnap.docs.filter((d) => {
        const c = String(d.data().class || "").trim().toLowerCase();
        return c === selectedClass.toLowerCase() || c === `+${selectedClass.toLowerCase()}`;
      });

      if (!students.length) {
        showMessage("No students found for this class.", "error");
        return;
      }

      let processed = 0;
      let batch = writeBatch(db);
      let ops = 0;

      const commitBatchIfNeeded = async (force = false) => {
        if (ops >= 400 || (force && ops > 0)) {
          await batch.commit();
          batch = writeBatch(db);
          ops = 0;
        }
      };

      const ckApply = normalizeClassKey(selectedClass);
      const tuitionMapApply = { [ckApply]: tuition };
      const busMapApply = { [ckApply]: 0 };
      const busRatePerKmApply = { [ckApply]: Number(busFeePerKm) || 0 };
      const examFeeMapApply = { [ckApply]: Number(examFee) || 0 };
      const examMonthsMapApply = {
        [ckApply]: normalizeExamMonthNames(examFeeMonths),
      };
      const admissionMapApply = { [ckApply]: admission };
      const sundryMapApply = { [ckApply]: sundry };

      for (const studentDoc of students) {
        const student = studentDoc.data();
        const usesBus = !!student.usesBus;
        const merged = {
          ...student,
          class: student.class || selectedClass,
          usesBus,
        };
        const line = monthlyTotalWithExam(
          tuitionMapApply,
          busMapApply,
          examFeeMapApply,
          examMonthsMapApply,
          merged,
          monthId,
          busRatePerKmApply,
          admissionMapApply,
          sundryMapApply,
        );
        const total = line.total;
        const effTuition = line.tuition;
        const busApplied = line.bus;
        const examLine = line.exam;
        const admissionLine = line.admission || 0;
        const sundryLine = line.sundry || 0;
        const paidExisting = Number(student.paidFees || 0);
        const paid = Math.min(Math.max(paidExisting, 0), total);
        const pending = Math.max(total - paid, 0);
        const status = pending === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

        const studentRef = doc(db, "students", studentDoc.id);
        const grantSch = Number(student.scholarshipAmount || 0) > 0;
        const needsGrant =
          grantSch &&
          (!student.scholarshipSessionId ||
            String(student.scholarshipSessionId).trim() === "");

        batch.set(
          studentRef,
          {
            sessionId: selectedSession,
            feeMonth: monthId,
            month: monthLabel,
            monthlyTuitionFeeApplied: effTuition,
            monthlyBusFeeApplied: busApplied,
            examFeeApplied: examLine,
            admissionFeeApplied: admissionLine,
            sundryChargesApplied: sundryLine,
            totalFees: total,
            paidFees: paid,
            pendingFees: pending,
            feeStatus: status,
            selectedMonth: monthName,
            feeDate: Timestamp.now(),
            feesDate: dateOnly,
            approvedAt: status === "Completed" ? Timestamp.now() : null,
            updatedAt: Timestamp.now(),
            ...(needsGrant ? { scholarshipSessionId: selectedSession } : {}),
          },
          { merge: true },
        );
        ops += 1;

        const historyRef = doc(db, "students", studentDoc.id, "fees", monthId);
        batch.set(
          historyRef,
          {
            sessionId: selectedSession,
            className: selectedClass,
            feeMonth: monthId,
            month: monthName,
            amount: total,
            paid,
            status,
            tuitionFee: effTuition,
            busFee: busApplied,
            examFee: examLine,
            admissionFee: admissionLine,
            sundryCharges: sundryLine,
            usesBus,
            date: Timestamp.now(),
            updatedAt: Timestamp.now(),
          },
          { merge: true },
        );
        ops += 1;

        processed += 1;
        await commitBatchIfNeeded();
      }

      await commitBatchIfNeeded(true);
      showMessage(`Fees applied to ${processed} student(s).`);
    } catch (error) {
      console.error(error);
      showMessage("Failed to apply fees to students.", "error");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div
      className="fee-structure-wrapper"
      style={{
        background: darkMode ? "#0f172a" : "#F8FAFC",
        color: darkMode ? "#f1f5f9" : "#111827",
      }}
    >
      <h4 className="fw-bold mb-2 page-title">Session and class fee structure</h4>
     
      {msg && (
        <div className={`custom-msg ${msgType === "error" ? "error" : "ok"}`}>
          {msg}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="field-label">Academic session</label>
          <select
            className="form-select custom-input"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select session</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name || s.id}
                {s.isExpired ? " (Ended)" : s.isActive ? " (Active)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="field-label">Create new session</label>
            <div className="d-flex gap-2">
            <input
              className="form-control custom-input"
              placeholder="e.g. 2026–27"
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
            />
            <button
              className="btn btn-sm btn-gold"
              onClick={createSession}
              disabled={saving}
            >
              Create
            </button>
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column justify-content-end gap-2">
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-light active-btn-wrap flex-grow-1"
              onClick={markActiveSession}
              disabled={
                saving ||
                !selectedSession ||
                sessions.find((x) => x.id === selectedSession)?.isExpired
              }
            >
              Set as active
            </button>
            <button
              type="button"
              className="btn btn-sm expire-session-btn"
              onClick={expireSelectedSession}
              disabled={
                saving ||
                !selectedSession ||
                sessions.find((x) => x.id === selectedSession)?.isExpired
              }
            >
              End session
            </button>
          </div>
          
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <span className="field-label">
            Optional — dates applied when you create a new session (above)
          </span>
        </div>
        <div className="col-md-4">
          <label className="field-label" htmlFor="new-sess-start">
            Planned start date
          </label>
          <input
            id="new-sess-start"
            type="date"
            className="form-control custom-input"
            value={newSessionStartDate}
            onChange={(e) => setNewSessionStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="field-label" htmlFor="new-sess-end">
            Planned end date
          </label>
          <input
            id="new-sess-end"
            type="date"
            className="form-control custom-input"
            value={newSessionEndDate}
            onChange={(e) => setNewSessionEndDate(e.target.value)}
          />
        </div>
        
      </div>

      {selectedSession && selectedSessionRow && (
        <div
          className="session-details-panel mb-4"
          aria-labelledby="session-details-heading"
        >
          <h5 id="session-details-heading" className="session-details-title">
            Session details
          </h5>
          <p className="session-details-sub mb-3">
            Information for the session currently selected above. Switch the
            dropdown to view another session.
          </p>
          <div className="row g-2 g-md-3 session-details-grid">
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Session ID</div>
              <div className="session-detail-v">{selectedSessionRow.id}</div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Display name</div>
              <div className="session-detail-v">
                {selectedSessionRow.name || selectedSessionRow.id}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Status</div>
              <div className="session-detail-v">
                {selectedSessionRow.isExpired ? (
                  <span className="badge-status ended">Ended</span>
                ) : selectedSessionRow.isActive ? (
                  <span className="badge-status active">Active</span>
                ) : (
                  <span className="badge-status inactive">Inactive</span>
                )}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Session begins (calendar)</div>
              <div className="session-detail-v">
                {formatSessionDateCalendar(selectedSessionRow.sessionStartDate)}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Session ends (planned)</div>
              <div className="session-detail-v">
                {formatSessionDateCalendar(selectedSessionRow.sessionEndDate)}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Created</div>
              <div className="session-detail-v">
                {formatSessionDate(selectedSessionRow.createdAt)}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Last updated</div>
              <div className="session-detail-v">
                {formatSessionDate(selectedSessionRow.updatedAt)}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="session-detail-k">Ended on (archived)</div>
              <div className="session-detail-v">
                {selectedSessionRow.isExpired
                  ? formatSessionDate(selectedSessionRow.expiredAt)
                  : "—"}
              </div>
            </div>
          </div>

          <div className="session-calendar-edit mt-3 pt-3">
            <div className="session-detail-k mb-2">Set academic calendar dates</div>
            <p className="session-details-sub mb-2">
              Full day, month, and year for when this session is planned to
              start and finish. You can change these anytime (including after the
              session is ended, for accurate records).
            </p>
            <div className="row g-2 align-items-end">
              <div className="col-md-4">
                <label className="field-label" htmlFor="sess-start">
                  Start date
                </label>
                <input
                  id="sess-start"
                  type="date"
                  className="form-control custom-input"
                  value={sessionStartInput}
                  onChange={(e) => setSessionStartInput(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="field-label" htmlFor="sess-end">
                  End date
                </label>
                <input
                  id="sess-end"
                  type="date"
                  className="form-control custom-input"
                  value={sessionEndInput}
                  onChange={(e) => setSessionEndInput(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn save-btn w-100"
                  onClick={saveSessionCalendarDates}
                  disabled={saving || !selectedSession}
                >
                  {saving ? "Saving…" : "Save calendar dates"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card section-card">
        {isSelectedSessionExpired && (
          <div
            className="ended-session-banner"
            role="status"
          >
            This academic session has ended. You can review the values below;
            use &quot;Save&quot; or &quot;Apply&quot; only after you select an
            active session.
          </div>
        )}
        <fieldset
          className="fee-structure-fieldset"
          disabled={isSelectedSessionExpired}
        >
        <div className="row g-3">
          <div className="col-md-4">
            <label className="field-label">Monthly tuition fee (₹)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={monthlyTuitionFee}
              onChange={(e) => setMonthlyTuitionFee(e.target.value)}
            />
            <small className="preview-text">
              Annual equivalent: ₹{yearlyTuitionPreview}
            </small>
          </div>

          <div className="col-md-4">
            <label className="field-label">
              Default scholarship discount (₹ / month)
            </label>
            <input
              type="number"
              min="0"
              className="form-control custom-input"
              placeholder="0"
              value={defaultScholarshipAmount}
              onChange={(e) => setDefaultScholarshipAmount(e.target.value)}
            />
          
          </div>

          <div className="col-md-4">
            <label className="field-label">Class / Grade</label>
            <select
              className="form-select custom-input"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  Class {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="field-label">Transport rate (₹ / km / month)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="e.g. 50"
              value={busFeePerKm}
              onChange={(e) => setBusFeePerKm(e.target.value)}
            />
            
          </div>

          <div className="col-md-4">
            <label className="field-label">Exam fee (optional, ₹)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={examFee}
              onChange={(e) => setExamFee(e.target.value)}
            />
            
          </div>

          <div className="col-12">
            <label className="field-label">
              Months when examination fee applies
            </label>
            <p className="field-hint mb-2">
              Select one or more months. For all other months, this examination
              amount is not added to the fee bill.
            </p>
            <div className="d-flex flex-wrap gap-2 exam-month-pills">
              {MONTH_CHECKBOXES.map((m) => (
                <label
                  key={m}
                  className={`exam-month-chip ${examFeeMonths.includes(m) ? "on" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="d-none"
                    checked={examFeeMonths.includes(m)}
                    onChange={() => toggleExamMonth(m)}
                  />
                  {m.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <label className="field-label">Admission fee</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={admissionFee}
              onChange={(e) => setAdmissionFee(e.target.value)}
            />
            
          </div>
          <div className="col-md-4">
            <label className="field-label">Sundry charges</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={sundryCharges}
              onChange={(e) => setSundryCharges(e.target.value)}
            />
            
          </div>
        </div>
        </fieldset>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn apply-btn me-2"
            onClick={applyFeesToExistingStudents}
            disabled={applying || saving || loading || isSelectedSessionExpired}
          >
            {applying ? "Applying…" : "Apply to students in this class"}
          </button>
          <button
            className="btn save-btn"
            onClick={saveFeeStructure}
            disabled={saving || loading || isSelectedSessionExpired}
          >
            {saving ? "Saving…" : "Save fee structure"}
          </button>
        </div>
      </div>

      <style>{`
        .fee-structure-wrapper {
          padding: 24px;
          border-radius: 18px;
        }
        .fee-structure-fieldset {
          border: none;
          margin: 0;
          padding: 0;
          min-width: 0;
        }
        .ended-session-banner {
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
          font-size: 13px;
          line-height: 1.45;
          background: ${darkMode ? "rgba(127, 29, 29, 0.35)" : "#fef2f2"};
          color: ${darkMode ? "#fecaca" : "#991b1b"};
          border: 1px solid ${darkMode ? "rgba(248, 113, 113, 0.35)" : "#fecaca"};
        }
        .session-help {
          font-size: 11px;
          line-height: 1.4;
          color: ${darkMode ? "#94a3b8" : "#64748b"};
        }
        .expire-session-btn {
          border-radius: 10px;
          font-weight: 600;
          border: 1px solid ${darkMode ? "#f87171" : "#dc2626"};
          color: ${darkMode ? "#fecaca" : "#b91c1c"};
          background: ${darkMode ? "rgba(127, 29, 29, 0.25)" : "#fff1f2"};
        }
        .expire-session-btn:hover:not(:disabled) {
          background: ${darkMode ? "rgba(127, 29, 29, 0.45)" : "#ffe4e6"};
        }
        .expire-session-btn:disabled {
          opacity: 0.45;
        }
        .session-details-panel {
          border-radius: 14px;
          padding: 16px 18px;
          border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
          background: ${darkMode ? "#1e293b" : "#ffffff"};
          box-shadow: ${darkMode ? "0 8px 24px rgba(0,0,0,0.2)" : "0 8px 24px rgba(15,76,108,0.08)"};
        }
        .session-details-title {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: ${darkMode ? "#f8fafc" : "#0f172a"};
        }
        .session-details-sub {
          font-size: 12px;
          margin: 0;
          color: ${darkMode ? "#94a3b8" : "#64748b"};
        }
        .session-detail-k {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: ${darkMode ? "#94a3b8" : "#64748b"};
          margin-bottom: 4px;
        }
        .session-detail-v {
          font-size: 14px;
          font-weight: 600;
          color: ${darkMode ? "#f1f5f9" : "#0f172a"};
          word-break: break-word;
        }
        .badge-status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }
        .badge-status.active {
          background: ${darkMode ? "rgba(34, 197, 94, 0.2)" : "#dcfce7"};
          color: ${darkMode ? "#86efac" : "#166534"};
        }
        .badge-status.ended {
          background: ${darkMode ? "rgba(248, 113, 113, 0.2)" : "#fee2e2"};
          color: ${darkMode ? "#fca5a5" : "#991b1b"};
        }
        .badge-status.inactive {
          background: ${darkMode ? "rgba(148, 163, 184, 0.2)" : "#f1f5f9"};
          color: ${darkMode ? "#cbd5e1" : "#475569"};
        }
        .page-title {
          color: ${darkMode ? "#f8fafc" : "#0f172a"};
          letter-spacing: -0.02em;
        }
        .sub-text {
          font-size: 14px;
          line-height: 1.55;
          color: ${darkMode ? "#cbd5e1" : "#334155"};
          max-width: 52rem;
        }
        .custom-msg {
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 16px;
          font-size: 14px;
        }
        .custom-msg.ok {
          background: ${darkMode ? "#064e3b" : "#dcfce7"};
          color: ${darkMode ? "#a7f3d0" : "#14532d"};
        }
        .custom-msg.error {
          background: ${darkMode ? "#7f1d1d" : "#fee2e2"};
          color: ${darkMode ? "#fecaca" : "#991b1b"};
        }
        .section-card {
          border: none;
          border-radius: 16px;
          padding: 20px;
          background: ${darkMode ? "#1e293b" : "#ffffff"};
          box-shadow: ${
            darkMode
              ? "0 12px 30px rgba(0,0,0,0.45)"
              : "0 12px 30px rgba(15,76,108,0.12)"
          };
        }
        .field-label {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
          color: ${darkMode ? "#f1f5f9" : "#0f172a"};
        }
        .field-hint {
          font-size: 12px;
          line-height: 1.5;
          color: ${darkMode ? "#94a3b8" : "#475569"};
          margin-bottom: 0;
        }
        .custom-input {
          border-radius: 10px;
          background: ${darkMode ? "#334155" : "#fff"};
          color: ${darkMode ? "#fff" : "#111827"};
          border: 1px solid ${darkMode ? "#475569" : "#ced4da"};
        }
        .custom-input:focus {
          border-color: #3d8ba8;
          box-shadow: 0 0 0 0.2rem rgba(14, 76, 108, 0.22);
        }
        .btn-gold {
          background: linear-gradient(135deg, #0f4c6c, #1a6f8a);
          color: #f8fafc;
          border: none;
          padding: 0 14px;
          border-radius: 10px;
          font-weight: 600;
        }
        .btn-gold:hover {
          background: linear-gradient(135deg, #0c3f56, #155a72);
          color: #fff;
        }
        .active-btn-wrap {
          border-radius: 10px;
          color: ${darkMode ? "#f8fafc" : "#0f4c6c"};
          border-color: ${darkMode ? "#475569" : "#0f4c6c"};
          width: 100%;
        }
        .save-btn {
          background: linear-gradient(135deg, #0f4c6c, #1b5e84);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          font-weight: 600;
        }
        .apply-btn {
          background: linear-gradient(135deg, #1f2937, #334155);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          font-weight: 600;
        }
        .preview-text {
          font-size: 12px;
          margin-top: 4px;
          display: inline-block;
          color: ${darkMode ? "#94a3b8" : "#64748b"};
        }
        .exam-month-pills {
          margin-top: 6px;
        }
        .exam-month-chip {
          cursor: pointer;
          font-size: 12px;
          padding: 7px 12px;
          border-radius: 999px;
          border: 2px solid ${darkMode ? "#475569" : "#cbd5e1"};
          background: ${darkMode ? "#1e293b" : "#ffffff"};
          color: ${darkMode ? "#e2e8f0" : "#334155"};
          user-select: none;
          font-weight: 500;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .exam-month-chip:hover {
          border-color: ${darkMode ? "#94a3b8" : "#64748b"};
        }
        .exam-month-chip.on {
          border: 2px solid #0f4c6c;
          background: ${darkMode ? "rgba(14, 76, 108, 0.45)" : "#eff6ff"};
          color: ${darkMode ? "#f8fafc" : "#0f172a"};
          font-weight: 700;
          box-shadow: 0 1px 0 rgba(15, 23, 42, 0.06);
        }
      `}</style>
    </div>
  );
}

export default AdminFeeStructure;
