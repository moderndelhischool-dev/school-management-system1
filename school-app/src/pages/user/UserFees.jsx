// import { useState, useEffect } from "react";
// import { jsPDF } from "jspdf";
// import { db } from "../../firebase/firebase";
// import { applyRazorpayPaymentApproval } from "../../utils/applyRazorpayPaymentApproval";

// const FEE_SYNC_STORAGE_KEY = "school_app_fee_firestore_sync_pending";

// function readPendingSyncPayload(studentEmail) {
//   if (typeof window === "undefined" || !studentEmail) return null;
//   try {
//     const raw = sessionStorage.getItem(FEE_SYNC_STORAGE_KEY);
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
//     return null;
//   }
// }

// function UserFees({ student, darkMode }) {
//   const [payAmount, setPayAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [receipt, setReceipt] = useState(null);
//   const [pendingSync, setPendingSync] = useState(null);

//   // 🔥 Naya State: Taaki payment ke baad turant UI update ho
//   const [displayFees, setDisplayFees] = useState(student?.pendingFees || 0);

//   useEffect(() => {
//     if (student?.pendingFees !== undefined) {
//       setDisplayFees(student.pendingFees);
//     }
//   }, [student?.pendingFees]);

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
//     sessionStorage.setItem(FEE_SYNC_STORAGE_KEY, json);
//     localStorage.setItem(FEE_SYNC_STORAGE_KEY, json);
//   };

//   const clearPendingSyncStorage = () => {
//     sessionStorage.removeItem(FEE_SYNC_STORAGE_KEY);
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

//   // 🔥 Common function to update UI after success
//   const finalizePaymentUI = (amount) => {
//     const newBalance = Number(displayFees) - Number(amount);
//     setDisplayFees(newBalance > 0 ? newBalance : 0); // Update balance in UI
//     setPayAmount(""); // Clear input
//     clearPendingSyncStorage();
//     setPendingSync(null);
//   };

//   const handleOnlinePayment = async () => {
//     const amount = Number(payAmount);
//     const pending = Number(displayFees);

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
//       description: `Payment for ${student.name}`,
//       handler: async (response) => {
//         const paymentId = response.razorpay_payment_id;
//         try {
//           const result = await applyRazorpayPaymentApproval(db, {
//             paymentId,
//             paidAmount: amount,
//             student,
//             razorpayResponse: response,
//           });

//           // 🔥 UI Update
//           finalizePaymentUI(amount);
//           const issuedAt = new Date().toLocaleString("en-IN");
//           setReceipt({ amount, paymentId, issuedAt });

//           setMsg(
//             result?.alreadyProcessed
//               ? "✅ Payment already on file."
//               : "✅ Payment successful! Fees updated locally.",
//           );
//         } catch (err) {
//           const payload = {
//             paymentId,
//             paidAmount: amount,
//             razorpayResponse: response,
//           };
//           setPendingSync(payload);
//           persistPendingSync(payload);
//           setMsg("❌ Saving failed. Tap Retry sync. ID: " + paymentId);
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
//     setLoading(true);
//     try {
//       await applyRazorpayPaymentApproval(db, {
//         paymentId: pendingSync.paymentId,
//         paidAmount: pendingSync.paidAmount,
//         student,
//         razorpayResponse: pendingSync.razorpayResponse,
//       });

//       const paid = pendingSync.paidAmount;
//       const pId = pendingSync.paymentId;

//       finalizePaymentUI(paid);
//       setReceipt({
//         amount: paid,
//         paymentId: pId,
//         issuedAt: new Date().toLocaleString("en-IN"),
//       });
//       setMsg("✅ Saved successfully. Fees updated.");
//     } catch (err) {
//       setMsg("❌ Retry failed. ID: " + pendingSync.paymentId);
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
//     docPdf.text("Fee Payment Receipt", margin, y);
//     y += 40;
//     docPdf.setFontSize(10);
//     docPdf.text(`Student: ${student.name}`, margin, y);
//     y += 18;
//     docPdf.text(`Class: ${student.class}`, margin, y);
//     y += 18;
//     docPdf.text(`Amount Paid: ₹${receipt.amount}`, margin, y);
//     y += 18;
//     docPdf.text(`Payment ID: ${receipt.paymentId}`, margin, y);
//     y += 18;
//     docPdf.text(`Date: ${receipt.issuedAt}`, margin, y);
//     docPdf.save(`Receipt-${receipt.paymentId}.pdf`);
//   };

//   return (
//     <div className={`payment-container ${darkMode ? "dark" : "light"}`}>
//       <div className="payment-wrapper shadow-lg">
//         <h4 className="fw-bold mb-4 text-center">💳 Online Fees Payment</h4>

