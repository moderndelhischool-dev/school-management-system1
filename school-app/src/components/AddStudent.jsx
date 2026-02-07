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
  const [month, setMonth] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const saveStudent = async () => {
    if (
      !email ||
      !name ||
      !cls ||
      !gender ||
      !totalFees ||
      !paidFees ||
      !month
    ) {
      alert("Please fill all fields");
      return;
    }

    const pending = Number(totalFees) - Number(paidFees);

    await setDoc(doc(db, "students", email), {
      email,
      name,
      class: cls,
      gender,
      totalFees: Number(totalFees),
      paidFees: Number(paidFees),
      pendingFees: pending,
      feeStatus: pending === 0 ? "Completed" : "Pending",
      month,
      updatedAt: Timestamp.now(),
    });

    // ✅ SUCCESS MESSAGE (same position, top of form)
    setSuccessMsg("✅ Student added / updated successfully");

    // 🔄 Clear form (position unchanged)
    setEmail("");
    setName("");
    setCls("");
    setGender("");
    setTotalFees("");
    setPaidFees("");
    setMonth("");

    // ⏱ Auto hide
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="card p-3">
      <h5>Add Student</h5>

      {/* SUCCESS MESSAGE — FORM KE ANDAR, SAME PLACE */}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Class"
        value={cls}
        onChange={(e) => setCls(e.target.value)}
      />

      <select
        className="form-control mb-2"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Total Fees"
        value={totalFees}
        onChange={(e) => setTotalFees(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Paid Fees"
        value={paidFees}
        onChange={(e) => setPaidFees(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Fees Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <button className="btn btn-success" onClick={saveStudent}>
        Save / Update
      </button>
    </div>
  );
}

export default AddStudent;
