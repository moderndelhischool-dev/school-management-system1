// import { useEffect, useState } from "react";

// function UserSidebar({ activePage, setActivePage, onChangePassword }) {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.body.classList.add("dark-mode");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);

//     if (newMode) {
//       document.body.classList.add("dark-mode");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark-mode");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const btnClass = (page) =>
//     `sidebar-btn btn w-100 text-start mb-2 ${
//       activePage === page
//         ? "active-btn"
//         : darkMode
//           ? "btn-dark text-white"
//           : "btn-light"
//     }`;

//   return (
//     <div className="user-sidebar h-100 p-4 d-flex flex-column">
//       <h5 className="mb-4 fw-bold sidebar-title">👤 Student Panel</h5>

//       {/* DASHBOARD */}
//       <button
//         className={btnClass("home")}
//         onClick={() => setActivePage("home")}
//       >
//         📊 Dashboard
//       </button>

//       {/* PROFILE */}
//       <button
//         className={btnClass("profile")}
//         onClick={() => setActivePage("profile")}
//       >
//         🙍 My Profile
//       </button>

//       {/* FEES */}
//       <button
//         className={btnClass("fees")}
//         onClick={() => setActivePage("fees")}
//       >
//         💳 Fees & Payment
//       </button>

//       {/* PAYMENT HISTORY */}
//       <button
//         className={btnClass("history")}
//         onClick={() => setActivePage("history")}
//       >
//         🧾 Payment History
//       </button>

//       {/* ✅ NEW UNIFORM BUTTON */}
//       <button
//         className={btnClass("uniform")}
//         onClick={() => setActivePage("uniform")}
//       >
//         👔 Uniform Request
//       </button>

//       {/* ✅ NEW CERTIFICATE BUTTON */}
//       <button
//         className={btnClass("certificate")}
//         onClick={() => setActivePage("certificate")}
//       >
//         📜 Certificate Request
//       </button>

//       {/* DARK MODE BUTTON */}
//       <div className="mt-3">
//         <button
//           className={`btn w-100 ${
//             darkMode ? "btn-outline-light" : "btn-outline-dark"
//           }`}
//           onClick={toggleTheme}
//         >
//           {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
//         </button>
//       </div>

//       {/* 🔥 BOTTOM SECTION */}
//       <div className="mt-auto pt-4 border-top sidebar-bottom text-center">
//         <button
//           className={`btn w-100 text-start ${
//             darkMode ? "btn-outline-light" : "btn-outline-secondary"
//           }`}
//           onClick={onChangePassword}
//         >
//           🔐 Change Password
//         </button>
//       </div>

//       {/* ================= STYLES ================= */}
//       <style>{`

//         .user-sidebar {
//           background: linear-gradient(180deg, #16a34a, #22c55e);
//           color: white;
//           transition: all 0.3s ease;
//         }

//         body.dark-mode .user-sidebar {
//           background: linear-gradient(180deg, #0f172a, #020617) !important;
//           border-right: 1px solid #1e293b;
//         }

//         .sidebar-btn {
//           border-radius: 12px;
//           transition: all 0.3s ease;
//           font-weight: 500;
//           padding: 10px 14px;
//         }

//         .sidebar-btn:hover {
//           transform: translateX(6px);
//           box-shadow: 0 6px 18px rgba(0,0,0,0.2);
//         }

//         .active-btn {
//           background: linear-gradient(90deg, #ffffff, #e2e8f0) !important;
//           color: #16a34a !important;
//           border: none !important;
//           transform: translateX(6px);
//           box-shadow: 0 6px 18px rgba(0,0,0,0.25);
//         }

//         body.dark-mode .active-btn {
//           background: linear-gradient(90deg, #3b82f6, #2563eb) !important;
//           color: white !important;
//         }

//         .sidebar-bottom {
//           border-color: rgba(255,255,255,0.2);
//         }

//       `}</style>
//     </div>
//   );
// }

// export default UserSidebar;
import { useEffect, useState } from "react";

function UserSidebar({ activePage, setActivePage, onChangePassword }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  const btnClass = (page) =>
    `sidebar-btn btn w-100 text-start mb-2 ${
      activePage === page
        ? "active-btn"
        : darkMode
          ? "btn-dark text-white"
          : "btn-light"
    }`;

  return (
    <div className="user-sidebar h-100 p-4 d-flex flex-column">
      <h5 className="mb-4 fw-bold sidebar-title">👤 Student Panel</h5>

      <button
        className={btnClass("home")}
        onClick={() => setActivePage("home")}
      >
        📊 Dashboard
      </button>

      <button
        className={btnClass("profile")}
        onClick={() => setActivePage("profile")}
      >
        🙍 My Profile
      </button>

      <button
        className={btnClass("fees")}
        onClick={() => setActivePage("fees")}
      >
        💳 Fees & Payment
      </button>

      <button
        className={btnClass("history")}
        onClick={() => setActivePage("history")}
      >
        🧾 Payment History
      </button>

      <button
        className={btnClass("uniform")}
        onClick={() => setActivePage("uniform")}
      >
        👔 Uniform Request
      </button>

      <button
        className={btnClass("certificate")}
        onClick={() => setActivePage("certificate")}
      >
        📜 Certificate Request
      </button>

      {/* DARK MODE BUTTON */}
      <div className="mt-3">
        <button
          className={`btn w-100 ${
            darkMode ? "btn-outline-light" : "btn-outline-dark"
          }`}
          onClick={toggleTheme}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* BOTTOM */}
      <div className="mt-auto pt-4 border-top sidebar-bottom text-center">
        <button
          className={`btn w-100 text-start ${
            darkMode ? "btn-outline-light" : "btn-outline-secondary"
          }`}
          onClick={onChangePassword}
        >
          🔐 Change Password
        </button>
      </div>

      <style>{`

        /* ===== SIDEBAR BACKGROUND ===== */
        .user-sidebar {
          background: linear-gradient(180deg, #4c1d95, #7c3aed);
          color: white;
          transition: all 0.3s ease;
        }

        body.dark-mode .user-sidebar {
          background: linear-gradient(180deg, #0f172a, #1e1b4b) !important;
          border-right: 1px solid #312e81;
        }

        /* ===== BUTTON BASE ===== */
        .sidebar-btn {
          border-radius: 12px;
          transition: all 0.3s ease;
          font-weight: 500;
          padding: 10px 14px;
        }

        /* Hover Effect */
        .sidebar-btn:hover {
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(124,58,237,0.35);
        }

        /* ===== ACTIVE BUTTON ===== */
        .active-btn {
          background: linear-gradient(90deg, #ffffff, #ede9fe) !important;
          color: #4c1d95 !important;
          border: none !important;
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        }

        body.dark-mode .active-btn {
          background: linear-gradient(90deg, #7c3aed, #4c1d95) !important;
          color: white !important;
        }

        .sidebar-bottom {
          border-color: rgba(255,255,255,0.2);
        }

      `}</style>
    </div>
  );
}

export default UserSidebar;
