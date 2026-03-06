// import React from "react";
// import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

// function SocialSidebar() {
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div
//         className="d-none d-md-block position-fixed top-50 translate-middle-y"
//         style={{ right: "0px", zIndex: 3000 }}
//       >
//         <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-3">
//           {/* WhatsApp */}
//           <li className="social-item">
//             <a
//               href="https://wa.me/919910127966"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-hover whatsapp"
//             >
//               <FaWhatsapp size={22} className="social-icon" />
//               <span className="social-text">WhatsApp</span>
//             </a>
//           </li>

//           {/* Facebook */}
//           <li className="social-item">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-hover facebook"
//             >
//               <FaFacebookF size={20} className="social-icon" />
//               <span className="social-text">Facebook</span>
//             </a>
//           </li>

//           {/* Instagram */}
//           <li className="social-item">
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-hover instagram"
//             >
//               <FaInstagram size={22} className="social-icon" />
//               <span className="social-text">Instagram</span>
//             </a>
//           </li>
//         </ul>
//       </div>

//       <style>
//         {`
//           .social-item {
//             display: flex;
//             justify-content: flex-end;
//           }

//           /* Default circle button */
//           .social-hover {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 12px;
//             width: 55px;
//             height: 55px;
//             border-radius: 50%;
//             color: #fff;
//             text-decoration: none;
//             transition: all 0.4s ease;
//             overflow: hidden;
//             position: relative;
//           }

//           .social-icon {
//             flex-shrink: 0;
//           }

//           .social-text {
//             opacity: 0;
//             white-space: nowrap;
//             transition: opacity 0.3s ease;
//             font-weight: 500;
//           }

//           /* Hover expand */
//           .social-hover:hover {
//             width: 180px;
//             border-radius: 30px 0 0 30px;
//             justify-content: flex-start;
//             padding-left: 20px;
//             box-shadow: 0 8px 20px rgba(0,0,0,0.25);
//           }

//           .social-hover:hover .social-text {
//             opacity: 1;
//           }

//           /* Brand Colors */
//           .whatsapp {
//             background: linear-gradient(135deg, #25D366, #128C7E);
//           }

//           .facebook {
//             background: linear-gradient(135deg, #1877F2, #0d47a1);
//           }

//           .instagram {
//             background: linear-gradient(135deg, #f09433, #dc2743, #bc1888);
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default SocialSidebar;
import React from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

function SocialSidebar() {
  return (
    <>
      <div
        className="d-none d-md-block position-fixed top-50 translate-middle-y"
        style={{ right: "0px", zIndex: 3000 }}
      >
        <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-3">
          <li className="social-item">
            <a
              href="https://wa.me/919910127966"
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover"
            >
              <FaWhatsapp size={22} className="social-icon" />
              <span className="social-text">WhatsApp</span>
            </a>
          </li>

          <li className="social-item">
            <a
              href="https://www.facebook.com/share/18MCmxDe1k/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover"
            >
              <FaFacebookF size={20} className="social-icon" />
              <span className="social-text">Facebook</span>
            </a>
          </li>

          <li className="social-item">
            <a
              href="https://www.instagram.com/mndps_officials?igsh=MWk3N2VqcWxxdjI4dQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover"
            >
              <FaInstagram size={22} className="social-icon" />
              <span className="social-text">Instagram</span>
            </a>
          </li>
        </ul>
      </div>

      <style>
        {`
          .social-item {
            display: flex;
            justify-content: flex-end;
          }

          /* Base Button */
          .social-hover {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(135deg,#0F4C6C,#1B5E84);
            color: white;
            text-decoration: none;
            transition: all 0.4s ease;
            overflow: hidden;
            position: relative;
          }

          .social-icon {
            flex-shrink: 0;
          }

          .social-text {
            opacity: 0;
            white-space: nowrap;
            transition: opacity 0.3s ease;
            font-weight: 500;
          }

          /* Hover Expand */
          .social-hover:hover {
            width: 180px;
            border-radius: 30px 0 0 30px;
            justify-content: flex-start;
            padding-left: 20px;
            background: linear-gradient(135deg,#D4A24C,#C18F2D);
            color: #0F4C6C;
            box-shadow: 0 12px 25px rgba(15,76,108,0.35);
          }

          .social-hover:hover .social-text {
            opacity: 1;
          }

          /* Dark Mode */
          body.dark-mode .social-hover {
            background: linear-gradient(135deg,#1B2A35,#0A2E42);
          }

          body.dark-mode .social-hover:hover {
            background: linear-gradient(135deg,#D4A24C,#C18F2D);
            color:#0F4C6C;
          }

        `}
      </style>
    </>
  );
}

export default SocialSidebar;
