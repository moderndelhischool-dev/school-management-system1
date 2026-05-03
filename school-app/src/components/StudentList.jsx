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
  deleteField,
  Timestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { canAdminAction } from "../utils/adminRbac";
import {
  loadActiveSessionClassTuitionBusMap,
  monthlyTotalWithExam,
  monthlyBaseForStudent,
  examFeeForMonth,
  currentMonthKey,
  resolveDisplayPendingFees,
  resolveDisplayTotalFees,
  autoRollAfterFullPayment,
} from "../utils/feeBilling";

function StudentList({ darkMode, adminAccess = { role: "admin", perms: {} } }) {
  const [students, setStudents] = useState([]);
  const [classTuitionMap, setClassTuitionMap] = useState({});
  const [classBusMap, setClassBusMap] = useState({});
  const [classBusRatePerKmMap, setClassBusRatePerKmMap] = useState({});
  const [classExamFeeMap, setClassExamFeeMap] = useState({});
  const [classExamMonthsMap, setClassExamMonthsMap] = useState({});
  const [classAdmissionFeeMap, setClassAdmissionFeeMap] = useState({});
  const [classSundryChargesMap, setClassSundryChargesMap] = useState({});
  const [activeSessionId, setActiveSessionId] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [updatingAll, setUpdatingAll] = useState(false);
  const [editPhotoFile, setEditPhotoFile] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState("");
  const [printStudent, setPrintStudent] = useState(null);

  const withSalutation = (rawName, kind) => {
    const name = String(rawName || "").trim();
    if (!name) return "—";
    const lower = name.toLowerCase();
    const already =
      lower.startsWith("mr ") ||
      lower.startsWith("mr.") ||
      lower.startsWith("mrs ") ||
      lower.startsWith("mrs.") ||
      lower.startsWith("ms ") ||
      lower.startsWith("ms.") ||
      lower.startsWith("miss ") ||
      lower.startsWith("smt ") ||
      lower.startsWith("smt.") ||
      lower.startsWith("shri ") ||
      lower.startsWith("shri.");
    if (already) return name;
    const prefix = kind === "mother" ? "Mrs. " : "Mr. ";
    return `${prefix}${name}`;
  };

  const MAX_PHOTO_SIZE = 220 * 1024;
  const isAllowedStudentPhoto = (file) => {
    if (!file) return false;
    const t = String(file.type || "").toLowerCase();
    if (t.startsWith("image/")) return true;
    const name = String(file.name || "").toLowerCase();
    return (
      name.endsWith(".png") ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".webp")
    );
  };

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result || ""));
      r.onerror = () => reject(new Error("Could not read photo"));
      r.readAsDataURL(file);
    });

  const openRegistrationPrint = (s) => setPrintStudent(s);
  const safeText = (v) => String(v ?? "").replace(/[<>]/g, "");
  const withSalForPrint = (raw, kind) => {
    const name = String(raw || "").trim();
    if (!name) return "—";
    const lower = name.toLowerCase();
    const already =
      lower.startsWith("mr ") ||
      lower.startsWith("mr.") ||
      lower.startsWith("mrs ") ||
      lower.startsWith("mrs.") ||
      lower.startsWith("ms ") ||
      lower.startsWith("ms.") ||
      lower.startsWith("miss ") ||
      lower.startsWith("smt ") ||
      lower.startsWith("smt.") ||
      lower.startsWith("shri ") ||
      lower.startsWith("shri.");
    if (already) return name;
    return `${kind === "mother" ? "Mrs. " : "Mr. "}${name}`;
  };

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

  const normalizeClassKey = (cls) =>
    String(cls || "")
      .replace("+", "")
      .trim()
      .toLowerCase();

  const loadFeeMaps = async () => {
    const {
      tuitionMap,
      busMap,
      busRatePerKmMap,
      examFeeMap,
      examMonthsMap,
      admissionFeeMap,
      sundryChargesMap,
      activeSessionId: sid,
    } = await loadActiveSessionClassTuitionBusMap(db);
    setClassTuitionMap(tuitionMap);
    setClassBusMap(busMap);
    setClassBusRatePerKmMap(busRatePerKmMap || {});
    setClassExamFeeMap(examFeeMap || {});
    setClassExamMonthsMap(examMonthsMap || {});
    setClassAdmissionFeeMap(admissionFeeMap || {});
    setClassSundryChargesMap(sundryChargesMap || {});
    setActiveSessionId(sid || "");
  };

  const getClassTuition = (cls) => {
    const classKey = normalizeClassKey(cls);
    return Number(classTuitionMap[classKey] || 0);
  };

  const getStudentTotal = (student) =>
    resolveDisplayTotalFees(
      student,
      classTuitionMap,
      classBusMap,
      classExamFeeMap,
      classExamMonthsMap,
      classBusRatePerKmMap,
      classAdmissionFeeMap,
      classSundryChargesMap,
    );

  const getStudentPending = (student) =>
    resolveDisplayPendingFees(
      student,
      classTuitionMap,
      classBusMap,
      classExamFeeMap,
      classExamMonthsMap,
      classBusRatePerKmMap,
      classAdmissionFeeMap,
      classSundryChargesMap,
    );

  const getStudentMonthlyBus = (s) =>
    monthlyBaseForStudent(
      classTuitionMap,
      classBusMap,
      s,
      classBusRatePerKmMap,
    ).bus;

  const getStudentDisplayStatus = (student) => {
    const pending = getStudentPending(student);
    const total = getStudentTotal(student);
    const paid = Math.min(Math.max(Number(student.paidFees || 0), 0), total);
    if (pending <= 0) return "Completed";
    if (paid > 0) return "Partial";
    return "Pending";
  };

  const getEditTuition = () => (editStudent ? getClassTuition(editStudent.class) : 0);

  const getEditFeeMonthKey = () => {
    if (!editStudent) return currentMonthKey();
    const now = new Date();
    const monthIndex = months.indexOf(editStudent.selectedMonth);
    const safeMonthNumber =
      monthIndex >= 0 ? monthIndex + 1 : now.getMonth() + 1;
    return `${now.getFullYear()}-${String(safeMonthNumber).padStart(2, "0")}`;
  };

  const getEditExamLine = () =>
    editStudent
      ? examFeeForMonth(
          classExamFeeMap,
          classExamMonthsMap,
          editStudent,
          getEditFeeMonthKey(),
        )
      : 0;

  const getEditTotal = () => {
    if (!editStudent) return 0;
    const { total: line } = monthlyTotalWithExam(
      classTuitionMap,
      classBusMap,
      classExamFeeMap,
      classExamMonthsMap,
      editStudent,
      getEditFeeMonthKey(),
      classBusRatePerKmMap,
      classAdmissionFeeMap,
      classSundryChargesMap,
    );
    const carry = Number(editStudent.carryForwardTotal || 0);
    return line + carry;
  };

  useEffect(() => {
    loadStudents();
    loadFeeMaps();
  }, []);

  // Close edit modal on Escape
  useEffect(() => {
    if (!editStudent) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setEditStudent(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editStudent]);

  useEffect(() => {
    if (!editStudent) {
      setEditPhotoFile(null);
      setEditPhotoPreview("");
      return;
    }
    const fromDoc = String(editStudent.photoDataUrl || "");
    setEditPhotoPreview(fromDoc);
    setEditPhotoFile(null);
  }, [editStudent]);

  /* ================= FIXED BULK UPDATE (Dual History Entry) ================= */
  const handleBulkNextMonth = async () => {
    if (!canAdminAction(adminAccess, "fees", "history", true)) {
      Swal.fire({
        icon: "warning",
        title: "Access denied",
        text: "You do not have permission to update fee history.",
      });
      return;
    }
    const completedStudents = students.filter(
      (s) => s.feeStatus === "Completed",
    );

    if (completedStudents.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No eligible students",
        text: 'No student currently has fee status "Completed".',
        background: darkMode ? "#1e293b" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Confirm bulk month advance",
      text: `Move ${completedStudents.length} student(s) whose fees are completed to the next billing month and update fee history?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F4C6C",
      confirmButtonText: "Yes, advance month",
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
          title: "Fee history updated",
          text: "Completed months are recorded; the next month is now pending for those students.",
        });
        loadStudents();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "The bulk update could not be completed. Please try again.",
        });
      } finally {
        setUpdatingAll(false);
      }
    }
  };

  /* ================= SINGLE UPDATE LOGIC ================= */
  const updateStudent = async () => {
    if (!canAdminAction(adminAccess, "students", "edit", true)) {
      Swal.fire({
        icon: "warning",
        title: "Access denied",
        text: "You do not have permission to edit students.",
      });
      return;
    }
    const total = getEditTotal();
    let paid = Number(editStudent.paidFees) || 0;
    const usesBus = !!editStudent.usesBus;
    if (paid > total) paid = total;
    if (paid < 0) paid = 0;

    const pendingFees = Math.max(total - paid, 0);
    const status =
      pendingFees === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";
    const now = new Date();
    const monthIndex = months.indexOf(editStudent.selectedMonth);
    const safeMonthNumber = monthIndex >= 0 ? monthIndex + 1 : now.getMonth() + 1;
    const safeMonthName = monthIndex >= 0 ? editStudent.selectedMonth : months[now.getMonth()];
    const monthId = `${now.getFullYear()}-${String(safeMonthNumber).padStart(2, "0")}`;
    const monthLabel = `${safeMonthName} ${now.getFullYear()}`;
    const feeDateValue = editStudent.feeDate
      ? Timestamp.fromDate(new Date(editStudent.feeDate))
      : Timestamp.now();
    const ck = normalizeClassKey(editStudent.class);
    const admissionApplied = monthId.endsWith("-04")
      ? Number(classAdmissionFeeMap[ck] || 0)
      : 0;
    const sundryApplied = monthId.endsWith("-04")
      ? Number(classSundryChargesMap[ck] || 0)
      : 0;

    const examLine = examFeeForMonth(
      classExamFeeMap,
      classExamMonthsMap,
      editStudent,
      monthId,
    );

    const {
      bus: resolvedMonthlyBus,
      tuition: effectiveTuition,
    } = monthlyBaseForStudent(
      classTuitionMap,
      classBusMap,
      editStudent,
      classBusRatePerKmMap,
    );
    const scholarshipAmt = Math.max(
      0,
      Number(editStudent.scholarshipAmount ?? 0),
    );

    try {
      const studentRef = doc(db, "students", editStudent.id);
      // Photo handling
      let photoPatch = {};
      if (editPhotoFile) {
        if (!isAllowedStudentPhoto(editPhotoFile)) {
          Swal.fire({ icon: "warning", title: "Photo must be an image (png/jpg/webp)" });
          return;
        }
        if (editPhotoFile.size > MAX_PHOTO_SIZE) {
          Swal.fire({
            icon: "warning",
            title: `Photo must be under ${Math.floor(MAX_PHOTO_SIZE / 1024)} KB`,
          });
          return;
        }
        const photoDataUrl = await readFileAsDataURL(editPhotoFile);
        photoPatch = {
          photoDataUrl,
          photoFileName: editPhotoFile.name || "photo",
          photoMimeType: editPhotoFile.type || "image/*",
          photoUpdatedAt: Timestamp.now(),
        };
      } else if (editStudent.photoDataUrl === "") {
        // Explicit remove
        photoPatch = {
          photoDataUrl: deleteField(),
          photoFileName: deleteField(),
          photoMimeType: deleteField(),
          photoUpdatedAt: deleteField(),
        };
      }

      await updateDoc(studentRef, {
        ...editStudent,
        usesBus,
        busDistanceKm: usesBus ? Number(editStudent.busDistanceKm || 0) : 0,
        monthlyBusFee: usesBus ? resolvedMonthlyBus : 0,
        scholarshipAmount: scholarshipAmt,
        scholarshipSessionId:
          scholarshipAmt > 0
            ? activeSessionId || editStudent.sessionId || ""
            : deleteField(),
        scholarshipPercent:
          scholarshipAmt > 0
            ? 0
            : Math.min(
                100,
                Math.max(0, Number(editStudent.scholarshipPercent || 0)),
              ),
        scholarshipNote: String(editStudent.scholarshipNote || "").slice(0, 240),
        ...photoPatch,
        monthlyTuitionFeeApplied: effectiveTuition,
        examFeeApplied: examLine,
        admissionFeeApplied: admissionApplied,
        sundryChargesApplied: sundryApplied,
        totalFees: total,
        paidFees: paid,
        pendingFees: pendingFees,
        feeStatus: status,
        feeMonth: monthId,
        month: monthLabel,
        feeDate: feeDateValue,
        feesDate: new Date().toISOString().slice(0, 10),
        approvedAt: status === "Completed" ? Timestamp.now() : null,
        updatedAt: Timestamp.now(),
      });

      const historyRef = doc(db, "students", editStudent.id, "fees", monthId);
      await setDoc(
        historyRef,
        {
          amount: total,
          paid: paid,
          status: status,
          month: safeMonthName,
          feeMonth: monthId,
          tuitionFee: effectiveTuition,
          busFee: usesBus ? resolvedMonthlyBus : 0,
          examFee: examLine,
          admissionFee: admissionApplied,
          sundryCharges: sundryApplied,
          date: feeDateValue,
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );

      if (status === "Completed") {
        await autoRollAfterFullPayment(db, editStudent.id);
      }

      Swal.fire({ icon: "success", title: "Student updated" });
      setEditStudent(null);
      setEditPhotoFile(null);
      setEditPhotoPreview("");
      loadStudents();
    } catch (e) {
      Swal.fire({ icon: "error", title: "Could not save changes" });
    }
  };

  const handleDelete = async () => {
    if (!canAdminAction(adminAccess, "students", "delete", false)) {
      Swal.fire({
        icon: "warning",
        title: "Access denied",
        text: "You do not have permission to delete students.",
      });
      return;
    }
    try {
      await deleteDoc(doc(db, "students", deleteStudent.id));
      setDeleteStudent(null);
      loadStudents();
      Swal.fire({ icon: "success", title: "Student removed" });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Could not delete",
        text: "Please try again or contact support.",
      });
    }
  };

  const classes = [...new Set(students.map((s) => s.class))];
  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClass ? s.class === selectedClass : true;
    const q = String(searchTerm || "").trim().toLowerCase();
    const matchSearch = (() => {
      if (!q) return true;
      const nameHit = (s.name || "").toLowerCase().includes(q);
      const fatherHit = (s.fatherName || "").toLowerCase().includes(q);
      const motherHit = (s.motherName || "").toLowerCase().includes(q);
      const rollHit = (s.rollNo || "").toString().toLowerCase().includes(q);
      const regHit = (s.registrationNo || "")
        .toString()
        .toLowerCase()
        .includes(q);
      const emailHit = (s.email || "").toLowerCase().includes(q);
      const primaryPhone = String(s.primaryContactNumber || s.phone || "").toLowerCase();
      const altPhone = String(s.alternateContactNumber || "").toLowerCase();
      const phoneHit = primaryPhone.includes(q) || altPhone.includes(q);
      return (
        nameHit ||
        fatherHit ||
        motherHit ||
        rollHit ||
        regHit ||
        phoneHit ||
        emailHit
      );
    })();
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
          disabled={updatingAll || !canAdminAction(adminAccess, "fees", "history", true)}
        >
          {updatingAll ? "Processing…" : "Advance completed fees to next month"}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, roll, contact or email…"
          className="form-control search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive student-table-wrap">
        <table className={`table student-table ${darkMode ? "table-dark" : ""}`}>
          <thead className="blue-head">
            <tr>
              <th>Photo</th>
              <th>Roll number</th>
              <th>Registration no.</th>
              <th>Student name</th>
              <th>Father&apos;s name</th>
              <th>Mother&apos;s name</th>
              <th>Email</th>
              <th>Primary contact</th>
              <th>Alternate contact</th>
              <th>Aadhar</th>
              <th>Class</th>
              <th>Monthly tuition</th>
              <th>Scholarship</th>
              <th>Bus</th>
              <th>Distance (km)</th>
              <th>Monthly bus fee</th>
              <th>Billing month</th>
              <th>Fee date</th>
              <th>Total due</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Registration</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="student-avatar">
                    {s.photoDataUrl ? (
                      <img src={s.photoDataUrl} alt="Student" />
                    ) : (
                      <span className="student-avatar-fallback">
                        {(s.name || "S").trim().slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>
                </td>
                <td>{s.rollNo || "—"}</td>
                <td className="font-monospace small">
                  {s.registrationNo || "—"}
                </td>
                <td>{s.name}</td>
                <td>{withSalutation(s.fatherName, "father")}</td>
                <td>{withSalutation(s.motherName, "mother")}</td>
                <td>{s.email || "—"}</td>
                <td>{s.primaryContactNumber || s.phone || "—"}</td>
                <td>{s.alternateContactNumber || "—"}</td>
                <td className="font-monospace small">{s.aadharNumber || "—"}</td>
                <td>{s.class}</td>
                <td>₹{getClassTuition(s.class)}</td>
                <td>
                  {Number(s.scholarshipAmount) > 0
                    ? `₹${s.scholarshipAmount}`
                    : Number(s.scholarshipPercent) > 0
                      ? `${s.scholarshipPercent}% (legacy)`
                      : "—"}
                </td>
                <td>{s.usesBus ? "Yes" : "No"}</td>
                <td>
                  {s.usesBus
                    ? s.busDistanceKm != null &&
                      String(s.busDistanceKm).trim() !== ""
                      ? s.busDistanceKm
                      : "—"
                    : "—"}
                </td>
                <td>{s.usesBus ? `₹${getStudentMonthlyBus(s)}` : "—"}</td>
                <td>
                  <span className="text-info">{s.selectedMonth}</span>
                </td>
                <td>
                  {s.feeDate
                    ? new Date(s.feeDate.seconds * 1000).toLocaleDateString()
                    : "—"}
                </td>
                <td className="blue-text">₹{getStudentTotal(s)}</td>
                <td className="gold-text">₹{getStudentPending(s)}</td>
                <td>
                  <span
                    className={`badge ${
                      getStudentDisplayStatus(s) === "Completed"
                        ? "badge-complete"
                        : "badge-pending"
                    }`}
                  >
                    {getStudentDisplayStatus(s)}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openRegistrationPrint(s)}
                  >
                    Download
                  </button>
                </td>
                <td>
                  {canAdminAction(adminAccess, "students", "edit", true) ? (
                    <button
                      className="btn btn-sm edit-btn"
                      onClick={() =>
                        setEditStudent({
                          ...s,
                          usesBus: !!s.usesBus,
                          monthlyBusFee: s.monthlyBusFee ?? "",
                          busDistanceKm:
                            s.busDistanceKm !== undefined && s.busDistanceKm !== null
                              ? s.busDistanceKm
                              : "",
                          scholarshipAmount:
                            s.scholarshipAmount !== undefined &&
                            s.scholarshipAmount !== null
                              ? s.scholarshipAmount
                              : "",
                          scholarshipNote: s.scholarshipNote ?? "",
                          primaryContactNumber:
                            s.primaryContactNumber ?? s.phone ?? "",
                          alternateContactNumber: s.alternateContactNumber ?? "",
                          aadharNumber: s.aadharNumber ?? "",
                          motherName: s.motherName ?? "",
                          photoDataUrl: s.photoDataUrl ?? "",
                          photoFileName: s.photoFileName ?? "",
                          photoMimeType: s.photoMimeType ?? "",
                          feeDate: s.feeDate
                            ? s.feeDate.toDate().toISOString().split("T")[0]
                            : "",
                        })
                      }
                    >
                      Edit
                    </button>
                  ) : (
                    <span className="text-muted small">—</span>
                  )}
                </td>
                <td>
                  {canAdminAction(adminAccess, "students", "delete", false) ? (
                    <button
                      className="btn btn-sm delete-btn"
                      onClick={() => setDeleteStudent(s)}
                    >
                      Delete
                    </button>
                  ) : (
                    <span className="text-muted small">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editStudent && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditStudent(null);
          }}
        >
          <div className={`edit-modal ${darkMode ? "dark" : ""}`}>
            <div className="edit-modal-header">
              <div className="min-w-0">
                <div className="edit-modal-title">Edit student</div>
                <div className="edit-modal-subtitle">
                  {editStudent?.name ? (
                    <>
                      <span className="fw-semibold">{editStudent.name}</span>
                      {editStudent?.registrationNo
                        ? ` · ${editStudent.registrationNo}`
                        : ""}
                    </>
                  ) : (
                    "Update student details"
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setEditStudent(null)}
                aria-label="Close edit dialog"
              >
                ✕
              </button>
            </div>

            <div className="edit-modal-body">
              <div className="row g-3">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 p-2 rounded-3 edit-photo-strip">
                <div className="d-flex align-items-center gap-3">
                  <div className="edit-photo-preview">
                    {editPhotoPreview ? (
                      <img src={editPhotoPreview} alt="Student" />
                    ) : (
                      <span className="student-avatar-fallback">
                        {(editStudent?.name || "S").trim().slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="fw-bold" style={{ fontSize: 14 }}>
                      Student photo
                    </div>
                    <div className="small text-muted">
                      PNG/JPG/WebP · max {Math.floor(MAX_PHOTO_SIZE / 1024)} KB
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <label className="btn btn-outline-primary btn-sm mb-0">
                    Change photo
                    <input
                      type="file"
                      accept="image/*,.png,.jpg,.jpeg,.webp"
                      hidden
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        if (!f) return;
                        if (!isAllowedStudentPhoto(f)) {
                          Swal.fire({
                            icon: "warning",
                            title: "Photo must be an image (png/jpg/webp)",
                          });
                          e.target.value = "";
                          return;
                        }
                        if (f.size > MAX_PHOTO_SIZE) {
                          Swal.fire({
                            icon: "warning",
                            title: `Photo must be under ${Math.floor(MAX_PHOTO_SIZE / 1024)} KB`,
                          });
                          e.target.value = "";
                          return;
                        }
                        setEditPhotoFile(f);
                        const url = URL.createObjectURL(f);
                        setEditPhotoPreview(url);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    disabled={!editPhotoPreview}
                    onClick={() => {
                      setEditPhotoFile(null);
                      setEditPhotoPreview("");
                      setEditStudent((prev) =>
                        prev
                          ? {
                              ...prev,
                              photoDataUrl: "",
                              photoFileName: "",
                              photoMimeType: "",
                            }
                          : prev,
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <label className="small fw-bold">Roll number</label>
              <input
                className="form-control dark-input"
                value={editStudent.rollNo || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, rollNo: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Registration number</label>
              <input
                className="form-control dark-input font-monospace"
                readOnly
                value={editStudent.registrationNo || ""}
                placeholder="Not assigned"
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Student name</label>
              <input
                className="form-control dark-input"
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Father&apos;s name</label>
              <input
                className="form-control dark-input"
                value={editStudent.fatherName || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, fatherName: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Mother&apos;s name</label>
              <input
                className="form-control dark-input"
                value={editStudent.motherName || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, motherName: e.target.value })
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
              <label className="small fw-bold">Primary contact number</label>
              <input
                className="form-control dark-input"
                value={editStudent.primaryContactNumber || ""}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    primaryContactNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Alternate contact number</label>
              <input
                className="form-control dark-input"
                value={editStudent.alternateContactNumber || ""}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    alternateContactNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Aadhar number</label>
              <input
                className="form-control dark-input font-monospace"
                value={editStudent.aadharNumber || ""}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, aadharNumber: e.target.value })
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
              <label className="small fw-bold">Billing month</label>
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
              <label className="small fw-bold">Fee date</label>
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
              <label className="small fw-bold">
                Scholarship (₹ per month, deducted from tuition)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className="form-control dark-input"
                value={editStudent.scholarshipAmount ?? ""}
                placeholder="0"
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    scholarshipAmount: e.target.value,
                  })
                }
              />
             
            </div>
            <div className="col-md-8">
              <label className="small fw-bold">Scholarship reference (optional)</label>
              <input
                type="text"
                className="form-control dark-input"
                value={editStudent.scholarshipNote || ""}
                placeholder="e.g. Merit scholarship 2026"
                maxLength={240}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    scholarshipNote: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">School bus</label>
              <select
                className="form-control dark-input"
                value={editStudent.usesBus ? "yes" : "no"}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    usesBus: e.target.value === "yes",
                  })
                }
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">One-way distance (km)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="form-control dark-input"
                value={editStudent.busDistanceKm ?? ""}
                disabled={!editStudent.usesBus}
                placeholder="e.g. 4.5"
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    busDistanceKm: e.target.value,
                  })
                }
              />
              
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Manual monthly bus fee (₹)</label>
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.monthlyBusFee || ""}
                disabled={!editStudent.usesBus}
                placeholder="Use when no per-km rate"
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    monthlyBusFee: e.target.value,
                  })
                }
              />
              {editStudent.usesBus &&
                Number(
                  classBusRatePerKmMap[normalizeClassKey(editStudent.class)] ||
                    0,
                ) > 0 && (
                  <small className="text-info d-block mt-1">
                    Class ₹/km: ₹
                    {classBusRatePerKmMap[normalizeClassKey(editStudent.class)]}{" "}
                    → effective bus this month: ₹
                    {getStudentMonthlyBus(editStudent)}
                  </small>
                )}
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Class tuition (monthly)</label>
              <input
                type="number"
                className="form-control dark-input"
                value={getEditTuition()}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Monthly total due</label>
              <input
                type="number"
                className="form-control dark-input"
                value={getEditTotal()}
                disabled
              />
            </div>
            {getEditExamLine() > 0 && (
              <div className="col-12">
                <small
                  className={darkMode ? "text-light opacity-80" : "text-muted"}
                >
                  Examination fee for this month (per fee structure): ₹
                  {getEditExamLine()}
                </small>
              </div>
            )}
            <div className="col-md-4">
              <label className="small fw-bold">Amount paid</label>
              <input
                type="number"
                className="form-control dark-input"
                value={editStudent.paidFees}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, paidFees: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="small fw-bold">Outstanding balance</label>
              <input
                type="number"
                className="form-control dark-input"
                value={Math.max(getEditTotal() - Number(editStudent.paidFees || 0), 0)}
                disabled
              />
            </div>
              </div>
            </div>

            <div className="edit-modal-footer">
              <button className="btn cancel-btn" onClick={() => setEditStudent(null)}>
                Cancel
              </button>
              <button className="btn update-btn" onClick={updateStudent}>
                Save changes
              </button>
            </div>
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

      {printStudent && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPrintStudent(null);
          }}
        >
          <div className={`print-modal ${darkMode ? "dark" : ""}`}>
            <div className="print-modal-header no-print">
              <div className="min-w-0">
                <div className="print-modal-title">Registration preview</div>
                <div className="print-modal-subtitle">
                  {printStudent?.name ? (
                    <>
                      <span className="fw-semibold">{printStudent.name}</span>
                      {printStudent?.registrationNo
                        ? ` · ${printStudent.registrationNo}`
                        : ""}
                    </>
                  ) : (
                    "Student registration"
                  )}
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => window.print()}
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setPrintStudent(null)}
                  aria-label="Close registration preview"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="print-modal-body">
              <div className="print-area">
                <div className="print-card">
                  <div className="print-card-header">
                    <div className="print-card-heading">Student Registration</div>
                    <div className="print-card-badge">
                      {safeText(printStudent.registrationNo || "—")}
                    </div>
                  </div>
                  <div className="print-card-content">
                    <div className="print-card-photo">
                      {printStudent.photoDataUrl ? (
                        <img src={printStudent.photoDataUrl} alt="Student" />
                      ) : (
                        <div className="print-card-no-photo">No photo</div>
                      )}
                    </div>
                    <div className="print-grid">
                      <div className="print-field">
                        <div className="print-label">Student</div>
                        <div className="print-val">
                          {safeText(printStudent.name || "—")}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Email</div>
                        <div className="print-val">
                          {safeText(printStudent.email || "—")}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Roll no.</div>
                        <div className="print-val">
                          {safeText(printStudent.rollNo || "—")}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Class</div>
                        <div className="print-val">
                          {safeText(printStudent.class || "—")}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Father</div>
                        <div className="print-val">
                          {safeText(
                            withSalForPrint(printStudent.fatherName, "father"),
                          )}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Mother</div>
                        <div className="print-val">
                          {safeText(
                            withSalForPrint(printStudent.motherName, "mother"),
                          )}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Primary contact</div>
                        <div className="print-val">
                          {safeText(
                            printStudent.primaryContactNumber ||
                              printStudent.phone ||
                              "—",
                          )}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Alternate contact</div>
                        <div className="print-val">
                          {safeText(printStudent.alternateContactNumber || "—")}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Aadhar</div>
                        <div className="print-val">
                          {safeText(printStudent.aadharNumber || "—")}
                        </div>
                      </div>
                      <div className="print-field">
                        <div className="print-label">Billing month</div>
                        <div className="print-val">
                          {safeText(printStudent.selectedMonth || "—")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="print-hint no-print">
                Tip: Print dialog me “Destination” → “Save as PDF” select kar lo.
              </div>
            </div>
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

  /* TABLE: keep headers/values single-line + horizontal scroll */
  .student-table-wrap { overflow-x: auto; }
  .student-table { table-layout: auto; }
  .student-table th,
  .student-table td {
    white-space: nowrap;
    vertical-align: middle;
  }
  .student-table th { font-size: 13px; }
  .student-table td { font-size: 13px; }
  .student-table tbody tr {
    transition: background-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }
  .student-table tbody tr:hover {
    background: ${darkMode ? "rgba(212,162,76,0.08)" : "rgba(15,76,108,0.06)"};
  }
  .student-table tbody tr:hover td {
    background: transparent; /* keep row hover consistent with bootstrap cells */
  }

  .student-avatar {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid ${darkMode ? "rgba(148,163,184,0.25)" : "#e5e7eb"};
    background: ${darkMode ? "rgba(15,23,42,0.55)" : "#f8fafc"};
    display: grid;
    place-items: center;
  }
  .student-avatar img { width: 100%; height: 100%; object-fit: cover; display:block; }
  .student-avatar-fallback { font-weight: 800; color: ${darkMode ? "#e2e8f0" : "#0F4C6C"}; font-size: 13px; }

  /* EDIT MODAL (professional) */
  .edit-modal {
    width: min(1100px, calc(100vw - 28px));
    max-height: calc(100vh - 28px);
    overflow: hidden;
    background: ${darkMode ? "#0b1220" : "#ffffff"};
    color: ${darkMode ? "#f1f5f9" : "#111827"};
    border-radius: 16px;
    border: 1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "#e5e7eb"};
    box-shadow: 0 24px 60px rgba(0,0,0,0.45);
    display: flex;
    flex-direction: column;
  }
  .edit-modal.dark { background: #0b1220; color: #f1f5f9; }
  .edit-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
    border-bottom: 1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "#e5e7eb"};
  }
  .edit-modal-title { font-weight: 800; font-size: 16px; }
  .edit-modal-subtitle { font-size: 12px; opacity: 0.75; }
  .edit-modal-body {
    padding: 16px 18px;
    overflow: auto;
  }
  .edit-photo-strip {
    border: 1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "#e5e7eb"};
    background: ${darkMode ? "rgba(15,23,42,0.35)" : "#f8fafc"};
  }
  .edit-photo-preview {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid ${darkMode ? "rgba(148,163,184,0.25)" : "#e5e7eb"};
    background: ${darkMode ? "rgba(15,23,42,0.55)" : "#ffffff"};
    display: grid;
    place-items: center;
    flex: 0 0 auto;
  }
  .edit-photo-preview img { width: 100%; height: 100%; object-fit: cover; display:block; }

  /* PRINT MODAL */
  .print-modal {
    width: min(980px, calc(100vw - 28px));
    max-height: calc(100vh - 28px);
    overflow: hidden;
    background: ${darkMode ? "#0b1220" : "#ffffff"};
    color: ${darkMode ? "#f1f5f9" : "#111827"};
    border-radius: 16px;
    border: 1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "#e5e7eb"};
    box-shadow: 0 24px 60px rgba(0,0,0,0.45);
    display: flex;
    flex-direction: column;
  }
  .print-modal-header {
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:12px;
    padding: 16px 18px;
    border-bottom: 1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "#e5e7eb"};
  }
  .print-modal-title { font-weight: 800; font-size: 16px; }
  .print-modal-subtitle { font-size: 12px; opacity: 0.75; }
  .print-modal-body { padding: 16px 18px; overflow: auto; }
  .print-hint { margin-top: 10px; font-size: 12px; opacity: 0.75; }

  .print-card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; box-shadow:0 16px 45px rgba(15,76,108,.12); }
  .print-card-header { padding:16px 18px; background: linear-gradient(90deg,#0F4C6C,#1B5E84); color:#fff; display:flex; justify-content:space-between; align-items:center; gap:12px; }
  .print-card-heading { font-weight: 800; font-size: 16px; }
  .print-card-badge { background: rgba(255,255,255,0.18); padding: 6px 10px; border-radius: 999px; font-weight: 800; font-size: 12px; }
  .print-card-content { padding: 18px; display:grid; grid-template-columns: 140px 1fr; gap: 16px; }
  .print-card-photo { width:140px; height:170px; border-radius:14px; border:1px solid #e5e7eb; background:#f8fafc; overflow:hidden; display:grid; place-items:center; }
  .print-card-photo img { width:100%; height:100%; object-fit:cover; display:block; }
  .print-card-no-photo { font-size: 12px; color:#64748b; }
  .print-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; }
  .print-field { border:1px solid #e5e7eb; border-radius:12px; padding:10px 12px; background:#fff; }
  .print-label { font-size:11px; font-weight:800; color:#64748b; text-transform:uppercase; letter-spacing:.06em; }
  .print-val { margin-top:4px; font-size:14px; font-weight:650; color:#111827; }

  @media print {
    .no-print { display:none !important; }
    body * { visibility: hidden !important; }
    .print-area, .print-area * { visibility: visible !important; }
    .print-area { position: absolute !important; left: 0; top: 0; width: 100% !important; }
    .print-card { box-shadow: none !important; }
  }
  .edit-modal-footer {
    padding: 14px 18px;
    border-top: 1px solid ${darkMode ? "rgba(148,163,184,0.18)" : "#e5e7eb"};
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    background: ${darkMode ? "rgba(15,23,42,0.6)" : "#f8fafc"};
  }
`}</style>
    </div>
  );
}

export default StudentList;
