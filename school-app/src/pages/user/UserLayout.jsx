import { useState } from "react";
import UserSidebar from "../../components/UserSidebar";

function UserLayout({ children, onChangePassword }) {
  const [activePage, setActivePage] = useState("home"); // ✅ DEFAULT DASHBOARD

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row">
        {/* ========== SIDEBAR ========== */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <UserSidebar
            activePage={activePage}
            setActivePage={setActivePage}
            onChangePassword={onChangePassword}
          />
        </div>

        {/* ========== CONTENT ========== */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {/* children ek function hai */}
          {children(activePage)}
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
