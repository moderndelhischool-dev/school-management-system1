// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
//   Timestamp,
// } from "firebase/firestore";

// function StudentList({ darkMode }) {
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editStudent, setEditStudent] = useState(null);
//   const [deleteStudent, setDeleteStudent] = useState(null);

//   /* ================= LOAD STUDENTS ================= */

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

//   /* ================= FILTER ================= */

//   const classes = [...new Set(students.map((s) => s.class))];

//   const filteredStudents = students.filter((s) => {
//     const matchClass = selectedClass ? s.class === selectedClass : true;
//     const matchSearch =
//       s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.email?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchClass && matchSearch;
//   });

//   /* ================= UPDATE ================= */

//   const updateStudent = async () => {
//     const pendingFees =
//       Number(editStudent.totalFees) - Number(editStudent.paidFees);

//     await updateDoc(doc(db, "students", editStudent.id), {
//       ...editStudent,
//       totalFees: Number(editStudent.totalFees),
//       paidFees: Number(editStudent.paidFees),
//       pendingFees,
//       feeStatus: pendingFees === 0 ? "Completed" : "Pending",
//       feeDate: Timestamp.fromDate(new Date(editStudent.feeDate)),
//       updatedAt: Timestamp.now(),
//     });

//     alert("Student Updated Successfully");
//     setEditStudent(null);
//     loadStudents();
//   };

//   /* ================= DELETE ================= */

//   const confirmDelete = async () => {
//     await deleteDoc(doc(db, "students", deleteStudent.id));
//     setDeleteStudent(null);
//     loadStudents();
//   };

//   return (
//     <div className="container-fluid p-0">
//       {/* ================= CLASS FILTER ================= */}

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

//       {/* ================= SEARCH ================= */}

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="🔍 Search by name or email..."
//           className="form-control search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* ================= TABLE ================= */}

//       <div className="table-responsive">
//         <table
//           className={`table ${darkMode ? "table-dark" : "table-bordered"}`}
//         >
//           <thead className="purple-head">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Class</th>
//               <th>Total Fees</th>
//               <th>Pending</th>
//               <th>Status</th>
//               <th>Month</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredStudents.map((s, i) => (
//               <tr key={s.id}>
//                 <td>{i + 1}</td>
//                 <td>{s.name}</td>
//                 <td>{s.email || "—"}</td>
//                 <td>{s.class}</td>
//                 <td className="purple-text">₹ {s.totalFees}</td>
//                 <td className="text-danger">₹ {s.pendingFees}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       s.feeStatus === "Completed" ? "badge-purple" : "bg-danger"
//                     }`}
//                   >
//                     {s.feeStatus}
//                   </span>
//                 </td>
//                 <td>{s.month || "—"}</td>
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

//       {/* ================= EDIT FORM ================= */}

//       {editStudent && (
//         <div className="edit-card mt-4 p-4 shadow-lg">
//           <h5 className="mb-4">✏ Edit Student</h5>

//           <div className="row g-3">
//             <div className="col-md-6">
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.name}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, name: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-6">
//               <input
//                 className="form-control dark-input"
//                 value={editStudent.class}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, class: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-4">
//               <input
//                 type="number"
//                 className="form-control dark-input"
//                 value={editStudent.totalFees}
//                 onChange={(e) =>
//                   setEditStudent({
//                     ...editStudent,
//                     totalFees: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="col-md-4">
//               <input
//                 type="number"
//                 className="form-control dark-input"
//                 value={editStudent.paidFees}
//                 onChange={(e) =>
//                   setEditStudent({
//                     ...editStudent,
//                     paidFees: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="col-md-4">
//               <input
//                 type="date"
//                 className="form-control dark-input"
//                 value={editStudent.feeDate}
//                 onChange={(e) =>
//                   setEditStudent({
//                     ...editStudent,
//                     feeDate: e.target.value,
//                   })
//                 }
//               />
//             </div>
//           </div>

//           <div className="mt-4 d-flex gap-3">
//             <button className="btn update-btn" onClick={updateStudent}>
//               💾 Update
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

