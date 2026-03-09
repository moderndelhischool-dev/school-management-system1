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
//       activePage === page ? "active-btn" : ""
//     }`;

//   return (
//     <div className="user-sidebar h-100 p-4 d-flex flex-column">
//       <h5 className="mb-4 fw-bold sidebar-title">👤 Student Panel</h5>

//       <button
//         className={btnClass("home")}
//         onClick={() => setActivePage("home")}
//       >
//         Dashboard
//       </button>

//       <button
//         className={btnClass("profile")}
//         onClick={() => setActivePage("profile")}
//       >
//         My Profile
//       </button>

//       <button
//         className={btnClass("fees")}
//         onClick={() => setActivePage("fees")}
//       >
//         Fees & Payment
//       </button>

//       <button
//         className={btnClass("history")}
//         onClick={() => setActivePage("history")}
//       >
//         Payment History
//       </button>

//       <button
//         className={btnClass("uniform")}
//         onClick={() => setActivePage("uniform")}
//       >
//         Uniform Request
//       </button>

//       <button
//         className={btnClass("certificate")}
//         onClick={() => setActivePage("certificate")}
//       >
//         Certificate Request
//       </button>

//       {/* Theme Toggle */}
//       <div className="mt-3">
//         <button className="btn btn-outline-light w-100" onClick={toggleTheme}>
//           {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
//         </button>
//       </div>

//       {/* Bottom */}
//       <div className="mt-auto pt-4 border-top sidebar-bottom text-center">
//         <button
//           className="btn btn-outline-light w-100 text-start"
//           onClick={onChangePassword}
//         >
//           🔐 Change Password
//         </button>
//       </div>

//       <style>{`

//         /* ===== SIDEBAR BACKGROUND ===== */
//         .user-sidebar {
//           background: linear-gradient(180deg,#0F4C6C,#1B5E84);
//           color: white;
//           transition: all 0.3s ease;
//           box-shadow: 4px 0 30px rgba(0,0,0,0.4);
//         }

//         body.dark-mode .user-sidebar {
//           background: linear-gradient(180deg,#0A2E42,#111827) !important;
//           border-right: 1px solid #243644;
//         }

//         /* ===== BUTTON BASE ===== */
//         .sidebar-btn {
//           border-radius: 14px;
//           background: transparent;
//           border: none;
//           color: white;
//           font-weight: 500;
//           padding: 10px 14px;
//           transition: all 0.3s ease;
//         }

//         /* Hover Effect */
//         .sidebar-btn:hover {
//           background: rgba(212,162,76,0.15);
//           transform: translateX(6px);
//         }

//         /* ===== ACTIVE BUTTON ===== */
//         .active-btn {
//           background: linear-gradient(90deg,#D4A24C,#C18F2D) !important;
//           color: #111 !important;
//           font-weight: 600;
//           transform: translateX(6px);
//           box-shadow: 0 8px 20px rgba(212,162,76,0.4);
//         }

//         /* Footer */
//         .sidebar-bottom {
//           border-color: rgba(255,255,255,0.2);
//         }

//       `}</style>
//     </div>
//   );
// }

// export default UserSidebar;
import { useEffect, useState } from "react";

import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineKey } from "react-icons/hi";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";

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
      activePage === page ? "active-btn" : ""
    }`;

  return (
    <div className="user-sidebar h-100 p-4 d-flex flex-column">
      <h5 className="mb-4 fw-bold sidebar-title">👤 Student Panel</h5>

      <button
        className={btnClass("home")}
        onClick={() => setActivePage("home")}
      >
        <span className="icon">
          <HiOutlineViewGrid />
        </span>
        Dashboard
      </button>

      <button
        className={btnClass("profile")}
        onClick={() => setActivePage("profile")}
      >
        <span className="icon">
          <HiOutlineUser />
        </span>
        My Profile
      </button>

      <button
        className={btnClass("fees")}
        onClick={() => setActivePage("fees")}
      >
        <span className="icon">
          <HiOutlineCreditCard />
        </span>
        Fees & Payment
      </button>

      <button
        className={btnClass("history")}
        onClick={() => setActivePage("history")}
      >
        <span className="icon">
          <HiOutlineClipboardList />
        </span>
        Payment History
      </button>

      <button
        className={btnClass("uniform")}
        onClick={() => setActivePage("uniform")}
      >
        <span className="icon">
          <HiOutlineShoppingBag />
        </span>
        Uniform Request
      </button>

      <button
        className={btnClass("certificate")}
        onClick={() => setActivePage("certificate")}
      >
        <span className="icon">
          <HiOutlineDocumentText />
        </span>
        Certificate Request
      </button>

      {/* Theme Toggle */}
      <div className="mt-3">
        <button
          className="btn btn-outline-light w-100 d-flex align-items-center gap-2"
          onClick={toggleTheme}
        >
          {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Bottom */}
      <div className="mt-auto pt-4 border-top sidebar-bottom text-center">
        <button
          className="btn btn-outline-light w-100 text-start d-flex align-items-center gap-2"
          onClick={onChangePassword}
        >
          <HiOutlineKey />
          Change Password
        </button>
      </div>

      <style>{`

        /* ===== SIDEBAR BACKGROUND ===== */
        .user-sidebar {
          background: linear-gradient(180deg,#0F4C6C,#1B5E84);
          color: white;
          transition: all 0.3s ease;
          box-shadow: 4px 0 30px rgba(0,0,0,0.4);
        }

        body.dark-mode .user-sidebar {
          background: linear-gradient(180deg,#0A2E42,#111827) !important;
          border-right: 1px solid #243644;
        }

        /* ===== BUTTON BASE ===== */
        .sidebar-btn {
          border-radius: 14px;
          background: transparent;
          border: none;
          color: white;
          font-weight: 500;
          padding: 10px 14px;
          transition: all 0.3s ease;
          display:flex;
          align-items:center;
          gap:10px;
        }

        /* ICON STYLE */

        .icon{
          font-size:20px;
          display:flex;
          align-items:center;
        }

        /* Hover Effect */
        .sidebar-btn:hover {
          background: rgba(212,162,76,0.15);
          transform: translateX(6px);
        }

        /* ===== ACTIVE BUTTON ===== */
        .active-btn {
          background: linear-gradient(90deg,#D4A24C,#C18F2D) !important;
          color: #111 !important;
          font-weight: 600;
          transform: translateX(6px);
          box-shadow: 0 8px 20px rgba(212,162,76,0.4);
        }

        /* Footer */
        .sidebar-bottom {
          border-color: rgba(255,255,255,0.2);
        }

      `}</style>
    </div>
  );
}

export default UserSidebar;
