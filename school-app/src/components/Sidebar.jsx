// function Sidebar({ setPage }) {
//   return (
//     <div
//       style={{ width: "230px", minHeight: "100vh" }}
//       className="border-end p-3 bg-white"
//     >
//       <h5 className="mb-4">Admin</h5>

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
//       </div>

//       <div className="mt-auto pt-5">
//         <small className="text-muted">Logged in as Admin</small>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
function Sidebar({ setPage }) {
  return (
    <div
      style={{ width: "230px", minHeight: "100vh" }}
      className="border-end p-3 bg-white d-flex flex-column"
    >
      <h5 className="mb-4">👨‍💼 Admin</h5>

      {/* ===== MENU BUTTONS ===== */}
      <div className="d-grid gap-2">
        <button
          className="btn btn-light text-start"
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => setPage("add")}
        >
          ➕ Add Student
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => setPage("view")}
        >
          📋 View Students
        </button>

        {/* ✅ NEW : PAYMENT REQUESTS */}
        <button
          className="btn btn-light text-start"
          onClick={() => setPage("payments")}
        >
          💰 Payment Requests
        </button>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="mt-auto pt-4">
        <small className="text-muted">Logged in as Admin</small>
      </div>
    </div>
  );
}

export default Sidebar;
