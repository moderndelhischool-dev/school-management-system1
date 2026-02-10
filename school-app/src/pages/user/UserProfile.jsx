import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function UserProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "students", user.email));
      if (snap.exists()) {
        setStudent(snap.data());
      }
    };

    load();
  }, []);

  if (!student) return null;

  const feesMonth = student.feesDate
    ? new Date(student.feesDate).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="card shadow-sm p-4">
      <h5 className="mb-3">👤 My Profile</h5>

      <p>
        <b>Name:</b> {student.name}
      </p>

      <p>
        <b>Email:</b> {student.email}
      </p>

      <p>
        <b>Class:</b> {student.class}
      </p>

      {/* ===== FEES STATUS WITH MONTH ===== */}
      <p>
        <b>Fees Status:</b>{" "}
        <span
          className={
            student.feeStatus === "Completed"
              ? "text-success fw-semibold"
              : "text-danger fw-semibold"
          }
        >
          {student.feeStatus}
        </span>
        {feesMonth && <span className="text-muted"> ({feesMonth})</span>}
      </p>

      {/* ===== APPROVAL DATE ===== */}
      {student.feeStatus === "Completed" && student.approvedAt && (
        <p className="text-muted mb-0">
          <b>Approved On:</b>{" "}
          {student.approvedAt.toDate().toLocaleDateString("en-IN")}
        </p>
      )}

      {/* ===== LAST UPDATE ===== */}
      {student.updatedAt && (
        <p className="text-muted mt-1 mb-0">
          <b>Last Updated:</b>{" "}
          {student.updatedAt.toDate().toLocaleDateString("en-IN")}
        </p>
      )}
    </div>
  );
}

export default UserProfile;
