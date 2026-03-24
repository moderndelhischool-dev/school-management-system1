// import { useState } from "react";
// import { db } from "../../firebase/firebase"; // Storage import hata diya
// import { doc, setDoc, Timestamp } from "firebase/firestore";

// function UserFees({ student, darkMode }) {
//   const [payAmount, setPayAmount] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [paymentSuccessData, setPaymentSuccessData] = useState(null);

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       document.body.appendChild(script);
//     });
//   };

//   const handleOnlinePayment = async () => {
//     const amount = Number(payAmount);
//     if (!amount || amount <= 0) {
//       setMsg("❌ Enter valid amount");
//       return;
//     }

//     setLoading(true);
//     await loadRazorpay();

//     const options = {
//       key: "rzp_test_SUzzQGk1TXuGhi",
//       amount: amount * 100,
//       currency: "INR",
//       name: "School Fees Online",
//       description: `Payment for ${student.name}`,
//       handler: (response) => {
//         setPaymentSuccessData({
//           amount: amount,
//           id: response.razorpay_payment_id,
//         });
//         setMsg("✅ Payment Authorized! Now upload the screenshot below.");
//         setLoading(false);
//       },
//       prefill: { name: student.name, email: student.email },
//       theme: { color: "#0F4C6C" },
//       modal: { ondismiss: () => setLoading(false) },
//     };
//     new window.Razorpay(options).open();
//   };

//   const handleFinalSubmission = async () => {
//     if (!file) {
//       setMsg("❌ Please upload the payment screenshot");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMsg("⏳ Generating Receipt Link...");

//       // --- 1. Cloudinary Upload Logic ---
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "school_slips"); // 👈 Apna preset name yahan check karlo

//       const cloudRes = await fetch(
//         "https://api.cloudinary.com/v1_1/decwyq6sn/image/upload", // 👈 Aapka Cloud Name
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       const cloudData = await cloudRes.json();

//       if (!cloudData.secure_url) {
//         throw new Error("Upload failed");
//       }

//       const downloadURL = cloudData.secure_url; // 🔥 Public URL mil gaya!

//       // --- 2. Save to Firestore 'payments' collection ---
//       const finalID = paymentSuccessData.id;
//       await setDoc(doc(db, "payments", finalID), {
//         studentEmail: student.email,
//         studentName: student.name,
//         paidAmount: paymentSuccessData.amount,
//         slipUrl: downloadURL, // ✅ Cloudinary Link save ho raha hai
//         status: "pending",
//         mode: "Online (Razorpay)",
//         paymentId: finalID,
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         month: new Date().toLocaleString("default", {
//           month: "long",
//           year: "numeric",
//         }),
//       });

//       setMsg("🎉 Request Submitted! Wait for Admin Approval.");
//       setPayAmount("");
//       setFile(null);
//       setPaymentSuccessData(null);

//       setTimeout(() => window.location.reload(), 3000);
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Submission failed. Check Cloudinary settings.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!student) return null;

//   return (
//     <div className={`payment-container ${darkMode ? "dark" : "light"}`}>
//       <div className="payment-wrapper shadow-lg">
//         {!paymentSuccessData ? (
//           <div className="payment-step animate-in">
//             <h4 className="fw-bold mb-4 text-center">💳 Online Fees Payment</h4>
//             <div className="balance-badge mb-4">
//               <span>Current Balance:</span>
//               <strong className="text-danger">₹{student.pendingFees}</strong>
//             </div>

//             <div className="input-wrapper mb-3">
//               <label className="small text-muted mb-1">
//                 Enter Amount to Pay
//               </label>
//               <div className="position-relative">
//                 <input
//                   type="number"
//                   placeholder="0.00"
//                   value={payAmount}
//                   onChange={(e) => setPayAmount(e.target.value)}
//                   className="form-control main-input shadow-none"
//                 />
//                 <span className="currency-label">₹</span>
//               </div>
//             </div>

//             <button
//               className="pay-btn"
//               onClick={handleOnlinePayment}
//               disabled={loading}
//             >
//               {loading ? "Please wait..." : "Pay via Razorpay"}
//             </button>
//           </div>
//         ) : (
//           <div className="upload-step animate-in text-center">
//             <div className="success-icon mb-2">✔️</div>
//             <h4 className="fw-bold text-success mb-2">Payment Authorized</h4>
//             <p className="small text-muted mb-4">
//               Trans ID: {paymentSuccessData.id}
//             </p>

//             <div className="upload-box p-4 rounded-4 border-2 border-dashed">
//               <label className="fw-bold d-block mb-3">
//                 Upload Payment Screenshot
//               </label>
//               <input
//                 type="file"
//                 className="form-control mb-3"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 accept="image/*"
//               />
//               <button
//                 className="submit-btn"
//                 onClick={handleFinalSubmission}
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : "Submit for Verification"}
//               </button>
//             </div>
//           </div>
//         )}

