// function FeesTable({ students, darkMode }) {
//   const student = students?.[0];

//   if (!student) return <p>No Student Selected</p>;

//   // ✅ FIXED SORT (IMPORTANT)
//   const sortedFees = [...(student.feesHistory || [])]
//     .filter((f) => f && f.month)
//     .sort((a, b) => {
//       const [y1, m1] = b.month.split("-");
//       const [y2, m2] = a.month.split("-");
//       return new Date(y1, m1 - 1) - new Date(y2, m2 - 1);
//     });

//   const totalPaid = sortedFees.reduce(
//     (sum, f) => sum + (Number(f.paid) || 0),
//     0,
//   );

//   const totalAmount = sortedFees.reduce(
//     (sum, f) => sum + (Number(f.amount) || 0),
//     0,
//   );

//   const totalPending = totalAmount - totalPaid;

//   return (
//     <div className={`table-container ${darkMode ? "dark" : "light"}`}>
//       {/* HEADER */}
//       <div className={`student-header ${darkMode ? "dark" : "light"}`}>
//         <h5>{student.name}</h5>
//         <p>👨 {student.fatherName || "—"}</p>
//         <p>📧 {student.email || "—"}</p>
//         <p>🎓 Class: {student.class || "—"}</p>
//       </div>

//       {/* SUMMARY */}
//       <div className="summary-grid">
//         <div className="summary-card paid">
//           <h6>Total Paid</h6>
//           <p>₹{totalPaid}</p>
//         </div>

//         <div className="summary-card total">
//           <h6>Total Fees</h6>
//           <p>₹{totalAmount}</p>
//         </div>

//         <div className="summary-card pending">
//           <h6>Pending</h6>
//           <p>₹{totalPending}</p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="table-wrapper">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Month</th>
//               <th>Paid</th>
//               <th>Total</th>
//               <th>Pending</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Previous</th>
//             </tr>
//           </thead>

//           <tbody>
//             {sortedFees.length === 0 ? (
//               <tr>
//                 <td colSpan="8">No History Found</td>
//               </tr>
//             ) : (
//               sortedFees.map((f, index) => {
//                 const prev = sortedFees[index + 1];

//                 const paid = Number(f.paid) || 0;
//                 const amount = Number(f.amount) || 0;
//                 const pending = amount - paid;

//                 let statusClass = "status-pending";
//                 if (f.status === "Completed") statusClass = "status-complete";
//                 else if (f.status === "Partial") statusClass = "status-partial";

//                 return (
//                   <tr key={index}>
//                     <td>{index + 1}</td>

//                     <td className="month-cell">{f.month}</td>

//                     <td>₹{paid}</td>

//                     <td>₹{amount}</td>

//                     <td className="pending-cell">₹{pending}</td>

//                     {/* ✅ DATE FIX (ALREADY CORRECT) */}
//                     <td>
//                       {f.date?.seconds
//                         ? new Date(f.date.seconds * 1000).toLocaleDateString()
//                         : "-"}
//                     </td>

//                     <td className={`fw-bold ${statusClass}`}>
//                       {f.status || "Pending"}
//                     </td>

//                     <td>
//                       {prev && prev.status ? (
//                         <span
//                           className={
//                             prev.status === "Completed"
//                               ? "prev-paid"
//                               : "prev-pending"
//                           }
//                         >
//                           {prev.status === "Completed"
//                             ? "✅ Paid"
//                             : "❌ Pending"}
//                         </span>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       <style>{`

// .table-container{
//   border-radius:16px;
//   padding:12px;
//   transition:0.3s;
// }

// .table-container.light{
//   background:#ffffff;
// }

// .table-container.dark{
//   background:#0f172a;
//   color:#f1f5f9;
// }

// .student-header{
//   padding:15px;
//   border-radius:12px;
//   margin-bottom:15px;
// }

// .student-header.light{
//   background:#f1f5f9;
// }

// .student-header.dark{
//   background:#1e293b;
//   border:1px solid #334155;
// }

// .summary-grid{
//   display:grid;
//   grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
//   gap:12px;
//   margin-bottom:15px;
// }

// .summary-card{
//   padding:14px;
//   border-radius:12px;
//   text-align:center;
//   font-weight:600;
// }

// .summary-card.paid{
//   background:#16a34a;
//   color:white;
// }

// .summary-card.total{
//   background:#0F4C6C;
//   color:white;
// }

// .summary-card.pending{
//   background:#dc2626;
//   color:white;
// }

// .table-wrapper{
//   overflow-x:auto;
// }

// .custom-table{
//   width:100%;
//   border-collapse:collapse;
// }

// .custom-table th{
//   background:#D4A24C;
//   color:white;
// }

// .custom-table th,
// .custom-table td{
//   padding:10px;
//   text-align:center;
// }

// .table-container.dark tr{
//   border-bottom:1px solid #334155;
// }

// .custom-table tr:hover{
//   background:rgba(212,162,76,0.2);
// }

// .month-cell{
//   font-weight:600;
// }

// .pending-cell{
//   color:#dc2626;
//   font-weight:600;
// }

// .status-complete{
//   color:#16a34a;
// }

// .status-partial{
//   color:#f59e0b;
// }

// .status-pending{
//   color:#dc2626;
// }

