// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   setDoc, // Naya import for fees history
//   deleteDoc,
//   Timestamp,
// } from "firebase/firestore";

// function StudentList({ darkMode }) {
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editStudent, setEditStudent] = useState(null);
//   const [deleteStudent, setDeleteStudent] = useState(null);

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

//   const classes = [...new Set(students.map((s) => s.class))];

//   const filteredStudents = students.filter((s) => {
//     const matchClass = selectedClass ? s.class === selectedClass : true;
//     const matchSearch =
//       (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (s.fatherName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (s.email || "").toLowerCase().includes(searchTerm.toLowerCase());
//     return matchClass && matchSearch;
//   });

//   /* ================= SAFE UPDATE WITH HISTORY ================= */
//   const updateStudent = async () => {
//     const total = Number(editStudent.totalFees) || 0;
//     let paid = Number(editStudent.paidFees) || 0;

//     if (paid > total) paid = total;
//     if (paid < 0) paid = 0;

//     const pendingFees = Math.max(total - paid, 0);
//     const status =
//       pendingFees === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

//     // 1. Update Main Student Document
//     const studentRef = doc(db, "students", editStudent.id);
//     await updateDoc(studentRef, {
//       ...editStudent,
//       totalFees: total,
//       paidFees: paid,
//       pendingFees,
//       feeStatus: status,
//       feeDate: editStudent.feeDate
//         ? Timestamp.fromDate(new Date(editStudent.feeDate))
//         : null,
//       updatedAt: Timestamp.now(),
//     });

//     // 2. Update Fees History Sub-collection
//     // Hum month format ko "YYYY-MM" jaisa banate hain taaki History sort ho sake
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
//           status: status,
//           date: editStudent.feeDate
//             ? Timestamp.fromDate(new Date(editStudent.feeDate))
//             : Timestamp.now(),
//           updatedAt: Timestamp.now(),
//         },
//         { merge: true },
//       ); // merge: true se purana data delete nahi hoga
//     }

//     alert("Student Details & Fees History Updated!");
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
//       {/* CLASS BOXES */}
//       <div className="mb-4 d-flex flex-wrap gap-3">
//         <div
//           className={`class-box ${selectedClass === null ? "active-box" : ""}`}
//           onClick={() => setSelectedClass(null)}
//         >
//           All
//         </div>

//         {classes.map((cls) => (
//           <div
//             key={cls}
//             className={`class-box ${selectedClass === cls ? "active-box" : ""}`}
//             onClick={() => setSelectedClass(cls)}
//           >
//             Class {cls}
//           </div>
//         ))}
//       </div>

//       {/* SEARCH */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="🔍 Search by name, father name or email..."
//           className="form-control search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* TABLE */}
//       <div className="table-responsive">
//         <table className={`table ${darkMode ? "table-dark" : ""}`}>
//           <thead className="blue-head">
//             <tr>
//               <th>#</th>
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
//             {filteredStudents.map((s, i) => (
//               <tr key={s.id}>
//                 <td>{i + 1}</td>
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

//       {/* EDIT FORM */}
//       {editStudent && (
//         <div className="edit-card mt-4 p-4 shadow-lg">
//           <h5 className="mb-4">✏ Edit Student & Fees History</h5>
//           <div className="row g-3">
//             <div className="col-md-4">
//               <label className="small mb-1">Name</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.name}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small mb-1">Father Name</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.fatherName || ""}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, fatherName: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small mb-1">Email</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.email || ""}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, email: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-4">
//               <label className="small mb-1">Fee Month (Update History)</label>
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
//                 <option value="">Select Month</option>
//                 {months.map((m) => (
//                   <option key={m} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="col-md-4">
//               <label className="small mb-1">Fee Date</label>
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
//               <label className="small mb-1">Class</label>
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.class}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, class: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="small mb-1">Total Fees</label>
//               <input
//                 type="number"
//                 className="form-control dark-input"
//                 value={editStudent.totalFees}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, totalFees: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="small mb-1">Paid Fees</label>
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
//               💾 Update Everything
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