//         <div className="student-info-card mb-4">
//           <div className="info-row">
//             <span>Student Name:</span>
//             <strong>{student.name}</strong>
//           </div>
//           <div className="info-row">
//             <span>Class:</span>
//             <strong>{student.class}</strong>
//           </div>
//           <div className="info-row highlight">
//             <span>Pending Balance:</span>
//             {/* 🔥 Yahan displayFees use kiya hai jo turant update hoga */}
//             <strong className="text-danger">₹{displayFees}</strong>
//           </div>
//         </div>

//         <div className="input-wrapper mb-3">
//           <label className="small text-muted mb-1">Enter Amount to Pay</label>
//           <div className="position-relative">
//             <input
//               type="number"
//               value={payAmount}
//               onChange={(e) => setPayAmount(e.target.value)}
//               className="form-control main-input shadow-none"
//             />
//             <span className="currency-label">₹</span>
//           </div>
//         </div>

//         <button
//           className="pay-btn"
//           onClick={handleOnlinePayment}
//           disabled={loading || !!pendingSync}
//         >
//           {loading ? "Processing..." : `Pay ₹${payAmount || "0"}`}
//         </button>

//         {pendingSync && (
//           <div
//             className="sync-retry-box mt-3 p-3 rounded-3"
//             style={{ border: "2px dashed #f59e0b" }}
//           >
//             <button
//               className="btn btn-warning w-100 fw-bold"
//               onClick={handleRetrySync}
//               disabled={loading}
//             >
//               Retry sync (save to school)
//             </button>
//           </div>
//         )}

//         {receipt && (
//           <div className="mt-4 d-grid gap-2">
//             <button className="submit-btn" onClick={downloadReceiptPdf}>
//               Download receipt (PDF)
//             </button>
//             <button
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => window.location.reload()}
//             >
//               Done / Refresh Page
//             </button>
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
//         .payment-wrapper { background: ${darkMode ? "#1e293b" : "#fff"}; color: ${darkMode ? "#f1f5f9" : "#1e293b"}; width: 100%; max-width: 450px; padding: 35px; border-radius: 24px; }
//         .student-info-card { background: ${darkMode ? "#0f172a" : "#f8fafc"}; padding: 15px; border-radius: 12px; border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"}; }
//         .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; }
//         .info-row.highlight { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc; font-size: 1rem; }
//         .input-wrapper .main-input { padding: 12px 12px 12px 35px; border-radius: 10px; font-weight: 700; }
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

