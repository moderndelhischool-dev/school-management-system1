// import { useState, useEffect } from "react";
// import { jsPDF } from "jspdf";
// import { db } from "../../firebase/firebase";
// import { applyRazorpayPaymentApproval } from "../../utils/applyRazorpayPaymentApproval";

// /** Same key in session + local: survives tab close / logout on this browser */
// const FEE_SYNC_STORAGE_KEY = "school_app_fee_firestore_sync_pending";

// function readPendingSyncPayload(studentEmail) {
//   if (typeof window === "undefined" || !studentEmail) return null;
//   try {
//     const raw =
//       sessionStorage.getItem(FEE_SYNC_STORAGE_KEY)
//       // || localStorage.getItem(FEE_SYNC_STORAGE_KEY);
//     if (!raw) return null;
//     const p = JSON.parse(raw);
//     if (p.studentEmail !== studentEmail) return null;
//     return {
//       paymentId: p.paymentId,
//       paidAmount: Number(p.paidAmount),
//       razorpayResponse: p.razorpayResponse || {},
//     };
//   } catch {
//     sessionStorage.removeItem(FEE_SYNC_STORAGE_KEY);
//     // localStorage.removeItem(FEE_SYNC_STORAGE_KEY);
//     return null;
//   }
// }

// function UserFees({ student, darkMode }) {
//   const [payAmount, setPayAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   /** Last successful payment — for receipt download */
//   const [receipt, setReceipt] = useState(null);
//   /** Razorpay succeeded but Firestore save failed — user can retry same payment */
//   const [pendingSync, setPendingSync] = useState(null);

//   useEffect(() => {
//     if (!student?.email) return;
//     const restored = readPendingSyncPayload(student.email);
//     if (!restored) return;
//     setPendingSync(restored);
//     setMsg(
//       "❌ A payment reached Razorpay but school records did not save. Use Retry sync below.",
//     );
//   }, [student?.email]);

//   const persistPendingSync = (payload) => {
//     const json = JSON.stringify({ studentEmail: student.email, ...payload });
//     try {
//       sessionStorage.setItem(FEE_SYNC_STORAGE_KEY, json);
//     } catch {
//       /* quota / private mode */
//     }
//     try {
//       localStorage.setItem(FEE_SYNC_STORAGE_KEY, json);
//     } catch {
//       /* quota / private mode */
//     }
//   };

//   const clearPendingSyncStorage = () => {
//     try {
//       sessionStorage.removeItem(FEE_SYNC_STORAGE_KEY);
//       //   localStorage.removeItem(FEE_SYNC_STORAGE_KEY);
//     } catch {
//       /* ignore */
//     }

//   };

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
//     const pending = Number(student.pendingFees);

//     // --- Validation Logic ---
//     if (!amount || amount <= 0) {
//       setMsg("❌ Please enter a valid amount.");
//       return;
//     }
//     if (amount > pending) {
//       setMsg(`❌ You cannot pay more than ₹${pending}.`);
//       return;
//     }

//     setLoading(true);
//     await loadRazorpay();

