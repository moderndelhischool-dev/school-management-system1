// import { useState } from "react";
// import { db } from "../firebase/firebase";
// import { doc, setDoc, Timestamp } from "firebase/firestore";

// function AddStudent() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [cls, setCls] = useState("");
//   const [gender, setGender] = useState("");
//   const [totalFees, setTotalFees] = useState("");
//   const [paidFees, setPaidFees] = useState("");
//   const [feesDate, setFeesDate] = useState("");

//   const [successMsg, setSuccessMsg] = useState("");

//   const saveStudent = async () => {
//     if (
//       !email ||
//       !name ||
//       !cls ||
//       !gender ||
//       !totalFees ||
//       !paidFees ||
//       !feesDate
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     const pending = Number(totalFees) - Number(paidFees);
//     const isCompleted = pending === 0;

//     await setDoc(doc(db, "students", email), {
//       email,
//       name,
//       class: cls,
//       gender,
//       totalFees: Number(totalFees),
//       paidFees: Number(paidFees),
//       pendingFees: pending,
//       feeStatus: isCompleted ? "Completed" : "Pending",
//       feesDate: feesDate,
//       approvedAt: isCompleted ? Timestamp.now() : null,
//       createdAt: Timestamp.now(),
//     });

//     setSuccessMsg("✅ Student added / updated successfully");

//     // reset form
//     setEmail("");
//     setName("");
//     setCls("");
//     setGender("");
//     setTotalFees("");
//     setPaidFees("");
//     setFeesDate("");

//     setTimeout(() => setSuccessMsg(""), 3000);
//   };

//   return (
//     <div className="card p-3 p-md-4 shadow-sm">
//       <h5 className="mb-3">➕ Add / Update Student</h5>

//       {successMsg && <div className="alert alert-success">{successMsg}</div>}

//       <div className="row g-3">
//         <div className="col-md-6">
//           <label>Email</label>
//           <input
//             className="form-control"
//             placeholder="student@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="col-md-6">
//           <label>Name</label>
//           <input
//             className="form-control"
//             placeholder="Student Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div className="col-md-4">
//           <label>Class</label>
//           <input
//             className="form-control"
//             placeholder="10 / +1 / +2"
//             value={cls}
//             onChange={(e) => setCls(e.target.value)}
//           />
//         </div>

//         <div className="col-md-4">
//           <label>Gender</label>
//           <select
//             className="form-control"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label>Fees Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={feesDate}
//             onChange={(e) => setFeesDate(e.target.value)}
//           />
//         </div>

//         <div className="col-md-6">
//           <label>Total Fees</label>
//           <input
//             type="number"
//             className="form-control"
//             value={totalFees}
//             onChange={(e) => setTotalFees(e.target.value)}
//           />
//         </div>

//         <div className="col-md-6">
//           <label>Paid Fees</label>
//           <input
//             type="number"
//             className="form-control"
//             value={paidFees}
//             onChange={(e) => setPaidFees(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="mt-4 text-end">
//         <button className="btn btn-success px-4" onClick={saveStudent}>
//           💾 Save Student
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddStudent;
import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function AddStudent({ darkMode }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cls, setCls] = useState("");
  const [gender, setGender] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [paidFees, setPaidFees] = useState("");
  const [feesDate, setFeesDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const saveStudent = async () => {
    if (
      !email ||
      !name ||
      !cls ||
      !gender ||
      !totalFees ||
      !paidFees ||
      !feesDate
    ) {
      alert("Please fill all fields");
      return;
    }

    const pending = Number(totalFees) - Number(paidFees);
    const isCompleted = pending === 0;

    await setDoc(doc(db, "students", email), {
      email,
      name,
      class: cls,
      gender,
      totalFees: Number(totalFees),
      paidFees: Number(paidFees),
      pendingFees: pending,
      feeStatus: isCompleted ? "Completed" : "Pending",
      feesDate: feesDate,
      approvedAt: isCompleted ? Timestamp.now() : null,
      createdAt: Timestamp.now(),
    });

    setSuccessMsg("✅ Student added / updated successfully");

    setEmail("");
    setName("");
    setCls("");
    setGender("");
    setTotalFees("");
    setPaidFees("");
    setFeesDate("");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  /* ================= STYLES ================= */

  const cardStyle = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    borderRadius: "16px",
    boxShadow: darkMode
      ? "0 15px 40px rgba(0,0,0,0.7)"
      : "0 10px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const inputStyle = {
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    border: darkMode ? "1px solid #334155" : "1px solid #ced4da",
  };

  const labelStyle = {
    color: darkMode ? "#e2e8f0" : "#374151",
    fontWeight: "500",
  };

  const placeholderColor = darkMode ? "#cbd5e1" : "#6b7280";

  return (
    <div className="p-3 p-md-4" style={cardStyle}>
      <h5 className="mb-4">➕ Add / Update Student</h5>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="row g-3">
        {/* Email */}
        <div className="col-md-6">
          <label style={labelStyle}>Email</label>
          <input
            className="form-control"
            style={inputStyle}
            placeholder="Enter student email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Name */}
        <div className="col-md-6">
          <label style={labelStyle}>Name</label>
          <input
            className="form-control"
            style={inputStyle}
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Class */}
        <div className="col-md-4">
          <label style={labelStyle}>Class</label>
          <input
            className="form-control"
            style={inputStyle}
            placeholder="10 / +1 / +2"
            value={cls}
            onChange={(e) => setCls(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="col-md-4">
          <label style={labelStyle}>Gender</label>
          <select
            className="form-control"
            style={inputStyle}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Date */}
        <div className="col-md-4">
          <label style={labelStyle}>Fees Date</label>
          <input
            type="date"
            className="form-control"
            style={inputStyle}
            value={feesDate}
            onChange={(e) => setFeesDate(e.target.value)}
          />
        </div>

        {/* Total Fees */}
        <div className="col-md-6">
          <label style={labelStyle}>Total Fees</label>
          <input
            type="number"
            className="form-control"
            style={inputStyle}
            placeholder="Enter total fees"
            value={totalFees}
            onChange={(e) => setTotalFees(e.target.value)}
          />
        </div>

        {/* Paid Fees */}
        <div className="col-md-6">
          <label style={labelStyle}>Paid Fees</label>
          <input
            type="number"
            className="form-control"
            style={inputStyle}
            placeholder="Enter paid amount"
            value={paidFees}
            onChange={(e) => setPaidFees(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button
          className="btn btn-success px-4"
          style={{ borderRadius: "8px", transition: "0.3s" }}
          onClick={saveStudent}
        >
          💾 Save Student
        </button>
      </div>

      {/* Placeholder Fix */}
      <style>
        {`
          .form-control::placeholder {
            color: ${placeholderColor} !important;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default AddStudent;