function UserFees({ student, darkMode }) {
  const [payAmount, setPayAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [displayFees, setDisplayFees] = useState(student?.pendingFees || 0);

  useEffect(() => {
    if (student?.pendingFees !== undefined) {
      setDisplayFees(student.pendingFees);
    }
  }, [student?.pendingFees]);

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
    if (!amount || amount <= 0 || amount > displayFees) {
      setMsg("❌ Please enter a valid amount.");
      return;
    }

    setLoading(true);
    await loadRazorpay();

    const options = {
      key: "rzp_test_SUzzQGk1TXuGhi",
      amount: amount * 100,
      currency: "INR",
      name: "School Fees Payment",
      description: `Payment for ${student.name}`,
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id;
        try {
          await applyRazorpayPaymentApproval(db, {
            paymentId,
            paidAmount: amount,
            student,
            razorpayResponse: response,
          });

          const newBalance = displayFees - amount;
          setDisplayFees(newBalance > 0 ? newBalance : 0);
          setPayAmount("");

          setReceipt({
            amount,
            paymentId,
            date: new Date().toLocaleDateString("en-IN"),
            time: new Date().toLocaleTimeString("en-IN"),
          });

          setMsg("✅ Payment Successful!");

          // 🔥 AUTO REFRESH LOGIC: Agar fees 0 ho gayi toh 3 seconds baad refresh
          if (newBalance <= 0) {
            setMsg("✅ Fees Fully Paid! Refreshing dashboard...");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch (err) {
          setMsg("❌ Saving failed. ID: " + paymentId);
        } finally {
          setLoading(false);
        }
      },
      prefill: { name: student.name, email: student.email },
      theme: { color: "#0F4C6C" },
    };
    new window.Razorpay(options).open();
  };

  /* ================= CLEAN PDF RECEIPT ================= */
  const downloadReceiptPdf = () => {
    if (!receipt) return;
    const docPdf = new jsPDF({ unit: "pt", format: "a5" });

    docPdf.setFillColor(15, 76, 108);
    docPdf.rect(0, 0, 420, 60, "F");
    docPdf.setTextColor(255, 255, 255);
    docPdf.setFontSize(16);
    docPdf.setFont("helvetica", "bold");
    docPdf.text("PAYMENT RECEIPT", 145, 38);

    docPdf.setTextColor(40, 40, 40);
    docPdf.setFontSize(11);
    docPdf.setFont("helvetica", "bold");
    docPdf.text("TRANSACTION DETAILS", 40, 100);
    docPdf.setDrawColor(200, 200, 200);
    docPdf.line(40, 110, 380, 110);

    docPdf.setFont("helvetica", "normal");
    docPdf.setFontSize(10);
    docPdf.text(`Student Name:  ${student.name}`, 40, 140);
    docPdf.text(`Roll Number:   ${student.rollNo || "N/A"}`, 40, 160);
    docPdf.text(`Class:         ${student.class}`, 40, 180);
    docPdf.text(`Transaction ID: ${receipt.paymentId}`, 40, 200);
    docPdf.text(`Date & Time:    ${receipt.date} | ${receipt.time}`, 40, 220);

    docPdf.setFillColor(245, 247, 250);
    docPdf.rect(40, 250, 340, 50, "F");
    docPdf.setTextColor(15, 76, 108);
    docPdf.setFont("helvetica", "bold");
    docPdf.setFontSize(12);
    docPdf.text("Total Amount Paid:", 60, 280);
    docPdf.text(`INR ${receipt.amount}.00`, 290, 280);

    docPdf.setDrawColor(34, 197, 94);
    docPdf.setLineWidth(2);
    docPdf.roundedRect(280, 330, 100, 30, 5, 5, "S");
    docPdf.setTextColor(34, 197, 94);
    docPdf.setFontSize(14);
    docPdf.text("SUCCESS", 298, 350);

    docPdf.setTextColor(150, 150, 150);
    docPdf.setFontSize(8);
    docPdf.text("This is a computer-generated receipt.", 140, 550);

    docPdf.save(`Receipt_${receipt.paymentId}.pdf`);
  };

  return (
    <div className={`payment-center-container ${darkMode ? "dark" : "light"}`}>
      <div className="payment-wrapper shadow-lg">
        <h4 className="fw-bold mb-4 text-center">💳 Online Fees Payment</h4>

        <div className="student-info-card mb-4">
          <div className="info-row">
            <span>Name:</span>
            <strong>{student.name}</strong>
          </div>
          <div className="info-row">
            <span>Class:</span>
            <strong>{student.class}</strong>
          </div>
          <div className="info-row highlight">
            <span>Pending Balance:</span>
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
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${payAmount || "0"}`}
        </button>

        {receipt && (
          <div className="mt-4 d-grid gap-2">
            <div className="p-3 border rounded-3 text-center bg-light-success mb-2">
              <p className="text-success fw-bold mb-2">🎉 Payment Success!</p>
              <button className="submit-btn" onClick={downloadReceiptPdf}>
                Download Receipt (PDF)
              </button>
            </div>
            <button
              className="btn btn-outline-secondary btn-sm rounded-3 py-2"
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
        .payment-center-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; width: 100%; padding: 20px; }
        .payment-wrapper { background: ${darkMode ? "#1e293b" : "#fff"}; color: ${darkMode ? "#f1f5f9" : "#1e293b"}; width: 100%; max-width: 450px; padding: 40px; border-radius: 24px; }
        .student-info-card { background: ${darkMode ? "#0f172a" : "#f8fafc"}; padding: 15px; border-radius: 12px; border: 1px solid ${darkMode ? "#334155" : "#e2e8f0"}; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .info-row.highlight { border-top: 1px dashed #ccc; padding-top: 10px; margin-top: 10px; }
        .position-relative { position: relative; }
        .main-input { padding-left: 30px !important; height: 45px; border-radius: 10px; font-weight: 600; }
        .currency-label { position: absolute; left: 12px; top: 10px; font-weight: bold; color: #0F4C6C; }
        .pay-btn { width: 100%; padding: 14px; border-radius: 10px; background: #0F4C6C; color: #D4A24C; font-weight: 800; border:none; transition: 0.3s; }
        .pay-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        .submit-btn { width: 100%; padding: 12px; border-radius: 10px; background: #D4A24C; color: #0F4C6C; font-weight: 700; border:none; }
        .bg-light-success { background: #f0fdf4; border: 1px solid #bbf7d0; }
        .msg-toast { padding: 12px; border-radius: 10px; text-align: center; font-weight: 600; }
        .success { background: #dcfce7; color: #166534; }
        .error { background: #fee2e2; color: #991b1b; }
      `}</style>
    </div>
  );
}

export default UserFees;
