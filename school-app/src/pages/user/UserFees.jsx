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
import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

function UserFees({ student, darkMode }) {
  const [payAmount, setPayAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  useEffect(() => {
    const checkExistingPayment = async () => {
      if (!student?.email) return;

      const paymentRef = doc(db, "payments", student.email);
      const snap = await getDoc(paymentRef);

      if (snap.exists() && snap.data().status === "pending") {
        setAlreadyRequested(true);
      } else {
        setAlreadyRequested(false);
      }
    };

    checkExistingPayment();
  }, [student]);

  if (!student) return null;

  const progress =
    student.totalFees > 0
      ? Math.round((student.paidFees / student.totalFees) * 100)
      : 0;

  const requestPaymentApproval = async () => {
    const amount = Number(payAmount);

    if (!amount || amount <= 0) {
      setMsg("❌ Please enter valid amount");
      return;
    }

    if (amount > student.pendingFees) {
      setMsg("❌ Amount cannot be greater than pending fees");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      // 🔥 IMPORTANT: email as document ID
      await setDoc(doc(db, "payments", student.email), {
        studentEmail: student.email,
        studentName: student.name,
        fatherName: student.fatherName || "",
        class: student.class,
        paidAmount: amount,
        totalPending: student.pendingFees,
        remainingFees: student.pendingFees - amount,
        month: student.month || null,
        status: "pending",
        updatedAt: Timestamp.now(),
      });

      setAlreadyRequested(true);
      setMsg("✅ Payment submitted. Waiting for admin approval.");
      setPayAmount("");
    } catch (err) {
      console.error(err);
      setMsg("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fees-card ${darkMode ? "dark" : "light"}`}>
      <h4 className="title">💳 Fees & Payment</h4>

      {/* SUMMARY */}
      <div className="summary-box">
        <div>
          Total Fees <strong>₹ {student.totalFees}</strong>
        </div>
        <div>
          Paid <strong className="green">₹ {student.paidFees}</strong>
        </div>
        <div>
          Pending <strong className="red">₹ {student.pendingFees}</strong>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="progress-wrapper">
        <div className="progress-bg">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <small>{progress}% Paid</small>
      </div>

      <p>
        <b>Status:</b>{" "}
        <span className={student.feeStatus === "Completed" ? "green" : "red"}>
          {student.feeStatus}
        </span>
      </p>

      {student.month && (
        <p className="muted">
          <b>Fees Month:</b> {student.month}
        </p>
      )}

      {/* PAYMENT SECTION */}
      {student.pendingFees > 0 && student.feeStatus !== "Completed" && (
        <>
          <div className="scanner-section">
            <img src="/scanner.png" alt="scanner" />
            <p className="muted">Scan & pay then enter amount</p>
          </div>

          <input
            type="number"
            placeholder="Enter paid amount"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            disabled={alreadyRequested}
          />

          <button
            onClick={requestPaymentApproval}
            disabled={loading || alreadyRequested}
          >
            {alreadyRequested
              ? "⏳ Waiting for Approval"
              : loading
                ? "Submitting..."
                : "I Have Paid"}
          </button>
        </>
      )}

      {msg && <div className="alert-box">{msg}</div>}

      <style>{`
      .fees-card {
        padding: 25px;
        border-radius: 16px;
        transition: 0.3s;
      }

      .fees-card.light {
        background: #ffffff;
        box-shadow: 0 15px 40px rgba(15,76,108,0.15);
      }

      .fees-card.dark {
        background: #0F172A;
        color: #E2E8F0;
        box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      }

      .title {
        font-weight: 700;
        color: #0F4C6C;
        margin-bottom: 20px;
      }

      .dark .title {
        color: #D4A24C;
      }

      .summary-box {
        background: linear-gradient(135deg,#E6EEF4,#F4F6F8);
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 15px;
      }

      .dark .summary-box {
        background: #1E293B;
      }

      .green { color: #16A34A; font-weight: 600; }
      .red { color: #DC2626; font-weight: 600; }

      .progress-wrapper { margin: 15px 0; }

      .progress-bg {
        height: 8px;
        background: #ddd;
        border-radius: 10px;
        overflow: hidden;
      }

      .dark .progress-bg { background: #334155; }

      .progress-fill {
        height: 8px;
        background: linear-gradient(90deg,#0F4C6C,#D4A24C);
      }

      .scanner-section {
        text-align: center;
        margin: 20px 0;
      }

      .scanner-section img {
        max-width: 200px;
      }

      input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
      }

      .dark input {
        background: #1E293B;
        color: white;
        border: 1px solid #334155;
      }

      input:focus {
        border-color: #D4A24C;
        box-shadow: 0 0 10px rgba(212,162,76,0.4);
        outline: none;
      }

      button {
        width: 100%;
        padding: 10px;
        border-radius: 30px;
        border: none;
        background: linear-gradient(135deg,#0F4C6C,#1B5E84);
        color: white;
        font-weight: 600;
        transition: 0.3s;
      }

      button:hover {
        background: #D4A24C;
        color: #0F172A;
      }

      .alert-box {
        margin-top: 15px;
        padding: 10px;
        border-radius: 8px;
        background: #e0f2fe;
      }

      .dark .alert-box {
        background: #1E293B;
      }

      .muted {
        color: ${darkMode ? "#94A3B8" : "#4B5563"};
      }
      `}</style>
    </div>
  );
}

export default UserFees;