//     const options = {
//       key: "rzp_test_SUzzQGk1TXuGhi",
//       amount: amount * 100,
//       currency: "INR",
//       name: "School Fees Online",
//       description: `Payment for ${student.name} (${student.rollNo})`,
//       handler: async (response) => {
//         const paymentId = response.razorpay_payment_id;
//         try {
//           const result = await applyRazorpayPaymentApproval(db, {
//             paymentId,
//             paidAmount: amount,
//             student,
//             razorpayResponse: response,
//           });
//           clearPendingSyncStorage();
//           setPendingSync(null);
//           const issuedAt = new Date().toLocaleString("en-IN");
//           setReceipt({ amount, paymentId, issuedAt });
//           setPayAmount("");
//           setMsg(
//             result?.alreadyProcessed
//               ? "✅ This payment is already on file. You can download the receipt again."
//               : "✅ Payment successful! Fees updated. You can download your receipt below.",
//           );
//         } catch (err) {
//           console.error(err);
//           const payload = {
//             paymentId,
//             paidAmount: amount,
//             razorpayResponse: {
//               razorpay_order_id: response.razorpay_order_id || "",
//               razorpay_payment_id: paymentId,
//               razorpay_signature: response.razorpay_signature || "",
//             },
//           };
//           setPendingSync(payload);
//           persistPendingSync(payload);
//           setMsg(
//             "❌ Razorpay may have charged you but saving to school failed. Tap “Retry sync” or contact office with payment ID: " +
//               paymentId,
//           );
//         } finally {
//           setLoading(false);
//         }
//       },
//       prefill: {
//         name: student.name,
//         email: student.email,
//         contact: student.phone || "",
//       },
//       theme: { color: "#0F4C6C" },
//       modal: { ondismiss: () => setLoading(false) },
//     };
//     new window.Razorpay(options).open();
//   };

//   const handleRetrySync = async () => {
//     if (!pendingSync) return;
//     const syncSnapshot = pendingSync;
//     setLoading(true);
//     setMsg("⏳ Retrying save to school records...");
//     try {
//       const result = await applyRazorpayPaymentApproval(db, {
//         paymentId: syncSnapshot.paymentId,
//         paidAmount: syncSnapshot.paidAmount,
//         student,
//         razorpayResponse: syncSnapshot.razorpayResponse,
//       });
//       clearPendingSyncStorage();
//       setPendingSync(null);
//       const { paymentId, paidAmount } = syncSnapshot;
//       const issuedAt = new Date().toLocaleString("en-IN");
//       setReceipt({ amount: paidAmount, paymentId, issuedAt });
//       setPayAmount("");
//       setMsg(
//         result?.alreadyProcessed
//           ? "✅ Record is now in sync. You can download your receipt."
//           : "✅ Saved successfully. Fees updated. You can download your receipt below.",
//       );
//     } catch (err) {
//       console.error(err);
//       setMsg(
//         "❌ Retry failed. Please try again or contact school with payment ID: " +
//           syncSnapshot.paymentId,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadReceiptPdf = () => {
//     if (!receipt) return;
//     const docPdf = new jsPDF({ unit: "pt", format: "a4" });
//     const margin = 48;
//     let y = margin;
//     docPdf.setFontSize(16);
//     docPdf.text("Fee payment receipt", margin, y);
//     y += 28;
//     docPdf.setFontSize(10);
//     docPdf.text(`Date: ${receipt.issuedAt}`, margin, y);
//     y += 22;
//     docPdf.text(`Student: ${student.name}`, margin, y);
//     y += 18;
//     docPdf.text(`Roll no: ${student.rollNo ?? "—"}`, margin, y);
//     y += 18;
//     docPdf.text(`Class: ${student.class ?? "—"}`, margin, y);
//     y += 18;
//     docPdf.text(`Email: ${student.email}`, margin, y);
//     y += 28;
//     docPdf.setFontSize(11);
//     docPdf.text(`Amount paid: ₹${receipt.amount}`, margin, y);
//     y += 20;
//     docPdf.setFontSize(10);
//     docPdf.text(`Razorpay payment ID: ${receipt.paymentId}`, margin, y);
//     y += 18;
//     docPdf.text(`Mode: Online (Razorpay)`, margin, y);
//     y += 24;
//     docPdf.setFontSize(9);
//     docPdf.text(
//       "This receipt is system-generated after successful payment.",
//       margin,
//       y,
//     );
//     docPdf.save(`fee-receipt-${receipt.paymentId}.pdf`);
//   };

//   if (!student) return null;

//   return (
//     <div className={`payment-container ${darkMode ? "dark" : "light"}`}>
//       <div className="payment-wrapper shadow-lg">
//         <div className="payment-step animate-in">
//             <h4 className="fw-bold mb-4 text-center">💳 Online Fees Payment</h4>

