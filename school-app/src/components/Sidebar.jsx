// import { useState } from "react";

// import { HiOutlineViewGrid } from "react-icons/hi";
// import { HiOutlineCalendar } from "react-icons/hi";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import { HiOutlineUsers } from "react-icons/hi";
// // import { HiOutlineCreditCard } from "react-icons/hi"; // 👈 Icon import commented
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { HiOutlineClipboardList } from "react-icons/hi"; // ✅ NEW ICON
// import { HiOutlineCurrencyRupee } from "react-icons/hi";

// function Sidebar({ setPage, darkMode }) {
//   const [active, setActive] = useState("dashboard");

//   const handleClick = (page) => {
//     setActive(page);
//     setPage(page);
//   };

//   return (
//     <div className={`sidebar-wrapper ${darkMode ? "dark" : "light"}`}>
//       {/* Header */}
//       <div className="sidebar-header">
//         <h5> Admin Panel</h5>
//       </div>

//       {/* Menu */}
//       <div className="sidebar-menu">
//         {[
//           { id: "dashboard", label: "Dashboard", icon: <HiOutlineViewGrid /> },
//           { id: "events", label: "Event Manager", icon: <HiOutlineCalendar /> },
//           { id: "add", label: "Add Student", icon: <HiOutlineUserAdd /> },
//           { id: "view", label: "View Students", icon: <HiOutlineUsers /> },

//           // 🔥 NEW (Fees History)
//           {
//             id: "fees-history",
//             label: "Fees History",
//             icon: <HiOutlineClipboardList />,
//           },

//           // 👈 Payment Requests button commented below
//           /* {
//             id: "payments",
//             label: "Payment Requests",
//             icon: <HiOutlineCreditCard />,
//           },
//           */

//           {
//             id: "uniform",
//             label: "Uniform Requests",
//             icon: <HiOutlineShoppingBag />,
//           },
//           {
//             id: "certificate",
//             label: "Certificate Requests",
//             icon: <HiOutlineDocumentText />,
//           },
//           {
//             id: "fee-structure",
//             label: "Fee Structure",
//             icon: <HiOutlineCurrencyRupee />,
//           },
//         ].map((item) => (
//           <button
//             key={item.id}
//             className={active === item.id ? "active-btn" : ""}
//             onClick={() => handleClick(item.id)}
//           >
//             <span className="menu-icon">{item.icon}</span>
//             {item.label}
//           </button>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="sidebar-footer">
//         <small>
//           Logged in as <b>Admin</b>
//         </small>
//       </div>

//       <style>{`
//         .sidebar-wrapper { width:240px; height:100vh; position:sticky; top:0; display:flex; flex-direction:column; padding:22px; transition:0.3s ease; }
//         .sidebar-wrapper.light { background:linear-gradient(180deg,#0F4C6C,#1B5E84); color:white; box-shadow:4px 0 35px rgba(0,0,0,0.25); }
//         .sidebar-wrapper.dark { background:linear-gradient(180deg,#0b2230,#111827); color:#f1f5f9; box-shadow:4px 0 35px rgba(0,0,0,0.6); }
//         .sidebar-header h5 { font-weight:700; margin-bottom:32px; letter-spacing:0.5px; }
//         .sidebar-menu { flex:1; display:flex; flex-direction:column; gap:12px; overflow-y:auto; }
//         .sidebar-menu button { background:transparent; border:none; color:inherit; padding:12px 16px; border-radius:14px; text-align:left; font-weight:500; transition:all 0.3s ease; cursor:pointer; display:flex; align-items:center; gap:12px; }
//         .menu-icon{ font-size:20px; display:flex; align-items:center; }
//         .sidebar-wrapper.light .sidebar-menu button:hover { background:rgba(255,255,255,0.15); transform:translateX(6px); color:white; }
//         .sidebar-wrapper.dark .sidebar-menu button:hover { background:rgba(255,255,255,0.08); transform:translateX(6px); color:white; }
//         .active-btn { background:linear-gradient(90deg,#D4A24C,#C18F2D); color:white !important; font-weight:600; transform:translateX(6px); box-shadow:0 8px 20px rgba(212,162,76,0.4); }
//         .sidebar-footer { padding-top:20px; font-size:13px; opacity:0.85; }
//         .sidebar-wrapper.dark .sidebar-footer { opacity:0.7; }
//         @media (max-width:768px){ .sidebar-wrapper{ height:auto; position:relative; } }
//       `}</style>
//     </div>
//   );
// }

