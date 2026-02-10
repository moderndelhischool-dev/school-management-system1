// function UserSidebar({ activePage, setActivePage }) {
//   const btnClass = (page) =>
//     `btn w-100 text-start mb-2 ${
//       activePage === page ? "btn-primary text-white" : "btn-light"
//     }`;

//   return (
//     <div className="bg-white h-100 border-end p-3">
//       <h5 className="mb-4">👤 Student</h5>

//       {/* DASHBOARD */}
//       <button
//         className={btnClass("home")}
//         onClick={() => setActivePage("home")}
//       >
//         📊 Dashboard
//       </button>

//       {/* PROFILE */}
//       <button
//         className={btnClass("profile")}
//         onClick={() => setActivePage("profile")}
//       >
//         🙍 My Profile
//       </button>

//       {/* FEES */}
//       <button
//         className={btnClass("fees")}
//         onClick={() => setActivePage("fees")}
//       >
//         💳 Fees & Payment
//       </button>
//     </div>
//   );
// }

// export default UserSidebar;
function UserSidebar({ activePage, setActivePage, onChangePassword }) {
  const btnClass = (page) =>
    `btn w-100 text-start mb-2 ${
      activePage === page ? "btn-primary text-white" : "btn-light"
    }`;

  return (
    <div
      className="bg-white border-end p-3 d-flex flex-column"
      style={{ minHeight: "100vh" }} // 🔥 FIX: sidebar full height
    >
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

      {/* PAYMENT HISTORY */}
      <button
        className={btnClass("history")}
        onClick={() => setActivePage("history")}
      >
        🧾 Payment History
      </button>

      {/* ===== FIXED BOTTOM AREA ===== */}
      <div className="mt-auto pt-3 border-top">
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
