// import { Link, useNavigate, useLocation } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const closeMobileMenu = () => {
//     const nav = document.getElementById("schoolNavbar");
//     if (nav && nav.classList.contains("show")) {
//       nav.classList.remove("show");
//     }
//   };

//   const goToSection = (id) => {
//     // agar already home pe ho
//     if (location.pathname === "/") {
//       const el = document.getElementById(id);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" });
//       }
//       closeMobileMenu();
//     } else {
//       // agar kisi aur page se aa rahe ho
//       navigate("/");
//       setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth" });
//         }
//         closeMobileMenu();
//       }, 150);
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
//       <div className="container">
//         {/* LEFT */}
//         <Link className="navbar-brand fw-bold text-primary" to="/">
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

//             <li className="nav-item ms-lg-3">
//               <Link
//                 className="btn btn-outline-primary px-4"
//                 to="/login"
//                 onClick={closeMobileMenu}
//               >
//                 Login
//               </Link>
//             </li>

//             <li className="nav-item mt-2 mt-lg-0">
//               <Link
//                 className="btn btn-primary px-4"
//                 to="/register"
//                 onClick={closeMobileMenu}
//               >
//                 Signup
//               </Link>
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

  // Load saved theme
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

  const closeMobileMenu = () => {
    const nav = document.getElementById("schoolNavbar");
    if (nav && nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  const goToSection = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        closeMobileMenu();
      }, 150);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm fixed-top ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
      }`}
    >
      <div className="container">
        {/* LEFT */}
        <Link className="navbar-brand fw-bold" to="/">
          🏫 School Management
        </Link>

        {/* MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#schoolNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* RIGHT */}
        <div className="collapse navbar-collapse" id="schoolNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
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

            {/* LOGIN */}
            <li className="nav-item ms-lg-3">
              <Link
                className={`btn ${
                  darkMode ? "btn-outline-light" : "btn-outline-primary"
                } px-4`}
                to="/login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>

            {/* SIGNUP */}
            <li className="nav-item">
              <Link
                className="btn btn-primary px-4"
                to="/register"
                onClick={closeMobileMenu}
              >
                Signup
              </Link>
            </li>

            {/* 🌙 DARK MODE BUTTON LAST */}
            <li className="nav-item">
              <button
                className={`btn ${
                  darkMode ? "btn-outline-light" : "btn-outline-dark"
                }`}
                onClick={toggleTheme}
              >
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
