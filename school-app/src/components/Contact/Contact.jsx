// import { motion } from "framer-motion";

// function Contact() {
//   return (
//     <section id="contact" className="contact-section">
//       {/* TOP HERO STRIP */}
//       <div className="contact-hero">
//         <div className="contact-hero-box">
//           <h2>Contact Us</h2>
//           <p>
//             Modern New Delhi Public High School is here to assist you. Reach out
//             and our team will respond shortly.
//           </p>
//         </div>
//       </div>

//       <div className="container py-5">
//         <div className="row g-5 align-items-start">
//           {/* LEFT CONTENT */}
//           <div className="col-lg-7">
//             <h4 className="fw-bold mb-3">We’d Love To Hear From You</h4>
//             <p className="text-muted mb-4">
//               For admissions, general inquiries, or academic information, please
//               fill out the form below and our team will contact you.
//             </p>

//             <motion.div
//               initial={{ opacity: 0, x: -60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control custom-input"
//                     placeholder="First Name"
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control custom-input"
//                     placeholder="Last Name"
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="email"
//                     className="form-control custom-input"
//                     placeholder="Email"
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <input
//                     type="text"
//                     className="form-control custom-input"
//                     placeholder="Phone"
//                   />
//                 </div>

//                 <div className="col-12">
//                   <textarea
//                     className="form-control custom-input"
//                     rows="4"
//                     placeholder="Write your message..."
//                   ></textarea>
//                 </div>

//                 <div className="col-12">
//                   <button className="btn submit-btn">Submit Now</button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT SIDE MAP + INFO */}
//           <div className="col-lg-5">
//             <motion.div
//               className="contact-info-box"
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="map-container mb-4">
//                 <iframe
//                   title="School Location"
//                   src="https://www.google.com/maps?q=Hoshiarpur%20Punjab&output=embed"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                 ></iframe>
//               </div>

//               <div className="contact-details">
//                 <p>
//                   <strong>📍 Location:</strong> Hoshiarpur, Punjab
//                 </p>
//                 <p>
//                   <strong>📞 Phone:</strong> +91 98765 43210
//                 </p>
//                 <p>
//                   <strong>📧 Email:</strong> school@gmail.com
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ===== STYLES ===== */}
//       <style>{`
//         .contact-section {
//           background: #f8f9fa;
//         }

//         /* HERO STRIP */
//         .contact-hero {
//           height: 220px;
//           background: linear-gradient(135deg, #22c55e, #16a34a);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .contact-hero-box {
//           background: rgba(255,255,255,0.1);
//           padding: 30px 50px;
//           border-radius: 12px;
//           text-align: center;
//           color: white;
//           backdrop-filter: blur(10px);
//         }

//         .contact-hero-box h2 {
//           font-weight: 700;
//           margin-bottom: 10px;
//         }

//         /* INPUTS */
//         .custom-input {
//           border-radius: 10px;
//           padding: 12px;
//           transition: 0.3s ease;
//         }

//         .custom-input:focus {
//           border-color: #22c55e;
//           box-shadow: 0 0 8px rgba(34,197,94,0.4);
//         }

//         .submit-btn {
//           background: #22c55e;
//           color: white;
//           padding: 10px 30px;
//           border-radius: 30px;
//           border: none;
//           transition: 0.3s ease;
//         }

//         .submit-btn:hover {
//           background: #16a34a;
//           transform: translateY(-2px);
//         }

//         /* MAP */
//         .map-container {
//           height: 250px;
//           border-radius: 15px;
//           overflow: hidden;
//         }

//         .contact-info-box {
//           background: white;
//           padding: 20px;
//           border-radius: 15px;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.08);
//         }

//         .contact-details p {
//           margin-bottom: 8px;
//         }

//         /* DARK MODE */
//         body.dark-mode .contact-section {
//           background: #121212;
//         }

//         body.dark-mode .contact-info-box {
//           background: #1e1e1e;
//           color: white;
//         }

//         body.dark-mode .custom-input {
//           background: #2c2c2c;
//           color: white;
//           border: 1px solid #444;
//         }

//         body.dark-mode .custom-input::placeholder {
//           color: #aaa;
//         }

//         @media (max-width: 992px) {
//           .contact-hero {
//             height: 180px;
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
      {/* HERO STRIP */}
      <div className="contact-hero">
        <div className="contact-hero-box">
          <h2>Contact Us</h2>
          <p>
            Modern New Delhi Public School is here to assist you. Feel free to
            connect with us for admissions and inquiries.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5 align-items-start">
          {/* LEFT FORM */}
          <div className="col-lg-7">
            <h4 className="fw-bold mb-3 section-heading">
              We’d Love To Hear From You
            </h4>

            <p className="section-text mb-4">
              For admissions, academic details, or general queries, please fill
              out the form below and our team will contact you shortly.
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
                    placeholder="Phone Number"
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

          {/* RIGHT SIDE INFO */}
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
                  <strong>☎ Office:</strong> 01882-298792
                </p>
                <p>
                  <strong>👨‍🏫 Principal:</strong> 9855106665
                </p>
                <p>
                  <strong>🏫 President:</strong> 9855440343
                </p>
                <p>
                  <strong>📧 Email:</strong> mndps.hsp@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`

        /* SECTION BACKGROUND */
        .contact-section {
          background: #f3f0ff;
          transition: 0.3s ease;
        }

        /* HERO */
        .contact-hero {
          height: 220px;
          background: linear-gradient(135deg, #4c1d95, #5b21b6);
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

        .section-heading {
          color: #4c1d95;
        }

        .section-text {
          color: #6b7280;
        }

        /* INPUTS */
        .custom-input {
          border-radius: 10px;
          padding: 12px;
          border: 1px solid #ddd6fe;
          transition: 0.3s ease;
        }

        .custom-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 8px rgba(124,58,237,0.4);
        }

        /* BUTTON */
        .submit-btn {
          background: linear-gradient(135deg,#4c1d95,#5b21b6);
          color: white;
          padding: 10px 30px;
          border-radius: 30px;
          border: none;
          transition: 0.3s ease;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg,#5b21b6,#7c3aed);
          transform: translateY(-2px);
        }

        /* INFO BOX */
        .contact-info-box {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .contact-details p {
          margin-bottom: 10px;
        }

        /* MAP */
        .map-container {
          height: 250px;
          border-radius: 15px;
          overflow: hidden;
        }

        /* DARK MODE */
        body.dark-mode .contact-section {
          background: #1e1b4b;
        }

        body.dark-mode .contact-info-box {
          background: #312e81;
          color: white;
        }

        body.dark-mode .section-heading {
          color: #c4b5fd;
        }

      `}</style>
    </section>
  );
}

export default Contact;
