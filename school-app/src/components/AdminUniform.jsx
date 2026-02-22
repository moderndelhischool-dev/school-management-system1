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
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

function AdminUniform({ darkMode }) {
  const [preview, setPreview] = useState("");
  const [imageData, setImageData] = useState(null);
  const [uniforms, setUniforms] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchUniforms = async () => {
    const snap = await getDocs(collection(db, "uniforms"));
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );

    setUniforms(data);
  };

  useEffect(() => {
    fetchUniforms();
  }, []);

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

          const compressed = canvas.toDataURL("image/jpeg", 0.8);
          resolve(compressed);
        };
      };
    });
  };

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
      fetchUniforms();
    } catch {
      setMessage("Upload failed.");
    }

    setUploading(false);
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteDoc(doc(db, "uniforms", id));
      fetchUniforms();
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
        transition: "all 0.3s ease",
      }}
    >
      <h4 className="mb-3 text-purple">👔 Upload Uniform</h4>

      {message && <div className="alert alert-purple py-2">{message}</div>}

      <div
        className="card p-3 shadow-sm mb-4"
        style={{
          backgroundColor: darkMode ? "#1e293b" : "#fff",
          borderRadius: "16px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3 custom-input"
          onChange={handleFileChange}
        />

        {preview && (
          <div
            style={{
              height: "260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: darkMode ? "#334155" : "#f3f4f6",
              borderRadius: "12px",
              marginBottom: "15px",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <button
          className="btn upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>

      <h5 className="mb-3">Uploaded Uniforms</h5>

      <div className="row">
        {uniforms.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100"
              style={{
                backgroundColor: darkMode ? "#1e293b" : "#fff",
                color: darkMode ? "#fff" : "#000",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                opacity: deletingId === item.id ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: darkMode ? "#334155" : "#f8fafc",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <img
                  src={item.image}
                  alt="Uniform"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="p-3 d-flex flex-column">
                <small
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

                <button
                  className="btn btn-danger btn-sm mt-3"
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
        ))}
      </div>

      {/* ================= PURPLE STYLES ================= */}

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
          transition: 0.3s;
        }

        .upload-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(124,58,237,0.4);
        }

        .custom-input:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 12px rgba(124,58,237,0.4);
        }
      `}</style>
    </div>
  );
}

export default AdminUniform;
