import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import UserLayout from "./user/UserLayout";
import UserHome from "./user/UserHome";
import UserProfile from "./user/UserProfile";
import UserFees from "./user/UserFees";
import UserContact from "./user/UserContact"; // ✅ NEW
import ChangePassword from "../components/ChangePassword";

/* ================= PAYMENT HISTORY ================= */
function PaymentHistory({ email }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (!email) return;

    const loadPayments = async () => {
      setLoading(true);

      const q = query(
        collection(db, "payments"),
        where("studentEmail", "==", email),
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );

      setPayments(data);
      setLoading(false);
    };

    loadPayments();
  }, [email]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-success"></div>
      </div>
    );

  if (payments.length === 0) {
    return (
      <p
        className={
          darkMode ? "text-light text-center" : "text-muted text-center"
        }
      >
        No payment history found.
      </p>
    );
  }

  return (
    <div
      className={`card shadow-sm p-3 ${darkMode ? "bg-dark text-light" : ""}`}
      style={{ borderRadius: "16px" }}
    >
      <h5 className="mb-3">🧾 Payment History</h5>

      <div className="table-responsive">
        <table
          className={`table align-middle ${
            darkMode ? "table-dark" : "table-bordered"
          }`}
        >
          <thead className={darkMode ? "" : "table-dark"}>
            <tr>
              <th>#</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Month</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td className="text-success fw-semibold">
                  ₹ {p.paidAmount || 0}
                </td>
                <td
                  className={
                    p.remainingFees === 0
                      ? "text-success fw-semibold"
                      : "text-danger fw-semibold"
                  }
                >
                  ₹ {p.remainingFees ?? "—"}
                </td>
                <td>{p.month || "—"}</td>
                <td>
                  <span
                    className={`badge ${
                      p.status === "approved"
                        ? "bg-success"
                        : p.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.createdAt
                    ? new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                        "en-IN",
                      )
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= USER DASHBOARD ================= */
function UserDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "students", user.email));
        if (snap.exists()) {
          setStudent({ email: user.email, ...snap.data() });
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-success mb-3"></div>
          <h6>Loading dashboard...</h6>
        </div>
      </div>
    );
  }

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
            {activePage === "history" && (
              <PaymentHistory email={student.email} />
            )}
            {activePage === "contact" && <UserContact />} {/* ✅ NEW */}
          </>
        )}
      </UserLayout>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </>
  );
}

export default UserDashboard;
// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { auth, db } from "../firebase/firebase";
// import {
//   doc,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// import UserLayout from "./user/UserLayout";
// import UserHome from "./user/UserHome";
// import UserProfile from "./user/UserProfile";
// import UserFees from "./user/UserFees";
// import UserContact from "./user/UserContact";
// import ChangePassword from "../components/ChangePassword";

// /* ================= PAYMENT HISTORY ================= */
// function PaymentHistory({ email }) {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!email) return;

//     const loadPayments = async () => {
//       const q = query(
//         collection(db, "payments"),
//         where("studentEmail", "==", email),
//       );

//       const snap = await getDocs(q);

//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));

//       data.sort(
//         (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//       );

//       setPayments(data);
//       setLoading(false);
//     };

//     loadPayments();
//   }, [email]);

//   if (loading)
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-success mb-3"></div>
//         <p>Loading payment history...</p>
//       </div>
//     );

//   if (payments.length === 0)
//     return <p className="text-center text-muted">No payment history found.</p>;

//   return (
//     <div className="card shadow-sm p-4" style={{ borderRadius: "18px" }}>
//       <h5 className="mb-4">🧾 Payment History</h5>

//       <div className="table-responsive">
//         <table className="table table-bordered align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Paid</th>
//               <th>Remaining</th>
//               <th>Month</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {payments.map((p, i) => (
//               <tr key={p.id}>
//                 <td>{i + 1}</td>
//                 <td className="text-success fw-semibold">
//                   ₹ {p.paidAmount || 0}
//                 </td>
//                 <td
//                   className={
//                     p.remainingFees === 0
//                       ? "text-success fw-semibold"
//                       : "text-danger fw-semibold"
//                   }
//                 >
//                   ₹ {p.remainingFees ?? "—"}
//                 </td>
//                 <td>{p.month || "—"}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       p.status === "approved"
//                         ? "bg-success"
//                         : p.status === "rejected"
//                           ? "bg-danger"
//                           : "bg-warning text-dark"
//                     }`}
//                   >
//                     {p.status}
//                   </span>
//                 </td>
//                 <td>
//                   {p.createdAt
//                     ? new Date(p.createdAt.seconds * 1000).toLocaleDateString(
//                         "en-IN",
//                       )
//                     : "—"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ================= USER DASHBOARD ================= */
// function UserDashboard() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [showContact, setShowContact] = useState(false);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const snap = await getDoc(doc(db, "students", user.email));
//         if (snap.exists()) {
//           setStudent({ email: user.email, ...snap.data() });
//         }
//       }
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="text-center">
//           <div className="spinner-border text-success mb-3"></div>
//           <h6>Loading dashboard...</h6>
//         </div>
//       </div>
//     );
//   }

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
//       <UserLayout onChangePassword={() => setShowChangePassword(true)}>
//         {(activePage) => (
//           <>
//             {activePage === "home" && <UserHome student={student} />}
//             {activePage === "profile" && <UserProfile student={student} />}
//             {activePage === "fees" && <UserFees student={student} />}
//             {activePage === "history" && (
//               <PaymentHistory email={student.email} />
//             )}
//           </>
//         )}
//       </UserLayout>

//       {/* Floating Button */}
//       {!showContact && (
//         <div className="contact-btn" onClick={() => setShowContact(true)}>
//           📞
//         </div>
//       )}

//       {/* Modal using Portal */}
//       {showContact &&
//         createPortal(
//           <div
//             className="contact-overlay"
//             onClick={() => setShowContact(false)}
//           >
//             <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
//               <div
//                 className="contact-close"
//                 onClick={() => setShowContact(false)}
//               >
//                 ✕
//               </div>

//               <UserContact />
//             </div>
//           </div>,
//           document.getElementById("modal-root"),
//         )}

//       {showChangePassword && (
//         <ChangePassword onClose={() => setShowChangePassword(false)} />
//       )}

//       {/* ================= STYLES ================= */}
//       <style>{`
//         .contact-btn {
//           position: fixed;
//           bottom: 25px;
//           right: 25px;
//           width: 65px;
//           height: 65px;
//           border-radius: 50%;
//           background: linear-gradient(135deg,#22c55e,#16a34a);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 26px;
//           color: white;
//           cursor: pointer;
//           box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//           transition: 0.3s;
//           z-index: 999;
//         }

//         .contact-btn:hover {
//           transform: scale(1.1);
//         }

//         .contact-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.6);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 99999;
//         }

//         .contact-modal {
//           width: 95%;
//           max-width: 500px;
//           background: white;
//           border-radius: 20px;
//           padding: 35px 25px 25px;
//           position: relative;
//           box-shadow: 0 25px 60px rgba(0,0,0,0.3);
//           animation: slideUp 0.4s ease;
//         }

//         .contact-close {
//           position: absolute;
//           top: -15px;
//           right: -15px;
//           width: 38px;
//           height: 38px;
//           border-radius: 50%;
//           background: #ef4444;
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           font-weight: bold;
//         }

//         @keyframes slideUp {
//           from { transform: translateY(50px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//       `}</style>
//     </>
//   );
// }

// export default UserDashboard;
