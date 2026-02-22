// import { useEffect, useState } from "react";
// import { auth, db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

// function UserProfile() {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       const user = auth.currentUser;
//       if (!user) return;

//       const snap = await getDoc(doc(db, "students", user.email));
//       if (snap.exists()) {
//         setStudent(snap.data());
//       }
//     };

//     load();
//   }, []);

//   if (!student) return null;

//   const feesMonth = student.feesDate
//     ? new Date(student.feesDate).toLocaleString("en-IN", {
//         month: "long",
//         year: "numeric",
//       })
//     : null;

//   return (
//     <div className="card shadow-sm p-4">
//       <h5 className="mb-3">👤 My Profile</h5>

//       <p>
//         <b>Name:</b> {student.name}
//       </p>

//       <p>
//         <b>Email:</b> {student.email}
//       </p>

//       <p>
//         <b>Class:</b> {student.class}
//       </p>

//       {/* ===== FEES STATUS WITH MONTH ===== */}
//       <p>
//         <b>Fees Status:</b>{" "}
//         <span
//           className={
//             student.feeStatus === "Completed"
//               ? "text-success fw-semibold"
//               : "text-danger fw-semibold"
//           }
//         >
//           {student.feeStatus}
//         </span>
//         {feesMonth && <span className="text-muted"> ({feesMonth})</span>}
//       </p>

//       {/* ===== APPROVAL DATE ===== */}
//       {student.feeStatus === "Completed" && student.approvedAt && (
//         <p className="text-muted mb-0">
//           <b>Approved On:</b>{" "}
//           {student.approvedAt.toDate().toLocaleDateString("en-IN")}
//         </p>
//       )}

//       {/* ===== LAST UPDATE ===== */}
//       {student.updatedAt && (
//         <p className="text-muted mt-1 mb-0">
//           <b>Last Updated:</b>{" "}
//           {student.updatedAt.toDate().toLocaleDateString("en-IN")}
//         </p>
//       )}
//     </div>
//   );
// }

// export default UserProfile;
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function UserProfile() {
  const [student, setStudent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);

    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "students", user.email));
      if (snap.exists()) setStudent(snap.data());
    };

    load();
  }, []);

  if (!student) return null;

  const feesMonth =
    student.feesDate &&
    new Date(student.feesDate).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });

  return (
    <div
      className="userprofile-card shadow-lg p-4"
      style={{
        background: darkMode
          ? "linear-gradient(135deg,#1e1b4b,#0f172a)"
          : "linear-gradient(135deg,#ffffff,#f3e8ff)",
        border: darkMode ? "1px solid #312e81" : "1px solid #ddd6fe",
        color: darkMode ? "#ffffff" : "#000000",
        borderRadius: "18px",
        transition: "0.3s ease",
      }}
    >
      <h5 className="mb-4 fw-semibold text-purple">👤 My Profile</h5>

      <div className="row g-3">
        {/* NAME */}
        <div className="col-md-6">
          <div className="profile-item">
            <small className="profile-muted">Name</small>
            <h6>{student.name}</h6>
          </div>
        </div>

        {/* FATHER NAME ✅ */}
        <div className="col-md-6">
          <div className="profile-item">
            <small className="profile-muted">Father Name</small>
            <h6>{student.fatherName || "—"}</h6>
          </div>
        </div>

        {/* EMAIL */}
        <div className="col-md-6">
          <div className="profile-item">
            <small className="profile-muted">Email</small>
            <h6>{student.email}</h6>
          </div>
        </div>

        {/* CLASS */}
        <div className="col-md-6">
          <div className="profile-item">
            <small className="profile-muted">Class</small>
            <h6>{student.class}</h6>
          </div>
        </div>

        {/* FEES STATUS */}
        <div className="col-md-6">
          <div className="profile-item">
            <small className="profile-muted">Fees Status</small>
            <h6
              className={
                student.feeStatus === "Completed"
                  ? "text-success fw-semibold"
                  : "text-danger fw-semibold"
              }
            >
              {student.feeStatus}
            </h6>

            {feesMonth && (
              <small className="profile-muted">
                {student.feeStatus === "Completed"
                  ? "Completed for"
                  : "Pending for"}{" "}
                {feesMonth}
              </small>
            )}
          </div>
        </div>

        {/* APPROVED DATE */}
        {student.approvedAt && (
          <div className="col-md-6">
            <div className="profile-item">
              <small className="profile-muted">Approved On</small>
              <h6>{student.approvedAt.toDate().toLocaleDateString("en-IN")}</h6>
            </div>
          </div>
        )}

        {/* LAST UPDATED */}
        {student.updatedAt && (
          <div className="col-md-6">
            <div className="profile-item">
              <small className="profile-muted">Last Updated</small>
              <h6>{student.updatedAt.toDate().toLocaleDateString("en-IN")}</h6>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .text-purple {
          color: #7c3aed !important;
        }

        .profile-item {
          padding: 14px;
          border-radius: 14px;
          background: ${
            darkMode ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)"
          };
          transition: 0.3s ease;
        }

        .profile-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(124,58,237,0.3);
        }

        .profile-muted {
          font-size: 13px;
          color: ${darkMode ? "#c4b5fd" : "#6b21a8"};
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
