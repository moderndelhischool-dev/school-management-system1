// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";

// function AdminDashboard() {
//   const [page, setPage] = useState("");

//   const logout = async () => {
//     await signOut(auth);
//     window.location.href = "/";
//   };

//   return (
//     <div className="container mt-4">
//       <h2>👑 Admin Dashboard</h2>

//       {/* Buttons */}
//       <div className="mb-3">
//         <button
//           className="btn btn-primary me-2"
//           onClick={() => setPage("add")}
//         >
//           Add Student
//         </button>

//         <button
//           className="btn btn-secondary me-2"
//           onClick={() => setPage("view")}
//         >
//           View Students
//         </button>

//         <button className="btn btn-danger" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* Pages */}
//       {page === "add" && <AddStudent />}
//       {page === "view" && <StudentList />}
//       {page === "" && <p>Select an option above 👆</p>}
//     </div>
//   );
// }

// export default AdminDashboard;
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row">
        {/* ================= SIDEBAR ================= */}
        <div
          className={`col-12 col-md-3 col-lg-2 p-0 ${
            showSidebar ? "d-block" : "d-none d-md-block"
          }`}
        >
          <Sidebar
            setPage={(p) => {
              setPage(p);
              setShowSidebar(false); // auto close on mobile
            }}
          />
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              {/* ☰ toggle (mobile only) */}
              <button
                className="btn btn-outline-primary btn-sm d-md-none"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                ☰
              </button>

              <h4 className="mb-0">Hello Admin!</h4>
            </div>

            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </div>

          {/* PAGES */}
          {page === "dashboard" && <DashboardHome />}
          {page === "add" && <AddStudent />}
          {page === "view" && <StudentList />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
