// import { useEffect, useState } from "react";
// import { db } from "../../firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";

// function UserCertificate({ darkMode }) {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

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
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

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

//   const handleDownload = (base64File, name) => {
//     const link = document.createElement("a");
//     link.href = base64File;
//     link.download = name;
//     link.click();
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-4">
//         <div className="spinner-border text-purple"></div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container mt-4"
//       style={{
//         color: darkMode ? "#fff" : "#000",
//         transition: "all 0.3s ease",
//       }}
//     >
//       <h4 className="mb-4 text-purple">📜 Available Certificates</h4>

//       {certificates.length === 0 && (
//         <p style={{ color: darkMode ? "#c4b5fd" : "#6b21a8" }}>
//           No certificates available.
//         </p>
//       )}

//       <div className="row">
//         {certificates.map((item) => (
//           <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
//             <div
//               className="card shadow-sm h-100 certificate-card"
//               style={{
//                 backgroundColor: darkMode ? "#1e1b4b" : "#ffffff",
//                 color: darkMode ? "#fff" : "#000",
//                 borderRadius: "16px",
//                 transition: "all 0.3s ease",
//                 border: "1px solid #ddd6fe",
//               }}
//             >
//               {/* Top Icon */}
//               <div
//                 className="certificate-top"
//                 style={{
//                   background: darkMode
//                     ? "linear-gradient(135deg,#312e81,#1e1b4b)"
//                     : "linear-gradient(135deg,#f3e8ff,#ede9fe)",
//                   padding: "30px",
//                   textAlign: "center",
//                   fontSize: "40px",
//                   borderTopLeftRadius: "16px",
//                   borderTopRightRadius: "16px",
//                 }}
//               >
//                 📄
//               </div>

//               {/* Details */}
//               <div className="p-3 d-flex flex-column">
//                 <h6 className="fw-bold text-truncate">{item.fileName}</h6>

//                 <small
//                   className="mb-3"
//                   style={{
//                     color: darkMode ? "#c4b5fd" : "#6b21a8",
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
//                     className="btn btn-outline-purple btn-sm w-50"
//                     onClick={() => handleDownload(item.file, item.fileName)}
//                   >
//                     Download
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style>{`
//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .text-purple-light {
//           color: #a78bfa !important;
//         }

//         .btn-purple {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//         }

//         .btn-purple:hover {
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//           transform: translateY(-2px);
//         }

//         .btn-outline-purple {
//           border: 1px solid #7c3aed;
//           color: #7c3aed;
//           background: transparent;
//         }

//         .btn-outline-purple:hover {
//           background: #7c3aed;
//           color: white;
//         }

//         .text-purple {
//           color: #7c3aed;
//         }

//         .certificate-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 12px 30px rgba(124,58,237,0.25);
//         }

//         .text-purple {
//           color: #7c3aed;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UserCertificate;
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function UserCertificate({ darkMode }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

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

  const handleDownload = (base64File, name) => {
    const link = document.createElement("a");
    link.href = base64File;
    link.download = name;
    link.click();
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-theme"></div>
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease",
      }}
    >
      <h4 className="mb-4 section-title">📜 Available Certificates</h4>

      {certificates.length === 0 && (
        <p style={{ color: darkMode ? "#D4A24C" : "#0F4C6C" }}>
          No certificates available.
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
              {/* Top Icon Section */}
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

              {/* Details */}
              <div className="p-3 d-flex flex-column">
                <h6 className="fw-bold text-truncate">{item.fileName}</h6>

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
                    className="btn-primary-custom btn-sm w-50"
                    onClick={() => handleView(item.file)}
                  >
                    View
                  </button>

                  <button
                    className="btn-outline-custom btn-sm w-50"
                    onClick={() => handleDownload(item.file, item.fileName)}
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

/* TITLE */
.section-title {
  color: #0F4C6C;
  font-weight: 700;
}

/* SPINNER */
.text-theme {
  color: #0F4C6C;
}

/* CARD HOVER */
.certificate-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(15,76,108,0.25);
}

/* PRIMARY BUTTON */
.btn-primary-custom {
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  border: none;
  border-radius: 30px;
  transition: 0.3s ease;
}

.btn-primary-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
  transform: translateY(-2px);
}

/* OUTLINE BUTTON */
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

/* DARK MODE */
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
