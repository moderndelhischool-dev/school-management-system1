// import { useState } from "react";
// import { db } from "../firebase/firebase";
// import { doc, setDoc, Timestamp } from "firebase/firestore";

// function AddStudent({ darkMode }) {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [fatherName, setFatherName] = useState("");
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
//       !fatherName ||
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
//       fatherName,
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
//     setFatherName("");
//     setCls("");
//     setGender("");
//     setTotalFees("");
//     setPaidFees("");
//     setFeesDate("");

//     setLoading(false);
//     setTimeout(() => setSuccessMsg(""), 3000);
//   };

//   return (
//     <div
//       className="add-student-wrapper"
//       style={{
//         background: darkMode
//           ? "linear-gradient(135deg,#0f172a,#1e293b)"
//           : "linear-gradient(135deg,#ffffff,#F8FAFC)",
//         color: darkMode ? "#f1f5f9" : "#111827",
//       }}
//     >
//       <h4 className="heading">➕ Add / Update Student</h4>

//       {successMsg && (
//         <div
//           className="success-box"
//           style={{
//             background: darkMode ? "#064e3b" : "#E6F4EA",
//             color: darkMode ? "#a7f3d0" : "#0F4C6C",
//           }}
//         >
//           {successMsg}
//         </div>
//       )}

//       <div
//         className="form-card"
//         style={{
//           background: darkMode ? "#1e293b" : "#ffffff",
//           boxShadow: darkMode
//             ? "0 20px 45px rgba(0,0,0,0.6)"
//             : "0 20px 45px rgba(15,76,108,0.15)",
//         }}
//       >
//         <div className="row g-4">
//           {[
//             { label: "Email", value: email, set: setEmail, type: "text" },
//             { label: "Student Name", value: name, set: setName, type: "text" },
//             {
//               label: "Father Name",
//               value: fatherName,
//               set: setFatherName,
//               type: "text",
//             },
//             { label: "Class", value: cls, set: setCls, type: "text" },
//           ].map((field, i) => (
//             <div className="col-md-6" key={i}>
//               <label className="label">{field.label}</label>
//               <input
//                 type={field.type}
//                 className="form-control custom-input"
//                 value={field.value}
//                 onChange={(e) => field.set(e.target.value)}
//                 style={{
//                   background: darkMode ? "#334155" : "#ffffff",
//                   color: darkMode ? "#ffffff" : "#111827",
//                   border: darkMode ? "1px solid #475569" : "1px solid #ced4da",
//                 }}
//               />
//             </div>
//           ))}

//           <div className="col-md-4">
//             <label className="label">Gender</label>
//             <select
//               className="form-control custom-input"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               style={{
//                 background: darkMode ? "#334155" : "#ffffff",
//                 color: darkMode ? "#ffffff" : "#111827",
//               }}
//             >
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label className="label">Fees Date</label>
//             <input
//               type="date"
//               className="form-control custom-input"
//               value={feesDate}
//               onChange={(e) => setFeesDate(e.target.value)}
//               style={{
//                 background: darkMode ? "#334155" : "#ffffff",
//                 color: darkMode ? "#ffffff" : "#111827",
//               }}
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="label">Total Fees</label>
//             <input
//               type="number"
//               className="form-control custom-input"
//               value={totalFees}
//               onChange={(e) => setTotalFees(e.target.value)}
//               style={{
//                 background: darkMode ? "#334155" : "#ffffff",
//                 color: darkMode ? "#ffffff" : "#111827",
//               }}
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="label">Paid Fees</label>
//             <input
//               type="number"
//               className="form-control custom-input"
//               value={paidFees}
//               onChange={(e) => setPaidFees(e.target.value)}
//               style={{
//                 background: darkMode ? "#334155" : "#ffffff",
//                 color: darkMode ? "#ffffff" : "#111827",
//               }}
//             />
//           </div>
//         </div>

