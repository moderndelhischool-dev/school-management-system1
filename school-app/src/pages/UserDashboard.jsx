// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import ChangePassword from "../components/ChangePassword";

// function UserDashboard() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const snap = await getDoc(doc(db, "students", user.email));
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

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <h5>Loading dashboard...</h5>
//       </div>
//     );
//   }

//   /* ================= NO DATA ================= */
//   if (!student) {
//     return (
//       <div className="container mt-5 text-center">
//         <h5>No student record found</h5>
//         <p>Please contact school administration.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container-fluid bg-light min-vh-100 px-3 px-md-4 py-4">
//         {/* ================= HEADER ================= */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2">
//           <div>
//             <h4 className="mb-0">👤 Student Dashboard</h4>
//             <small className="text-muted">
//               Welcome, <b>{student.name}</b>
//             </small>
//           </div>

//           <div className="d-flex gap-2">
//             <button
//               className="btn btn-outline-primary btn-sm"
//               onClick={() => setShowChangePassword(true)}
//             >
//               Change Password
//             </button>

//             <button className="btn btn-outline-danger btn-sm" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* ================= PROFILE ================= */}
//         <div className="card shadow-sm p-3 p-md-4 mb-4">
//           <h5 className="mb-3">👤 My Profile</h5>

//           <div className="row g-3">
//             <div className="col-12 col-md-4">
//               <small className="text-muted">Name</small>
//               <h6 className="fw-semibold mb-0">{student.name}</h6>
//             </div>

//             <div className="col-12 col-md-4">
//               <small className="text-muted">Class</small>
//               <h6 className="fw-semibold mb-0">{student.class}</h6>
//             </div>

//             <div className="col-12 col-md-4">
//               <small className="text-muted">Fee Status</small>
//               <h6
//                 className={`fw-semibold mb-0 ${
//                   student.feeStatus === "Completed"
//                     ? "text-success"
//                     : "text-danger"
//                 }`}
//               >
//                 {student.feeStatus}
//               </h6>
//             </div>
//           </div>
//         </div>

//         {/* ================= FEES SUMMARY ================= */}
//         <div className="row g-3 mb-4">
//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="card shadow-sm p-3 h-100">
//               <small className="text-muted">Total Fees</small>
//               <h5 className="mb-0">₹ {student.totalFees}</h5>
//             </div>
//           </div>

//           <div className="col-12 col-sm-6 col-md-4">
//             <div className="card shadow-sm p-3 h-100">
//               <small className="text-muted">Paid Fees</small>
//               <h5 className="text-success mb-0">₹ {student.paidFees}</h5>
//             </div>
//           </div>

//           <div className="col-12 col-md-4">
//             <div className="card shadow-sm p-3 h-100">
//               <small className="text-muted">Pending Fees</small>
//               <h5 className="text-danger mb-0">₹ {student.pendingFees}</h5>
//             </div>
//           </div>
//         </div>

//         {/* ================= PAYMENT ================= */}
//         <div className="card shadow-sm p-3 p-md-4">
//           <h5 className="mb-2">💳 Online Fee Payment</h5>

//           {student.pendingFees > 0 ? (
//             <>
//               <p className="text-muted">
//                 You have pending fees. Please proceed with online payment.
//               </p>

//               <button className="btn btn-success">
//                 Pay Now (Integration Coming Soon)
//               </button>
//             </>
//           ) : (
//             <p className="text-success fw-semibold mb-0">
//               ✅ All fees are paid. No action required.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ================= CHANGE PASSWORD MODAL ================= */}
//       {showChangePassword && (
//         <ChangePassword onClose={() => setShowChangePassword(false)} />
//       )}
//     </>
//   );
// }

// export default UserDashboard;
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import UserLayout from "./user/UserLayout";
import UserHome from "./user/UserHome";
import UserProfile from "./user/UserProfile";
import UserFees from "./user/UserFees";
import ChangePassword from "../components/ChangePassword";

function UserDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  /* ================= LOAD STUDENT ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "students", user.email));
        if (snap.exists()) {
          setStudent(snap.data());
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <h5>Loading dashboard...</h5>
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!student) {
    return (
      <div className="container mt-5 text-center">
        <h5>No student record found</h5>
        <p>Please contact school administration.</p>
      </div>
    );
  }

  return (
    <>
      <UserLayout onChangePassword={() => setShowChangePassword(true)}>
        {(activePage) => (
          <>
            {activePage === "home" && <UserHome student={student} />}

            {activePage === "profile" && <UserProfile student={student} />}

            {activePage === "fees" && <UserFees student={student} />}
          </>
        )}
      </UserLayout>

      {/* ================= CHANGE PASSWORD ================= */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </>
  );
}

export default UserDashboard;
