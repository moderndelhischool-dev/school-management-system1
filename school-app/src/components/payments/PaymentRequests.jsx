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

//       if (!map[email]) {
//         map[email] = p;
//       } else {
//         if (map[email].status !== "pending" && p.status === "pending") {
//           map[email] = p;
//         } else if (map[email].status === p.status) {
//           if (p.createdAt?.seconds > map[email].createdAt?.seconds) {
//             map[email] = p;
//           }
//         }
//       }
//     }

//     let uniquePayments = Object.values(map);
//     const order = { pending: 1, approved: 2, rejected: 3 };
//     uniquePayments.sort((a, b) => order[a.status] - order[b.status]);

//     setPayments(uniquePayments);
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   const classOrder = (cls) => {
//     if (cls === "+1") return 11;
//     if (cls === "+2") return 12;
//     return parseInt(cls);
//   };

//   const classes = [...new Set(payments.map((p) => p.class))].sort(
//     (a, b) => classOrder(a) - classOrder(b),
//   );

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
//         month: p.month || s.month || "",
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

//   const cardStyle = {
//     backgroundColor: darkMode ? "#1e1b4b" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#4c1d95",
//     border: darkMode ? "1px solid #312e81" : "1px solid #ddd6fe",
//     transition: "0.3s ease",
//     borderRadius: "16px",
//   };

//   return (
//     <div
//       className="container-fluid p-0"
//       style={{ color: darkMode ? "#ffffff" : "#000000" }}
//     >
//       <h4 className="mb-4 fw-bold text-purple">💰 Payment Requests</h4>

//       {/* CLASS FILTER BOXES */}
//       <div className="row mb-4">
//         {classes.map((cls) => (
//           <div key={cls} className="col-6 col-md-3 mb-3">
//             <div
//               className="card text-center p-3 shadow-sm"
//               style={{
//                 ...cardStyle,
//                 cursor: "pointer",
//                 transform: selectedClass === cls ? "scale(1.05)" : "scale(1)",
//               }}
//               onClick={() => setSelectedClass(cls)}
//             >
//               <h6 className="fw-semibold">Class {cls}</h6>
//               <small>
//                 {payments.filter((p) => p.class === cls).length} requests
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedClass && (
//         <button
//           className="btn btn-outline-purple btn-sm mb-3"
//           onClick={() => setSelectedClass(null)}
//         >
//           ⬅ Back
//         </button>
//       )}

//       {/* TABLE */}
//       <div className="table-responsive">
//         <table
//           className={`table align-middle ${
//             darkMode ? "table-dark" : "table-bordered"
//           }`}
//         >
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Class</th>
//               <th>Paid</th>
//               <th>Remaining</th>
//               <th>Month</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredPayments.map((p, i) => (
//               <tr key={p.id}>
//                 <td>{i + 1}</td>
//                 <td>{p.studentName}</td>
//                 <td>{p.studentEmail}</td>
//                 <td>{p.class}</td>
//                 <td className="fw-bold text-purple">₹ {p.paidAmount || 0}</td>
//                 <td className="text-danger fw-bold">
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
//                       className="btn btn-sm btn-outline-danger"
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

//       {/* DELETE MODAL */}
//       {deleteTarget && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
//         >
//           <div
//             className="p-4 rounded shadow"
//             style={{
//               width: 350,
//               backgroundColor: darkMode ? "#1e1b4b" : "#ffffff",
//               color: darkMode ? "#ffffff" : "#000000",
//               borderRadius: "14px",
//               boxShadow: "0 20px 50px rgba(124,58,237,0.3)",
//             }}
//           >
//             <h6 className="fw-bold text-danger">Confirm Delete</h6>
//             <p>
//               Delete payment of <b>{deleteTarget.studentName}</b>?
//             </p>
//             <div className="d-flex justify-content-end gap-2">
//               <button
//                 className="btn btn-secondary btn-sm"
//                 onClick={() => setDeleteTarget(null)}
//               >
//                 Cancel
//               </button>
//               <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .approve-btn {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//           transition: 0.3s;
//         }

//         .approve-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//         }

//         .reject-btn {
//           background: linear-gradient(135deg,#ef4444,#dc2626);
//           color: white;
//           border: none;
//           transition: 0.3s;
//         }

//         .reject-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 15px rgba(0,0,0,0.2);
//         }

//         .btn-outline-purple {
//           border: 1px solid #7c3aed;
//           color: #7c3aed;
//         }

//         .btn-outline-purple:hover {
//           background: #7c3aed;
//           color: white;
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
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadPayments = async () => {
    setLoading(true);

    const snap = await getDocs(collection(db, "payments"));
    const raw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const map = {};
    for (let p of raw) {
      const email = p.studentEmail;
      if (!email) continue;

      if (!map[email]) map[email] = p;
      else {
        if (map[email].status !== "pending" && p.status === "pending")
          map[email] = p;
        else if (
          map[email].status === p.status &&
          p.createdAt?.seconds > map[email].createdAt?.seconds
        )
          map[email] = p;
      }
    }

    const order = { pending: 1, approved: 2, rejected: 3 };
    const uniquePayments = Object.values(map).sort(
      (a, b) => order[a.status] - order[b.status],
    );

    setPayments(uniquePayments);
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const classes = [...new Set(payments.map((p) => p.class))];

  const filteredPayments = selectedClass
    ? payments.filter((p) => p.class === selectedClass)
    : payments;

  const approvePayment = async (p) => {
    try {
      await updateDoc(doc(db, "payments", p.id), {
        status: "approved",
        approvedAt: Timestamp.now(),
      });

      const studentRef = doc(db, "students", p.studentEmail);
      const studentSnap = await getDoc(studentRef);

      if (!studentSnap.exists()) {
        alert("Student not found");
        return;
      }

      const s = studentSnap.data();
      const paidNow = Number(p.paidAmount || 0);
      const newPending = Math.max(Number(s.pendingFees || 0) - paidNow, 0);

      await updateDoc(studentRef, {
        paidFees: Number(s.paidFees || 0) + paidNow,
        pendingFees: newPending,
        feeStatus: newPending === 0 ? "Completed" : "Pending",
        updatedAt: Timestamp.now(),
      });

      alert("✅ Payment approved");
      loadPayments();
    } catch (e) {
      console.error(e);
      alert("❌ Approval failed");
    }
  };

  const rejectPayment = async (p) => {
    await updateDoc(doc(db, "payments", p.id), {
      status: "rejected",
      rejectedAt: Timestamp.now(),
    });
    loadPayments();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteDoc(doc(db, "payments", deleteTarget.id));
    setDeleteTarget(null);
    loadPayments();
  };

  if (loading)
    return <p style={{ color: darkMode ? "#fff" : "#000" }}>Loading...</p>;

  return (
    <div
      className="container-fluid p-0"
      style={{ color: darkMode ? "#ffffff" : "#000000" }}
    >
      <h4 className="mb-4 fw-bold text-purple">💰 Payment Requests</h4>

      {/* CLASS FILTER */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {classes.map((cls) => (
          <div
            key={cls}
            className={`class-box ${selectedClass === cls ? "active-box" : ""}`}
            onClick={() => setSelectedClass(cls)}
          >
            Class {cls}
            <small>
              {payments.filter((p) => p.class === cls).length} requests
            </small>
          </div>
        ))}
      </div>

      {selectedClass && (
        <button
          className="btn btn-outline-purple btn-sm mb-3"
          onClick={() => setSelectedClass(null)}
        >
          ⬅ Back
        </button>
      )}

      {/* TABLE */}
      <div className="table-responsive">
        <table
          className={`table ${darkMode ? "table-dark" : "table-bordered"}`}
        >
          <thead className="purple-head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Father</th>
              <th>Email</th>
              <th>Class</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.studentName}</td>
                <td>{p.fatherName || "—"}</td>
                <td>{p.studentEmail}</td>
                <td>{p.class}</td>
                <td className="purple-text fw-bold">₹ {p.paidAmount || 0}</td>
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
                  {p.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-sm approve-btn me-2"
                        onClick={() => approvePayment(p)}
                      >
                        ✔ Approve
                      </button>
                      <button
                        className="btn btn-sm reject-btn"
                        onClick={() => rejectPayment(p)}
                      >
                        ✖ Reject
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-sm delete-btn"
                      onClick={() => setDeleteTarget(p)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <h6 className="text-danger fw-bold">Confirm Delete</h6>
            <p>
              Delete payment of <b>{deleteTarget.studentName}</b>?
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn cancel-btn"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button className="btn delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .text-purple { color:#7c3aed !important; }

        .purple-head {
          background: linear-gradient(90deg,#4c1d95,#7c3aed);
          color:white;
        }

        .class-box {
          padding:12px 18px;
          border-radius:12px;
          cursor:pointer;
          background:${darkMode ? "#1e293b" : "#f3f4f6"};
          color:${darkMode ? "#fff" : "#111"};
          transition:0.3s;
        }

        .active-box,
        .class-box:hover {
          background:linear-gradient(135deg,#7c3aed,#4c1d95);
          color:white;
        }

        .approve-btn {
          background:linear-gradient(135deg,#7c3aed,#4c1d95);
          color:white;
          border:none;
        }

        .reject-btn {
          background:linear-gradient(135deg,#ef4444,#dc2626);
          color:white;
          border:none;
        }

        .delete-btn {
          background:#dc2626;
          color:white;
          border:none;
        }

        .btn-outline-purple {
          border:1px solid #7c3aed;
          color:#7c3aed;
        }

        .btn-outline-purple:hover {
          background:#7c3aed;
          color:white;
        }

        .delete-overlay {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .delete-modal {
          background:${darkMode ? "#0f172a" : "#ffffff"};
          color:${darkMode ? "#ffffff" : "#000000"};
          padding:30px;
          border-radius:16px;
          width:350px;
        }

        .cancel-btn {
          background:${darkMode ? "#334155" : "#e5e7eb"};
          color:${darkMode ? "#ffffff" : "#000000"};
          border:none;
        }
      `}</style>
    </div>
  );
}

export default PaymentRequests;
