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

//   const scrollToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate(`/#${id}`);
//     } else {
//       window.location.hash = id;
//     }
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg fixed-top custom-navbar ${
//           scrolled ? "navbar-scrolled" : "navbar-transparent"
//         }`}
//       >
//         <div className="container">
//           {/* DESKTOP BRAND */}
//           <Link className="navbar-brand fw-bold brand-name" to="/">
//             🏫 Modern Delhi PH
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? "✖" : <span className="navbar-toggler-icon"></span>}
//           </button>

//           <div
//             className={`navbar-collapse custom-collapse ${
//               menuOpen ? "open" : ""
//             }`}
//           >
//             {/* MOBILE BRAND (IMPORTANT FIX) */}
//             <div className="mobile-brand d-lg-none">🏫 Modern Delhi PH</div>

//             <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
//               {["home", "about", "contact"].map((item) => (
//                 <li className="nav-item" key={item}>
//                   <button
//                     className="nav-link-custom"
//                     onClick={() => scrollToSection(item)}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 </li>
//               ))}

//               <li className="nav-item">
//                 <Link
//                   className="btn px-4 nav-login-btn"
//                   to="/login"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link
//                   className="btn px-4 nav-signup-btn"
//                   to="/register"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Signup
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <div
//                   className={`theme-switch ${darkMode ? "active" : ""}`}
//                   onClick={toggleTheme}
//                 >
//                   <div className="switch-circle">{darkMode ? "🌙" : "☀"}</div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <style>{`

// /* ================= NAVBAR ================= */

// .custom-navbar {
//   transition: 0.4s ease;
//   z-index: 3000;
// }

// .navbar-transparent {
//   background: transparent !important;
// }

// .navbar-scrolled {
//   background: linear-gradient(90deg, #0F4C6C, #1B5E84);
//   box-shadow: 0 6px 20px rgba(15,76,108,0.4);
// }

// .brand-name {
//   color: white !important;
// }

// /* ================= MOBILE BRAND ================= */

// .mobile-brand {
//   color: white;
//   font-weight: 700;
//   font-size: 18px;
//   margin-bottom: 25px;
//   text-align: left;
// }

// /* ================= NAV LINKS ================= */

// .nav-link-custom {
//   background: none;
//   border: none;
//   color: white;
//   font-weight: 500;
//   cursor: pointer;
//   position: relative;
//   padding: 8px 10px;
//   transition: 0.3s ease;
// }

// .nav-link-custom:hover {
//   color: #D4A24C;
// }

// .nav-link-custom::after {
//   content: "";
//   position: absolute;
//   left: 0;
//   bottom: -4px;
//   width: 0%;
//   height: 2px;
//   background: #D4A24C;
//   transition: width 0.3s ease;
// }

// .nav-link-custom:hover::after {
//   width: 100%;
// }

// /* ================= BUTTONS ================= */

// .nav-login-btn {
//   border: 2px solid white;
//   color: white;
//   background: transparent;
//   border-radius: 50px;
//   font-weight: 600;
//   transition: 0.3s ease;
// }

// .nav-login-btn:hover {
//   background: #D4A24C;
//   color: #0F4C6C;
// }

// .nav-signup-btn {
//   background: #D4A24C;
//   color: #0F4C6C;
//   border-radius: 50px;
//   font-weight: 600;
//   border: none;
//   transition: 0.3s ease;
// }

// .nav-signup-btn:hover {
//   background: white;
//   color: #0F4C6C;
// }

// /* ================= SMOOTH TOGGLE ================= */

// .theme-switch {
//   width: 60px;
//   height: 30px;
//   background: #D4A24C;
//   border-radius: 50px;
//   display: flex;
//   align-items: center;
//   padding: 3px;
//   cursor: pointer;
//   transition: 0.4s ease;
// }

// .theme-switch.active {
//   background: #0F172A;
// }

// .switch-circle {
//   width: 24px;
//   height: 24px;
//   background: white;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: 0.4s ease;
// }

// .theme-switch.active .switch-circle {
//   transform: translateX(30px);
//   background: #D4A24C;
// }

// /* ================= MOBILE DRAWER ================= */

// @media (max-width: 991px) {

//   .custom-collapse {
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 260px;
//     transform: translateX(-100%);
//     transition: 0.4s ease;
//     background: linear-gradient(180deg, #0F4C6C, #1B5E84);
//     padding: 80px 20px 20px 20px;
//     z-index: 2000;
//   }

//   .custom-collapse.open {
//     transform: translateX(0);
//   }

//   .navbar-nav {
//     align-items: flex-start !important;
//   }

