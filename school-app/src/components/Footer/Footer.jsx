// function Footer() {
//   return (
//     <footer className="footer-section pt-5 pb-3">
//       <div className="container">
//         <div className="row text-center text-md-start">
//           {/* BRAND */}
//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold mb-3">🏫 School Management</h5>
//             <p>
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

//         <hr />

//         <div className="text-center small">
//           © {new Date().getFullYear()} School Management System. All rights
//           reserved.
//         </div>
//       </div>

//       {/* Footer Styling */}
//       <style>{`
//         /* Light Mode */
//         .footer-section {
//           background-color: #f8f9fa;
//           color: #212529;
//           transition: background-color 0.3s ease, color 0.3s ease;
//         }

//         .footer-link {
//           color: #6c757d;
//           text-decoration: none;
//           transition: color 0.3s ease;
//         }

//         .footer-link:hover {
//           color: #0d6efd;
//         }

//         /* Dark Mode */
//         body.dark-mode .footer-section {
//           background-color: #121212 !important;
//           color: white !important;
//         }

//         body.dark-mode .footer-section * {
//           color: white !important;
//         }

//         body.dark-mode .footer-link:hover {
//           color: #0d6efd !important;
//         }

//         body.dark-mode hr {
//           border-color: #333 !important;
//         }
//       `}</style>
//     </footer>
//   );
// }

// export default Footer;
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="footer-section pt-5 pb-3"
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* SCHOOL INFO */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 school-name">
              Modern New Delhi Public High School
            </h5>
            <p>
              Committed to academic excellence and holistic development, our
              school provides a disciplined and nurturing learning environment
              for students in Hoshiarpur.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
              <i className="bi bi-facebook social-icon"></i>
              <i className="bi bi-instagram social-icon"></i>
              <i className="bi bi-youtube social-icon"></i>
            </div>
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

          {/* CONTACT DETAILS */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Contact Information</h6>
            <p className="mb-1">📍 Kakon, Ajjowal, Hoshiarpur, Punjab</p>
            <p className="mb-1">📞 +91 98554 40343</p>
            <p className="mb-0">📧 info@modernndpschool.com</p>
          </div>
        </div>

        <hr />

        <div className="text-center small">
          © {new Date().getFullYear()} Modern New Delhi Public High School. All
          Rights Reserved.
        </div>
      </div>

      {/* ===== Styling ===== */}
      <style>{`
        .footer-section {
          background: linear-gradient(135deg, #f1f3f5, #e9ecef);
          color: #212529;
          transition: 0.3s ease;
        }

        .school-name {
          color: #2f7d32;
        }

        .footer-link {
          color: #6c757d;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .footer-link:hover {
          color: #2f7d32;
          padding-left: 6px;
        }

        .social-icon {
          font-size: 20px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .social-icon:hover {
          color: #2f7d32;
          transform: translateY(-3px);
        }

        hr {
          border-color: #ccc;
        }

        /* Dark Mode Support */
        body.dark-mode .footer-section {
          background: #121212 !important;
          color: white !important;
        }

        body.dark-mode .footer-link {
          color: #bbb !important;
        }

        body.dark-mode hr {
          border-color: #333 !important;
        }
      `}</style>
    </motion.footer>
  );
}

export default Footer;
