// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// import Sidebar from "../components/Sidebar";
// import DashboardHome from "../components/DashboardHome";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";
// import ClassBlocks from "../components/ClassBlocks";
// import PaymentRequests from "../components/payments/PaymentRequests";

// function AdminDashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);

//   const logout = async () => {
//     await signOut(auth);
//     window.location.href = "/";
//   };

//   const bgMain = darkMode
//     ? "linear-gradient(135deg,#0f172a,#020617)"
//     : "linear-gradient(135deg,#f0fdf4,#ecfdf5)";

//   const headerStyle = {
//     background: darkMode
//       ? "linear-gradient(90deg,#111827,#1e293b)"
//       : "linear-gradient(90deg,#16a34a,#22c55e)",
//     borderRadius: "18px",
//     padding: "18px 24px",
//     boxShadow: darkMode
//       ? "0 10px 30px rgba(0,0,0,0.6)"
//       : "0 10px 30px rgba(34,197,94,0.25)",
//     color: "white",
//   };

//   const pageWrapper = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     borderRadius: "20px",
//     padding: "28px",
//     boxShadow: darkMode
//       ? "0 20px 45px rgba(0,0,0,0.7)"
//       : "0 20px 45px rgba(0,0,0,0.08)",
//     minHeight: "70vh",
//   };

//   return (
//     <div className="admin-container" style={{ background: bgMain }}>
//       <div className="row g-0 m-0">
//         {/* ===== Desktop Sidebar ===== */}
//         <div className="col-md-3 col-lg-2 p-0 d-none d-md-block">
//           <Sidebar setPage={setPage} darkMode={darkMode} />
//         </div>

//         {/* ===== Mobile Sidebar ===== */}
//         <div className={`mobile-sidebar ${showSidebar ? "open" : ""}`}>
//           <div className="mobile-sidebar-content">
//             <div className="text-end mb-3">
//               <button
//                 className="btn btn-sm btn-light"
//                 onClick={() => setShowSidebar(false)}
//               >
//                 ✖
//               </button>
//             </div>

//             <Sidebar
//               setPage={(p) => {
//                 setPage(p);
//                 setShowSidebar(false);
//               }}
//               darkMode={darkMode}
//             />
//           </div>
//         </div>

//         {showSidebar && (
//           <div
//             className="mobile-overlay"
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         {/* ===== Main Content ===== */}
//         <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
//           <div
//             className="d-flex justify-content-between align-items-center mb-4"
//             style={headerStyle}
//           >
//             <div className="d-flex align-items-center gap-3">
//               <button
//                 className="btn btn-light btn-sm d-md-none"
//                 onClick={() => setShowSidebar(true)}
//                 style={{ borderRadius: "10px" }}
//               >
//                 ☰
//               </button>

//               <h4 className="mb-0 fw-semibold">Hello Admin 👋</h4>
//             </div>

//             <div className="d-flex gap-2">
//               <button
//                 className="btn btn-sm"
//                 style={{
//                   backgroundColor: darkMode ? "#1e293b" : "white",
//                   color: darkMode ? "#ffffff" : "#16a34a",
//                   borderRadius: "12px",
//                   border: "none",
//                 }}
//                 onClick={() => setDarkMode(!darkMode)}
//               >
//                 {darkMode ? "☀ Light" : "🌙 Dark"}
//               </button>

//               <button
//                 className="btn btn-sm"
//                 style={{
//                   background: "linear-gradient(90deg,#ef4444,#dc2626)",
//                   border: "none",
//                   borderRadius: "12px",
//                   color: "white",
//                 }}
//                 onClick={logout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div style={pageWrapper}>
//             {page === "dashboard" && (
//               <>
//                 <ClassBlocks darkMode={darkMode} />
//                 <div className="mt-4">
//                   <DashboardHome darkMode={darkMode} />
//                 </div>
//               </>
//             )}

//             {page === "add" && <AddStudent darkMode={darkMode} />}
//             {page === "view" && <StudentList darkMode={darkMode} />}
//             {page === "payments" && <PaymentRequests darkMode={darkMode} />}
//           </div>
//         </div>
//       </div>

//       {/* ===== FIX FOR WHITE LINE ===== */}
//       <style>{`
//         .admin-container {
//           min-height: 100vh;
//           padding: 0 !important;
//           margin: 0 !important;
//         }

//         .row {
//           margin: 0 !important;
//         }

//         .col-md-3,
//         .col-lg-2 {
//           padding-left: 0 !important;
//           padding-right: 0 !important;
//         }

