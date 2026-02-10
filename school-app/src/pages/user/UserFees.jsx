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

        paidAmount: amount, // ✅ user paid now
        totalPending: student.pendingFees, // ✅ before payment
        remainingFees: remainingFees, // ✅ AFTER payment (🔥 FIX)

        month: student.month || null,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      setAlreadyRequested(true);

      if (remainingFees === 0) {
        setMsg("✅ Full payment submitted. Waiting for admin approval.");
      } else {
        setMsg(
          `✅ ₹${amount} payment submitted. Remaining ₹${remainingFees} (admin approval pending)`,
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

  return (
    <div className="card shadow-sm p-4">
      <h5 className="mb-3">💳 Fees & Payment</h5>

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
            className="form-control mb-3"
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

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}

export default UserFees;

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
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// function UserFees() {
//   const [student, setStudent] = useState(null);
//   const [slip, setSlip] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [alreadyRequested, setAlreadyRequested] = useState(false);

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     const load = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       // load student
//       const snap = await getDoc(doc(db, "students", user.email));
//       if (snap.exists()) {
//         setStudent(snap.data());

//         // check pending payment request
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

//   /* ================= SUBMIT PAYMENT ================= */
//   const submitPaymentProof = async () => {
//     if (!slip) {
//       setMsg("❌ Please upload payment slip or screenshot");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMsg("");

//       // 🔹 upload slip to Firebase Storage
//       const storage = getStorage();
//       const fileRef = ref(
//         storage,
//         `payment-slips/${auth.currentUser.email}_${Date.now()}`,
//       );

//       await uploadBytes(fileRef, slip);
//       const slipURL = await getDownloadURL(fileRef);

//       // 🔹 create payment request
//       await addDoc(collection(db, "payments"), {
//         studentEmail: auth.currentUser.email,
//         studentName: student.name,
//         class: student.class,
//         pendingAmount: student.pendingFees,
//         month: student.month || null,
//         slipURL,
//         status: "pending", // admin will approve
//         createdAt: Timestamp.now(),
//       });

//       setAlreadyRequested(true);
//       setMsg("✅ Payment proof submitted. Waiting for admin approval.");
//       setSlip(null);
//     } catch (error) {
//       setMsg("❌ Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card shadow-sm p-4">
//       <h5 className="mb-3">💳 Fees & Payment</h5>

//       {/* ===== SUMMARY ===== */}
//       <p>
//         <b>Total Fees:</b> ₹ {student.totalFees}
//       </p>
//       <p className="text-success">
//         <b>Paid:</b> ₹ {student.paidFees}
//       </p>
//       <p className="text-danger">
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

//       {/* ===== COMPLETED ===== */}
//       {student.feeStatus === "Completed" && (
//         <div className="alert alert-success mt-3 mb-0">
//           ✅ Fees approved by admin.
//         </div>
//       )}

//       {/* ===== PAYMENT SECTION ===== */}
//       {student.pendingFees > 0 && student.feeStatus !== "Completed" && (
//         <>
//           {/* 🔥 QR / SCANNER */}
//           <div className="text-center my-3">
//             <img
//               src="/scanner.png"
//               alt="scanner"
//               className="img-fluid"
//               style={{ maxWidth: 220 }}
//             />
//             <p className="text-muted mt-2 mb-0">
//               Scan & pay, then upload payment proof
//             </p>
//           </div>

//           {/* 🔥 PAYMENT SLIP UPLOAD */}
//           <input
//             type="file"
//             className="form-control mb-3"
//             accept="image/*,.pdf"
//             onChange={(e) => setSlip(e.target.files[0])}
//             disabled={alreadyRequested}
//           />

//           {/* 🔥 SUBMIT BUTTON */}
//           <button
//             className="btn btn-success w-100"
//             disabled={loading || alreadyRequested}
//             onClick={submitPaymentProof}
//           >
//             {alreadyRequested
//               ? "⏳ Waiting for Admin Approval"
//               : loading
//                 ? "Submitting..."
//                 : "Submit Payment Proof"}
//           </button>
//         </>
//       )}

//       {/* ===== MESSAGE ===== */}
//       {msg && <div className="alert alert-info mt-3">{msg}</div>}
//     </div>
//   );
// }

// export default UserFees;