//       {/* ================= DELETE MODAL ================= */}

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

//       {/* ================= STYLES ================= */}

//       <style>{`

//       .class-box {
//         padding: 10px 18px;
//         border-radius: 12px;
//         cursor: pointer;
//         background: ${darkMode ? "#1e293b" : "#f3f4f6"};
//         color: ${darkMode ? "#ffffff" : "#111827"};
//         transition: 0.3s ease;
//       }

//       .class-box:hover {
//         background: linear-gradient(135deg,#7c3aed,#4c1d95);
//         color: white;
//       }

//       .active-box {
//         background: linear-gradient(135deg,#7c3aed,#4c1d95);
//         color: white;
//       }

//       .search-input {
//         background: ${darkMode ? "#1e293b" : "#ffffff"};
//         color: ${darkMode ? "#ffffff" : "#000000"};
//         border: 1px solid ${darkMode ? "#334155" : "#ced4da"};
//       }

//       .purple-head {
//         background: linear-gradient(90deg,#4c1d95,#7c3aed);
//         color: white;
//       }

//       .edit-btn {
//         background: linear-gradient(135deg,#8b5cf6,#6d28d9);
//         color: white;
//         border: none;
//       }

//       .delete-btn {
//         background: linear-gradient(135deg,#dc2626,#991b1b);
//         color: white;
//         border: none;
//       }

//       .edit-card {
//         background: ${darkMode ? "#0f172a" : "#ffffff"};
//         color: ${darkMode ? "#ffffff" : "#000000"};
//         border-radius: 18px;
//       }

//       .dark-input {
//         background: ${darkMode ? "#1e293b" : "#ffffff"};
//         color: ${darkMode ? "#ffffff" : "#000000"};
//         border: 1px solid ${darkMode ? "#334155" : "#ced4da"};
//       }

//       .update-btn {
//         background: linear-gradient(135deg,#7c3aed,#4c1d95);
//         color: white;
//         border: none;
//         padding: 8px 20px;
//       }

//       .cancel-btn {
//         background: ${darkMode ? "#334155" : "#e5e7eb"};
//         color: ${darkMode ? "#ffffff" : "#000000"};
//         border: none;
//       }

//       .delete-overlay {
//         position: fixed;
//         top:0;
//         left:0;
//         width:100%;
//         height:100%;
//         background: rgba(0,0,0,0.6);
//         display:flex;
//         align-items:center;
//         justify-content:center;
//       }

//       .delete-modal {
//         background: ${darkMode ? "#0f172a" : "#ffffff"};
//         color: ${darkMode ? "#ffffff" : "#000000"};
//         padding: 30px;
//         border-radius: 16px;
//       }

//       .purple-text {
//         color:#7c3aed !important;
//       }

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
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

