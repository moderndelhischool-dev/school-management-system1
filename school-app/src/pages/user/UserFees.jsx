// import { useEffect, useState } from "react";
// import { auth, db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

// function UserFees() {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDoc(doc(db, "students", user.email));
//       if (snap.exists()) {
//         setStudent(snap.data());
//       }
//     };

//     load();
//   }, []);

//   if (!student) return null;

//   return (
//     <div className="card shadow-sm p-3 p-md-4">
//       <h5 className="mb-3">💳 Fees & Payment</h5>

//       {/* ===== SUMMARY ===== */}
//       <div className="row g-3 mb-3">
//         <div className="col-12 col-md-4">
//           <div className="border rounded p-3 h-100">
//             <small className="text-muted">Total Fees</small>
//             <h6 className="fw-semibold mb-0">₹ {student.totalFees}</h6>
//           </div>
//         </div>

//         <div className="col-12 col-md-4">
//           <div className="border rounded p-3 h-100">
//             <small className="text-muted">Paid Fees</small>
//             <h6 className="fw-semibold text-success mb-0">
//               ₹ {student.paidFees}
//             </h6>
//           </div>
//         </div>

//         <div className="col-12 col-md-4">
//           <div className="border rounded p-3 h-100">
//             <small className="text-muted">Pending Fees</small>
//             <h6
//               className={
//                 student.pendingFees > 0
//                   ? "fw-semibold text-danger"
//                   : "fw-semibold text-success"
//               }
//             >
//               ₹ {student.pendingFees}
//             </h6>
//           </div>
//         </div>
//       </div>

//       {/* ===== STATUS + MONTH ===== */}
//       <div className="mb-3">
//         <p className="mb-1">
//           <b>Status:</b>{" "}
//           <span
//             className={
//               student.feeStatus === "Completed"
//                 ? "text-success fw-semibold"
//                 : "text-danger fw-semibold"
//             }
//           >
//             {student.feeStatus}
//           </span>
//         </p>

//         {student.month && (
//           <p className="text-muted mb-0">
//             <b>Fees Month:</b> {student.month}
//           </p>
//         )}
//       </div>

//       {/* ===== ACTION ===== */}
//       {student.pendingFees > 0 ? (
//         <button className="btn btn-success">💳 Pay Online (Coming Soon)</button>
//       ) : (
//         <p className="text-success fw-semibold mb-0">
//           ✅ All fees are paid. Thank you!
//         </p>
//       )}
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

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "students", user.email));
      if (snap.exists()) {
        setStudent(snap.data());

        // 🔹 check pending request
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

    try {
      setLoading(true);
      setMsg("");

      await addDoc(collection(db, "payments"), {
        studentEmail: auth.currentUser.email,
        studentName: student.name,
        class: student.class,
        paidAmount: amount,
        totalPending: student.pendingFees,
        month: student.month || null,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      setAlreadyRequested(true);

      if (amount === student.pendingFees) {
        setMsg("✅ Full payment submitted. Waiting for admin approval.");
      } else {
        setMsg(
          `✅ ₹${amount} payment submitted. Remaining ₹${
            student.pendingFees - amount
          } (admin approval pending)`,
        );
      }

      setPayAmount("");
    } catch (err) {
      setMsg("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h5 className="mb-3">💳 Fees & Payment</h5>

      {/* ===== SUMMARY ===== */}
      <p>
        <b>Total Fees:</b> ₹ {student.totalFees}
      </p>

      <p className="text-success">
        <b>Paid:</b> ₹ {student.paidFees}
      </p>

      <p className={student.pendingFees > 0 ? "text-danger" : "text-success"}>
        <b>Pending:</b> ₹ {student.pendingFees}
      </p>

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

      {/* ===== COMPLETED ===== */}
      {student.feeStatus === "Completed" && (
        <div className="alert alert-success mt-3 mb-0">
          ✅ Fees already approved by admin.
        </div>
      )}

      {/* ===== PAYMENT SECTION ===== */}
      {student.pendingFees > 0 && student.feeStatus !== "Completed" && (
        <>
          {/* 🔥 SCANNER */}
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

          {/* AMOUNT INPUT */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter amount you paid"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            disabled={alreadyRequested}
          />

          {/* BUTTON */}
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

      {/* MESSAGE */}
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}

export default UserFees;