//         <div className="text-end mt-5">
//           <button className="save-btn" disabled={loading} onClick={saveStudent}>
//             {loading ? "Saving..." : "💾 Save Student"}
//           </button>
//         </div>
//       </div>

//       <style>{`
// .add-student-wrapper {
//   padding:25px;
//   border-radius:22px;
//   transition:0.3s ease;
// }

// .heading {
//   font-weight:700;
//   margin-bottom:25px;
// }

// .label {
//   font-weight:600;
//   margin-bottom:6px;
// }

// .form-card {
//   border-radius:22px;
//   padding:30px;
//   transition:0.3s ease;
// }

// .form-card:hover {
//   transform:translateY(-4px);
// }

// .custom-input:focus {
//   border-color:#D4A24C !important;
//   box-shadow:0 0 10px rgba(212,162,76,0.3);
// }

// .save-btn {
//   background:linear-gradient(135deg,#0F4C6C,#1B5E84);
//   color:white;
//   border:none;
//   padding:10px 24px;
//   border-radius:10px;
//   transition:0.3s ease;
// }

// .save-btn:hover {
//   transform:translateY(-3px);
//   box-shadow:0 12px 30px rgba(15,76,108,0.4);
// }

// @keyframes fadeSlide {
//   from { opacity:0; transform:translateY(-8px); }
//   to { opacity:1; transform:translateY(0); }
// }

// `}</style>
//     </div>
//   );
// }

