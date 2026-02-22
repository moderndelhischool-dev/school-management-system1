// import { useState } from "react";
// import UserSidebar from "../../components/UserSidebar";

// function UserLayout({ children, onChangePassword }) {
//   const [activePage, setActivePage] = useState("home");
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div className="container-fluid userlayout-wrapper min-vh-100 p-0">
//       <div className="row min-vh-100 g-0 m-0">
//         {/* ================= DESKTOP SIDEBAR ================= */}
//         <div className="col-md-3 col-lg-2 d-none d-md-block p-0 sidebar-col">
//           <UserSidebar
//             activePage={activePage}
//             setActivePage={setActivePage}
//             onChangePassword={onChangePassword}
//           />
//         </div>

//         {/* ================= MOBILE SIDEBAR ================= */}
//         <div className={`mobile-user-sidebar ${showSidebar ? "open" : ""}`}>
//           <div className="mobile-user-content">
//             <div className="text-end mb-3">
//               <button
//                 className="btn btn-sm btn-light"
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
//             />
//           </div>
//         </div>

//         {/* Overlay */}
//         {showSidebar && (
//           <div
//             className="mobile-overlay"
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4 userlayout-content">
//           {/* Mobile menu button */}
//           <div className="d-md-none mb-3">
//             <button
//               className="btn btn-success btn-sm"
//               onClick={() => setShowSidebar(true)}
//             >
//               ☰ Menu
//             </button>
//           </div>

//           {typeof children === "function" ? children(activePage) : children}
//         </div>
//       </div>

//       {/* ================= STYLES ================= */}
//       <style>{`
//         /* 🔥 REMOVE BODY DEFAULT WHITE GAP */
//         body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//         }

//         .userlayout-wrapper {
//           background-color: #f8f9fa;
//           transition: background-color 0.3s ease;
//           overflow-x: hidden;
//         }

//         .sidebar-col {
//           height: 100vh;
//         }

//         body.dark-mode .userlayout-wrapper {
//           background-color: #121212 !important;
//           color: white !important;
//         }

//         body.dark-mode .userlayout-content {
//           color: white !important;
//         }

//         /* ===== MOBILE SIDEBAR ===== */
//         .mobile-user-sidebar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           height: 100%;
//           width: 260px;
//           background: inherit; /* 🔥 FIX */
//           transform: translateX(-100%);
//           transition: transform 0.35s ease;
//           z-index: 1050;
//           box-shadow: 4px 0 20px rgba(0,0,0,0.2);
//         }

//         body.dark-mode .mobile-user-sidebar {
//           background: #121212;
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
//           background: rgba(0,0,0,0.4);
//           z-index: 1040;
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
import { useState, useEffect } from "react";
import UserSidebar from "../../components/UserSidebar";

function UserLayout({ children, onChangePassword }) {
  const [activePage, setActivePage] = useState("home");
  const [showSidebar, setShowSidebar] = useState(false);
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

  return (
    <div className="container-fluid userlayout-wrapper min-vh-100 p-0">
      <div className="row min-vh-100 g-0 m-0">
        {/* DESKTOP SIDEBAR */}
        <div className="col-md-3 col-lg-2 d-none d-md-block p-0 sidebar-col">
          <UserSidebar
            activePage={activePage}
            setActivePage={setActivePage}
            onChangePassword={onChangePassword}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        {/* MOBILE SIDEBAR */}
        <div className={`mobile-user-sidebar ${showSidebar ? "open" : ""}`}>
          <div className="mobile-user-content">
            <div className="text-end mb-3">
              <button
                className="btn btn-sm btn-light close-btn"
                onClick={() => setShowSidebar(false)}
              >
                ✖
              </button>
            </div>

            <UserSidebar
              activePage={activePage}
              setActivePage={(page) => {
                setActivePage(page);
                setShowSidebar(false);
              }}
              onChangePassword={onChangePassword}
              darkMode={darkMode}
              toggleTheme={toggleTheme}
            />
          </div>
        </div>

        {showSidebar && (
          <div
            className="mobile-overlay"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* MAIN CONTENT */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4 userlayout-content">
          <div className="d-md-none mb-3 d-flex justify-content-between align-items-center">
            <button
              className="btn btn-purple btn-sm"
              onClick={() => setShowSidebar(true)}
            >
              ☰ Menu
            </button>

            <button
              className="btn btn-outline-purple btn-sm"
              onClick={toggleTheme}
            >
              {darkMode ? "🌙 Dark" : "☀ Light"}
            </button>
          </div>

          {typeof children === "function"
            ? children(activePage, darkMode)
            : children}
        </div>
      </div>

      <style>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
        }

        .userlayout-wrapper {
          background: linear-gradient(135deg,#ffffff,#f3e8ff);
          transition: background 0.3s ease;
          overflow-x: hidden;
        }

        body.dark-mode .userlayout-wrapper {
          background: linear-gradient(135deg,#1e1b4b,#0f172a) !important;
          color: white !important;
        }

        body.dark-mode .userlayout-content {
          color: white !important;
        }

        .sidebar-col {
          height: 100vh;
        }

        /* MOBILE SIDEBAR */
        .mobile-user-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 260px;
          background: linear-gradient(180deg,#ede9fe,#f3e8ff);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
          z-index: 1050;
          box-shadow: 4px 0 25px rgba(124,58,237,0.3);
        }

        body.dark-mode .mobile-user-sidebar {
          background: linear-gradient(180deg,#1e1b4b,#0f172a);
        }

        .mobile-user-sidebar.open {
          transform: translateX(0);
        }

        .mobile-user-content {
          height: 100%;
          padding: 20px;
          overflow-y: auto;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(124,58,237,0.25);
          backdrop-filter: blur(3px);
          z-index: 1040;
        }

        /* Buttons */
        .btn-purple {
          background: linear-gradient(135deg,#7c3aed,#4c1d95);
          color: white;
          border: none;
        }

        .btn-purple:hover {
          box-shadow: 0 6px 18px rgba(124,58,237,0.4);
          transform: translateY(-2px);
        }

        .btn-outline-purple {
          border: 1px solid #7c3aed;
          color: #7c3aed;
        }

        .btn-outline-purple:hover {
          background: #7c3aed;
          color: white;
        }

        .close-btn {
          background: #7c3aed;
          color: white;
          border: none;
        }

        .close-btn:hover {
          background: #6d28d9;
        }

        @media (min-width: 768px) {
          .mobile-user-sidebar,
          .mobile-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default UserLayout;
