import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";
import ClassBlocks from "../components/ClassBlocks";
import PaymentRequests from "../components/payments/PaymentRequests";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  /* ================= GLOBAL STYLES ================= */

  const bgMain = darkMode
    ? "linear-gradient(135deg,#000000,#111827)"
    : "#f4f6f9";

  const headerStyle = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    borderRadius: "14px",
    padding: "18px 22px",
    boxShadow: darkMode
      ? "0 8px 25px rgba(0,0,0,0.6)"
      : "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const pageWrapper = {
    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: darkMode
      ? "0 15px 40px rgba(0,0,0,0.7)"
      : "0 15px 35px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    minHeight: "70vh",
  };

  const textColor = {
    color: darkMode ? "#ffffff" : "#111827",
    transition: "0.3s ease",
  };

  return (
    <div
      className="container-fluid min-vh-100"
      style={{
        background: bgMain,
        transition: "all 0.4s ease",
      }}
    >
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
              setShowSidebar(false);
            }}
            darkMode={darkMode}
          />
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {/* ================= HEADER ================= */}
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            style={headerStyle}
          >
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-primary btn-sm d-md-none"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                ☰
              </button>

              <h4 className="mb-0 fw-semibold" style={textColor}>
                Hello Admin 👋
              </h4>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: darkMode ? "#1e293b" : "#facc15",
                  color: darkMode ? "#ffffff" : "#000000",
                  border: "none",
                  transition: "0.3s",
                }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          </div>

          {/* ================= PAGE WRAPPER ================= */}
          <div style={pageWrapper}>
            {page === "dashboard" && (
              <>
                <ClassBlocks darkMode={darkMode} />
                <div className="mt-4">
                  <DashboardHome darkMode={darkMode} />
                </div>
              </>
            )}

            {page === "add" && <AddStudent darkMode={darkMode} />}
            {page === "view" && <StudentList darkMode={darkMode} />}
            {page === "payments" && <PaymentRequests darkMode={darkMode} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
