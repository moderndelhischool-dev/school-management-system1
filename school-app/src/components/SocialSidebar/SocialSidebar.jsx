// import React from "react";
// import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

// function SocialSidebar() {
//   return (
//     <>
//       <div
//         className="d-none d-md-block position-fixed top-50 translate-middle-y"
//         style={{ right: "0px", zIndex: 3000 }}
//       >
//         <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-3">
//           <li className="social-item">
//             <a
//               href="https://wa.me/919910127966"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-hover"
//             >
//               <FaWhatsapp size={22} className="social-icon" />
//               <span className="social-text">WhatsApp</span>
//             </a>
//           </li>

//           <li className="social-item">
//             <a
//               href="https://www.facebook.com/share/18MCmxDe1k/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-hover"
//             >
//               <FaFacebookF size={20} className="social-icon" />
//               <span className="social-text">Facebook</span>
//             </a>
//           </li>

//           <li className="social-item">
//             <a
//               href="https://www.instagram.com/mndps_officials?igsh=MWk3N2VqcWxxdjI4dQ=="
//               target="_blank"
//               rel="noopener noreferrer"
//               className="social-hover"
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

//           /* Base Button */
//           .social-hover {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 12px;
//             width: 55px;
//             height: 55px;
//             border-radius: 50%;
//             background: linear-gradient(135deg,#0F4C6C,#1B5E84);
//             color: white;
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

//           /* Hover Expand */
//           .social-hover:hover {
//             width: 180px;
//             border-radius: 30px 0 0 30px;
//             justify-content: flex-start;
//             padding-left: 20px;
//             background: linear-gradient(135deg,#D4A24C,#C18F2D);
//             color: #0F4C6C;
//             box-shadow: 0 12px 25px rgba(15,76,108,0.35);
//           }

//           .social-hover:hover .social-text {
//             opacity: 1;
//           }

//           /* Dark Mode */
//           body.dark-mode .social-hover {
//             background: linear-gradient(135deg,#1B2A35,#0A2E42);
//           }

//           body.dark-mode .social-hover:hover {
//             background: linear-gradient(135deg,#D4A24C,#C18F2D);
//             color:#0F4C6C;
//           }

//         `}
//       </style>
//     </>
//   );
// }

// export default SocialSidebar;
import React from "react";

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
              <img src="/whatsapp.png" alt="WhatsApp" className="social-icon" />
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
              <img src="/facebook.png" alt="Facebook" className="social-icon" />
              <span className="social-text">Facebook</span>
            </a>
          </li>

          <li className="social-item">
            <a
              href="https://www.instagram.com/mndps_officials"
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover"
            >
              <img
                src="/instagram.png"
                alt="Instagram"
                className="social-icon"
              />
              <span className="social-text">Instagram</span>
            </a>
          </li>
        </ul>
      </div>

      <style>{`

.social-item{
display:flex;
justify-content:flex-end;
}

/* BUTTON */

.social-hover{
display:flex;
align-items:center;
gap:12px;

padding:8px;

text-decoration:none;

transition:all .4s ease;

overflow:hidden;

justify-content:flex-end;
}

/* ICON */

.social-icon{
width:30px;
height:30px;
object-fit:contain;
}

/* TEXT */

.social-text{
opacity:0;
white-space:nowrap;
transition:opacity .3s ease;
font-weight:500;
color:#0F4C6C;
}

/* HOVER EXPAND */

.social-hover:hover{
background:linear-gradient(135deg,#D4A24C,#C18F2D);
border-radius:30px 0 0 30px;
padding:10px 20px;
gap:10px;
}

.social-hover:hover .social-text{
opacity:1;
}

`}</style>
    </>
  );
}

export default SocialSidebar;
