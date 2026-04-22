// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";

// function ClassBlocks({ darkMode }) {
//   const [classCount, setClassCount] = useState({});

//   useEffect(() => {
//     const loadStudents = async () => {
//       const snap = await getDocs(collection(db, "students"));

//       const counts = {};

//       snap.docs.forEach((doc) => {
//         const data = doc.data();
//         const cls = data.class;

//         if (cls) {
//           counts[cls] = (counts[cls] || 0) + 1;
//         }
//       });

//       setClassCount(counts);
//     };

//     loadStudents();
//   }, []);

//   const totalStudents = Object.values(classCount).reduce(
//     (acc, val) => acc + val,
//     0,
//   );

//   const cardStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#111827",
//     borderRadius: "18px",
//     border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
//     boxShadow: darkMode
//       ? "0 10px 30px rgba(0,0,0,0.6)"
//       : "0 6px 20px rgba(0,0,0,0.08)",
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//     height: "100%",
//   };

//   const hoverEffect = (e, enter) => {
//     if (enter) {
//       e.currentTarget.style.transform = "translateY(-8px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 15px 40px rgba(124,58,237,0.4)"
//         : "0 15px 35px rgba(124,58,237,0.25)";
//     } else {
//       e.currentTarget.style.transform = "translateY(0px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 10px 30px rgba(0,0,0,0.6)"
//         : "0 6px 20px rgba(0,0,0,0.08)";
//     }
//   };

//   return (
//     <>
//       {/* ===== TOTAL SUMMARY CARD ===== */}
//       <div className="mb-5">
//         <div
//           className="p-4 text-center"
//           style={{
//             borderRadius: "20px",
//             background: "linear-gradient(135deg,#7c3aed,#4c1d95)",
//             color: "#ffffff",
//             boxShadow: "0 12px 35px rgba(124,58,237,0.35)",
//           }}
//         >
//           <h5 className="mb-1 fw-semibold">🎓 Total Students</h5>
//           <h2 className="fw-bold mb-0">{totalStudents}</h2>
//         </div>
//       </div>

//       {/* ===== CLASS BLOCKS ===== */}
//       <div className="row g-4">
//         {Object.keys(classCount)
//           .sort((a, b) => {
//             const convert = (cls) => {
//               if (cls === "+1") return 11;
//               if (cls === "+2") return 12;
//               return parseInt(cls);
//             };
//             return convert(a) - convert(b);
//           })
//           .map((cls) => (
//             <div className="col-6 col-md-4 col-lg-3" key={cls}>
//               <div
//                 className="text-center p-4 d-flex flex-column justify-content-center"
//                 style={cardStyle}
//                 onMouseEnter={(e) => hoverEffect(e, true)}
//                 onMouseLeave={(e) => hoverEffect(e, false)}
//               >
//                 <h6
//                   style={{
//                     opacity: 0.7,
//                     fontWeight: "500",
//                     color: darkMode ? "#c4b5fd" : "#6d28d9",
//                   }}
//                 >
//                   Class {cls}
//                 </h6>

//                 <h3 className="fw-bold mt-3 mb-1" style={{ color: "#7c3aed" }}>
//                   {classCount[cls]}
//                 </h3>

//                 <small style={{ opacity: 0.7 }}>Students</small>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// }

// export default ClassBlocks;
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function ClassBlocks({ darkMode }) {
  const [classCount, setClassCount] = useState({});

  useEffect(() => {
    const loadStudents = async () => {
      const snap = await getDocs(collection(db, "students"));

      const counts = {};
      snap.docs.forEach((doc) => {
        const data = doc.data();
        const cls = data.class;
        if (cls) {
          counts[cls] = (counts[cls] || 0) + 1;
        }
      });

      setClassCount(counts);
    };

    loadStudents();
  }, []);

  const totalStudents = Object.values(classCount).reduce(
    (acc, val) => acc + val,
    0,
  );

  const cardStyle = {
    background: darkMode
      ? "linear-gradient(135deg,#1B2A35,#0A2E42)"
      : "linear-gradient(135deg,#ffffff,#F4F6F8)",
    color: darkMode ? "#ffffff" : "#1B2A35",
    borderRadius: "20px",
    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
    boxShadow: darkMode
      ? "0 12px 35px rgba(0,0,0,0.6)"
      : "0 10px 25px rgba(15,76,108,0.12)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    height: "100%",
  };

  const hoverEffect = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = darkMode
        ? "0 20px 45px rgba(0,0,0,0.7)"
        : "0 20px 45px rgba(15,76,108,0.25)";
    } else {
      e.currentTarget.style.transform = "translateY(0px)";
      e.currentTarget.style.boxShadow = darkMode
        ? "0 12px 35px rgba(0,0,0,0.6)"
        : "0 10px 25px rgba(15,76,108,0.12)";
    }
  };

  return (
    <>
      {/* ===== TOTAL SUMMARY CARD ===== */}
      <div className="mb-5">
        <div className="p-4 text-center total-card">
          <h5 className="mb-1 fw-semibold">🎓 Total Students</h5>
          <h2 className="fw-bold mb-0">{totalStudents}</h2>
        </div>
      </div>

      {/* ===== CLASS BLOCKS ===== */}
      <div className="row g-4">
        {Object.keys(classCount)
          .sort((a, b) => {
            const convert = (cls) => {
              const s = String(cls || "").trim().toLowerCase();
              if (s === "nursery") return -1;
              if (s === "lkg") return 0;
              if (s === "ukg") return 1;
              if (cls === "+1") return 11;
              if (cls === "+2") return 12;
              const n = parseInt(s.replace("+", ""), 10);
              return Number.isFinite(n) ? n : 999;
            };
            return convert(a) - convert(b);
          })
          .map((cls) => (
            <div className="col-6 col-md-4 col-lg-3" key={cls}>
              <div
                className="text-center p-4 d-flex flex-column justify-content-center class-card"
                style={cardStyle}
                onMouseEnter={(e) => hoverEffect(e, true)}
                onMouseLeave={(e) => hoverEffect(e, false)}
              >
                <h6 className="class-title">Class {cls}</h6>

                <h3 className="fw-bold mt-3 mb-1 class-count">
                  {classCount[cls]}
                </h3>

                <small style={{ opacity: 0.7 }}>Students</small>
              </div>
            </div>
          ))}
      </div>

      <style>{`

        /* ===== TOTAL CARD ===== */
        .total-card {
          border-radius: 22px;
          background: linear-gradient(135deg,#0F4C6C,#1B5E84);
          color: #ffffff;
          box-shadow: 0 18px 45px rgba(15,76,108,0.35);
          transition: 0.3s ease;
        }

        body.dark-mode .total-card {
          background: linear-gradient(135deg,#0A2E42,#1B2A35);
        }

        .total-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 60px rgba(15,76,108,0.4);
        }

        /* ===== CLASS CARD TEXT ===== */
        .class-title {
          opacity: 0.7;
          font-weight: 500;
          color: #1B5E84;
        }

        body.dark-mode .class-title {
          color: #D4A24C;
        }

        .class-count {
          color: #0F4C6C;
        }

        body.dark-mode .class-count {
          color: #D4A24C;
        }

      `}</style>
    </>
  );
}

export default ClassBlocks;
