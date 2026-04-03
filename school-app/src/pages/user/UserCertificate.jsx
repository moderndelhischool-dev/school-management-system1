import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";


function UserCertificate({ student, darkMode }) {
  const [certificates, setCertificates] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestedDocument, setRequestedDocument] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reqMessage, setReqMessage] = useState("");

  const studentId = student?.email;

  useEffect(() => {
    if (!studentId) {
      setCertificates([]);
      setRequests([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const certSnap = await getDocs(
          collection(db, "students", studentId, "certificates"),
        );
        const certData = certSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        certData.sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
        );
        setCertificates(certData);

        const reqQ = query(
          collection(db, "certificateRequests"),
          where("studentId", "==", studentId),
        );
        const reqSnap = await getDocs(reqQ);
        const reqData = reqSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        reqData.sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
        );
        setRequests(reqData);
      } catch (e) {
        console.error(e);
        setCertificates([]);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [studentId]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const title = requestedDocument.trim();
    if (!title) {
      setReqMessage("Please write which document you need.");
      return;
    }
    try {
      setSubmitting(true);
      setReqMessage("");
      await addDoc(collection(db, "certificateRequests"), {
        studentId,
        studentName: student?.name || "",
        studentEmail: student?.email || studentId,
        studentClass: student?.class != null ? String(student.class) : "",
        studentRoll:
          student?.rollNo != null ? String(student.rollNo) : "",
        documentTitle: title,
        note: "",
        status: "pending",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      setReqMessage("Request sent. The office will review it.");
      setRequestedDocument("");
      const reqQ = query(
        collection(db, "certificateRequests"),
        where("studentId", "==", studentId),
      );
      const reqSnap = await getDocs(reqQ);
      const reqData = reqSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      reqData.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
      setRequests(reqData);
    } catch (err) {
      setReqMessage(err?.message || "Could not send request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpen = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (url, name, mimeType) => {
    if (!url) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const type = mimeType || blob.type || "application/octet-stream";
      const fileBlob =
        blob.type === type ? blob : new Blob([blob], { type });
      const blobUrl = URL.createObjectURL(fileBlob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name || "document";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const statusBadge = (status) => {
    const s = status || "pending";
    const map = {
      pending: { bg: "#fef3c7", color: "#92400e", label: "Pending" },
      fulfilled: { bg: "#d1fae5", color: "#065f46", label: "Ready / done" },
      rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
    };
    const m = map[s] || map.pending;
    return (
      <span
        className="badge rounded-pill"
        style={{ background: m.bg, color: m.color }}
      >
        {m.label}
      </span>
    );
  };

  if (!studentId) {
    return (
      <div className="container mt-4">
        <p style={{ color: darkMode ? "#94a3b8" : "#4B5563" }}>
          No student profile is linked to this account.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-theme" />
      </div>
    );
  }

  const inputBg = darkMode ? "#334155" : "#fff";
  const inputBr = darkMode ? "#475569" : "#ced4da";

  return (
    <div
      className="container mt-4"
      style={{
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease",
      }}
    >
      <h4 className="mb-3 section-title">📜 Certificates & documents</h4>

      {/* Request a document */}
      <div
        className="card shadow-sm mb-4 p-4"
        style={{
          background: darkMode ? "#1B2A35" : "#f8fafc",
          border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          borderRadius: "16px",
        }}
      >
        <h5 className="mb-2" style={{ color: darkMode ? "#D4A24C" : "#0F4C6C" }}>
          Request a document
        </h5>
        
        <form onSubmit={handleSubmitRequest}>
          <label className="form-label small">Your request</label>
          <input
            type="text"
            className="form-control mb-3"
            required
            autoComplete="off"
            placeholder="Request for Document"
            value={requestedDocument}
            onChange={(e) => setRequestedDocument(e.target.value)}
            style={{ background: inputBg, color: darkMode ? "#fff" : "#111", borderColor: inputBr }}
          />
          {reqMessage && (
            <p className="small mb-2" style={{ color: darkMode ? "#86efac" : "#166534" }}>
              {reqMessage}
            </p>
          )}
          <button
            type="submit"
            className="btn-primary-custom"
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send request"}
          </button>
        </form>
      </div>

      {/* My requests */}
      {requests.length > 0 && (
        <div className="mb-4">
          <h5 className="mb-3" style={{ color: darkMode ? "#D4A24C" : "#0F4C6C" }}>
            My requests
          </h5>
          <div className="table-responsive">
            <table
              className={`table table-sm ${darkMode ? "table-dark" : ""}`}
              style={{ fontSize: "14px" }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Document</th>
                  <th>Status</th>
                  <th>Your file</th>
                  <th>Note from school</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => {
                  const linkedCert = certificates.find(
                    (c) =>
                      (r.fulfilledCertificateDocId &&
                        c.id === r.fulfilledCertificateDocId) ||
                      c.relatedRequestId === r.id,
                  );
                  const canOpen =
                    (r.status || "pending") === "fulfilled" && linkedCert?.downloadURL;
                  return (
                    <tr key={r.id}>
                      <td className="text-nowrap">
                        {r.createdAt
                          ? new Date(r.createdAt.seconds * 1000).toLocaleString(
                              "en-IN",
                            )
                          : "—"}
                      </td>
                      <td>{r.documentTitle}</td>
                      <td>{statusBadge(r.status)}</td>
                      <td>
                        {canOpen ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary py-0"
                            onClick={() => handleOpen(linkedCert.downloadURL)}
                          >
                            Open
                          </button>
                        ) : (
                          <small style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
                            —
                          </small>
                        )}
                      </td>
                      <td>
                        <small>{r.adminNote || "—"}</small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h5 className="mb-3" style={{ color: darkMode ? "#D4A24C" : "#0F4C6C" }}>
        Documents from school
      </h5>
      <p className="small mb-4" style={{ color: darkMode ? "#94a3b8" : "#4B5563" }}>
        Files uploaded by the office appear here. Open or download (PDF, Word,
        images, etc.).
      </p>

      {certificates.length === 0 && (
        <p style={{ color: darkMode ? "#D4A24C" : "#0F4C6C" }}>
          No documents uploaded yet.
        </p>
      )}

      <div className="row">
        {certificates.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100 certificate-card"
              style={{
                backgroundColor: darkMode ? "#1B2A35" : "#ffffff",
                color: darkMode ? "#fff" : "#000",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                border: "1px solid #E5E7EB",
              }}
            >
              <div
                className="certificate-top"
                style={{
                  background: darkMode
                    ? "linear-gradient(135deg,#0A2E42,#0F4C6C)"
                    : "linear-gradient(135deg,#E6EEF4,#F4F6F8)",
                  padding: "30px",
                  textAlign: "center",
                  fontSize: "40px",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  color: darkMode ? "#D4A24C" : "#0F4C6C",
                }}
              >
                📄
              </div>

              <div className="p-3 d-flex flex-column">
                <h6 className="fw-bold text-truncate" title={item.fileName}>
                  {item.fileName}
                </h6>

                <small
                  className="mb-1 text-truncate"
                  style={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                  title={item.mimeType || ""}
                >
                  {item.mimeType || "File"}
                </small>

                <small
                  className="mb-3"
                  style={{
                    color: darkMode ? "#CBD5E1" : "#4B5563",
                  }}
                >
                  {item.createdAt
                    ? new Date(item.createdAt.seconds * 1000).toLocaleString(
                        "en-IN",
                      )
                    : ""}
                </small>

                <div className="mt-auto d-flex gap-2">
                  <button
                    type="button"
                    className="btn-primary-custom btn-sm w-50"
                    onClick={() => handleOpen(item.downloadURL)}
                  >
                    Open
                  </button>

                  <button
                    type="button"
                    className="btn-outline-custom btn-sm w-50"
                    onClick={() =>
                      handleDownload(
                        item.downloadURL,
                        item.fileName,
                        item.mimeType,
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
.section-title {
  color: #0F4C6C;
  font-weight: 700;
}
.text-theme {
  color: #0F4C6C;
}
.certificate-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(15,76,108,0.25);
}
.btn-primary-custom {
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 8px 20px;
  transition: 0.3s ease;
}
.btn-primary-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
  transform: translateY(-2px);
}
.btn-outline-custom {
  border: 1px solid #0F4C6C;
  color: #0F4C6C;
  background: transparent;
  border-radius: 30px;
  transition: 0.3s ease;
}
.btn-outline-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
  border-color: #D4A24C;
}
body.dark-mode .section-title {
  color: #D4A24C;
}
body.dark-mode .btn-outline-custom {
  border: 1px solid #D4A24C;
  color: #D4A24C;
}
body.dark-mode .btn-outline-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
}
      `}</style>
    </div>
  );
}

export default UserCertificate;
