// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   writeBatch,
//   setDoc,
//   deleteDoc,
//   Timestamp,
// } from "firebase/firestore";

// function StudentList({ darkMode }) {
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editStudent, setEditStudent] = useState(null);
//   const [deleteStudent, setDeleteStudent] = useState(null);
//   const [updatingAll, setUpdatingAll] = useState(false);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const loadStudents = async () => {
//     const snap = await getDocs(collection(db, "students"));
//     const data = snap.docs.map((d) => ({
//       id: d.id,
//       ...d.data(),
//     }));
//     setStudents(data);
//   };

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   /* ================= BULK UPDATE: MOVING COMPLETED TO NEXT MONTH ================= */
//   const handleBulkNextMonth = async () => {
//     const completedStudents = students.filter(
//       (s) => s.feeStatus === "Completed",
//     );
//     if (completedStudents.length === 0) {
//       alert("No 'Completed' students found!");
//       return;
//     }

//     if (
//       !window.confirm(
//         `${completedStudents.length} students ko next month shift karein?`,
//       )
//     )
//       return;

//     setUpdatingAll(true);
//     const batch = writeBatch(db);

//     completedStudents.forEach((s) => {
//       const currentIndex = months.indexOf(s.selectedMonth);
//       const nextIndex = (currentIndex + 1) % 12;
//       const nextMonthName = months[nextIndex];

//       const studentRef = doc(db, "students", s.id);
//       batch.update(studentRef, {
//         selectedMonth: nextMonthName,
//         paidFees: 0,
//         pendingFees: Number(s.totalFees) || 0,
//         feeStatus: "Pending",
//         updatedAt: Timestamp.now(),
//       });
//     });

//     try {
//       await batch.commit();
//       alert(`✅ Success! ${completedStudents.length} students updated.`);
//       loadStudents();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error updating students.");
//     } finally {
//       setUpdatingAll(false);
//     }
//   };

//   const classes = [...new Set(students.map((s) => s.class))];

//   const filteredStudents = students.filter((s) => {
//     const matchClass = selectedClass ? s.class === selectedClass : true;
//     const matchSearch =
//       (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (s.fatherName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (s.rollNo || "").toString().includes(searchTerm) ||
//       (s.email || "").toLowerCase().includes(searchTerm.toLowerCase());
//     return matchClass && matchSearch;
//   });

//   /* ================= SAFE UPDATE WITH HISTORY & AUTO-SHIFT ================= */
//   const updateStudent = async () => {
//     const total = Number(editStudent.totalFees) || 0;
//     let paid = Number(editStudent.paidFees) || 0;

//     if (paid > total) paid = total;
//     if (paid < 0) paid = 0;

//     const pendingFees = Math.max(total - paid, 0);
//     const status =
//       pendingFees === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

//     let finalMonth = editStudent.selectedMonth;
//     let finalPaid = paid;
//     let finalPending = pendingFees;
//     let finalStatus = status;

//     if (status === "Completed") {
//       const idx = months.indexOf(editStudent.selectedMonth);
//       finalMonth = months[(idx + 1) % 12];
//       finalPaid = 0;
//       finalPending = total;
//       finalStatus = "Pending";
//     }

//     const studentRef = doc(db, "students", editStudent.id);
//     await updateDoc(studentRef, {
//       ...editStudent,
//       rollNo: editStudent.rollNo || "",
//       totalFees: total,
//       paidFees: finalPaid,
//       pendingFees: finalPending,
//       feeStatus: finalStatus,
//       selectedMonth: finalMonth,
//       feeDate: editStudent.feeDate
//         ? Timestamp.fromDate(new Date(editStudent.feeDate))
//         : null,
//       updatedAt: Timestamp.now(),
//     });

