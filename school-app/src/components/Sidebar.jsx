// import { useState } from "react";

// function Sidebar({ setPage, darkMode }) {
//   const [active, setActive] = useState("dashboard");

//   const handleClick = (page) => {
//     setActive(page);
//     setPage(page);
//   };

//   return (
//     <div
//       className="sidebar-wrapper"
//       style={{
//         background: darkMode
//           ? "linear-gradient(180deg,#0f172a,#1e1b4b)"
//           : "linear-gradient(180deg,#4c1d95,#7c3aed)",
//       }}
//     >
//       {/* Header */}
//       <div className="sidebar-header">
//         <h5>👨‍💼 Admin Panel</h5>
//       </div>

//       {/* Menu */}
//       <div className="sidebar-menu">
//         <button
//           className={active === "dashboard" ? "active-btn" : ""}
//           onClick={() => handleClick("dashboard")}
//         >
//           📊 Dashboard
//         </button>

//         <button
//           className={active === "events" ? "active-btn" : ""}
//           onClick={() => handleClick("events")}
//         >
//           📅 Event Manager
//         </button>

//         <button
//           className={active === "add" ? "active-btn" : ""}
//           onClick={() => handleClick("add")}
//         >
//           ➕ Add Student
//         </button>

//         <button
//           className={active === "view" ? "active-btn" : ""}
//           onClick={() => handleClick("view")}
//         >
//           📋 View Students
//         </button>

//         <button
//           className={active === "payments" ? "active-btn" : ""}
//           onClick={() => handleClick("payments")}
//         >
//           💰 Payment Requests
//         </button>

//         <button
//           className={active === "uniform" ? "active-btn" : ""}
//           onClick={() => handleClick("uniform")}
//         >
//           👔 Uniform Requests
//         </button>

//         <button
//           className={active === "certificate" ? "active-btn" : ""}
//           onClick={() => handleClick("certificate")}
//         >
//           📜 Certificate Requests
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="sidebar-footer">
//         <small>
//           Logged in as <b>Admin</b>
//         </small>
//       </div>

//       <style>{`

//         .sidebar-wrapper {
//           width: 240px;
//           height: 100vh;
//           position: sticky;
//           top: 0;
//           display: flex;
//           flex-direction: column;
//           padding: 20px;
//           color: white;
//           box-shadow: 4px 0 30px rgba(0,0,0,0.4);
//         }

//         .sidebar-header h5 {
//           font-weight: 700;
//           margin-bottom: 30px;
//         }

//         .sidebar-menu {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           overflow-y: auto;
//         }

//         .sidebar-menu button {
//           background: transparent;
//           border: none;
//           color: white;
//           padding: 12px 14px;
//           border-radius: 12px;
//           text-align: left;
//           font-weight: 500;
//           transition: all 0.3s ease;
//         }

//         .sidebar-menu button:hover {
//           background: linear-gradient(90deg,#8b5cf6,#6d28d9);
//           transform: translateX(6px);
//         }

//         .active-btn {
//           background: linear-gradient(90deg,#7c3aed,#4c1d95);
//           font-weight: 600;
//           transform: translateX(6px);
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//         }

//         .sidebar-footer {
//           padding-top: 20px;
//           font-size: 13px;
//           opacity: 0.8;
//         }

//         @media (max-width: 768px) {
//           .sidebar-wrapper {
//             height: auto;
//             position: relative;
//           }
//         }

//       `}</style>
//     </div>
//   );
// }

// export default Sidebar;
import { useState } from "react";

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
          { id: "dashboard", label: " Dashboard" },
          { id: "events", label: "Event Manager" },
          { id: "add", label: "➕ Add Student" },
          { id: "view", label: " View Students" },
          { id: "payments", label: " Payment Requests" },
          { id: "uniform", label: " Uniform Requests" },
          { id: "certificate", label: " Certificate Requests" },
        ].map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active-btn" : ""}
            onClick={() => handleClick(item.id)}
          >
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
}

/* Hover Light */
.sidebar-wrapper.light .sidebar-menu button:hover {
  background:rgba(255,255,255,0.15);
  transform:translateX(6px);
}

/* Hover Dark */
.sidebar-wrapper.dark .sidebar-menu button:hover {
  background:rgba(255,255,255,0.08);
  transform:translateX(6px);
}

/* ===== ACTIVE BUTTON ===== */

.active-btn {
  background:linear-gradient(90deg,#D4A24C,#C18F2D);
  color:#111 !important;
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
