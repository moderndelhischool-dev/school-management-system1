// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// import Sidebar from "../components/Sidebar";
// import DashboardHome from "../components/DashboardHome";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";
// import ClassBlocks from "../components/ClassBlocks";
// import PaymentRequests from "../components/payments/PaymentRequests";
// import AdminCalendar from "./AdminCalendar";
// import AdminUniform from "../components/AdminUniform";
// import AdminCertificate from "../components/AdminCertificate";
// import EventManager from "./EventManager"; // ✅ Added

// function AdminDashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);

//   const logout = async () => {
//     await signOut(auth);
//     window.location.href = "/";
//   };

//   const bgMain = darkMode
//     ? "linear-gradient(135deg,#0f172a,#1e1b4b)"
//     : "linear-gradient(135deg,#f5f3ff,#ede9fe)";

//   const headerStyle = {
//     background: darkMode
//       ? "linear-gradient(90deg,#1e1b4b,#312e81)"
//       : "linear-gradient(90deg,#4c1d95,#7c3aed)",
//     borderRadius: "18px",
//     padding: "18px 24px",
//     boxShadow: darkMode
//       ? "0 10px 30px rgba(0,0,0,0.6)"
//       : "0 10px 30px rgba(124,58,237,0.35)",
//     color: "white",
//   };

//   const pageWrapper = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     borderRadius: "20px",
//     padding: "28px",
//     boxShadow: darkMode
//       ? "0 20px 45px rgba(0,0,0,0.7)"
//       : "0 20px 45px rgba(124,58,237,0.15)",
//     minHeight: "70vh",
//   };

//   return (
//     <div className="admin-container" style={{ background: bgMain }}>
//       <div className="row g-0 m-0">
//         {/* Desktop Sidebar */}
//         <div className="col-md-3 col-lg-2 p-0 d-none d-md-block">
//           <Sidebar setPage={setPage} darkMode={darkMode} />
//         </div>

//         {/* Mobile Sidebar */}
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

//         {/* Main Content */}
//         <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
//           {/* Header */}
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
//                   backgroundColor: darkMode ? "#312e81" : "white",
//                   color: darkMode ? "#ffffff" : "#7c3aed",
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

//           {/* Page Content */}
//           <div style={pageWrapper}>
//             {page === "dashboard" && (
//               <>
//                 <div className="row g-4">
//                   <div className="col-lg-5">
//                     <ClassBlocks darkMode={darkMode} />
//                   </div>

//                   <div className="col-lg-7">
//                     <AdminCalendar darkMode={darkMode} />
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <DashboardHome darkMode={darkMode} />
//                 </div>
//               </>
//             )}

//             {page === "add" && <AddStudent darkMode={darkMode} />}
//             {page === "view" && <StudentList darkMode={darkMode} />}
//             {page === "payments" && <PaymentRequests darkMode={darkMode} />}
//             {page === "uniform" && <AdminUniform darkMode={darkMode} />}
//             {page === "certificate" && <AdminCertificate darkMode={darkMode} />}

//             {/* Event Manager Page */}
//             {page === "events" && <EventManager darkMode={darkMode} />}
//           </div>
//         </div>
//       </div>

//       {/* Styles */}
//       <style>{`
//         .admin-container {
//           min-height: 100vh;
//         }

//         .mobile-sidebar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           height: 100%;
//           width: 280px;
//           background: ${darkMode ? "#0f172a" : "#4c1d95"};
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
import AdminUniform from "../components/AdminUniform";
import AdminCertificate from "../components/AdminCertificate";
import EventManager from "./EventManager";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const bgMain = darkMode
    ? "linear-gradient(135deg,#0f172a,#111827)"
    : "linear-gradient(135deg,#E6EEF4,#F8FAFC)";

  const headerStyle = {
    background: darkMode
      ? "linear-gradient(90deg,#0a2e42,#1e293b)"
      : "linear-gradient(90deg,#0F4C6C,#1B5E84)",
    borderRadius: "18px",
    padding: "18px 24px",
    boxShadow: darkMode
      ? "0 12px 30px rgba(0,0,0,0.6)"
      : "0 12px 30px rgba(15,76,108,0.35)",
    color: "white",
  };

  const pageWrapper = {
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#f1f5f9" : "#111827",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: darkMode
      ? "0 20px 45px rgba(0,0,0,0.6)"
      : "0 20px 45px rgba(15,76,108,0.15)",
    minHeight: "70vh",
  };

  return (
    <div className="admin-container" style={{ background: bgMain }}>
      <div className="row g-0 m-0">
        {/* Desktop Sidebar */}
        <div className="col-md-3 col-lg-2 p-0 d-none d-md-block">
          <Sidebar setPage={setPage} darkMode={darkMode} />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`mobile-sidebar ${showSidebar ? "open" : ""}`}
          style={{
            background: darkMode
              ? "linear-gradient(180deg,#0f172a,#1e293b)"
              : "linear-gradient(180deg,#0F4C6C,#1B5E84)",
          }}
        >
          <div className="mobile-sidebar-content">
            <div className="text-end mb-3">
              <button
                className="btn btn-gold btn-sm"
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

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {/* Header */}
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            style={headerStyle}
          >
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-gold btn-sm d-md-none"
                onClick={() => setShowSidebar(true)}
              >
                ☰
              </button>
              <h4 className="mb-0 fw-semibold">Hello Admin 👋</h4>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-light btn-sm"
                style={{ borderRadius: "12px" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>

              <button
                className="btn btn-danger btn-sm"
                style={{ borderRadius: "12px" }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div style={pageWrapper}>
            {page === "dashboard" && (
              <>
                <div className="row g-4">
                  <div className="col-lg-5">
                    <ClassBlocks darkMode={darkMode} />
                  </div>
                  <div className="col-lg-7">
                    <AdminCalendar darkMode={darkMode} />
                  </div>
                </div>

                <div className="mt-4">
                  <DashboardHome darkMode={darkMode} />
                </div>
              </>
            )}

            {page === "add" && <AddStudent darkMode={darkMode} />}
            {page === "view" && <StudentList darkMode={darkMode} />}
            {page === "payments" && <PaymentRequests darkMode={darkMode} />}
            {page === "uniform" && <AdminUniform darkMode={darkMode} />}
            {page === "certificate" && <AdminCertificate darkMode={darkMode} />}
            {page === "events" && <EventManager darkMode={darkMode} />}
          </div>
        </div>
      </div>

      <style>{`

.admin-container {
  min-height:100vh;
  transition:0.3s ease;
}

.mobile-sidebar {
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:280px;
  transform:translateX(-100%);
  transition:transform 0.4s ease;
  z-index:1050;
  box-shadow:4px 0 25px rgba(0,0,0,0.4);
}

.mobile-sidebar.open {
  transform:translateX(0);
}

.mobile-sidebar-content {
  height:100%;
  padding:20px;
  overflow-y:auto;
}

.mobile-overlay {
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  z-index:1040;
}

.btn-gold {
  background:linear-gradient(135deg,#D4A24C,#C18F2D);
  color:white;
  border:none;
}

.btn-gold:hover {
  opacity:0.9;
}

@media (min-width:768px){
  .mobile-sidebar,
  .mobile-overlay{
    display:none;
  }
}

`}</style>
    </div>
  );
}

export default AdminDashboard;
