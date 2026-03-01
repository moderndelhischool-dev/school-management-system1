// import { useEffect, useState } from "react";
// import { db } from "../../firebase/firebase";
// import { collection, onSnapshot } from "firebase/firestore";

// function UserUniform({ darkMode }) {
//   const [uniforms, setUniforms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewImage, setViewImage] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "uniforms"), (snap) => {
//       const data = snap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       data.sort(
//         (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//       );

//       setUniforms(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const downloadImage = async (url) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const blobUrl = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.download = "uniform-image.jpg";
//     link.click();

//     window.URL.revokeObjectURL(blobUrl);
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-4">
//         <div className="spinner-border text-purple"></div>
//       </div>
//     );
//   }

//   if (uniforms.length === 0) {
//     return (
//       <div
//         className="text-center mt-4"
//         style={{
//           color: darkMode ? "#ddd6fe" : "#6b21a8",
//         }}
//       >
//         No uniform uploaded yet.
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container mt-4"
//       style={{
//         color: darkMode ? "#ffffff" : "#4c1d95",
//       }}
//     >
//       <h4 className="mb-4 text-purple fw-bold">👔 School Uniform</h4>

//       <div className="row">
//         {uniforms.map((item) => (
//           <div key={item.id} className="col-md-6 col-lg-4 mb-4">
//             <div
//               className="uniform-card shadow-sm"
//               style={{
//                 backgroundColor: darkMode ? "#1e1b4b" : "#ffffff",
//                 border: darkMode ? "1px solid #312e81" : "1px solid #ddd6fe",
//               }}
//             >
//               {/* Image */}
//               <div className="image-box">
//                 <img src={item.image} alt="Uniform" />
//               </div>

//               {/* Footer */}
//               <div className="p-3">
//                 <small className="date-text">
//                   {item.createdAt
//                     ? new Date(item.createdAt.seconds * 1000).toLocaleString(
//                         "en-IN",
//                       )
//                     : ""}
//                 </small>

//                 <div className="mt-3 d-flex gap-2">
//                   <button
//                     className="btn btn-sm view-btn"
//                     onClick={() => setViewImage(item.image)}
//                   >
//                     👁 View
//                   </button>

//                   <button
//                     className="btn btn-sm download-btn"
//                     onClick={() => downloadImage(item.image)}
//                   >
//                     ⬇ Download
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* VIEW MODAL */}
//       {viewImage && (
//         <div className="view-overlay" onClick={() => setViewImage(null)}>
//           <div className="view-modal">
//             <img src={viewImage} alt="Preview" />
//           </div>
//         </div>
//       )}

//       <style>{`
//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .uniform-card {
//           border-radius: 16px;
//           transition: 0.3s ease;
//         }

//         .uniform-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 15px 30px rgba(124,58,237,0.3);
//         }

//         .image-box {
//           height: 250px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: ${darkMode ? "#312e81" : "#f3e8ff"};
//           border-top-left-radius: 16px;
//           border-top-right-radius: 16px;
//         }

//         .image-box img {
//           max-height: 100%;
//           max-width: 100%;
//           object-fit: contain;
//         }

//         .date-text {
//           color: ${darkMode ? "#c4b5fd" : "#6b21a8"};
//           font-size: 13px;
//         }

//         .view-btn {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//         }

//         .download-btn {
//           background: linear-gradient(135deg,#22c55e,#15803d);
//           color: white;
//           border: none;
//         }

//         .view-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.8);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//         }

//         .view-modal img {
//           max-width: 90%;
//           max-height: 90vh;
//           border-radius: 12px;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.6);
//           animation: zoomIn 0.3s ease;
//         }

//         @keyframes zoomIn {
//           from { transform: scale(0.8); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }

//         .spinner-border.text-purple {
//           color: #7c3aed !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UserUniform;
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function UserUniform({ darkMode }) {
  const [uniforms, setUniforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewImage, setViewImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "uniforms"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );

      setUniforms(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const downloadImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "uniform-image.jpg";
    link.click();

    window.URL.revokeObjectURL(blobUrl);
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-theme"></div>
      </div>
    );
  }

  if (uniforms.length === 0) {
    return (
      <div
        className="text-center mt-4"
        style={{
          color: darkMode ? "#D4A24C" : "#0F4C6C",
        }}
      >
        No uniform uploaded yet.
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{
        color: darkMode ? "#ffffff" : "#0F4C6C",
      }}
    >
      <h4 className="mb-4 section-title fw-bold">👔 School Uniform</h4>

      <div className="row">
        {uniforms.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="uniform-card shadow-sm"
              style={{
                backgroundColor: darkMode ? "#1B2A35" : "#ffffff",
                border: darkMode ? "1px solid #243644" : "1px solid #E5E7EB",
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
                    className="btn btn-primary-custom btn-sm"
                    onClick={() => setViewImage(item.image)}
                  >
                    👁 View
                  </button>

                  <button
                    className="btn btn-gold-custom btn-sm"
                    onClick={() => downloadImage(item.image)}
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewImage && (
        <div className="view-overlay" onClick={() => setViewImage(null)}>
          <div className="view-modal">
            <img src={viewImage} alt="Preview" />
          </div>
        </div>
      )}

      <style>{`

/* TITLE */
.section-title {
  color: #0F4C6C;
}

body.dark-mode .section-title {
  color: #D4A24C;
}

/* SPINNER */
.text-theme {
  color: #0F4C6C !important;
}

/* CARD */
.uniform-card {
  border-radius: 16px;
  transition: 0.3s ease;
}

.uniform-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(15,76,108,0.25);
}

/* IMAGE BOX */
.image-box {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${darkMode ? "#0A2E42" : "#E6EEF4"};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.image-box img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

/* DATE */
.date-text {
  color: ${darkMode ? "#CBD5E1" : "#4B5563"};
  font-size: 13px;
}

/* PRIMARY BUTTON */
.btn-primary-custom {
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  border: none;
  border-radius: 25px;
  transition: 0.3s ease;
}

.btn-primary-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
}

/* GOLD BUTTON */
.btn-gold-custom {
  background: linear-gradient(135deg,#D4A24C,#C18F2D);
  color: white;
  border: none;
  border-radius: 25px;
  transition: 0.3s ease;
}

.btn-gold-custom:hover {
  opacity: 0.9;
}

/* MODAL */
.view-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.view-modal img {
  max-width: 90%;
  max-height: 90vh;
  border-radius: 14px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.6);
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

      `}</style>
    </div>
  );
}

export default UserUniform;
