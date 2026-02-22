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
//   const [editStudent, setEditStudent] = useState(null);
//   const [deleteStudent, setDeleteStudent] = useState(null);

//   /* ================= CALENDAR ================= */

//   const today = new Date();
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();

//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const monthName = currentDate.toLocaleString("en-IN", {
//     month: "long",
//   });

//   const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
//   const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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

//   /* ================= CLASS FILTER ================= */

//   const classOrder = (cls) => {
//     if (cls === "+1") return 11;
//     if (cls === "+2") return 12;
//     return parseInt(cls);
//   };

//   const classes = [...new Set(students.map((s) => s.class))].sort(
//     (a, b) => classOrder(a) - classOrder(b),
//   );

//   const filteredStudents = selectedClass
//     ? students.filter((s) => s.class === selectedClass)
//     : students;

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

//     alert("✅ Student Updated");
//     setEditStudent(null);
//     loadStudents();
//   };

//   /* ================= DELETE ================= */

//   const confirmDelete = async () => {
//     await deleteDoc(doc(db, "students", deleteStudent.id));
//     setDeleteStudent(null);
//     loadStudents();
//   };

//   /* ================= STYLES ================= */

//   const cardStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#111827",
//     borderRadius: "16px",
//     border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
//   };

//   const inputStyle = {
//     backgroundColor: darkMode ? "#1e293b" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#000000",
//     border: darkMode ? "1px solid #334155" : "1px solid #ced4da",
//   };

//   return (
//     <div className="container-fluid p-0">
//       {/* ================= CALENDAR ================= */}
//       <div className="mb-5">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <button
//             className="btn btn-outline-success btn-sm"
//             onClick={prevMonth}
//           >
//             ◀ Prev
//           </button>

//           <h4 className="fw-bold m-0">
//             📅 {monthName} {year}
//           </h4>

//           <button
//             className="btn btn-outline-success btn-sm"
//             onClick={nextMonth}
//           >
//             Next ▶
//           </button>
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(7,1fr)",
//             gap: "10px",
//           }}
//         >
//           {[...Array(firstDay)].map((_, i) => (
//             <div key={"empty" + i}></div>
//           ))}

//           {[...Array(daysInMonth)].map((_, index) => {
//             const date = index + 1;

//             const isToday =
//               date === today.getDate() &&
//               month === today.getMonth() &&
//               year === today.getFullYear();

//             return (
//               <div
//                 key={date}
//                 style={{
//                   padding: "12px",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                   background: isToday
//                     ? "linear-gradient(135deg,#22c55e,#16a34a)"
//                     : darkMode
//                       ? "#1e293b"
//                       : "#f1f5f9",
//                   color: isToday ? "#fff" : darkMode ? "#fff" : "#000",
//                   fontWeight: isToday ? "600" : "normal",
//                 }}
//               >
//                 {date}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ================= CLASS FILTER ================= */}

