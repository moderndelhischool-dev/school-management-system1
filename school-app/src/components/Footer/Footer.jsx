// import { motion } from "framer-motion";

// function Footer() {
//   return (
//     <motion.footer
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//       className="footer-section pt-5 pb-3"
//     >
//       <div className="container">
//         <div className="row text-center text-md-start">
//           {/* SCHOOL INFO */}
//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold mb-3 school-name">
//               Modern New Delhi Public School
//             </h5>
//             <p>
//               Modern New Delhi Public School is dedicated to academic excellence
//               and character development. We provide a disciplined, nurturing,
//               and future-focused learning environment for students in
//               Hoshiarpur.
//             </p>

//             <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
//               <i className="bi bi-facebook social-icon"></i>
//               <i className="bi bi-instagram social-icon"></i>
//               <i className="bi bi-youtube social-icon"></i>
//             </div>
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

//           {/* CONTACT DETAILS */}
//           <div className="col-md-4 mb-4">
//             <h6 className="fw-bold mb-3">Contact Information</h6>
//             <p className="mb-1">📍 Kakon, Ajjowal, Hoshiarpur, Punjab</p>
//             <p className="mb-1">☎ Office: 01882-298792</p>
//             <p className="mb-1">👨‍🏫 Principal: 9855106665</p>
//             <p className="mb-1">🏫 President: 9855440343</p>
//             <p className="mb-0">📧 mndps.hsp@gmail.com</p>
//           </div>
//         </div>

//         <hr />

//         <div className="text-center small">
//           © {new Date().getFullYear()} Modern New Delhi Public School. All
//           Rights Reserved.
//         </div>
//       </div>

//       <style>{`
//         .footer-section {
//           background: linear-gradient(135deg, #16a34a, #15803d);
//           color: white;
//           transition: 0.3s ease;
//         }

//         .school-name {
//           color: #ffffff;
//         }

//         .footer-link {
//           color: #e5e7eb;
//           text-decoration: none;
//           transition: 0.3s ease;
//         }

//         .footer-link:hover {
//           color: #ffffff;
//           padding-left: 6px;
//         }

//         .social-icon {
//           font-size: 20px;
//           cursor: pointer;
//           transition: 0.3s ease;
//           color: #e5e7eb;
//         }

//         .social-icon:hover {
//           color: white;
//           transform: translateY(-3px);
//         }

//         hr {
//           border-color: rgba(255,255,255,0.3);
//         }

//         /* DARK MODE */
//         body.dark-mode .footer-section {
//           background: #0f172a !important;
//         }

//         body.dark-mode .footer-link {
//           color: #cbd5e1;
//         }

//         body.dark-mode .footer-link:hover {
//           color: #ffffff;
//         }
//       `}</style>
//     </motion.footer>
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
              Modern New Delhi Public School
            </h5>
            <p className="footer-text">
              Modern New Delhi Public School is committed to academic
              excellence, character building, and holistic development. We
              nurture confident and future-ready students in Hoshiarpur.
            </p>

            <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
              <i className="bi bi-facebook social-icon"></i>
              <i className="bi bi-instagram social-icon"></i>
              <i className="bi bi-youtube social-icon"></i>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3 section-title">Quick Links</h6>
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
            <h6 className="fw-bold mb-3 section-title">Contact Information</h6>
            <p className="mb-1">📍 Kakon, Ajjowal, Hoshiarpur, Punjab</p>
            <p className="mb-1">☎ Office: 01882-298792</p>
            <p className="mb-1">👨‍🏫 Principal: 9855106665</p>
            <p className="mb-1">🏫 President: 9855440343</p>
            <p className="mb-0">📧 mndps.hsp@gmail.com</p>
          </div>
        </div>

        <hr />

        <div className="text-center small copyright">
          © {new Date().getFullYear()} Modern New Delhi Public School. All
          Rights Reserved.
        </div>
      </div>

      <style>{`

        /* DARK PURPLE THEME */
        .footer-section {
          background: linear-gradient(135deg, #4c1d95, #5b21b6);
          color: white;
          transition: 0.3s ease;
        }

        .school-name {
          color: #ffffff;
        }

        .footer-text {
          color: #e9d5ff;
        }

        .section-title {
          color: #ffffff;
        }

        .footer-link {
          color: #ddd6fe;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .footer-link:hover {
          color: #c4b5fd;
          padding-left: 6px;
        }

        .social-icon {
          font-size: 20px;
          cursor: pointer;
          transition: 0.3s ease;
          color: #ddd6fe;
        }

        .social-icon:hover {
          color: #ffffff;
          transform: translateY(-4px);
        }

        hr {
          border-color: rgba(255,255,255,0.2);
        }

        .copyright {
          color: #e9d5ff;
        }

        /* DARK MODE (Extra Deep Look) */
        body.dark-mode .footer-section {
          background: linear-gradient(135deg, #1e1b4b, #312e81) !important;
        }

      `}</style>
    </motion.footer>
  );
}

export default Footer;
