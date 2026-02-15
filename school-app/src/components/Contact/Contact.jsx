// import { motion } from "framer-motion";

// function Contact() {
//   return (
//     <section id="contact" className="contact-section py-5">
//       <div className="container">
//         <motion.h2
//           className="fw-bold text-center mb-3"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Contact Us
//         </motion.h2>

//         <p className="text-center text-muted mb-5">
//           Have questions? Get in touch with our school team.
//         </p>

//         <div className="row g-4 align-items-stretch">
//           {/* CONTACT FORM */}
//           <div className="col-lg-6">
//             <motion.div
//               className="card contact-card shadow"
//               initial={{ opacity: 0, x: -60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="card-body p-4">
//                 <div className="mb-3">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control custom-input"
//                     placeholder="Enter your name"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control custom-input"
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Message</label>
//                   <textarea
//                     className="form-control custom-input"
//                     rows="4"
//                     placeholder="Write your message"
//                   ></textarea>
//                 </div>

//                 <button className="btn btn-primary w-100 send-btn">
//                   Send Message
//                 </button>
//               </div>
//             </motion.div>
//           </div>

//           {/* GOOGLE MAP */}
//           <div className="col-lg-6">
//             <motion.div
//               className="map-container shadow"
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <iframe
//                 title="School Location"
//                 src="https://www.google.com/maps?q=Hoshiarpur%20Punjab&output=embed"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//               ></iframe>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ===== STYLES ===== */}
//       <style>{`
//         .contact-section {
//           background: #f8f9fa;
//         }

//         .contact-card {
//           border-radius: 20px;
//           transition: 0.3s ease;
//         }

//         .contact-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.15);
//         }

//         .custom-input {
//           border-radius: 12px;
//           transition: 0.3s ease;
//         }

//         .custom-input:focus {
//           border-color: #0d6efd;
//           box-shadow: 0 0 10px rgba(13,110,253,0.3);
//         }

//         .send-btn {
//           border-radius: 12px;
//           transition: 0.3s ease;
//         }

//         .send-btn:hover {
//           transform: scale(1.03);
//         }

//         .map-container {
//           height: 100%;
//           min-height: 420px;
//           border-radius: 20px;
//           overflow: hidden;
//           transition: 0.3s ease;
//         }

//         .map-container:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.15);
//         }

//         @media (max-width: 992px) {
//           .map-container {
//             min-height: 350px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Contact;
import { motion } from "framer-motion";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      {/* TOP HERO STRIP */}
      <div className="contact-hero">
        <div className="contact-hero-box">
          <h2>Contact Us</h2>
          <p>
            Modern New Delhi Public High School is here to assist you. Reach out
            and our team will respond shortly.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5 align-items-start">
          {/* LEFT CONTENT */}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-3">We’d Love To Hear From You</h4>
            <p className="text-muted mb-4">
              For admissions, general inquiries, or academic information, please
              fill out the form below and our team will contact you.
            </p>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="First Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Last Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Email"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Phone"
                  />
                </div>

                <div className="col-12">
                  <textarea
                    className="form-control custom-input"
                    rows="4"
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <div className="col-12">
                  <button className="btn submit-btn">Submit Now</button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE MAP + INFO */}
          <div className="col-lg-5">
            <motion.div
              className="contact-info-box"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="map-container mb-4">
                <iframe
                  title="School Location"
                  src="https://www.google.com/maps?q=Hoshiarpur%20Punjab&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div className="contact-details">
                <p>
                  <strong>📍 Location:</strong> Hoshiarpur, Punjab
                </p>
                <p>
                  <strong>📞 Phone:</strong> +91 98765 43210
                </p>
                <p>
                  <strong>📧 Email:</strong> school@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        .contact-section {
          background: #f8f9fa;
        }

        /* HERO STRIP */
        .contact-hero {
          height: 220px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-hero-box {
          background: rgba(255,255,255,0.1);
          padding: 30px 50px;
          border-radius: 12px;
          text-align: center;
          color: white;
          backdrop-filter: blur(10px);
        }

        .contact-hero-box h2 {
          font-weight: 700;
          margin-bottom: 10px;
        }

        /* INPUTS */
        .custom-input {
          border-radius: 10px;
          padding: 12px;
          transition: 0.3s ease;
        }

        .custom-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.4);
        }

        .submit-btn {
          background: #22c55e;
          color: white;
          padding: 10px 30px;
          border-radius: 30px;
          border: none;
          transition: 0.3s ease;
        }

        .submit-btn:hover {
          background: #16a34a;
          transform: translateY(-2px);
        }

        /* MAP */
        .map-container {
          height: 250px;
          border-radius: 15px;
          overflow: hidden;
        }

        .contact-info-box {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .contact-details p {
          margin-bottom: 8px;
        }

        /* DARK MODE */
        body.dark-mode .contact-section {
          background: #121212;
        }

        body.dark-mode .contact-info-box {
          background: #1e1e1e;
          color: white;
        }

        body.dark-mode .custom-input {
          background: #2c2c2c;
          color: white;
          border: 1px solid #444;
        }

        body.dark-mode .custom-input::placeholder {
          color: #aaa;
        }

        @media (max-width: 992px) {
          .contact-hero {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;
