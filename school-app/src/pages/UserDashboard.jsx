// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebase";
// import {
//   doc,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// // 🔥 Vite/React ke liye sahi tarika: Direct Import
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// import { HiOutlineDownload, HiOutlineEye, HiOutlineX } from "react-icons/hi";

// import UserLayout from "./user/UserLayout";
// import UserHome from "./user/UserHome";
// import UserProfile from "./user/UserProfile";
// import UserFees from "./user/UserFees";
// import UserContact from "./user/UserContact";
// import UserUniform from "./user/UserUniform";
// import UserCertificate from "./user/UserCertificate";
// import ChangePassword from "../components/ChangePassword";
// import UserCalendar from "./UserCalendar";

// /* ================= PAYMENT HISTORY COMPONENT ================= */
// function PaymentHistory({ email, darkMode, studentName }) {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSlip, setSelectedSlip] = useState(null);

//   useEffect(() => {
//     if (!email) return;

//     const loadPayments = async () => {
//       try {
//         const q = query(
//           collection(db, "payments"),
//           where("studentEmail", "==", email),
//         );

//         const snap = await getDocs(q);
//         const data = snap.docs.map((d) => ({
//           id: d.id,
//           ...d.data(),
//         }));

//         const order = { approved: 1, pending: 2, rejected: 3 };
//         data.sort((a, b) => {
//           if (order[a.status] !== order[b.status]) {
//             return order[a.status] - order[b.status];
//           }
//           const aTime =
//             a.status === "approved"
//               ? a.approvedAt?.seconds || 0
//               : a.createdAt?.seconds || 0;
//           const bTime =
//             b.status === "approved"
//               ? b.approvedAt?.seconds || 0
//               : b.createdAt?.seconds || 0;
//           return bTime - aTime;
//         });

//         setPayments(data);
//       } catch (err) {
//         console.error("Payment load error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPayments();
//   }, [email]);

//   // 🔥 Fixed Professional PDF Generator
//   const generatePDF = (p) => {
//     try {
//       const doc = new jsPDF();

//       // Header Section
//       doc.setFontSize(18);
//       doc.setTextColor(15, 76, 108); // School Navy Blue
//       doc.text("FEE PAYMENT RECEIPT", 105, 20, { align: "center" });

//       // Student Info
//       doc.setFontSize(11);
//       doc.setTextColor(0, 0, 0);
//       doc.text(
//         `Student Name: ${studentName || p.studentName || "N/A"}`,
//         14,
//         35,
//       );
//       doc.text(`Receipt Date: ${new Date().toLocaleDateString()}`, 14, 42);

//       // 🔥 Correct way to call autoTable in Vite/React
//       autoTable(doc, {
//         startY: 50,
//         head: [["Description", "Details"]],
//         body: [
//           ["Transaction ID", p.paymentId || p.id],
//           ["Month", p.month || "N/A"],
//           ["Amount Paid", `INR ${p.paidAmount}`],
//           ["Payment Mode", p.mode || "Online"],
//           ["Status", p.status.toUpperCase()],
//           [
//             "Official Date",
//             p.createdAt
//               ? new Date(p.createdAt.seconds * 1000).toLocaleString()
//               : "N/A",
//           ],
//         ],
//         theme: "striped",
//         headStyles: { fillColor: [15, 76, 108] }, // Navy Blue Header
//       });

//       // Footer
//       const finalY = doc.lastAutoTable.finalY + 15;
//       doc.setFontSize(10);
//       doc.setTextColor(150);
//       doc.text(
//         "This is a computer-generated receipt and requires no signature.",
//         105,
//         finalY,
//         { align: "center" },
//       );

//       // Save the PDF
//       doc.save(`Receipt_${p.month}_${p.id.substring(0, 6)}.pdf`);
//     } catch (error) {
//       console.error("PDF Generation failed:", error);
//       alert(
//         "PDF Error: Please check console and ensure jspdf-autotable is installed.",
//       );
//     }
//   };

//   if (loading) return <div className="text-center py-4">Loading...</div>;

