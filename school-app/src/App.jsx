// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// import Navbar from "./components/Navbar/Navbar";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import UserDashboard from "./pages/UserDashboard";

// /* Smooth scroll */
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);

//   return null;
// }

// /* Layout Controller */
// function Layout() {
//   const location = useLocation();

//   // Navbar sirf public pages pe
//   const hideNavbar =
//     location.pathname.startsWith("/admin") ||
//     location.pathname.startsWith("/user");

//   return (
//     <>
//       {!hideNavbar && <Navbar />}

//       <div style={{ paddingTop: hideNavbar ? "0px" : "90px" }}>
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* DASHBOARDS */}
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/user" element={<UserDashboard />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Layout />
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";

import Navbar from "./components/Navbar/Navbar";

/* 🔥 Lazy Loaded Pages */
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));

/* Smooth scroll */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div style={{ paddingTop: hideNavbar ? "0px" : "90px" }}>
        {/* 🔥 Suspense Added */}
        <Suspense
          fallback={
            <div style={{ padding: "100px", textAlign: "center" }}>
              Loading..
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
