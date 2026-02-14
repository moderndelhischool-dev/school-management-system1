// function Contact() {
//   return (
//     <section id="contact" className="p-5">
//       <div className="container">
//         <h2 className="fw-bold text-center mb-4">Contact Us</h2>

//         <p className="text-center text-muted mb-5">
//           Have questions? Get in touch with our school team.
//         </p>

//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="card shadow-sm p-4">
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Message</label>
//                 <textarea
//                   className="form-control"
//                   rows="4"
//                   placeholder="Write your message"
//                 ></textarea>
//               </div>

//               <button className="btn btn-primary w-100">Send Message</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Contact;
import { motion } from "framer-motion";

function Contact() {
  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        <motion.h2
          className="fw-bold text-center mb-3"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <p className="text-center text-muted mb-5">
          Have questions? Get in touch with our school team.
        </p>

        <div className="row g-4 align-items-stretch">
          {/* CONTACT FORM */}
          <div className="col-lg-6">
            <motion.div
              className="card contact-card shadow"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control custom-input"
                    rows="4"
                    placeholder="Write your message"
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100 send-btn">
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>

          {/* GOOGLE MAP */}
          <div className="col-lg-6">
            <motion.div
              className="map-container shadow"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                title="School Location"
                src="https://www.google.com/maps?q=Hoshiarpur%20Punjab&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        .contact-section {
          background: #f8f9fa;
        }

        .contact-card {
          border-radius: 20px;
          transition: 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .custom-input {
          border-radius: 12px;
          transition: 0.3s ease;
        }

        .custom-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 10px rgba(13,110,253,0.3);
        }

        .send-btn {
          border-radius: 12px;
          transition: 0.3s ease;
        }

        .send-btn:hover {
          transform: scale(1.03);
        }

        .map-container {
          height: 100%;
          min-height: 420px;
          border-radius: 20px;
          overflow: hidden;
          transition: 0.3s ease;
        }

        .map-container:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        @media (max-width: 992px) {
          .map-container {
            min-height: 350px;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;
