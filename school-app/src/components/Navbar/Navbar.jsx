// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false); // NEW

//   // Load saved theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       document.body.classList.add("dark-mode");
//       setDarkMode(true);
//     }

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
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
//     setMenuOpen(false); // RESET ICON
//   };

//   const goToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//       }, 200);
//     } else {
//       document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     }
//     closeMobileMenu();
//   };

//   return (
//     <nav
//       className={`navbar navbar-expand-lg fixed-top transition-all ${
//         scrolled
//           ? darkMode
//             ? "navbar-dark bg-dark shadow"
//             : "navbar-light bg-white shadow"
//           : "navbar-dark bg-transparent"
//       }`}
//     >
//       <div className="container">
//         <Link className="navbar-brand fw-bold text-info" to="/">
//           🏫 Smart School
//         </Link>

//         {/* TOGGLER */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#schoolNavbar"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? (
//             <span style={{ fontSize: "24px", color: "inherit" }}>✖</span>
//           ) : (
//             <span className="navbar-toggler-icon"></span>
//           )}
//         </button>

//         <div className="collapse navbar-collapse" id="schoolNavbar">
//           <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
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

//             <li className="nav-item">
//               <Link
//                 className="btn btn-outline-info px-4"
//                 to="/login"
//                 onClick={closeMobileMenu}
//               >
//                 Login
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link
//                 className="btn btn-info px-4"
//                 to="/register"
//                 onClick={closeMobileMenu}
//               >
//                 Signup
//               </Link>
//             </li>

//             <li className="nav-item">
//               <div className="theme-toggle-wrapper">
//                 <button
//                   className={`theme-toggle ${darkMode ? "active" : ""}`}
//                   onClick={toggleTheme}
//                 >
//                   <span className="icon sun">☀</span>
//                   <span className="icon moon">🌙</span>
//                   <span className="toggle-circle"></span>
//                 </button>
//               </div>
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
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
    setMenuOpen(false);
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
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top custom-navbar ${
          scrolled ? "navbar-scrolled" : "navbar-transparent"
        }`}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold brand-green" to="/">
            🏫 Smart School
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <span style={{ fontSize: "24px", color: "white" }}>✖</span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>

          {/* MOBILE ANIMATED MENU */}
          <div
            className={`navbar-collapse custom-collapse ${
              menuOpen ? "open" : ""
            }`}
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link nav-green"
                  onClick={() => goToSection("home")}
                >
                  Home
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link nav-green"
                  onClick={() => goToSection("about")}
                >
                  About
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link nav-green"
                  onClick={() => goToSection("contact")}
                >
                  Contact
                </button>
              </li>

              <li className="nav-item">
                <Link
                  className="btn btn-outline-success px-4 custom-outline"
                  to="/login"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="btn btn-success px-4 custom-green"
                  to="/register"
                  onClick={closeMobileMenu}
                >
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className={`theme-toggle ${darkMode ? "active" : ""}`}
                  onClick={toggleTheme}
                >
                  <span className="icon sun">☀</span>
                  <span className="icon moon">🌙</span>
                  <span className="toggle-circle"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        .custom-navbar {
          transition: all 0.4s ease-in-out;
        }

        .navbar-transparent {
          background: transparent !important;
        }

        .navbar-transparent .nav-link,
        .navbar-transparent .navbar-brand {
          color: white !important;
        }

        .navbar-scrolled {
          background: linear-gradient(90deg, #16a34a, #22c55e);
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        .navbar-scrolled .nav-link,
        .navbar-scrolled .navbar-brand {
          color: white !important;
        }

        .custom-green {
          background-color: white !important;
          color: #16a34a !important;
          border: none !important;
        }

        .custom-outline {
          border: 2px solid white !important;
          color: white !important;
        }

        /* ========================= */
        /* 🔥 MOBILE ANIMATION ONLY */
        /* ========================= */
        @media (max-width: 991px) {

          .custom-collapse {
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.4s ease;
            background: linear-gradient(180deg, #16a34a, #15803d);
            border-radius: 0 0 15px 15px;
          }

          .custom-collapse.open {
            max-height: 500px;
            opacity: 1;
            transform: translateY(0);
            padding: 20px 0;
          }

          .custom-collapse .nav-link {
            color: white !important;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
