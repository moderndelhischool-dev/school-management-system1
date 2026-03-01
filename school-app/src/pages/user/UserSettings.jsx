// import { useState, useEffect } from "react";
// import ChangePassword from "../../components/ChangePassword";

// function UserSettings() {
//   const [show, setShow] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//     }
//   }, []);

//   return (
//     <>
//       <div
//         className={`card shadow-sm p-4 usersettings-card ${
//           darkMode ? "bg-dark text-light" : ""
//         }`}
//       >
//         <h5 className="mb-4 fw-semibold text-purple">⚙️ Settings</h5>

//         <div className="settings-item">
//           <div>
//             <h6 className="mb-1">Change Password</h6>
//             <small className="settings-muted">
//               Update your account password for security
//             </small>
//           </div>

//           <button
//             className={`btn ${
//               darkMode ? "btn-outline-light" : "btn-outline-purple"
//             }`}
//             onClick={() => setShow(true)}
//           >
//             Update
//           </button>
//         </div>
//       </div>

//       {show && <ChangePassword onClose={() => setShow(false)} />}

//       {/* ===== CUSTOM STYLE ===== */}
//       <style>{`
//         .usersettings-card {
//           border-radius: 16px;
//           transition: all 0.3s ease;
//           border: 1px solid ${darkMode ? "#312e81" : "#ddd6fe"};
//         }

//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .settings-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 16px;
//           border-radius: 12px;
//           background: ${
//             darkMode ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)"
//           };
//           transition: all 0.3s ease;
//         }

//         .settings-item:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 18px rgba(124,58,237,0.25);
//         }

//         .settings-muted {
//           color: ${darkMode ? "#c4b5fd" : "#6b21a8"};
//         }

//         .btn-outline-purple {
//           border: 1px solid #7c3aed;
//           color: #7c3aed;
//         }

//         .btn-outline-purple:hover {
//           background: #7c3aed;
//           color: white;
//         }

//         body.dark-mode .settings-item {
//           background: rgba(124,58,237,0.2);
//         }

//         @media (max-width: 576px) {
//           .settings-item {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 10px;
//           }

//           .settings-item button {
//             width: 100%;
//           }
//         }
//       `}</style>
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
        <h5 className="mb-4 fw-semibold section-title">⚙️ Settings</h5>

        <div className="settings-item">
          <div>
            <h6 className="mb-1">Change Password</h6>
            <small className="settings-muted">
              Update your account password for security
            </small>
          </div>

          <button
            className="btn btn-outline-custom"
            onClick={() => setShow(true)}
          >
            Update
          </button>
        </div>
      </div>

      {show && <ChangePassword onClose={() => setShow(false)} />}

      <style>{`

/* CARD */
.usersettings-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid ${darkMode ? "#243644" : "#E5E7EB"};
  background: ${
    darkMode
      ? "linear-gradient(135deg,#0A2E42,#111827)"
      : "linear-gradient(135deg,#E6EEF4,#F4F6F8)"
  };
}

/* TITLE */
.section-title {
  color: #0F4C6C;
  font-weight: 700;
}

body.dark-mode .section-title {
  color: #D4A24C;
}

/* SETTINGS ITEM */
.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-radius: 14px;
  background: ${darkMode ? "rgba(15,76,108,0.25)" : "rgba(15,76,108,0.08)"};
  border-left: 4px solid #D4A24C;
  transition: all 0.3s ease;
}

.settings-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(15,76,108,0.25);
}

/* MUTED TEXT */
.settings-muted {
  color: ${darkMode ? "#CBD5E1" : "#4B5563"};
  font-size: 13px;
}

/* OUTLINE BUTTON */
.btn-outline-custom {
  border: 1px solid #0F4C6C;
  color: #0F4C6C;
  background: transparent;
  border-radius: 30px;
  padding: 6px 18px;
  transition: 0.3s ease;
}

.btn-outline-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
  border-color: #D4A24C;
}

/* DARK MODE BUTTON */
body.dark-mode .btn-outline-custom {
  border: 1px solid #D4A24C;
  color: #D4A24C;
}

body.dark-mode .btn-outline-custom:hover {
  background: #D4A24C;
  color: #0F4C6C;
}

/* RESPONSIVE */
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
