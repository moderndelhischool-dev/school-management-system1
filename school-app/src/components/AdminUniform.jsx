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

// function AdminUniform() {
//   const [preview, setPreview] = useState("");
//   const [imageData, setImageData] = useState(null);
//   const [uniforms, setUniforms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   /* ================= FETCH DATA ================= */
//   const fetchUniforms = async () => {
//     const snap = await getDocs(collection(db, "uniforms"));
//     const data = snap.docs.map((d) => ({
//       id: d.id,
//       ...d.data(),
//     }));

//     data.sort(
//       (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//     );

//     setUniforms(data);
//   };

//   useEffect(() => {
//     fetchUniforms();
//   }, []);

//   /* ================= IMAGE COMPRESS ================= */
//   const compressImage = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);

//       reader.onload = (event) => {
//         const img = new Image();
//         img.src = event.target.result;

//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");

//           const MAX_WIDTH = 900;
//           const scaleSize = MAX_WIDTH / img.width;

//           canvas.width = MAX_WIDTH;
//           canvas.height = img.height * scaleSize;

//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//           const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);

//           resolve(compressedBase64);
//         };
//       };
//     });
//   };

//   /* ================= FILE SELECT ================= */
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     if (!file.type.includes("image")) {
//       setMessage("Only image allowed.");
//       return;
//     }

//     setLoading(true);

//     const compressed = await compressImage(file);

//     setPreview(compressed);
//     setImageData(compressed);

//     setLoading(false);
//   };

//   /* ================= UPLOAD ================= */
//   const handleUpload = async () => {
//     if (!imageData) {
//       setMessage("Please select image first.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await addDoc(collection(db, "uniforms"), {
//         image: imageData,
//         createdAt: Timestamp.now(),
//       });

//       setMessage("Uniform uploaded successfully ✅");
//       setPreview("");
//       setImageData(null);

//       fetchUniforms();
//     } catch (error) {
//       setMessage("Upload failed. Image too large.");
//     }

//     setLoading(false);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, "uniforms", id));
//     fetchUniforms();
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container mt-3">
//       <h4 className="mb-3">👔 Upload Uniform</h4>

//       {message && <div className="alert alert-info py-2">{message}</div>}

//       <input
//         type="file"
//         accept="image/*"
//         className="form-control mb-3"
//         onChange={handleFileChange}
//       />

//       {preview && (
//         <div
//           style={{
//             height: "260px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background: "#f1f5f9",
//             borderRadius: "12px",
//             marginBottom: "15px",
//           }}
//         >
//           <img
//             src={preview}
//             alt="Preview"
//             style={{
//               maxHeight: "100%",
//               maxWidth: "100%",
//               objectFit: "contain",
//             }}
//           />
//         </div>
//       )}

//       {loading && (
//         <div className="text-center mb-3">
//           <div className="spinner-border text-success"></div>
//         </div>
//       )}

//       <button
//         className="btn btn-success mb-4"
//         onClick={handleUpload}
//         disabled={loading}
//       >
//         Upload
//       </button>

//       <h5 className="mb-3">Uploaded Uniforms</h5>

//       <div className="row">
//         {uniforms.map((item) => (
//           <div key={item.id} className="col-md-4 mb-4">
//             <div className="card p-3 shadow-sm">
//               {/* Image Box */}
//               <div
//                 style={{
//                   height: "250px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "#f8fafc",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <img
//                   src={item.image}
//                   alt="Uniform"
//                   style={{
//                     maxHeight: "100%",
//                     maxWidth: "100%",
//                     objectFit: "contain",
//                   }}
//                 />
//               </div>

//               {/* Date */}
//               <small className="text-muted mt-2">
//                 {item.createdAt
//                   ? new Date(item.createdAt.seconds * 1000).toLocaleString(
//                       "en-IN",
//                     )
//                   : ""}
//               </small>

//               {/* Delete */}
//               <button
//                 className="btn btn-danger btn-sm mt-2"
//                 onClick={() => handleDelete(item.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminUniform;
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

function AdminUniform({ darkMode }) {
  const [preview, setPreview] = useState("");
  const [imageData, setImageData] = useState(null);
  const [uniforms, setUniforms] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const [message, setMessage] = useState("");

  /* ================= REALTIME FETCH ================= */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "uniforms"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );

      setUniforms(data);
    });

    return () => unsubscribe();
  }, []);

  /* ================= IMAGE COMPRESS ================= */
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 900;
          const scaleSize = MAX_WIDTH / img.width;

          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
      };
    });
  };

  /* ================= FILE CHANGE ================= */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      setMessage("Only image allowed.");
      return;
    }

    setUploading(true);
    const compressed = await compressImage(file);
    setPreview(compressed);
    setImageData(compressed);
    setUploading(false);
  };

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    if (!imageData) {
      setMessage("Please select image first.");
      return;
    }

    try {
      setUploading(true);

      await addDoc(collection(db, "uniforms"), {
        image: imageData,
        createdAt: Timestamp.now(),
      });

      setMessage("Uniform uploaded successfully ✅");
      setPreview("");
      setImageData(null);
    } catch {
      setMessage("Upload failed.");
    }

    setUploading(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteDoc(doc(db, "uniforms", id));
    } catch {
      setMessage("Delete failed.");
    }
    setDeletingId(null);
  };

  return (
    <div
      className="container mt-4"
      style={{
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h4 className="mb-3 text-purple fw-bold">👔 Upload Uniform</h4>

      {message && <div className="alert alert-purple py-2">{message}</div>}

      {/* ================= UPLOAD CARD ================= */}
      <div
        className="card p-3 shadow-sm mb-4"
        style={{
          backgroundColor: darkMode ? "#1e1b4b" : "#fff",
          borderRadius: "16px",
          border: darkMode ? "1px solid #312e81" : "1px solid #ddd6fe",
        }}
      >
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3 custom-input"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button
          className="btn upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* ================= UNIFORM LIST ================= */}
      <h5 className="mb-3">Uploaded Uniforms</h5>

      <div className="row">
        {uniforms.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="uniform-card shadow-sm"
              style={{
                backgroundColor: darkMode ? "#1e1b4b" : "#fff",
                border: darkMode ? "1px solid #312e81" : "1px solid #ddd6fe",
                opacity: deletingId === item.id ? 0.6 : 1,
              }}
            >
              <div className="image-box">
                <img src={item.image} alt="Uniform" />
              </div>

              <div className="p-3">
                <small className="date-text">
                  {item.createdAt
                    ? new Date(item.createdAt.seconds * 1000).toLocaleString(
                        "en-IN",
                      )
                    : ""}
                </small>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-sm view-btn"
                    onClick={() => setViewImage(item.image)}
                  >
                    👁 View
                  </button>

                  <button
                    className="btn btn-sm delete-btn"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewImage && (
        <div className="view-overlay" onClick={() => setViewImage(null)}>
          <div className="view-modal">
            <img src={viewImage} alt="Preview" />
          </div>
        </div>
      )}

      <style>{`
        .text-purple {
          color: #7c3aed !important;
        }

        .alert-purple {
          background: #ede9fe;
          color: #4c1d95;
          border: 1px solid #c4b5fd;
        }

        .upload-btn {
          background: linear-gradient(135deg,#7c3aed,#4c1d95);
          color: white;
          border: none;
        }

        .uniform-card {
          border-radius: 16px;
          transition: 0.3s ease;
        }

        .uniform-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(124,58,237,0.3);
        }

        .image-box {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${darkMode ? "#312e81" : "#f3e8ff"};
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .image-box img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }

        .view-btn {
          background: linear-gradient(135deg,#7c3aed,#4c1d95);
          color: white;
          border: none;
        }

        .delete-btn {
          background: linear-gradient(135deg,#dc2626,#991b1b);
          color: white;
          border: none;
        }

        .view-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .view-modal img {
          max-width: 90%;
          max-height: 90vh;
          border-radius: 12px;
          animation: zoomIn 0.3s ease;
        }

        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .preview-box {
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${darkMode ? "#334155" : "#f3f4f6"};
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .preview-box img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }

        .date-text {
          color: ${darkMode ? "#cbd5e1" : "#6c757d"};
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}

export default AdminUniform;
