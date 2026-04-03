import { useState, useEffect, useMemo } from "react";
import { auth, db, storage } from "../firebase/firebase";
import {
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { jsPDF } from "jspdf";

/** Sample PDF download — filename shows the roll + __ naming pattern */
function downloadDemoNamingPdf() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Demo — certificate file naming (sample)", 14, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  const body =
    "Ye sample PDF sirf naam (naming) samjhane ke liye hai.\n\n" +
    "Auto bulk mein file ka naam roll number se shuru hona chahiye.\n\n" +
    "Examples:\n" +
    "  • 101.pdf  →  roll 101 wale student ko jayega\n" +
    "  • 101__Bonafide.pdf  →  roll 101; portal par Bonafide.pdf jaisa dikhega\n" +
    "  • Do underscore (__) roll aur title ke beech mein\n\n" +
    "Steps:\n" +
    "1. Green box mein CLASS select karo.\n" +
    "2. Apni files ko isi pattern par rename karo.\n" +
    "3. Saari files select karke Upload karo.\n\n" +
    "Roll number file name mein aur Add Student mein same hona chahiye.\n" +
    "Download filename: 101__Demo_Certificate.pdf (example).";
  const lines = doc.splitTextToSize(body, 182);
  doc.text(lines, 14, 30);
  doc.save("101__Demo_Certificate.pdf");
}

/** PDF, Word, images, etc. — school documents */
const MAX_BYTES = 15 * 1024 * 1024;

function safeStorageSegment(name) {
  return String(name || "file").replace(/[^a-zA-Z0-9._-]/g, "_");
}

function awaitUploadTask(task) {
  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      () => {},
      (err) => reject(err),
      () => resolve(task.snapshot),
    );
  });
}

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms),
    ),
  ]);
}

const UPLOAD_TIMEOUT_MS = 3 * 60 * 1000;
const FIRESTORE_SAVE_TIMEOUT_MS = 90 * 1000;

function newRow() {
  return {
    key: crypto.randomUUID(),
    studentId: "",
    file: null,
    /** certificateRequests doc id — optional link so student sees which file matched */
    relatedRequestId: "",
  };
}

/** KG–12 friendly sort for class dropdown */
function sortClassLabels(classes) {
  const rank = (c) => {
    const u = String(c).trim().toUpperCase();
    if (u === "LKG") return { g: 0, v: 0 };
    if (u === "UKG") return { g: 0, v: 1 };
    if (u === "KG" || u === "NURSERY") return { g: 0, v: 2 };
    const n = parseInt(u.replace(/\D/g, ""), 10);
    if (!Number.isNaN(n)) return { g: 1, v: n };
    return { g: 2, v: u };
  };
  return [...classes].sort((a, b) => {
    const A = rank(a),
      B = rank(b);
    if (A.g !== B.g) return A.g - B.g;
    return A.v < B.v ? -1 : A.v > B.v ? 1 : 0;
  });
}

/** "15.pdf" or "15__Bonafide.pdf" → roll "15" */
function parseRollFromFileName(fileName) {
  const base = fileName.replace(/^.*[\\/]/, "");
  const lastDot = base.lastIndexOf(".");
  const noExt = lastDot > 0 ? base.slice(0, lastDot) : base;
  if (noExt.includes("__")) {
    return noExt.split("__")[0].trim();
  }
  return noExt.trim();
}

/** If "15__Bonafide.pdf" → "Bonafide.pdf" for display; else full name */
function friendlyNameAfterRoll(fileName) {
  const base = fileName.replace(/^.*[\\/]/, "");
  const lastDot = base.lastIndexOf(".");
  const ext = lastDot > 0 ? base.slice(lastDot) : "";
  const nameOnly = lastDot > 0 ? base.slice(0, lastDot) : base;
  if (nameOnly.includes("__")) {
    const after = nameOnly.split("__").slice(1).join("__").trim();
    if (after) return after + ext;
  }
  return base;
}

function rollMatches(studentRoll, parsedRoll) {
  const a = String(studentRoll ?? "").trim();
  const b = String(parsedRoll ?? "").trim();
  if (a === "" || b === "") return false;
  if (a === b) return true;
  const na = Number(a);
  const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na === nb) return true;
  return false;
}