// export default Sidebar;
import { useEffect, useMemo, useState } from "react";
import {
  HiOutlineViewGrid,
  HiOutlineCalendar,
  HiOutlineUserAdd,
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineCurrencyRupee,
} from "react-icons/hi";
import { canAccessAdminPage, roleLabel } from "../utils/adminRbac";

function Sidebar({ setPage, activePage, adminRole = "admin" }) {
  const [active, setActive] = useState(activePage || "dashboard");

  useEffect(() => {
    if (activePage) setActive(activePage);
  }, [activePage]);

  const menuItems = useMemo(() => {
    const all = [
      { id: "dashboard", label: "Dashboard", icon: <HiOutlineViewGrid /> },
      { id: "events", label: "Event Management", icon: <HiOutlineCalendar /> },
      { id: "add", label: "Student Registration", icon: <HiOutlineUserAdd /> },
      { id: "view", label: "Students", icon: <HiOutlineUsers /> },
      {
        id: "fees-history",
        label: "Fee Collection History",
        icon: <HiOutlineClipboardList />,
      },
      {
        id: "uniform",
        label: "Uniform Requests",
        icon: <HiOutlineShoppingBag />,
      },
      {
        id: "certificate",
        label: "Certificates",
        icon: <HiOutlineDocumentText />,
      },
      {
        id: "fee-structure",
        label: "Fee Structure",
        icon: <HiOutlineCurrencyRupee />,
      },
    ];
    return all.filter((x) => canAccessAdminPage(adminRole, x.id));
  }, [adminRole]);

  return (
    <div className="sidebar-main-container">
      {/* Brand Header */}
      <div className="sidebar-brand-section">
        <div className="brand-logo-box">A</div>
        <div className="brand-info">
          <span className="brand-name">Admin Panel</span>
          <span className="brand-tag">School Management</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-btn ${active === item.id ? "active" : ""}`}
            onClick={() => {
              setActive(item.id);
              setPage(item.id);
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer-info">
        <div className="status-indicator"></div>
        <span>
          Logged in as <b>{roleLabel(adminRole)}</b>
        </span>
      </div>

      <style>{`
        /* SIDEBAR FIXED LOGIC */
        .sidebar-main-container {
          width: 260px;
          height: 100vh;
          position: fixed; /* Screen par fix rahega */
          top: 0;
          left: 0;
          background: linear-gradient(180deg, #0F4C6C 0%, #1B5E84 100%);
          color: white;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          z-index: 1000;
          box-shadow: 4px 0 20px rgba(0,0,0,0.1);
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        /* BRAND SECTION */
        .sidebar-brand-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 24px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .brand-logo-box {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
          display: grid; place-items: center;
          font-weight: 800; font-size: 18px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .brand-info { display: flex; flex-direction: column; }
        .brand-name { font-weight: 700; font-size: 16px; letter-spacing: 0.5px; }
        .brand-tag { font-size: 11px; opacity: 0.7; }

        /* NAV LINKS */
        .sidebar-nav-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 20px;
          overflow-y: auto;
          scrollbar-width: none; /* Hide scrollbar Firefox */
        }
        .sidebar-nav-links::-webkit-scrollbar { display: none; } /* Hide scrollbar Chrome */

        .sidebar-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.8);
          padding: 12px 14px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
        }
        .sidebar-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          transform: translateX(4px);
        }
        .sidebar-btn.active {
          background: linear-gradient(90deg, #D4A24C, #C18F2D);
          color: white;
          font-weight: 600;
          box-shadow: 0 8px 20px rgba(212, 162, 76, 0.35);
          transform: translateX(4px);
        }
        .sidebar-icon { font-size: 20px; display: flex; align-items: center; }
        .sidebar-label { font-size: 14px; }

        /* FOOTER */
        .sidebar-footer-info {
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          opacity: 0.8;
        }
        .status-indicator {
          width: 8px; height: 8px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 8px #4ade80;
        }

        /* MOBILE HANDLING */
        @media (max-width: 768px) {
          .sidebar-main-container {
            position: relative;
            width: 100%;
            height: auto;
            border-right: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
