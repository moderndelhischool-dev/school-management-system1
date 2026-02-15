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

//   /* ================= LOAD PAYMENTS ================= */
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

//   /* ================= CLASS FILTER ================= */
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

//   /* ================= APPROVE ================= */
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

//   /* ================= DARK MODE STYLES ================= */
//   const cardStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#111827",
//     border: darkMode ? "1px solid #1e293b" : "1px solid #dee2e6",
//     transition: "0.3s ease",
//   };

//   return (
//     <div
//       className="container-fluid p-0"
//       style={{ color: darkMode ? "#ffffff" : "#000000" }}
//     >
//       <h4 className="mb-3">💰 Payment Requests</h4>

//       {/* CLASS BOXES */}
//       {/* CLASS BOXES */}
//       <div className="row mb-4">
//         {classes.map((cls) => (
//           <div key={cls} className="col-6 col-md-3 mb-3">
//             <div
//               className={`card text-center p-3 shadow-sm ${
//                 selectedClass === cls ? "border-primary" : ""
//               }`}
//               style={{
//                 ...cardStyle,
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 transform: selectedClass === cls ? "scale(1.03)" : "scale(1)",
//               }}
//               onClick={() => setSelectedClass(cls)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-6px)";
//                 e.currentTarget.style.boxShadow = darkMode
//                   ? "0 12px 30px rgba(59,130,246,0.6)"
//                   : "0 10px 25px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform =
//                   selectedClass === cls ? "scale(1.03)" : "scale(1)";
//                 e.currentTarget.style.boxShadow = darkMode
//                   ? "0 5px 20px rgba(0,0,0,0.6)"
//                   : "0 5px 15px rgba(0,0,0,0.08)";
//               }}
//             >
//               <h6>Class {cls}</h6>
//               <small>
//                 {payments.filter((p) => p.class === cls).length} requests
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedClass && (
//         <button
//           className="btn btn-secondary btn-sm mb-3"
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
//                 <td className="text-success fw-semibold">
//                   ₹ {p.paidAmount || 0}
//                 </td>
//                 <td className="text-danger fw-semibold">
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
//                         className="btn btn-success btn-sm me-2"
//                         onClick={() => approvePayment(p)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => rejectPayment(p)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       className="btn btn-outline-danger btn-sm"
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
//               backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//               color: darkMode ? "#ffffff" : "#000000",
//             }}
//           >
//             <h6 className="text-danger">Confirm Delete</h6>
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

  /* ================= LOAD PAYMENTS ================= */

  const loadPayments = async () => {
    setLoading(true);

    const snap = await getDocs(collection(db, "payments"));
    const raw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const map = {};
    for (let p of raw) {
      const email = p.studentEmail;
      if (!email) continue;

      if (!map[email]) {
        map[email] = p;
      } else {
        if (map[email].status !== "pending" && p.status === "pending") {
          map[email] = p;
        } else if (map[email].status === p.status) {
          if (p.createdAt?.seconds > map[email].createdAt?.seconds) {
            map[email] = p;
          }
        }
      }
    }

    let uniquePayments = Object.values(map);
    const order = { pending: 1, approved: 2, rejected: 3 };
    uniquePayments.sort((a, b) => order[a.status] - order[b.status]);

    setPayments(uniquePayments);
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  /* ================= CLASS FILTER ================= */

  const classOrder = (cls) => {
    if (cls === "+1") return 11;
    if (cls === "+2") return 12;
    return parseInt(cls);
  };

  const classes = [...new Set(payments.map((p) => p.class))].sort(
    (a, b) => classOrder(a) - classOrder(b),
  );

  const filteredPayments = selectedClass
    ? payments.filter((p) => p.class === selectedClass)
    : payments;

  /* ================= APPROVE ================= */

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
        month: p.month || s.month || "",
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

  /* ================= STYLES ================= */

  const cardStyle = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    border: darkMode ? "1px solid #1e293b" : "1px solid #dee2e6",
    transition: "0.3s ease",
    borderRadius: "16px",
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ color: darkMode ? "#ffffff" : "#000000" }}
    >
      <h4 className="mb-4 fw-bold">💰 Payment Requests</h4>

      {/* CLASS FILTER BOXES */}

      <div className="row mb-4">
        {classes.map((cls) => (
          <div key={cls} className="col-6 col-md-3 mb-3">
            <div
              className={`card text-center p-3 shadow-sm ${
                selectedClass === cls ? "border-success" : ""
              }`}
              style={{
                ...cardStyle,
                cursor: "pointer",
                transform: selectedClass === cls ? "scale(1.05)" : "scale(1)",
              }}
              onClick={() => setSelectedClass(cls)}
            >
              <h6 className="fw-semibold">Class {cls}</h6>
              <small>
                {payments.filter((p) => p.class === cls).length} requests
              </small>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <button
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => setSelectedClass(null)}
        >
          ⬅ Back
        </button>
      )}

      {/* TABLE */}

      <div className="table-responsive">
        <table
          className={`table align-middle ${
            darkMode ? "table-dark" : "table-bordered"
          }`}
        >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Month</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.studentName}</td>
                <td>{p.studentEmail}</td>
                <td>{p.class}</td>
                <td className="text-success fw-bold">₹ {p.paidAmount || 0}</td>
                <td className="text-danger fw-bold">
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
                      className="btn btn-sm btn-outline-danger"
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
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
        >
          <div
            className="p-4 rounded shadow"
            style={{
              width: 350,
              backgroundColor: darkMode ? "#0f172a" : "#ffffff",
              color: darkMode ? "#ffffff" : "#000000",
              borderRadius: "14px",
            }}
          >
            <h6 className="text-danger fw-bold">Confirm Delete</h6>
            <p>
              Delete payment of <b>{deleteTarget.studentName}</b>?
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM STYLES */}

      <style>{`
        .approve-btn {
          background: linear-gradient(135deg,#22c55e,#16a34a);
          color: white;
          border: none;
          transition: 0.3s;
        }

        .approve-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .reject-btn {
          background: linear-gradient(135deg,#ef4444,#dc2626);
          color: white;
          border: none;
          transition: 0.3s;
        }

        .reject-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export default PaymentRequests;
