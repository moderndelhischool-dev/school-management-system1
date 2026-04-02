// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

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
//       <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
//         <div className="container">
//           <Link className="navbar-brand premium-brand" to="/">
//             <span className="brand-full">
//               MODERN NEW DELHI PUBLIC HIGH SCHOOL
//             </span>
//             <span className="brand-mobile">Modern New Delhi PS</span>
//             <span className="brand-underline"></span>
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
//             <div className="mobile-brand d-lg-none">Modern Delhi PH</div>

//             <ul className="navbar-nav ms-auto nav-flex">
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

//               {/* FEES PDF */}

//               <li className="nav-item">
//                 <a
//                   className="nav-link-custom pdf-link"
//                   href="/modern_delhi_school_fees.pdf"
//                 >
//                   Fees
//                 </a>
//               </li>

//               {/* UNIFORM PDF */}
//               <li className="nav-item">
//                 <a
//                   className="nav-link-custom pdf-link"
//                   href="/modern_delhi_school_uniform.pdf"
//                 >
//                   Uniform
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <Link className="btn nav-login-btn" to="/login">
//                   Login
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="btn nav-signup-btn" to="/register">
//                   Signup
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <button
//                   className={`theme-circle ${darkMode ? "dark" : "light"}`}
//                   onClick={toggleTheme}
//                 >
//                   <span className="icon">{darkMode ? "🌙" : "☀"}</span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <style>{`

// /* ===== NAVBAR BASE ===== */

// .custom-navbar {
//   padding: 6px 0;
//   transition: 0.4s ease;
//   z-index: 3000;
//   background: linear-gradient(90deg, #0F4C6C, #1B5E84);
//   box-shadow: 0 4px 14px rgba(15,76,108,0.35);
// }

// /* ===== BRAND ===== */

// .premium-brand {
//   position: relative;
//   font-size: 20px;
//   font-weight: 800;
//   color: white !important;
//   text-transform: uppercase;
// }

// .brand-underline {
//   position: absolute;
//   bottom: -1px;
//   left: 0;
//   height: 2px;
//   width: 40%;
//   background: #D4A24C;
//   transition: 0.3s ease;
// }

// .premium-brand:hover .brand-underline {
//   width: 100%;
// }

// /* ===== DESKTOP ===== */

// @media (min-width: 992px) {

//   .nav-flex {
//     display: flex;
//     align-items: center;
//   }

//   .nav-item {
//     margin-left: 24px;
//   }

//   .nav-link-custom {
//     background: none;
//     border: none;
//     color: white;
//     font-weight: 500;
//     position: relative;
//     padding: 8px 0;
//   }

//   .nav-link-custom:hover {
//     color: #D4A24C;
//   }

//   .nav-link-custom::after {
//     content: "";
//     position: absolute;
//     left: 0;
//     bottom: -4px;
//     width: 0%;
//     height: 2px;
//     background: #D4A24C;
//     transition: 0.3s;
//   }

//   .nav-link-custom:hover::after {
//     width: 100%;
//   }
// }

// /* REMOVE LINE UNDER FEES / UNIFORM */

// /* REMOVE LINE FROM FEES & UNIFORM */

// .pdf-link,
// .pdf-link:hover,
// .pdf-link:focus,
// .pdf-link:active {
//   text-decoration: none !important;
//   border-bottom: none !important;
// }

// .pdf-link::after,
// .pdf-link:hover::after {
//   display: none !important;
//   width: 0 !important;
//   content: none !important;
// }

// /* ===== MOBILE ===== */

// @media (max-width: 991px) {

//   .custom-collapse {
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 240px;
//     transform: translateX(-100%);
//     transition: 0.4s ease;
//     background: linear-gradient(180deg, #0F4C6C, #1B5E84);
//     padding: 65px 20px 20px 20px;
//   }

//   .custom-collapse.open {
//     transform: translateX(0);
//   }

//   .nav-flex {
//     display: flex;
//     flex-direction: column;
//   }

//   .mobile-brand {
//     font-weight: 700;
//     font-size: 18px;
//     color: #D4A24C;
//     margin-bottom: 20px;
//   }

//   .nav-item {
//     margin-bottom: 10px;
//   }

//   .nav-link-custom {
//     width: 100%;
//     text-align: left;
//     color: white;
//     font-size: 15px;
//     padding: 4px 0;
//     border: none;
//     background: none;
//   }

//   .nav-link-custom::after {
//     display: none !important;
//   }

