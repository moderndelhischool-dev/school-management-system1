// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   getDoc,
// } from "firebase/firestore";

// function PaymentHistory({ email }) {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalFees, setTotalFees] = useState(0);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//     }

//     const load = async () => {
//       const studentSnap = await getDoc(doc(db, "students", email));
//       if (studentSnap.exists()) {
//         setTotalFees(Number(studentSnap.data().totalFees || 0));
//       }

//       const q = query(
//         collection(db, "payments"),
//         where("studentEmail", "==", email),
//         where("status", "==", "approved"),
//       );

//       const snap = await getDocs(q);
//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));

//       data.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

//       setPayments(data);
//       setLoading(false);
//     };

//     load();
//   }, [email]);

//   if (loading)
//     return (
//       <p className={darkMode ? "text-light" : ""}>Loading payment history...</p>
//     );

//   if (payments.length === 0)
//     return (
//       <p className={darkMode ? "text-light" : "text-muted"}>
//         No payment history found.
//       </p>
//     );

//   let cumulativePaid = 0;

//   return (
//     <div
//       className={`card shadow-sm p-3 ${darkMode ? "bg-dark text-light" : ""}`}
//     >
//       <h5 className="mb-3">🧾 Payment History</h5>

//       {/* DESKTOP TABLE */}
//       <div className="table-responsive d-none d-md-block">
//         <table
//           className={`table table-bordered align-middle ${
//             darkMode ? "table-dark" : ""
//           }`}
//         >
//           <thead>
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
//             {payments.map((p, i) => {
//               cumulativePaid += Number(p.paidAmount || 0);
//               const remaining = Math.max(totalFees - cumulativePaid, 0);

//               return (
//                 <tr key={p.id}>
//                   <td>{i + 1}</td>

//                   <td className="text-success fw-semibold">₹ {p.paidAmount}</td>

//                   <td
//                     className={
//                       remaining === 0
//                         ? "text-success fw-semibold"
//                         : "text-danger fw-semibold"
//                     }
//                   >
//                     ₹ {remaining}
//                   </td>

//                   <td>{p.month || "—"}</td>

//                   <td>
//                     <span className="badge bg-success">approved</span>
//                   </td>

//                   <td>
//                     {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
//                       "en-IN",
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* MOBILE CARDS */}
//       <div className="d-md-none">
//         {payments.map((p, i) => {
//           cumulativePaid += Number(p.paidAmount || 0);
//           const remaining = Math.max(totalFees - cumulativePaid, 0);

//           return (
//             <div
//               key={p.id}
//               className={`border rounded p-3 mb-2 ${
//                 darkMode ? "bg-dark text-light border-secondary" : ""
//               }`}
//             >
//               <div className="d-flex justify-content-between mb-1">
//                 <strong>Payment #{i + 1}</strong>
//                 <span className="badge bg-success">approved</span>
//               </div>

//               <div className="small text-muted mb-1">
//                 {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
//                   "en-IN",
//                 )}
//               </div>

//               <div>
//                 <b>Paid:</b>{" "}
//                 <span className="text-success fw-semibold">
//                   ₹ {p.paidAmount}
//                 </span>
//               </div>

//               <div>
//                 <b>Remaining:</b>{" "}
//                 <span
//                   className={
//                     remaining === 0
//                       ? "text-success fw-semibold"
//                       : "text-danger fw-semibold"
//                   }
//                 >
//                   ₹ {remaining}
//                 </span>
//               </div>

//               <div>
//                 <b>Month:</b> {p.month || "—"}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default PaymentHistory;
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

function PaymentHistory({ email }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFees, setTotalFees] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    const load = async () => {
      const studentSnap = await getDoc(doc(db, "students", email));
      if (studentSnap.exists()) {
        setTotalFees(Number(studentSnap.data().totalFees || 0));
      }

      const q = query(
        collection(db, "payments"),
        where("studentEmail", "==", email),
        where("status", "==", "approved"),
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      data.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

      setPayments(data);
      setLoading(false);
    };

    load();
  }, [email]);

  if (loading)
    return (
      <p className={darkMode ? "text-light" : ""}>Loading payment history...</p>
    );

  if (payments.length === 0)
    return (
      <p className={darkMode ? "text-light" : "text-muted"}>
        No payment history found.
      </p>
    );

  let cumulativePaid = 0;

  return (
    <div
      className={`card shadow-sm p-4 payment-card ${
        darkMode ? "bg-dark text-light border-secondary" : ""
      }`}
    >
      <h5 className="mb-4 fw-bold">🧾 Payment History</h5>

      {/* SUMMARY */}
      <div className="mb-4 p-3 rounded summary-box">
        <div className="d-flex justify-content-between">
          <span>Total Fees</span>
          <strong>₹ {totalFees}</strong>
        </div>
        <div className="d-flex justify-content-between">
          <span>Total Payments</span>
          <strong>{payments.length}</strong>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="table-responsive d-none d-md-block">
        <table
          className={`table align-middle ${
            darkMode ? "table-dark" : "table-bordered"
          }`}
        >
          <thead>
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
            {payments.map((p, i) => {
              cumulativePaid += Number(p.paidAmount || 0);
              const remaining = Math.max(totalFees - cumulativePaid, 0);

              return (
                <tr key={p.id}>
                  <td>{i + 1}</td>

                  <td className="text-success fw-semibold">₹ {p.paidAmount}</td>

                  <td
                    className={
                      remaining === 0
                        ? "text-success fw-semibold"
                        : "text-danger fw-semibold"
                    }
                  >
                    ₹ {remaining}
                  </td>

                  <td>{p.month || "—"}</td>

                  <td>
                    <span className="badge bg-success">approved</span>
                  </td>

                  <td>
                    {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                      "en-IN",
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="d-md-none">
        {payments.map((p, i) => {
          cumulativePaid += Number(p.paidAmount || 0);
          const remaining = Math.max(totalFees - cumulativePaid, 0);

          return (
            <div
              key={p.id}
              className={`mobile-card p-3 mb-3 ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
            >
              <div className="d-flex justify-content-between mb-2">
                <strong>Payment #{i + 1}</strong>
                <span className="badge bg-success">approved</span>
              </div>

              <div className="small text-muted mb-2">
                {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                  "en-IN",
                )}
              </div>

              <div>
                <b>Paid:</b>{" "}
                <span className="text-success fw-semibold">
                  ₹ {p.paidAmount}
                </span>
              </div>

              <div>
                <b>Remaining:</b>{" "}
                <span
                  className={
                    remaining === 0
                      ? "text-success fw-semibold"
                      : "text-danger fw-semibold"
                  }
                >
                  ₹ {remaining}
                </span>
              </div>

              <div>
                <b>Month:</b> {p.month || "—"}
              </div>
            </div>
          );
        })}
      </div>

      {/* CUSTOM STYLE */}
      <style>{`
        .payment-card {
          border-radius: 16px;
          transition: 0.3s ease;
        }

        .payment-card:hover {
          box-shadow: 0 12px 35px rgba(0,0,0,0.1);
        }

        .summary-box {
          background: linear-gradient(135deg,#ecfdf5,#d1fae5);
          font-weight: 500;
        }

        body.dark-mode .summary-box {
          background: linear-gradient(135deg,#1e293b,#0f172a);
        }

        .mobile-card {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          transition: 0.3s ease;
        }

        .mobile-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

export default PaymentHistory;
