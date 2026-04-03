// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// import Sidebar from "../components/Sidebar";
// import DashboardHome from "../components/DashboardHome";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";
// import ClassBlocks from "../components/ClassBlocks";
// // import PaymentRequests from "../components/payments/PaymentRequests";
// import AdminCalendar from "./AdminCalendar";
// import AdminUniform from "../components/AdminUniform";
// import AdminCertificate from "../components/AdminCertificate";
// import EventManager from "./EventManager";
// import AdminFeeStructure from "../components/AdminFeeStructure";

// // 🔥 NEW IMPORT
// import FeesHistory from "../components/FeesHistory";

// function AdminDashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);

//   const logout = async () => {
//     await signOut(auth);
//     window.location.href = "/";
//   };

//   const bgMain = darkMode
//     ? "linear-gradient(135deg,#0f172a,#111827)"
//     : "linear-gradient(135deg,#E6EEF4,#F8FAFC)";

//   const headerStyle = {
//     background: darkMode
//       ? "linear-gradient(90deg,#0a2e42,#1e293b)"
//       : "linear-gradient(90deg,#0F4C6C,#1B5E84)",
//     borderRadius: "18px",
//     padding: "18px 24px",
//     boxShadow: darkMode
//       ? "0 12px 30px rgba(0,0,0,0.6)"
//       : "0 12px 30px rgba(15,76,108,0.35)",
//     color: "white",
//   };

//   // 🔥 DYNAMIC WRAPPER: Page ke hisab se background badlega
//   const getPageWrapperStyle = () => {
//     let bgColor = darkMode ? "#1e293b" : "#ffffff";
//     let borderColor = "transparent";

//     // Agar Fees History page hai, toh component ke background se match karo
//     if (page === "fees-history" && darkMode) {
//       bgColor = "#111c2a";
//       borderColor = "#243644";
//     }

//     return {
//       backgroundColor: bgColor,
//       color: darkMode ? "#f1f5f9" : "#111827",
//       borderRadius: "22px",
//       padding: page === "fees-history" ? "10px" : "28px", // History ke liye space adjust kiya
//       boxShadow: darkMode
//         ? "0 20px 45px rgba(0,0,0,0.6)"
//         : "0 20px 45px rgba(15,76,108,0.15)",
//       minHeight: "75vh",
//       border: `1px solid ${borderColor}`,
//       transition: "0.3s ease",
//     };
//   };

//   return (
//     <div className="admin-container" style={{ background: bgMain }}>
//       <div className="row g-0 m-0">
//         {/* Desktop Sidebar */}
//         <div className="col-md-3 col-lg-2 p-0 d-none d-md-block">
//           <Sidebar setPage={setPage} darkMode={darkMode} />
//         </div>

//         {/* Mobile Sidebar */}
//         <div
//           className={`mobile-sidebar ${showSidebar ? "open" : ""}`}
//           style={{
//             background: darkMode
//               ? "linear-gradient(180deg,#0f172a,#1e293b)"
//               : "linear-gradient(180deg,#0F4C6C,#1B5E84)",
//           }}
//         >
//           <div className="mobile-sidebar-content">
//             <div className="text-end mb-3">
//               <button
//                 className="btn btn-gold btn-sm"
//                 onClick={() => setShowSidebar(false)}
//               >
//                 {" "}
//                 ✖{" "}
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
//                 className="btn btn-gold btn-sm d-md-none"
//                 onClick={() => setShowSidebar(true)}
//               >
//                 {" "}
//                 ☰{" "}
//               </button>
//               <h4 className="mb-0 fw-semibold">Hello Admin 👋</h4>
//             </div>
//             <div className="d-flex gap-2">
//               <button
//                 className="btn btn-outline-light btn-sm"
//                 style={{ borderRadius: "12px" }}
//                 onClick={() => setDarkMode(!darkMode)}
//               >
//                 {darkMode ? "☀ Light" : "🌙 Dark"}
//               </button>
//               <button
//                 className="btn btn-danger btn-sm"
//                 style={{ borderRadius: "12px" }}
//                 onClick={logout}
//               >
//                 {" "}
//                 Logout{" "}
//               </button>
//             </div>
//           </div>

//           {/* Page Content Container */}
//           <div style={getPageWrapperStyle()}>
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
//             {page === "uniform" && <AdminUniform darkMode={darkMode} />}
//             {page === "certificate" && <AdminCertificate darkMode={darkMode} />}
//             {page === "events" && <EventManager darkMode={darkMode} />}
//             {page === "fee-structure" && (
//               <AdminFeeStructure darkMode={darkMode} />
//             )}

//             {/* 🔥 History Page */}
//             {page === "fees-history" && <FeesHistory darkMode={darkMode} />}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .admin-container { min-height:100vh; transition:0.3s ease; }
//         .mobile-sidebar { position:fixed; top:0; left:0; height:100%; width:280px; transform:translateX(-100%); transition:transform 0.4s ease; z-index:1050; box-shadow:4px 0 25px rgba(0,0,0,0.4); }
//         .mobile-sidebar.open { transform:translateX(0); }
//         .mobile-sidebar-content { height:100%; padding:20px; overflow-y:auto; }
//         .mobile-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1040; }
//         .btn-gold { background:linear-gradient(135deg,#D4A24C,#C18F2D); color:white; border:none; }
//         .btn-gold:hover { opacity:0.9; }
//         @media (min-width:768px){ .mobile-sidebar, .mobile-overlay{ display:none; } }
//       `}</style>
//     </div>
//   );
// }

// export default AdminDashboard;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Components Import
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";
import ClassBlocks from "../components/ClassBlocks";
import AdminCalendar from "./AdminCalendar";
import AdminUniform from "../components/AdminUniform";
import AdminCertificate from "../components/AdminCertificate";
import EventManager from "./EventManager";
import AdminFeeStructure from "../components/AdminFeeStructure";
import FeesHistory from "../components/FeesHistory";
import { HiOutlineMenu } from "react-icons/hi";

