// import { useEffect, useState } from "react";
// import { db } from "../../firebase/firebase"; // Apna path check kar lena
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { HiOutlineDownload, HiOutlineEye, HiOutlineX } from "react-icons/hi";

// function PaymentHistory({ email, darkMode }) {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [selectedSlip, setSelectedSlip] = useState(null); // Slip Preview ke liye

//   useEffect(() => {
//     if (!email) return;

//     // Student ki extra details fetch karne ke liye (PDF ke kaam aayega)
//     const fetchStudent = async () => {
//       const studentSnap = await getDoc(doc(db, "students", email));
//       if (studentSnap.exists()) setStudentInfo(studentSnap.data());
//     };
//     fetchStudent();

//     // Payments fetch karne ke liye
//     const q = query(
//       collection(db, "payments"),
//       where("studentEmail", "==", email),
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs
//         .map((d) => ({ id: d.id, ...d.data() }))
//         .sort(
//           (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
//         );
//       setPayments(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [email]);

//   // PDF Generate Function
//   const generatePDF = (p) => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.setTextColor(15, 76, 108); // School Theme Color
//     doc.text("FEE RECEIPT", 105, 20, { align: "center" });

//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Student Name: ${studentInfo?.name || p.studentName}`, 14, 40);
//     doc.text(`Roll No: ${studentInfo?.rollNo || "N/A"}`, 14, 47);
//     doc.text(`Class: ${studentInfo?.class || "N/A"}`, 14, 54);

//     doc.autoTable({
//       startY: 65,
//       head: [["Description", "Details"]],
//       body: [
//         ["Transaction ID", p.paymentId || p.id],
//         ["Fees Month", p.month],
//         ["Amount Paid", `Rs. ${p.paidAmount}`],
//         ["Payment Mode", p.mode || "Online"],
//         ["Status", p.status.toUpperCase()],
//         [
//           "Date",
//           p.createdAt?.seconds
//             ? new Date(p.createdAt.seconds * 1000).toLocaleString()
//             : "N/A",
//         ],
//       ],
//       theme: "grid",
//       headStyles: { fillColor: [15, 76, 108] },
//     });

//     doc.text(
//       "This is a computer generated receipt.",
//       105,
//       doc.lastAutoTable.finalY + 20,
//       { align: "center" },
//     );
//     doc.save(`Receipt_${p.month}_${studentInfo?.name}.pdf`);
//   };

//   if (loading) return <div className="p-5 text-center">Loading...</div>;

//   return (
//     <div className={`history-container ${darkMode ? "dark" : "light"}`}>
//       <div className="card-custom shadow-sm p-4">
//         <h4 className="fw-bold mb-4">🧾 Payment History</h4>

//         <div className="table-responsive">
//           <table className="table custom-table align-middle">
//             <thead>
//               <tr className={darkMode ? "text-white" : "text-dark"}>
//                 <th>#</th>
//                 <th>Paid</th>
//                 <th>Month</th>
//                 <th>Status</th>
//                 <th>Slip</th> {/* Naya Column */}
//                 <th>Date & Time</th>
//                 <th className="text-end">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.length > 0 ? (
//                 payments.map((p, i) => (
//                   <tr key={p.id} className={darkMode ? "text-white-50" : ""}>
//                     <td>{i + 1}</td>
//                     <td className="fw-bold text-primary">₹{p.paidAmount}</td>
//                     <td>{p.month}</td>
//                     <td>
//                       <span
//                         className={`status-badge ${p.status?.toLowerCase()}`}
//                       >
//                         {p.status}
//                       </span>
//                     </td>
//                     <td>
//                       {/* Slip View Button */}
//                       {p.slipUrl ? (
//                         <button
//                           className="btn-view-slip"
//                           onClick={() => setSelectedSlip(p.slipUrl)}
//                         >
//                           <HiOutlineEye /> View
//                         </button>
//                       ) : (
//                         <span className="text-muted small">No Slip</span>
//                       )}
//                     </td>
//                     <td className="small">
//                       {p.createdAt?.seconds
//                         ? new Date(p.createdAt.seconds * 1000).toLocaleString()
//                         : "—"}
//                     </td>
//                     <td className="text-end">
//                       {/* PDF Only if Approved */}
//                       {p.status === "approved" ? (
//                         <button
//                           className="btn-pdf-download"
//                           onClick={() => generatePDF(p)}
//                         >
//                           <HiOutlineDownload /> PDF
//                         </button>
//                       ) : (
//                         <span className="text-muted small">
//                           Pending Approval
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center p-5 text-muted">
//                     No Payment Records Found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- Image Preview Modal --- */}
//       {selectedSlip && (
//         <div
//           className="slip-modal-overlay"
//           onClick={() => setSelectedSlip(null)}
//         >
//           <div
//             className="slip-modal-content"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="close-modal"
//               onClick={() => setSelectedSlip(null)}
//             >
//               <HiOutlineX size={30} />
//             </button>
//             <img src={selectedSlip} alt="Payment Proof" />
//           </div>
//         </div>
//       )}

//       <style>{`
//         .card-custom {
//           background: ${darkMode ? "#1e293b" : "#ffffff"};
//           border-radius: 15px;
//           border: 1px solid ${darkMode ? "#334155" : "#edf2f7"};
//         }
//         .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
//         .status-badge.approved { background: #dcfce7; color: #166534; }
//         .status-badge.pending { background: #fef9c3; color: #854d0e; }

//         .btn-view-slip {
//           background: transparent; border: 1px solid #0F4C6C; color: #0F4C6C;
//           padding: 3px 10px; border-radius: 6px; display: flex; align-items: center; gap: 5px; cursor: pointer;
//         }
//         .btn-view-slip:hover { background: #0F4C6C; color: white; }

//         .btn-pdf-download {
//           background: #0F4C6C; color: #D4A24C; border: none;
//           padding: 6px 12px; border-radius: 8px; cursor: pointer; font-weight: 600;
//         }

//         /* Modal Styling */
//         .slip-modal-overlay {
//           position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//           background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 1000;
//         }
//         .slip-modal-content { position: relative; max-width: 500px; width: 90%; }
//         .slip-modal-content img { width: 100%; border-radius: 12px; border: 4px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
//         .close-modal {
//           position: absolute; top: -45px; right: 0; background: none; border: none; color: white; cursor: pointer;
//         }

//         .custom-table thead th { border-bottom: 2px solid #edf2f7; padding-bottom: 15px; }
//         .custom-table tbody td { padding: 15px 0; border-bottom: 1px solid ${darkMode ? "#334155" : "#f1f5f9"}; }
//       `}</style>
//     </div>
//   );
// }

// export default PaymentHistory;
