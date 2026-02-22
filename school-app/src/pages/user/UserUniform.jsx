// import { useEffect, useState } from "react";
// import { db } from "../../firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";

// function UserUniform() {
//   const [uniforms, setUniforms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUniforms = async () => {
//     const snap = await getDocs(collection(db, "uniforms"));

//     const data = snap.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     data.sort(
//       (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//     );

//     setUniforms(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUniforms();

//     // 🔥 Auto refresh every 1 second
//     const interval = setInterval(() => {
//       fetchUniforms();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-4">
//         <div className="spinner-border text-success"></div>
//       </div>
//     );
//   }

//   if (uniforms.length === 0) {
//     return (
//       <div className="text-center mt-4 text-muted">
//         No uniform uploaded yet.
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">👔 School Uniform</h4>

//       <div className="row">
//         {uniforms.map((item) => (
//           <div key={item.id} className="col-md-6 col-lg-4 mb-4">
//             <div
//               className="card shadow-sm p-3"
//               style={{ borderRadius: "16px" }}
//             >
//               <div
//                 style={{
//                   height: "250px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "#f8fafc",
//                   borderRadius: "12px",
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

//               <small className="text-muted mt-2">
//                 {item.createdAt
//                   ? new Date(item.createdAt.seconds * 1000).toLocaleString(
//                       "en-IN",
//                     )
//                   : ""}
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserUniform;
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function UserUniform({ darkMode }) {
  const [uniforms, setUniforms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUniforms = async () => {
    const snap = await getDocs(collection(db, "uniforms"));

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );

    setUniforms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUniforms();

    // Auto refresh every 1 second
    const interval = setInterval(() => {
      fetchUniforms();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  if (uniforms.length === 0) {
    return (
      <div
        className="text-center mt-4"
        style={{
          color: darkMode ? "#cbd5e1" : "#6c757d",
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
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease",
      }}
    >
      <h4 className="mb-3">👔 School Uniform</h4>

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
              }}
            >
              {/* Image Box */}
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

              {/* Date */}
              <div className="p-3">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserUniform;
