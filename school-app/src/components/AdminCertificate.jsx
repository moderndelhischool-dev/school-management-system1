// import { useState, useEffect } from "react";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   Timestamp,
// } from "firebase/firestore";

// function AdminCertificate({ darkMode }) {
//   const [pdfData, setPdfData] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [certificates, setCertificates] = useState([]);
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const MAX_SIZE = 1024 * 1024;

//   const fetchCertificates = async () => {
//     const snapshot = await getDocs(collection(db, "certificates"));
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     data.sort(
//       (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//     );

//     setCertificates(data);
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       setMessage("❌ Only PDF file allowed.");
//       return;
//     }

//     if (file.size > MAX_SIZE) {
//       setMessage("❌ File must be under 1MB.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       setPdfData(reader.result);
//       setFileName(file.name);
//       setMessage("");
//     };
//   };

//   const handleUpload = async () => {
//     if (!pdfData) {
//       setMessage("Please select PDF file.");
//       return;
//     }

//     try {
//       setUploading(true);

//       await addDoc(collection(db, "certificates"), {
//         file: pdfData,
//         fileName: fileName,
//         createdAt: Timestamp.now(),
//       });

//       setMessage("✅ Certificate uploaded successfully.");
//       setPdfData("");
//       setFileName("");
//       fetchCertificates();
//     } catch {
//       setMessage("Upload failed.");
//     }

//     setUploading(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       setDeletingId(id);
//       await deleteDoc(doc(db, "certificates", id));
//       fetchCertificates();
//     } catch {
//       setMessage("Delete failed.");
//     }
//     setDeletingId(null);
//   };

//   const handleView = (base64File) => {
//     const byteCharacters = atob(base64File.split(",")[1]);
//     const byteNumbers = new Array(byteCharacters.length);

//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: "application/pdf" });
//     const blobUrl = URL.createObjectURL(blob);

//     window.open(blobUrl, "_blank");
//   };

//   return (
//     <div
//       className="container mt-4"
//       style={{
//         transition: "all 0.3s ease",
//         color: darkMode ? "#fff" : "#000",
//       }}
//     >
//       <h4 className="mb-3 text-purple">📜 Upload Certificate (Max 1MB)</h4>

//       {message && <div className="alert alert-purple py-2">{message}</div>}

//       {/* Upload Card */}
//       <div
//         className="card p-3 shadow-sm mb-4"
//         style={{
//           backgroundColor: darkMode ? "#1e293b" : "#fff",
//           borderRadius: "16px",
//         }}
//       >
//         <input
//           type="file"
//           accept="application/pdf"
//           className="form-control mb-3 custom-input"
//           onChange={handleFileChange}
//         />

//         <button
//           className="btn upload-btn"
//           onClick={handleUpload}
//           disabled={uploading}
//         >
//           {uploading ? (
//             <>
//               <span className="spinner-border spinner-border-sm me-2"></span>
//               Uploading...
//             </>
//           ) : (
//             "Upload PDF"
//           )}
//         </button>
//       </div>

//       <h5 className="mb-3">Uploaded Certificates</h5>

//       <div className="row">
//         {certificates.map((item) => (
//           <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
//             <div
//               className="card shadow-sm h-100"
//               style={{
//                 backgroundColor: darkMode ? "#1e293b" : "#fff",
//                 color: darkMode ? "#fff" : "#000",
//                 borderRadius: "16px",
//                 transition: "all 0.3s ease",
//                 opacity: deletingId === item.id ? 0.5 : 1,
//               }}
//             >
//               <div
//                 style={{
//                   background: darkMode ? "#334155" : "#f3f4f6",
//                   padding: "30px",
//                   textAlign: "center",
//                   fontSize: "40px",
//                   borderTopLeftRadius: "16px",
//                   borderTopRightRadius: "16px",
//                 }}
//               >
//                 📄
//               </div>

//               <div className="p-3 d-flex flex-column">
//                 <h6 className="fw-bold text-truncate">{item.fileName}</h6>

//                 <small
//                   className="mb-3"
//                   style={{
//                     color: darkMode ? "#cbd5e1" : "#6c757d",
//                   }}
//                 >
//                   {item.createdAt
//                     ? new Date(item.createdAt.seconds * 1000).toLocaleString(
//                         "en-IN",
//                       )
//                     : ""}
//                 </small>

//                 <div className="mt-auto d-flex gap-2">
//                   <button
//                     className="btn btn-purple btn-sm w-50"
//                     onClick={() => handleView(item.file)}
//                   >
//                     View
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm w-50"
//                     onClick={() => handleDelete(item.id)}
//                     disabled={deletingId === item.id}
//                   >
//                     {deletingId === item.id ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-1"></span>
//                         Deleting...
//                       </>
//                     ) : (
//                       "Delete"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= PURPLE STYLES ================= */}

//       <style>{`
//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .alert-purple {
//           background: #ede9fe;
//           color: #4c1d95;
//           border: 1px solid #c4b5fd;
//         }

//         .upload-btn {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//           transition: 0.3s;
//         }

//         .upload-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 20px rgba(124,58,237,0.4);
//         }

//         .btn-purple {
//           background: #7c3aed;
//           color: white;
//           border: none;
//         }

//         .btn-purple:hover {
//           background: #6d28d9;
//         }

//         .custom-input:focus {
//           border-color: #7c3aed !important;
//           box-shadow: 0 0 12px rgba(124,58,237,0.4);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default AdminCertificate;
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

function AdminCertificate({ darkMode }) {
  const [pdfData, setPdfData] = useState("");
  const [fileName, setFileName] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const MAX_SIZE = 1024 * 1024;

  const fetchCertificates = async () => {
    const snapshot = await getDocs(collection(db, "certificates"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );

    setCertificates(data);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("❌ Only PDF file allowed.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setMessage("❌ File must be under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPdfData(reader.result);
      setFileName(file.name);
      setMessage("");
    };
  };

  const handleUpload = async () => {
    if (!pdfData) {
      setMessage("Please select PDF file.");
      return;
    }

    try {
      setUploading(true);

      await addDoc(collection(db, "certificates"), {
        file: pdfData,
        fileName,
        createdAt: Timestamp.now(),
      });

      setMessage("✅ Certificate uploaded successfully.");
      setPdfData("");
      setFileName("");
      fetchCertificates();
    } catch {
      setMessage("Upload failed.");
    }

    setUploading(false);
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteDoc(doc(db, "certificates", id));
      fetchCertificates();
    } catch {
      setMessage("Delete failed.");
    }
    setDeletingId(null);
  };

  const handleView = (base64File) => {
    const byteCharacters = atob(base64File.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  };

  return (
    <div
      className="certificate-wrapper"
      style={{
        background: darkMode ? "#0f172a" : "#f9fafb",
        color: darkMode ? "#f1f5f9" : "#111827",
      }}
    >
      <h4 className="heading">📜 Upload Certificate (Max 1MB)</h4>

      {message && (
        <div
          className="alert-box"
          style={{
            background: darkMode ? "#1e293b" : "#ffffff",
            borderLeft: darkMode ? "4px solid #D4A24C" : "4px solid #0F4C6C",
            color: darkMode ? "#f1f5f9" : "#111827",
          }}
        >
          {message}
        </div>
      )}

      {/* Upload Card */}
      <div
        className="upload-card"
        style={{
          background: darkMode ? "#1e293b" : "#ffffff",
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          className="form-control mb-3 custom-input"
          onChange={handleFileChange}
          style={{
            background: darkMode ? "#334155" : "#ffffff",
            color: darkMode ? "#ffffff" : "#111827",
            border: darkMode ? "1px solid #475569" : "1px solid #ced4da",
          }}
        />

        <button
          className="btn upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>

      <h5 className="sub-heading mt-4">Uploaded Certificates</h5>

      <div className="row">
        {certificates.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="certificate-card h-100"
              style={{
                background: darkMode ? "#1e293b" : "#ffffff",
                opacity: deletingId === item.id ? 0.5 : 1,
              }}
            >
              <div
                className="icon-box"
                style={{
                  background: darkMode ? "#334155" : "#E8EEF2",
                }}
              >
                📄
              </div>

              <div className="p-3 d-flex flex-column">
                <h6 className="fw-bold text-truncate">{item.fileName}</h6>

                <small
                  className="date-text mb-3"
                  style={{
                    color: darkMode ? "#94a3b8" : "#64748B",
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
                    className="btn view-btn btn-sm w-50"
                    onClick={() => handleView(item.file)}
                  >
                    View
                  </button>

                  <button
                    className="btn delete-btn btn-sm w-50"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
}

body.dark-mode .sub-heading {
  color:#D4A24C;
}

.upload-card {
  border-radius:20px;
  padding:22px;
  transition:0.3s ease;
}

.upload-card:hover {
  transform:translateY(-4px);
}

.certificate-card {
  border-radius:18px;
  box-shadow:0 12px 30px rgba(0,0,0,0.08);
  transition:0.3s ease;
}

.certificate-card:hover {
  transform:translateY(-6px);
}

.icon-box {
  padding:30px;
  text-align:center;
  font-size:40px;
  border-top-left-radius:18px;
  border-top-right-radius:18px;
}

.upload-btn {
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  border:none;
  border-radius:10px;
  padding:8px 18px;
}

.view-btn {
  background:linear-gradient(135deg,#1B5E84,#0F4C6C);
  color:white;
  border:none;
}

.delete-btn {
  background:linear-gradient(135deg,#DC2626,#991B1B);
  color:white;
  border:none;
}

.custom-input:focus {
  border-color:#D4A24C !important;
  box-shadow:0 0 10px rgba(212,162,76,0.3);
}
`}</style>
    </div>
  );
}

export default AdminCertificate;
