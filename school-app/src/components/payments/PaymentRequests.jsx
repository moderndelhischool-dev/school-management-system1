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

// function PaymentRequests({ darkMode }) {
//   const [payments, setPayments] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const loadPayments = async () => {
//     setLoading(true);

//     const snap = await getDocs(collection(db, "payments"));
//     const raw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//     const map = {};
//     for (let p of raw) {
//       const email = p.studentEmail;
//       if (!email) continue;

//       if (!map[email]) map[email] = p;
//       else {
//         if (map[email].status !== "pending" && p.status === "pending")
//           map[email] = p;
//         else if (
//           map[email].status === p.status &&
//           p.createdAt?.seconds > map[email].createdAt?.seconds
//         )
//           map[email] = p;
//       }
//     }

//     const order = { pending: 1, approved: 2, rejected: 3 };
//     const uniquePayments = Object.values(map).sort(
//       (a, b) => order[a.status] - order[b.status],
//     );

//     setPayments(uniquePayments);
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   const classes = [...new Set(payments.map((p) => p.class))];

//   const filteredPayments = selectedClass
//     ? payments.filter((p) => p.class === selectedClass)
//     : payments;

//   const approvePayment = async (p) => {
//     try {
//       await updateDoc(doc(db, "payments", p.id), {
//         status: "approved",
//         approvedAt: Timestamp.now(),
//       });

//       const studentRef = doc(db, "students", p.studentEmail);
//       const studentSnap = await getDoc(studentRef);

//       if (!studentSnap.exists()) {
//         alert("Student not found");
//         return;
//       }

//       const s = studentSnap.data();
//       const paidNow = Number(p.paidAmount || 0);
//       const newPending = Math.max(Number(s.pendingFees || 0) - paidNow, 0);

//       await updateDoc(studentRef, {
//         paidFees: Number(s.paidFees || 0) + paidNow,
//         pendingFees: newPending,
//         feeStatus: newPending === 0 ? "Completed" : "Pending",
//         updatedAt: Timestamp.now(),
//       });

//       alert("✅ Payment approved");
//       loadPayments();
//     } catch (e) {
//       console.error(e);
//       alert("❌ Approval failed");
//     }
//   };

//   const rejectPayment = async (p) => {
//     await updateDoc(doc(db, "payments", p.id), {
//       status: "rejected",
//       rejectedAt: Timestamp.now(),
//     });
//     loadPayments();
//   };

//   const confirmDelete = async () => {
//     if (!deleteTarget) return;
//     await deleteDoc(doc(db, "payments", deleteTarget.id));
//     setDeleteTarget(null);
//     loadPayments();
//   };

//   if (loading)
//     return <p style={{ color: darkMode ? "#fff" : "#000" }}>Loading...</p>;

//   return (
//     <div
//       className="container-fluid custom-container"
//       style={{ color: darkMode ? "#ffffff" : "#000000" }}
//     >
//       <h4 className="fw-bold text-purple title-space">💰 Payment Requests</h4>

//       <div className="d-flex flex-wrap gap-3 filter-space">
//         {classes.map((cls) => (
//           <div
//             key={cls}
//             className={`class-box ${selectedClass === cls ? "active-box" : ""}`}
//             onClick={() => setSelectedClass(cls)}
//           >
//             Class {cls}
//             <small>
//               {payments.filter((p) => p.class === cls).length} requests
//             </small>
//           </div>
//         ))}
//       </div>

//       {selectedClass && (
//         <button
//           className="btn btn-outline-purple btn-sm back-space"
//           onClick={() => setSelectedClass(null)}
//         >
//           ⬅ Back
//         </button>
//       )}

//       <div className="table-responsive table-space">
//         <table
//           className={`table ${darkMode ? "table-dark" : "table-bordered"}`}
//         >
//           <thead className="purple-head">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Father</th>
//               <th>Email</th>
//               <th>Class</th>
//               <th>Paid</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredPayments.map((p, i) => (
//               <tr key={p.id}>
//                 <td>{i + 1}</td>
//                 <td>{p.studentName}</td>
//                 <td>{p.fatherName || "—"}</td>
//                 <td>{p.studentEmail}</td>
//                 <td>{p.class}</td>
//                 <td className="purple-text fw-bold">₹ {p.paidAmount || 0}</td>
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
//                   {p.status === "pending" ? (
//                     <>
//                       <button
//                         className="btn btn-sm approve-btn me-2"
//                         onClick={() => approvePayment(p)}
//                       >
//                         ✔ Approve
//                       </button>
//                       <button
//                         className="btn btn-sm reject-btn"
//                         onClick={() => rejectPayment(p)}
//                       >
//                         ✖ Reject
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       className="btn btn-sm delete-btn"
//                       onClick={() => setDeleteTarget(p)}
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//         .custom-container {
//           padding: 0 10px 8px 10px !important;
//           margin-bottom: 0 !important;
//         }