//         {msg && (
//           <div
//             className={`msg-toast mt-4 ${msg.includes("❌") ? "error" : "success"}`}
//           >
//             {msg}
//           </div>
//         )}
//       </div>

//       <style>{`
//         .payment-container { display: flex; justify-content: center; padding: 20px; }
//         .payment-wrapper {
//           background: ${darkMode ? "#1e293b" : "#fff"}; color: ${darkMode ? "#f1f5f9" : "#1e293b"};
//           width: 100%; max-width: 450px; padding: 35px; border-radius: 24px; border: 1px solid ${darkMode ? "#334155" : "#eee"};
//         }
//         .balance-badge { display: flex; justify-content: space-between; padding: 12px 18px; background: ${darkMode ? "#0f172a" : "#f8fafc"}; border-radius: 12px; }
//         .input-wrapper .main-input { padding: 12px 12px 12px 35px; border-radius: 10px; font-weight: 700; border: 1px solid #ddd; }
//         .currency-label { position: absolute; left: 12px; top: 10px; font-weight: 700; color: #0F4C6C; font-size: 1.1rem; }
//         .pay-btn { width: 100%; padding: 14px; border-radius: 10px; border: none; background: #0F4C6C; color: #D4A24C; font-weight: 800; }
//         .success-icon { font-size: 40px; color: #22c55e; }
//         .upload-box { background: ${darkMode ? "#0f172a" : "#f9fafb"}; border: 2px dashed #D4A24C; }
//         .submit-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; background: #D4A24C; color: #0F4C6C; font-weight: 700; }
//         .msg-toast { padding: 10px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 13px; }
//         .success { background: #dcfce7; color: #166534; }
//         .error { background: #fee2e2; color: #991b1b; }
//         .animate-in { animation: fadeIn 0.4s ease-out; }
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>
//     </div>
//   );
// }

