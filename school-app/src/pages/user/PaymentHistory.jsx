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
//       <p style={{ color: darkMode ? "#c4b5fd" : "#6b21a8" }}>
//         No payment history found.
//       </p>
//     );

//   let cumulativePaid = 0;

//   return (
//     <div
//       className={`card shadow-sm p-4 payment-card ${
//         darkMode ? "bg-dark text-light border-secondary" : ""
//       }`}
//     >
//       <h5 className="mb-4 fw-bold text-purple">🧾 Payment History</h5>

//       {/* SUMMARY */}
//       <div className="mb-4 p-3 rounded summary-box">
//         <div className="d-flex justify-content-between">
//           <span>Total Fees</span>
//           <strong>₹ {totalFees}</strong>
//         </div>
//         <div className="d-flex justify-content-between">
//           <span>Total Payments</span>
//           <strong>{payments.length}</strong>
//         </div>
//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="table-responsive d-none d-md-block">
//         <table
//           className={`table align-middle ${
//             darkMode ? "table-dark" : "table-bordered"
//           }`}
//         >
//           <thead className={darkMode ? "" : "table-light"}>
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
//                     <span className="badge bg-purple">approved</span>
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
//               className={`mobile-card p-3 mb-3 ${
//                 darkMode ? "bg-dark text-light border-secondary" : ""
//               }`}
//             >
//               <div className="d-flex justify-content-between mb-2">
//                 <strong>Payment #{i + 1}</strong>
//                 <span className="badge bg-purple">approved</span>
//               </div>

//               <div className="small text-muted mb-2">
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

//       <style>{`
//         .payment-card {
//           border-radius: 16px;
//           transition: 0.3s ease;
//           border: 1px solid #ddd6fe;
//         }

//         .payment-card:hover {
//           box-shadow: 0 12px 35px rgba(124,58,237,0.25);
//         }

//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .summary-box {
//           background: linear-gradient(135deg,#f3e8ff,#ede9fe);
//           font-weight: 500;
//         }

//         body.dark-mode .summary-box {
//           background: linear-gradient(135deg,#1e1b4b,#0f172a);
//         }

//         .bg-purple {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95) !important;
//           color: white;
//         }

//         .mobile-card {
//           border-radius: 12px;
//           border: 1px solid #ddd6fe;
//           transition: 0.3s ease;
//         }

//         .mobile-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 8px 20px rgba(124,58,237,0.25);
//         }
//       `}</style>
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
    if (savedTheme === "dark") setDarkMode(true);

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
      <p style={{ color: darkMode ? "#ffffff" : "#0F4C6C" }}>
        Loading payment history...
      </p>
    );

  if (payments.length === 0)
    return (
      <p style={{ color: darkMode ? "#D4A24C" : "#0F4C6C" }}>
        No payment history found.
      </p>
    );

  let cumulativePaid = 0;

  return (
    <div
      className="payment-card shadow-sm p-4"
      style={{
        backgroundColor: darkMode ? "#1B2A35" : "#ffffff",
        color: darkMode ? "#ffffff" : "#0F4C6C",
        border: darkMode ? "1px solid #243644" : "1px solid #E5E7EB",
      }}
    >
      <h5 className="mb-4 fw-bold title-text">🧾 Payment History</h5>

      {/* SUMMARY */}
      <div className="summary-box mb-4 p-3 rounded">
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
        <table className={`table align-middle ${darkMode ? "table-dark" : ""}`}>
          <thead className="blue-head">
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

                  <td className="gold-text fw-semibold">₹ {p.paidAmount}</td>

                  <td
                    className={
                      remaining === 0
                        ? "gold-text fw-semibold"
                        : "text-danger fw-semibold"
                    }
                  >
                    ₹ {remaining}
                  </td>

                  <td>{p.month || "—"}</td>

                  <td>
                    <span className="badge badge-approved">Approved</span>
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
              className="mobile-card p-3 mb-3"
              style={{
                backgroundColor: darkMode ? "#243644" : "#F4F6F8",
                border: darkMode ? "1px solid #334155" : "1px solid #E5E7EB",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <strong>Payment #{i + 1}</strong>
                <span className="badge badge-approved">Approved</span>
              </div>

              <div className="small text-muted mb-2">
                {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                  "en-IN",
                )}
              </div>

              <div>
                <b>Paid:</b>{" "}
                <span className="gold-text fw-semibold">₹ {p.paidAmount}</span>
              </div>

              <div>
                <b>Remaining:</b>{" "}
                <span
                  className={
                    remaining === 0
                      ? "gold-text fw-semibold"
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

      <style>{`
      .payment-card {
        border-radius:18px;
        transition:0.3s ease;
      }

      .payment-card:hover {
        box-shadow:0 15px 40px rgba(15,76,108,0.25);
      }

      .title-text {
        color:#0F4C6C;
      }

      body.dark-mode .title-text {
        color:#D4A24C;
      }

      .summary-box {
        background:linear-gradient(135deg,#F4F6F8,#ffffff);
        border:1px solid #E5E7EB;
        font-weight:500;
      }

      body.dark-mode .summary-box {
        background:linear-gradient(135deg,#243644,#1B2A35);
        border:1px solid #334155;
      }

      .blue-head {
        background:linear-gradient(90deg,#0F4C6C,#1B5E84);
        color:white;
      }

      .gold-text {
        color:#D4A24C;
      }

      .badge-approved {
        background:#D4A24C;
        color:#0F4C6C;
      }

      .mobile-card {
        border-radius:14px;
        transition:0.3s ease;
      }

      .mobile-card:hover {
        transform:translateY(-3px);
        box-shadow:0 10px 25px rgba(15,76,108,0.2);
      }
      `}</style>
    </div>
  );
}

export default PaymentHistory;
