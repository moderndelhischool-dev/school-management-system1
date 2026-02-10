// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// function PaymentHistory({ email }) {
//   const [payments, setPayments] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   /* ================= LOAD PAYMENTS ================= */
//   useEffect(() => {
//     const loadPayments = async () => {
//       const q = query(
//         collection(db, "payments"),
//         where("studentEmail", "==", email),
//         where("status", "==", "approved"), // 🔒 only approved history
//       );

//       const snap = await getDocs(q);

//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));

//       // latest first
//       data.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

//       setPayments(data);
//       setFiltered(data);
//       setLoading(false);
//     };

//     loadPayments();
//   }, [email]);

//   /* ================= FILTER LOGIC ================= */
//   useEffect(() => {
//     if (filter === "all") {
//       setFiltered(payments);
//       return;
//     }

//     const now = new Date();
//     let fromDate = new Date();

//     if (filter === "30") fromDate.setDate(now.getDate() - 30);
//     if (filter === "90") fromDate.setMonth(now.getMonth() - 3);
//     if (filter === "365") fromDate.setFullYear(now.getFullYear() - 1);

//     const result = payments.filter((p) => {
//       const payDate = new Date(p.createdAt.seconds * 1000);
//       return payDate >= fromDate;
//     });

//     setFiltered(result);
//   }, [filter, payments]);

//   if (loading) return <p>Loading payment history...</p>;

//   if (filtered.length === 0)
//     return <p className="text-muted">No payment history found.</p>;

//   return (
//     <div className="card shadow-sm p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="mb-0">🧾 Payment History</h5>

//         {/* FILTER DROPDOWN */}
//         <select
//           className="form-select w-auto"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="30">Last 30 Days</option>
//           <option value="90">Last 3 Months</option>
//           <option value="365">Last 1 Year</option>
//         </select>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-bordered align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Paid Amount</th>
//               <th>Month</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((p, i) => (
//               <tr key={p.id}>
//                 <td>{i + 1}</td>

//                 <td className="text-success fw-semibold">₹ {p.paidAmount}</td>

//                 <td>{p.month || "—"}</td>

//                 <td>
//                   {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
//                     "en-IN",
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const load = async () => {
      // 🔹 student total fees
      const studentSnap = await getDoc(doc(db, "students", email));
      if (studentSnap.exists()) {
        setTotalFees(Number(studentSnap.data().totalFees || 0));
      }

      // 🔹 approved payments only
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

      // 🔥 oldest first (important for remaining calc)
      data.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

      setPayments(data);
      setLoading(false);
    };

    load();
  }, [email]);

  if (loading) return <p>Loading payment history...</p>;

  if (payments.length === 0)
    return <p className="text-muted">No payment history found.</p>;

  /* ================= REMAINING CALC ================= */
  let cumulativePaid = 0;

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
    </div>
  );
}

export default PaymentHistory;
