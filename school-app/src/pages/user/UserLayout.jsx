// import { useState } from "react";
// import UserSidebar from "../../components/UserSidebar";

// function UserLayout({ children, onChangePassword }) {
//   const [activePage, setActivePage] = useState("home");

//   return (
//     <div className="container-fluid bg-light min-vh-100">
//       <div className="row min-vh-100">
//         {/* ================= SIDEBAR ================= */}
//         <div className="col-12 col-md-3 col-lg-2 p-0">
//           <UserSidebar
//             activePage={activePage}
//             setActivePage={setActivePage}
//             onChangePassword={onChangePassword}
//           />
//         </div>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
//           {typeof children === "function" ? children(activePage) : children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserLayout;
import { useState } from "react";
import UserSidebar from "../../components/UserSidebar";

function UserLayout({ children, onChangePassword }) {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="container-fluid userlayout-wrapper min-vh-100">
      <div className="row min-vh-100">
        {/* ================= SIDEBAR ================= */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <UserSidebar
            activePage={activePage}
            setActivePage={setActivePage}
            onChangePassword={onChangePassword}
          />
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4 userlayout-content">
          {typeof children === "function" ? children(activePage) : children}
        </div>
      </div>

      {/* DARK MODE STYLE */}
      <style>{`
        /* Light mode default */
        .userlayout-wrapper {
          background-color: #f8f9fa;
          transition: background-color 0.3s ease;
        }

        /* Dark Mode */
        body.dark-mode .userlayout-wrapper {
          background-color: #121212 !important;
          color: white !important;
        }

        body.dark-mode .userlayout-content {
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default UserLayout;
