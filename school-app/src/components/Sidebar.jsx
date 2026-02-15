// import { useState } from "react";

// function Sidebar({ setPage, darkMode }) {
//   const [active, setActive] = useState("dashboard");

//   const sidebarStyle = {
//     width: "230px",
//     minHeight: "100vh",
//     background: darkMode
//       ? "linear-gradient(180deg,#0f172a,#020617)"
//       : "linear-gradient(180deg,#16a34a,#22c55e)",
//     color: "#ffffff",
//     transition: "all 0.3s ease",
//     boxShadow: darkMode
//       ? "4px 0 25px rgba(0,0,0,0.6)"
//       : "4px 0 25px rgba(34,197,94,0.25)",
//   };

//   const buttonStyle = (page) => ({
//     background:
//       active === page
//         ? "linear-gradient(90deg,#22c55e,#16a34a)"
//         : "transparent",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "12px",
//     padding: "12px 14px",
//     textAlign: "left",
//     fontWeight: active === page ? "600" : "500",
//     transition: "all 0.3s ease",
//     transform: active === page ? "translateX(6px)" : "translateX(0)",
//   });

//   const handleClick = (page) => {
//     setActive(page);
//     setPage(page);
//   };

//   return (
//     <div className="p-4 d-flex flex-column" style={sidebarStyle}>
//       <h5 className="mb-4 fw-bold">👨‍💼 Admin Panel</h5>

//       {/* ===== MENU ===== */}
//       <div className="d-grid gap-3">
//         <button
//           style={buttonStyle("dashboard")}
//           onClick={() => handleClick("dashboard")}
//           onMouseEnter={(e) =>
//             active !== "dashboard" &&
//             (e.currentTarget.style.transform = "translateX(6px)")
//           }
//           onMouseLeave={(e) =>
//             active !== "dashboard" &&
//             (e.currentTarget.style.transform = "translateX(0)")
//           }
//         >
//           📊 Dashboard
//         </button>

//         <button
//           style={buttonStyle("add")}
//           onClick={() => handleClick("add")}
//           onMouseEnter={(e) =>
//             active !== "add" &&
//             (e.currentTarget.style.transform = "translateX(6px)")
//           }
//           onMouseLeave={(e) =>
//             active !== "add" &&
//             (e.currentTarget.style.transform = "translateX(0)")
//           }
//         >
//           ➕ Add Student
//         </button>

//         <button
//           style={buttonStyle("view")}
//           onClick={() => handleClick("view")}
//           onMouseEnter={(e) =>
//             active !== "view" &&
//             (e.currentTarget.style.transform = "translateX(6px)")
//           }
//           onMouseLeave={(e) =>
//             active !== "view" &&
//             (e.currentTarget.style.transform = "translateX(0)")
//           }
//         >
//           📋 View Students
//         </button>

//         <button
//           style={buttonStyle("payments")}
//           onClick={() => handleClick("payments")}
//           onMouseEnter={(e) =>
//             active !== "payments" &&
//             (e.currentTarget.style.transform = "translateX(6px)")
//           }
//           onMouseLeave={(e) =>
//             active !== "payments" &&
//             (e.currentTarget.style.transform = "translateX(0)")
//           }
//         >
//           💰 Payment Requests
//         </button>
//       </div>

//       {/* ===== FOOTER ===== */}
//       <div className="mt-auto pt-4">
//         <small
//           style={{
//             color: "#bbf7d0",
//             fontSize: "13px",
//             opacity: "0.8",
//           }}
//         >
//           Logged in as Admin
//         </small>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
import { useState } from "react";

function Sidebar({ setPage, darkMode }) {
  const [active, setActive] = useState("dashboard");

  const sidebarStyle = {
    width: "230px",
    minHeight: "100vh",
    height: "100%",
    background: darkMode
      ? "linear-gradient(180deg,#0f172a,#020617)"
      : "linear-gradient(180deg,#16a34a,#22c55e)",
    color: "#ffffff",
    transition: "all 0.3s ease",
    boxShadow: darkMode
      ? "4px 0 25px rgba(0,0,0,0.6)"
      : "4px 0 25px rgba(34,197,94,0.25)",
  };

  const buttonStyle = (page) => ({
    background:
      active === page
        ? "linear-gradient(90deg,#22c55e,#16a34a)"
        : "transparent",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 14px",
    textAlign: "left",
    fontWeight: active === page ? "600" : "500",
    transition: "all 0.3s ease",
    transform: active === page ? "translateX(6px)" : "translateX(0)",
  });

  const handleClick = (page) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div
      className="d-flex flex-column p-4 sidebar-wrapper"
      style={sidebarStyle}
    >
      <h5 className="mb-4 fw-bold">👨‍💼 Admin Panel</h5>

      <div className="d-grid gap-3">
        <button
          style={buttonStyle("dashboard")}
          onClick={() => handleClick("dashboard")}
        >
          📊 Dashboard
        </button>

        <button style={buttonStyle("add")} onClick={() => handleClick("add")}>
          ➕ Add Student
        </button>

        <button style={buttonStyle("view")} onClick={() => handleClick("view")}>
          📋 View Students
        </button>

        <button
          style={buttonStyle("payments")}
          onClick={() => handleClick("payments")}
        >
          💰 Payment Requests
        </button>
      </div>

      <div className="mt-auto pt-4">
        <small
          style={{
            color: "#bbf7d0",
            fontSize: "13px",
            opacity: "0.8",
          }}
        >
          Logged in as Admin
        </small>
      </div>

      <style>{`
        /* 👇 FIX FOR LEFT WHITE LINE */
        .sidebar-wrapper {
          position: sticky;
          top: 0;
          align-self: stretch;   /* Important */
          margin: 0;
        }

        /* Remove unwanted bootstrap gutter space */
        @media (min-width: 768px) {
          .sidebar-wrapper {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .sidebar-wrapper {
            position: relative;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
