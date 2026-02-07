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

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div className="d-flex">
      <Sidebar setPage={setPage} />

      <div className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Hello Admin!</h4>
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>
            Logout
          </button>
        </div>

        {page === "dashboard" && <DashboardHome />}
        {page === "add" && <AddStudent />}
        {page === "view" && <StudentList />}
      </div>
    </div>
  );
}

export default AdminDashboard;
