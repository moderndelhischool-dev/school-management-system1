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
        <h5 className="mb-4 fw-semibold text-purple">⚙️ Settings</h5>

        <div className="settings-item">
          <div>
            <h6 className="mb-1">Change Password</h6>
            <small className="settings-muted">
              Update your account password for security
            </small>
          </div>

          <button
            className={`btn ${
              darkMode ? "btn-outline-light" : "btn-outline-purple"
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
          border: 1px solid ${darkMode ? "#312e81" : "#ddd6fe"};
        }

        .text-purple {
          color: #7c3aed !important;
        }

        .settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          background: ${
            darkMode ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)"
          };
          transition: all 0.3s ease;
        }

        .settings-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(124,58,237,0.25);
        }

        .settings-muted {
          color: ${darkMode ? "#c4b5fd" : "#6b21a8"};
        }

        .btn-outline-purple {
          border: 1px solid #7c3aed;
          color: #7c3aed;
        }

        .btn-outline-purple:hover {
          background: #7c3aed;
          color: white;
        }

        body.dark-mode .settings-item {
          background: rgba(124,58,237,0.2);
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
