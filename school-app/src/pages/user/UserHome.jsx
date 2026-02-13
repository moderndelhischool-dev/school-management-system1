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

//   // 🔹 Month readable format
//   const feesMonth = student.feesDate
//     ? new Date(student.feesDate).toLocaleString("en-IN", {
//         month: "long",
//         year: "numeric",
//       })
//     : null;

//   return (
//     <>
//       <h5 className="mb-3">📊 Dashboard Overview</h5>

//       <div className="row g-3">
//         {/* ================= CLASS ================= */}
//         <div className="col-12 col-md-4">
//           <div className="card shadow-sm p-3 h-100">
//             <small className="text-muted">Class</small>
//             <h5 className="fw-semibold mb-0">{student.class}</h5>
//           </div>
//         </div>

//         {/* ================= FEES STATUS + MONTH ================= */}
//         <div className="col-12 col-md-4">
//           <div className="card shadow-sm p-3 h-100">
//             <small className="text-muted">Fees Status</small>

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
//               <small className="text-muted">
//                 {student.feeStatus === "Completed"
//                   ? "Completed for"
//                   : "Pending for"}{" "}
//                 {feesMonth}
//               </small>
//             )}

//             {/* Approved Date (only if completed) */}
//             {student.feeStatus === "Completed" && student.approvedAt && (
//               <div className="mt-1">
//                 <small className="text-muted">
//                   Approved on:{" "}
//                   {student.approvedAt.toDate().toLocaleDateString("en-IN")}
//                 </small>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ================= PENDING FEES ================= */}
//         <div className="col-12 col-md-4">
//           <div className="card shadow-sm p-3 h-100">
//             <small className="text-muted">Pending Fees</small>

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
//     </>
//   );
// }

// export default UserHome;
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function UserHome() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "students", user.email));
      if (snap.exists()) {
        setStudent(snap.data());
      }
    };

    load();
  }, []);

  if (!student) return null;

  const feesMonth = student.feesDate
    ? new Date(student.feesDate).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="userhome-wrapper">
      <h5 className="mb-3">📊 Dashboard Overview</h5>

      <div className="row g-3">
        {/* CLASS */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="text-muted">Class</small>
            <h5 className="fw-semibold mb-0">{student.class}</h5>
          </div>
        </div>

        {/* FEES STATUS */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="text-muted">Fees Status</small>

            <h5
              className={`fw-semibold mb-1 ${
                student.feeStatus === "Completed"
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {student.feeStatus}
            </h5>

            {feesMonth && (
              <small className="text-muted">
                {student.feeStatus === "Completed"
                  ? "Completed for"
                  : "Pending for"}{" "}
                {feesMonth}
              </small>
            )}

            {student.feeStatus === "Completed" && student.approvedAt && (
              <div className="mt-1">
                <small className="text-muted">
                  Approved on:{" "}
                  {student.approvedAt.toDate().toLocaleDateString("en-IN")}
                </small>
              </div>
            )}
          </div>
        </div>

        {/* PENDING FEES */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="text-muted">Pending Fees</small>

            <h5
              className={
                student.pendingFees > 0
                  ? "text-danger fw-semibold"
                  : "text-success fw-semibold"
              }
            >
              ₹ {student.pendingFees}
            </h5>
          </div>
        </div>
      </div>

      {/* DARK MODE STYLE */}
      <style>{`
        /* Dark Mode Only */
        body.dark-mode .userhome-wrapper {
          background-color: #121212;
          color: white;
        }

        body.dark-mode .userhome-card {
          background-color: #1e1e1e !important;
          border: 1px solid #333;
        }

        body.dark-mode .userhome-card h5,
        body.dark-mode .userhome-card small {
          color: white !important;
        }

        body.dark-mode .userhome-card .text-muted {
          color: #bbb !important;
        }
      `}</style>
    </div>
  );
}

export default UserHome;
