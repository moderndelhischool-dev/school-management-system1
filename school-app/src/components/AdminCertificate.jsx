import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  collectionGroup,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

/** Firestore doc limit — base64 expands */
const MAX_SIZE = 750 * 1024;

const ALLOWED_EXT = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
]);

function fileExtLower(name) {
  const s = String(name || "");
  const i = s.lastIndexOf(".");
  return i >= 0 ? s.slice(i + 1).toLowerCase() : "";
}

function mimeFromFileName(name) {
  const ext = fileExtLower(name);
  const map = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    doc: "application/msword",
    docx:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  return map[ext] || "application/octet-stream";
}

function isAllowedCertificateFile(file) {
  const ext = fileExtLower(file.name);
  if (ext && ALLOWED_EXT.has(ext)) return true;
  const t = (file.type || "").toLowerCase();
  if (t.startsWith("image/")) return true;
  if (t === "application/pdf" || t.includes("pdf")) return true;
  if (
    t.includes("word") ||
    t.includes("officedocument.wordprocessingml.document")
  ) {
    return true;
  }
  if (t.includes("excel") || t.includes("spreadsheetml")) return true;
  if (t === "application/msword" || t === "application/vnd.ms-excel")
    return true;
  return false;
}

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
  return [...new Set(classes)].sort((a, b) => {
    const A = rank(a),
      B = rank(b);
    if (A.g !== B.g) return A.g - B.g;
    return String(A.v).localeCompare(String(B.v));
  });
}

function newBulkRow() {
  return {
    key: crypto.randomUUID(),
    studentId: "",
    relatedRequestId: "",
    file: null,
  };
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error("Could not read file"));
    r.readAsDataURL(file);
  });
}

function rollSortKey(rollNo) {
  const s = String(rollNo ?? "").trim();
  const n = parseInt(s.replace(/\D/g, ""), 10);
  return Number.isNaN(n) ? 999999 : n;
}

function studentsInClassSorted(allStudents, className) {
  const c = String(className || "").trim();
  if (!c) return [];
  return allStudents
    .filter((s) => String(s.class || "").trim() === c)
    .sort((a, b) => rollSortKey(a.rollNo) - rollSortKey(b.rollNo));
}

