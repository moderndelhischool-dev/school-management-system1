// import { useState } from "react";
// import { db } from "../firebase/firebase";
// import { doc, setDoc, Timestamp } from "firebase/firestore";

// function AddStudent({ darkMode }) {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [fatherName, setFatherName] = useState(""); // ✅ NEW
//   const [cls, setCls] = useState("");
//   const [gender, setGender] = useState("");
//   const [totalFees, setTotalFees] = useState("");
//   const [paidFees, setPaidFees] = useState("");
//   const [feesDate, setFeesDate] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const saveStudent = async () => {
//     if (
//       !email ||
//       !name ||
//       !fatherName || // ✅ REQUIRED
//       !cls ||
//       !gender ||
//       !totalFees ||
//       !paidFees ||
//       !feesDate
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     const pending = Number(totalFees) - Number(paidFees);
//     const isCompleted = pending === 0;

//     await setDoc(doc(db, "students", email), {
//       email,
//       name,
//       fatherName, // ✅ SAVED IN FIREBASE
//       class: cls,
//       gender,
//       totalFees: Number(totalFees),
//       paidFees: Number(paidFees),
//       pendingFees: pending,
//       feeStatus: isCompleted ? "Completed" : "Pending",
//       feesDate,
//       approvedAt: isCompleted ? Timestamp.now() : null,
//       createdAt: Timestamp.now(),
//     });

//     setSuccessMsg("✅ Student added / updated successfully");

//     setEmail("");
//     setName("");
//     setFatherName(""); // ✅ RESET
//     setCls("");
//     setGender("");
//     setTotalFees("");
//     setPaidFees("");
//     setFeesDate("");

//     setLoading(false);
//     setTimeout(() => setSuccessMsg(""), 3000);
//   };

//   /* ================= STYLES ================= */

//   const cardStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#000000",
//     borderRadius: "20px",
//     boxShadow: darkMode
//       ? "0 20px 50px rgba(0,0,0,0.7)"
//       : "0 15px 40px rgba(0,0,0,0.08)",
//   };

//   const inputStyle = {
//     backgroundColor: darkMode ? "#1e293b" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#000000",
//     border: darkMode ? "1px solid #334155" : "1px solid #ced4da",
//   };

//   const labelStyle = {
//     color: darkMode ? "#e2e8f0" : "#374151",
//     fontWeight: "600",
//     marginBottom: "6px",
//   };

//   const placeholderColor = darkMode ? "#cbd5e1" : "#6b7280";

//   return (
//     <div className="p-4" style={cardStyle}>
//       <h4 className="mb-4 fw-bold text-purple">➕ Add / Update Student</h4>

//       {successMsg && (
//         <div className="alert alert-success success-animate">{successMsg}</div>
//       )}

//       <div className="row g-4">
//         {/* EMAIL */}
//         <div className="col-md-6">
//           <label style={labelStyle}>Email</label>
//           <input
//             className="form-control custom-input"
//             style={inputStyle}
//             placeholder="Enter student email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* NAME */}
//         <div className="col-md-6">
//           <label style={labelStyle}>Student Name</label>
//           <input
//             className="form-control custom-input"
//             style={inputStyle}
//             placeholder="Enter student name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         {/* ✅ FATHER NAME (NEW FIELD) */}
//         <div className="col-md-6">
//           <label style={labelStyle}>Father Name</label>
//           <input
//             className="form-control custom-input"
//             style={inputStyle}
//             placeholder="Enter father name"
//             value={fatherName}
//             onChange={(e) => setFatherName(e.target.value)}
//           />
//         </div>

//         {/* CLASS */}
//         <div className="col-md-6">
//           <label style={labelStyle}>Class</label>
//           <input
//             className="form-control custom-input"
//             style={inputStyle}
//             placeholder="10 / +1 / +2"
//             value={cls}
//             onChange={(e) => setCls(e.target.value)}
//           />
//         </div>

//         {/* GENDER */}
//         <div className="col-md-4">
//           <label style={labelStyle}>Gender</label>
//           <select
//             className="form-control custom-input"
//             style={inputStyle}
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//           </select>
//         </div>

//         {/* FEES DATE */}
//         <div className="col-md-4">
//           <label style={labelStyle}>Fees Date</label>
//           <input
//             type="date"
//             className="form-control custom-input"
//             style={inputStyle}
//             value={feesDate}
//             onChange={(e) => setFeesDate(e.target.value)}
//           />
//         </div>

//         {/* TOTAL FEES */}
//         <div className="col-md-6">
//           <label style={labelStyle}>Total Fees</label>
//           <input
//             type="number"
//             className="form-control custom-input"
//             style={inputStyle}
//             placeholder="Enter total fees"
//             value={totalFees}
//             onChange={(e) => setTotalFees(e.target.value)}
//           />
//         </div>

//         {/* PAID FEES */}
//         <div className="col-md-6">
//           <label style={labelStyle}>Paid Fees</label>
//           <input
//             type="number"
//             className="form-control custom-input"
//             style={inputStyle}
//             placeholder="Enter paid amount"
//             value={paidFees}
//             onChange={(e) => setPaidFees(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="mt-5 text-end">
//         <button
//           className="btn save-btn px-4"
//           disabled={loading}
//           onClick={saveStudent}
//         >
//           {loading ? "Saving..." : "💾 Save Student"}
//         </button>
//       </div>

//       <style>
//         {`
//           .text-purple {
//             color: #7c3aed !important;
//           }

//           .custom-input:focus {
//             border-color: #7c3aed !important;
//             box-shadow: 0 0 12px rgba(124,58,237,0.4);
//           }

