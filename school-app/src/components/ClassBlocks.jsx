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

//   const cardStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#111827",
//     borderRadius: "16px",
//     border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
//     boxShadow: darkMode
//       ? "0 8px 25px rgba(0,0,0,0.6)"
//       : "0 5px 15px rgba(0,0,0,0.08)",
//     transition: "all 0.3s ease",
//   };

//   const hoverEffect = (e, enter) => {
//     if (enter) {
//       e.currentTarget.style.transform = "translateY(-6px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 12px 35px rgba(59,130,246,0.5)"
//         : "0 12px 30px rgba(99,102,241,0.3)";
//     } else {
//       e.currentTarget.style.transform = "translateY(0px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 8px 25px rgba(0,0,0,0.6)"
//         : "0 5px 15px rgba(0,0,0,0.08)";
//     }
//   };

//   return (
//     <div className="row">
//       {Object.keys(classCount).map((cls) => (
//         <div className="col-6 col-md-3 mb-3" key={cls}>
//           <div
//             className="text-center p-3"
//             style={cardStyle}
//             onMouseEnter={(e) => hoverEffect(e, true)}
//             onMouseLeave={(e) => hoverEffect(e, false)}
//           >
//             <h6
//               style={{
//                 opacity: 0.7,
//               }}
//             >
//               Class {cls}
//             </h6>

//             <h4 className="fw-bold mt-2">{classCount[cls]}</h4>

//             <small style={{ opacity: 0.7 }}>Students</small>
//           </div>
//         </div>
//       ))}
//     </div>
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
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    borderRadius: "18px",
    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
    boxShadow: darkMode
      ? "0 10px 30px rgba(0,0,0,0.6)"
      : "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    height: "100%", // 🔥 Equal height
  };

  const hoverEffect = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = darkMode
        ? "0 15px 40px rgba(34,197,94,0.4)"
        : "0 15px 35px rgba(34,197,94,0.25)";
    } else {
      e.currentTarget.style.transform = "translateY(0px)";
      e.currentTarget.style.boxShadow = darkMode
        ? "0 10px 30px rgba(0,0,0,0.6)"
        : "0 6px 20px rgba(0,0,0,0.08)";
    }
  };

  return (
    <>
      {/* ===== TOTAL SUMMARY CARD ===== */}
      <div className="mb-5">
        <div
          className="p-4 text-center"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            color: "#ffffff",
            boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
          }}
        >
          <h5 className="mb-1 fw-semibold">🎓 Total Students</h5>
          <h2 className="fw-bold mb-0">{totalStudents}</h2>
        </div>
      </div>

      {/* ===== CLASS BLOCKS ===== */}
      <div className="row g-4">
        {" "}
        {/* 🔥 Proper spacing added here */}
        {Object.keys(classCount)
          .sort((a, b) => {
            const convert = (cls) => {
              if (cls === "+1") return 11;
              if (cls === "+2") return 12;
              return parseInt(cls);
            };
            return convert(a) - convert(b);
          })
          .map((cls) => (
            <div className="col-6 col-md-4 col-lg-3" key={cls}>
              <div
                className="text-center p-4 d-flex flex-column justify-content-center"
                style={cardStyle}
                onMouseEnter={(e) => hoverEffect(e, true)}
                onMouseLeave={(e) => hoverEffect(e, false)}
              >
                <h6 style={{ opacity: 0.7, fontWeight: "500" }}>Class {cls}</h6>

                <h3 className="fw-bold mt-3 mb-1">{classCount[cls]}</h3>

                <small style={{ opacity: 0.7 }}>Students</small>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ClassBlocks;
