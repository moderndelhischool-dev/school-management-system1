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
      <h5 className="mb-3 section-title">📊 Dashboard Overview</h5>

      <div className="row g-3">
        {/* CLASS */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Class</small>
            <h5 className="fw-semibold mb-0">{student.class}</h5>
          </div>
        </div>

        {/* FEES STATUS */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Fees Status</small>

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
              <small className="home-muted">
                {student.feeStatus === "Completed"
                  ? "Completed for"
                  : "Pending for"}{" "}
                {feesMonth}
              </small>
            )}

            {student.feeStatus === "Completed" && student.approvedAt && (
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
        <div className="col-12 col-md-4">
          <div className="card shadow-sm p-3 h-100 userhome-card">
            <small className="home-muted">Pending Fees</small>

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

      `}</style>
    </div>
  );
}

export default UserHome;
