// import { useEffect, useState } from "react";
// import { auth, db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

// function UserHome() {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDoc(doc(db, "students", user.email));
//       if (snap.exists()) {
//         setStudent(snap.data());
//       }
//     };

//     load();
//   }, []);

//   if (!student) return null;

//   const feesMonth = student.feesDate
//     ? new Date(student.feesDate).toLocaleString("en-IN", {
//         month: "long",
//         year: "numeric",
//       })
//     : null;

//   return (
//     <div className="userhome-wrapper">
//       <h5 className="mb-3 text-purple">📊 Dashboard Overview</h5>

//       <div className="row g-3">
//         {/* CLASS */}
//         <div className="col-12 col-md-4">
//           <div className="card shadow-sm p-3 h-100 userhome-card">
//             <small className="home-muted">Class</small>
//             <h5 className="fw-semibold mb-0">{student.class}</h5>
//           </div>
//         </div>

//         {/* FEES STATUS */}
//         <div className="col-12 col-md-4">
//           <div className="card shadow-sm p-3 h-100 userhome-card">
//             <small className="home-muted">Fees Status</small>

//             <h5
//               className={`fw-semibold mb-1 ${
//                 student.feeStatus === "Completed"
//                   ? "text-success"
//                   : "text-danger"
//               }`}
//             >
//               {student.feeStatus}
//             </h5>

//             {feesMonth && (
//               <small className="home-muted">
//                 {student.feeStatus === "Completed"
//                   ? "Completed for"
//                   : "Pending for"}{" "}
//                 {feesMonth}
//               </small>
//             )}

//             {student.feeStatus === "Completed" && student.approvedAt && (
//               <div className="mt-1">
//                 <small className="home-muted">
//                   Approved on:{" "}
//                   {student.approvedAt.toDate().toLocaleDateString("en-IN")}
//                 </small>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* PENDING FEES */}
//         <div className="col-12 col-md-4">
//           <div className="card shadow-sm p-3 h-100 userhome-card">
//             <small className="home-muted">Pending Fees</small>

//             <h5
//               className={
//                 student.pendingFees > 0
//                   ? "text-danger fw-semibold"
//                   : "text-success fw-semibold"
//               }
//             >
//               ₹ {student.pendingFees}
//             </h5>
//           </div>
//         </div>
//       </div>

//       {/* PURPLE THEME STYLE */}
//       <style>{`
//         .userhome-wrapper {
//           background: linear-gradient(135deg,#ffffff,#f3e8ff);
//           padding: 10px;
//           border-radius: 18px;
//           transition: all 0.3s ease;
//         }

//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .userhome-card {
//           border-radius: 16px;
//           border: 1px solid #ddd6fe;
//           background: rgba(124,58,237,0.05);
//           transition: all 0.3s ease;
//         }

//         .userhome-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 10px 25px rgba(124,58,237,0.25);
//         }

//         .home-muted {
//           color: #6b21a8;
//           font-size: 13px;
//         }

//         /* DARK MODE */
//         body.dark-mode .userhome-wrapper {
//           background: linear-gradient(135deg,#1e1b4b,#0f172a);
//           color: white;
//         }

//         body.dark-mode .userhome-card {
//           background: rgba(124,58,237,0.15) !important;
//           border: 1px solid #312e81;
//         }

//         body.dark-mode .userhome-card h5,
//         body.dark-mode .userhome-card small {
//           color: white !important;
//         }

//         body.dark-mode .home-muted {
//           color: #c4b5fd !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UserHome;
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {
  autoRollAfterFullPayment,
  catchUpStudentBillingMonth,
  currentMonthKey,
  loadActiveSessionClassTuitionBusMap,
  resolveDisplayPendingFees,
} from "../../utils/feeBilling";