//     if (editStudent.selectedMonth) {
//       const currentYear = new Date().getFullYear();
//       const monthIndex = months.indexOf(editStudent.selectedMonth) + 1;
//       const monthId = `${currentYear}-${monthIndex.toString().padStart(2, "0")}`;
//       const historyRef = doc(db, "students", editStudent.id, "fees", monthId);

//       await setDoc(
//         historyRef,
//         {
//           amount: total,
//           paid: paid,
//           status: "Completed",
//           month: editStudent.selectedMonth,
//           date: editStudent.feeDate
//             ? Timestamp.fromDate(new Date(editStudent.feeDate))
//             : Timestamp.now(),
//           updatedAt: Timestamp.now(),
//         },
//         { merge: true },
//       );
//     }

//     alert("✅ Student Details & History Updated!");
//     setEditStudent(null);
//     loadStudents();
//   };

//   const confirmDelete = async () => {
//     await deleteDoc(doc(db, "students", deleteStudent.id));
//     setDeleteStudent(null);
//     loadStudents();
//   };

//   return (
//     <div className="container-fluid p-0">
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div className="d-flex flex-wrap gap-3">
//           <div
//             className={`class-box ${selectedClass === null ? "active-box" : ""}`}
//             onClick={() => setSelectedClass(null)}
//           >
//             All
//           </div>
//           {classes.map((cls) => (
//             <div
//               key={cls}
//               className={`class-box ${selectedClass === cls ? "active-box" : ""}`}
//               onClick={() => setSelectedClass(cls)}
//             >
//               Class {cls}
//             </div>
//           ))}
//         </div>
//         <button
//           className="btn bulk-update-btn"
//           onClick={handleBulkNextMonth}
//           disabled={updatingAll}
//         >
//           {updatingAll ? "⏳ Updating..." : "🚀 Move Completed to Next Month"}
//         </button>
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="🔍 Search Roll No, Name, Father Name, Email..."
//           className="form-control search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="table-responsive">
//         <table className={`table ${darkMode ? "table-dark" : ""}`}>
//           <thead className="blue-head">
//             <tr>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Father Name</th>
//               <th>Email</th>
//               <th>Class</th>
//               <th>Month</th>
//               <th>Date</th>
//               <th>Total</th>
//               <th>Pending</th>
//               <th>Status</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((s) => (
//               <tr key={s.id}>
//                 <td>{s.rollNo || "—"}</td>
//                 <td>{s.name}</td>
//                 <td>{s.fatherName || "—"}</td>
//                 <td>{s.email || "—"}</td>
//                 <td>{s.class}</td>
//                 <td>
//                   <span className="text-info">{s.selectedMonth || "—"}</span>
//                 </td>
//                 <td>
//                   {s.feeDate
//                     ? new Date(s.feeDate.seconds * 1000).toLocaleDateString()
//                     : "—"}
//                 </td>
//                 <td className="blue-text">₹ {s.totalFees}</td>
//                 <td className="gold-text">₹ {s.pendingFees}</td>
//                 <td>
//                   <span
//                     className={`badge ${s.feeStatus === "Completed" ? "badge-complete" : "badge-pending"}`}
//                   >
//                     {s.feeStatus}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm edit-btn"
//                     onClick={() =>
//                       setEditStudent({
//                         ...s,
//                         feeDate: s.feeDate
//                           ? s.feeDate.toDate().toISOString().split("T")[0]
//                           : "",
//                       })
//                     }
//                   >
//                     ✏ Edit
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm delete-btn"
//                     onClick={() => setDeleteStudent(s)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {editStudent && (
//         <div className="edit-card mt-4 p-4 shadow-lg">
//           <h5 className="mb-4">✏ Edit Student & Fees</h5>
//           <div className="row g-3">
//             <div className="col-md-4">
//               <label className="small fw-bold">Roll Number</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.rollNo || ""}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, rollNo: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Name</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.name}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Father Name</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.fatherName || ""}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, fatherName: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Email</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.email || ""}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, email: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Fee Month</label>
//               <select
//                 className="form-control dark-input"
//                 value={editStudent.selectedMonth || ""}
//                 onChange={(e) =>
//                   setEditStudent({
//                     ...editStudent,
//                     selectedMonth: e.target.value,
//                   })
//                 }
//               >
//                 {months.map((m) => (
//                   <option key={m} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Fee Date</label>
//               <input
//                 type="date"
//                 className="form-control dark-input"
//                 value={editStudent.feeDate || ""}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, feeDate: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Class</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.class}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, class: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Total Fees</label>
//               <input
//                 type="number"
//                 className="form-control dark-input"
//                 value={editStudent.totalFees}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, totalFees: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold">Paid Fees</label>
//               <input
//                 type="number"
//                 className="form-control dark-input"
//                 value={editStudent.paidFees}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, paidFees: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <div className="mt-4 d-flex gap-3">
//             <button className="btn update-btn" onClick={updateStudent}>
//               💾 Save All Changes
//             </button>
//             <button
//               className="btn cancel-btn"
//               onClick={() => setEditStudent(null)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {deleteStudent && (
//         <div className="delete-overlay">
//           <div className="delete-modal shadow-lg">
//             <h6>Delete {deleteStudent.name}?</h6>
//             <div className="d-flex gap-3 mt-3">
//               <button
//                 className="btn cancel-btn"
//                 onClick={() => setDeleteStudent(null)}
//               >
//                 Cancel
//               </button>
//               <button className="btn delete-btn" onClick={confirmDelete}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; }
//         .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
//         .bulk-update-btn { background: #D4A24C; color: #0F4C6C; font-weight: bold; border:none; padding:10px 20px; border-radius:12px; cursor:pointer; }
//         .blue-head { background:#0F4C6C; color:white; }
//         .blue-text { color:#0F4C6C; font-weight:600; }
//         .gold-text { color:#D4A24C; font-weight:600; }
//         .badge-complete { background:#D4A24C; color:#0F4C6C; }
//         .badge-pending { background:#dc2626; color:white; }
//         .edit-btn, .update-btn { background:#0F4C6C; color:white; border:none; cursor:pointer; }
//         .delete-btn { background:#dc2626; color:white; border:none; cursor:pointer; }
//         .cancel-btn {
//           background: ${darkMode ? "#475569" : "#e2e8f0"};
//           color: ${darkMode ? "#ffffff" : "#1e293b"};
//           border: none;
//           padding: 8px 16px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-weight: 500;
//         }
//         .cancel-btn:hover { background: ${darkMode ? "#64748b" : "#cbd5e1"}; }
//         .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; border-radius:18px; border:1px solid #243644; }
//         .delete-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:1000; }
//         .dark-input { background: ${darkMode ? "#0f172a" : "#ffffff"}; color: ${darkMode ? "#ffffff" : "#000000"}; border: 1px solid ${darkMode ? "#334155" : "#cccccc"}; }
//       `}</style>
//     </div>
//   );
// }

