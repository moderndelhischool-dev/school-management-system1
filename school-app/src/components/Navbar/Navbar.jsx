// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);

//   // Load saved theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       document.body.classList.add("dark-mode");
//       setDarkMode(true);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);

//     if (newMode) {
//       document.body.classList.add("dark-mode");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark-mode");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const closeMobileMenu = () => {
//     const nav = document.getElementById("schoolNavbar");
//     if (nav && nav.classList.contains("show")) {
//       nav.classList.remove("show");
//     }
//   };

//   const goToSection = (id) => {
//     if (location.pathname === "/") {
//       const el = document.getElementById(id);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//       closeMobileMenu();
//     } else {
//       navigate("/");
//       setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//         closeMobileMenu();
//       }, 150);
//     }
//   };

//   return (
//     <nav
//       className={`navbar navbar-expand-lg shadow-sm fixed-top ${
//         darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
//       }`}
//     >
//       <div className="container">
//         {/* LEFT */}
//         <Link className="navbar-brand fw-bold" to="/">
//           🏫 School Management
//         </Link>

//         {/* MOBILE */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#schoolNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* RIGHT */}
//         <div className="collapse navbar-collapse" id="schoolNavbar">
//           <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
//             <li className="nav-item">
//               <button
//                 className="nav-link btn btn-link"
//                 onClick={() => goToSection("home")}
//               >
//                 Home
//               </button>
//             </li>

//             <li className="nav-item">
//               <button
//                 className="nav-link btn btn-link"
//                 onClick={() => goToSection("about")}
//               >
//                 About
//               </button>
//             </li>

//             <li className="nav-item">
//               <button
//                 className="nav-link btn btn-link"
//                 onClick={() => goToSection("contact")}
//               >
//                 Contact
//               </button>
//             </li>

//             {/* LOGIN */}
//             <li className="nav-item ms-lg-3">
//               <Link
//                 className={`btn ${
//                   darkMode ? "btn-outline-light" : "btn-outline-primary"
//                 } px-4`}
//                 to="/login"
//                 onClick={closeMobileMenu}
//               >
//                 Login
//               </Link>
//             </li>

//             {/* SIGNUP */}
//             <li className="nav-item">
//               <Link
//                 className="btn btn-primary px-4"
//                 to="/register"
//                 onClick={closeMobileMenu}
//               >
//                 Signup
//               </Link>
//             </li>

//             {/* 🌙 DARK MODE BUTTON LAST */}
//             <li className="nav-item">
//               <button
//                 className={`btn ${
//                   darkMode ? "btn-outline-light" : "btn-outline-dark"
//                 }`}
//                 onClick={toggleTheme}
//               >
//                 {darkMode ? "☀ Light" : "🌙 Dark"}
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // NEW

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  const closeMobileMenu = () => {
    const nav = document.getElementById("schoolNavbar");
    if (nav && nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
    setMenuOpen(false); // RESET ICON
  };

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-all ${
        scrolled
          ? darkMode
            ? "navbar-dark bg-dark shadow"
            : "navbar-light bg-white shadow"
          : "navbar-dark bg-transparent"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-info" to="/">
          🏫 Smart School
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#schoolNavbar"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span style={{ fontSize: "24px", color: "inherit" }}>✖</span>
          ) : (
            <span className="navbar-toggler-icon"></span>
          )}
        </button>

        <div className="collapse navbar-collapse" id="schoolNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => goToSection("home")}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => goToSection("about")}
              >
                About
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => goToSection("contact")}
              >
                Contact
              </button>
            </li>

            <li className="nav-item">
              <Link
                className="btn btn-outline-info px-4"
                to="/login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="btn btn-info px-4"
                to="/register"
                onClick={closeMobileMenu}
              >
                Signup
              </Link>
            </li>

            <li className="nav-item">
              <div className="theme-toggle-wrapper">
                <button
                  className={`theme-toggle ${darkMode ? "active" : ""}`}
                  onClick={toggleTheme}
                >
                  <span className="icon sun">☀</span>
                  <span className="icon moon">🌙</span>
                  <span className="toggle-circle"></span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
