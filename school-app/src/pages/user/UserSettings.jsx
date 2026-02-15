// import { useState } from "react";
// import ChangePassword from "../../components/ChangePassword";

// function UserSettings() {
//   const [show, setShow] = useState(false);

//   return (
//     <>
//       <div className="card shadow-sm p-4">
//         <h5 className="mb-3">⚙️ Settings</h5>

//         <button
//           className="btn btn-outline-primary"
//           onClick={() => setShow(true)}
//         >
//           Change Password
//         </button>
//       </div>

//       {show && <ChangePassword onClose={() => setShow(false)} />}
//     </>
//   );
// }

// export default UserSettings;
import { useState, useEffect } from "react";
import ChangePassword from "../../components/ChangePassword";

function UserSettings() {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  return (
    <>
      <div
        className={`card shadow-sm p-4 usersettings-card ${
          darkMode ? "bg-dark text-light" : ""
        }`}
      >
        <h5 className="mb-4 fw-semibold">⚙️ Settings</h5>

        <div className="settings-item">
          <div>
            <h6 className="mb-1">Change Password</h6>
            <small className="text-muted">
              Update your account password for security
            </small>
          </div>

          <button
            className={`btn ${
              darkMode ? "btn-outline-light" : "btn-outline-primary"
            }`}
            onClick={() => setShow(true)}
          >
            Update
          </button>
        </div>
      </div>

      {show && <ChangePassword onClose={() => setShow(false)} />}

      {/* ===== CUSTOM STYLE ===== */}
      <style>{`
        .usersettings-card {
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          background: rgba(0,0,0,0.02);
          transition: all 0.3s ease;
        }

        .settings-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }

        body.dark-mode .settings-item {
          background: #2a2a2a;
        }

        body.dark-mode .text-muted {
          color: #bbb !important;
        }

        @media (max-width: 576px) {
          .settings-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .settings-item button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default UserSettings;
