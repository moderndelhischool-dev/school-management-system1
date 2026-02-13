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

// function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
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

//   /* ================= CLASS SORT ================= */
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

//   /* ================= VALIDATION ================= */
//   const isEditFormValid =
//     editStudent &&
//     editStudent.name &&
//     editStudent.class &&
//     editStudent.totalFees !== "" &&
//     editStudent.paidFees !== "" &&
//     editStudent.feeDate;

//   /* ================= UPDATE STUDENT ================= */
//   const updateStudent = async () => {
//     if (!isEditFormValid) return;

//     const pendingFees =
//       Number(editStudent.totalFees) - Number(editStudent.paidFees);

//     const monthLabel = new Date(editStudent.feeDate).toLocaleDateString(
//       "en-IN",
//       {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       },
//     );

//     await updateDoc(doc(db, "students", editStudent.id), {
//       name: editStudent.name,
//       class: editStudent.class,
//       totalFees: Number(editStudent.totalFees),
//       paidFees: Number(editStudent.paidFees),
//       pendingFees,
//       feeStatus: pendingFees === 0 ? "Completed" : "Pending",
//       feeDate: Timestamp.fromDate(new Date(editStudent.feeDate)),
//       month: monthLabel,
//       updatedAt: Timestamp.now(),
//     });

//     alert("✅ Student details updated");
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
//       <h4 className="mb-3">📋 Students Details</h4>

//       {/* ================= CLASS BOXES ================= */}
//       <div className="row mb-4">
//         {classes.map((cls) => (
//           <div key={cls} className="col-6 col-md-3 mb-3">
//             <div
//               className={`card text-center p-3 shadow-sm ${
//                 selectedClass === cls ? "border-primary" : ""
//               }`}
//               style={{ cursor: "pointer" }}
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
//           type="button"
//           className="btn btn-secondary btn-sm mb-3"
//           onClick={() => setSelectedClass(null)}
//         >
//           ⬅ Back
//         </button>
//       )}

//       {/* ================= TABLE ================= */}
//       <div className="table-responsive">
//         <table className="table table-bordered align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Email</th>
//               <th>Name</th>
//               <th>Class</th>
//               <th>Pending Fees</th>
//               <th>Status</th>
//               <th>Month / Date</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredStudents.map((s, i) => (
//               <tr key={s.id}>
//                 <td>{i + 1}</td>
//                 <td>{s.email}</td>
//                 <td>{s.name}</td>
//                 <td>{s.class}</td>
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
//                     type="button"
//                     className="btn btn-warning btn-sm"
//                     onClick={() =>
//                       setEditStudent({
//                         ...s,
//                         feeDate: s.feeDate
//                           ? s.feeDate.toDate().toISOString().split("T")[0]
//                           : "",
//                       })
//                     }
//                   >
//                     Edit
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     type="button"
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

//       {/* ================= EDIT FORM ================= */}
//       {editStudent && (
//         <div className="card shadow mt-4">
//           <div className="card-header bg-primary text-white">
//             ✏️ Edit Student
//           </div>

//           <div className="card-body">
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label>Name</label>
//                 <input
//                   className="form-control"
//                   value={editStudent.name}
//                   onChange={(e) =>
//                     setEditStudent({ ...editStudent, name: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label>Class</label>
//                 <input
//                   className="form-control"
//                   value={editStudent.class}
//                   onChange={(e) =>
//                     setEditStudent({ ...editStudent, class: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label>Total Fees</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={editStudent.totalFees}
//                   onChange={(e) =>
//                     setEditStudent({
//                       ...editStudent,
//                       totalFees: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label>Paid Fees</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={editStudent.paidFees}
//                   onChange={(e) =>
//                     setEditStudent({
//                       ...editStudent,
//                       paidFees: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-md-4">
//                 <label>Fees Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={editStudent.feeDate || ""}
//                   onChange={(e) =>
//                     setEditStudent({
//                       ...editStudent,
//                       feeDate: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-end gap-2 mt-4">
//               <button
//                 type="button"
//                 className="btn btn-success"
//                 disabled={!isEditFormValid}
//                 onClick={updateStudent}
//               >
//                 💾 Update
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setEditStudent(null)}
//               >
//                 Cancel
//               </button>
//             </div>

