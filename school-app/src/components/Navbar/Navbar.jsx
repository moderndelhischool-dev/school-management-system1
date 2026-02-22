// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       document.body.classList.add("dark-mode");
//       setDarkMode(true);
//     }

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 60);
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
//     setMenuOpen(false);
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
//     <>
//       <nav
//         className={`navbar navbar-expand-lg fixed-top custom-navbar ${
//           scrolled ? "navbar-scrolled" : "navbar-transparent"
//         }`}
//       >
//         <div className="container">
//           <Link className="navbar-brand fw-bold brand-green" to="/">
//             🏫 Modern Delhi PH
//           </Link>

//           {/* TOGGLER */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? (
//               <span style={{ fontSize: "24px", color: "white" }}>✖</span>
//             ) : (
//               <span className="navbar-toggler-icon"></span>
//             )}
//           </button>

//           {/* MOBILE ANIMATED MENU */}
//           <div
//             className={`navbar-collapse custom-collapse ${
//               menuOpen ? "open" : ""
//             }`}
//           >
//             <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
//               <li className="nav-item">
//                 <button
//                   className="nav-link btn btn-link nav-green"
//                   onClick={() => goToSection("home")}
//                 >
//                   Home
//                 </button>
//               </li>

//               <li className="nav-item">
//                 <button
//                   className="nav-link btn btn-link nav-green"
//                   onClick={() => goToSection("about")}
//                 >
//                   About
//                 </button>
//               </li>

//               <li className="nav-item">
//                 <button
//                   className="nav-link btn btn-link nav-green"
//                   onClick={() => goToSection("contact")}
//                 >
//                   Contact
//                 </button>
//               </li>

//               <li className="nav-item">
//                 <Link
//                   className="btn btn-outline-success px-4 custom-outline"
//                   to="/login"
//                   onClick={closeMobileMenu}
//                 >
//                   Login
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link
//                   className="btn btn-success px-4 custom-green"
//                   to="/register"
//                   onClick={closeMobileMenu}
//                 >
//                   Signup
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <button
//                   className={`theme-toggle ${darkMode ? "active" : ""}`}
//                   onClick={toggleTheme}
//                 >
//                   <span className="icon sun">☀</span>
//                   <span className="icon moon">🌙</span>
//                   <span className="toggle-circle"></span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <style>{`
//         .custom-navbar {
//           transition: all 0.4s ease-in-out;
//         }

//         .navbar-transparent {
//           background: transparent !important;
//         }

//         .navbar-transparent .nav-link,
//         .navbar-transparent .navbar-brand {
//           color: white !important;
//         }

//         .navbar-scrolled {
//           background: linear-gradient(90deg, #16a34a, #22c55e);
//           box-shadow: 0 4px 15px rgba(0,0,0,0.15);
//         }

//         .navbar-scrolled .nav-link,
//         .navbar-scrolled .navbar-brand {
//           color: white !important;
//         }

//         .custom-green {
//           background-color: white !important;
//           color: #16a34a !important;
//           border: none !important;
//         }

//         .custom-outline {
//           border: 2px solid white !important;
//           color: white !important;
//         }

//         /* ========================= */
//         /* 🔥 MOBILE ANIMATION ONLY */
//         /* ========================= */
//         @media (max-width: 991px) {

//           .custom-collapse {
//             overflow: hidden;
//             max-height: 0;
//             opacity: 0;
//             transform: translateY(-20px);
//             transition: all 0.4s ease;
//             background: linear-gradient(180deg, #16a34a, #15803d);
//             border-radius: 0 0 15px 15px;
//           }

//           .custom-collapse.open {
//             max-height: 500px;
//             opacity: 1;
//             transform: translateY(0);
//             padding: 20px 0;
//           }