// export default StudentList;
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
  setDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import Swal from "sweetalert2"; // 🔥 Professional Popups

function StudentList({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [updatingAll, setUpdatingAll] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const loadStudents = async () => {
    const snap = await getDocs(collection(db, "students"));
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  /* ================= PROFESSIONAL BULK UPDATE ================= */
  const handleBulkNextMonth = async () => {
    const completedStudents = students.filter(
      (s) => s.feeStatus === "Completed",
    );

    if (completedStudents.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Students Found",
        text: 'Filhal kisi bhi student ki fees "Completed" nahi hai.',
        background: darkMode ? "#1e293b" : "#fff",
        color: darkMode ? "#fff" : "#000",
        confirmButtonColor: "#D4A24C",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${completedStudents.length} students ko agle mahine par shift karein?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F4C6C",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Move Them!",
      background: darkMode ? "#1e293b" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      setUpdatingAll(true);
      const batch = writeBatch(db);

      completedStudents.forEach((s) => {
        const currentIndex = months.indexOf(s.selectedMonth);
        const nextIndex = (currentIndex + 1) % 12;
        const nextMonthName = months[nextIndex];

        const studentRef = doc(db, "students", s.id);
        batch.update(studentRef, {
          selectedMonth: nextMonthName,
          paidFees: 0,
          pendingFees: Number(s.totalFees) || 0,
          feeStatus: "Pending",
          updatedAt: Timestamp.now(),
        });
      });

      try {
        await batch.commit();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Saare students agle mahine par move ho gaye hain.",
          timer: 2000,
          showConfirmButton: false,
          background: darkMode ? "#1e293b" : "#fff",
          color: darkMode ? "#fff" : "#000",
        });
        loadStudents();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Kuch galat ho gaya!",
        });
      } finally {
        setUpdatingAll(false);
      }
    }
  };

  /* ================= SINGLE UPDATE LOGIC ================= */
  const updateStudent = async () => {
    const total = Number(editStudent.totalFees) || 0;
    let paid = Number(editStudent.paidFees) || 0;

    if (paid > total) paid = total;
    if (paid < 0) paid = 0;

    const pendingFees = Math.max(total - paid, 0);
    const status =
      pendingFees === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

    let finalMonth = editStudent.selectedMonth;
    let finalPaid = paid;
    let finalPending = pendingFees;
    let finalStatus = status;

    if (status === "Completed") {
      const idx = months.indexOf(editStudent.selectedMonth);
      finalMonth = months[(idx + 1) % 12];
      finalPaid = 0;
      finalPending = total;
      finalStatus = "Pending";
    }

    try {
      const studentRef = doc(db, "students", editStudent.id);
      await updateDoc(studentRef, {
        ...editStudent,
        totalFees: total,
        paidFees: finalPaid,
        pendingFees: finalPending,
        feeStatus: finalStatus,
        selectedMonth: finalMonth,
        feeDate: editStudent.feeDate
          ? Timestamp.fromDate(new Date(editStudent.feeDate))
          : null,
        updatedAt: Timestamp.now(),
      });

      // Fees History Entry
      if (editStudent.selectedMonth) {
        const monthId = `${new Date().getFullYear()}-${(months.indexOf(editStudent.selectedMonth) + 1).toString().padStart(2, "0")}`;
        const historyRef = doc(db, "students", editStudent.id, "fees", monthId);
        await setDoc(
          historyRef,
          {
            amount: total,
            paid: paid,
            status: "Completed",
            month: editStudent.selectedMonth,
            date: Timestamp.now(),
            updatedAt: Timestamp.now(),
          },
          { merge: true },
        );
      }

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Details successfully save ho gayi hain.",
        timer: 1500,
        showConfirmButton: false,
        background: darkMode ? "#1e293b" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
      setEditStudent(null);
      loadStudents();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Update fail ho gaya!",
      });
    }
  };

  const classes = [...new Set(students.map((s) => s.class))];
  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClass ? s.class === selectedClass : true;
    const matchSearch =
      (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.rollNo || "").toString().includes(searchTerm);
    return matchClass && matchSearch;
  });

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div className="d-flex flex-wrap gap-2">
          <div
            className={`class-box ${selectedClass === null ? "active-box" : ""}`}
            onClick={() => setSelectedClass(null)}
          >
            All
          </div>
          {classes.map((cls) => (
            <div
              key={cls}
              className={`class-box ${selectedClass === cls ? "active-box" : ""}`}
              onClick={() => setSelectedClass(cls)}
            >
              Class {cls}
            </div>
          ))}
        </div>
        <button
          className="btn bulk-update-btn"
          onClick={handleBulkNextMonth}
          disabled={updatingAll}
        >
          {updatingAll ? "⏳ Processing..." : " Move Completed to Next Month"}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search Roll No, Name, Email..."
          className="form-control search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className={`table ${darkMode ? "table-dark" : ""}`}>
          <thead className="blue-head">
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Month</th>
              <th>Date</th>
              <th>Total</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.rollNo || "—"}</td>
                <td>{s.name}</td>
                <td>{s.fatherName || "—"}</td>
                <td>{s.email || "—"}</td>
                <td>{s.class}</td>
                <td>
                  <span className="text-info">{s.selectedMonth}</span>
                </td>
                <td>
                  {s.feeDate
                    ? new Date(s.feeDate.seconds * 1000).toLocaleDateString()
                    : "—"}
                </td>
                <td className="blue-text">₹{s.totalFees}</td>
                <td className="gold-text">₹{s.pendingFees}</td>
                <td>
                  <span
                    className={`badge ${s.feeStatus === "Completed" ? "badge-complete" : "badge-pending"}`}
                  >
                    {s.feeStatus}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm edit-btn"
                    onClick={() =>
                      setEditStudent({
                        ...s,
                        feeDate: s.feeDate
                          ? s.feeDate.toDate().toISOString().split("T")[0]
                          : "",
                      })
                    }
                  >
                    ✏ Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm delete-btn"
                    onClick={() => setDeleteStudent(s)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editStudent && (
        <div className="edit-card mt-4 p-4 shadow-lg">
          <h5 className="mb-4">✏ Edit Student Details</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="small fw-bold">Roll No</label>
              <input
                className="form-control dark-input"
                value={editStudent.rollNo || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, rollNo: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Name</label>
              <input
                className="form-control dark-input"
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Father Name</label>
              <input
                className="form-control dark-input"
                value={editStudent.fatherName || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, fatherName: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Email</label>
              <input
                className="form-control dark-input"
                value={editStudent.email || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Fee Month</label>
              <select
                className="form-control dark-input"
                value={editStudent.selectedMonth}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    selectedMonth: e.target.value,
                  })
                }
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Fee Date</label>
              <input
                type="date"
                className="form-control dark-input"
                value={editStudent.feeDate || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, feeDate: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Class</label>
              <input
                className="form-control dark-input"
                value={editStudent.class}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, class: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Total Fees</label>
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.totalFees}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, totalFees: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Paid Fees</label>
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.paidFees}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, paidFees: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4 d-flex gap-3">
            <button className="btn update-btn" onClick={updateStudent}>
              💾 Save Changes
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => setEditStudent(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; transition:0.3s; }
        .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
        .bulk-update-btn { background: #D4A24C; color: #0F4C6C; font-weight: bold; border:none; padding:12px 24px; border-radius:12px; box-shadow: 0 4px 15px rgba(212,162,76,0.3); transition: 0.3s; }
        .bulk-update-btn:hover { transform: scale(1.05); background: #C18F2D; }
        .blue-head { background:#0F4C6C; color:white; }
        .blue-text { color:#0F4C6C; font-weight:600; }
        .gold-text { color:#D4A24C; font-weight:600; }
        .badge-complete { background:#D4A24C; color:#0F4C6C; }
        .badge-pending { background:#dc2626; color:white; }
        .edit-btn, .update-btn { background:#0F4C6C; color:white; border:none; border-radius: 8px; }
        .delete-btn { background:#dc2626; color:white; border:none; border-radius: 8px; }
        .cancel-btn { background: ${darkMode ? "#475569" : "#cbd5e1"}; color: ${darkMode ? "#fff" : "#1e293b"}; border:none; padding: 10px 20px; border-radius: 8px; font-weight: 600; }
        .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; border-radius:20px; border:1px solid #243644; }
        .dark-input { background: ${darkMode ? "#0f172a" : "#fff"}; color: ${darkMode ? "#fff" : "#000"}; border: 1px solid ${darkMode ? "#334155" : "#ccc"}; }
      `}</style>
    </div>
  );
}

export default StudentList;