//       {/* DELETE MODAL */}
//       {deleteStudent && (
//         <div className="delete-overlay">
//           <div className="delete-modal shadow-lg">
//             <h6>Confirm Delete</h6>
//             <p>Delete {deleteStudent.name}?</p>
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
//         .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; transition:0.3s ease; }
//         .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
//         .blue-head { background:linear-gradient(90deg,#0F4C6C,#1B5E84); color:white; }
//         .blue-text { color:#0F4C6C; font-weight:600; }
//         .gold-text { color:#D4A24C; font-weight:600; }
//         .badge-complete { background:#D4A24C; color:#0F4C6C; }
//         .badge-pending { background:#dc2626; color:white; }
//         .edit-btn, .update-btn { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:white; border:none; }
//         .delete-btn { background:linear-gradient(135deg,#dc2626,#991b1b); color:white; border:none; }
//         .cancel-btn { background:${darkMode ? "#334155" : "#e5e7eb"}; color:${darkMode ? "#ffffff" : "#000000"}; border:none; }
//         .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; color:${darkMode ? "#ffffff" : "#000000"}; border-radius:18px; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; animation:fadeIn 0.3s ease; }
//         .delete-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index: 1000; }
//         .delete-modal { background:${darkMode ? "#1B2A35" : "#ffffff"}; color:${darkMode ? "#ffffff" : "#000000"}; padding:30px; border-radius:16px; }
//         @keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
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
  setDoc, // Naya import for fees history
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