//   .nav-login-btn,
//   .nav-signup-btn {
//     width: 100%;
//     margin-top: 6px;
//   }
// }

// /* ===== BUTTONS ===== */

// .nav-login-btn {
//   border: 2px solid #D4A24C;
//   color: #D4A24C;
//   background: transparent;
//   border-radius: 50px;
//   padding: 6px 18px;
// }

// .nav-login-btn:hover {
//   background: #D4A24C;
//   color: #0F4C6C;
// }

// .nav-signup-btn {
//   background: #D4A24C;
//   color: #0F4C6C;
//   border-radius: 50px;
//   border: none;
//   padding: 6px 18px;
// }

// /* ===== THEME BUTTON ===== */
// /* MOBILE BRAND CONTROL */

// .brand-mobile{
// display:none;
// }

// @media(max-width:576px){

// .brand-full{
// display:none;
// }

// .brand-mobile{
// display:inline;
// font-size:16px;
// font-weight:800;
// }

// }
// .theme-circle {
//   width: 38px;
//   height: 38px;
//   border-radius: 50%;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   transition: all 0.35s ease;
// }

// .theme-circle.light {
//   background: white;
//   color: #0F4C6C;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.25);
// }

// .theme-circle.dark {
//   background: #111;
//   color: #FFD700;
//   box-shadow: 0 4px 14px rgba(0,0,0,0.5);
// }

// `}</style>
//     </>
//   );
// }

// export default Navbar;

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
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
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container">
          <Link
            className="navbar-brand premium-brand d-flex align-items-center"
            to="/"
          >
            <img src="/logo.jpeg" alt="School Logo" className="school-logo" />

            <div className="brand-text">
              <span className="brand-full">
                MODERN NEW DELHI PUBLIC HIGH SCHOOL
              </span>

              <span className="brand-mobile">Modern New Delhi PS</span>

              <span className="brand-underline"></span>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : <span className="navbar-toggler-icon"></span>}
          </button>

          <div
            className={`navbar-collapse custom-collapse ${
              menuOpen ? "open" : ""
            }`}
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

              {/* FEES PDF */}

              <li className="nav-item">
                <a
                  className="nav-link-custom pdf-link"
                  href="/modern_delhi_school_fees.pdf"
                >
                  Fees
                </a>
              </li>

              {/* UNIFORM PDF */}
              <li className="nav-item">
                <a
                  className="nav-link-custom pdf-link"
                  href="/modern_delhi_school_uniform.pdf"
                >
                  Uniform
                </a>
              </li>

              <li className="nav-item">
                <Link className="btn nav-login-btn" to="/login">
                  Sign in
                </Link>
              </li>

              <li className="nav-item">
                <Link className="btn nav-signup-btn" to="/register">
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  className={`theme-circle ${darkMode ? "dark" : "light"}`}
                  onClick={toggleTheme}
                >
                  <span className="icon">
                    {darkMode ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`

/* ===== NAVBAR BASE ===== */

.custom-navbar {
  padding: 5px 0;
  transition: 0.4s ease;
  z-index: 3000;
  background: linear-gradient(90deg, #0F4C6C, #1B5E84);
  box-shadow: 0 4px 14px rgba(15,76,108,0.35);
}/* SCHOOL LOGO */

.school-logo{
  width:42px;
  border-radius:50%;
  height:42px;
  object-fit:contain;
  margin-right:10px;
}

/* TEXT BLOCK */

.brand-text{
padding-bottom:5px;
  display:flex;
  flex-direction:column;
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

/* REMOVE LINE UNDER FEES / UNIFORM */

/* REMOVE LINE FROM FEES & UNIFORM */

.pdf-link,
.pdf-link:hover,
.pdf-link:focus,
.pdf-link:active {
  text-decoration: none !important;
  border-bottom: none !important;
}

.pdf-link::after,
.pdf-link:hover::after {
  display: none !important;
  width: 0 !important;
  content: none !important;
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

/* ===== THEME BUTTON ===== */
/* MOBILE BRAND CONTROL */

.brand-mobile{
display:none;
}

@media(max-width:576px){

.brand-full{
display:none;
}

.brand-mobile{
display:inline;
font-size:16px;
font-weight:800;
}

}
.theme-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.35s ease;
}

.theme-circle.light {
  background: white;
  color: #0F4C6C;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}

.theme-circle.dark {
  background: #111;
  color: #FFD700;
  box-shadow: 0 4px 14px rgba(0,0,0,0.5);
}

`}</style>
    </>
  );
}

export default Navbar;
