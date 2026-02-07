// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged, signOut } from "firebase/auth";

// function UserDashboard() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const email = user.email;
//         const snap = await getDoc(doc(db, "students", email));
//         if (snap.exists()) {
//           setStudent(snap.data());
//         }
//       }
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//     window.location.href = "/";
//   };

//   /* ---------------- LOADING ---------------- */
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <h5>Loading dashboard...</h5>
//       </div>
//     );
//   }

//   /* ---------------- NO DATA ---------------- */
//   if (!student) {
//     return (
//       <div className="container mt-5 text-center">
//         <h5>No student record found</h5>
//         <p>Please contact school administration.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid bg-light min-vh-100 p-4">
//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>👤 Student Dashboard</h4>
//         <button className="btn btn-outline-danger btn-sm" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* TOP INFO CARDS */}
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <div className="card shadow-sm p-3">
//             <small className="text-muted">Student Name</small>
//             <h5>{student.name}</h5>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow-sm p-3">
//             <small className="text-muted">Class</small>
//             <h5>{student.class}</h5>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow-sm p-3">
//             <small className="text-muted">Fees Status</small>
//             <h5
//               className={
//                 student.feeStatus === "Completed"
//                   ? "text-success"
//                   : "text-danger"
//               }
//             >
//               {student.feeStatus}
//             </h5>
//           </div>
//         </div>
//       </div>

//       {/* FEES DETAILS */}
//       <div className="card shadow-sm p-4 mb-4">
//         <h5 className="mb-3">💰 Fees Details</h5>

//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <label className="text-muted">Total Fees</label>
//             <h6>₹ {student.totalFees}</h6>
//           </div>

//           <div className="col-md-4 mb-3">
//             <label className="text-muted">Paid Fees</label>
//             <h6 className="text-success">₹ {student.paidFees}</h6>
//           </div>

//           <div className="col-md-4 mb-3">
//             <label className="text-muted">Pending Fees</label>
//             <h6 className="text-danger">₹ {student.pendingFees}</h6>
//           </div>
//         </div>
//       </div>

//       {/* MONTH + UPDATE INFO */}
//       <div className="card shadow-sm p-4">
//         <h5 className="mb-3">📅 Payment Information</h5>

//         <p>
//           <b>Fees Month:</b> {student.month}
//         </p>

//         {student.updatedAt && (
//           <p className="text-muted">
//             <b>Last Updated:</b> {student.updatedAt.toDate().toLocaleString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function UserDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        const snap = await getDoc(doc(db, "students", email));
        if (snap.exists()) {
          setStudent(snap.data());
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <h5>Loading dashboard...</h5>
      </div>
    );
  }

  /* ---------------- NO DATA ---------------- */
  if (!student) {
    return (
      <div className="container mt-5 text-center">
        <h5>No student record found</h5>
        <p>Please contact school administration.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 px-3 px-md-4 py-4">
      {/* HEADER */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
        <h4 className="mb-0">👤 Student Dashboard</h4>

        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      {/* TOP INFO CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <small className="text-muted">Student Name</small>
            <h6 className="fw-semibold mb-0">{student.name}</h6>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <small className="text-muted">Class</small>
            <h6 className="fw-semibold mb-0">{student.class}</h6>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-4">
          <div className="card shadow-sm p-3 h-100">
            <small className="text-muted">Fees Status</small>
            <h6
              className={
                student.feeStatus === "Completed"
                  ? "text-success fw-semibold"
                  : "text-danger fw-semibold"
              }
            >
              {student.feeStatus}
            </h6>
          </div>
        </div>
      </div>

      {/* FEES DETAILS */}
      <div className="card shadow-sm p-3 p-md-4 mb-4">
        <h5 className="mb-3">💰 Fees Details</h5>

        <div className="row g-3">
          <div className="col-12 col-md-4">
            <small className="text-muted">Total Fees</small>
            <h6>₹ {student.totalFees}</h6>
          </div>

          <div className="col-12 col-md-4">
            <small className="text-muted">Paid Fees</small>
            <h6 className="text-success">₹ {student.paidFees}</h6>
          </div>

          <div className="col-12 col-md-4">
            <small className="text-muted">Pending Fees</small>
            <h6 className="text-danger">₹ {student.pendingFees}</h6>
          </div>
        </div>
      </div>

      {/* PAYMENT INFO */}
      <div className="card shadow-sm p-3 p-md-4">
        <h5 className="mb-3">📅 Payment Information</h5>

        <p className="mb-1">
          <b>Fees Month:</b> {student.month}
        </p>

        {student.updatedAt && (
          <p className="text-muted mb-0">
            <b>Last Updated:</b> {student.updatedAt.toDate().toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
