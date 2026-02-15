// import { useEffect, useState } from "react";
// import { auth, db } from "../../firebase/firebase";
// import {
//   doc,
//   getDoc,
//   addDoc,
//   collection,
//   Timestamp,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";

// function UserFees() {
//   const [student, setStudent] = useState(null);
//   const [payAmount, setPayAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [alreadyRequested, setAlreadyRequested] = useState(false);

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     const load = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDoc(doc(db, "students", user.email));
//       if (snap.exists()) {
//         setStudent(snap.data());

//         const q = query(
//           collection(db, "payments"),
//           where("studentEmail", "==", user.email),
//           where("status", "==", "pending"),
//         );

//         const reqSnap = await getDocs(q);
//         if (!reqSnap.empty) setAlreadyRequested(true);
//       }
//     };

//     load();
//   }, []);

//   if (!student) return null;

//   /* ================= REQUEST PAYMENT ================= */
//   const requestPaymentApproval = async () => {
//     const amount = Number(payAmount);

//     if (!amount || amount <= 0) {
//       setMsg("❌ Please enter a valid amount");
//       return;
//     }

//     if (amount > student.pendingFees) {
//       setMsg("❌ Amount cannot be greater than pending fees");
//       return;
//     }

//     const remainingFees = student.pendingFees - amount;

//     try {
//       setLoading(true);
//       setMsg("");

//       await addDoc(collection(db, "payments"), {
//         studentEmail: auth.currentUser.email,
//         studentName: student.name,
//         class: student.class,

//         paidAmount: amount, // ✅ user paid now
//         totalPending: student.pendingFees, // ✅ before payment
//         remainingFees: remainingFees, // ✅ AFTER payment (🔥 FIX)

//         month: student.month || null,
//         status: "pending",
//         createdAt: Timestamp.now(),
//       });

//       setAlreadyRequested(true);

//       if (remainingFees === 0) {
//         setMsg("✅ Full payment submitted. Waiting for admin approval.");
//       } else {
//         setMsg(
//           `✅ ₹${amount} payment submitted. Remaining ₹${remainingFees} (admin approval pending)`,
//         );
//       }

//       setPayAmount("");
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card shadow-sm p-4">
//       <h5 className="mb-3">💳 Fees & Payment</h5>

//       <p>
//         <b>Total Fees:</b> ₹ {student.totalFees}
//       </p>
//       <p className="text-success">
//         <b>Paid:</b> ₹ {student.paidFees}
//       </p>
//       <p className={student.pendingFees > 0 ? "text-danger" : "text-success"}>
//         <b>Pending:</b> ₹ {student.pendingFees}
//       </p>

//       <p>
//         <b>Status:</b>{" "}
//         <span
//           className={
//             student.feeStatus === "Completed"
//               ? "text-success fw-semibold"
//               : "text-danger fw-semibold"
//           }
//         >
//           {student.feeStatus}
//         </span>
//       </p>

//       {student.month && (
//         <p className="text-muted">
//           <b>Fees Month:</b> {student.month}
//         </p>
//       )}

//       {student.feeStatus === "Completed" && (
//         <div className="alert alert-success mt-3 mb-0">
//           ✅ Fees already approved by admin.
//         </div>
//       )}

//       {student.pendingFees > 0 && student.feeStatus !== "Completed" && (
//         <>
//           <div className="text-center my-3">
//             <img
//               src="/scanner.png"
//               alt="scanner"
//               className="img-fluid"
//               style={{ maxWidth: 220 }}
//             />
//             <p className="text-muted mt-2 mb-0">
//               Scan & pay, then enter paid amount
//             </p>
//           </div>

//           <input
//             type="number"
//             className="form-control mb-3"
//             placeholder="Enter amount you paid"
//             value={payAmount}
//             onChange={(e) => setPayAmount(e.target.value)}
//             disabled={alreadyRequested}
//           />

//           <button
//             className="btn btn-success w-100"
//             disabled={loading || alreadyRequested}
//             onClick={requestPaymentApproval}
//           >
//             {alreadyRequested
//               ? "⏳ Waiting for Admin Approval"
//               : loading
//                 ? "Submitting..."
//                 : "I have paid"}
//           </button>
//         </>
//       )}

//       {msg && <div className="alert alert-info mt-3">{msg}</div>}
//     </div>
//   );
// }