// .prev-paid{
//   color:#16a34a;
//   font-weight:600;
// }

// .prev-pending{
//   color:#dc2626;
//   font-weight:600;
// }

// `}</style>
//     </div>
//   );
// }

// export default FeesTable;
function FeesTable({ students, darkMode }) {
  const student = students?.[0];

  if (!student) return <p className="text-center p-5">No Student Selected</p>;

  // ✅ FIXED SORT: Latest month upar dikhega
  const sortedFees = [...(student.feesHistory || [])]
    .filter((f) => f && f.month)
    .sort((a, b) => {
      const [y1, m1] = b.month.split("-");
      const [y2, m2] = a.month.split("-");
      return new Date(y1, m1 - 1) - new Date(y2, m2 - 1);
    });

  const totalPaid = sortedFees.reduce(
    (sum, f) => sum + (Number(f.paid) || 0),
    0,
  );
  const totalAmount = sortedFees.reduce(
    (sum, f) => sum + (Number(f.amount) || 0),
    0,
  );
  const totalPending = totalAmount - totalPaid;

  return (
    <div className={`table-container ${darkMode ? "dark" : "light"}`}>
      {/* HEADER: Student details block */}
      <div className={`student-header ${darkMode ? "dark-sub" : "light-sub"}`}>
        <h4 className="name-title">{student.name}</h4>
        <div className="info-row">
          <span>👨 {student.fatherName || "—"}</span>
          <span>📧 {student.email || "—"}</span>
          <span>🎓 Class: {student.class || "—"}</span>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="summary-card paid shadow-sm">
          <small>Total Paid</small>
          <h5>₹{totalPaid}</h5>
        </div>
        <div className="summary-card total shadow-sm">
          <small>Total Fees</small>
          <h5>₹{totalAmount}</h5>
        </div>
        <div className="summary-card pending shadow-sm">
          <small>Pending</small>
          <h5>₹{totalPending}</h5>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="table-wrapper mt-3">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Paid</th>
              <th>Total</th>
              <th>Pending</th>
              <th>Date</th>
              <th>Status</th>
              <th>Previous</th>
            </tr>
          </thead>
          <tbody>
            {sortedFees.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4">
                  No History Found
                </td>
              </tr>
            ) : (
              sortedFees.map((f, index) => {
                const prev = sortedFees[index + 1];
                const paid = Number(f.paid) || 0;
                const amount = Number(f.amount) || 0;
                const pending = amount - paid;

                let statusClass = "status-pending";
                if (f.status === "Completed") statusClass = "status-complete";
                else if (f.status === "Partial") statusClass = "status-partial";

                return (
                  <tr key={index} className={darkMode ? "dark-row" : ""}>
                    <td className="month-cell">{f.month}</td>
                    <td>₹{paid}</td>
                    <td>₹{amount}</td>
                    <td className="pending-cell">₹{pending}</td>
                    <td>
                      {f.date?.seconds
                        ? new Date(f.date.seconds * 1000).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className={`fw-bold ${statusClass}`}>
                      {f.status || "Pending"}
                    </td>
                    <td>
                      {prev ? (
                        <span
                          className={
                            prev.status === "Completed"
                              ? "prev-paid"
                              : "prev-pending"
                          }
                        >
                          {prev.status === "Completed" ? "Paid" : "Due"}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-container { padding: 10px; border-radius: 12px; }
        
        /* Sub-Header Styling */
        .student-header { padding: 20px; border-radius: 12px; margin-bottom: 20px; }
        .student-header.dark-sub { background: #243644; color: #fff; border: 1px solid #334155; }
        .student-header.light-sub { background: #f8f9fa; color: #000; }
        .name-title { color: #D4A24C; font-weight: 700; margin-bottom: 10px; }
        .info-row { display: flex; gap: 20px; font-size: 14px; opacity: 0.9; flex-wrap: wrap; }

        /* Stats Cards */
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px; margin-bottom: 20px; }
        .summary-card { padding: 15px; border-radius: 12px; text-align: center; color: white; }
        .summary-card h5 { margin: 0; font-weight: 700; }
        .summary-card.paid { background: #16a34a; }
        .summary-card.total { background: #0F4C6C; }
        .summary-card.pending { background: #dc2626; }

        /* Table Design */
        .table-wrapper { overflow-x: auto; border-radius: 10px; }
        .custom-table { width: 100%; border-collapse: collapse; min-width: 600px; }
        .custom-table th { background: #0F4C6C; color: white; padding: 12px; text-align: center; font-size: 14px; }
        .custom-table td { padding: 12px; text-align: center; font-size: 14px; border-bottom: 1px solid #ddd; }
        
        /* Dark Mode Table Fixes */
        .dark .custom-table td { border-bottom: 1px solid #334155; color: #f1f5f9; }
        .dark-row:hover { background: rgba(212, 162, 76, 0.1) !important; }
        
        .month-cell { font-weight: 600; color: #D4A24C; }
        .pending-cell { color: #dc2626; font-weight: 600; }
        .status-complete { color: #16a34a; }
        .status-partial { color: #f59e0b; }
        .status-pending { color: #dc2626; }
        .prev-paid { color: #16a34a; font-weight: bold; }
        .prev-pending { color: #dc2626; font-weight: bold; }
      `}</style>
    </div>
  );
}

export default FeesTable;
