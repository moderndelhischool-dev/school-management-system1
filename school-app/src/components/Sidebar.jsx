// import { useState } from "react";

// import { HiOutlineViewGrid } from "react-icons/hi";
// import { HiOutlineCalendar } from "react-icons/hi";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import { HiOutlineUsers } from "react-icons/hi";
// import { HiOutlineCreditCard } from "react-icons/hi";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { HiOutlineClipboardList } from "react-icons/hi"; // ✅ NEW ICON

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

//           // {
//           //   id: "payments",
//           //   label: "Payment Requests",
//           //   icon: <HiOutlineCreditCard />,
//           // },
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

// /* ===== WRAPPER ===== */

// .sidebar-wrapper {
//   width:240px;
//   height:100vh;
//   position:sticky;
//   top:0;
//   display:flex;
//   flex-direction:column;
//   padding:22px;
//   transition:0.3s ease;
// }

// /* Light Mode */

// .sidebar-wrapper.light {
//   background:linear-gradient(180deg,#0F4C6C,#1B5E84);
//   color:white;
//   box-shadow:4px 0 35px rgba(0,0,0,0.25);
// }

// /* Dark Mode */

// .sidebar-wrapper.dark {
//   background:linear-gradient(180deg,#0b2230,#111827);
//   color:#f1f5f9;
//   box-shadow:4px 0 35px rgba(0,0,0,0.6);
// }

// /* ===== HEADER ===== */

// .sidebar-header h5 {
//   font-weight:700;
//   margin-bottom:32px;
//   letter-spacing:0.5px;
// }

// /* ===== MENU ===== */

// .sidebar-menu {
//   flex:1;
//   display:flex;
//   flex-direction:column;
//   gap:12px;
//   overflow-y:auto;
// }

// .sidebar-menu button {
//   background:transparent;
//   border:none;
//   color:inherit;
//   padding:12px 16px;
//   border-radius:14px;
//   text-align:left;
//   font-weight:500;
//   transition:all 0.3s ease;
//   cursor:pointer;
//   display:flex;
//   align-items:center;
//   gap:12px;
// }

// /* ===== ICON STYLE ===== */

// .menu-icon{
//   font-size:20px;
//   display:flex;
//   align-items:center;
// }

// /* Hover Light */

// .sidebar-wrapper.light .sidebar-menu button:hover {
//   background:rgba(255,255,255,0.15);
//   transform:translateX(6px);
//   color:black;
// }

// /* Hover Dark */

// .sidebar-wrapper.dark .sidebar-menu button:hover {
//   background:rgba(255,255,255,0.08);
//   transform:translateX(6px);
//   color:black;
// }

// /* ===== ACTIVE BUTTON ===== */

// .active-btn {
//   background:linear-gradient(90deg,#D4A24C,#C18F2D);
//   color:white !important;
//   font-weight:600;
//   transform:translateX(6px);
//   box-shadow:0 8px 20px rgba(212,162,76,0.4);
// }

// /* ===== FOOTER ===== */

// .sidebar-footer {
//   padding-top:20px;
//   font-size:13px;
//   opacity:0.85;
// }

// .sidebar-wrapper.dark .sidebar-footer {
//   opacity:0.7;
// }

// /* ===== RESPONSIVE ===== */

// @media (max-width:768px){
//   .sidebar-wrapper{
//     height:auto;
//     position:relative;
//   }
// }

// `}</style>
//     </div>
//   );
// }

// export default Sidebar;
import { useEffect, useState } from "react";

import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi";
// import { HiOutlineCreditCard } from "react-icons/hi"; // 👈 Icon import commented
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineClipboardList } from "react-icons/hi"; // ✅ NEW ICON
import { HiOutlineCurrencyRupee } from "react-icons/hi";

