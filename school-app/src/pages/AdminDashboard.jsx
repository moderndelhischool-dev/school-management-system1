// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// import Sidebar from "../components/Sidebar";
// import DashboardHome from "../components/DashboardHome";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";
// import ClassBlocks from "../components/ClassBlocks"; // ✅ NEW

// function AdminDashboard() {
//   const [page, setPage] = useState("dashboard");
//   const [showSidebar, setShowSidebar] = useState(false);

//   const logout = async () => {
//     await signOut(auth);
//     window.location.href = "/";
//   };

//   return (
//     <div className="container-fluid min-vh-100 bg-light">
//       <div className="row">
//         {/* ================= SIDEBAR ================= */}
//         <div
//           className={`col-12 col-md-3 col-lg-2 p-0 ${
//             showSidebar ? "d-block" : "d-none d-md-block"
//           }`}
//         >
//           <Sidebar
//             setPage={(p) => {
//               setPage(p);
//               setShowSidebar(false); // mobile auto close
//             }}
//           />
//         </div>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
//           {/* HEADER */}
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div className="d-flex align-items-center gap-2">
//               <button
//                 className="btn btn-outline-primary btn-sm d-md-none"
//                 onClick={() => setShowSidebar(!showSidebar)}
//               >
//                 ☰
//               </button>
//               <h4 className="mb-0">Hello Admin!</h4>
//             </div>

//             <button className="btn btn-outline-danger btn-sm" onClick={logout}>
//               Logout
//             </button>
//           </div>

//           {/* ================= DASHBOARD ================= */}
//           {page === "dashboard" && (
//             <>
//               {/* 🔥 CLASS WISE BLOCKS */}
//               <ClassBlocks />

//               {/* EXISTING DASHBOARD */}
//               <div className="mt-4">
//                 <DashboardHome />
//               </div>
//             </>
//           )}

//           {page === "add" && <AddStudent />}
//           {page === "view" && <StudentList />}
//         </div>
//       </div>
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
import ClassBlocks from "../components/ClassBlocks";
import PaymentRequests from "../components/payments/PaymentRequests"; // ✅ PAYMENT

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
              setShowSidebar(false); // mobile auto close
            }}
          />
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
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
          {/* ================= PAGES ================= */}
          {page === "dashboard" && (
            <>
              <ClassBlocks />
              <div className="mt-4">
                <DashboardHome />
              </div>
            </>
          )}
          {page === "add" && <AddStudent />}
          {page === "view" && <StudentList />}
          {page === "payments" && <PaymentRequests />} {/* ✅ NEW */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
