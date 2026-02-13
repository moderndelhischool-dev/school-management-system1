// function Sidebar({ setPage }) {
//   return (
//     <div
//       style={{ width: "230px", minHeight: "100vh" }}
//       className="border-end p-3 bg-white d-flex flex-column"
//     >
//       <h5 className="mb-4">👨‍💼 Admin</h5>

//       {/* ===== MENU BUTTONS ===== */}
//       <div className="d-grid gap-2">
//         <button
//           className="btn btn-light text-start"
//           onClick={() => setPage("dashboard")}
//         >
//           📊 Dashboard
//         </button>

//         <button
//           className="btn btn-light text-start"
//           onClick={() => setPage("add")}
//         >
//           ➕ Add Student
//         </button>

//         <button
//           className="btn btn-light text-start"
//           onClick={() => setPage("view")}
//         >
//           📋 View Students
//         </button>

//         {/* ✅ NEW : PAYMENT REQUESTS */}
//         <button
//           className="btn btn-light text-start"
//           onClick={() => setPage("payments")}
//         >
//           💰 Payment Requests
//         </button>
//       </div>

//       {/* ===== FOOTER ===== */}
//       <div className="mt-auto pt-4">
//         <small className="text-muted">Logged in as Admin</small>
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
    backgroundColor: darkMode ? "#111827" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    transition: "all 0.3s ease",
    boxShadow: darkMode
      ? "2px 0 10px rgba(0,0,0,0.5)"
      : "2px 0 10px rgba(0,0,0,0.05)",
  };

  const buttonStyle = (page) => ({
    backgroundColor:
      active === page
        ? darkMode
          ? "#2563eb"
          : "#0d6efd"
        : darkMode
          ? "#1f2937"
          : "#f8f9fa",
    color: active === page ? "#ffffff" : darkMode ? "#e5e7eb" : "#000000",
    border: "none",
    borderRadius: "8px",
    padding: "10px 12px",
    textAlign: "left",
    transition: "all 0.3s ease",
    transform: active === page ? "scale(1.02)" : "scale(1)",
  });

  const handleClick = (page) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div className="p-3 d-flex flex-column" style={sidebarStyle}>
      <h5 className="mb-4">👨‍💼 Admin Panel</h5>

      {/* ===== MENU ===== */}
      <div className="d-grid gap-2">
        <button
          style={buttonStyle("dashboard")}
          onClick={() => handleClick("dashboard")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateX(5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              active === "dashboard" ? "scale(1.02)" : "scale(1)")
          }
        >
          📊 Dashboard
        </button>

        <button
          style={buttonStyle("add")}
          onClick={() => handleClick("add")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateX(5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              active === "add" ? "scale(1.02)" : "scale(1)")
          }
        >
          ➕ Add Student
        </button>

        <button
          style={buttonStyle("view")}
          onClick={() => handleClick("view")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateX(5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              active === "view" ? "scale(1.02)" : "scale(1)")
          }
        >
          📋 View Students
        </button>

        <button
          style={buttonStyle("payments")}
          onClick={() => handleClick("payments")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateX(5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              active === "payments" ? "scale(1.02)" : "scale(1)")
          }
        >
          💰 Payment Requests
        </button>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="mt-auto pt-4">
        <small
          style={{
            color: darkMode ? "#9ca3af" : "#6c757d",
            transition: "all 0.3s ease",
          }}
        >
          Logged in as Admin
        </small>
      </div>
    </div>
  );
}

export default Sidebar;