//             {/* --- Extra Student Details Section --- */}
//             <div className="student-info-card mb-4">
//               <div className="info-row">
//                 <span>Student Name:</span>
//                 <strong>{student.name}</strong>
//               </div>
//               <div className="info-row">
//                 <span>Roll No:</span>
//                 <strong>{student.rollNo}</strong>
//               </div>
//               <div className="info-row">
//                 <span>Class:</span>
//                 <strong>{student.class}</strong>
//               </div>
//               <div className="info-row highlight">
//                 <span>Pending Balance:</span>
//                 <strong className="text-danger">₹{student.pendingFees}</strong>
//               </div>
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
//               disabled={loading || !!pendingSync}
//               title={
//                 pendingSync
//                   ? "Finish Retry sync for the previous payment first"
//                   : undefined
//               }
//             >
//               {loading ? "Processing..." : `Pay ₹${payAmount || "0"}`}
//             </button>

//             {pendingSync && (
//               <div
//                 className="sync-retry-box mt-3 p-3 rounded-3"
//                 style={{
//                   border: "2px dashed #f59e0b",
//                   background: darkMode ? "#1e293b" : "#fffbeb",
//                 }}
//               >
//                 <p className="small fw-bold mb-1 text-warning">
//                   Action needed — school record not saved
//                 </p>
//                 <p className="small text-muted mb-2">
//                   Razorpay payment ID:{" "}
//                   <strong className="text-break">{pendingSync.paymentId}</strong>
//                   <br />
//                   Amount: ₹{pendingSync.paidAmount}
//                 </p>
//                 <button
//                   type="button"
//                   className="btn w-100"
//                   style={{
//                     background: "#D4A24C",
//                     color: "#0F4C6C",
//                     fontWeight: 700,
//                   }}
//                   onClick={handleRetrySync}
//                   disabled={loading}
//                 >
//                   {loading ? "Working..." : "Retry sync (save to school)"}
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-link btn-sm text-muted mt-2 p-0"
//                   disabled={loading}
//                   onClick={() => {
//                     clearPendingSyncStorage();
//                     setPendingSync(null);
//                     setMsg("");
//                   }}
//                 >
//                   Dismiss (payment already synced? check balance first)
//                 </button>
//               </div>
//             )}