//             {!isEditFormValid && (
//               <small className="text-danger d-block mt-2">
//                 ⚠️ Please fill all fields before updating
//               </small>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ================= DELETE MODAL ================= */}
//       {deleteStudent && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//           style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
//         >
//           <div className="bg-white p-4 rounded shadow" style={{ width: 350 }}>
//             <h6 className="text-danger">Confirm Delete</h6>
//             <p>
//               Delete <b>{deleteStudent.name}</b>?
//             </p>
//             <div className="d-flex justify-content-end gap-2">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setDeleteStudent(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={confirmDelete}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
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

  /* ================= CLASS SORT ================= */
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

  /* ================= VALIDATION ================= */
  const isEditFormValid =
    editStudent &&
    editStudent.name &&
    editStudent.class &&
    editStudent.totalFees !== "" &&
    editStudent.paidFees !== "" &&
    editStudent.feeDate;

  /* ================= UPDATE STUDENT ================= */
  const updateStudent = async () => {
    if (!isEditFormValid) return;

    const pendingFees =
      Number(editStudent.totalFees) - Number(editStudent.paidFees);

    const monthLabel = new Date(editStudent.feeDate).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );

    await updateDoc(doc(db, "students", editStudent.id), {
      name: editStudent.name,
      class: editStudent.class,
      totalFees: Number(editStudent.totalFees),
      paidFees: Number(editStudent.paidFees),
      pendingFees,
      feeStatus: pendingFees === 0 ? "Completed" : "Pending",
      feeDate: Timestamp.fromDate(new Date(editStudent.feeDate)),
      month: monthLabel,
      updatedAt: Timestamp.now(),
    });

    alert("✅ Student details updated");
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
    border: darkMode ? "1px solid #1e293b" : "1px solid #dee2e6",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    border: darkMode ? "1px solid #334155" : "1px solid #ced4da",
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ color: darkMode ? "#ffffff" : "#000000" }}
    >
      <h4 className="mb-3">📋 Students Details</h4>

      {/* ================= CLASS BOXES ================= */}
      {/* ================= CLASS BOXES ================= */}
      <div className="row mb-4">
        {classes.map((cls) => (
          <div key={cls} className="col-6 col-md-3 mb-3">
            <div
              className={`card text-center p-3 shadow-sm ${
                selectedClass === cls ? "border-primary" : ""
              }`}
              style={{
                ...cardStyle,
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: selectedClass === cls ? "scale(1.03)" : "scale(1)",
              }}
              onClick={() => setSelectedClass(cls)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 10px 25px rgba(59,130,246,0.6)"
                  : "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  selectedClass === cls ? "scale(1.03)" : "scale(1)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 5px 15px rgba(0,0,0,0.6)"
                  : "0 5px 15px rgba(0,0,0,0.08)";
              }}
            >
              <h6>Class {cls}</h6>
              <small>
                {students.filter((s) => s.class === cls).length} students
              </small>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <button
          type="button"
          className="btn btn-secondary btn-sm mb-3"
          onClick={() => setSelectedClass(null)}
        >
          ⬅ Back
        </button>
      )}

      {/* ================= TABLE ================= */}
      <div className="table-responsive">
        <table
          className={`table align-middle ${
            darkMode ? "table-dark" : "table-bordered"
          }`}
        >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Class</th>
              <th>Pending Fees</th>
              <th>Status</th>
              <th>Month / Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.email}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td className="text-danger fw-semibold">₹ {s.pendingFees}</td>
                <td>
                  <span
                    className={`badge ${
                      s.feeStatus === "Completed" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {s.feeStatus}
                  </span>
                </td>
                <td>{s.month || "—"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      setEditStudent({
                        ...s,
                        feeDate: s.feeDate
                          ? s.feeDate.toDate().toISOString().split("T")[0]
                          : "",
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
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

      {/* ================= EDIT FORM ================= */}
      {editStudent && (
        <div className="card shadow mt-4" style={cardStyle}>
          <div className="card-header bg-primary text-white">
            ✏️ Edit Student
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Name</label>
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
                <label>Class</label>
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
                <label>Total Fees</label>
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
                <label>Paid Fees</label>
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
                <label>Fees Date</label>
                <input
                  type="date"
                  className="form-control"
                  style={inputStyle}
                  value={editStudent.feeDate || ""}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      feeDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={!isEditFormValid}
                onClick={updateStudent}
              >
                💾 Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditStudent(null)}
              >
                Cancel
              </button>
            </div>

            {!isEditFormValid && (
              <small className="text-danger d-block mt-2">
                ⚠️ Please fill all fields before updating
              </small>
            )}
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteStudent && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="p-4 rounded shadow"
            style={{
              width: 350,
              backgroundColor: darkMode ? "#0f172a" : "#ffffff",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          >
            <h6 className="text-danger">Confirm Delete</h6>
            <p>
              Delete <b>{deleteStudent.name}</b>?
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeleteStudent(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
