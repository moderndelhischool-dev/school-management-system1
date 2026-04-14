// import { useState, useEffect } from "react";
// import UserSidebar from "../../components/UserSidebar";

// function UserLayout({ children, onChangePassword }) {
//   const [activePage, setActivePage] = useState("home");
//   const [showSidebar, setShowSidebar] = useState(false);
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

//   return (
//     <div className="container-fluid userlayout-wrapper min-vh-100 p-0">
//       <div className="row min-vh-100 g-0 m-0">
//         {/* DESKTOP SIDEBAR */}
//         <div className="col-md-3 col-lg-2 d-none d-md-block p-0 sidebar-col">
//           <UserSidebar
//             activePage={activePage}
//             setActivePage={setActivePage}
//             onChangePassword={onChangePassword}
//             darkMode={darkMode}
//             toggleTheme={toggleTheme}
//           />
//         </div>

//         {/* MOBILE SIDEBAR */}
//         <div className={`mobile-user-sidebar ${showSidebar ? "open" : ""}`}>
//           <div className="mobile-user-content">
//             <div className="text-end mb-3">
//               <button
//                 className="btn btn-sm btn-light close-btn"
//                 onClick={() => setShowSidebar(false)}
//               >
//                 ✖
//               </button>
//             </div>

//             <UserSidebar
//               activePage={activePage}
//               setActivePage={(page) => {
//                 setActivePage(page);
//                 setShowSidebar(false);
//               }}
//               onChangePassword={onChangePassword}
//               darkMode={darkMode}
//               toggleTheme={toggleTheme}
//             />
//           </div>
//         </div>

//         {showSidebar && (
//           <div
//             className="mobile-overlay"
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         {/* MAIN CONTENT */}
//         <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4 userlayout-content">
//           <div className="d-md-none mb-3 d-flex justify-content-between align-items-center">
//             <button
//               className="btn btn-purple btn-sm"
//               onClick={() => setShowSidebar(true)}
//             >
//               ☰ Menu
//             </button>

//             <button
//               className="btn btn-outline-purple btn-sm"
//               onClick={toggleTheme}
//             >
//               {darkMode ? "🌙 Dark" : "☀ Light"}
//             </button>
//           </div>

//           {typeof children === "function"
//             ? children(activePage, darkMode)
//             : children}
//         </div>
//       </div>

//       <style>{`
//         body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//         }

//         .userlayout-wrapper {
//           background: linear-gradient(135deg,#ffffff,#f3e8ff);
//           transition: background 0.3s ease;
//           overflow-x: hidden;
//         }

//         body.dark-mode .userlayout-wrapper {
//           background: linear-gradient(135deg,#1e1b4b,#0f172a) !important;
//           color: white !important;
//         }

//         body.dark-mode .userlayout-content {
//           color: white !important;
//         }

//         .sidebar-col {
//           height: 100vh;
//         }

//         /* MOBILE SIDEBAR */
//         .mobile-user-sidebar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           height: 100%;
//           width: 260px;
//           background: linear-gradient(180deg,#ede9fe,#f3e8ff);
//           transform: translateX(-100%);
//           transition: transform 0.35s ease;
//           z-index: 1050;
//           box-shadow: 4px 0 25px rgba(124,58,237,0.3);
//         }

//         body.dark-mode .mobile-user-sidebar {
//           background: linear-gradient(180deg,#1e1b4b,#0f172a);
//         }

//         .mobile-user-sidebar.open {
//           transform: translateX(0);
//         }

//         .mobile-user-content {
//           height: 100%;
//           padding: 20px;
//           overflow-y: auto;
//         }

//         .mobile-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(124,58,237,0.25);
//           backdrop-filter: blur(3px);
//           z-index: 1040;
//         }

//         /* Buttons */
//         .btn-purple {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//         }

//         .btn-purple:hover {
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//           transform: translateY(-2px);
//         }

//         .btn-outline-purple {
//           border: 1px solid #7c3aed;
//           color: #7c3aed;
//         }

//         .btn-outline-purple:hover {
//           background: #7c3aed;
//           color: white;
//         }

//         .close-btn {
//           background: #7c3aed;
//           color: white;
//           border: none;
//         }

//         .close-btn:hover {
//           background: #6d28d9;
//         }

//         @media (min-width: 768px) {
//           .mobile-user-sidebar,
//           .mobile-overlay {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default UserLayout;
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import UserSidebar from "../../components/UserSidebar";

