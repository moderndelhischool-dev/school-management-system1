// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import { collection, getDocs } from "firebase/firestore";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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
//         label: "Total Students",
//         data: labels.map((cls) => classMap[cls]),
//         backgroundColor: darkMode ? "#3b82f6" : "#6366f1",
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: {
//       legend: {
//         labels: {
//           color: darkMode ? "#ffffff" : "#111827",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: darkMode ? "#ffffff" : "#111827",
//         },
//       },
//       y: {
//         ticks: {
//           color: darkMode ? "#ffffff" : "#111827",
//         },
//       },
//     },
//   };

//   const cardStyle = {
//     backgroundColor: darkMode ? "#111827" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#111827",
//     borderRadius: "14px",
//     border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
//     boxShadow: darkMode
//       ? "0 5px 25px rgba(0,0,0,0.6)"
//       : "0 5px 15px rgba(0,0,0,0.08)",
//     transition: "all 0.3s ease",
//   };

//   const hoverEffect = (e, enter) => {
//     if (enter) {
//       e.currentTarget.style.transform = "translateY(-6px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 10px 30px rgba(59,130,246,0.6)"
//         : "0 10px 30px rgba(99,102,241,0.3)";
//     } else {
//       e.currentTarget.style.transform = "translateY(0px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 5px 25px rgba(0,0,0,0.6)"
//         : "0 5px 15px rgba(0,0,0,0.08)";
//     }
//   };

//   return (
//     <>
//       {/* TOP CARDS */}
//       <div className="row mb-4">
//         {[
//           { title: "Student Strength", value: total },
//           { title: "No of Girls", value: girls },
//           { title: "No of Boys", value: boys },
//         ].map((item, i) => (
//           <div className="col-md-4" key={i}>
//             <div
//               className="p-3"
//               style={cardStyle}
//               onMouseEnter={(e) => hoverEffect(e, true)}
//               onMouseLeave={(e) => hoverEffect(e, false)}
//             >
//               <small style={{ opacity: 0.7 }}>{item.title}</small>
//               <h3 className="mt-2">{item.value}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* CLASS WISE LIST */}
//       <div className="p-3 mb-4" style={cardStyle}>
//         <h6>Class-wise student distribution</h6>

//         {labels.map((cls) => (
//           <div
//             key={cls}
//             className="d-flex justify-content-between border-bottom py-2"
//             style={{
//               borderColor: darkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb",
//             }}
//           >
//             <span>Class {cls}</span>
//             <span>{classMap[cls]}</span>
//           </div>
//         ))}
//       </div>

//       {/* CHART */}
//       <div className="p-4" style={cardStyle}>
//         <h6 className="mb-3">Class-wise student chart</h6>

//         {labels.length > 0 ? (
//           <Bar data={chartData} options={chartOptions} />
//         ) : (
//           <p style={{ opacity: 0.7 }}>No data available</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default DashboardHome;
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

  /* ================= GREEN GRADIENT ================= */

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Students",
        data: labels.map((cls) => classMap[cls]),
        backgroundColor: function (context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#22c55e");
          gradient.addColorStop(1, "#16a34a");
          return gradient;
        },
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#ffffff" : "#111827",
          font: { weight: "600" },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#111827",
        },
        grid: {
          color: darkMode ? "#334155" : "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#111827",
        },
        grid: {
          color: darkMode ? "#334155" : "#e5e7eb",
        },
      },
    },
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    borderRadius: "18px",
    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
    boxShadow: darkMode
      ? "0 10px 30px rgba(0,0,0,0.6)"
      : "0 8px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const hoverEffect = (e, enter) => {
    if (enter) {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = darkMode
        ? "0 12px 35px rgba(34,197,94,0.5)"
        : "0 12px 35px rgba(34,197,94,0.3)";
    } else {
      e.currentTarget.style.transform = "translateY(0px)";
      e.currentTarget.style.boxShadow = darkMode
        ? "0 10px 30px rgba(0,0,0,0.6)"
        : "0 8px 25px rgba(0,0,0,0.08)";
    }
  };

  return (
    <>
      {/* ================= TOP CARDS ================= */}

      <div className="row mb-4">
        {[
          { title: "Student Strength", value: total },
          { title: "No of Girls", value: girls },
          { title: "No of Boys", value: boys },
        ].map((item, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <div
              className="p-4"
              style={cardStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
            >
              <small style={{ opacity: 0.7 }}>{item.title}</small>
              <h2 className="mt-2 fw-bold text-success">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CLASS LIST ================= */}

      <div className="p-4 mb-4" style={cardStyle}>
        <h6 className="mb-3 fw-semibold">📚 Class-wise student distribution</h6>

        {labels.map((cls) => (
          <div
            key={cls}
            className="d-flex justify-content-between py-2"
            style={{
              borderBottom: darkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid #e5e7eb",
            }}
          >
            <span>Class {cls}</span>
            <span className="fw-semibold text-success">{classMap[cls]}</span>
          </div>
        ))}
      </div>

      {/* ================= CHART ================= */}

      <div className="p-4" style={cardStyle}>
        <h6 className="mb-3 fw-semibold">📊 Class-wise student chart</h6>

        {labels.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p style={{ opacity: 0.7 }}>No data available</p>
        )}
      </div>
    </>
  );
}

export default DashboardHome;
