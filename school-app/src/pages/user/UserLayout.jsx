import { useState } from "react";
import UserSidebar from "../../components/UserSidebar";

function UserLayout({ children, onChangePassword }) {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="container-fluid bg-light min-vh-100">
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
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {typeof children === "function" ? children(activePage) : children}
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