//             {receipt && (
//               <div className="mt-4 d-grid gap-2">
//                 <button
//                   type="button"
//                   className="submit-btn"
//                   onClick={downloadReceiptPdf}
//                 >
//                   Download receipt (PDF)
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={() => {
//                     setReceipt(null);
//                     setMsg("");
//                     window.location.reload();
//                   }}
//                 >
//                   Refresh balance
//                 </button>
//               </div>
//             )}
//           </div>

//         {msg && (
//           <div
//             className={`msg-toast mt-4 ${msg.includes("❌") ? "error" : "success"}`}
//           >
//             {msg}
//           </div>
//         )}
//       </div>

//       <style>{`
//         /* ... aapka purana CSS ... */
//         .student-info-card {
//           background: ${darkMode ? "#0f172a" : "#f8fafc"};
//           padding: 15px;
//           border-radius: 12px;
//           border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"};
//         }
//         .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; }
//         .info-row.highlight { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc; font-size: 1rem; }

//         /* Baaki Purana CSS yahan add kar lein */
//         .payment-container { display: flex; justify-content: center; padding: 20px; }
//         .payment-wrapper { background: ${darkMode ? "#1e293b" : "#fff"}; color: ${darkMode ? "#f1f5f9" : "#1e293b"}; width: 100%; max-width: 450px; padding: 35px; border-radius: 24px; }
//         .input-wrapper .main-input { padding: 12px 12px 12px 35px; border-radius: 10px; font-weight: 700; border: 1px solid #ddd; }
//         .currency-label { position: absolute; left: 12px; top: 10px; font-weight: 700; color: #0F4C6C; }
//         .pay-btn { width: 100%; padding: 14px; border-radius: 10px; background: #0F4C6C; color: #D4A24C; font-weight: 800; border:none; cursor: pointer; }
//         .submit-btn { width: 100%; padding: 12px; border-radius: 10px; background: #D4A24C; color: #0F4C6C; font-weight: 700; border:none; }
//         .msg-toast { padding: 10px; border-radius: 8px; text-align: center; }
//         .success { background: #dcfce7; color: #166534; }
//         .error { background: #fee2e2; color: #991b1b; }
//       `}</style>
//     </div>
//   );
// }

// export default UserFees;
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { db } from "../../firebase/firebase";
import { applyRazorpayPaymentApproval } from "../../utils/applyRazorpayPaymentApproval";

const FEE_SYNC_STORAGE_KEY = "school_app_fee_firestore_sync_pending";

function readPendingSyncPayload(studentEmail) {
  if (typeof window === "undefined" || !studentEmail) return null;
  try {
    const raw = sessionStorage.getItem(FEE_SYNC_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.studentEmail !== studentEmail) return null;
    return {
      paymentId: p.paymentId,
      paidAmount: Number(p.paidAmount),
      razorpayResponse: p.razorpayResponse || {},
    };
  } catch {
    sessionStorage.removeItem(FEE_SYNC_STORAGE_KEY);
    return null;
  }
}

function UserFees({ student, darkMode }) {
  const [payAmount, setPayAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [pendingSync, setPendingSync] = useState(null);

  // 🔥 Naya State: Taaki payment ke baad turant UI update ho
  const [displayFees, setDisplayFees] = useState(student?.pendingFees || 0);

  useEffect(() => {
    if (student?.pendingFees !== undefined) {
      setDisplayFees(student.pendingFees);
    }
  }, [student?.pendingFees]);

  useEffect(() => {
    if (!student?.email) return;
    const restored = readPendingSyncPayload(student.email);
    if (!restored) return;
    setPendingSync(restored);
    setMsg(
      "❌ A payment reached Razorpay but school records did not save. Use Retry sync below.",
    );
  }, [student?.email]);

  const persistPendingSync = (payload) => {
    const json = JSON.stringify({ studentEmail: student.email, ...payload });
    sessionStorage.setItem(FEE_SYNC_STORAGE_KEY, json);
    localStorage.setItem(FEE_SYNC_STORAGE_KEY, json);
  };

  const clearPendingSyncStorage = () => {
    sessionStorage.removeItem(FEE_SYNC_STORAGE_KEY);
  };

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

  // 🔥 Common function to update UI after success
  const finalizePaymentUI = (amount) => {
    const newBalance = Number(displayFees) - Number(amount);
    setDisplayFees(newBalance > 0 ? newBalance : 0); // Update balance in UI
    setPayAmount(""); // Clear input
    clearPendingSyncStorage();
    setPendingSync(null);
  };

  const handleOnlinePayment = async () => {
    const amount = Number(payAmount);
    const pending = Number(displayFees);

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
      description: `Payment for ${student.name}`,
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id;
        try {
          const result = await applyRazorpayPaymentApproval(db, {
            paymentId,
            paidAmount: amount,
            student,
            razorpayResponse: response,
          });

          // 🔥 UI Update
          finalizePaymentUI(amount);
          const issuedAt = new Date().toLocaleString("en-IN");
          setReceipt({ amount, paymentId, issuedAt });

          setMsg(
            result?.alreadyProcessed
              ? "✅ Payment already on file."
              : "✅ Payment successful! Fees updated locally.",
          );
        } catch (err) {
          const payload = {
            paymentId,
            paidAmount: amount,
            razorpayResponse: response,
          };
          setPendingSync(payload);
          persistPendingSync(payload);
          setMsg("❌ Saving failed. Tap Retry sync. ID: " + paymentId);
        } finally {
          setLoading(false);
        }
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

  const handleRetrySync = async () => {
    if (!pendingSync) return;
    setLoading(true);
    try {
      await applyRazorpayPaymentApproval(db, {
        paymentId: pendingSync.paymentId,
        paidAmount: pendingSync.paidAmount,
        student,
        razorpayResponse: pendingSync.razorpayResponse,
      });

      const paid = pendingSync.paidAmount;
      const pId = pendingSync.paymentId;

      finalizePaymentUI(paid);
      setReceipt({
        amount: paid,
        paymentId: pId,
        issuedAt: new Date().toLocaleString("en-IN"),
      });
      setMsg("✅ Saved successfully. Fees updated.");
    } catch (err) {
      setMsg("❌ Retry failed. ID: " + pendingSync.paymentId);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceiptPdf = () => {
    if (!receipt) return;
    const docPdf = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 48;
    let y = margin;
    docPdf.setFontSize(16);
    docPdf.text("Fee Payment Receipt", margin, y);
    y += 40;
    docPdf.setFontSize(10);
    docPdf.text(`Student: ${student.name}`, margin, y);
    y += 18;
    docPdf.text(`Class: ${student.class}`, margin, y);
    y += 18;
    docPdf.text(`Amount Paid: ₹${receipt.amount}`, margin, y);
    y += 18;
    docPdf.text(`Payment ID: ${receipt.paymentId}`, margin, y);
    y += 18;
    docPdf.text(`Date: ${receipt.issuedAt}`, margin, y);
    docPdf.save(`Receipt-${receipt.paymentId}.pdf`);
  };

  return (
    <div className={`payment-container ${darkMode ? "dark" : "light"}`}>
      <div className="payment-wrapper shadow-lg">
        <h4 className="fw-bold mb-4 text-center">💳 Online Fees Payment</h4>

        <div className="student-info-card mb-4">
          <div className="info-row">
            <span>Student Name:</span>
            <strong>{student.name}</strong>
          </div>
          <div className="info-row">
            <span>Class:</span>
            <strong>{student.class}</strong>
          </div>
          <div className="info-row highlight">
            <span>Pending Balance:</span>
            {/* 🔥 Yahan displayFees use kiya hai jo turant update hoga */}
            <strong className="text-danger">₹{displayFees}</strong>
          </div>
        </div>

        <div className="input-wrapper mb-3">
          <label className="small text-muted mb-1">Enter Amount to Pay</label>
          <div className="position-relative">
            <input
              type="number"
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
          disabled={loading || !!pendingSync}
        >
          {loading ? "Processing..." : `Pay ₹${payAmount || "0"}`}
        </button>

        {pendingSync && (
          <div
            className="sync-retry-box mt-3 p-3 rounded-3"
            style={{ border: "2px dashed #f59e0b" }}
          >
            <button
              className="btn btn-warning w-100 fw-bold"
              onClick={handleRetrySync}
              disabled={loading}
            >
              Retry sync (save to school)
            </button>
          </div>
        )}

        {receipt && (
          <div className="mt-4 d-grid gap-2">
            <button className="submit-btn" onClick={downloadReceiptPdf}>
              Download receipt (PDF)
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => window.location.reload()}
            >
              Done / Refresh Page
            </button>
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
        .payment-container { display: flex; justify-content: center; padding: 20px; }
        .payment-wrapper { background: ${darkMode ? "#1e293b" : "#fff"}; color: ${darkMode ? "#f1f5f9" : "#1e293b"}; width: 100%; max-width: 450px; padding: 35px; border-radius: 24px; }
        .student-info-card { background: ${darkMode ? "#0f172a" : "#f8fafc"}; padding: 15px; border-radius: 12px; border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"}; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; }
        .info-row.highlight { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc; font-size: 1rem; }
        .input-wrapper .main-input { padding: 12px 12px 12px 35px; border-radius: 10px; font-weight: 700; }
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