// export default AddStudent;
import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function AddStudent({ darkMode }) {
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [cls, setCls] = useState("");
  const [gender, setGender] = useState(""); // Male, Female, Other
  const [usesBus, setUsesBus] = useState(false);
  const [monthlyBusFee, setMonthlyBusFee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [paidFees, setPaidFees] = useState("");
  const [feesDate, setFeesDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

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

  const saveStudent = async () => {
    // Basic Validation
    if (
      !rollNo ||
      !email ||
      !name ||
      !fatherName ||
      !cls ||
      !gender ||
      !selectedMonth ||
      !totalFees ||
      !paidFees ||
      !feesDate
    ) {
      alert("Bhai, saari fields bharna zaroori hai!");
      return;
    }
    setLoading(true);

    const total = Number(totalFees);
    const paid = Number(paidFees);
    const pending = total - paid;
    const status =
      pending === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

    try {
      // 1. Main Student Record
      await setDoc(doc(db, "students", email), {
        rollNo,
        email,
        name,
        fatherName,
        class: cls,
        gender,
        usesBus,
        monthlyBusFee: usesBus ? Number(monthlyBusFee || 0) : 0,
        selectedMonth,
        totalFees: total,
        paidFees: paid,
        pendingFees: pending,
        feeStatus: status,
        feeDate: Timestamp.fromDate(new Date(feesDate)),
        createdAt: Timestamp.now(),
      });

      // 2. Fees History Entry
      const currentYear = new Date().getFullYear();
      const monthIndex = months.indexOf(selectedMonth) + 1;
      const monthId = `${currentYear}-${monthIndex.toString().padStart(2, "0")}`;
      const historyRef = doc(db, "students", email, "fees", monthId);

      await setDoc(
        historyRef,
        {
          amount: total,
          paid: paid,
          status: status,
          tuitionFee: total,
          busFee: 0,
          date: Timestamp.fromDate(new Date(feesDate)),
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );

      setSuccessMsg("✅ Student Record Saved Successfully!");

      // Form Reset
      setRollNo("");
      setEmail("");
      setName("");
      setFatherName("");
      setCls("");
      setGender("");
      setUsesBus(false);
      setMonthlyBusFee("");
      setSelectedMonth("");
      setTotalFees("");
      setPaidFees("");
      setFeesDate("");
    } catch (error) {
      console.error("Error:", error);
      alert("Database error! Check console.");
    }

    setLoading(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div
      className="add-student-wrapper"
      style={{
        background: darkMode ? "#0f172a" : "#F8FAFC",
        color: darkMode ? "#f1f5f9" : "#111827",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h4 className="heading mb-4">➕ Add New Student Entry</h4>

      {successMsg && (
        <div
          className="alert alert-success border-0 shadow-sm mb-4"
          style={{ borderRadius: "12px" }}
        >
          {successMsg}
        </div>
      )}

      <div
        className="form-card p-4 shadow-lg border-0"
        style={{
          background: darkMode ? "#1e293b" : "#ffffff",
          borderRadius: "20px",
        }}
      >
        {/* Grid: 5 rows (md+): row1–2 = 4 cols each, row3 = 4 cols (2 fields + spacers), row4 = divider, row5 = submit */}
        <div className="row g-3">
          <div className="col-12 col-md-3">
            <label className="label">Roll Number</label>
            <input
              className="form-control custom-input"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="101"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Student Name</label>
            <input
              className="form-control custom-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Gmail / ID</label>
            <input
              className="form-control custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@gmail.com"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Father's Name</label>
            <input
              className="form-control custom-input"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="label">Class</label>
            <input
              className="form-control custom-input"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Gender</label>
            <select
              className="form-select custom-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Fee Month</label>
            <select
              className="form-select custom-input"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Payment Date</label>
            <input
              type="date"
              className="form-control custom-input"
              value={feesDate}
              onChange={(e) => setFeesDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="label">Bus Service</label>
            <select
              className="form-select custom-input"
              value={usesBus ? "yes" : "no"}
              onChange={(e) => setUsesBus(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Bus Fee </label>
            <input
              type="number"
              className="form-control custom-input"
              value={monthlyBusFee}
              onChange={(e) => setMonthlyBusFee(e.target.value)}
              placeholder="0"
              disabled={!usesBus}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="label text-primary">Total Amount (₹)</label>
            <input
              type="number"
              className="form-control custom-input border-primary"
              value={totalFees}
              onChange={(e) => setTotalFees(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label text-success">Paid Amount (₹)</label>
            <input
              type="number"
              className="form-control custom-input border-success"
              value={paidFees}
              onChange={(e) => setPaidFees(e.target.value)}
            />
          </div>
          <div className="col-md-3 d-none d-md-block" aria-hidden="true" />
          <div className="col-md-3 d-none d-md-block" aria-hidden="true" />
        </div>

        <div className="row g-3 mt-1">
          <div className="col-12">
            <hr className="my-2 opacity-25" />
          </div>
        </div>

        <div className="row g-3 mt-3">
          <div className="col-12 text-center">
            <button
              className="save-btn px-5 py-2 shadow"
              disabled={loading}
              onClick={saveStudent}
            >
              {loading ? "Saving Data..." : "💾 Save Student Record"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .label { font-size: 13px; font-weight: 600; margin-bottom: 5px; display: block; color: ${darkMode ? "#94a3b8" : "#475569"}; }
        .custom-input { 
          border-radius: 12px; 
          padding: 10px 15px; 
          background: ${darkMode ? "#334155" : "#fff"}; 
          color: ${darkMode ? "#fff" : "#1e293b"};
          border: 1px solid ${darkMode ? "#475569" : "#cbd5e1"};
        }
        .custom-input:focus {
          border-color: #D4A24C;
          box-shadow: 0 0 10px rgba(212,162,76,0.2);
          background: ${darkMode ? "#334155" : "#fff"};
          color: ${darkMode ? "#fff" : "#1e293b"};
        }
        .save-btn {
          background: #0F4C6C;
          color: #D4A24C;
          border: 2px solid #D4A24C;
          border-radius: 12px;
          font-weight: bold;
          font-size: 16px;
          transition: 0.3s;
        }
        .save-btn:hover {
          background: #D4A24C;
          color: #0F4C6C;
          transform: translateY(-2px);
        }
        .save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default AddStudent;
