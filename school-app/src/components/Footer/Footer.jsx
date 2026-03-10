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
//             <p className="footer-text">
//               Modern New Delhi Public School is committed to academic
//               excellence, character building, and holistic development. We
//               nurture confident and future-ready students in Hoshiarpur.
//             </p>

//             <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
//               <i className="bi bi-facebook social-icon"></i>
//               <i className="bi bi-instagram social-icon"></i>
//               <i className="bi bi-youtube social-icon"></i>
//             </div>
//           </div>

//           {/* QUICK LINKS */}
//           <div className="col-md-4 mb-4">
//             <h6 className="fw-bold mb-3 section-title">Quick Links</h6>
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
//             <h6 className="fw-bold mb-3 section-title">Contact Information</h6>
//             <p className="mb-1"> Kakon, Ajjowal, Hoshiarpur, Punjab</p>
//             <p className="mb-1"> Office: 01882-298792</p>
//             <p className="mb-1"> Principal: 9855106665</p>
//             <p className="mb-1"> President: 9855440343</p>
//             <p className="mb-0"> mndps.hsp@gmail.com</p>
//           </div>
//         </div>

//         <hr />

//         <div className="text-center small copyright">
//           © {new Date().getFullYear()} Modern New Delhi Public School. All
//           Rights Reserved.
//         </div>
//       </div>

//       <style>{`

// /* ================= NEW PROFESSIONAL BLUE-GOLD THEME ================= */

// .footer-section {
//   background: linear-gradient(135deg, #0F4C6C, #1B5E84);
//   color: #F4F6F8;
//   transition: 0.3s ease;
// }

// .school-name {
//   color: #ffffff;
// }

// .footer-text {
//   color: #E5E7EB;
// }

// .section-title {
//   color: #ffffff;
//   position: relative;
//   display: inline-block;
// }

// /* Golden underline accent */
// .section-title::after {
//   content: "";
//   width: 40px;
//   height: 3px;
//   background: #D4A24C;
//   display: block;
//   margin-top: 6px;
//   border-radius: 5px;
// }

// .footer-link {
//   color: #E5E7EB;
//   text-decoration: none;
//   transition: 0.3s ease;
// }

// .footer-link:hover {
//   color: #D4A24C;
//   padding-left: 6px;
// }

// .social-icon {
//   font-size: 20px;
//   cursor: pointer;
//   transition: 0.3s ease;
//   color: #E5E7EB;
// }

// .social-icon:hover {
//   color: #D4A24C;
//   transform: translateY(-4px) scale(1.1);
// }

// hr {
//   border-color: rgba(255,255,255,0.2);
// }

// .copyright {
//   color: #E5E7EB;
// }

// /* ================= DARK MODE ================= */

// body.dark-mode .footer-section {
//   background: linear-gradient(135deg, #0A2E42, #0F4C6C) !important;
// }

// body.dark-mode .footer-link:hover,
// body.dark-mode .social-icon:hover {
//   color: #D4A24C;
// }

// `}</style>
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
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 school-brand">
              <img src="/logo.jpeg" alt="School Logo" className="footer-logo" />

              <h5 className="fw-bold school-name m-0">
                Modern New Delhi Public School
              </h5>
            </div>
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
            <p className="mb-1"> Kakon, Ajjowal, Hoshiarpur, Punjab</p>
            <p className="mb-1"> Office: 01882-298792</p>
            <p className="mb-1"> Principal: 9855106665</p>
            <p className="mb-1"> President: 9855440343</p>
            <p className="mb-0"> mndps.hsp@gmail.com</p>
          </div>
        </div>

        <hr />

        <div className="text-center small copyright">
          © {new Date().getFullYear()} Modern New Delhi Public School. All
          Rights Reserved.
        </div>
      </div>

      <style>{`

/* ================= NEW PROFESSIONAL BLUE-GOLD THEME ================= */

.footer-section {
  background: linear-gradient(135deg, #0F4C6C, #1B5E84);
  color: #F4F6F8;
  transition: 0.3s ease;
}
/* FOOTER LOGO */

.footer-logo{
  width:50px;
  height:50px;
  object-fit:cover;
  border-radius:50%;
  margin-right:12px;
  border:2px solid #D4A24C;
}

/* BRAND ALIGN */

.school-brand{
  gap:10px;
}
.school-name {
  color: #ffffff;
}

.footer-text {
  color: #E5E7EB;
}

.section-title {
  color: #ffffff;
  position: relative;
  display: inline-block;
}

/* Golden underline accent */
.section-title::after {
  content: "";
  width: 40px;
  height: 3px;
  background: #D4A24C;
  display: block;
  margin-top: 6px;
  border-radius: 5px;
}

.footer-link {
  color: #E5E7EB;
  text-decoration: none;
  transition: 0.3s ease;
}

.footer-link:hover {
  color: #D4A24C;
  padding-left: 6px;
}

.social-icon {
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s ease;
  color: #E5E7EB;
}

.social-icon:hover {
  color: #D4A24C;
  transform: translateY(-4px) scale(1.1);
}

hr {
  border-color: rgba(255,255,255,0.2);
}

.copyright {
  color: #E5E7EB;
}

/* ================= DARK MODE ================= */

body.dark-mode .footer-section {
  background: linear-gradient(135deg, #0A2E42, #0F4C6C) !important;
}

body.dark-mode .footer-link:hover,
body.dark-mode .social-icon:hover {
  color: #D4A24C;
}

`}</style>
    </motion.footer>
  );
}

export default Footer;