const VALID_USER_PAGES = new Set([
  "home",
  "profile",
  "fees",
  "history",
  "uniform",
  "certificate",
  "contact",
]);

function pageFromPathname(pathname) {
  const seg = pathname
    .replace(/^\/user\/?/, "")
    .split("/")
    .filter(Boolean)[0];
  if (!seg) return "home";
  return VALID_USER_PAGES.has(seg) ? seg : "home";
}

function UserLayout({ children, onChangePassword }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = useMemo(
    () => pageFromPathname(location.pathname),
    [location.pathname],
  );

  const goToPage = useCallback(
    (page) => {
      const p = VALID_USER_PAGES.has(page) ? page : "home";
      if (p === "home") navigate("/user");
      else navigate(`/user/${p}`);
    },
    [navigate],
  );

  useEffect(() => {
    const seg = location.pathname
      .replace(/^\/user\/?/, "")
      .split("/")
      .filter(Boolean)[0];
    if (seg && !VALID_USER_PAGES.has(seg)) {
      navigate("/user", { replace: true });
    }
  }, [location.pathname, navigate]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* ================= THEME LOAD ================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";

    setDarkMode(isDark);
    document.body.classList.toggle("dark-mode", isDark);
  }, []);

  /* ================= TOGGLE THEME ================= */
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  /* ================= CLOSE MOBILE ON PAGE CHANGE ================= */
  useEffect(() => {
    setShowSidebar(false);
  }, [activePage]);

  return (
    <div className={`userlayout-wrapper ${darkMode ? "dark" : "light"}`}>
      <div className="userlayout-inner">
        {/* DESKTOP SIDEBAR */}
        <div className="desktop-sidebar">
          <UserSidebar
            activePage={activePage}
            setActivePage={goToPage}
            onChangePassword={onChangePassword}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        {/* MOBILE SIDEBAR */}
        <div className={`mobile-sidebar ${showSidebar ? "open" : ""}`}>
          <UserSidebar
            activePage={activePage}
            setActivePage={(page) => {
              goToPage(page);
              setShowSidebar(false);
            }}
            onChangePassword={onChangePassword}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        {showSidebar && (
          <div className="overlay" onClick={() => setShowSidebar(false)} />
        )}

        {/* MAIN CONTENT */}
        <div className="main-content">
          <div className="mobile-topbar">
            <button
              type="button"
              className="menu-btn"
              aria-label="Open menu"
              onClick={() => setShowSidebar(true)}
            >
              <HiOutlineMenu size={22} />
            </button>

            <button
              type="button"
              className="theme-btn"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            </button>
          </div>

          {typeof children === "function"
            ? children(activePage, darkMode)
            : children}
        </div>
      </div>

      <style>{`

/* ================= WRAPPER ================= */

.userlayout-wrapper {
  min-height: 100vh;
  transition: 0.3s ease;
}

.userlayout-wrapper.light {
  background: linear-gradient(135deg,#E6EEF4,#F4F6F8);
}

.userlayout-wrapper.dark {
  background: linear-gradient(135deg,#0F172A,#111827);
  color: #E2E8F0;
}

.userlayout-inner {
  display: flex;
  min-height: 100vh;
}

/* ================= SIDEBAR ================= */

.desktop-sidebar {
  width: 250px;
  flex-shrink: 0;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: -260px;
  width: 260px;
  height: 100%;
  transition: 0.3s ease;
  z-index: 1050;
}

.mobile-sidebar.open {
  left: 0;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(4px);
  z-index: 1040;
}

/* ================= MAIN CONTENT ================= */

.main-content {
  flex: 1;
  padding: 25px;
}

/* ================= MOBILE TOP BAR ================= */

.mobile-topbar {
  display: none;
  justify-content: space-between;
  margin-bottom: 15px;
}

.menu-btn,
.theme-btn {
  border: none;
  background: linear-gradient(135deg,#1E3A8A,#1D4ED8);
  color: white;
  padding: 6px 14px;
  border-radius: 25px;
  transition: 0.3s ease;
}

.menu-btn:hover,
.theme-btn:hover {
  background: #D4A24C;
  color: #0F172A;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 768px) {

  .desktop-sidebar {
    display: none;
  }

  .mobile-topbar {
    display: flex;
  }

  .main-content {
    padding: 15px;
  }
}

      `}</style>
    </div>
  );
}

export default UserLayout;