//           .custom-collapse .nav-link {
//             color: white !important;
//             margin-bottom: 10px;
//           }
//         }
//       `}</style>
//     </>
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

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      window.location.hash = id;
    }
    setMenuOpen(false);
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
            🏫 Modern Delhi PH
          </Link>

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

          <div
            className={`navbar-collapse custom-collapse ${
              menuOpen ? "open" : ""
            }`}
          >
            <div className="mobile-header d-lg-none">🏫 Modern Delhi PH</div>

            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link nav-green"
                  onClick={() => scrollToSection("home")}
                >
                  Home
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link nav-green"
                  onClick={() => scrollToSection("about")}
                >
                  About
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link nav-green"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact
                </button>
              </li>

              {/* 🔥 UPDATED LOGIN */}
              <li className="nav-item">
                <Link
                  className="btn px-4 nav-login-btn"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>

              {/* 🔥 UPDATED SIGNUP */}
              <li className="nav-item">
                <Link
                  className="btn px-4 nav-signup-btn"
                  to="/register"
                  onClick={() => setMenuOpen(false)}
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
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`

        .custom-navbar {
          transition: all 0.4s ease-in-out;
          z-index: 3000;
        }

        .navbar-transparent {
          background: transparent !important;
        }

        .navbar-transparent .nav-link,
        .navbar-transparent .navbar-brand {
          color: white !important;
        }

        .navbar-scrolled {
          background: linear-gradient(90deg, #4c1d95, #7c3aed);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .navbar-scrolled .nav-link,
        .navbar-scrolled .navbar-brand {
          color: white !important;
        }

        /* ========= LOGIN BUTTON ========= */
        /* ===== DEFAULT (Transparent Navbar) ===== */
.nav-login-btn {
  border: 2px solid white;
  color: white;
  background: transparent;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Hover in Transparent Mode */
.nav-login-btn:hover {
  background: white;
  color: #4c1d95;
  transform: translateY(-2px);
}

/* ===== WHEN NAVBAR SCROLLED ===== */
.navbar-scrolled .nav-login-btn {
  background: white;
  color: #4c1d95;
  border: none;
}

/* Hover in Scrolled Mode */
.navbar-scrolled .nav-login-btn:hover {
  background: #ede9fe;
  color: #4c1d95;
  box-shadow: 0 8px 20px rgba(124,58,237,0.3);
}

        /* ========= SIGNUP BUTTON ========= */
        .nav-signup-btn {
          background: linear-gradient(135deg,#4c1d95,#7c3aed);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          border: none;
          transition: all 0.3s ease;
        }

        .nav-signup-btn:hover {
          background: linear-gradient(135deg,#5b21b6,#9333ea);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(124,58,237,0.5);
        }

        /* Transparent mode adjustments */
        .navbar-transparent .nav-login-btn {
          border: 2px solid white;
          color: white;
        }

        .navbar-transparent .nav-login-btn:hover {
          background: white;
          color: #4c1d95;
        }

        .navbar-transparent .nav-signup-btn {
          background: white;
          color: #4c1d95;
        }

        /* Dark Mode */
        body.dark-mode .nav-login-btn {
          border: 2px solid #a78bfa;
          color: #a78bfa;
        }

        body.dark-mode .nav-login-btn:hover {
          background: #7c3aed;
          color: white;
        }

        body.dark-mode .nav-signup-btn {
          background: #7c3aed;
        }

        body.dark-mode .nav-signup-btn:hover {
          background: #9333ea;
        }

        /* MOBILE DRAWER */
        @media (max-width: 991px) {

          .custom-collapse {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 260px;
            transform: translateX(-100%);
            transition: transform 0.4s ease;
            background: linear-gradient(180deg, #4c1d95, #5b21b6);
            padding-top: 80px;
            z-index: 2000;
          }

          .custom-collapse.open {
            transform: translateX(0);
          }

          .mobile-header {
            position: absolute;
            top: 20px;
            left: 20px;
            font-weight: 700;
            font-size: 18px;
            color: white;
          }

          .custom-collapse ul {
            align-items: flex-start !important;
            padding-left: 20px;
          }

          .custom-collapse .nav-item {
            width: 100%;
            margin-bottom: 15px;
          }
        }

        .navbar-toggler {
          border: none !important;
        }

        .navbar-toggler:focus {
          box-shadow: none !important;
        }

        .navbar-toggler-icon {
          filter: invert(1);
        }

      `}</style>
    </>
  );
}

export default Navbar;