function StudentList({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

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

  const classes = [...new Set(students.map((s) => s.class))];

  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClass ? s.class === selectedClass : true;
    const matchSearch =
      (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.fatherName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.rollNo || "").toString().includes(searchTerm) || // Added Roll No search
      (s.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchClass && matchSearch;
  });

  /* ================= SAFE UPDATE WITH HISTORY ================= */
  const updateStudent = async () => {
    const total = Number(editStudent.totalFees) || 0;
    let paid = Number(editStudent.paidFees) || 0;

    if (paid > total) paid = total;
    if (paid < 0) paid = 0;

    const pendingFees = Math.max(total - paid, 0);
    const status =
      pendingFees === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

    // 1. Update Main Student Document
    const studentRef = doc(db, "students", editStudent.id);
    await updateDoc(studentRef, {
      ...editStudent,
      rollNo: editStudent.rollNo || "", // Added rollNo to Firestore update
      totalFees: total,
      paidFees: paid,
      pendingFees,
      feeStatus: status,
      feeDate: editStudent.feeDate
        ? Timestamp.fromDate(new Date(editStudent.feeDate))
        : null,
      updatedAt: Timestamp.now(),
    });

    // 2. Update Fees History Sub-collection
    if (editStudent.selectedMonth) {
      const currentYear = new Date().getFullYear();
      const monthIndex = months.indexOf(editStudent.selectedMonth) + 1;
      const monthId = `${currentYear}-${monthIndex.toString().padStart(2, "0")}`;

      const historyRef = doc(db, "students", editStudent.id, "fees", monthId);

      await setDoc(
        historyRef,
        {
          amount: total,
          paid: paid,
          status: status,
          date: editStudent.feeDate
            ? Timestamp.fromDate(new Date(editStudent.feeDate))
            : Timestamp.now(),
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );
    }

    alert("Student Details & Fees History Updated!");
    setEditStudent(null);
    loadStudents();
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "students", deleteStudent.id));
    setDeleteStudent(null);
    loadStudents();
  };

  return (
    <div className="container-fluid p-0">
      {/* CLASS BOXES */}
      <div className="mb-4 d-flex flex-wrap gap-3">
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

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by Roll No, name, father name..."
          className="form-control search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className={`table ${darkMode ? "table-dark" : ""}`}>
          <thead className="blue-head">
            <tr>
              <th>Roll No</th> {/* Changed # to Roll No */}
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
                <td>{s.rollNo || "—"}</td> {/* Display Roll No */}
                <td>{s.name}</td>
                <td>{s.fatherName || "—"}</td>
                <td>{s.email || "—"}</td>
                <td>{s.class}</td>
                <td>
                  <span className="text-info">{s.selectedMonth || "—"}</span>
                </td>
                <td>
                  {s.feeDate
                    ? new Date(s.feeDate.seconds * 1000).toLocaleDateString()
                    : "—"}
                </td>
                <td className="blue-text">₹ {s.totalFees}</td>
                <td className="gold-text">₹ {s.pendingFees}</td>
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

      {/* EDIT FORM */}
      {editStudent && (
        <div className="edit-card mt-4 p-4 shadow-lg">
          <h5 className="mb-4">✏ Edit Student & Fees History</h5>
          <div className="row g-3">
            {/* Added Roll Number Field */}
            <div className="col-md-12">
              <label className="small mb-1 fw-bold">Roll Number</label>
              <input
                className="form-control dark-input"
                placeholder="Enter Roll No"
                value={editStudent.rollNo || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, rollNo: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small mb-1">Name</label>
              <input
                className="form-control dark-input"
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small mb-1">Father Name</label>
              <input
                className="form-control dark-input"
                value={editStudent.fatherName || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, fatherName: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small mb-1">Email</label>
              <input
                className="form-control dark-input"
                value={editStudent.email || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small mb-1">Fee Month (Update History)</label>
              <select
                className="form-control dark-input"
                value={editStudent.selectedMonth || ""}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    selectedMonth: e.target.value,
                  })
                }
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="small mb-1">Fee Date</label>
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
              <label className="small mb-1">Class</label>
              <input
                className="form-control dark-input"
                value={editStudent.class}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, class: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="small mb-1">Total Fees</label>
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.totalFees}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, totalFees: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="small mb-1">Paid Fees</label>
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
              💾 Update Everything
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

      {/* DELETE MODAL */}
      {deleteStudent && (
        <div className="delete-overlay">
          <div className="delete-modal shadow-lg">
            <h6>Confirm Delete</h6>
            <p>Delete {deleteStudent.name}?</p>
            <div className="d-flex gap-3 mt-3">
              <button
                className="btn cancel-btn"
                onClick={() => setDeleteStudent(null)}
              >
                Cancel
              </button>
              <button className="btn delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .class-box { padding:10px 18px; border-radius:12px; cursor:pointer; background:${darkMode ? "#1B2A35" : "#F4F6F8"}; color:${darkMode ? "#ffffff" : "#0F4C6C"}; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; transition:0.3s ease; }
        .active-box, .class-box:hover { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:#D4A24C; }
        .blue-head { background:linear-gradient(90deg,#0F4C6C,#1B5E84); color:white; }
        .blue-text { color:#0F4C6C; font-weight:600; }
        .gold-text { color:#D4A24C; font-weight:600; }
        .badge-complete { background:#D4A24C; color:#0F4C6C; }
        .badge-pending { background:#dc2626; color:white; }
        .edit-btn, .update-btn { background:linear-gradient(135deg,#0F4C6C,#1B5E84); color:white; border:none; }
        .delete-btn { background:linear-gradient(135deg,#dc2626,#991b1b); color:white; border:none; }
        .cancel-btn { background:${darkMode ? "#334155" : "#e5e7eb"}; color:${darkMode ? "#ffffff" : "#000000"}; border:none; }
        .edit-card { background:${darkMode ? "#1B2A35" : "#ffffff"}; color:${darkMode ? "#ffffff" : "#000000"}; border-radius:18px; border:1px solid ${darkMode ? "#243644" : "#E5E7EB"}; animation:fadeIn 0.3s ease; }
        .delete-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index: 1000; }
        .delete-modal { background:${darkMode ? "#1B2A35" : "#ffffff"}; color:${darkMode ? "#ffffff" : "#000000"}; padding:30px; border-radius:16px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

export default StudentList;