function Sidebar({ setPage, darkMode, activePage }) {
  const [active, setActive] = useState(activePage || "dashboard");

  useEffect(() => {
    if (activePage) setActive(activePage);
  }, [activePage]);

  const handleClick = (page) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div className={`sidebar-wrapper ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            A
          </div>
          <div className="brand-text">
            <div className="brand-title">Admin Panel</div>
            <div className="brand-subtitle">School Management</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        {[
          { id: "dashboard", label: "Dashboard", icon: <HiOutlineViewGrid /> },
          { id: "events", label: "Event Manager", icon: <HiOutlineCalendar /> },
          { id: "add", label: "Add Student", icon: <HiOutlineUserAdd /> },
          { id: "view", label: "View Students", icon: <HiOutlineUsers /> },

          // 🔥 NEW (Fees History)
          {
            id: "fees-history",
            label: "Fees History",
            icon: <HiOutlineClipboardList />,
          },

          // 👈 Payment Requests button commented below
          /* {
            id: "payments",
            label: "Payment Requests",
            icon: <HiOutlineCreditCard />,
          }, 
          */

          {
            id: "uniform",
            label: "Uniform Requests",
            icon: <HiOutlineShoppingBag />,
          },
          {
            id: "certificate",
            label: "Certificate Requests",
            icon: <HiOutlineDocumentText />,
          },
          {
            id: "fee-structure",
            label: "Fee Structure",
            icon: <HiOutlineCurrencyRupee />,
          },
        ].map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active-btn" : ""}
            onClick={() => handleClick(item.id)}
            type="button"
          >
            <span className="menu-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <small>
          Logged in as <b>Admin</b>
        </small>
      </div>

      <style>{`
        .sidebar-wrapper {
          box-sizing: border-box;
          width: 100%;
          max-width: 264px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 18px 16px;
          transition: 0.25s ease;
          backdrop-filter: blur(10px);
        }

        .sidebar-wrapper.light {
          background: linear-gradient(165deg, #0d4a66 0%, #0a3d52 42%, #082f3f 100%);
          color: #f1f5f9;
          box-shadow: 6px 0 32px rgba(8, 47, 63, 0.28);
          border-right: 1px solid rgba(148, 200, 220, 0.12);
        }

        .sidebar-wrapper.dark {
          background: linear-gradient(165deg, #0b1520 0%, #0f1b2e 45%, #0a121c 100%);
          color: #e8eef4;
          box-shadow: 6px 0 40px rgba(0, 0, 0, 0.5);
          border-right: 1px solid rgba(100, 140, 170, 0.14);
        }

        .sidebar-header {
          padding: 10px 8px 16px;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }

        .sidebar-wrapper.dark .sidebar-header {
          border-bottom-color: rgba(148, 163, 184, 0.18);
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-mark {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-weight: 800;
          letter-spacing: 0.4px;
          background: linear-gradient(145deg, rgba(56, 189, 248, 0.18), rgba(14, 116, 144, 0.35));
          border: 1px solid rgba(125, 211, 252, 0.35);
          color: #e0f2fe;
        }

        .brand-title {
          font-weight: 800;
          font-size: 14px;
          line-height: 1.25;
          letter-spacing: 0.15px;
        }

        .brand-subtitle {
          font-size: 11px;
          line-height: 1.35;
          color: rgba(226, 232, 240, 0.72);
          margin-top: 3px;
        }

        .sidebar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
          padding: 10px 6px;
        }

        /* Hide ugly scrollbar (keep scroll) */
        .sidebar-menu::-webkit-scrollbar { width: 0px; height: 0px; }
        .sidebar-menu { scrollbar-width: none; }

        .sidebar-menu button {
          position: relative;
          background: transparent;
          border: 1px solid transparent;
          color: inherit;
          padding: 10px 11px;
          border-radius: 14px;
          text-align: left;
          font-size: 13px;
          line-height: 1.4;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          outline: none;
        }

        .menu-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: rgba(241, 245, 249, 0.95);
        }

        .sidebar-wrapper.dark .menu-icon {
          background: rgba(56, 189, 248, 0.08);
          border-color: rgba(56, 189, 248, 0.16);
        }

        .sidebar-wrapper.light .sidebar-menu button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(186, 230, 253, 0.2);
          transform: translateX(3px);
        }

        .sidebar-wrapper.dark .sidebar-menu button:hover {
          background: rgba(56, 189, 248, 0.1);
          border-color: rgba(56, 189, 248, 0.22);
          transform: translateX(3px);
        }

        .active-btn {
          background: linear-gradient(90deg, rgba(22, 101, 122, 0.95), rgba(15, 76, 108, 0.98));
          border: 1px solid rgba(125, 211, 252, 0.45);
          color: #f8fafc !important;
          font-weight: 600;
          text-shadow: none;
          box-shadow: 0 4px 20px rgba(8, 47, 63, 0.45), inset 0 1px 0 rgba(255,255,255,0.08);
          transform: translateX(3px);
        }

        .active-btn .menu-icon {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.22);
          color: #fff;
        }

        .sidebar-footer {
          margin-top: 8px;
          padding: 12px 10px 6px;
          border-top: 1px solid rgba(148, 200, 220, 0.12);
          font-size: 12px;
          color: rgba(226, 232, 240, 0.75);
        }

        .sidebar-wrapper.dark .sidebar-footer {
          border-top-color: rgba(100, 140, 170, 0.2);
          color: rgba(203, 213, 225, 0.7);
        }

        @media (max-width: 768px) {
          .sidebar-wrapper {
            height: auto;
            position: relative;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