//           .save-btn {
//             background: linear-gradient(135deg,#7c3aed,#4c1d95);
//             color: white;
//             border: none;
//             border-radius: 10px;
//             transition: 0.3s ease;
//           }

//           .save-btn:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 10px 25px rgba(124,58,237,0.4);
//           }

//           .form-control::placeholder {
//             color: ${placeholderColor} !important;
//             opacity: 1;
//           }

//           .success-animate {
//             animation: fadeSlide 0.5s ease;
//           }

//           @keyframes fadeSlide {
//             from { opacity: 0; transform: translateY(-10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
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
  const [fatherName, setFatherName] = useState("");
  const [cls, setCls] = useState("");
  const [gender, setGender] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [paidFees, setPaidFees] = useState("");
  const [feesDate, setFeesDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const saveStudent = async () => {
    if (
      !email ||
      !name ||
      !fatherName ||
      !cls ||
      !gender ||
      !totalFees ||
      !paidFees ||
      !feesDate
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const pending = Number(totalFees) - Number(paidFees);
    const isCompleted = pending === 0;

    await setDoc(doc(db, "students", email), {
      email,
      name,
      fatherName,
      class: cls,
      gender,
      totalFees: Number(totalFees),
      paidFees: Number(paidFees),
      pendingFees: pending,
      feeStatus: isCompleted ? "Completed" : "Pending",
      feesDate,
      approvedAt: isCompleted ? Timestamp.now() : null,
      createdAt: Timestamp.now(),
    });

    setSuccessMsg("✅ Student added / updated successfully");

    setEmail("");
    setName("");
    setFatherName("");
    setCls("");
    setGender("");
    setTotalFees("");
    setPaidFees("");
    setFeesDate("");

    setLoading(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div
      className="add-student-wrapper"
      style={{
        background: darkMode
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#ffffff,#F8FAFC)",
        color: darkMode ? "#f1f5f9" : "#111827",
      }}
    >
      <h4 className="heading">➕ Add / Update Student</h4>

      {successMsg && (
        <div
          className="success-box"
          style={{
            background: darkMode ? "#064e3b" : "#E6F4EA",
            color: darkMode ? "#a7f3d0" : "#0F4C6C",
          }}
        >
          {successMsg}
        </div>
      )}

      <div
        className="form-card"
        style={{
          background: darkMode ? "#1e293b" : "#ffffff",
          boxShadow: darkMode
            ? "0 20px 45px rgba(0,0,0,0.6)"
            : "0 20px 45px rgba(15,76,108,0.15)",
        }}
      >
        <div className="row g-4">
          {[
            { label: "Email", value: email, set: setEmail, type: "text" },
            { label: "Student Name", value: name, set: setName, type: "text" },
            {
              label: "Father Name",
              value: fatherName,
              set: setFatherName,
              type: "text",
            },
            { label: "Class", value: cls, set: setCls, type: "text" },
          ].map((field, i) => (
            <div className="col-md-6" key={i}>
              <label className="label">{field.label}</label>
              <input
                type={field.type}
                className="form-control custom-input"
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                style={{
                  background: darkMode ? "#334155" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#111827",
                  border: darkMode ? "1px solid #475569" : "1px solid #ced4da",
                }}
              />
            </div>
          ))}

          <div className="col-md-4">
            <label className="label">Gender</label>
            <select
              className="form-control custom-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                background: darkMode ? "#334155" : "#ffffff",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="label">Fees Date</label>
            <input
              type="date"
              className="form-control custom-input"
              value={feesDate}
              onChange={(e) => setFeesDate(e.target.value)}
              style={{
                background: darkMode ? "#334155" : "#ffffff",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            />
          </div>

          <div className="col-md-6">
            <label className="label">Total Fees</label>
            <input
              type="number"
              className="form-control custom-input"
              value={totalFees}
              onChange={(e) => setTotalFees(e.target.value)}
              style={{
                background: darkMode ? "#334155" : "#ffffff",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            />
          </div>

          <div className="col-md-6">
            <label className="label">Paid Fees</label>
            <input
              type="number"
              className="form-control custom-input"
              value={paidFees}
              onChange={(e) => setPaidFees(e.target.value)}
              style={{
                background: darkMode ? "#334155" : "#ffffff",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            />
          </div>
        </div>

        <div className="text-end mt-5">
          <button className="save-btn" disabled={loading} onClick={saveStudent}>
            {loading ? "Saving..." : "💾 Save Student"}
          </button>
        </div>
      </div>

      <style>{`
.add-student-wrapper {
  padding:25px;
  border-radius:22px;
  transition:0.3s ease;
}

.heading {
  font-weight:700;
  margin-bottom:25px;
}

.label {
  font-weight:600;
  margin-bottom:6px;
}

.form-card {
  border-radius:22px;
  padding:30px;
  transition:0.3s ease;
}

.form-card:hover {
  transform:translateY(-4px);
}

.custom-input:focus {
  border-color:#D4A24C !important;
  box-shadow:0 0 10px rgba(212,162,76,0.3);
}

.save-btn {
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  border:none;
  padding:10px 24px;
  border-radius:10px;
  transition:0.3s ease;
}

.save-btn:hover {
  transform:translateY(-3px);
  box-shadow:0 12px 30px rgba(15,76,108,0.4);
}

@keyframes fadeSlide {
  from { opacity:0; transform:translateY(-8px); }
  to { opacity:1; transform:translateY(0); }
}

`}</style>
    </div>
  );
}

export default AddStudent;
