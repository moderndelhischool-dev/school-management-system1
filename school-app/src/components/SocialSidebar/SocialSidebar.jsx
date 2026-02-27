import React from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

function SocialSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-block position-fixed top-50 translate-middle-y"
        style={{ right: "0px", zIndex: 3000 }}
      >
        <ul className="list-unstyled m-0 p-0 d-flex flex-column gap-3">
          {/* WhatsApp */}
          <li className="social-item">
            <a
              href="https://wa.me/919910127966"
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover whatsapp"
            >
              <FaWhatsapp size={22} className="social-icon" />
              <span className="social-text">WhatsApp</span>
            </a>
          </li>

          {/* Facebook */}
          <li className="social-item">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover facebook"
            >
              <FaFacebookF size={20} className="social-icon" />
              <span className="social-text">Facebook</span>
            </a>
          </li>

          {/* Instagram */}
          <li className="social-item">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-hover instagram"
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

          /* Default circle button */
          .social-hover {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            color: #fff;
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

          /* Hover expand */
          .social-hover:hover {
            width: 180px;
            border-radius: 30px 0 0 30px;
            justify-content: flex-start;
            padding-left: 20px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          }

          .social-hover:hover .social-text {
            opacity: 1;
          }

          /* Brand Colors */
          .whatsapp {
            background: linear-gradient(135deg, #25D366, #128C7E);
          }

          .facebook {
            background: linear-gradient(135deg, #1877F2, #0d47a1);
          }

          .instagram {
            background: linear-gradient(135deg, #f09433, #dc2743, #bc1888);
          }
        `}
      </style>
    </>
  );
}

export default SocialSidebar;