function StudentList({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

  /* ================= LOAD ================= */

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

  /* ================= FILTER ================= */

  const classes = [...new Set(students.map((s) => s.class))];

  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClass ? s.class === selectedClass : true;

    const matchSearch =
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.fatherName?.toLowerCase().includes(searchTerm.toLowerCase()) || // ✅ NEW
      s.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchClass && matchSearch;
  });

  /* ================= UPDATE ================= */

  const updateStudent = async () => {
    const pendingFees =
      Number(editStudent.totalFees) - Number(editStudent.paidFees);

    await updateDoc(doc(db, "students", editStudent.id), {
      ...editStudent,
      totalFees: Number(editStudent.totalFees),
      paidFees: Number(editStudent.paidFees),
      pendingFees,
      feeStatus: pendingFees === 0 ? "Completed" : "Pending",
      feeDate: editStudent.feeDate
        ? Timestamp.fromDate(new Date(editStudent.feeDate))
        : null,
      updatedAt: Timestamp.now(),
    });

    alert("Student Updated Successfully");
    setEditStudent(null);
    loadStudents();
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "students", deleteStudent.id));
    setDeleteStudent(null);
    loadStudents();
  };

  return (
    <div className="container-fluid p-0">
      {/* ================= CLASS BOXES ================= */}

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

      {/* ================= SEARCH ================= */}

      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name, father name or email..."
          className="form-control search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}

      <div className="table-responsive">
        <table
          className={`table ${darkMode ? "table-dark" : "table-bordered"}`}
        >
          <thead className="purple-head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Father Name</th> {/* ✅ NEW COLUMN */}
              <th>Email</th>
              <th>Class</th>
              <th>Total</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.fatherName || "—"}</td> {/* ✅ SHOW */}
                <td>{s.email || "—"}</td>
                <td>{s.class}</td>
                <td className="purple-text">₹ {s.totalFees}</td>
                <td className="text-danger">₹ {s.pendingFees}</td>
                <td>
                  <span
                    className={`badge ${
                      s.feeStatus === "Completed" ? "badge-purple" : "bg-danger"
                    }`}
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

      {/* ================= EDIT FORM ================= */}

      {editStudent && (
        <div className="edit-card mt-4 p-4 shadow-lg">
          <h5 className="mb-4">✏ Edit Student</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control dark-input"
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
            </div>

            {/* ✅ FATHER NAME EDIT */}
            <div className="col-md-6">
              <input
                className="form-control dark-input"
                value={editStudent.fatherName || ""}
                placeholder="Father Name"
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    fatherName: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control dark-input"
                value={editStudent.class}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, class: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.totalFees}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    totalFees: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.paidFees}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    paidFees: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mt-4 d-flex gap-3">
            <button className="btn update-btn" onClick={updateStudent}>
              💾 Update
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

      {/* ================= DELETE MODAL ================= */}

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

      {/* ================= STYLES ================= */}

      <style>{`
      .class-box {
        padding: 10px 18px;
        border-radius: 12px;
        cursor: pointer;
        background: ${darkMode ? "#1e293b" : "#f3f4f6"};
        color: ${darkMode ? "#ffffff" : "#111827"};
        transition: 0.3s ease;
      }

      .active-box,
      .class-box:hover {
        background: linear-gradient(135deg,#7c3aed,#4c1d95);
        color: white;
      }

      .search-input {
        background: ${darkMode ? "#1e293b" : "#ffffff"};
        color: ${darkMode ? "#ffffff" : "#000000"};
        border: 1px solid ${darkMode ? "#334155" : "#ced4da"};
      }

      .purple-head {
        background: linear-gradient(90deg,#4c1d95,#7c3aed);
        color: white;
      }

      .edit-btn {
        background: linear-gradient(135deg,#8b5cf6,#6d28d9);
        color: white;
        border: none;
      }

      .delete-btn {
        background: linear-gradient(135deg,#dc2626,#991b1b);
        color: white;
        border: none;
      }

      .edit-card {
        background: ${darkMode ? "#0f172a" : "#ffffff"};
        color: ${darkMode ? "#ffffff" : "#000000"};
        border-radius: 18px;
      }

      .dark-input {
        background: ${darkMode ? "#1e293b" : "#ffffff"};
        color: ${darkMode ? "#ffffff" : "#000000"};
        border: 1px solid ${darkMode ? "#334155" : "#ced4da"};
      }

      .update-btn {
        background: linear-gradient(135deg,#7c3aed,#4c1d95);
        color: white;
        border: none;
        padding: 8px 20px;
      }

      .cancel-btn {
        background: ${darkMode ? "#334155" : "#e5e7eb"};
        color: ${darkMode ? "#ffffff" : "#000000"};
        border: none;
      }

      .delete-overlay {
        position: fixed;
        inset:0;
        background: rgba(0,0,0,0.6);
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .delete-modal {
        background: ${darkMode ? "#0f172a" : "#ffffff"};
        color: ${darkMode ? "#ffffff" : "#000000"};
        padding: 30px;
        border-radius: 16px;
      }

      .purple-text {
        color:#7c3aed !important;
      }
      `}</style>
    </div>
  );
}

export default StudentList;
