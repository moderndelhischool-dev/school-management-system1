// import { useState } from "react";

// import { HiOutlineViewGrid } from "react-icons/hi";
// import { HiOutlineCalendar } from "react-icons/hi";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import { HiOutlineUsers } from "react-icons/hi";
// import { HiOutlineCreditCard } from "react-icons/hi";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import { HiOutlineDocumentText } from "react-icons/hi";

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
//           {
//             id: "payments",
//             label: "Payment Requests",
//             icon: <HiOutlineCreditCard />,
//           },
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
import { useState } from "react";

import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineClipboardList } from "react-icons/hi"; // ✅ NEW ICON

function Sidebar({ setPage, darkMode }) {
  const [active, setActive] = useState("dashboard");

  const handleClick = (page) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div className={`sidebar-wrapper ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <h5> Admin Panel</h5>
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

          {
            id: "payments",
            label: "Payment Requests",
            icon: <HiOutlineCreditCard />,
          },
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
        ].map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active-btn" : ""}
            onClick={() => handleClick(item.id)}
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

/* ===== WRAPPER ===== */

.sidebar-wrapper {
  width:240px;
  height:100vh;
  position:sticky;
  top:0;
  display:flex;
  flex-direction:column;
  padding:22px;
  transition:0.3s ease;
}

/* Light Mode */

.sidebar-wrapper.light {
  background:linear-gradient(180deg,#0F4C6C,#1B5E84);
  color:white;
  box-shadow:4px 0 35px rgba(0,0,0,0.25);
}

/* Dark Mode */

.sidebar-wrapper.dark {
  background:linear-gradient(180deg,#0b2230,#111827);
  color:#f1f5f9;
  box-shadow:4px 0 35px rgba(0,0,0,0.6);
}

/* ===== HEADER ===== */

.sidebar-header h5 {
  font-weight:700;
  margin-bottom:32px;
  letter-spacing:0.5px;
}

/* ===== MENU ===== */

.sidebar-menu {
  flex:1;
  display:flex;
  flex-direction:column;
  gap:12px;
  overflow-y:auto;
}

.sidebar-menu button {
  background:transparent;
  border:none;
  color:inherit;
  padding:12px 16px;
  border-radius:14px;
  text-align:left;
  font-weight:500;
  transition:all 0.3s ease;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:12px;
}

/* ===== ICON STYLE ===== */

.menu-icon{
  font-size:20px;
  display:flex;
  align-items:center;
}

/* Hover Light */

.sidebar-wrapper.light .sidebar-menu button:hover {
  background:rgba(255,255,255,0.15);
  transform:translateX(6px);
  color:black;
}

/* Hover Dark */

.sidebar-wrapper.dark .sidebar-menu button:hover {
  background:rgba(255,255,255,0.08);
  transform:translateX(6px);
  color:black;
}

/* ===== ACTIVE BUTTON ===== */

.active-btn {
  background:linear-gradient(90deg,#D4A24C,#C18F2D);
  color:white !important;
  font-weight:600;
  transform:translateX(6px);
  box-shadow:0 8px 20px rgba(212,162,76,0.4);
}

/* ===== FOOTER ===== */

.sidebar-footer {
  padding-top:20px;
  font-size:13px;
  opacity:0.85;
}

.sidebar-wrapper.dark .sidebar-footer {
  opacity:0.7;
}

/* ===== RESPONSIVE ===== */

@media (max-width:768px){
  .sidebar-wrapper{
    height:auto;
    position:relative;
  }
}

`}</style>
    </div>
  );
}

export default Sidebar;