//       <div className="row mb-4">
//         {classes.map((cls) => (
//           <div key={cls} className="col-6 col-md-3 mb-3">
//             <div
//               className="card text-center p-3 shadow-sm"
//               style={{ ...cardStyle, cursor: "pointer" }}
//               onClick={() => setSelectedClass(cls)}
//             >
//               <h6>Class {cls}</h6>
//               <small>
//                 {students.filter((s) => s.class === cls).length} students
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedClass && (
//         <button
//           className="btn btn-secondary btn-sm mb-3"
//           onClick={() => setSelectedClass(null)}
//         >
//           ⬅ Back
//         </button>
//       )}

//       {/* ================= TABLE ================= */}

//       <div className="table-responsive">
//         <table
//           className={`table ${darkMode ? "table-dark" : "table-bordered"}`}
//         >
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th> {/* ✅ Added */}
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
//                 <td>{s.email || "—"}</td> {/* ✅ Added */}
//                 <td>{s.class}</td>
//                 <td className="fw-semibold text-primary">₹ {s.totalFees}</td>
//                 <td className="text-danger fw-semibold">₹ {s.pendingFees}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       s.feeStatus === "Completed" ? "bg-success" : "bg-danger"
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
//                     className="btn btn-danger btn-sm"
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

//       {/* EDIT FORM (UNCHANGED) */}

//       {editStudent && (
//         <div className="card mt-4 p-4 shadow edit-card" style={cardStyle}>
//           <h5 className="mb-4 text-warning fw-bold">✏ Edit Student Details</h5>

//           <div className="row g-3">
//             <div className="col-md-6">
//               <input
//                 className="form-control custom-input"
//                 style={inputStyle}
//                 value={editStudent.name}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, name: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-6">
//               <input
//                 className="form-control custom-input"
//                 style={inputStyle}
//                 value={editStudent.class}
//                 onChange={(e) =>
//                   setEditStudent({ ...editStudent, class: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-4">
//               <input
//                 type="number"
//                 className="form-control custom-input"
//                 style={inputStyle}
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
//                 className="form-control custom-input"
//                 style={inputStyle}
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
//                 className="form-control custom-input"
//                 style={inputStyle}
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

//           <div className="mt-4">
//             <button
//               className="btn btn-success me-2 px-4"
//               onClick={updateStudent}
//             >
//               💾 Update
//             </button>

//             <button
//               className="btn btn-outline-secondary px-4"
//               onClick={() => setEditStudent(null)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* DELETE MODAL (UNCHANGED) */}

//       {deleteStudent && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
//         >
//           <div className="p-4 rounded shadow" style={cardStyle}>
//             <h6 className="text-danger">Confirm Delete</h6>
//             <p>Delete {deleteStudent.name}?</p>

//             <div className="d-flex gap-2">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setDeleteStudent(null)}
//               >
//                 Cancel
//               </button>

//               <button className="btn btn-danger" onClick={confirmDelete}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .edit-btn {
//           background: linear-gradient(135deg,#3b82f6,#2563eb);
//           color: white;
//           border: none;
//           transition: 0.3s;
//         }

//         .edit-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.2);
//         }
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
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

  /* ================= CALENDAR ================= */

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("en-IN", {
    month: "long",
  });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  /* ================= LOAD STUDENTS ================= */

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

  /* ================= CLASS FILTER ================= */

  const classOrder = (cls) => {
    if (cls === "+1") return 11;
    if (cls === "+2") return 12;
    return parseInt(cls);
  };

  const classes = [...new Set(students.map((s) => s.class))].sort(
    (a, b) => classOrder(a) - classOrder(b),
  );

  const filteredStudents = selectedClass
    ? students.filter((s) => s.class === selectedClass)
    : students;

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
      feeDate: Timestamp.fromDate(new Date(editStudent.feeDate)),
      updatedAt: Timestamp.now(),
    });

    alert("✅ Student Updated");
    setEditStudent(null);
    loadStudents();
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "students", deleteStudent.id));
    setDeleteStudent(null);
    loadStudents();
  };

  /* ================= STYLES ================= */

  const cardStyle = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    borderRadius: "16px",
    border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    border: darkMode ? "1px solid #334155" : "1px solid #ced4da",
  };

  return (
    <div className="container-fluid p-0">
      {/* ================= CALENDAR ================= */}

      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-sm purple-outline" onClick={prevMonth}>
            ◀ Prev
          </button>

          <h4 className="fw-bold m-0">
            📅 {monthName} {year}
          </h4>

          <button className="btn btn-sm purple-outline" onClick={nextMonth}>
            Next ▶
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: "10px",
          }}
        >
          {[...Array(firstDay)].map((_, i) => (
            <div key={"empty" + i}></div>
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const date = index + 1;

            const isToday =
              date === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={date}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  textAlign: "center",
                  background: isToday
                    ? "linear-gradient(135deg,#7c3aed,#4c1d95)"
                    : darkMode
                      ? "#1e293b"
                      : "#f1f5f9",
                  color: isToday ? "#fff" : darkMode ? "#fff" : "#000",
                  fontWeight: isToday ? "600" : "normal",
                }}
              >
                {date}
              </div>
            );
          })}
        </div>
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
              <th>Email</th>
              <th>Class</th>
              <th>Total Fees</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Month</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.email || "—"}</td>
                <td>{s.class}</td>
                <td className="fw-semibold purple-text">₹ {s.totalFees}</td>
                <td className="text-danger fw-semibold">₹ {s.pendingFees}</td>
                <td>
                  <span
                    className={`badge ${
                      s.feeStatus === "Completed" ? "badge-purple" : "bg-danger"
                    }`}
                  >
                    {s.feeStatus}
                  </span>
                </td>
                <td>{s.month || "—"}</td>
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
                    className="btn btn-danger btn-sm"
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

      {/* ================= EDIT FORM (UNCHANGED LOGIC) ================= */}

      {editStudent && (
        <div className="card mt-4 p-4 shadow edit-card" style={cardStyle}>
          <h5 className="mb-4 text-purple fw-bold">✏ Edit Student Details</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                style={inputStyle}
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                style={inputStyle}
                value={editStudent.class}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, class: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                style={inputStyle}
                value={editStudent.totalFees}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    totalFees: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                style={inputStyle}
                value={editStudent.paidFees}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    paidFees: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                style={inputStyle}
                value={editStudent.feeDate}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    feeDate: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              className="btn purple-btn me-2 px-4"
              onClick={updateStudent}
            >
              💾 Update
            </button>

            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => setEditStudent(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      {deleteStudent && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div className="p-4 rounded shadow" style={cardStyle}>
            <h6 className="text-danger">Confirm Delete</h6>
            <p>Delete {deleteStudent.name}?</p>

            <div className="d-flex gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteStudent(null)}
              >
                Cancel
              </button>

              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .purple-outline {
          border: 1px solid #7c3aed;
          color: #7c3aed;
          background: transparent;
        }

        .purple-outline:hover {
          background: #7c3aed;
          color: white;
        }

        .purple-text {
          color: #7c3aed !important;
        }

        .badge-purple {
          background: #7c3aed !important;
        }

        .purple-btn {
          background: linear-gradient(135deg,#7c3aed,#4c1d95);
          color: white;
          border: none;
        }

        .purple-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(124,58,237,0.4);
        }

        .edit-btn {
          background: linear-gradient(135deg,#8b5cf6,#6d28d9);
          color: white;
          border: none;
        }

        .purple-head {
          background: linear-gradient(90deg,#4c1d95,#7c3aed);
          color: white;
        }

        .text-purple {
          color: #7c3aed !important;
        }
      `}</style>
    </div>
  );
}

export default StudentList;
