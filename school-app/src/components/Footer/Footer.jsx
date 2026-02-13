// function Footer() {
//   return (
//     <footer className="bg-dark text-light pt-5 pb-3">
//       <div className="container">
//         <div className="row text-center text-md-start">
//           {/* BRAND */}
//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold mb-3">🏫 School Management</h5>
//             <p className="text-muted">
//               A smart and secure platform to manage students, parents, teachers
//               and school administration efficiently.
//             </p>
//           </div>

//           {/* QUICK LINKS */}
//           <div className="col-md-4 mb-4">
//             <h6 className="fw-bold mb-3">Quick Links</h6>
//             <ul className="list-unstyled">
//               <li className="mb-2">
//                 <a href="#home" className="footer-link">
//                   Home
//                 </a>
//               </li>
//               <li className="mb-2">
//                 <a href="#about" className="footer-link">
//                   About
//                 </a>
//               </li>
//               <li className="mb-2">
//                 <a href="#contact" className="footer-link">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* CONTACT */}
//           <div className="col-md-4 mb-4">
//             <h6 className="fw-bold mb-3">Contact Info</h6>
//             <p className="mb-1">📧 school@gmail.com</p>
//             <p className="mb-1">📞 +91 98765 43210</p>
//             <p className="mb-0">📍 India</p>
//           </div>
//         </div>

//         <hr className="border-secondary" />

//         {/* COPYRIGHT */}
//         <div className="text-center small text-muted">
//           © {new Date().getFullYear()} School Management System. All rights
//           reserved.
//         </div>
//       </div>

//       {/* INLINE FOOTER CSS */}
//       <style>{`
//         .footer-link {
//           color: #adb5bd;
//           text-decoration: none;
//           transition: color 0.3s ease;
//         }
//         .footer-link:hover {
//           color: #ffffff;
//         }
//       `}</style>
//     </footer>
//   );
// }

// export default Footer;
function Footer() {
  return (
    <footer className="footer-section pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* BRAND */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">🏫 School Management</h5>
            <p>
              A smart and secure platform to manage students, parents, teachers
              and school administration efficiently.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#home" className="footer-link">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Contact Info</h6>
            <p className="mb-1">📧 school@gmail.com</p>
            <p className="mb-1">📞 +91 98765 43210</p>
            <p className="mb-0">📍 India</p>
          </div>
        </div>

        <hr />

        <div className="text-center small">
          © {new Date().getFullYear()} School Management System. All rights
          reserved.
        </div>
      </div>

      {/* Footer Styling */}
      <style>{`
        /* Light Mode */
        .footer-section {
          background-color: #f8f9fa;
          color: #212529;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .footer-link {
          color: #6c757d;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #0d6efd;
        }

        /* Dark Mode */
        body.dark-mode .footer-section {
          background-color: #121212 !important;
          color: white !important;
        }

        body.dark-mode .footer-section * {
          color: white !important;
        }

        body.dark-mode .footer-link:hover {
          color: #0d6efd !important;
        }

        body.dark-mode hr {
          border-color: #333 !important;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
