import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";

import Navbar from "./components/Navbar/Navbar";

/* 🔥 Lazy Loaded Pages */
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // ✅ If URL has hash (/#about etc)
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    } else {
      // ✅ Normal route scroll
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const isHomePage = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div
        style={{
          paddingTop: hideNavbar ? "0px" : isHomePage ? "0px" : "90px",
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserDashboard />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