function UserHome() {
  const [student, setStudent] = useState(null);
  const [tuitionMap, setTuitionMap] = useState({});
  const [busMap, setBusMap] = useState({});
  const [busRatePerKmMap, setBusRatePerKmMap] = useState({});
  const [examFeeMap, setExamFeeMap] = useState({});
  const [examMonthsMap, setExamMonthsMap] = useState({});
  const [admissionFeeMap, setAdmissionFeeMap] = useState({});
  const [sundryChargesMap, setSundryChargesMap] = useState({});
  const [lastPaidMonth, setLastPaidMonth] = useState("");
  const [submittedMonths, setSubmittedMonths] = useState([]);

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const [snap, maps] = await Promise.all([
        getDoc(doc(db, "students", user.email)),
        loadActiveSessionClassTuitionBusMap(db),
      ]);
      if (!snap.exists()) return;

      // Bring legacy/out-of-date student billing month to current cycle.
      await catchUpStudentBillingMonth(db, user.email, snap.data());

      let refreshed = await getDoc(doc(db, "students", user.email));
      if (!refreshed.exists()) return;

      // If full paid state is still present, roll once to next month cycle.
      if (refreshed.data().feeStatus === "Completed") {
        await autoRollAfterFullPayment(db, user.email);
        refreshed = await getDoc(doc(db, "students", user.email));
        if (!refreshed.exists()) return;
      }

      setStudent(refreshed.data());
      setTuitionMap(maps.tuitionMap || {});
      setBusMap(maps.busMap || {});
      setBusRatePerKmMap(maps.busRatePerKmMap || {});
      setExamFeeMap(maps.examFeeMap || {});
      setExamMonthsMap(maps.examMonthsMap || {});
      setAdmissionFeeMap(maps.admissionFeeMap || {});
      setSundryChargesMap(maps.sundryChargesMap || {});

      const feesSnap = await getDocs(collection(db, "students", user.email, "fees"));
      let latestCompleted = "";
      const completedMonthKeys = [];
      const dueMonthKey = String(refreshed.data().feeMonth || currentMonthKey());
      feesSnap.docs.forEach((d) => {
        const row = d.data() || {};
        const amount = Number(row.amount || 0);
        const paid = Number(row.paid || 0);
        const isCompleted =
          row.status === "Completed" || (amount > 0 && paid >= amount);
        if (!isCompleted) return;
        const feeMonth = String(row.feeMonth || d.id || "");
        if (!/^\d{4}-\d{2}$/.test(feeMonth)) return;
        // Ignore invalid future/next-cycle-completed anomalies for dashboard clarity.
        if (feeMonth >= dueMonthKey) return;
        completedMonthKeys.push(feeMonth);
        if (!latestCompleted || feeMonth > latestCompleted) {
          latestCompleted = feeMonth;
        }
      });

      completedMonthKeys.sort((a, b) => (a < b ? 1 : -1));
      setSubmittedMonths(
        completedMonthKeys.map((monthKey) =>
          new Date(`${monthKey}-01`).toLocaleString("en-IN", {
            month: "long",
            year: "numeric",
          }),
        ),
      );

      if (latestCompleted) {
        setLastPaidMonth(
          new Date(`${latestCompleted}-01`).toLocaleString("en-IN", {
            month: "long",
            year: "numeric",
          }),
        );
      } else {
        setLastPaidMonth("");
      }
    };

    load();
  }, []);

  if (!student) return null;

  const dashboardPendingFees = resolveDisplayPendingFees(
    student,
    tuitionMap,
    busMap,
    examFeeMap,
    examMonthsMap,
    busRatePerKmMap,
    admissionFeeMap,
    sundryChargesMap,
  );

  const feesMonth = student.feeMonth
    ? new Date(`${student.feeMonth}-01`).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : student.month || student.selectedMonth || null;

  const dashboardStatus =
    dashboardPendingFees <= 0
      ? "Completed"
      : Number(student.paidFees || 0) > 0
        ? "Partial"
        : "Pending";

  return (
    <div className="userhome-wrapper">
      <h5 className="mb-3 section-title">📊 Dashboard Overview</h5>

      <div className="row g-3">
        {/* CLASS */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Class</small>
            <h5 className="fw-semibold mb-0">{student.class}</h5>
          </div>
        </div>

        {/* REGISTRATION NUMBER */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Registration no.</small>
            <h5 className="fw-semibold mb-0 font-monospace text-break">
              {student.registrationNo || "—"}
            </h5>
          </div>
        </div>

        {/* FEES STATUS */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Fees Status</small>

            <h5
              className={`fw-semibold mb-1 ${
                dashboardStatus === "Completed"
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {dashboardStatus}
            </h5>

            {feesMonth && (
              <small className="home-muted">
                {dashboardStatus === "Completed"
                  ? "Completed for"
                  : "Pending for"}{" "}
                {feesMonth}
              </small>
            )}

            {lastPaidMonth && (
              <div className="mt-1">
                <small className="home-muted">
                  Paid till: <strong>{lastPaidMonth}</strong>
                </small>
              </div>
            )}

            <div className="mt-1">
              <small className="home-muted">
                Current payable month: <strong>{feesMonth || "—"}</strong>
              </small>
            </div>

            {dashboardStatus === "Completed" && student.approvedAt && (
              <div className="mt-1">
                <small className="home-muted">
                  Approved on:{" "}
                  {student.approvedAt.toDate().toLocaleDateString("en-IN")}
                </small>
              </div>
            )}
          </div>
        </div>

        {/* PENDING FEES */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Pending Fees</small>

            <h5
              className={
                dashboardPendingFees > 0
                  ? "text-danger fw-semibold"
                  : "text-success fw-semibold"
              }
            >
              ₹ {dashboardPendingFees}
            </h5>
            <small className="home-muted">
              Next payment due for {feesMonth || "current cycle"}
            </small>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm p-3 userhome-card">
            <small className="home-muted">Submitted Months</small>
            {submittedMonths.length > 0 ? (
              <div className="submitted-months-wrap mt-2">
                {submittedMonths.map((m) => (
                  <span key={m} className="submitted-pill">
                    {m}
                  </span>
                ))}
              </div>
            ) : (
              <small className="home-muted d-block mt-1">
                No fully paid month found yet.
              </small>
            )}
          </div>
        </div>
      </div>

      <style>{`

/* WRAPPER */
.userhome-wrapper {
  background: linear-gradient(135deg,#E6EEF4,#F4F6F8);
  padding: 20px;
  border-radius: 18px;
  transition: all 0.3s ease;
}

/* TITLE */
.section-title {
  color: #0F4C6C;
  font-weight: 700;
}

/* CARD */
.userhome-card {
  border-radius: 16px;
  border: 1px solid #E5E7EB;
  background: white;
  transition: all 0.3s ease;
}

.userhome-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(15,76,108,0.25);
}

/* MUTED TEXT */
.home-muted {
  color: #4B5563;
  font-size: 13px;
}

.submitted-months-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.submitted-pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: #e8f3f8;
  color: #0F4C6C;
}

/* DARK MODE */
body.dark-mode .userhome-wrapper {
  background: linear-gradient(135deg,#0A2E42,#0F172A);
  color: white;
}

body.dark-mode .section-title {
  color: #D4A24C;
}

body.dark-mode .userhome-card {
  background: #1B2A35;
  border: 1px solid #243644;
}

body.dark-mode .home-muted {
  color: #CBD5E1;
}

body.dark-mode .submitted-pill {
  background: #243644;
  color: #D4A24C;
}

      `}</style>
    </div>
  );
}

export default UserHome;
