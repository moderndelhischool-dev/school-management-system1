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
    if (savedTheme === "dark") {
      setDarkMode(true);
    }

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
    <div
      className={`card shadow-lg p-4 userprofile-card ${
        darkMode ? "dark-card text-light" : ""
      }`}
    >
      <h5 className="mb-4 fw-semibold">👤 My Profile</h5>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="profile-item">
            <small className="text-muted">Name</small>
            <h6 className="mb-0">{student.name}</h6>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="profile-item">
            <small className="text-muted">Email</small>
            <h6 className="mb-0">{student.email}</h6>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="profile-item">
            <small className="text-muted">Class</small>
            <h6 className="mb-0">{student.class}</h6>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="profile-item">
            <small className="text-muted">Fees Status</small>
            <h6
              className={`mb-0 ${
                student.feeStatus === "Completed"
                  ? "text-success fw-semibold"
                  : "text-danger fw-semibold"
              }`}
            >
              {student.feeStatus}
            </h6>

            {feesMonth && (
              <small className="text-muted">
                {student.feeStatus === "Completed"
                  ? "Completed for"
                  : "Pending for"}{" "}
                {feesMonth}
              </small>
            )}
          </div>
        </div>

        {student.feeStatus === "Completed" && student.approvedAt && (
          <div className="col-12 col-md-6">
            <div className="profile-item">
              <small className="text-muted">Approved On</small>
              <h6 className="mb-0">
                {student.approvedAt.toDate().toLocaleDateString("en-IN")}
              </h6>
            </div>
          </div>
        )}

        {student.updatedAt && (
          <div className="col-12 col-md-6">
            <div className="profile-item">
              <small className="text-muted">Last Updated</small>
              <h6 className="mb-0">
                {student.updatedAt.toDate().toLocaleDateString("en-IN")}
              </h6>
            </div>
          </div>
        )}
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        .userprofile-card {
          border-radius: 18px;
          background: linear-gradient(135deg, #ffffff, #f0fdf4);
          transition: all 0.3s ease;
          border: none;
        }

        .dark-card {
          background: linear-gradient(135deg, #1f2937, #111827);
          border: 1px solid #2d3748;
        }

        .profile-item {
          padding: 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(6px);
          transition: all 0.3s ease;
        }

        .profile-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        body.dark-mode .profile-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }

        body.dark-mode .text-muted {
          color: #bbb !important;
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