// export default UserFees;
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function UserFees({ student, darkMode }) {
  const [payAmount, setPayAmount] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    const amount = Number(payAmount);
    const pending = Number(student.pendingFees);

    // --- Validation Logic ---
    if (!amount || amount <= 0) {
      setMsg("❌ Please enter a valid amount.");
      return;
    }
    if (amount > pending) {
      setMsg(`❌ You cannot pay more than ₹${pending}.`);
      return;
    }

    setLoading(true);
    await loadRazorpay();

    const options = {
      key: "rzp_test_SUzzQGk1TXuGhi",
      amount: amount * 100,
      currency: "INR",
      name: "School Fees Online",
      description: `Payment for ${student.name} (${student.rollNo})`,
      handler: (response) => {
        setPaymentSuccessData({
          amount: amount,
          id: response.razorpay_payment_id,
        });
        setMsg("✅ Payment Authorized! Now upload the screenshot below.");
        setLoading(false);
      },
      prefill: {
        name: student.name,
        email: student.email,
        contact: student.phone || "",
      },
      theme: { color: "#0F4C6C" },
      modal: { ondismiss: () => setLoading(false) },
    };
    new window.Razorpay(options).open();
  };

  const handleFinalSubmission = async () => {
    if (!file) {
      setMsg("❌ Please upload the payment screenshot");
      return;
    }

    try {
      setLoading(true);
      setMsg("⏳ Uploading Proof...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "school_slips");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/decwyq6sn/image/upload",
        { method: "POST", body: formData },
      );

      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error("Upload failed");

      const downloadURL = cloudData.secure_url;

      const finalID = paymentSuccessData.id;
      await setDoc(doc(db, "payments", finalID), {
        studentEmail: student.email,
        studentName: student.name,
        rollNo: student.rollNo, // Extra Detail
        class: student.class, // Extra Detail
        paidAmount: paymentSuccessData.amount,
        slipUrl: downloadURL,
        status: "pending",
        mode: "Online (Razorpay)",
        paymentId: finalID,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        month: new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
      });

      setMsg("🎉 Request Submitted! Wait for Admin Approval.");
      setPayAmount("");
      setFile(null);
      setPaymentSuccessData(null);
      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      console.error(err);
      setMsg("❌ Submission failed. Check Cloudinary settings.");
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <div className={`payment-container ${darkMode ? "dark" : "light"}`}>
      <div className="payment-wrapper shadow-lg">
        {!paymentSuccessData ? (
          <div className="payment-step animate-in">
            <h4 className="fw-bold mb-4 text-center">💳 Online Fees Payment</h4>

            {/* --- Extra Student Details Section --- */}
            <div className="student-info-card mb-4">
              <div className="info-row">
                <span>Student Name:</span>
                <strong>{student.name}</strong>
              </div>
              <div className="info-row">
                <span>Roll No:</span>
                <strong>{student.rollNo}</strong>
              </div>
              <div className="info-row">
                <span>Class:</span>
                <strong>{student.class}</strong>
              </div>
              <div className="info-row highlight">
                <span>Pending Balance:</span>
                <strong className="text-danger">₹{student.pendingFees}</strong>
              </div>
            </div>

            <div className="input-wrapper mb-3">
              <label className="small text-muted mb-1">
                Enter Amount to Pay
              </label>
              <div className="position-relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="form-control main-input shadow-none"
                />
                <span className="currency-label">₹</span>
              </div>
            </div>

            <button
              className="pay-btn"
              onClick={handleOnlinePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${payAmount || "0"}`}
            </button>
          </div>
        ) : (
          <div className="upload-step animate-in text-center">
            {/* ... (Upload screen same rahega) ... */}
            <div className="success-icon mb-2">✔️</div>
            <h4 className="fw-bold text-success mb-2">Payment Authorized</h4>
            <p className="small text-muted mb-4">
              Trans ID: {paymentSuccessData.id}
            </p>

            <div className="upload-box p-4 rounded-4 border-2 border-dashed">
              <label className="fw-bold d-block mb-3">
                Upload Payment Screenshot
              </label>
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
              <button
                className="submit-btn"
                onClick={handleFinalSubmission}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit for Verification"}
              </button>
            </div>
          </div>
        )}

        {msg && (
          <div
            className={`msg-toast mt-4 ${msg.includes("❌") ? "error" : "success"}`}
          >
            {msg}
          </div>
        )}
      </div>

      <style>{`
        /* ... aapka purana CSS ... */
        .student-info-card { 
          background: ${darkMode ? "#0f172a" : "#f8fafc"}; 
          padding: 15px; 
          border-radius: 12px; 
          border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
        }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; }
        .info-row.highlight { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc; font-size: 1rem; }
        
        /* Baaki Purana CSS yahan add kar lein */
        .payment-container { display: flex; justify-content: center; padding: 20px; }
        .payment-wrapper { background: ${darkMode ? "#1e293b" : "#fff"}; color: ${darkMode ? "#f1f5f9" : "#1e293b"}; width: 100%; max-width: 450px; padding: 35px; border-radius: 24px; }
        .input-wrapper .main-input { padding: 12px 12px 12px 35px; border-radius: 10px; font-weight: 700; border: 1px solid #ddd; }
        .currency-label { position: absolute; left: 12px; top: 10px; font-weight: 700; color: #0F4C6C; }
        .pay-btn { width: 100%; padding: 14px; border-radius: 10px; background: #0F4C6C; color: #D4A24C; font-weight: 800; border:none; cursor: pointer; }
        .submit-btn { width: 100%; padding: 12px; border-radius: 10px; background: #D4A24C; color: #0F4C6C; font-weight: 700; border:none; }
        .msg-toast { padding: 10px; border-radius: 8px; text-align: center; }
        .success { background: #dcfce7; color: #166534; }
        .error { background: #fee2e2; color: #991b1b; }
      `}</style>
    </div>
  );
}

export default UserFees;