//   .nav-item {
//     width: 100%;
//     margin-bottom: 15px;
//   }
// }

// .navbar-toggler {
//   border: none !important;
// }

// .navbar-toggler:focus {
//   box-shadow: none !important;
// }

// .navbar-toggler-icon {
//   filter: invert(1);
// }

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
          <Link className="navbar-brand premium-brand" to="/">
            Modern Delhi PH
            <span className="brand-underline"></span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : <span className="navbar-toggler-icon"></span>}
          </button>

          <div
            className={`navbar-collapse custom-collapse ${menuOpen ? "open" : ""}`}
          >
            <div className="mobile-brand d-lg-none">Modern Delhi PH</div>

            <ul className="navbar-nav ms-auto nav-flex">
              {["home", "about", "contact"].map((item) => (
                <li className="nav-item" key={item}>
                  <button
                    className="nav-link-custom"
                    onClick={() => scrollToSection(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}

              <li className="nav-item">
                <Link className="btn nav-login-btn" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="btn nav-signup-btn" to="/register">
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <div
                  className={`theme-switch ${darkMode ? "active" : ""}`}
                  onClick={toggleTheme}
                >
                  <div className="switch-circle">{darkMode ? "🌙" : "☀"}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`

/* ===== NAVBAR BASE ===== */

.custom-navbar {
  padding: 6px 0;
  transition: 0.4s ease;
  z-index: 3000;
}

.navbar-transparent {
  background: transparent !important;
}

.navbar-scrolled {
  background: linear-gradient(90deg, #0F4C6C, #1B5E84);
  box-shadow: 0 4px 14px rgba(15,76,108,0.35);
}

/* ===== BRAND ===== */

.premium-brand {
  position: relative;
  font-size: 20px;
  font-weight: 800;
  color: white !important;
  text-transform: uppercase;
}

.brand-underline {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 2px;
  width: 40%;
  background: #D4A24C;
  transition: 0.3s ease;
}

.premium-brand:hover .brand-underline {
  width: 100%;
}

/* ===== DESKTOP ===== */

@media (min-width: 992px) {

  .nav-flex {
    display: flex;
    align-items: center;
  }

  .nav-item {
    margin-left: 24px;
  }

  .nav-link-custom {
    background: none;
    border: none;
    color: white;
    font-weight: 500;
    position: relative;
    padding: 8px 0;
  }

  .nav-link-custom:hover {
    color: #D4A24C;
  }

  .nav-link-custom::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0%;
    height: 2px;
    background: #D4A24C;
    transition: 0.3s;
  }

  .nav-link-custom:hover::after {
    width: 100%;
  }
}

/* ===== MOBILE ===== */

@media (max-width: 991px) {

  .custom-collapse {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    transform: translateX(-100%);
    transition: 0.4s ease;
    background: linear-gradient(180deg, #0F4C6C, #1B5E84);
    padding: 65px 20px 20px 20px;
  }

  .custom-collapse.open {
    transform: translateX(0);
  }

  .nav-flex {
    display: flex;
    flex-direction: column;
  }

  .mobile-brand {
    font-weight: 700;
    font-size: 18px;
    color: #D4A24C;
    margin-bottom: 20px;
  }

  /* GAP REDUCED */
  .nav-item {
    margin-bottom: 10px;
  }

  .nav-link-custom {
    width: 100%;
    text-align: left;
    color: white;
    font-size: 15px;
    padding: 4px 0;
    border: none;
    background: none;
  }

  .nav-link-custom::after {
    display: none !important;
  }

  .nav-login-btn,
  .nav-signup-btn {
    width: 100%;
    margin-top: 6px;
  }
}

/* ===== BUTTONS ===== */

.nav-login-btn {
  border: 2px solid #D4A24C;
  color: #D4A24C;
  background: transparent;
  border-radius: 50px;
  padding: 6px 18px;
}

.nav-login-btn:hover {
  background: #D4A24C;
  color: #0F4C6C;
}

.nav-signup-btn {
  background: #D4A24C;
  color: #0F4C6C;
  border-radius: 50px;
  border: none;
  padding: 6px 18px;
}

/* ===== DARK MODE BUTTON FIX ===== */

.theme-switch {
  width: 50px;
  height: 22px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  transition: 0.3s ease;
  background: #D4A24C;
}

.theme-switch.active {
  background: #111;   /* dark background */
}

.switch-circle {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
}

.theme-switch.active .switch-circle {
  transform: translateX(24px);
  background: #D4A24C;
}

      `}</style>
    </>
  );
}

export default Navbar;
