import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function FeesHistory({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "students"),
      async (snapshot) => {
        const promises = snapshot.docs.map(async (docSnap) => {
          const student = docSnap.data();

          // Fees history ko date wise sort karke mangwayenge
          const feesRef = collection(db, "students", docSnap.id, "fees");
          const feesSnapshot = await getDocs(
            query(feesRef, orderBy("date", "desc")),
          );

          const feesArray = feesSnapshot.docs.map((f) => {
            const d = f.data() || {};

            // Agar ID '2024-03' format mein hai toh format karega,
            // nahi toh jo save hai wahi dikhayega (e.g. "January")
            let monthDisplay = f.id;
            if (f.id.includes("-")) {
              const dateObj = new Date(f.id + "-01");
              monthDisplay = dateObj.toLocaleString("default", {
                month: "long",
                year: "numeric",
              });
            }

            return {
              id: f.id,
              monthDisplay: monthDisplay,
              amount: Number(d.amount) || 0,
              paid: Number(d.paid) || 0,
              status: d.status || "Pending",
              date: d.date || null,
              mode: d.mode || "Cash",
              receivedBy: d.receivedBy || "Admin",
            };
          });

          return { id: docSnap.id, ...student, feesHistory: feesArray };
        });

        const data = await Promise.all(promises);
        setStudents(data);
      },
    );
    return () => unsubscribe();
  }, []);

  const classOrder = [
    "ukg",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const classes = classOrder.filter((cls) =>
    students.some(
      (s) => String(s.class) === cls || String(s.class) === "+" + cls,
    ),
  );

  const filteredStudents = selectedClass
    ? students.filter(
        (s) =>
          String(s.class) === selectedClass ||
          String(s.class) === "+" + selectedClass,
      )
    : [];

  return (
    <div className={`main-wrapper ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-card shadow-lg">
        <h2 className="dashboard-title">📊 Fees History Dashboard</h2>

        {/* 1. CLASS SELECTION */}
        {!selectedClass && (
          <div className="class-grid">
            {classes.map((cls) => (
              <div
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className="class-item-box"
              >
                Class {cls}
              </div>
            ))}
          </div>
        )}

        {/* 2. STUDENT LIST FOR SELECTED CLASS */}
        {selectedClass && !selectedStudent && (
          <div>
            <button onClick={() => setSelectedClass(null)} className="btn-back">
              ← Back to Classes
            </button>
            <h4 className="section-title">Students in Class {selectedClass}</h4>
            <div className="student-grid mt-3">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="student-item-card"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0 fw-bold">{s.name}</h6>
                      <small className="opacity-75">
                        Roll No: {s.rollNo || "N/A"}
                      </small>
                    </div>
                    <span className="view-btn">View History →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. DETAILED FEES TABLE */}
        {selectedStudent && (
          <div>
            <button
              onClick={() => setSelectedStudent(null)}
              className="btn-back danger mb-3"
            >
              ← Back to Students
            </button>
            <FeesTable student={selectedStudent} darkMode={darkMode} />
          </div>
        )}
      </div>

      <style>{`
        .main-wrapper { padding: 20px; min-height: 100vh; }
        .dashboard-card {
          background: ${darkMode ? "#111c2a" : "#ffffff"};
          color: ${darkMode ? "#ffffff" : "#0f172a"};
          padding: 30px; border-radius: 20px;
          border: ${darkMode ? "1px solid #243644" : "1px solid #eee"};
        }
        .class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; }
        .class-item-box {
          background: #0F4C6C; color: #D4A24C; padding: 20px; border-radius: 12px;
          cursor: pointer; transition: 0.3s; font-weight: bold; text-align: center;
          border: 1px solid #D4A24C;
        }
        .class-item-box:hover { transform: translateY(-5px); background: #D4A24C; color: #0F4C6C; }
        .student-item-card {
          background: ${darkMode ? "#1b2a3a" : "#f8f9fa"};
          padding: 15px; border-radius: 12px; margin-bottom: 10px; cursor: pointer;
          border: 1px solid ${darkMode ? "#2d4253" : "#e2e8f0"}; transition: 0.2s;
        }
        .student-item-card:hover { border-color: #D4A24C; background: ${darkMode ? "#243644" : "#fff"}; }
        .view-btn { font-size: 12px; font-weight: 700; color: #D4A24C; }
        .btn-back { background: #475569; color: white; border: none; padding: 8px 18px; border-radius: 10px; cursor: pointer; }
        .btn-back.danger { background: #ef4444; }
      `}</style>
    </div>
  );
}

function FeesTable({ student, darkMode }) {
  const history = student.feesHistory || [];
  const totalPaid = history.reduce((sum, f) => sum + f.paid, 0);
  const totalFees = history.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="animate-in">
      {/* Student Profile Header */}
      <div
        className={`profile-header p-4 rounded-4 mb-4 ${darkMode ? "dark-sub" : "light-sub"}`}
      >
        <h3 className="fw-bold mb-2" style={{ color: "#D4A24C" }}>
          {student.name}
        </h3>
        <div className="d-flex flex-wrap gap-4 opacity-75">
          <span>
            <strong>Roll:</strong> {student.rollNo}
          </span>
          <span>
            <strong>Father:</strong> {student.fatherName}
          </span>
          <span>
            <strong>Class:</strong> {student.class}
          </span>
          <span>
            <strong>Email:</strong> {student.email}
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card bg-success text-white">
            <small>Total Paid Amount</small>
            <h2 className="fw-bold">₹{totalPaid}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="stat-card bg-primary text-white"
            style={{ background: "#0F4C6C !important" }}
          >
            <small>Total Payable</small>
            <h2 className="fw-bold">₹{totalFees}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card bg-danger text-white">
            <small>Total Pending</small>
            <h2 className="fw-bold">₹{totalFees - totalPaid}</h2>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive rounded-4 shadow">
        <table
          className={`table m-0 ${darkMode ? "table-dark" : "table-light table-striped"}`}
        >
          <thead style={{ background: "#0F4C6C", color: "white" }}>
            <tr>
              <th className="p-3">Month</th>
              <th className="p-3">Expected</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Balance</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((f, i) => (
                <tr key={i}>
                  <td className="p-3 fw-bold text-info">{f.monthDisplay}</td>
                  <td className="p-3">₹{f.amount}</td>
                  <td className="p-3 text-success fw-bold">₹{f.paid}</td>
                  <td className="p-3 text-danger">₹{f.amount - f.paid}</td>
                  <td className="p-3">
                    <span className={`status-pill ${f.status.toLowerCase()}`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {f.date?.seconds
                      ? new Date(f.date.seconds * 1000).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  No history found for this student.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .dark-sub { background: #1b2a3a; border: 1px solid #2d4253; }
        .light-sub { background: #f1f5f9; }
        .stat-card { padding: 25px; border-radius: 18px; text-align: center; }
        .status-pill { font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
        .status-pill.completed { background: #dcfce7; color: #15803d; }
        .status-pill.partial { background: #fef9c3; color: #a16207; }
        .status-pill.pending { background: #fee2e2; color: #b91c1c; }
        .animate-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default FeesHistory;
