// import { useEffect, useState } from "react";
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
// import ChangePassword from "../components/ChangePassword";

// /* 🔥 NEW: PAYMENT HISTORY COMPONENT (INLINE) */
// function PaymentHistory({ email }) {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
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

//       // 🔥 latest first
//       data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

//       setPayments(data);
//       setLoading(false);
//     };

//     loadPayments();
//   }, [email]);

//   if (loading) return <p>Loading payment history...</p>;

//   if (payments.length === 0)
//     return <p className="text-muted">No payment history found.</p>;

//   return (
//     <div className="card shadow-sm p-3">
//       <h5 className="mb-3">🧾 Payment History</h5>

//       <div className="table-responsive">
//         <table className="table table-bordered align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Paid Amount</th>
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

// function UserDashboard() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   /* ================= LOAD STUDENT ================= */
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
//       <UserLayout onChangePassword={() => setShowChangePassword(true)}>
//         {(activePage) => (
//           <>
//             {activePage === "home" && <UserHome student={student} />}

//             {activePage === "profile" && <UserProfile student={student} />}

//             {activePage === "fees" && <UserFees student={student} />}

//             {/* 🔥 NEW PAGE */}
//             {activePage === "history" && (
//               <PaymentHistory email={student.email} />
//             )}
//           </>
//         )}
//       </UserLayout>

//       {/* ================= CHANGE PASSWORD ================= */}
//       {showChangePassword && (
//         <ChangePassword onClose={() => setShowChangePassword(false)} />
//       )}
//     </>
//   );
// }

// export default UserDashboard;
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
import ChangePassword from "../components/ChangePassword";

/* ================= PAYMENT HISTORY ================= */
function PaymentHistory({ email }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const loadPayments = async () => {
      const q = query(
        collection(db, "payments"),
        where("studentEmail", "==", email),
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // 🔥 latest first (safe)
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );

      setPayments(data);
      setLoading(false);
    };

    loadPayments();
  }, [email]);

  if (loading) return <p>Loading payment history...</p>;

  if (payments.length === 0) {
    return <p className="text-muted">No payment history found.</p>;
  }

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3">🧾 Payment History</h5>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Paid Amount</th>
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
        <h5>Loading dashboard...</h5>
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
