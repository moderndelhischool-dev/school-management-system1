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
// import Swal from "sweetalert2"; // 🔥 Professional Popups

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

//   /* ================= PROFESSIONAL BULK UPDATE ================= */
//   const handleBulkNextMonth = async () => {
//     const completedStudents = students.filter(
//       (s) => s.feeStatus === "Completed",
//     );

//     if (completedStudents.length === 0) {
//       Swal.fire({
//         icon: "info",
//         title: "No Students Found",
//         text: 'Filhal kisi bhi student ki fees "Completed" nahi hai.',
//         background: darkMode ? "#1e293b" : "#fff",
//         color: darkMode ? "#fff" : "#000",
//         confirmButtonColor: "#D4A24C",
//       });
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: `${completedStudents.length} students ko agle mahine par shift karein?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#0F4C6C",
//       cancelButtonColor: "#dc2626",
//       confirmButtonText: "Yes, Move Them!",
//       background: darkMode ? "#1e293b" : "#fff",
//       color: darkMode ? "#fff" : "#000",
//     });

//     if (result.isConfirmed) {
//       setUpdatingAll(true);
//       const batch = writeBatch(db);

//       completedStudents.forEach((s) => {
//         const currentIndex = months.indexOf(s.selectedMonth);
//         const nextIndex = (currentIndex + 1) % 12;
//         const nextMonthName = months[nextIndex];

//         const studentRef = doc(db, "students", s.id);
//         batch.update(studentRef, {
//           selectedMonth: nextMonthName,
//           paidFees: 0,
//           pendingFees: Number(s.totalFees) || 0,
//           feeStatus: "Pending",
//           updatedAt: Timestamp.now(),
//         });
//       });

//       try {
//         await batch.commit();
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Saare students agle mahine par move ho gaye hain.",
//           timer: 2000,
//           showConfirmButton: false,
//           background: darkMode ? "#1e293b" : "#fff",
//           color: darkMode ? "#fff" : "#000",
//         });
//         loadStudents();
//       } catch (err) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Kuch galat ho gaya!",
//         });
//       } finally {
//         setUpdatingAll(false);
//       }
//     }
//   };

//   /* ================= SINGLE UPDATE LOGIC ================= */
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

//     try {
//       const studentRef = doc(db, "students", editStudent.id);
//       await updateDoc(studentRef, {
//         ...editStudent,
//         totalFees: total,
//         paidFees: finalPaid,
//         pendingFees: finalPending,
//         feeStatus: finalStatus,
//         selectedMonth: finalMonth,
//         feeDate: editStudent.feeDate
//           ? Timestamp.fromDate(new Date(editStudent.feeDate))
//           : null,
//         updatedAt: Timestamp.now(),
//       });

//       // Fees History Entry
//       if (editStudent.selectedMonth) {
//         const monthId = `${new Date().getFullYear()}-${(months.indexOf(editStudent.selectedMonth) + 1).toString().padStart(2, "0")}`;
//         const historyRef = doc(db, "students", editStudent.id, "fees", monthId);
//         await setDoc(
//           historyRef,
//           {
//             amount: total,
//             paid: paid,
//             status: "Completed",
//             month: editStudent.selectedMonth,
//             date: Timestamp.now(),
//             updatedAt: Timestamp.now(),
//           },
//           { merge: true },
//         );
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: "Details successfully save ho gayi hain.",
//         timer: 1500,
//         showConfirmButton: false,
//         background: darkMode ? "#1e293b" : "#fff",
//         color: darkMode ? "#fff" : "#000",
//       });
//       setEditStudent(null);
//       loadStudents();
//     } catch (e) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Update fail ho gaya!",
//       });
//     }
//   };

//   const classes = [...new Set(students.map((s) => s.class))];
//   const filteredStudents = students.filter((s) => {
//     const matchClass = selectedClass ? s.class === selectedClass : true;
//     const matchSearch =
//       (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (s.rollNo || "").toString().includes(searchTerm);
//     return matchClass && matchSearch;
//   });

//   return (
//     <div className="container-fluid p-0">
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div className="d-flex flex-wrap gap-2">
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
//           {updatingAll ? "⏳ Processing..." : " Move Completed to Next Month"}
//         </button>
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="🔍 Search Roll No, Name, Email..."
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
//                   <span className="text-info">{s.selectedMonth}</span>
//                 </td>
//                 <td>
//                   {s.feeDate
//                     ? new Date(s.feeDate.seconds * 1000).toLocaleDateString()
//                     : "—"}
//                 </td>
//                 <td className="blue-text">₹{s.totalFees}</td>
//                 <td className="gold-text">₹{s.pendingFees}</td>
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
//           <h5 className="mb-4">✏ Edit Student Details</h5>
//           <div className="row g-3">
//             <div className="col-md-4">
//               <label className="small fw-bold">Roll No</label>
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
//                 value={editStudent.selectedMonth}
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
//               💾 Save Changes
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

//       <style>{`
//         .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; transition:0.3s; }
//         .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
//         .bulk-update-btn { background: #D4A24C; color: #0F4C6C; font-weight: bold; border:none; padding:12px 24px; border-radius:12px; box-shadow: 0 4px 15px rgba(212,162,76,0.3); transition: 0.3s; }
//         .bulk-update-btn:hover { transform: scale(1.05); background: #C18F2D; }
//         .blue-head { background:#0F4C6C; color:white; }
//         .blue-text { color:#0F4C6C; font-weight:600; }
//         .gold-text { color:#D4A24C; font-weight:600; }
//         .badge-complete { background:#D4A24C; color:#0F4C6C; }
//         .badge-pending { background:#dc2626; color:white; }
//         .edit-btn, .update-btn { background:#0F4C6C; color:white; border:none; border-radius: 8px; }
//         .delete-btn { background:#dc2626; color:white; border:none; border-radius: 8px; }
//         .cancel-btn { background: ${darkMode ? "#475569" : "#cbd5e1"}; color: ${darkMode ? "#fff" : "#1e293b"}; border:none; padding: 10px 20px; border-radius: 8px; font-weight: 600; }
//         .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; border-radius:20px; border:1px solid #243644; }
//         .dark-input { background: ${darkMode ? "#0f172a" : "#fff"}; color: ${darkMode ? "#fff" : "#000"}; border: 1px solid ${darkMode ? "#334155" : "#ccc"}; }
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
import Swal from "sweetalert2";

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

  /* ================= FIXED BULK UPDATE (Dual History Entry) ================= */
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
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${completedStudents.length} students ko agle mahine shift karein aur History update karein?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F4C6C",
      confirmButtonText: "Yes, Move Them!",
      background: darkMode ? "#1e293b" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      setUpdatingAll(true);
      const batch = writeBatch(db);
      const currentYear = new Date().getFullYear();

      completedStudents.forEach((s) => {
        const currentIndex = months.indexOf(s.selectedMonth);
        const nextIndex = (currentIndex + 1) % 12;
        const nextMonthName = months[nextIndex];

        // 1. PURANE MAHINE KI HISTORY (Mark as Completed)
        const oldMonthId = `${currentYear}-${(currentIndex + 1).toString().padStart(2, "0")}`;
        const oldHistoryRef = doc(db, "students", s.id, "fees", oldMonthId);
        batch.set(
          oldHistoryRef,
          {
            amount: Number(s.totalFees) || 0,
            paid: Number(s.totalFees) || 0,
            status: "Completed",
            month: s.selectedMonth,
            date: Timestamp.now(),
          },
          { merge: true },
        );

        // 2. NAYE MAHINE KI HISTORY (Mark as Pending)
        const nextMonthId = `${currentYear}-${(nextIndex + 1).toString().padStart(2, "0")}`;
        const nextHistoryRef = doc(db, "students", s.id, "fees", nextMonthId);
        batch.set(
          nextHistoryRef,
          {
            amount: Number(s.totalFees) || 0,
            paid: 0,
            status: "Pending",
            month: nextMonthName,
            date: Timestamp.now(),
          },
          { merge: true },
        );

        // 3. MAIN STUDENT DOC UPDATE
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
          title: "History Updated!",
          text: "Purani fees Complete aur naye mahine ki Pending show ho jayegi.",
        });
        loadStudents();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Process fail ho gaya!",
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

    try {
      const studentRef = doc(db, "students", editStudent.id);
      await updateDoc(studentRef, {
        ...editStudent,
        totalFees: total,
        paidFees: paid,
        pendingFees: pendingFees,
        feeStatus: status,
        feeDate: editStudent.feeDate
          ? Timestamp.fromDate(new Date(editStudent.feeDate))
          : null,
        updatedAt: Timestamp.now(),
      });

      const monthId = `${new Date().getFullYear()}-${(months.indexOf(editStudent.selectedMonth) + 1).toString().padStart(2, "0")}`;
      const historyRef = doc(db, "students", editStudent.id, "fees", monthId);
      await setDoc(
        historyRef,
        {
          amount: total,
          paid: paid,
          status: status,
          month: editStudent.selectedMonth,
          date: Timestamp.now(),
        },
        { merge: true },
      );

      Swal.fire({ icon: "success", title: "Updated!" });
      setEditStudent(null);
      loadStudents();
    } catch (e) {
      Swal.fire({ icon: "error", title: "Update failed!" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "students", deleteStudent.id));
      setDeleteStudent(null);
      loadStudents();
      Swal.fire("Deleted!", "", "success");
    } catch (e) {
      Swal.fire("Error", "Delete failed", "error");
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
          {updatingAll ? "⏳ Processing..." : "Move Completed to Next Month"}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search..."
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

      {deleteStudent && (
        <div className="modal-overlay">
          <div className={`custom-modal ${darkMode ? "dark" : ""}`}>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteStudent.name}</strong>?
            </p>
            <button onClick={handleDelete} className="btn btn-danger me-2">
              Delete
            </button>
            <button
              onClick={() => setDeleteStudent(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* <style>{`
        .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; }
        .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
        .bulk-update-btn { background: #D4A24C; color: #0F4C6C; font-weight: bold; border:none; padding:12px 24px; border-radius:12px; }
        .blue-head { background:#0F4C6C; color:white; }
        .badge-complete { background:#D4A24C; color:#0F4C6C; }
        .badge-pending { background:#dc2626; color:white; }
        .edit-btn, .update-btn { background:#0F4C6C; color:white; border:none; border-radius: 8px; padding: 6px 12px; }
        .delete-btn { background:#dc2626; color:white; border:none; border-radius: 8px; padding: 6px 12px; }
        .cancel-btn { background: #cbd5e1; color: #1e293b; border:none; padding: 10px 20px; border-radius: 8px; font-weight: 600; }
        .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; border-radius:20px; border:1px solid #243644; }
        .dark-input { background: ${darkMode ? "#0f172a" : "#fff"}; color: ${darkMode ? "#fff" : "#000"}; border: 1px solid ${darkMode ? "#334155" : "#ccc"}; }
        .modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1000; }
        .custom-modal { background:white; padding:20px; border-radius:12px; }
      `}</style> */}
      <style>{`
  .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; }
  .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
  .bulk-update-btn { background: #D4A24C; color: #0F4C6C; font-weight: bold; border:none; padding:12px 24px; border-radius:12px; }
  .blue-head { background:#0F4C6C; color:white; }
  .badge-complete { background:#D4A24C; color:#0F4C6C; }
  .badge-pending { background:#dc2626; color:white; }
  .edit-btn, .update-btn { background:#0F4C6C; color:white; border:none; border-radius: 8px; padding: 6px 12px; }
  .delete-btn { background:#dc2626; color:white; border:none; border-radius: 8px; padding: 6px 12px; }
  .cancel-btn { background: #cbd5e1; color: #1e293b; border:none; padding: 10px 20px; border-radius: 8px; font-weight: 600; }
  .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; border-radius:20px; border:1px solid #243644; }
  .dark-input { background: ${darkMode ? "#0f172a" : "#fff"}; color: ${darkMode ? "#fff" : "#000"}; border: 1px solid ${darkMode ? "#334155" : "#ccc"}; }
  
  /* Modal Fixes */
  .modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:1000; }
  .custom-modal { background: white; padding: 30px; border-radius: 15px; text-align: center; min-width: 300px; color: #000; }
  
  /* Dark Mode specific style for the modal */
  .custom-modal.dark { 
    background: #1e293b; 
    color: #ffffff; 
    border: 1px solid #334155; 
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  }
`}</style>
    </div>
  );
}

export default StudentList;