// export default UserFees;
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function UserFees() {
  const [student, setStudent] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);

    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "students", user.email));
      if (snap.exists()) {
        setStudent(snap.data());

        const q = query(
          collection(db, "payments"),
          where("studentEmail", "==", user.email),
          where("status", "==", "pending"),
        );

        const reqSnap = await getDocs(q);
        if (!reqSnap.empty) setAlreadyRequested(true);
      }
    };

    load();
  }, []);

  if (!student) return null;

  /* ================= REQUEST PAYMENT ================= */
  const requestPaymentApproval = async () => {
    const amount = Number(payAmount);

    if (!amount || amount <= 0) {
      setMsg("❌ Please enter a valid amount");
      return;
    }

    if (amount > student.pendingFees) {
      setMsg("❌ Amount cannot be greater than pending fees");
      return;
    }

    const remainingFees = student.pendingFees - amount;

    try {
      setLoading(true);
      setMsg("");

      await addDoc(collection(db, "payments"), {
        studentEmail: auth.currentUser.email,
        studentName: student.name,
        class: student.class,
        paidAmount: amount,
        totalPending: student.pendingFees,
        remainingFees: remainingFees,
        month: student.month || null,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      setAlreadyRequested(true);

      if (remainingFees === 0) {
        setMsg("✅ Full payment submitted. Waiting for admin approval.");
      } else {
        setMsg(
          `✅ ₹${amount} submitted. Remaining ₹${remainingFees}. Waiting for approval.`,
        );
      }

      setPayAmount("");
    } catch (err) {
      console.error(err);
      setMsg("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress =
    student.totalFees > 0
      ? Math.round((student.paidFees / student.totalFees) * 100)
      : 0;

  return (
    <div
      className={`card shadow-sm p-4 fees-card ${
        darkMode ? "bg-dark text-light border-secondary" : ""
      }`}
    >
      <h5 className="mb-4 fw-bold">💳 Fees & Payment</h5>

      {/* SUMMARY BOX */}
      <div className="summary-box mb-4 p-3 rounded">
        <div className="d-flex justify-content-between mb-2">
          <span>Total Fees</span>
          <strong>₹ {student.totalFees}</strong>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span>Paid</span>
          <strong className="text-success">₹ {student.paidFees}</strong>
        </div>

        <div className="d-flex justify-content-between">
          <span>Pending</span>
          <strong
            className={student.pendingFees > 0 ? "text-danger" : "text-success"}
          >
            ₹ {student.pendingFees}
          </strong>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="mb-3">
        <div className="progress" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <small className="text-muted">{progress}% Paid</small>
      </div>

      <p>
        <b>Status:</b>{" "}
        <span
          className={
            student.feeStatus === "Completed"
              ? "text-success fw-semibold"
              : "text-danger fw-semibold"
          }
        >
          {student.feeStatus}
        </span>
      </p>

      {student.month && (
        <p className="text-muted">
          <b>Fees Month:</b> {student.month}
        </p>
      )}

      {student.feeStatus === "Completed" && (
        <div className="alert alert-success mt-3 mb-0">
          ✅ Fees already approved by admin.
        </div>
      )}

      {student.pendingFees > 0 && student.feeStatus !== "Completed" && (
        <>
          <div className="text-center my-3">
            <img
              src="/scanner.png"
              alt="scanner"
              className="img-fluid"
              style={{ maxWidth: 220 }}
            />
            <p className="text-muted mt-2 mb-0">
              Scan & pay, then enter paid amount
            </p>
          </div>

          <input
            type="number"
            className="form-control mb-3 custom-input"
            placeholder="Enter amount you paid"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            disabled={alreadyRequested}
          />

          <button
            className="btn btn-success w-100"
            disabled={loading || alreadyRequested}
            onClick={requestPaymentApproval}
          >
            {alreadyRequested
              ? "⏳ Waiting for Admin Approval"
              : loading
                ? "Submitting..."
                : "I have paid"}
          </button>
        </>
      )}

      {msg && (
        <div
          className={`alert mt-3 ${
            msg.includes("❌") ? "alert-danger" : "alert-info"
          }`}
        >
          {msg}
        </div>
      )}

      {/* CUSTOM STYLE */}
      <style>{`
        .fees-card {
          border-radius: 18px;
          transition: 0.3s ease;
        }

        .fees-card:hover {
          box-shadow: 0 12px 35px rgba(0,0,0,0.1);
        }

        .summary-box {
          background: linear-gradient(135deg,#ecfdf5,#d1fae5);
          font-weight: 500;
        }

        body.dark-mode .summary-box {
          background: linear-gradient(135deg,#1e293b,#0f172a);
        }

        .custom-input:focus {
          border-color: #16a34a !important;
          box-shadow: 0 0 8px rgba(34,197,94,0.4);
        }
      `}</style>
    </div>
  );
}

export default UserFees;
