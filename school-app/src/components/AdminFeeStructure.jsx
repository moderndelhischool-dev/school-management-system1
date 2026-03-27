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
} from "firebase/firestore";

const CLASS_OPTIONS = [
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
  const [monthlyBusFee, setMonthlyBusFee] = useState("");
  const [examFee, setExamFee] = useState("");
  const [admissionFee, setAdmissionFee] = useState("");
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const canSave = useMemo(() => {
    return selectedSession && selectedClass && monthlyTuitionFee !== "";
  }, [selectedSession, selectedClass, monthlyTuitionFee]);

  const yearlyTuitionPreview = (Number(monthlyTuitionFee) || 0) * 12;
  const yearlyBusPreview = (Number(monthlyBusFee) || 0) * 12;

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
      const active = data.find((s) => s.isActive);
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
        setMonthlyBusFee("");
        setExamFee("");
        setAdmissionFee("");
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

      if (data.monthlyBusFee !== undefined) {
        setMonthlyBusFee(String(data.monthlyBusFee));
      } else {
        setMonthlyBusFee(
          String(Math.round((Number(data.busFee || 0) / 12) * 100) / 100),
        );
      }
      setExamFee(String(data.examFee ?? ""));
      setAdmissionFee(String(data.admissionFee ?? ""));
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

  const createSession = async () => {
    const trimmed = newSession.trim();
    if (!trimmed) {
      showMessage("Please enter session name (e.g. 2026-27).", "error");
      return;
    }

    const id = trimmed;
    setSaving(true);
    try {
      await setDoc(
        doc(db, "academicSessions", id),
        {
          name: trimmed,
          isActive: false,
          updatedAt: Timestamp.now(),
          createdAt: Timestamp.now(),
        },
        { merge: true },
      );
      setNewSession("");
      await loadSessions();
      setSelectedSession(id);
      showMessage("Session created successfully.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to create session.", "error");
    } finally {
      setSaving(false);
    }
  };

  const saveFeeStructure = async () => {
    if (!canSave) {
      showMessage("Please fill all fee fields.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        sessionId: selectedSession,
        className: selectedClass,
        monthlyTuitionFee: Number(monthlyTuitionFee) || 0,
        monthlyBusFee: Number(monthlyBusFee) || 0,
        tuitionFee: yearlyTuitionPreview,
        busFee: yearlyBusPreview,
        examFee: Number(examFee) || 0,
        admissionFee: Number(admissionFee) || 0,
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

      showMessage("Fee structure saved.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to save fee structure.", "error");
    } finally {
      setSaving(false);
    }
  };

  const markActiveSession = async () => {
    if (!selectedSession) {
      showMessage("Please select a session first.", "error");
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
              isActive: session.id === selectedSession,
              updatedAt: Timestamp.now(),
            },
            { merge: true },
          ),
        ),
      );

      await loadSessions();
      showMessage("Active session updated.");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update active session.", "error");
    } finally {
      setSaving(false);
    }
  };

  const applyFeesToExistingStudents = async () => {
    if (!selectedSession || !selectedClass || monthlyTuitionFee === "") {
      showMessage("Select session/class and set monthly tuition first.", "error");
      return;
    }

    const tuition = Number(monthlyTuitionFee) || 0;
    const exam = Number(examFee) || 0;
    const admission = Number(admissionFee) || 0;
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
        showMessage("No students found in selected class.", "error");
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

      for (const studentDoc of students) {
        const student = studentDoc.data();
        const usesBus = !!student.usesBus;
        const studentBusFee = Number(student.monthlyBusFee || 0);
        const defaultBus = Number(monthlyBusFee) || 0;
        const busApplied = usesBus ? (studentBusFee > 0 ? studentBusFee : defaultBus) : 0;
        const total = tuition + busApplied;
        const paidExisting = Number(student.paidFees || 0);
        const paid = Math.min(Math.max(paidExisting, 0), total);
        const pending = Math.max(total - paid, 0);
        const status = pending === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

        const studentRef = doc(db, "students", studentDoc.id);
        batch.set(
          studentRef,
          {
            sessionId: selectedSession,
            feeMonth: monthId,
            month: monthLabel,
            monthlyTuitionFeeApplied: tuition,
            monthlyBusFeeApplied: busApplied,
            examFeeApplied: exam,
            admissionFeeApplied: admission,
            totalFees: total,
            paidFees: paid,
            pendingFees: pending,
            feeStatus: status,
            selectedMonth: monthName,
            feeDate: Timestamp.now(),
            feesDate: dateOnly,
            approvedAt: status === "Completed" ? Timestamp.now() : null,
            updatedAt: Timestamp.now(),
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
            tuitionFee: tuition,
            busFee: busApplied,
            examFee: 0,
            admissionFee: 0,
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
      showMessage(`Mapped fees for ${processed} students.`);
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
      <h4 className="fw-bold mb-3">Fee Structure (Session + Class)</h4>
      <p className="mb-4 sub-text">
        Set monthly tuition and direct monthly bus fee per class. Student-wise
        bus fee override is also supported.
      </p>

      {msg && (
        <div className={`custom-msg ${msgType === "error" ? "error" : "ok"}`}>
          {msg}
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="field-label">Academic Session</label>
          <select
            className="form-select custom-input"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select Session</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name || s.id}
                {s.isActive ? " (Active)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="field-label">Create New Session</label>
          <div className="d-flex gap-2">
            <input
              className="form-control custom-input"
              placeholder="2026-27"
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
            />
            <button
              className="btn btn-sm btn-gold"
              onClick={createSession}
              disabled={saving}
            >
              Add
            </button>
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <button
            className="btn btn-sm btn-outline-light active-btn-wrap"
            onClick={markActiveSession}
            disabled={saving || !selectedSession}
          >
            Mark Selected Session Active
          </button>
        </div>
      </div>

      <div className="card section-card">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="field-label">Class</label>
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

          <div className="col-md-3">
            <label className="field-label">Tuition Fee (Monthly)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={monthlyTuitionFee}
              onChange={(e) => setMonthlyTuitionFee(e.target.value)}
            />
            <small className="preview-text">Yearly: Rs {yearlyTuitionPreview}</small>
          </div>

          <div className="col-md-3">
            <label className="field-label">Bus Fee (Monthly Default)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={monthlyBusFee}
              onChange={(e) => setMonthlyBusFee(e.target.value)}
            />
            <small className="preview-text">Yearly: Rs {yearlyBusPreview}</small>
          </div>

          <div className="col-md-3">
            <label className="field-label">Examination Fee (Optional)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={examFee}
              onChange={(e) => setExamFee(e.target.value)}
            />
            <small className="preview-text">Optional: update anytime</small>
          </div>

          <div className="col-md-3">
            <label className="field-label">Admission Fee (Optional)</label>
            <input
              type="number"
              className="form-control custom-input"
              placeholder="0"
              value={admissionFee}
              onChange={(e) => setAdmissionFee(e.target.value)}
            />
            <small className="preview-text">Optional: update anytime</small>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn apply-btn me-2"
            onClick={applyFeesToExistingStudents}
            disabled={applying || saving || loading}
          >
            {applying ? "Applying..." : "Apply to Existing Students"}
          </button>
          <button
            className="btn save-btn"
            onClick={saveFeeStructure}
            disabled={saving || loading}
          >
            {saving ? "Saving..." : "Save Fee Structure"}
          </button>
        </div>
      </div>

      <style>{`
        .fee-structure-wrapper {
          padding: 24px;
          border-radius: 18px;
        }
        .sub-text {
          opacity: 0.82;
          font-size: 14px;
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
        }
        .custom-input {
          border-radius: 10px;
          background: ${darkMode ? "#334155" : "#fff"};
          color: ${darkMode ? "#fff" : "#111827"};
          border: 1px solid ${darkMode ? "#475569" : "#ced4da"};
        }
        .custom-input:focus {
          border-color: #d4a24c;
          box-shadow: 0 0 0 0.15rem rgba(212, 162, 76, 0.25);
        }
        .btn-gold {
          background: #d4a24c;
          color: #0f4c6c;
          border: none;
          padding: 0 14px;
          border-radius: 10px;
          font-weight: 600;
        }
        .btn-gold:hover {
          background: #c18f2d;
          color: #0f4c6c;
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
          opacity: 0.8;
          margin-top: 4px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

export default AdminFeeStructure;
