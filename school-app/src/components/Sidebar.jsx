// import { useState } from "react";

// function Sidebar({ setPage, darkMode }) {
//   const [active, setActive] = useState("dashboard");

//   const handleClick = (page) => {
//     setActive(page);
//     setPage(page);
//   };

//   return (
//     <div
//       className="sidebar-wrapper d-flex flex-column"
//       style={{
//         background: darkMode
//           ? "linear-gradient(180deg,#0f172a,#1e1b4b)"
//           : "linear-gradient(180deg,#4c1d95,#7c3aed)",
//       }}
//     >
//       {/* ===== Logo / Title ===== */}
//       <div className="sidebar-header">
//         <h5>👨‍💼 Admin Panel</h5>
//       </div>

//       {/* ===== Menu Buttons ===== */}
//       <div className="sidebar-menu">
//         <button
//           className={active === "dashboard" ? "active-btn" : ""}
//           onClick={() => handleClick("dashboard")}
//         >
//           📊 <span>Dashboard</span>
//         </button>
//         <button
//           className={active === "events" ? "active-btn" : ""}
//           onClick={() => handleClick("events")}
//         >
//           📅 <span>Event Manager</span>
//         </button>
//         <button
//           className={active === "add" ? "active-btn" : ""}
//           onClick={() => handleClick("add")}
//         >
//           ➕ <span>Add Student</span>
//         </button>

//         <button
//           className={active === "view" ? "active-btn" : ""}
//           onClick={() => handleClick("view")}
//         >
//           📋 <span>View Students</span>
//         </button>

//         <button
//           className={active === "payments" ? "active-btn" : ""}
//           onClick={() => handleClick("payments")}
//         >
//           💰 <span>Payment Requests</span>
//         </button>

//         <button
//           className={active === "uniform" ? "active-btn" : ""}
//           onClick={() => handleClick("uniform")}
//         >
//           👔 <span>Uniform Requests</span>
//         </button>

//         <button
//           className={active === "certificate" ? "active-btn" : ""}
//           onClick={() => handleClick("certificate")}
//         >
//           📜 <span>Certificate Requests</span>
//         </button>

//         {/* 🔥 NEW EVENT MANAGER BUTTON */}
//       </div>

//       {/* ===== Footer ===== */}
//       <div className="sidebar-footer">
//         <small>
//           Logged in as <b>Admin</b>
//         </small>
//       </div>

//       {/* ===== Styling ===== */}
//       <style>{`

//         .sidebar-wrapper {
//           width: 240px;
//           min-height: 100vh;
//           color: white;
//           padding: 20px;
//           box-shadow: 4px 0 30px rgba(0,0,0,0.4);
//           transition: 0.3s ease;
//         }

//         .sidebar-header h5 {
//           font-weight: 700;
//           margin-bottom: 30px;
//         }

//         .sidebar-menu {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .sidebar-menu button {
//           background: transparent;
//           border: none;
//           color: white;
//           padding: 12px 14px;
//           border-radius: 12px;
//           text-align: left;
//           font-weight: 500;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           transition: all 0.3s ease;
//         }

//         .sidebar-menu button span {
//           font-size: 14px;
//         }

//         /* Hover Effect */
//         .sidebar-menu button:hover {
//           background: linear-gradient(90deg,#8b5cf6,#6d28d9);
//           transform: translateX(6px);
//         }

//         /* Active Button */
//         .active-btn {
//           background: linear-gradient(90deg,#7c3aed,#4c1d95);
//           font-weight: 600;
//           transform: translateX(6px);
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//         }

//         .sidebar-footer {
//           margin-top: auto;
//           padding-top: 25px;
//           font-size: 13px;
//           opacity: 0.8;
//         }

//         /* Scroll if content overflow */
//         @media (max-height: 700px) {
//           .sidebar-menu {
//             overflow-y: auto;
//           }
//         }

//         @media (max-width: 768px) {
//           .sidebar-wrapper {
//             width: 100%;
//             min-height: auto;
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
    <div
      className="sidebar-wrapper"
      style={{
        background: darkMode
          ? "linear-gradient(180deg,#0f172a,#1e1b4b)"
          : "linear-gradient(180deg,#4c1d95,#7c3aed)",
      }}
    >
      {/* Header */}
      <div className="sidebar-header">
        <h5>👨‍💼 Admin Panel</h5>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <button
          className={active === "dashboard" ? "active-btn" : ""}
          onClick={() => handleClick("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={active === "events" ? "active-btn" : ""}
          onClick={() => handleClick("events")}
        >
          📅 Event Manager
        </button>

        <button
          className={active === "add" ? "active-btn" : ""}
          onClick={() => handleClick("add")}
        >
          ➕ Add Student
        </button>

        <button
          className={active === "view" ? "active-btn" : ""}
          onClick={() => handleClick("view")}
        >
          📋 View Students
        </button>

        <button
          className={active === "payments" ? "active-btn" : ""}
          onClick={() => handleClick("payments")}
        >
          💰 Payment Requests
        </button>

        <button
          className={active === "uniform" ? "active-btn" : ""}
          onClick={() => handleClick("uniform")}
        >
          👔 Uniform Requests
        </button>

        <button
          className={active === "certificate" ? "active-btn" : ""}
          onClick={() => handleClick("certificate")}
        >
          📜 Certificate Requests
        </button>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <small>
          Logged in as <b>Admin</b>
        </small>
      </div>

      <style>{`

        .sidebar-wrapper {
          width: 240px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 20px;
          color: white;
          box-shadow: 4px 0 30px rgba(0,0,0,0.4);
        }

        .sidebar-header h5 {
          font-weight: 700;
          margin-bottom: 30px;
        }

        .sidebar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }

        .sidebar-menu button {
          background: transparent;
          border: none;
          color: white;
          padding: 12px 14px;
          border-radius: 12px;
          text-align: left;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .sidebar-menu button:hover {
          background: linear-gradient(90deg,#8b5cf6,#6d28d9);
          transform: translateX(6px);
        }

        .active-btn {
          background: linear-gradient(90deg,#7c3aed,#4c1d95);
          font-weight: 600;
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(124,58,237,0.4);
        }

        .sidebar-footer {
          padding-top: 20px;
          font-size: 13px;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .sidebar-wrapper {
            height: auto;
            position: relative;
          }
        }

      `}</style>
    </div>
  );
}

export default Sidebar;
