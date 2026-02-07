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

  // 🔹 Load all students
  const loadStudents = async () => {
    const snap = await getDocs(collection(db, "students"));
    setStudents(snap.docs.map((doc) => doc.data()));
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
      pendingFees: pendingFees,
      feeStatus: feeStatus,
      month: editStudent.month,
      updatedAt: Timestamp.now(),
    });

    alert("✅ Student details updated successfully");

    setEditStudent(null);
    loadStudents();
  };

  return (
    <div>
      <h4 className="mb-3">📋 Students Details</h4>

      {/* ================= TABLE ================= */}
      <table className="table table-bordered table-striped">
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
              <td>{s.email}</td>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>₹{s.totalFees}</td>
              <td>₹{s.paidFees}</td>
              <td>₹{s.pendingFees}</td>
              <td>
                <span
                  className={
                    s.feeStatus === "Completed"
                      ? "badge bg-success"
                      : "badge bg-danger"
                  }
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

      {/* ================= EDIT FORM ================= */}
      {editStudent && (
        <div className="card shadow mt-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">✏️ Edit Student Details</h5>
          </div>

          <div className="card-body">
            {/* Row 1 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Student Email</label>
                <input
                  className="form-control"
                  value={editStudent.email}
                  disabled
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Student Name</label>
                <input
                  className="form-control"
                  value={editStudent.name}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Class</label>
                <input
                  className="form-control"
                  value={editStudent.class}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      class: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Fees Month</label>
                <input
                  className="form-control"
                  placeholder="March 2026"
                  value={editStudent.month}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      month: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Total Fees (₹)</label>
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

              <div className="col-md-4 mb-3">
                <label className="form-label">Paid Fees (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={editStudent.paidFees}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      paidFees: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Pending Fees (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={
                    Number(editStudent.totalFees) - Number(editStudent.paidFees)
                  }
                  disabled
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end">
              <button className="btn btn-success me-2" onClick={updateStudent}>
                💾 Update Details
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
