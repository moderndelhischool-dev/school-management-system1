// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
//   orderBy,
// } from "firebase/firestore";

// function FeesHistory({ darkMode }) {
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, "students"),
//       async (snapshot) => {
//         const promises = snapshot.docs.map(async (docSnap) => {
//           const student = docSnap.data();
//           const feesRef = collection(db, "students", docSnap.id, "fees");
//           const feesSnapshot = await getDocs(
//             query(feesRef, orderBy("date", "desc")),
//           );
//           const feesArray = feesSnapshot.docs.map((f) => {
//             const d = f.data() || {};
//             let monthDisplay = f.id;
//             if (f.id.includes("-")) {
//               const dateObj = new Date(f.id + "-01");
//               monthDisplay = dateObj.toLocaleString("default", {
//                 month: "long",
//                 year: "numeric",
//               });
//             }
//             return {
//               id: f.id,
//               monthDisplay,
//               amount: Number(d.amount) || 0,
//               paid: Number(d.paid) || 0,
//               status: d.status || "Pending",
//               date: d.date || null,
//             };
//           });
//           return { id: docSnap.id, ...student, feesHistory: feesArray };
//         });
//         const data = await Promise.all(promises);
//         setStudents(data);
//       },
//     );
//     return () => unsubscribe();
//   }, []);

//   const classOrder = [
//     "ukg",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "11",
//     "12",
//   ];
//   const classes = classOrder.filter((cls) =>
//     students.some(
//       (s) => String(s.class) === cls || String(s.class) === "+" + cls,
//     ),
//   );
//   const filteredStudents = selectedClass
//     ? students.filter(
//         (s) =>
//           String(s.class) === selectedClass ||
//           String(s.class) === "+" + selectedClass,
//       )
//     : [];

//   return (
//     <div className={`fees-history-root ${darkMode ? "is-dark" : "is-light"}`}>
//       <div className="fees-content-box">
//         <h2 className="fees-main-title"> Fees History Dashboard</h2>

