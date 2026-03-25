// import { useEffect, useState } from "react";
// import { db } from "../../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
//   getDoc,
//   Timestamp,
// } from "firebase/firestore";
// import { computeFeeBalances } from "../../utils/applyRazorpayPaymentApproval";

// function PaymentRequests({ darkMode }) {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);

//   /* ================= LOAD PAYMENTS ================= */
//   const loadPayments = async () => {
//     try {
//       const snap = await getDocs(collection(db, "payments"));
//       const data = snap.docs.map((d) => ({
//         id: d.id,
//         ...d.data(),
//       }));

//       // Latest first
//       data.sort(
//         (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//       );

//       setPayments(data);
//     } catch (err) {
//       console.error("Error loading payments:", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   /* ================= APPROVE ================= */
//   const approvePayment = async (payment) => {
//     try {
//       setProcessingId(payment.id);

//       const paymentRef = doc(db, "payments", payment.id);
//       const studentRef = doc(db, "students", payment.studentEmail);

//       // ✅ 1. Update Payment Status
//       await updateDoc(paymentRef, {
//         status: "approved",
//         approvedAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//       });

//       // ✅ 2. Update Student Balance
//       const studentSnap = await getDoc(studentRef);
//       if (studentSnap.exists()) {
//         const s = studentSnap.data();
//         const { newPaid, newPending, feeStatus } = computeFeeBalances(
//           s.totalFees,
//           s.paidFees,
//           payment.paidAmount,
//         );

//         await updateDoc(studentRef, {
//           paidFees: newPaid,
//           pendingFees: newPending,
//           feeStatus,
//           updatedAt: Timestamp.now(),
//         });
//       }

//       // ✅ 3. Update UI
//       setPayments((prev) =>
//         prev.map((p) =>
//           p.id === payment.id
//             ? {
//                 ...p,
//                 status: "approved",
//                 approvedAt: { seconds: Math.floor(Date.now() / 1000) },
//               }
//             : p,
//         ),
//       );
//       alert("✅ Payment Approved and Fees Updated!");
//     } catch (err) {
//       alert("❌ Approval failed!");
//     }
//     setProcessingId(null);
//   };

//   /* ================= DELETE ================= */
//   const deletePayment = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       setProcessingId(id);
//       await deleteDoc(doc(db, "payments", id));
//       setPayments((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       alert("❌ Delete failed!");
//     }
//     setProcessingId(null);
//   };

//   if (loading) return <p style={{ padding: 20 }}>Loading payments...</p>;

//   return (
//     <div className="container-fluid p-3">
//       <h4 className="mb-4 fw-bold">💰 Payment verification Requests</h4>

//       <div className="table-responsive">
//         <table
//           className={`table align-middle ${darkMode ? "table-dark" : "table-hover border"}`}
//         >
//           <thead className={darkMode ? "table-dark" : "table-light"}>
//             <tr>
//               <th>#</th>
//               <th>Student Name</th>
//               <th>Email / Class</th>
//               <th>Amount</th>
//               <th>Payment Proof</th> {/* 👈 Naya Column */}
//               <th>Status</th>
//               <th>Approval Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {payments.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center p-4">
//                   No payment requests found.
//                 </td>
//               </tr>
//             ) : (
//               payments.map((p, index) => (
//                 <tr key={p.id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <div className="fw-bold">{p.studentName}</div>
//                     <small className="text-muted">{p.fatherName}</small>
//                   </td>
//                   <td>
//                     <div>{p.studentEmail}</div>
//                     <span
//                       className="badge bg-info text-dark"
//                       style={{ fontSize: "10px" }}
//                     >
//                       Class {p.class}
//                     </span>
//                   </td>
//                   <td className="fw-bold text-success">₹{p.paidAmount}</td>

//                   {/* 🔥 View Slip Button */}
//                   <td>
//                     {p.slipUrl ? (
//                       <a
//                         href={p.slipUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="btn btn-outline-primary btn-sm"
//                       >
//                         👁️ View Slip
//                       </a>
//                     ) : (
//                       <span className="text-muted small">No Slip</span>
//                     )}
//                   </td>

//                   <td>
//                     <span
//                       className={`badge ${p.status === "approved" ? "bg-success" : "bg-warning text-dark"}`}
//                     >
//                       {p.status.toUpperCase()}
//                     </span>
//                   </td>

//                   <td>
//                     {p.approvedAt?.seconds
//                       ? new Date(p.approvedAt.seconds * 1000).toLocaleString(
//                           "en-IN",
//                         )
//                       : "—"}
//                   </td>

//                   <td>
//                     <div className="d-flex gap-2">
//                       {p.status === "pending" && (
//                         <button
//                           className="btn btn-success btn-sm"
//                           disabled={processingId === p.id}
//                           onClick={() => approvePayment(p)}
//                         >
//                           {processingId === p.id ? "..." : "Approve"}
//                         </button>
//                       )}
//                       <button
//                         className="btn btn-danger btn-sm"
//                         disabled={processingId === p.id}
//                         onClick={() => deletePayment(p.id)}
//                       >
//                         {processingId === p.id ? "..." : "Delete"}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default PaymentRequests;
