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

// function AdminCertificate() {
//   const [pdfData, setPdfData] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [certificates, setCertificates] = useState([]);
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const MAX_SIZE = 1024 * 1024; // 1MB

//   // Fetch certificates
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

//   // File select
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

//   // Upload
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

//   // Delete
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

//   // View PDF properly (No blank)
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
//     <div className="container mt-4">
//       <h4 className="mb-3">📜 Upload Certificate (Max 1MB)</h4>

//       {message && <div className="alert alert-info py-2">{message}</div>}

//       {/* Upload Card */}
//       <div className="card p-3 shadow-sm mb-4">
//         <input
//           type="file"
//           accept="application/pdf"
//           className="form-control mb-3"
//           onChange={handleFileChange}
//         />

//         <button
//           className="btn btn-success"
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

//       {certificates.length === 0 && (
//         <p className="text-muted">No certificates uploaded.</p>
//       )}

//       {certificates.map((item) => (
//         <div
//           key={item.id}
//           className="card shadow-sm mb-4"
//           style={{
//             transition: "all 0.3s ease",
//             opacity: deletingId === item.id ? 0.5 : 1,
//           }}
//         >
//           {/* Top Icon */}
//           <div
//             style={{
//               background: "#f1f5f9",
//               padding: "30px",
//               textAlign: "center",
//               fontSize: "40px",
//             }}
//           >
//             📄
//           </div>

//           {/* Details */}
//           <div className="p-3">
//             <h6 className="fw-bold">{item.fileName}</h6>

//             <small className="text-muted d-block mb-3">
//               {item.createdAt
//                 ? new Date(item.createdAt.seconds * 1000).toLocaleString(
//                     "en-IN",
//                   )
//                 : ""}
//             </small>

//             <div className="d-flex gap-2">
//               <button
//                 className="btn btn-primary btn-sm"
//                 onClick={() => handleView(item.file)}
//               >
//                 View
//               </button>

//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDelete(item.id)}
//                 disabled={deletingId === item.id}
//               >
//                 {deletingId === item.id ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Deleting...
//                   </>
//                 ) : (
//                   "Delete"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
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

  const MAX_SIZE = 1024 * 1024; // 1MB

  // Fetch certificates
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

  // File select
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

  // Upload
  const handleUpload = async () => {
    if (!pdfData) {
      setMessage("Please select PDF file.");
      return;
    }

    try {
      setUploading(true);

      await addDoc(collection(db, "certificates"), {
        file: pdfData,
        fileName: fileName,
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

  // Delete
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

  // View PDF properly
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
      className="container mt-4"
      style={{
        transition: "all 0.3s ease",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h4 className="mb-3">📜 Upload Certificate (Max 1MB)</h4>

      {message && <div className="alert alert-info py-2">{message}</div>}

      {/* Upload Card */}
      <div
        className="card p-3 shadow-sm mb-4"
        style={{
          backgroundColor: darkMode ? "#1e293b" : "#fff",
          borderRadius: "16px",
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          className="form-control mb-3"
          onChange={handleFileChange}
        />

        <button
          className="btn btn-success"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Uploading...
            </>
          ) : (
            "Upload PDF"
          )}
        </button>
      </div>

      <h5 className="mb-3">Uploaded Certificates</h5>

      <div className="row">
        {certificates.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100"
              style={{
                backgroundColor: darkMode ? "#1e293b" : "#fff",
                color: darkMode ? "#fff" : "#000",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                opacity: deletingId === item.id ? 0.5 : 1,
              }}
            >
              {/* Top Icon */}
              <div
                style={{
                  background: darkMode ? "#334155" : "#f1f5f9",
                  padding: "30px",
                  textAlign: "center",
                  fontSize: "40px",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                📄
              </div>

              {/* Details */}
              <div className="p-3 d-flex flex-column">
                <h6 className="fw-bold text-truncate">{item.fileName}</h6>

                <small
                  className="mb-3"
                  style={{
                    color: darkMode ? "#cbd5e1" : "#6c757d",
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
                    className="btn btn-primary btn-sm w-50"
                    onClick={() => handleView(item.file)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1"></span>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCertificate;