//   return (
//     <div className={`payment-card ${darkMode ? "dark" : ""}`}>
//       <h5 className="section-title">🧾 Payment History</h5>
//       <div className="table-responsive">
//         <table className={`table align-middle ${darkMode ? "table-dark" : ""}`}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Paid</th>
//               <th>Month</th>
//               <th>Status</th>
//               <th>Slip</th>
//               <th>Date</th>
//               <th className="text-end">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((p, i) => (
//               <tr key={p.id}>
//                 <td>{i + 1}</td>
//                 <td className="paid-text text-primary fw-bold">
//                   ₹ {p.paidAmount || 0}
//                 </td>
//                 <td>{p.month || "—"}</td>
//                 <td>
//                   <span
//                     className={`badge bg-${p.status === "approved" ? "success" : p.status === "pending" ? "warning" : "danger"}`}
//                   >
//                     {p.status}
//                   </span>
//                 </td>
//                 <td>
//                   {p.slipUrl ? (
//                     <button
//                       className="btn btn-sm btn-outline-info"
//                       onClick={() => setSelectedSlip(p.slipUrl)}
//                     >
//                       <HiOutlineEye /> View
//                     </button>
//                   ) : (
//                     <span className="text-muted small">No Slip</span>
//                   )}
//                 </td>
//                 <td className="small">
//                   {p.createdAt
//                     ? new Date(p.createdAt.seconds * 1000).toLocaleDateString()
//                     : "—"}
//                 </td>
//                 <td className="text-end">
//                   {p.status === "approved" && (
//                     <button
//                       className="btn btn-sm btn-dark"
//                       onClick={() => generatePDF(p)}
//                     >
//                       <HiOutlineDownload /> PDF
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Slip Preview Modal */}
//       {selectedSlip && (
//         <div
//           className="slip-preview-overlay"
//           onClick={() => setSelectedSlip(null)}
//         >
//           <div className="slip-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={() => setSelectedSlip(null)}>
//               <HiOutlineX />
//             </button>
//             <img
//               src={selectedSlip}
//               alt="Payment Slip"
//               style={{ width: "100%", borderRadius: "8px" }}
//             />
//           </div>
//         </div>
//       )}

//       <style>{`
//         .payment-card { background:white; padding:20px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.1); }
//         .payment-card.dark { background:#1E293B; color:white; }
//         .badge { font-weight: 500; font-size: 11px; }
//         .slip-preview-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:1000; display:flex; align-items:center; justify-content:center; }
//         .slip-content { position:relative; max-width:450px; width:90%; background:white; padding:12px; border-radius:12px; }
//         .close-btn { position:absolute; top:-45px; right:0; background:none; border:none; color:white; font-size:28px; cursor:pointer; }
//       `}</style>
//     </div>
//   );
// }

// /* ================= USER DASHBOARD ================= */
// function UserDashboard() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const snap = await getDoc(doc(db, "students", user.email));
//         if (snap.exists()) {
//           setStudent({ email: user.email, ...snap.data() });
//         }
//       }
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   if (loading)
//     return <div className="text-center mt-5">Loading Dashboard...</div>;

//   return (
//     <>
//       <UserLayout onChangePassword={() => setShowChangePassword(true)}>
//         {(activePage, darkMode) => (
//           <div className="p-1">
//             {activePage === "home" && (
//               <UserHome student={student} darkMode={darkMode} />
//             )}
//             {activePage === "profile" && (
//               <UserProfile student={student} darkMode={darkMode} />
//             )}
//             {activePage === "fees" && (
//               <UserFees student={student} darkMode={darkMode} />
//             )}
//             {activePage === "history" && (
//               <PaymentHistory
//                 email={student.email}
//                 darkMode={darkMode}
//                 studentName={student.name}
//               />
//             )}
//             {activePage === "uniform" && (
//               <UserUniform student={student} darkMode={darkMode} />
//             )}
//             {activePage === "certificate" && (
//               <UserCertificate student={student} darkMode={darkMode} />
//             )}
//             {activePage === "contact" && <UserContact />}
//           </div>
//         )}
//       </UserLayout>
//       {showChangePassword && (
//         <ChangePassword onClose={() => setShowChangePassword(false)} />
//       )}
//     </>
//   );
// }

// export default UserDashboard;
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// 🔥 Vite/React ke liye sahi tarika: Direct Import
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { HiOutlineDownload, HiOutlineEye, HiOutlineX } from "react-icons/hi";

import UserLayout from "./user/UserLayout";
import UserHome from "./user/UserHome";
import UserProfile from "./user/UserProfile";
import UserFees from "./user/UserFees";
import UserContact from "./user/UserContact";
import UserUniform from "./user/UserUniform";
import UserCertificate from "./user/UserCertificate";
import ChangePassword from "../components/ChangePassword";
import UserCalendar from "./UserCalendar";

