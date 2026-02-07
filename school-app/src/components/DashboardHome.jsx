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

/* Chart register – VERY IMPORTANT */
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashboardHome() {
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

  /* class-wise count (tumhara hi logic) */
  const classMap = {};
  students.forEach((s) => {
    if (!s.class) return;
    classMap[s.class] = (classMap[s.class] || 0) + 1;
  });

  /* chart data */
  const labels = Object.keys(classMap);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Students",
        data: labels.map((cls) => classMap[cls]),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <>
      {/* TOP CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <small>Student Strength</small>
            <h3>{total}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <small>No of Girls</small>
            <h3>{girls}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <small>No of Boys</small>
            <h3>{boys}</h3>
          </div>
        </div>
      </div>

      {/* CLASS WISE LIST (same as before) */}
      <div className="card p-3 mb-4 shadow-sm">
        <h6>Class-wise student distribution</h6>

        {labels.map((cls) => (
          <div
            key={cls}
            className="d-flex justify-content-between border-bottom py-1"
          >
            <span>Class {cls}</span>
            <span>{classMap[cls]}</span>
          </div>
        ))}
      </div>

      {/* CLASS WISE CHART (NEW, SAFE) */}
      <div className="card p-4 shadow-sm">
        <h6 className="mb-3">Class-wise student chart</h6>

        {labels.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p className="text-muted">No data available</p>
        )}
      </div>
    </>
  );
}

export default DashboardHome;
