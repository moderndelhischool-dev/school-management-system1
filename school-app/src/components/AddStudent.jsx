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
import { useState, useEffect, useMemo } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import {
  loadActiveSessionClassTuitionBusMap,
  scheduleCycleTotalForStudent,
  monthlyTotalWithExam,
  normalizeClassKey,
  currentMonthKey,
} from "../utils/feeBilling";
import { allocateRegistrationNumber } from "../utils/registrationNumber";
import { canAdminAction } from "../utils/adminRbac";

function feeMonthFromForm(selectedMonth, feesDate, months) {
  let y = new Date().getFullYear();
  if (feesDate && /^\d{4}-\d{2}-\d{2}$/.test(feesDate)) {
    y = new Date(`${feesDate}T12:00:00`).getFullYear();
  }
  if (selectedMonth && months.includes(selectedMonth)) {
    const mi = months.indexOf(selectedMonth) + 1;
    return `${y}-${String(mi).padStart(2, "0")}`;
  }
  return currentMonthKey(new Date(y, new Date().getMonth(), 1));
}

function AddStudent({ darkMode, adminAccess = { role: "admin", perms: {} } }) {
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [primaryContactNumber, setPrimaryContactNumber] = useState("");
  const [alternateContactNumber, setAlternateContactNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [cls, setCls] = useState("");
  const [gender, setGender] = useState(""); // Male, Female, Other
  const [usesBus, setUsesBus] = useState(false);
  const [overrideTransportFee, setOverrideTransportFee] = useState(false);
  const [monthlyBusFee, setMonthlyBusFee] = useState("");
  const [busDistanceKm, setBusDistanceKm] = useState("");
  const [scholarshipYes, setScholarshipYes] = useState(false);
  const [scholarshipNote, setScholarshipNote] = useState("");
  const [feeMaps, setFeeMaps] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [paidFees, setPaidFees] = useState("");
  const [feesDate, setFeesDate] = useState("");
  const [feePreview, setFeePreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [displayRegistrationNo, setDisplayRegistrationNo] = useState("");

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

  useEffect(() => {
   
    const now = new Date();
    const todayIso = now.toISOString().slice(0, 10);
    setFeesDate((v) => v || todayIso);
    setSelectedMonth((v) => v || months[now.getMonth()]);
  }, []);

  const CLASS_OPTIONS = [
    "nursery",
    "lkg",
    "ukg",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const selectedClassKey = useMemo(() => normalizeClassKey(cls), [cls]);
  const classTuitionPreview = useMemo(() => {
    if (!feeMaps?.tuitionMap) return 0;
    if (!selectedClassKey) return 0;
    return Number(feeMaps.tuitionMap?.[selectedClassKey] ?? 0) || 0;
  }, [feeMaps?.tuitionMap, selectedClassKey]);

  const classTransportRatePreview = useMemo(() => {
    if (!feeMaps?.busRatePerKmMap) return 0;
    if (!selectedClassKey) return 0;
    return Number(feeMaps.busRatePerKmMap?.[selectedClassKey] ?? 0) || 0;
  }, [feeMaps?.busRatePerKmMap, selectedClassKey]);

  useEffect(() => {
    loadActiveSessionClassTuitionBusMap(db).then(setFeeMaps);
  }, []);

  useEffect(() => {
    if (!feeMaps?.tuitionMap || !String(cls || "").trim()) return;
    const ck = normalizeClassKey(cls);
    const schFrom = Number(feeMaps.scholarshipMap?.[ck] ?? 0);
    const busRate = Number(feeMaps.busRatePerKmMap?.[ck] ?? 0);
    const feeMonthKey = feeMonthFromForm(selectedMonth, feesDate, months);
    const stub = {
      class: cls,
      usesBus,
      busDistanceKm:
        usesBus && !overrideTransportFee ? Number(busDistanceKm || 0) : 0,
      monthlyBusFee:
        usesBus && overrideTransportFee ? Number(monthlyBusFee || 0) : 0,
      scholarshipAmount: scholarshipYes ? schFrom : 0,
      scholarshipPercent: 0,
      scholarshipSessionId:
        scholarshipYes && schFrom > 0 ? feeMaps.activeSessionId || "" : "",
      feeMonth: feeMonthKey,
    };
    const line = monthlyTotalWithExam(
      feeMaps.tuitionMap,
      feeMaps.busMap,
      feeMaps.examFeeMap,
      feeMaps.examMonthsMap,
      stub,
      feeMonthKey,
      feeMaps.busRatePerKmMap || {},
      feeMaps.admissionFeeMap || {},
      feeMaps.sundryChargesMap || {},
    );
    setFeePreview(line);
    const net = scheduleCycleTotalForStudent(
      feeMaps.tuitionMap,
      feeMaps.busMap,
      stub,
      feeMaps.examFeeMap,
      feeMaps.examMonthsMap,
      feeMaps.busRatePerKmMap || {},
      feeMaps.admissionFeeMap || {},
      feeMaps.sundryChargesMap || {},
    );
    setTotalFees(String(Math.round(net * 100) / 100));
  }, [
    feeMaps,
    cls,
    usesBus,
    overrideTransportFee,
    busDistanceKm,
    monthlyBusFee,
    scholarshipYes,
    selectedMonth,
    feesDate,
  ]);

  const saveStudent = async () => {
    if (!canAdminAction(adminAccess, "students", "add", true)) {
      alert("Access denied: you do not have permission to add students.");
      return;
    }
    // Basic Validation
    const primaryPhone = String(primaryContactNumber || "").trim();
    const altPhone = String(alternateContactNumber || "").trim();
    const aadRaw = String(aadharNumber || "").trim();
    const aad = aadRaw ? aadRaw.replace(/\s+/g, "").replace(/-/g, "") : "";
    if (aad && !/^\d{12}$/.test(aad)) {
      alert("Aadhar number must be 12 digits.");
      return;
    }
    if (
      !rollNo ||
      !email ||
      !name ||
      !fatherName ||
      !primaryPhone ||
      !cls ||
      !gender ||
      !selectedMonth ||
      !paidFees ||
      !feesDate
    ) {
      alert("Please complete all required fields.");
      return;
    }
    setLoading(true);
    setDisplayRegistrationNo("");

    try {
      const maps = await loadActiveSessionClassTuitionBusMap(db);
      const sid = maps.activeSessionId || "";
      const ck = normalizeClassKey(cls);
      const schFrom = Number(maps.scholarshipMap?.[ck] ?? 0);
      const schAmt = scholarshipYes ? schFrom : 0;
      const busRate = Number(maps.busRatePerKmMap?.[ck] ?? 0);
      const monthId = feeMonthFromForm(selectedMonth, feesDate, months);

      const stub = {
        class: cls,
        usesBus,
        busDistanceKm:
          usesBus && !overrideTransportFee ? Number(busDistanceKm || 0) : 0,
        monthlyBusFee:
          usesBus && overrideTransportFee ? Number(monthlyBusFee || 0) : 0,
        scholarshipAmount: schAmt,
        scholarshipPercent: 0,
        scholarshipSessionId:
          schAmt > 0 && scholarshipYes ? sid : "",
        feeMonth: monthId,
      };
      const line = monthlyTotalWithExam(
        maps.tuitionMap,
        maps.busMap,
        maps.examFeeMap,
        maps.examMonthsMap,
        stub,
        monthId,
        maps.busRatePerKmMap || {},
        maps.admissionFeeMap || {},
        maps.sundryChargesMap || {},
      );

      const total = Math.round(line.total * 100) / 100;
      const paid = Math.min(Math.max(Number(paidFees) || 0, 0), total);
      const pending = Math.max(total - paid, 0);
      const status =
        pending === 0 ? "Completed" : paid > 0 ? "Partial" : "Pending";

      const studentRef = doc(db, "students", email);
      const existingSnap = await getDoc(studentRef);
      const existingReg = String(
        existingSnap.exists() ? existingSnap.data()?.registrationNo || "" : "",
      ).trim();
      let registrationNo = existingReg;
      if (!registrationNo) {
        if (!sid) {
          alert(
            "Mark an academic session as active (Fee structure → Sessions) before registering new students.",
          );
          setLoading(false);
          return;
        }
        registrationNo = await allocateRegistrationNumber(db, { sessionId: sid });
      }

      // 1. Main Student Record
      await setDoc(studentRef, {
        rollNo,
        registrationNo,
        email,
        name,
        fatherName,
        motherName: String(motherName || "").trim(),
        primaryContactNumber: primaryPhone,
        alternateContactNumber: altPhone,
        aadharNumber: aad,
        class: cls,
        gender,
        usesBus,
        monthlyBusFee:
          usesBus && overrideTransportFee ? Number(monthlyBusFee || 0) : 0,
        busDistanceKm: usesBus ? Number(busDistanceKm || 0) : 0,
        scholarshipAmount: schAmt,
        scholarshipPercent: 0,
        scholarshipSessionId: schAmt > 0 ? sid : "",
        scholarshipNote: String(scholarshipNote || "").slice(0, 240),
        sessionId: sid || "",
        feeMonth: monthId,
        monthlyTuitionFeeApplied: line.tuition,
        monthlyBusFeeApplied: line.bus,
        examFeeApplied: line.exam,
        admissionFeeApplied: line.admission || 0,
        sundryChargesApplied: line.sundry || 0,
        selectedMonth,
        totalFees: total,
        paidFees: paid,
        pendingFees: pending,
        feeStatus: status,
        feeDate: Timestamp.fromDate(new Date(feesDate)),
        createdAt: existingSnap.exists()
          ? existingSnap.data()?.createdAt || Timestamp.now()
          : Timestamp.now(),
      });

      // 2. Fees History Entry
      const historyRef = doc(db, "students", email, "fees", monthId);

      await setDoc(
        historyRef,
        {
          amount: total,
          paid: paid,
          status: status,
          tuitionFee: line.tuition,
          busFee: line.bus,
          examFee: line.exam,
          admissionFee: line.admission || 0,
          sundryCharges: line.sundry || 0,
          date: Timestamp.fromDate(new Date(feesDate)),
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );

      setSuccessMsg("Student record saved successfully.");
      setDisplayRegistrationNo(registrationNo);

      // Form Reset
      setRollNo("");
      setEmail("");
      setName("");
      setFatherName("");
      setMotherName("");
      setPrimaryContactNumber("");
      setAlternateContactNumber("");
      setAadharNumber("");
      setCls("");
      setGender("");
      setUsesBus(false);
      setMonthlyBusFee("");
      setBusDistanceKm("");
      setScholarshipYes(false);
      setScholarshipNote("");
      setSelectedMonth("");
      setTotalFees("");
      setPaidFees("");
      setFeesDate("");
    } catch (error) {
      console.error("Error:", error);
      alert("Could not save. Please try again or contact support.");
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
      <h4 className="heading mb-4">Register new student</h4>

      {successMsg && (
        <div
          className="alert alert-success border-0 shadow-sm mb-4"
          style={{ borderRadius: "12px" }}
        >
          {successMsg}
          {displayRegistrationNo ? (
            <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(25,135,84,0.25)" }}>
              <strong>Registration number:</strong>{" "}
              <span className="font-monospace fs-5">{displayRegistrationNo}</span>
            </div>
          ) : null}
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
            <label className="label">Roll number</label>
            <input
              className="form-control custom-input"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="101"
            />
            
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Registration number</label>
            <input
              className="form-control custom-input font-monospace"
              readOnly
              value={displayRegistrationNo}
              placeholder="Save to assign"
              title="Assigned on save"
            />

          </div>
          <div className="col-12 col-md-3">
            <label className="label">Student name</label>
            <input
              className="form-control custom-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Email address</label>
            <input
              className="form-control custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@gmail.com"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Father's name</label>
            <input
              className="form-control custom-input"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Mother's name</label>
            <input
              className="form-control custom-input"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Primary contact number</label>
            <input
              className="form-control custom-input"
              value={primaryContactNumber}
              onChange={(e) => setPrimaryContactNumber(e.target.value)}
              placeholder="10-digit number"
              inputMode="numeric"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Alternate contact number</label>
            <input
              className="form-control custom-input"
              value={alternateContactNumber}
              onChange={(e) => setAlternateContactNumber(e.target.value)}
              placeholder="Optional"
              inputMode="numeric"
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Aadhar number</label>
            <input
              className="form-control custom-input"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              placeholder="12 digits (optional)"
              inputMode="numeric"
              maxLength={14}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="label">Class / Grade</label>
            <select
              className="form-select custom-input"
              value={cls}
              onChange={(e) => setCls(e.target.value)}
            >
              <option value="">Select class / grade</option>
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Monthly tuition fee (₹)</label>
            <input
              type="number"
              className="form-control custom-input"
              readOnly
              value={classTuitionPreview || ""}
              placeholder="Select class"
              title="From Fee Structure (active session)"
            />
           
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Scholarship</label>
            <select
              className="form-select custom-input"
              value={scholarshipYes ? "yes" : "no"}
              onChange={(e) => setScholarshipYes(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Scholarship notes (optional)</label>
            <input
              className="form-control custom-input"
              value={scholarshipNote}
              onChange={(e) => setScholarshipNote(e.target.value)}
              placeholder="Optional"
              maxLength={240}
            />
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Gender</label>
            <select
              className="form-select custom-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Billing month</label>
            <select
              className="form-select custom-input"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">Select month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Billing date</label>
            <input
              type="date"
              className="form-control custom-input"
              value={feesDate}
              onChange={(e) => setFeesDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="label">School transport</label>
            <select
              className="form-select custom-input"
              value={usesBus ? "yes" : "no"}
              onChange={(e) => {
                const yes = e.target.value === "yes";
                setUsesBus(yes);
                if (!yes) {
                  setBusDistanceKm("");
                  setMonthlyBusFee("");
                  setOverrideTransportFee(false);
                }
              }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Bus distance</label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="form-control custom-input"
              value={busDistanceKm}
              onChange={(e) => setBusDistanceKm(e.target.value)}
              placeholder="e.g. 5"
              disabled={!usesBus || overrideTransportFee}
            />
            
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Transport fee override</label>
            <select
              className="form-select custom-input"
              value={overrideTransportFee ? "yes" : "no"}
              onChange={(e) => {
                const yes = e.target.value === "yes";
                setOverrideTransportFee(yes);
                if (!yes) setMonthlyBusFee("");
              }}
              disabled={!usesBus}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="label">Manual transport fee (₹ / month)</label>
            <input
              type="number"
              className="form-control custom-input"
              value={monthlyBusFee}
              onChange={(e) => setMonthlyBusFee(e.target.value)}
              placeholder="0"
              disabled={!usesBus || !overrideTransportFee}
            />
            
          </div>

          <div className="col-12 col-md-3">
            <label className="label text-primary">Net fee payable (₹)</label>
            <input
              type="number"
              className="form-control custom-input border-primary"
              readOnly
              value={totalFees}
              title="Calculated from fee schedule (tuition, transport, exams, scholarship)"
            />
            
          </div>
          <div className="col-12 col-md-3">
            <label className="label text-success">Amount paid (₹)</label>
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
              {loading ? "Saving…" : "Save record"}
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
