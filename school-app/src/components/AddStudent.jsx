import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function AddStudent() {
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

    // reset form
    setEmail("");
    setName("");
    setCls("");
    setGender("");
    setTotalFees("");
    setPaidFees("");
    setFeesDate("");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="card p-3 p-md-4 shadow-sm">
      <h5 className="mb-3">➕ Add / Update Student</h5>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="student@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label>Name</label>
          <input
            className="form-control"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label>Class</label>
          <input
            className="form-control"
            placeholder="10 / +1 / +2"
            value={cls}
            onChange={(e) => setCls(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label>Gender</label>
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Fees Date</label>
          <input
            type="date"
            className="form-control"
            value={feesDate}
            onChange={(e) => setFeesDate(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label>Total Fees</label>
          <input
            type="number"
            className="form-control"
            value={totalFees}
            onChange={(e) => setTotalFees(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label>Paid Fees</label>
          <input
            type="number"
            className="form-control"
            value={paidFees}
            onChange={(e) => setPaidFees(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button className="btn btn-success px-4" onClick={saveStudent}>
          💾 Save Student
        </button>
      </div>
    </div>
  );
}

export default AddStudent;