/** URL segment → internal `page` id (see Sidebar menu ids). */
const SECTION_TO_PAGE = {
  dashboard: "dashboard",
  events: "events",
  "add-student": "add",
  students: "view",
  "fees-history": "fees-history",
  uniform: "uniform",
  certificate: "certificate",
  "fee-structure": "fee-structure",
};

const PAGE_TO_SECTION = {
  dashboard: "dashboard",
  events: "events",
  add: "add-student",
  view: "students",
  "fees-history": "fees-history",
  uniform: "uniform",
  certificate: "certificate",
  "fee-structure": "fee-structure",
};

function AdminDashboard() {
  const { section } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(() => {
    const fromUrl = section ? SECTION_TO_PAGE[section] : null;
    if (fromUrl) return fromUrl;
    try {
      return localStorage.getItem("admin.page") || "dashboard";
    } catch {
      return "dashboard";
    }
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("admin.darkMode") === "true";
    } catch {
      return false;
    }
  });

  // Sync current page with LocalStorage
  useEffect(() => {
    if (!section) return;
    const p = SECTION_TO_PAGE[section];
    if (!p) {
      navigate("/admin/dashboard", { replace: true });
      return;
    }
    setPage(p);
    try {
      localStorage.setItem("admin.page", p);
    } catch {
      // ignore
    }
  }, [section, navigate]);

  useEffect(() => {
    try {
      localStorage.setItem("admin.darkMode", String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  const setPagePersist = (p) => {
    setPage(p);
    try {
      localStorage.setItem("admin.page", p);
    } catch {
      // ignore
    }
    const seg = PAGE_TO_SECTION[p] || "dashboard";
    navigate(`/admin/${seg}`, { replace: true });
  };

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  // Fixed Light Mode Styling (Professional Blue Theme)
  const bgMain = "linear-gradient(135deg, #E6EEF4, #F8FAFC)";

  const headerStyle = {
    background: "linear-gradient(90deg, #0F4C6C, #1B5E84)",
    borderRadius: "18px",
    padding: "18px 24px",
    boxShadow: "0 12px 30px rgba(15,76,108,0.25)",
    color: "white",
  };

  const getPageWrapperStyle = () => {
    return {
      backgroundColor: "#ffffff",
      color: "#111827",
      borderRadius: "22px",
      padding: page === "fees-history" ? "10px" : "28px",
      boxShadow: "0 20px 45px rgba(15,76,108,0.15)",
      minHeight: "75vh",
      transition: "0.3s ease",
    };
  };

  return (
    <div className="admin-container" style={{ background: bgMain }}>
        {/* Desktop: Sidebar is position:fixed — main uses .admin-main-area to offset */}
        <div className="d-none d-md-block">
          <Sidebar setPage={setPagePersist} activePage={page} />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`mobile-sidebar ${showSidebar ? "open" : ""}`}
          style={{ background: "linear-gradient(180deg, #0F4C6C, #1B5E84)" }}
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
                setPagePersist(p);
                setShowSidebar(false);
              }}
              activePage={page}
            />
          </div>
        </div>

        {/* Mobile Overlay */}
        {showSidebar && (
          <div
            className="mobile-overlay"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main Content — offset on md+ so fixed sidebar does not cover it */}
        <div className="admin-main-area p-3 p-md-4 min-w-0">
          {/* Top Header */}
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            style={headerStyle}
          >
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-gold btn-sm d-md-none d-inline-flex align-items-center justify-content-center"
                onClick={() => setShowSidebar(true)}
                aria-label="Open menu"
              >
                <HiOutlineMenu size={22} />
              </button>
              <h4 className="mb-0 fw-semibold">Administrator</h4>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-light btn-sm"
                style={{ borderRadius: "12px" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Light mode" : "Dark mode"}
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

          {/* Dynamic Page Container */}
          <div style={getPageWrapperStyle()}>
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
            {page === "uniform" && <AdminUniform darkMode={darkMode} />}
            {page === "certificate" && <AdminCertificate darkMode={darkMode} />}
            {page === "events" && <EventManager darkMode={darkMode} />}
            {page === "fee-structure" && <AdminFeeStructure darkMode={darkMode} />}
            {page === "fees-history" && <FeesHistory darkMode={darkMode} />}
          </div>
        </div>

      <style>{`
        .admin-container { 
          min-height: 100vh; 
          transition: 0.3s ease; 
          overflow-x: hidden; 
        }
        /* Fixed sidebar is 260px — push main content so it does not sit underneath */
        @media (min-width: 768px) {
          .admin-main-area {
            margin-left: 260px;
            width: calc(100% - 260px);
            max-width: calc(100% - 260px);
            box-sizing: border-box;
          }
        }
        .mobile-sidebar { 
          position: fixed; top: 0; left: 0; height: 100%; width: 280px; 
          transform: translateX(-100%); transition: transform 0.4s ease; 
          z-index: 1050; box-shadow: 4px 0 25px rgba(0,0,0,0.4); 
        }
        .mobile-sidebar.open { transform: translateX(0); }
        .mobile-sidebar-content { height: 100%; padding: 20px; overflow-y: auto; }
        .mobile-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(0,0,0,0.5); z-index: 1040; 
        }
        .btn-gold { 
          background: linear-gradient(135deg, #D4A24C, #C18F2D); 
          color: white; border: none; 
        }
        .btn-gold:hover { opacity: 0.9; }
        
        /* Sidebar container handling */
        @media (min-width: 768px) { 
          .mobile-sidebar, .mobile-overlay { display: none; } 
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