function findStudentInClassByRoll(inClass, parsedRoll) {
  for (const s of inClass) {
    if (rollMatches(s.rollNo, parsedRoll)) return s;
  }
  return null;
}

function duplicateRollKeysInClass(inClass) {
  const map = new Map();
  for (const s of inClass) {
    const r = String(s.rollNo ?? "").trim();
    if (!r) continue;
    if (!map.has(r)) map.set(r, 0);
    map.set(r, map.get(r) + 1);
  }
  return [...map.entries()]
    .filter(([, n]) => n > 1)
    .map(([k]) => k);
}

function formatFileSize(bytes) {
  if (bytes == null || Number.isNaN(Number(bytes))) return "—";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function AdminCertificate({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [bulkFilter, setBulkFilter] = useState("");
  const [bulkClassFilter, setBulkClassFilter] = useState("all");
  const [bulkRows, setBulkRows] = useState([newRow()]);
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState("");
  const [bulkUploading, setBulkUploading] = useState(false);
  /** Auto: pick class + many files; filename encodes roll number */
  const [autoClassRoll, setAutoClassRoll] = useState("");
  const [autoRollFiles, setAutoRollFiles] = useState([]);
  const [autoRollUploading, setAutoRollUploading] = useState(false);
  const [autoRollProgress, setAutoRollProgress] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  
  const [adminLogClass, setAdminLogClass] = useState("all");
  const [adminLogSearch, setAdminLogSearch] = useState("");
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [reqFilter, setReqFilter] = useState("pending");
  const [reqSearch, setReqSearch] = useState("");
  const [updatingReqId, setUpdatingReqId] = useState(null);

  const classOptions = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.class != null && String(s.class).trim() !== "")
        set.add(String(s.class).trim());
    });
    return sortClassLabels([...set]);
  }, [students]);

  const studentsForBulkClass = useMemo(() => {
    if (bulkClassFilter === "all") return students;
    return students.filter(
      (s) => String(s.class || "").trim() === bulkClassFilter,
    );
  }, [students, bulkClassFilter]);

  const bulkListStudents = useMemo(() => {
    const q = bulkFilter.trim().toLowerCase();
    const base = studentsForBulkClass;
    if (!q) return base.slice(0, 200);
    return base.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        String(s.name).toLowerCase().includes(q),
    );
  }, [studentsForBulkClass, bulkFilter]);

  /** Merge Firestore snapshot + live student list for old rows missing saved fields */
  const adminLogRows = useMemo(() => {
    return certificates.map((item) => {
      const st = students.find((s) => s.id === item.studentId);
      return {
        ...item,
        _name: item.studentName || st?.name || "—",
        _email: item.studentEmail || st?.email || item.studentId || "—",
        _class: item.studentClass ?? st?.class ?? "",
        _roll: item.studentRoll ?? st?.rollNo ?? "",
      };
    });
  }, [certificates, students]);

  const adminLogFiltered = useMemo(() => {
    let rows = adminLogRows;
    if (adminLogClass !== "all") {
      rows = rows.filter((r) => String(r._class || "").trim() === adminLogClass);
    }
    const q = adminLogSearch.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          String(r._name).toLowerCase().includes(q) ||
          String(r._email).toLowerCase().includes(q) ||
          String(r._roll).toLowerCase().includes(q) ||
          String(r.fileName || "").toLowerCase().includes(q),
      );
    }
    return rows;
  }, [adminLogRows, adminLogClass, adminLogSearch]);

  const loadStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    const list = snapshot.docs.map((d) => ({
      id: d.id,
      name: d.data().name || d.id,
      email: d.data().email || d.id,
      class: d.data().class != null ? String(d.data().class).trim() : "",
      rollNo:
        d.data().rollNo != null ? String(d.data().rollNo).trim() : "",
    }));
    list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    setStudents(list);
  };

  const fetchCertificates = async () => {
    const snapshot = await getDocs(collectionGroup(db, "certificates"));
    const data = snapshot.docs.map((d) => {
      const studentId = d.ref.parent.parent?.id || d.data().studentId || "";
      return {
        id: d.id,
        studentId,
        ...d.data(),
      };
    });
    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );
    setCertificates(data);
  };

  const fetchCertificateRequests = async () => {
    try {
      const snapshot = await getDocs(collection(db, "certificateRequests"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
      setCertificateRequests(data);
    } catch (e) {
      console.error(e);
      setCertificateRequests([]);
    }
  };

  const filteredRequests = useMemo(() => {
    let rows = certificateRequests;
    if (reqFilter === "pending") {
      rows = rows.filter((r) => (r.status || "pending") === "pending");
    } else if (reqFilter === "fulfilled") {
      rows = rows.filter((r) => r.status === "fulfilled");
    } else if (reqFilter === "rejected") {
      rows = rows.filter((r) => r.status === "rejected");
    }
    const q = reqSearch.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          String(r.studentName || "")
            .toLowerCase()
            .includes(q) ||
          String(r.studentEmail || "")
            .toLowerCase()
            .includes(q) ||
          String(r.documentTitle || "")
            .toLowerCase()
            .includes(q) ||
          String(r.note || "")
            .toLowerCase()
            .includes(q),
      );
    }
    return rows;
  }, [certificateRequests, reqFilter, reqSearch]);

  const updateRequestStatus = async (requestId, status, adminNote = "") => {
    try {
      setUpdatingReqId(requestId);
      await updateDoc(doc(db, "certificateRequests", requestId), {
        status,
        adminNote: adminNote.trim(),
        updatedAt: Timestamp.now(),
      });
      await fetchCertificateRequests();
      setMessage(
        status === "fulfilled"
          ? "Request marked as fulfilled."
          : "Request rejected.",
      );
    } catch (e) {
      setMessage(e?.message || "Could not update request.");
    } finally {
      setUpdatingReqId(null);
    }
  };

  useEffect(() => {
    loadStudents();
    fetchCertificates();
    fetchCertificateRequests();
  }, []);


  const uploadForStudent = async (
    studentId,
    fileObj,
    studentName,
    friendlyFileName,
    meta = {},
  ) => {
    if (typeof auth.authStateReady === "function") {
      await auth.authStateReady();
    }
    if (!auth.currentUser) {
      throw new Error(
        "Not signed in. Log in again, then upload. (Storage needs an authenticated user.)",
      );
    }
    if (!studentId || !fileObj) throw new Error("Missing student or file.");
    if (fileObj.size > MAX_BYTES) {
      throw new Error(`File too large (max ${MAX_BYTES / 1024 / 1024} MB).`);
    }
    /** Same File in two rows must upload independently (blob stream is single-use). */
    const uploadBody =
      typeof fileObj.slice === "function"
        ? fileObj.slice(0, fileObj.size, fileObj.type || undefined)
        : fileObj;
    const logicalName = friendlyFileName || fileObj.name;
    const storagePath = `certificates/${studentId}/${Date.now()}_${safeStorageSegment(logicalName)}`;
    const storageRef = ref(storage, storagePath);
    const contentType = fileObj.type || "application/octet-stream";
    const uploadTask = uploadBytesResumable(storageRef, uploadBody, {
      contentType,
    });
    const snapshot = await withTimeout(
      awaitUploadTask(uploadTask),
      UPLOAD_TIMEOUT_MS,
      "Upload timed out — check internet, Firebase Storage rules, and that you are logged in as admin.",
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    const relatedRid = String(meta.relatedRequestId || "").trim();
    const docRef = await withTimeout(
      addDoc(collection(db, "students", studentId, "certificates"), {
        studentId,
        studentName: studentName || "",
        studentEmail: meta.studentEmail ?? studentId,
        studentClass: meta.studentClass ?? "",
        studentRoll: meta.studentRoll ?? "",
        fileName: logicalName,
        mimeType: fileObj.type || "application/octet-stream",
        storagePath,
        downloadURL,
        size: fileObj.size,
        relatedRequestId: relatedRid,
        createdAt: Timestamp.now(),
      }),
      FIRESTORE_SAVE_TIMEOUT_MS,
      "Saving file info timed out — check Firestore rules and connection.",
    );
    if (relatedRid) {
      const req = certificateRequests.find((q) => q.id === relatedRid);
      if (!req || req.studentId !== studentId) {
        throw new Error(
          "Request link is invalid — choose a pending request for this same student.",
        );
      }
      await updateDoc(doc(db, "certificateRequests", relatedRid), {
        status: "fulfilled",
        fulfilledCertificateDocId: docRef.id,
        adminNote: `Uploaded: ${logicalName}`,
        updatedAt: Timestamp.now(),
      });
    }
  };

  const updateBulkRow = (key, patch) => {
    setBulkRows((rows) =>
      rows.map((r) => (r.key === key ? { ...r, ...patch } : r)),
    );
    setMessage("");
  };

  const addBulkRow = () => setBulkRows((rows) => [...rows, newRow()]);
  const removeBulkRow = (key) => {
    setBulkRows((rows) =>
      rows.length <= 1 ? rows : rows.filter((r) => r.key !== key),
    );
  };

  const handleBulkUploadRows = async () => {
    const ready = bulkRows.filter((r) => r.studentId && r.file);
    if (ready.length === 0) {
      setMessage("Fill at least one row: student + file.");
      return;
    }
    const idSet = new Set(students.map((s) => s.id));
    const errors = [];
    try {
      setBulkUploading(true);
      let ok = 0;
      for (const row of ready) {
        if (!idSet.has(row.studentId)) {
          errors.push(`Unknown student: ${row.studentId}`);
          continue;
        }
        const st = students.find((s) => s.id === row.studentId);
        try {
          await uploadForStudent(row.studentId, row.file, st?.name || "", null, {
            studentEmail: st?.email || row.studentId,
            studentClass: st?.class ?? "",
            studentRoll: st?.rollNo ?? "",
            relatedRequestId: row.relatedRequestId || "",
          });
          ok++;
        } catch (err) {
          errors.push(`${row.file.name}: ${err?.message || "failed"}`);
        }
      }
      const parts = [`Uploaded ${ok} file(s).`];
      if (errors.length) {
        parts.push(`Issues:\n${errors.slice(0, 20).join("\n")}`);
        if (errors.length > 20) parts.push(`… +${errors.length - 20} more`);
      }
      setMessage(parts.join("\n"));
      setBulkRows([newRow()]);
    } catch (err) {
      setMessage(err?.message || "Bulk upload failed.");
    } finally {
      setBulkUploading(false);
    }
    fetchCertificates().catch((e) =>
      console.error("Certificate list refresh failed:", e),
    );
    fetchCertificateRequests().catch((e) =>
      console.error("Requests list refresh failed:", e),
    );
  };

  const handleAutoRollFilesChange = (e) => {
    setAutoRollFiles(e.target.files ? Array.from(e.target.files) : []);
    setMessage("");
  };

  /**
   * Select class → upload many files; file name starts with roll number
   * (same roll as in student record for that class). Goes to that student's portal only.
   */
  const handleAutoBulkByClassRoll = async () => {
    if (!autoClassRoll) {
      setMessage("Select a class.");
      return;
    }
    if (autoRollFiles.length === 0) {
      setMessage("Choose one or more files.");
      return;
    }
    const inClass = students.filter(
      (s) => String(s.class || "").trim() === autoClassRoll,
    );
    if (inClass.length === 0) {
      setMessage("No students found for this class.");
      return;
    }
    const dupes = duplicateRollKeysInClass(inClass);
    if (dupes.length) {
      setMessage(
        `Duplicate roll number(s) in this class: ${dupes.join(", ")}. Fix in student records first.`,
      );
      return;
    }

    const errors = [];
    let ok = 0;
    const missingRoll = inClass.filter((s) => !String(s.rollNo ?? "").trim());

    try {
      setAutoRollUploading(true);
      let i = 0;
      for (const f of autoRollFiles) {
        i += 1;
        setAutoRollProgress(`${i} / ${autoRollFiles.length}`);
        const roll = parseRollFromFileName(f.name);
        if (!roll) {
          errors.push(`"${f.name}": add roll at start of file name (e.g. 12.pdf).`);
          continue;
        }
        const st = findStudentInClassByRoll(inClass, roll);
        if (!st) {
          errors.push(
            `"${f.name}": no student with roll "${roll}" in class ${autoClassRoll}.`,
          );
          continue;
        }
        const friendly = friendlyNameAfterRoll(f.name);
        try {
          await uploadForStudent(st.id, f, st.name, friendly, {
            studentEmail: st.email || st.id,
            studentClass: st.class ?? "",
            studentRoll: st.rollNo ?? "",
          });
          ok++;
        } catch (err) {
          errors.push(`"${f.name}": ${err?.message || "failed"}`);
        }
      }
      const parts = [
        `Uploaded ${ok} file(s). Each is linked to that roll's student only.`,
      ];
      if (missingRoll.length) {
        parts.push(
          `${missingRoll.length} student(s) in this class have no roll number — use manual upload for them.`,
        );
      }
      if (errors.length) {
        parts.push(`Issues:\n${errors.slice(0, 25).join("\n")}`);
        if (errors.length > 25) parts.push(`… +${errors.length - 25} more`);
      }
      setMessage(parts.join("\n"));
      setAutoRollFiles([]);
      const inp = document.getElementById("admin-cert-auto-roll-files");
      if (inp) inp.value = "";
    } catch (err) {
      setMessage(err?.message || "Auto upload failed.");
    } finally {
      setAutoRollUploading(false);
      setAutoRollProgress("");
    }
    fetchCertificates().catch((e) =>
      console.error("Certificate list refresh failed:", e),
    );
  };

  const handleDelete = async (item) => {
    if (!item.studentId || !item.storagePath) {
      setMessage("Cannot delete: missing storage path.");
      return;
    }
    try {
      setDeletingId(item.id + item.studentId);
      await deleteObject(ref(storage, item.storagePath));
      await deleteDoc(
        doc(db, "students", item.studentId, "certificates", item.id),
      );
      setMessage("Deleted.");
    } catch {
      setMessage("Delete failed.");
    } finally {
      setDeletingId(null);
    }
    fetchCertificates().catch((e) =>
      console.error("Certificate list refresh failed:", e),
    );
  };

  const handleView = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const cardBg = darkMode ? "#1e293b" : "#ffffff";
  const textMuted = darkMode ? "#94a3b8" : "#64748B";
  const inputStyle = {
    background: darkMode ? "#334155" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    border: darkMode ? "1px solid #475569" : "1px solid #ced4da",
  };

  return (
    <div
      className="certificate-wrapper"
      style={{
        background: darkMode ? "#0f172a" : "#f9fafb",
        color: darkMode ? "#f1f5f9" : "#111827",
      }}
    >
      <h4 className="heading">Certificates & documents</h4>
    

      {message && (
        <div
          className="alert-box"
          style={{
            background: darkMode ? "#1e293b" : "#ffffff",
            borderLeft: darkMode ? "4px solid #D4A24C" : "4px solid #0F4C6C",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message}
        </div>
      )}

      <div
        className="upload-card mb-4"
        style={{
          background: cardBg,
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
          border: darkMode ? "1px solid #475569" : "1px solid #cbd5e1",
        }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
          <h5 className="sub-heading mb-0">Student document requests</h5>
          <button
            type="button"
            className="btn btn-sm"
            style={{
              background: darkMode ? "#334155" : "#E8EEF2",
              color: darkMode ? "#fff" : "#0F4C6C",
              border: "none",
            }}
            onClick={() => fetchCertificateRequests()}
          >
            Refresh
          </button>
        </div>
       
        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <label className="form-label small">Status</label>
            <select
              className="form-select form-select-sm"
              value={reqFilter}
              onChange={(e) => setReqFilter(e.target.value)}
              style={inputStyle}
            >
              <option value="pending">Pending</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="col-md-8">
            <label className="form-label small">Search</label>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Name, email, document, note…"
              value={reqSearch}
              onChange={(e) => setReqSearch(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead>
              <tr>
                <th style={{ color: textMuted }}>Date</th>
                <th style={{ color: textMuted }}>Student</th>
                <th style={{ color: textMuted }}>Class / Roll</th>
                <th style={{ color: textMuted }}>Document</th>
                <th style={{ color: textMuted }}>Note</th>
                <th style={{ color: textMuted }}>Status</th>
                <th style={{ color: textMuted }}>From school</th>
                <th style={{ width: 200 }} />
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-muted small py-3">
                    No requests match this filter.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => {
                  const created =
                    r.createdAt?.toDate?.() ||
                    (r.createdAt?.seconds
                      ? new Date(r.createdAt.seconds * 1000)
                      : null);
                  const dateStr = created
                    ? created.toLocaleString()
                    : "—";
                  const busy = updatingReqId === r.id;
                  const st = r.status || "pending";
                  return (
                    <tr key={r.id}>
                      <td className="small text-nowrap">{dateStr}</td>
                      <td>
                        <div className="small">{r.studentName || "—"}</div>
                        {r.studentRoll != null && String(r.studentRoll).trim() !== "" ? (
                          <div className="small" style={{ color: textMuted }}>
                            Roll {r.studentRoll}
                          </div>
                        ) : null}
                      </td>
                      <td className="small">
                        {r.studentClass || "—"}
                        {r.studentRoll != null && r.studentRoll !== ""
                          ? ` / ${r.studentRoll}`
                          : ""}
                      </td>
                      <td className="small">{r.documentTitle || "—"}</td>
                      <td className="small" style={{ maxWidth: 140 }}>
                        {r.note || "—"}
                      </td>
                      <td>
                        <span
                          className="badge rounded-pill"
                          style={{
                            background:
                              st === "fulfilled"
                                ? darkMode
                                  ? "#14532d"
                                  : "#dcfce7"
                                : st === "rejected"
                                  ? darkMode
                                    ? "#7f1d1d"
                                    : "#fee2e2"
                                  : darkMode
                                    ? "#334155"
                                    : "#e2e8f0",
                            color:
                              st === "fulfilled"
                                ? darkMode
                                  ? "#bbf7d0"
                                  : "#14532d"
                                : st === "rejected"
                                  ? darkMode
                                    ? "#fecaca"
                                    : "#991b1b"
                                  : darkMode
                                    ? "#cbd5e1"
                                    : "#475569",
                          }}
                        >
                          {st}
                        </span>
                      </td>
                      <td className="small" style={{ maxWidth: 160 }}>
                        {r.adminNote || "—"}
                      </td>
                      <td>
                        {st === "pending" ? (
                          <div className="d-flex flex-column gap-1">
                            <button
                              type="button"
                              className="btn btn-sm"
                              style={{
                                background: darkMode ? "#14532d" : "#22c55e",
                                color: "#fff",
                                border: "none",
                              }}
                              disabled={busy}
                              onClick={() => {
                                const note = window.prompt(
                                  "Optional note for student (e.g. uploaded to portal)",
                                  "",
                                );
                                if (note === null) return;
                                updateRequestStatus(r.id, "fulfilled", note);
                              }}
                            >
                              {busy ? "…" : "Fulfilled"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              disabled={busy}
                              onClick={() => {
                                const note = window.prompt(
                                  "Optional note for student (e.g. reason)",
                                  "",
                                );
                                if (note === null) return;
                                updateRequestStatus(r.id, "rejected", note);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="small text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="upload-card mb-4"
        style={{
          background: cardBg,
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
          border: "2px solid #D4A24C",
        }}
      >
        <h5 className="sub-heading mb-1">1. Upload documents </h5>
        <p className="small mb-2" style={{ color: textMuted }}>
          Optional column <strong>For request</strong>: choose the student&apos;s pending
          request so they see exactly which file matches it under &quot;My requests&quot;.
        </p>
        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <label className="form-label small">Class</label>
            <select
              className="form-select form-select-sm"
              value={bulkClassFilter}
              onChange={(e) => setBulkClassFilter(e.target.value)}
              style={inputStyle}
            >
              <option value="all">All classes</option>
              {classOptions.map((c) => (
                <option key={`b-${c}`} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="col-md-8">
            <label className="form-label small">
              Search in table ({bulkListStudents.length} shown)
            </label>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Filter name or email…"
              value={bulkFilter}
              onChange={(e) => setBulkFilter(e.target.value)}
              style={inputStyle}
            />
          </div> */}
        </div>

        <div className="table-responsive">
          <table className="table table-sm align-middle mb-2">
            <thead>
              <tr>
                <th style={{ color: textMuted }}>Student</th>
                <th style={{ color: textMuted, minWidth: 160 }}>
                  For request 
                </th>
                <th style={{ color: textMuted }}>File</th>
                <th style={{ width: 56 }} />
              </tr>
            </thead>
            <tbody>
              {bulkRows.map((row) => (
                <tr key={row.key}>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={row.studentId}
                      onChange={(e) =>
                        updateBulkRow(row.key, {
                          studentId: e.target.value,
                          relatedRequestId: "",
                        })
                      }
                      style={inputStyle}
                    >
                      <option value="">— Select —</option>
                      {bulkListStudents.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.rollNo ? `[${s.rollNo}] ` : ""}
                          {s.name || "—"}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={row.relatedRequestId || ""}
                      disabled={!row.studentId}
                      onChange={(e) =>
                        updateBulkRow(row.key, {
                          relatedRequestId: e.target.value,
                        })
                      }
                      title="Links this upload to a pending request for that student"
                      style={inputStyle}
                    >
                      <option value="">— Not linked —</option>
                      {certificateRequests
                        .filter(
                          (q) =>
                            q.studentId === row.studentId &&
                            (q.status || "pending") === "pending",
                        )
                        .map((q) => (
                          <option key={q.id} value={q.id}>
                            {(q.documentTitle || "Request").length > 55
                              ? `${(q.documentTitle || "Request").slice(0, 55)}…`
                              : q.documentTitle || "Request"}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        updateBulkRow(row.key, {
                          file: e.target.files?.[0] || null,
                        })
                      }
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeBulkRow(row.key)}
                      disabled={bulkRows.length <= 1}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-sm"
            style={{
              background: darkMode ? "#334155" : "#E8EEF2",
              color: darkMode ? "#fff" : "#0F4C6C",
              border: "none",
            }}
            onClick={addBulkRow}
          >
            + Add row
          </button>
          <button
            type="button"
            className="btn upload-btn"
            onClick={handleBulkUploadRows}
            disabled={bulkUploading}
            title="uploaded "
          >
            {bulkUploading ? "Uploading…" : "Upload"}
          </button>
        </div>
      </div>

      <details
        className="upload-card mb-4"
        style={{
          background: cardBg,
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
          border: "1px solid #22c55e",
          borderRadius: "20px",
          padding: "16px 22px",
        }}
      >
        <summary
          className="sub-heading mb-0"
          style={{ cursor: "pointer", listStyle: "none" }}
        >
          2. Optional bulk
        </summary>
       
        <button
          type="button"
          className="btn btn-sm mb-3"
          style={{
            background: darkMode ? "#14532d" : "#dcfce7",
            color: darkMode ? "#bbf7d0" : "#14532d",
            border: "1px solid #22c55e",
            borderRadius: "8px",
          }}
        >
        101_Certificate.pdf
        </button>
        <label className="form-label small">Class</label>
        <select
          className="form-select form-select-sm mb-3"
          value={autoClassRoll}
          onChange={(e) => setAutoClassRoll(e.target.value)}
          style={inputStyle}
        >
          <option value="">— Select class —</option>
          {classOptions.map((c) => (
            <option key={`auto-${c}`} value={c}>
              Class {c}
            </option>
          ))}
        </select>
        <label className="form-label small">Files (multiple)</label>
        <input
          id="admin-cert-auto-roll-files"
          type="file"
          multiple
          className="form-control mb-2 custom-input"
          onChange={handleAutoRollFilesChange}
          style={inputStyle}
        />
        {autoRollProgress && (
          <p className="small mb-2" style={{ color: textMuted }}>
            {autoRollProgress}
          </p>
        )}
        <button
          type="button"
          className="btn upload-btn"
          style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}
          onClick={handleAutoBulkByClassRoll}
          disabled={autoRollUploading}
        >
          {autoRollUploading ? "Uploading…" : "Upload by roll"}
        </button>
      </details>

      <h5 className="sub-heading mt-4">Sent documents </h5>

      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <label className="form-label small">Filter by class</label>
          <select
            className="form-select form-select-sm"
            value={adminLogClass}
            onChange={(e) => setAdminLogClass(e.target.value)}
            style={inputStyle}
          >
            <option value="all">All classes</option>
            {classOptions.map((c) => (
              <option key={`log-${c}`} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-9">
          <label className="form-label small">
            Search — {adminLogFiltered.length} / {certificates.length}
          </label>
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Name, email, roll, file name…"
            value={adminLogSearch}
            onChange={(e) => setAdminLogSearch(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="table-responsive mb-4">
        <table
          className={`table table-sm table-bordered align-middle mb-0 ${
            darkMode ? "table-dark" : ""
          }`}
          style={{ fontSize: "13px" }}
        >
          <thead
            style={{
              background: darkMode ? "#1e293b" : "#E8EEF2",
              color: darkMode ? "#e2e8f0" : "#0F4C6C",
            }}
          >
            <tr>
              <th>Date & time</th>
              <th>Student</th>
              <th>Login email</th>
              <th>Class</th>
              <th>Roll</th>
              <th>File name</th>
              <th>Type</th>
              <th>Size</th>
              <th style={{ width: 130 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminLogFiltered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center text-muted py-4">
                  No rows match. Upload above or change filters.
                </td>
              </tr>
            )}
            {adminLogFiltered.map((item) => (
              <tr
                key={`${item.studentId}-${item.id}`}
                style={{
                  opacity: deletingId === item.id + item.studentId ? 0.5 : 1,
                }}
              >
                <td className="text-nowrap">
                  {item.createdAt
                    ? new Date(item.createdAt.seconds * 1000).toLocaleString(
                        "en-IN",
                      )
                    : "—"}
                </td>
                <td>{item._name}</td>
                <td>
                  <small className="text-break">{item._email}</small>
                </td>
                <td>{item._class || "—"}</td>
                <td>{item._roll || "—"}</td>
                <td>
                  <span className="text-break" title={item.fileName}>
                    {item.fileName}
                  </span>
                </td>
                <td>
                  <small className="text-break">{item.mimeType || "—"}</small>
                </td>
                <td>{formatFileSize(item.size)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm view-btn py-0 px-2 me-1"
                    onClick={() => handleView(item.downloadURL)}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm delete-btn py-0 px-2"
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id + item.studentId}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
.certificate-wrapper { padding:25px; border-radius:22px; }
.heading { font-weight:700; color:#0F4C6C; }
body.dark-mode .heading { color:#D4A24C; }
.sub-heading { color:#1B5E84; font-size:1rem; font-weight:600; margin-bottom:12px; }
body.dark-mode .sub-heading { color:#D4A24C; }
.upload-card { border-radius:20px; padding:22px; transition:0.3s ease; }
.certificate-card { border-radius:18px; box-shadow:0 12px 30px rgba(0,0,0,0.08); transition:0.3s ease; }
.icon-box { padding:30px; text-align:center; font-size:40px; border-top-left-radius:18px; border-top-right-radius:18px; }
.upload-btn { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:white; border:none; border-radius:10px; padding:8px 18px; }
.view-btn { background:linear-gradient(135deg,#1B5E84,#0F4C6C); color:white; border:none; }
.delete-btn { background:linear-gradient(135deg,#DC2626,#991B1B); color:white; border:none; }
.custom-input:focus { border-color:#D4A24C !important; box-shadow:0 0 10px rgba(212,162,76,0.3); }
.alert-box { padding: 12px 14px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
`}</style>
    </div>
  );
}

export default AdminCertificate;
