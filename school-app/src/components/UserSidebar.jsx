function UserSidebar({ activePage, setActivePage, onChangePassword }) {
  const btnClass = (page) =>
    `btn w-100 text-start mb-2 ${
      activePage === page ? "btn-primary text-white" : "btn-light"
    }`;

  return (
    <div className="bg-white h-100 border-end p-3 d-flex flex-column">
      <h5 className="mb-4">👤 Student</h5>

      {/* DASHBOARD */}
      <button
        className={btnClass("home")}
        onClick={() => setActivePage("home")}
      >
        📊 Dashboard
      </button>

      {/* PROFILE */}
      <button
        className={btnClass("profile")}
        onClick={() => setActivePage("profile")}
      >
        🙍 My Profile
      </button>

      {/* FEES */}
      <button
        className={btnClass("fees")}
        onClick={() => setActivePage("fees")}
      >
        💳 Fees & Payment
      </button>

      {/* PAYMENT HISTORY ✅ */}
      <button
        className={btnClass("history")}
        onClick={() => setActivePage("history")}
      >
        🧾 Payment History
      </button>

      {/* CHANGE PASSWORD – DESKTOP ONLY */}
      <div className="mt-auto d-none d-md-block pt-3 border-top">
        <button
          className="btn btn-outline-secondary w-100 text-start"
          onClick={onChangePassword}
        >
          🔐 Change Password
        </button>
      </div>
    </div>
  );
}

export default UserSidebar;
// function UserSidebar({
//   activePage,
//   setActivePage,
//   onChangePassword,
//   darkMode,
// }) {
//   const baseButtonStyle = {
//     borderRadius: "10px",
//     transition: "all 0.3s ease",
//   };

//   const btnStyle = (page) => ({
//     ...baseButtonStyle,
//     backgroundColor:
//       activePage === page
//         ? darkMode
//           ? "#2563eb"
//           : "#0d6efd"
//         : darkMode
//           ? "#1f2937"
//           : "#f8f9fa",
//     color: activePage === page ? "#ffffff" : darkMode ? "#e5e7eb" : "#000000",
//     border: darkMode ? "1px solid #374151" : "1px solid #dee2e6",
//   });

//   const sidebarStyle = {
//     backgroundColor: darkMode ? "#0f172a" : "#ffffff",
//     color: darkMode ? "#ffffff" : "#000000",
//     borderRight: darkMode ? "1px solid #1e293b" : "1px solid #dee2e6",
//     transition: "all 0.3s ease",
//   };

//   const hoverEffect = (e, enter) => {
//     if (enter) {
//       e.currentTarget.style.transform = "translateX(5px)";
//       e.currentTarget.style.boxShadow = darkMode
//         ? "0 5px 15px rgba(37,99,235,0.5)"
//         : "0 5px 15px rgba(0,0,0,0.1)";
//     } else {
//       e.currentTarget.style.transform = "translateX(0px)";
//       e.currentTarget.style.boxShadow = "none";
//     }
//   };

//   return (
//     <div className="h-100 p-3 d-flex flex-column" style={sidebarStyle}>
//       <h5 className="mb-4">👤 Student</h5>

//       {/* DASHBOARD */}
//       <button
//         className="btn w-100 text-start mb-2"
//         style={btnStyle("home")}
//         onClick={() => setActivePage("home")}
//         onMouseEnter={(e) => hoverEffect(e, true)}
//         onMouseLeave={(e) => hoverEffect(e, false)}
//       >
//         📊 Dashboard
//       </button>

//       {/* PROFILE */}
//       <button
//         className="btn w-100 text-start mb-2"
//         style={btnStyle("profile")}
//         onClick={() => setActivePage("profile")}
//         onMouseEnter={(e) => hoverEffect(e, true)}
//         onMouseLeave={(e) => hoverEffect(e, false)}
//       >
//         🙍 My Profile
//       </button>

//       {/* FEES */}
//       <button
//         className="btn w-100 text-start mb-2"
//         style={btnStyle("fees")}
//         onClick={() => setActivePage("fees")}
//         onMouseEnter={(e) => hoverEffect(e, true)}
//         onMouseLeave={(e) => hoverEffect(e, false)}
//       >
//         💳 Fees & Payment
//       </button>

//       {/* PAYMENT HISTORY */}
//       <button
//         className="btn w-100 text-start mb-2"
//         style={btnStyle("history")}
//         onClick={() => setActivePage("history")}
//         onMouseEnter={(e) => hoverEffect(e, true)}
//         onMouseLeave={(e) => hoverEffect(e, false)}
//       >
//         🧾 Payment History
//       </button>

//       {/* CHANGE PASSWORD – DESKTOP ONLY */}
//       <div
//         className="mt-auto d-none d-md-block pt-3"
//         style={{
//           borderTop: darkMode ? "1px solid #1e293b" : "1px solid #dee2e6",
//         }}
//       >
//         <button
//           className="btn w-100 text-start"
//           style={{
//             backgroundColor: darkMode ? "#1f2937" : "#f8f9fa",
//             color: darkMode ? "#ffffff" : "#000000",
//             border: darkMode ? "1px solid #374151" : "1px solid #dee2e6",
//             borderRadius: "10px",
//             transition: "all 0.3s ease",
//           }}
//           onClick={onChangePassword}
//           onMouseEnter={(e) => hoverEffect(e, true)}
//           onMouseLeave={(e) => hoverEffect(e, false)}
//         >
//           🔐 Change Password
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserSidebar;