//         .title-space {
//           margin-bottom: 18px !important;
//         }

//         .filter-space {
//           margin-bottom: 18px !important;
//         }

//         .back-space {
//           margin-bottom: 12px !important;
//         }

//         .table-space {
//           margin-bottom: 6px !important;
//         }

//         .text-purple { color:#7c3aed !important; }

//         .purple-head {
//           background: linear-gradient(90deg,#4c1d95,#7c3aed);
//           color:white;
//         }

//         .class-box {
//           padding:12px 18px;
//           border-radius:12px;
//           cursor:pointer;
//           background:${darkMode ? "#1e293b" : "#f3f4f6"};
//           color:${darkMode ? "#fff" : "#111"};
//           transition:0.3s;
//         }

//         .active-box,
//         .class-box:hover {
//           background:linear-gradient(135deg,#7c3aed,#4c1d95);
//           color:white;
//         }

//         .approve-btn {
//           background:linear-gradient(135deg,#7c3aed,#4c1d95);
//           color:white;
//           border:none;
//         }

//         .reject-btn {
//           background:linear-gradient(135deg,#ef4444,#dc2626);
//           color:white;
//           border:none;
//         }

//         .delete-btn {
//           background:#dc2626;
//           color:white;
//           border:none;
//         }

//         .btn-outline-purple {
//           border:1px solid #7c3aed;
//           color:#7c3aed;
//         }

//         .btn-outline-purple:hover {
//           background:#7c3aed;
//           color:white;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default PaymentRequests;
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

function PaymentRequests({ darkMode }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  /* ================= LOAD PAYMENTS ================= */
  const loadPayments = async () => {
    try {
      const snap = await getDocs(collection(db, "payments"));

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Latest first
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );

      setPayments(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  /* ================= APPROVE ================= */
  const approvePayment = async (payment) => {
    try {
      setProcessingId(payment.id);

      const paymentRef = doc(db, "payments", payment.id);
      const studentRef = doc(db, "students", payment.studentEmail);

      // ✅ update payment doc
      await updateDoc(paymentRef, {
        status: "approved",
        approvedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // ✅ update student doc
      const studentSnap = await getDoc(studentRef);
      if (studentSnap.exists()) {
        const s = studentSnap.data();

        const total = Number(s.totalFees || 0);
        const oldPaid = Number(s.paidFees || 0);
        const paidNow = Number(payment.paidAmount || 0);

        const newPaid = Math.min(oldPaid + paidNow, total);
        const newPending = Math.max(total - newPaid, 0);

        await updateDoc(studentRef, {
          paidFees: newPaid,
          pendingFees: newPending,
          feeStatus: newPending === 0 ? "Completed" : "Pending",
          updatedAt: Timestamp.now(),
        });
      }

      // ✅ update UI without reload
      setPayments((prev) =>
        prev.map((p) =>
          p.id === payment.id
            ? {
                ...p,
                status: "approved",
                approvedAt: Timestamp.now(),
              }
            : p,
        ),
      );
    } catch {}
    setProcessingId(null);
  };

  /* ================= DELETE ================= */
  const deletePayment = async (id) => {
    try {
      setProcessingId(id);

      await deleteDoc(doc(db, "payments", id));

      // remove from UI
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch {}
    setProcessingId(null);
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div className="container-fluid p-3">
      <h4 className="mb-4">💰 Payment Requests</h4>

      <div className="table-responsive">
        <table
          className={`table ${darkMode ? "table-dark" : "table-bordered"}`}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Father</th>
              <th>Email</th>
              <th>Class</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Approval Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No payment requests
                </td>
              </tr>
            ) : (
              payments.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.studentName}</td>
                  <td>{p.fatherName || "—"}</td>
                  <td>{p.studentEmail}</td>
                  <td>{p.class}</td>
                  <td>₹ {p.paidAmount}</td>

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
                    {p.approvedAt?.seconds
                      ? new Date(p.approvedAt.seconds * 1000).toLocaleString(
                          "en-IN",
                        )
                      : "—"}
                  </td>

                  <td>
                    {/* 🔥 Pending → Approve + Delete */}
                    {p.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          disabled={processingId === p.id}
                          onClick={() => approvePayment(p)}
                        >
                          {processingId === p.id ? "Processing..." : "Approve"}
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          disabled={processingId === p.id}
                          onClick={() => deletePayment(p.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* 🔥 Approved → Only Delete */}
                    {p.status === "approved" && (
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={processingId === p.id}
                        onClick={() => deletePayment(p.id)}
                      >
                        {processingId === p.id ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentRequests;
