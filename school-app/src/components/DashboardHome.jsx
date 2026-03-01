// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import StudentList from "./StudentList";

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// function DashboardHome({ darkMode }) {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       const snap = await getDocs(collection(db, "students"));
//       setStudents(snap.docs.map((d) => d.data()));
//     };
//     load();
//   }, []);

//   const total = students.length;
//   const boys = students.filter((s) => s.gender === "Male").length;
//   const girls = students.filter((s) => s.gender === "Female").length;

//   const classMap = {};
//   students.forEach((s) => {
//     if (!s.class) return;
//     classMap[s.class] = (classMap[s.class] || 0) + 1;
//   });

//   const labels = Object.keys(classMap);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         data: labels.map((cls) => classMap[cls]),
//         backgroundColor: ["#7c3aed", "#8b5cf6", "#a855f7", "#c084fc"],
//         borderWidth: 2,
//         borderColor: darkMode ? "#0f172a" : "#ffffff",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     cutout: "70%",
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           color: darkMode ? "#ffffff" : "#111827",
//         },
//       },
//     },
//   };

//   const cardStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#111827",
//     borderRadius: "18px",
//     padding: "20px",
//     border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
//     boxShadow: darkMode
//       ? "0 10px 30px rgba(0,0,0,0.6)"
//       : "0 8px 25px rgba(0,0,0,0.08)",
//   };

//   return (
//     <>
//       {/* 1️⃣ Total Students */}
//       <div className="mb-4" style={cardStyle}>
//         <h6>Total Students</h6>
//         <h2 className="fw-bold text-purple">{total}</h2>
//       </div>

//       {/* 2️⃣ Girls & Boys */}
//       <div className="row mb-4">
//         <div className="col-md-6 mb-3">
//           <div style={cardStyle}>
//             <h6>No of Girls</h6>
//             <h3 className="text-purple">{girls}</h3>
//           </div>
//         </div>

//         <div className="col-md-6 mb-3">
//           <div style={cardStyle}>
//             <h6>No of Boys</h6>
//             <h3 className="text-purple">{boys}</h3>
//           </div>
//         </div>
//       </div>

//       {/* 3️⃣ Small Chart */}
//       <div className="mb-4 text-center" style={cardStyle}>
//         <div style={{ width: "260px", margin: "0 auto" }}>
//           {labels.length > 0 ? (
//             <Doughnut data={chartData} options={chartOptions} />
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>

//       {/* 4️⃣ Class Boxes */}
//       {/* <div className="mb-4" style={cardStyle}>
//         {labels.map((cls) => (
//           <div
//             key={cls}
//             className="d-flex justify-content-between py-2"
//             style={{
//               borderBottom: darkMode
//                 ? "1px solid rgba(255,255,255,0.08)"
//                 : "1px solid #e5e7eb",
//             }}
//           >
//             <span>Class {cls}</span>
//             <span className="fw-semibold text-purple">{classMap[cls]}</span>
//           </div>
//         ))}
//       </div> */}

//       {/* 5️⃣ Student Details Table */}
//       <div className="mt-4">
//         <StudentList darkMode={darkMode} />
//       </div>

//       <style>{`
//         .text-purple {
//           color: #7c3aed !important;
//         }
//       `}</style>
//     </>
//   );
// }

// export default DashboardHome;
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import StudentList from "./StudentList";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardHome({ darkMode }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "students"));
      setStudents(snap.docs.map((d) => d.data()));
    };
    load();
  }, []);

  const total = students.length;
  const boys = students.filter((s) => s.gender === "Male").length;
  const girls = students.filter((s) => s.gender === "Female").length;

  const classMap = {};
  students.forEach((s) => {
    if (!s.class) return;
    classMap[s.class] = (classMap[s.class] || 0) + 1;
  });

  const labels = Object.keys(classMap);

  const chartData = {
    labels,
    datasets: [
      {
        data: labels.map((cls) => classMap[cls]),
        backgroundColor: [
          "#0F4C6C",
          "#1B5E84",
          "#2E7DAF",
          "#D4A24C",
          "#1B2A35",
        ],
        borderWidth: 2,
        borderColor: darkMode ? "#0A2E42" : "#ffffff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? "#ffffff" : "#1B2A35",
          font: { size: 12 },
        },
      },
    },
  };

  const cardStyle = {
    background: darkMode
      ? "linear-gradient(135deg,#1B2A35,#0A2E42)"
      : "linear-gradient(135deg,#ffffff,#F4F6F8)",
    color: darkMode ? "#ffffff" : "#1B2A35",
    borderRadius: "20px",
    padding: "22px",
    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
    boxShadow: darkMode
      ? "0 15px 40px rgba(0,0,0,0.6)"
      : "0 12px 30px rgba(15,76,108,0.12)",
    transition: "0.3s ease",
  };

  return (
    <>
      {/* 1️⃣ Total Students */}
      <div className="mb-4 dashboard-card" style={cardStyle}>
        <h6>Total Students</h6>
        <h2 className="fw-bold highlight-text">{total}</h2>
      </div>

      {/* 2️⃣ Girls & Boys */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="dashboard-card" style={cardStyle}>
            <h6>No of Girls</h6>
            <h3 className="highlight-text">{girls}</h3>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="dashboard-card" style={cardStyle}>
            <h6>No of Boys</h6>
            <h3 className="highlight-text">{boys}</h3>
          </div>
        </div>
      </div>

      {/* 3️⃣ Doughnut Chart */}
      <div className="mb-4 text-center dashboard-card" style={cardStyle}>
        <div style={{ width: "260px", margin: "0 auto" }}>
          {labels.length > 0 ? (
            <Doughnut data={chartData} options={chartOptions} />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {/* 4️⃣ Student Details Table */}
      <div className="mt-4">
        <StudentList darkMode={darkMode} />
      </div>

      <style>{`
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(15,76,108,0.2);
        }

        .highlight-text {
          color: #0F4C6C;
        }

        body.dark-mode .highlight-text {
          color: #D4A24C;
        }
      `}</style>
    </>
  );
}

export default DashboardHome;