/* ================= PAYMENT HISTORY COMPONENT ================= */
function PaymentHistory({ email, darkMode, studentName }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlip, setSelectedSlip] = useState(null);

  useEffect(() => {
    if (!email) return;

    const loadPayments = async () => {
      try {
        const q = query(
          collection(db, "payments"),
          where("studentEmail", "==", email),
        );

        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        const order = { approved: 1, pending: 2, rejected: 3 };
        data.sort((a, b) => {
          if (order[a.status] !== order[b.status]) {
            return order[a.status] - order[b.status];
          }
          const aTime =
            a.status === "approved"
              ? a.approvedAt?.seconds || 0
              : a.createdAt?.seconds || 0;
          const bTime =
            b.status === "approved"
              ? b.approvedAt?.seconds || 0
              : b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        setPayments(data);
      } catch (err) {
        console.error("Payment load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [email]);

  const generatePDF = (p) => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor(15, 76, 108);
      doc.text("FEE PAYMENT RECEIPT", 105, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Student Name: ${studentName || p.studentName || "N/A"}`,
        14,
        35,
      );
      doc.text(`Receipt Date: ${new Date().toLocaleDateString()}`, 14, 42);

      autoTable(doc, {
        startY: 50,
        head: [["Description", "Details"]],
        body: [
          ["Transaction ID", p.paymentId || p.id],
          ["Month", p.month || "N/A"],
          ["Amount Paid", `INR ${p.paidAmount}`],
          ["Payment Mode", p.mode || "Online"],
          ["Status", p.status.toUpperCase()],
          [
            "Official Date",
            p.createdAt
              ? new Date(p.createdAt.seconds * 1000).toLocaleString()
              : "N/A",
          ],
        ],
        theme: "striped",
        headStyles: { fillColor: [15, 76, 108] },
      });

      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        "This is a computer-generated receipt and requires no signature.",
        105,
        finalY,
        { align: "center" },
      );

      doc.save(`Receipt_${p.month}_${p.id.substring(0, 6)}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed:", error);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className={`payment-card ${darkMode ? "dark" : ""}`}>
      <h5 className="section-title">🧾 Payment History</h5>
      <div className="table-responsive">
        <table className={`table align-middle ${darkMode ? "table-dark" : ""}`}>
          <thead>
            <tr>
              <th>#</th>
              <th>Paid</th>
              <th>Month</th>
              {/* <th>Status</th> */} {/* Status column header commented */}
              {/* <th>Slip</th> */}
              <th>Date</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td className="paid-text text-primary fw-bold">
                  ₹ {p.paidAmount || 0}
                </td>
                <td>{p.month || "—"}</td>
                {/* Status data cell commented
                <td>
                  <span
                    className={`badge bg-${p.status === "approved" ? "success" : p.status === "pending" ? "warning" : "danger"}`}
                  >
                    {p.status}
                  </span>
                </td> 
                */}
                {/* Slip data cell commented
                <td>
                  {p.slipUrl ? (
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => setSelectedSlip(p.slipUrl)}
                    >
                      <HiOutlineEye /> View
                    </button>
                  ) : (
                    <span className="text-muted small">No Slip</span>
                  )}
                </td> 
                */}
                <td className="small">
                  {p.createdAt
                    ? new Date(p.createdAt.seconds * 1000).toLocaleDateString()
                    : "—"}
                </td>
                <td className="text-end">
                  {p.status === "approved" && (
                    <button
                      className="btn btn-sm btn-dark"
                      onClick={() => generatePDF(p)}
                    >
                      <HiOutlineDownload /> PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slip Preview Modal Commented
      {selectedSlip && (
        <div
          className="slip-preview-overlay"
          onClick={() => setSelectedSlip(null)}
        >
          <div className="slip-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedSlip(null)}>
              <HiOutlineX />
            </button>
            <img
              src={selectedSlip}
              alt="Payment Slip"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        </div>
      )} 
      */}

      <style>{`
        .payment-card { background:white; padding:20px; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.1); }
        .payment-card.dark { background:#1E293B; color:white; }
        .badge { font-weight: 500; font-size: 11px; }
      `}</style>
    </div>
  );
}

/* ================= USER DASHBOARD ================= */
function UserDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "students", user.email));
        if (snap.exists()) {
          setStudent({ email: user.email, ...snap.data() });
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Loading Dashboard...</div>;

  return (
    <>
      <UserLayout onChangePassword={() => setShowChangePassword(true)}>
        {(activePage, darkMode) => (
          <div className="p-1">
            {activePage === "home" && (
              <UserHome student={student} darkMode={darkMode} />
            )}
            {activePage === "profile" && (
              <UserProfile student={student} darkMode={darkMode} />
            )}
            {activePage === "fees" && (
              <UserFees student={student} darkMode={darkMode} />
            )}
            {activePage === "history" && (
              <PaymentHistory
                email={student.email}
                darkMode={darkMode}
                studentName={student.name}
              />
            )}
            {activePage === "uniform" && (
              <UserUniform student={student} darkMode={darkMode} />
            )}
            {activePage === "certificate" && (
              <UserCertificate student={student} darkMode={darkMode} />
            )}
            {activePage === "contact" && <UserContact />}
          </div>
        )}
      </UserLayout>
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </>
  );
}

export default UserDashboard;