function AdminCertificate({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sentDocs, setSentDocs] = useState([]);
  const [bulkRows, setBulkRows] = useState([newBulkRow()]);
  const [bulkClassFilter, setBulkClassFilter] = useState("all");
  const [bulkSearch, setBulkSearch] = useState("");
  const [reqFilter, setReqFilter] = useState("pending");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [multiClass, setMultiClass] = useState("");
  const [multiFiles, setMultiFiles] = useState([]);
  const multiFileInputRef = useRef(null);

  const studentsById = useMemo(() => {
    const m = new Map();
    students.forEach((s) => m.set(s.id, s));
    return m;
  }, [students]);

  const classOptions = useMemo(() => {
    const cls = students.map((s) => s.class).filter(Boolean);
    return sortClassLabels(cls);
  }, [students]);

  const bulkListStudents = useMemo(() => {
    let list = students;
    if (bulkClassFilter !== "all") {
      list = list.filter(
        (s) => String(s.class || "").trim() === bulkClassFilter,
      );
    }
    const q = bulkSearch.trim().toLowerCase();
    if (q) {
      list = list.filter((s) => {
        const hay = `${s.name || ""} ${s.email || ""} ${s.rollNo || ""} ${s.id || ""}`.toLowerCase();
        return hay.includes(q);
      });
    }
    return list;
  }, [students, bulkClassFilter, bulkSearch]);

  const loadStudents = async () => {
    const snap = await getDocs(collection(db, "students"));
    setStudents(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })),
    );
  };

  const loadRequests = async () => {
    const snap = await getDocs(collection(db, "certificateRequests"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );
    setRequests(data);
  };

  const loadSentDocs = async () => {
    try {
      let snap;
      try {
        snap = await getDocs(
          query(
            collectionGroup(db, "certificates"),
            orderBy("createdAt", "desc"),
            limit(200),
          ),
        );
      } catch {
        snap = await getDocs(collectionGroup(db, "certificates"));
      }
      const data = snap.docs.map((d) => {
        const studentId = d.ref.parent.parent?.id || "";
        return {
          id: d.id,
          studentId,
          ...d.data(),
        };
      });
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
      setSentDocs(data.slice(0, 200));
    } catch (e) {
      console.error(e);
      setSentDocs([]);
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadStudents(), loadRequests(), loadSentDocs()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const filteredRequests = useMemo(() => {
    if (reqFilter === "all") return requests;
    return requests.filter((r) => (r.status || "pending") === reqFilter);
  }, [requests, reqFilter]);

  const pendingForStudent = (studentId) =>
    requests.filter(
      (q) =>
        q.studentId === studentId && (q.status || "pending") === "pending",
    );

  const classStudentsForMulti = useMemo(() => {
    if (!multiClass) return [];
    return studentsInClassSorted(students, multiClass);
  }, [students, multiClass]);

  const multiPreview = useMemo(() => {
    if (!multiClass || multiFiles.length === 0) return [];
    const files = [...multiFiles];
    const list = classStudentsForMulti;
    const n = Math.min(files.length, list.length);
    return Array.from({ length: n }, (_, i) => ({
      file: files[i],
      student: list[i],
      error: null,
    }));
  }, [multiClass, multiFiles, classStudentsForMulti]);

  const uploadCertificateForStudent = async (
    studentId,
    dataUrl,
    fileName,
    mime,
    relatedRequestId,
  ) => {
    const st = studentsById.get(studentId);
    if (!st) throw new Error(`Unknown student: ${studentId}`);

    const relatedRid = String(relatedRequestId || "").trim();
    if (relatedRid) {
      const reqSnap = await getDoc(doc(db, "certificateRequests", relatedRid));
      if (!reqSnap.exists()) {
        throw new Error("Linked request not found — refresh and pick again.");
      }
      const reqData = reqSnap.data();
      if (reqData.studentId !== studentId) {
        throw new Error("Request does not match this student.");
      }
      if ((reqData.status || "pending") !== "pending") {
        throw new Error("This request is no longer pending.");
      }
    }

    const certRef = await addDoc(
      collection(db, "students", studentId, "certificates"),
      {
        studentId,
        studentName: st.name || "",
        studentEmail: st.email || studentId,
        studentClass: st.class != null ? String(st.class) : "",
        studentRoll: st.rollNo != null ? String(st.rollNo) : "",
        fileName,
        mimeType: mime || mimeFromFileName(fileName),
        downloadURL: dataUrl,
        relatedRequestId: relatedRid,
        createdAt: Timestamp.now(),
      },
    );

    if (relatedRid) {
      await updateDoc(doc(db, "certificateRequests", relatedRid), {
        status: "fulfilled",
        fulfilledCertificateDocId: certRef.id,
        adminNote: `Uploaded: ${fileName}`,
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

  const addBulkRow = () => setBulkRows((rows) => [...rows, newBulkRow()]);

  const removeBulkRow = (key) => {
    setBulkRows((rows) =>
      rows.length <= 1 ? rows : rows.filter((r) => r.key !== key),
    );
  };

  const onRowFileChange = (key, e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      updateBulkRow(key, { file: null });
      return;
    }
    if (!isAllowedCertificateFile(file)) {
      setMessage(
        "Allowed: PDF, Word, Excel, or images (png/jpg/gif/webp).",
      );
      e.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE) {
      setMessage(`Each file must be under ${Math.floor(MAX_SIZE / 1024)} KB.`);
      e.target.value = "";
      return;
    }
    updateBulkRow(key, { file });
    setMessage("");
  };

  const handleBulkUpload = async () => {
    const ready = bulkRows.filter((r) => r.studentId && r.file);
    if (ready.length === 0) {
      setMessage("Add at least one row with a student and a file.");
      return;
    }

    const idSet = new Set(students.map((s) => s.id));
    const errors = [];
    try {
      setUploading(true);
      let ok = 0;
      for (const row of ready) {
        if (!idSet.has(row.studentId)) {
          errors.push(`Unknown student id: ${row.studentId}`);
          continue;
        }
        try {
          const dataUrl = await readFileAsDataURL(row.file);
          const name = row.file.name;
          const mime =
            row.file.type && row.file.type.length > 0
              ? row.file.type
              : mimeFromFileName(name);
          await uploadCertificateForStudent(
            row.studentId,
            dataUrl,
            name,
            mime,
            row.relatedRequestId,
          );
          ok++;
        } catch (err) {
          errors.push(`${row.file.name}: ${err?.message || "failed"}`);
        }
      }
      const parts = [`Uploaded ${ok} file(s). Students will see them in the portal.`];
      if (errors.length) {
        parts.push(`Issues:\n${errors.slice(0, 15).join("\n")}`);
        if (errors.length > 15) parts.push(`… +${errors.length - 15} more`);
      }
      setMessage(parts.join("\n"));
      setBulkRows([newBulkRow()]);
    } catch (err) {
      setMessage(err?.message || "Bulk upload failed.");
    } finally {
      setUploading(false);
    }
    refreshAll().catch(() => {});
  };

  const onMultiFilesChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setMultiFiles(files);
    setMessage("");
  };

  const handleMultiUpload = async () => {
    if (!multiClass) {
      setMessage("Select a class for multi-file upload.");
      return;
    }
    if (classStudentsForMulti.length === 0) {
      setMessage("No students in this class.");
      return;
    }
    if (multiFiles.length === 0) {
      setMessage("Choose one or more files (multi-select).");
      return;
    }

    for (const f of multiFiles) {
      if (!isAllowedCertificateFile(f)) {
        setMessage(`Not allowed: ${f.name} — use PDF, Word, Excel, or images.`);
        return;
      }
      if (f.size > MAX_SIZE) {
        setMessage(
          `${f.name} is too large (max ${Math.floor(MAX_SIZE / 1024)} KB).`,
        );
        return;
      }
    }

    const pairs = multiPreview.filter((p) => p.student && !p.error);
    if (pairs.length === 0) {
      setMessage("Nothing to upload — check class, files, and mapping.");
      return;
    }

    const errors = [];
    try {
      setUploading(true);
      let ok = 0;
      for (const { file, student } of pairs) {
        try {
          const dataUrl = await readFileAsDataURL(file);
          const name = file.name;
          const mime =
            file.type && file.type.length > 0
              ? file.type
              : mimeFromFileName(name);
          await uploadCertificateForStudent(
            student.id,
            dataUrl,
            name,
            mime,
            "",
          );
          ok++;
        } catch (err) {
          errors.push(`${file.name}: ${err?.message || "failed"}`);
        }
      }
      const parts = [
        `Multi-upload: ${ok} file(s) sent to respective students.`,
      ];
      if (multiFiles.length > classStudentsForMulti.length) {
        parts.push(
          `(Skipped ${multiFiles.length - classStudentsForMulti.length} extra file(s) — more files than students in class.)`,
        );
      }
      if (errors.length) {
        parts.push(`Issues:\n${errors.slice(0, 20).join("\n")}`);
      }
      setMessage(parts.join("\n"));
      setMultiFiles([]);
      if (multiFileInputRef.current) multiFileInputRef.current.value = "";
    } catch (err) {
      setMessage(err?.message || "Multi-upload failed.");
    } finally {
      setUploading(false);
    }
    refreshAll().catch(() => {});
  };

  const handleDeleteSent = async (item) => {
    if (!item.studentId) {
      setMessage("Cannot delete: missing student.");
      return;
    }
    try {
      setDeletingId(item.id + item.studentId);
      await deleteDoc(
        doc(db, "students", item.studentId, "certificates", item.id),
      );
      setMessage("Deleted.");
      loadSentDocs();
    } catch {
      setMessage("Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewAdmin = (item) => {
    const raw = item.downloadURL || item.file;
    if (!raw) return;
    if (raw.startsWith("data:")) {
      const parts = raw.split(",");
      const b64 = parts[1];
      const header = parts[0] || "";
      const mime =
        item.mimeType ||
        (header.includes(";") ? header.slice(5).split(";")[0] : "application/octet-stream");
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const blob = new Blob([arr], { type: mime });
      window.open(URL.createObjectURL(blob), "_blank", "noopener,noreferrer");
      return;
    }
    window.open(raw, "_blank", "noopener,noreferrer");
  };

  const cardBg = darkMode ? "#1e293b" : "#ffffff";
  const textMuted = darkMode ? "#94a3b8" : "#64748B";
  const inputStyle = {
    background: darkMode ? "#334155" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    border: darkMode ? "1px solid #475569" : "1px solid #ced4da",
  };

  if (loading) {
    return (
      <div className="certificate-wrapper p-4 text-center">
        <div className="spinner-border text-theme" role="status" />
      </div>
    );
  }

  return (
    <div
      className="certificate-wrapper"
      style={{
        background: darkMode ? "#0f172a" : "#f9fafb",
        color: darkMode ? "#f1f5f9" : "#111827",
      }}
    >
      <h4 className="heading mb-2">📜 Certificates & student requests</h4>
      <p className="small mb-3" style={{ color: textMuted }}>
        Student requests appear below. Use <strong>multi-select files</strong>{" "}
        (one class, many files) or the row-by-row table. Max{" "}
        {Math.floor(MAX_SIZE / 1024)} KB per file — PDF, Word, Excel, images.
      </p>

      {message && (
        <div
          className="alert-box mb-3"
          style={{
            background: darkMode ? "#1e293b" : "#ffffff",
            borderLeft: darkMode ? "4px solid #D4A24C" : "4px solid #0F4C6C",
            color: darkMode ? "#f1f5f9" : "#111827",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message}
        </div>
      )}

      {/* Requests from students */}
      <div
        className="upload-card mb-4"
        style={{
          background: cardBg,
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
        }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <h5 className="sub-heading mb-0">Student document requests</h5>
          <div className="d-flex align-items-center gap-2">
            <label className="small mb-0" style={{ color: textMuted }}>
              Show
            </label>
            <select
              className="form-select form-select-sm"
              style={{ width: 140, ...inputStyle }}
              value={reqFilter}
              onChange={(e) => setReqFilter(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
            <button
              type="button"
              className="btn btn-sm"
              style={{
                background: darkMode ? "#334155" : "#E8EEF2",
                color: darkMode ? "#fff" : "#0F4C6C",
                border: "none",
              }}
              onClick={() => loadRequests()}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className={`table table-sm table-bordered mb-0 ${darkMode ? "table-dark" : ""}`}
            style={{ fontSize: "13px" }}
          >
            <thead>
              <tr>
                <th style={{ color: textMuted }}>Date</th>
                <th style={{ color: textMuted }}>Student</th>
                <th style={{ color: textMuted }}>Class / Roll</th>
                <th style={{ color: textMuted }}>Document</th>
                <th style={{ color: textMuted }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted small">
                    No requests.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => (
                  <tr key={r.id}>
                    <td className="text-nowrap small">
                      {r.createdAt
                        ? new Date(
                            r.createdAt.seconds * 1000,
                          ).toLocaleString("en-IN")
                        : "—"}
                    </td>
                    <td>
                      <div className="small">{r.studentName || "—"}</div>
                      <div className="small" style={{ color: textMuted }}>
                        {r.studentId}
                      </div>
                    </td>
                    <td className="small">
                      {r.studentClass || "—"}
                      {r.studentRoll ? ` / ${r.studentRoll}` : ""}
                    </td>
                    <td className="small">{r.documentTitle || "—"}</td>
                    <td className="small">{r.status || "pending"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-select files → class students */}
      <div
        className="upload-card mb-4"
        style={{
          background: cardBg,
          border: darkMode ? "1px solid #14532d" : "2px solid #22c55e",
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 12px 30px rgba(34,197,94,0.2)",
        }}
      >
        <h5 className="sub-heading mb-2">Multi-select files</h5>
        
        <div className="row g-2 mb-3">
          <div className="col-md-6 col-lg-4">
            <label className="form-label small">Class</label>
            <select
              className="form-select form-select-sm"
              value={multiClass}
              onChange={(e) => {
                setMultiClass(e.target.value);
                setMultiFiles([]);
                if (multiFileInputRef.current)
                  multiFileInputRef.current.value = "";
              }}
              style={inputStyle}
            >
              <option value="">— Select class —</option>
              {classOptions.map((c) => (
                <option key={`multi-${c}`} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="form-label small">
          Choose Files
        </label>
        <input
          ref={multiFileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp,application/pdf,image/*"
          className="form-control form-control-sm mb-2"
          onChange={onMultiFilesChange}
          disabled={!multiClass}
          style={inputStyle}
        />
        {multiClass && (
          <p className="small mb-2" style={{ color: textMuted }}>
            Students in class (roll order):{" "}
            <strong>{classStudentsForMulti.length}</strong>
            {multiFiles.length > 0 && (
              <> · Selected files: <strong>{multiFiles.length}</strong></>
            )}
          </p>
        )}
        {multiPreview.length > 0 && (
          <div className="table-responsive mb-3">
            <table
              className={`table table-sm table-bordered mb-0 ${darkMode ? "table-dark" : ""}`}
              style={{ fontSize: "12px" }}
            >
              <thead>
                <tr>
                  <th style={{ color: textMuted }}>#</th>
                  <th style={{ color: textMuted }}>File</th>
                  <th style={{ color: textMuted }}>→ Student</th>
                  <th style={{ color: textMuted }}>Roll</th>
                </tr>
              </thead>
              <tbody>
                {multiPreview.map((p, idx) => (
                  <tr key={`${p.file.name}-${idx}`}>
                    <td className="small text-muted">{idx + 1}</td>
                    <td className="text-break small">{p.file.name}</td>
                    <td className="small">
                      {p.student
                        ? `${p.student.name || "—"} (${p.student.id})`
                        : "—"}
                    </td>
                    <td className="small">{p.student?.rollNo ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          type="button"
          className="btn upload-btn"
          style={{
            background: "linear-gradient(135deg,#15803d,#22c55e)",
            border: "none",
          }}
          onClick={handleMultiUpload}
          disabled={uploading || !multiClass || multiFiles.length === 0}
        >
          {uploading ? "Uploading…" : "Upload multi-select to students"}
        </button>
      </div>

      {/* Bulk upload */}
      <div
        className="upload-card mb-4"
        style={{
          background: cardBg,
          border: darkMode ? "1px solid #475569" : "2px solid #D4A24C",
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
        }}
      >
        <h5 className="sub-heading mb-2">Upload documents for students </h5>
      

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
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-8">
            <label className="form-label small">
              Search student ({bulkListStudents.length} shown)
            </label>
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Name, email, roll…"
              value={bulkSearch}
              onChange={(e) => setBulkSearch(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-sm align-middle mb-2">
            <thead>
              <tr>
                <th style={{ color: textMuted }}>Student</th>
                <th style={{ color: textMuted, minWidth: 180 }}>
                  Link to request (optional)
                </th>
                <th style={{ color: textMuted }}>File</th>
                <th style={{ width: 48 }} />
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
                      <option value="">— Select student —</option>
                      {bulkListStudents.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.rollNo ? `[${s.rollNo}] ` : ""}
                          {s.name || "—"} — {s.id}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={row.relatedRequestId}
                      disabled={!row.studentId}
                      onChange={(e) =>
                        updateBulkRow(row.key, {
                          relatedRequestId: e.target.value,
                        })
                      }
                      style={inputStyle}
                    >
                      <option value="">— Not linked —</option>
                      {pendingForStudent(row.studentId).map((q) => (
                        <option key={q.id} value={q.id}>
                          {(q.documentTitle || "Request").length > 48
                            ? `${(q.documentTitle || "").slice(0, 48)}…`
                            : q.documentTitle || "Request"}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp,application/pdf,image/*"
                      className="form-control form-control-sm"
                      onChange={(e) => onRowFileChange(row.key, e)}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger py-0"
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
            onClick={handleBulkUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading…" : "Upload all"}
          </button>
        </div>
      </div>

      {/* Sent documents log */}
      <h5 className="sub-heading mt-4">Documents sent </h5>
      <div className="table-responsive mb-4">
        <table
          className={`table table-sm table-bordered ${darkMode ? "table-dark" : ""}`}
          style={{ fontSize: "13px" }}
        >
          <thead>
            <tr>
              <th style={{ color: textMuted }}>Student (email)</th>
              <th style={{ color: textMuted }}>File</th>
              <th style={{ color: textMuted }}>Date</th>
              <th style={{ color: textMuted }} />
            </tr>
          </thead>
          <tbody>
            {sentDocs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-muted">
                  No documents yet.
                </td>
              </tr>
            ) : (
              sentDocs.map((item) => (
                <tr key={`${item.studentId}-${item.id}`}>
                  <td className="small text-break">{item.studentId}</td>
                  <td className="small">{item.fileName || "—"}</td>
                  <td className="text-nowrap small">
                    {item.createdAt
                      ? new Date(
                          item.createdAt.seconds * 1000,
                        ).toLocaleString("en-IN")
                      : "—"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary py-0 me-1"
                      onClick={() => handleViewAdmin(item)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger py-0"
                      onClick={() => handleDeleteSent(item)}
                      disabled={deletingId === item.id + item.studentId}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
.certificate-wrapper {
  padding:25px;
  border-radius:22px;
}

.heading {
  font-weight:700;
  color:#0F4C6C;
}

body.dark-mode .heading {
  color:#D4A24C;
}

.sub-heading {
  color:#1B5E84;
  font-weight:600;
}

body.dark-mode .sub-heading {
  color:#D4A24C;
}

.upload-card {
  border-radius:20px;
  padding:22px;
  transition:0.3s ease;
}

.upload-btn {
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  border:none;
  border-radius:10px;
  padding:8px 18px;
}

.upload-btn:disabled {
  opacity:0.6;
}
`}</style>
    </div>
  );
}

export default AdminCertificate;