//         {!selectedClass && (
//           <div className="fees-class-grid">
//             {classes.map((cls) => (
//               <div
//                 key={cls}
//                 onClick={() => setSelectedClass(cls)}
//                 className="fees-class-item"
//               >
//                 Class {cls}
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedClass && !selectedStudent && (
//           <div className="fees-fade-in">
//             <button
//               onClick={() => setSelectedClass(null)}
//               className="fees-back-btn"
//             >
//               ← Back to Classes
//             </button>
//             <h4 className="fees-sub-title mt-4">
//               Students in Class {selectedClass}
//             </h4>
//             <div className="fees-student-list mt-3">
//               {filteredStudents.map((s) => (
//                 <div
//                   key={s.id}
//                   onClick={() => setSelectedStudent(s)}
//                   className="fees-student-row"
//                 >
//                   <div className="d-flex justify-content-between align-items-center w-100">
//                     <div>
//                       <h6 className="mb-0 fw-bold">{s.name}</h6>
//                       <small>Roll No: {s.rollNo || "N/A"}</small>
//                     </div>
//                     <span className="fees-arrow">View History →</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {selectedStudent && (
//           <div className="fees-fade-in">
//             <button
//               onClick={() => setSelectedStudent(null)}
//               className="fees-back-btn danger mb-4"
//             >
//               ← Back to Students
//             </button>
//             <FeesTable student={selectedStudent} darkMode={darkMode} />
//           </div>
//         )}
//       </div>

//       <style>{`
//         /* HIGH CONTRAST DARK MODE CSS */
//         .fees-history-root.is-dark .fees-content-box { background: #111c2a !important; color: #f1f5f9 !important; }
//         .fees-history-root.is-light .fees-content-box { background: transparent; color: #1e293b; }

//         .fees-main-title { text-align: center; color: #D4A24C; font-weight: 800; margin-bottom: 25px; }

//         .fees-class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; }
//         .fees-class-item {
//           background: #0F4C6C; color: #D4A24C; padding: 20px; border-radius: 14px;
//           text-align: center; font-weight: 700; cursor: pointer; border: 1px solid #1B5E84; transition: 0.3s;
//         }
//         .fees-class-item:hover { background: #D4A24C; color: #0F4C6C; transform: scale(1.05); }

//         /* Student Card Logic */
//         .fees-student-row {
//            padding: 18px; border-radius: 12px; margin-bottom: 12px; cursor: pointer;
//            border: 1px solid #2d4253; transition: 0.3s;
//         }
//         .is-dark .fees-student-row { background: #1b2a3a !important; color: #fff !important; }
//         .is-light .fees-student-row { background: #f8f9fa; color: #000; }

//         .fees-student-row:hover { border-color: #D4A24C; transform: translateX(8px); }
//         .is-dark .fees-student-row:hover { background: #243644 !important; }

//         .fees-back-btn { background: #475569; color: white; border: none; padding: 10px 22px; border-radius: 10px; font-weight: 600; cursor: pointer; }
//         .fees-back-btn.danger { background: #dc2626; }
//         .fees-sub-title { color: #D4A24C; font-weight: 700; }
//         .fees-arrow { color: #D4A24C; font-weight: bold; }
//         .fees-fade-in { animation: fadeIn 0.4s ease; }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//       `}</style>
//     </div>
//   );
// }

// function FeesTable({ student, darkMode }) {
//   const history = student.feesHistory || [];
//   const totalPaid = history.reduce((sum, f) => sum + f.paid, 0);
//   const totalFees = history.reduce((sum, f) => sum + f.amount, 0);

//   return (
//     <div className="fees-table-container">
//       <div
//         className={`fees-profile-bar p-4 rounded-4 mb-4 ${darkMode ? "dark-bg" : "light-bg"}`}
//       >
//         <h3 className="fw-bold mb-3" style={{ color: "#D4A24C" }}>
//           {student.name}
//         </h3>
//         <div className="d-flex flex-wrap gap-4" style={{ fontSize: "14px" }}>
//           <span>
//             <strong>Roll:</strong> {student.rollNo}
//           </span>
//           <span>
//             <strong>Class:</strong> {student.class}
//           </span>
//           <span>
//             <strong>Father:</strong> {student.fatherName}
//           </span>
//           <span>
//             <strong>Email:</strong> {student.email}
//           </span>
//         </div>
//       </div>

//       <div className="row g-3 mb-4 text-center">
//         <div className="col-md-4">
//           <div className="fees-stat bg-success">
//             {" "}
//             <small>Paid</small> <h4>₹{totalPaid}</h4>{" "}
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="fees-stat bg-navy">
//             {" "}
//             <small>Total</small> <h4>₹{totalFees}</h4>{" "}
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="fees-stat bg-danger">
//             {" "}
//             <small>Pending</small> <h4>₹{totalFees - totalPaid}</h4>{" "}
//           </div>
//         </div>
//       </div>

//       <div
//         className={`fees-table-wrap rounded-4 shadow ${darkMode ? "dark-table" : ""}`}
//       >
//         <table
//           className={`table m-0 ${darkMode ? "table-dark" : "table-light table-striped"}`}
//         >
//           <thead style={{ background: "#0F4C6C", color: "#D4A24C" }}>
//             <tr>
//               <th className="p-3">Month</th>
//               <th className="p-3">Expected</th>
//               <th className="p-3">Paid</th>
//               <th className="p-3">Balance</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((f, i) => (
//               <tr key={i}>
//                 <td className="p-3 fw-bold text-info">{f.monthDisplay}</td>
//                 <td className="p-3">₹{f.amount}</td>
//                 <td className="p-3 text-success fw-bold">₹{f.paid}</td>
//                 <td className="p-3 text-danger">₹{f.amount - f.paid}</td>
//                 <td className="p-3">
//                   <span className={`fees-status-tag ${f.status.toLowerCase()}`}>
//                     {f.status}
//                   </span>
//                 </td>
//                 <td className="p-3 opacity-75">
//                   {f.date?.seconds
//                     ? new Date(f.date.seconds * 1000).toLocaleDateString()
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style>{`
//         .dark-bg { background: #0f172a !important; border: 1px solid #334155; color: white; }
//         .light-bg { background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0; }
//         .fees-stat { padding: 20px; border-radius: 16px; color: white; }
//         .bg-navy { background: #0F4C6C !important; }
//         .dark-table { border: 1px solid #334155; }
//         .fees-status-tag { font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; color: white !important; }
//         .fees-status-tag.completed { background: #16a34a !important; }
//         .fees-status-tag.partial { background: #f59e0b !important; }
//         .fees-status-tag.pending { background: #dc2626 !important; }
//       `}</style>
//     </div>
//   );
// }

// export default FeesHistory;
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { canAdminAction } from "../utils/adminRbac";

function sanitizeFilenamePart(s) {
  return String(s || "x")
    .replace(/[<>:"/\\|?*]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 48);
}

function downloadAdminFeeSlipPdf(student, row) {
  try {
    const docPdf = new jsPDF();
    docPdf.setFontSize(18);
    docPdf.setTextColor(15, 76, 108);
    docPdf.text("FEE PAYMENT RECEIPT", 105, 20, { align: "center" });

    docPdf.setFontSize(11);
    docPdf.setTextColor(0, 0, 0);
    let y = 34;
    docPdf.text(`Student Name: ${student.name || "N/A"}`, 14, y);
    y += 7;
    docPdf.text(`Father's Name: ${student.fatherName || "N/A"}`, 14, y);
    y += 7;
    docPdf.text(
      `Class: ${student.class ?? "N/A"}  |  Roll: ${student.rollNo ?? "N/A"}`,
      14,
      y,
    );
    y += 7;
    docPdf.text(
      `Registration no.: ${student.registrationNo ?? "N/A"}`,
      14,
      y,
    );
    y += 7;
    docPdf.text(`Email: ${student.email || "N/A"}`, 14, y);
    y += 7;
    docPdf.text(`Receipt generated: ${new Date().toLocaleString()}`, 14, y);

    const modeLabel = row.mode || "Admin panel";
    const receivedBy = row.receivedBy || "Admin";

    autoTable(docPdf, {
      startY: y + 10,
      head: [["Description", "Details"]],
      body: [
        ["Receipt No", row.lastReceiptNo || "—"],
        ["Payment ID", row.lastPaymentId || "—"],
        ["Billing month", row.monthDisplay || row.id || "N/A"],
        ["Amount due (month)", `INR ${row.amount}`],
        ["Amount paid", `INR ${row.paid}`],
        ["Balance", `INR ${Math.max(0, (Number(row.amount) || 0) - (Number(row.paid) || 0))}`],
        ["Status", String(row.status || "—")],
        [
          "Payment / record date",
          row.date?.seconds
            ? new Date(row.date.seconds * 1000).toLocaleString()
            : "—",
        ],
        ["Payment mode", modeLabel],
        ["Received / recorded by", receivedBy],
      ],
      theme: "striped",
      headStyles: { fillColor: [15, 76, 108] },
    });

    const finalY = docPdf.lastAutoTable.finalY + 15;
    docPdf.setFontSize(10);
    docPdf.setTextColor(150);
    docPdf.text(
      "This is a computer-generated receipt and requires no signature.",
      105,
      finalY,
      { align: "center" },
    );

    const base = sanitizeFilenamePart(
      `${student.name || "Student"}_${row.id || "month"}`,
    );
    docPdf.save(`FeeReceipt_${base}.pdf`);
  } catch (err) {
    console.error("PDF slip failed:", err);
  }
}

function FeesHistory({ darkMode, adminAccess = { role: "admin", perms: {} } }) {
  if (!canAdminAction(adminAccess, "fees", "history", true)) {
    return (
      <div className="p-4">
        <div className="alert alert-warning mb-0">
          Access denied: you do not have permission to view fee collection history.
        </div>
      </div>
    );
  }
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "students"),
      async (snapshot) => {
        const promises = snapshot.docs.map(async (docSnap) => {
          const student = docSnap.data();
          const feesRef = collection(db, "students", docSnap.id, "fees");
          const feesSnapshot = await getDocs(
            query(feesRef, orderBy("date", "desc")),
          );
          const feesArray = feesSnapshot.docs.map((f) => {
            const d = f.data() || {};
            let monthDisplay = f.id;
            if (f.id.includes("-")) {
              const dateObj = new Date(f.id + "-01");
              monthDisplay = dateObj.toLocaleString("default", {
                month: "long",
                year: "numeric",
              });
            }
            return {
              id: f.id,
              monthDisplay,
              amount: Number(d.amount) || 0,
              paid: Number(d.paid) || 0,
              status: d.status || "Pending",
              date: d.date || null,
              mode: d.mode || "",
              receivedBy: d.receivedBy || "",
              lastPaymentId: d.lastPaymentId || "",
              lastReceiptNo: d.lastReceiptNo || "",
            };
          });
          return { id: docSnap.id, ...student, feesHistory: feesArray };
        });
        const data = await Promise.all(promises);
        setStudents(data);
      },
    );
    return () => unsubscribe();
  }, []);

  const classOrder = [
    "nursery",
    "lkg",
    "ukg",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const classes = classOrder.filter((cls) =>
    students.some(
      (s) => String(s.class) === cls || String(s.class) === "+" + cls,
    ),
  );

  const filteredStudents = selectedClass
    ? students.filter(
        (s) =>
          String(s.class) === selectedClass ||
          String(s.class) === "+" + selectedClass,
      )
    : [];

  return (
    <div className="fees-history-root">
      <div className="fees-content-box">
        <h2 className="fees-main-title">Fees History Dashboard</h2>

        {!selectedClass && (
          <div className="fees-class-grid">
            {classes.map((cls) => (
              <div
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className="fees-class-item"
              >
                Class {cls}
              </div>
            ))}
          </div>
        )}

        {selectedClass && !selectedStudent && (
          <div className="fees-fade-in">
            <button
              onClick={() => setSelectedClass(null)}
              className="fees-back-btn"
            >
              ← Back to Classes
            </button>
            <h4 className="fees-sub-title mt-4">
              Students in Class {selectedClass}
            </h4>
            <div className="fees-student-list mt-3">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="fees-student-row"
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                      <h6 className="mb-0 fw-bold">{s.name}</h6>
                      <small>
                        Roll: {s.rollNo || "—"} · Reg.:{" "}
                        <span className="font-monospace">
                          {s.registrationNo || "—"}
                        </span>
                      </small>
                    </div>
                    <span className="fees-arrow">View History →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedStudent && (
          <div className="fees-fade-in">
            <button
              onClick={() => setSelectedStudent(null)}
              className="fees-back-btn danger mb-4"
            >
              ← Back to Students
            </button>
            <FeesTable student={selectedStudent} />
          </div>
        )}
      </div>

      <style>{`
        .fees-history-root { color: #1e293b; }
        .fees-content-box { background: transparent; padding: 10px; }
        .fees-main-title { text-align: center; color: #D4A24C; font-weight: 800; margin-bottom: 25px; }

        .fees-class-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; }
        .fees-class-item {
          background: #0F4C6C; color: #D4A24C; padding: 20px; border-radius: 14px;
          text-align: center; font-weight: 700; cursor: pointer; border: 1px solid #1B5E84; transition: 0.3s;
        }
        .fees-class-item:hover { background: #D4A24C; color: #0F4C6C; transform: scale(1.05); }

        .fees-student-row {
           padding: 18px; border-radius: 12px; margin-bottom: 12px; cursor: pointer;
           background: #f8f9fa; color: #1e293b; border: 1px solid #e2e8f0; transition: 0.3s;
        }
        .fees-student-row:hover { border-color: #D4A24C; transform: translateX(8px); background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .fees-back-btn { background: #475569; color: white; border: none; padding: 10px 22px; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .fees-back-btn.danger { background: #dc2626; }
        .fees-sub-title { color: #D4A24C; font-weight: 700; }
        .fees-arrow { color: #D4A24C; font-weight: bold; }
        .fees-fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function FeesTable({ student }) {
  const history = student.feesHistory || [];
  const totalPaid = history.reduce((sum, f) => sum + f.paid, 0);
  const totalFees = history.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="fees-table-container">
      <div className="fees-profile-bar p-4 rounded-4 mb-4 light-bg">
        <h3 className="fw-bold mb-3" style={{ color: "#D4A24C" }}>
          {student.name}
        </h3>
        <div className="d-flex flex-wrap gap-4" style={{ fontSize: "14px" }}>
          <span>
            <strong>Roll:</strong> {student.rollNo}
          </span>
          <span>
            <strong>Reg. no.:</strong>{" "}
            <span className="font-monospace">
              {student.registrationNo || "—"}
            </span>
          </span>
          <span>
            <strong>Class:</strong> {student.class}
          </span>
          <span>
            <strong>Father:</strong> {student.fatherName}
          </span>
          <span>
            <strong>Email:</strong> {student.email}
          </span>
        </div>
      </div>

      <div className="row g-3 mb-4 text-center">
        <div className="col-md-4">
          <div className="fees-stat bg-success">
            <small>Paid</small> <h4>₹{totalPaid}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="fees-stat bg-navy">
            <small>Total</small> <h4>₹{totalFees}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="fees-stat bg-danger">
            <small>Pending</small> <h4>₹{totalFees - totalPaid}</h4>
          </div>
        </div>
      </div>

      <div className="fees-table-wrap rounded-4 shadow-sm bg-white">
        <table className="table m-0 table-striped">
          <thead style={{ background: "#0F4C6C", color: "#D4A24C" }}>
            <tr>
              <th className="p-3">Month</th>
              <th className="p-3">Expected</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Balance</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Slip</th>
            </tr>
          </thead>
          <tbody>
            {history.map((f, i) => (
              <tr key={i}>
                <td className="p-3 fw-bold text-info">{f.monthDisplay}</td>
                <td className="p-3">₹{f.amount}</td>
                <td className="p-3 text-success fw-bold">₹{f.paid}</td>
                <td className="p-3 text-danger">₹{f.amount - f.paid}</td>
                <td className="p-3">
                  <span className={`fees-status-tag ${f.status.toLowerCase()}`}>
                    {f.status}
                  </span>
                </td>
                <td className="p-3 opacity-75">
                  {f.date?.seconds
                    ? new Date(f.date.seconds * 1000).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">
                  {Number(f.paid) > 0 ? (
                    <button
                      type="button"
                      className="btn btn-sm fees-slip-download-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAdminFeeSlipPdf(student, f);
                      }}
                    >
                      Download
                    </button>
                  ) : (
                    <span className="opacity-50 small">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .light-bg { background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0; }
        .fees-stat { padding: 20px; border-radius: 16px; color: white; }
        .bg-navy { background: #0F4C6C !important; }
        .fees-status-tag { font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; color: white !important; }
        .fees-status-tag.completed { background: #16a34a !important; }
        .fees-status-tag.partial { background: #f59e0b !important; }
        .fees-status-tag.pending { background: #dc2626 !important; }
        .fees-slip-download-btn {
          background: #D4A24C !important;
          color: #0f172a !important;
          border: none !important;
          font-weight: 700;
          border-radius: 8px;
          padding: 4px 10px;
        }
        .fees-slip-download-btn:hover { filter: brightness(1.08); }
      `}</style>
    </div>
  );
}

export default FeesHistory;
