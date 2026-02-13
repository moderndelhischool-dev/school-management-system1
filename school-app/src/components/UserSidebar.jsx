// function UserSidebar({ activePage, setActivePage, onChangePassword }) {
//   const btnClass = (page) =>
//     `btn w-100 text-start mb-2 ${
//       activePage === page ? "btn-primary text-white" : "btn-light"
//     }`;

//   return (
//     <div className="bg-white h-100 border-end p-3 d-flex flex-column">
//       <h5 className="mb-4">👤 Student</h5>

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

//       {/* PAYMENT HISTORY ✅ */}
//       <button
//         className={btnClass("history")}
//         onClick={() => setActivePage("history")}
//       >
//         🧾 Payment History
//       </button>

//       {/* CHANGE PASSWORD – DESKTOP ONLY */}
//       <div className="mt-auto d-none d-md-block pt-3 border-top">
//         <button
//           className="btn btn-outline-secondary w-100 text-start"
//           onClick={onChangePassword}
//         >
//           🔐 Change Password
//         </button>
//       </div>
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
    `btn w-100 text-start mb-2 ${
      activePage === page
        ? "btn-primary text-white"
        : darkMode
          ? "btn-dark text-white"
          : "btn-light"
    }`;

  return (
    <div className="user-sidebar h-100 border-end p-3 d-flex flex-column">
      <h5 className="mb-4">👤 Student</h5>

      {/* DASHBOARD */}
      <button
        className={btnClass("home")}
        onClick={() => setActivePage("home")}
      >
        📊 Dashboard
      </button>

      {/* PROFILE */}
      <button
        className={btnClass("profile")}
        onClick={() => setActivePage("profile")}
      >
        🙍 My Profile
      </button>

      {/* FEES */}
      <button
        className={btnClass("fees")}
        onClick={() => setActivePage("fees")}
      >
        💳 Fees & Payment
      </button>

      {/* PAYMENT HISTORY */}
      <button
        className={btnClass("history")}
        onClick={() => setActivePage("history")}
      >
        🧾 Payment History
      </button>

      {/* DARK MODE TOGGLE */}
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

      {/* CHANGE PASSWORD – DESKTOP ONLY */}
      <div className="mt-auto d-none d-md-block pt-3 border-top">
        <button
          className={`btn w-100 text-start ${
            darkMode ? "btn-outline-light" : "btn-outline-secondary"
          }`}
          onClick={onChangePassword}
        >
          🔐 Change Password
        </button>
      </div>

      {/* DARK MODE STYLE */}
      <style>{`
        .user-sidebar {
          background-color: white;
          transition: background-color 0.3s ease;
        }

        body.dark-mode .user-sidebar {
          background-color: #1e1e1e !important;
          color: white !important;
          border-color: #333 !important;
        }

        body.dark-mode .user-sidebar h5 {
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default UserSidebar;
