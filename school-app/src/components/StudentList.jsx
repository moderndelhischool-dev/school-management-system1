import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  // 🔹 Load students
  const loadStudents = async () => {
    const snap = await getDocs(collection(db, "students"));
    setStudents(snap.docs.map((d) => d.data()));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // 🔹 Update student
  const updateStudent = async () => {
    const pendingFees =
      Number(editStudent.totalFees) - Number(editStudent.paidFees);

    const feeStatus = pendingFees === 0 ? "Completed" : "Pending";

    await updateDoc(doc(db, "students", editStudent.email), {
      name: editStudent.name,
      class: editStudent.class,
      totalFees: Number(editStudent.totalFees),
      paidFees: Number(editStudent.paidFees),
      pendingFees,
      feeStatus,
      month: editStudent.month,
      updatedAt: Timestamp.now(),
    });

    alert("✅ Student details updated successfully");
    setEditStudent(null);
    loadStudents();
  };

  return (
    <div className="container-fluid p-0">
      <h4 className="mb-3">📋 Students Details</h4>

      {/* ================================================= */}
      {/* ================= DESKTOP TABLE ================= */}
      {/* ================================================= */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Class</th>
                <th>Total Fees</th>
                <th>Paid Fees</th>
                <th>Pending Fees</th>
                <th>Status</th>
                <th>Month</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td className="text-break">{s.email}</td>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>₹{s.totalFees}</td>
                  <td>₹{s.paidFees}</td>
                  <td>₹{s.pendingFees}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.feeStatus === "Completed" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {s.feeStatus}
                    </span>
                  </td>
                  <td>{s.month}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditStudent({ ...s })}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================================================= */}
      {/* ================= MOBILE CARDS ================= */}
      {/* ================================================= */}
      <div className="d-block d-md-none">
        {students.map((s, index) => (
          <div className="card shadow-sm mb-3" key={index}>
            <div className="card-body">
              <p className="mb-1">
                <b>Email:</b> <span className="text-break">{s.email}</span>
              </p>
              <p className="mb-1">
                <b>Name:</b> {s.name}
              </p>
              <p className="mb-1">
                <b>Class:</b> {s.class}
              </p>
              <p className="mb-1">
                <b>Total Fees:</b> ₹{s.totalFees}
              </p>
              <p className="mb-1">
                <b>Paid Fees:</b>{" "}
                <span className="text-success">₹{s.paidFees}</span>
              </p>
              <p className="mb-1">
                <b>Pending Fees:</b>{" "}
                <span className="text-danger">₹{s.pendingFees}</span>
              </p>
              <p className="mb-2">
                <b>Status:</b>{" "}
                <span
                  className={`badge ${
                    s.feeStatus === "Completed" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {s.feeStatus}
                </span>
              </p>
              <p className="mb-2">
                <b>Month:</b> {s.month}
              </p>

              <button
                className="btn btn-warning btn-sm w-100"
                onClick={() => setEditStudent({ ...s })}
              >
                ✏️ Edit Student
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================================================= */}
      {/* ================= EDIT FORM ================= */}
      {/* ================================================= */}
      {editStudent && (
        <div className="card shadow mt-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">✏️ Edit Student Details</h5>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={editStudent.email}
                  disabled
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={editStudent.name}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, name: e.target.value })
                  }
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Class</label>
                <input
                  className="form-control"
                  value={editStudent.class}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, class: e.target.value })
                  }
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Month</label>
                <input
                  className="form-control"
                  value={editStudent.month}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, month: e.target.value })
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Total Fees</label>
                <input
                  type="number"
                  className="form-control"
                  value={editStudent.totalFees}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      totalFees: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Paid Fees</label>
                <input
                  type="number"
                  className="form-control"
                  value={editStudent.paidFees}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, paidFees: e.target.value })
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Pending Fees</label>
                <input
                  className="form-control"
                  disabled
                  value={
                    Number(editStudent.totalFees) - Number(editStudent.paidFees)
                  }
                />
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
              <button className="btn btn-success" onClick={updateStudent}>
                💾 Update
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setEditStudent(null)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