//         /* ===== Mobile Sidebar ===== */
//         .mobile-sidebar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           height: 100%;
//           width: 280px;
//           background: ${darkMode ? "#0f172a" : "#16a34a"};
//           transform: translateX(-100%);
//           transition: transform 0.4s ease;
//           z-index: 1050;
//           box-shadow: 4px 0 25px rgba(0,0,0,0.4);
//         }

//         .mobile-sidebar.open {
//           transform: translateX(0);
//         }

//         .mobile-sidebar-content {
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
//           .mobile-sidebar,
//           .mobile-overlay {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default AdminDashboard;
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";
import ClassBlocks from "../components/ClassBlocks";
import PaymentRequests from "../components/payments/PaymentRequests";
import AdminCalendar from "./AdminCalendar";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const bgMain = darkMode
    ? "linear-gradient(135deg,#0f172a,#020617)"
    : "linear-gradient(135deg,#f0fdf4,#ecfdf5)";

  const headerStyle = {
    background: darkMode
      ? "linear-gradient(90deg,#111827,#1e293b)"
      : "linear-gradient(90deg,#16a34a,#22c55e)",
    borderRadius: "18px",
    padding: "18px 24px",
    boxShadow: darkMode
      ? "0 10px 30px rgba(0,0,0,0.6)"
      : "0 10px 30px rgba(34,197,94,0.25)",
    color: "white",
  };

  const pageWrapper = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: darkMode
      ? "0 20px 45px rgba(0,0,0,0.7)"
      : "0 20px 45px rgba(0,0,0,0.08)",
    minHeight: "70vh",
  };

  return (
    <div className="admin-container" style={{ background: bgMain }}>
      <div className="row g-0 m-0">
        {/* ===== Desktop Sidebar ===== */}
        <div className="col-md-3 col-lg-2 p-0 d-none d-md-block">
          <Sidebar setPage={setPage} darkMode={darkMode} />
        </div>

        {/* ===== Mobile Sidebar ===== */}
        <div className={`mobile-sidebar ${showSidebar ? "open" : ""}`}>
          <div className="mobile-sidebar-content">
            <div className="text-end mb-3">
              <button
                className="btn btn-sm btn-light"
                onClick={() => setShowSidebar(false)}
              >
                ✖
              </button>
            </div>

            <Sidebar
              setPage={(p) => {
                setPage(p);
                setShowSidebar(false);
              }}
              darkMode={darkMode}
            />
          </div>
        </div>

        {showSidebar && (
          <div
            className="mobile-overlay"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* ===== Main Content ===== */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {/* ===== Header ===== */}
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            style={headerStyle}
          >
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-light btn-sm d-md-none"
                onClick={() => setShowSidebar(true)}
                style={{ borderRadius: "10px" }}
              >
                ☰
              </button>

              <h4 className="mb-0 fw-semibold">Hello Admin 👋</h4>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: darkMode ? "#1e293b" : "white",
                  color: darkMode ? "#ffffff" : "#16a34a",
                  borderRadius: "12px",
                  border: "none",
                }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>

              <button
                className="btn btn-sm"
                style={{
                  background: "linear-gradient(90deg,#ef4444,#dc2626)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* ===== Page Content Wrapper ===== */}
          <div style={pageWrapper}>
            {/* ===== Dashboard Layout ===== */}
            {page === "dashboard" && (
              <>
                <div className="row g-4">
                  {/* LEFT SIDE */}
                  <div className="col-lg-5">
                    <ClassBlocks darkMode={darkMode} />
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="col-lg-7">
                    <AdminCalendar darkMode={darkMode} />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4">
                  <DashboardHome darkMode={darkMode} />
                </div>
              </>
            )}

            {page === "add" && <AddStudent darkMode={darkMode} />}
            {page === "view" && <StudentList darkMode={darkMode} />}
            {page === "payments" && <PaymentRequests darkMode={darkMode} />}
          </div>
        </div>
      </div>

      {/* ===== Styles ===== */}
      <style>{`
        .admin-container {
          min-height: 100vh;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 280px;
          background: ${darkMode ? "#0f172a" : "#16a34a"};
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 1050;
          box-shadow: 4px 0 25px rgba(0,0,0,0.4);
        }

        .mobile-sidebar.open {
          transform: translateX(0);
        }

        .mobile-sidebar-content {
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
          background: rgba(0,0,0,0.4);
          z-index: 1040;
        }

        @media (min-width: 768px) {
          .mobile-sidebar,
          .mobile-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
