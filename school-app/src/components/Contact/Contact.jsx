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
                  <strong> Location:</strong> Hoshiarpur, Punjab
                </p>
                <p>
                  <strong>Office:</strong> 01882-298792
                </p>
                <p>
                  <strong> Principal:</strong> 9855106665
                </p>
                <p>
                  <strong> President:</strong> 9855440343
                </p>
                <p>
                  <strong> Email:</strong> mndps.hsp@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`

/* ================= PROFESSIONAL BLUE-GOLD THEME ================= */

.contact-section {
  background: #F4F6F8;
  transition: 0.3s ease;
}

/* HERO */
.contact-hero {
  height: 220px;
  background: linear-gradient(135deg, #0F4C6C, #1B5E84);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-hero-box {
  background: rgba(255,255,255,0.08);
  padding: 30px 50px;
  border-radius: 14px;
  text-align: center;
  color: white;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
}

/* LEFT SIDE */
.section-heading {
  color: #0F4C6C;
}

.section-text {
  color: #4B5563;
}

/* INPUTS */
.custom-input {
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #E5E7EB;
  transition: 0.3s ease;
}

.custom-input:focus {
  border-color: #D4A24C;
  box-shadow: 0 0 0 3px rgba(212,162,76,0.25);
}

/* BUTTON */
.submit-btn {
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  padding: 12px 32px;
  border-radius: 40px;
  border: none;
  font-weight: 600;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background: #D4A24C;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(212,162,76,0.4);
}

/* INFO BOX */
.contact-info-box {
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(15,76,108,0.12);
  border-top: 4px solid #D4A24C;
}

.contact-details p {
  margin-bottom: 10px;
  color: #374151;
}

/* MAP */
.map-container {
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
}

/* ================= DARK MODE ================= */

body.dark-mode .contact-section {
  background: #0E1A24;
}

body.dark-mode .contact-hero {
  background: linear-gradient(135deg, #0A2E42, #0F4C6C);
}

body.dark-mode .section-heading {
  color: #D4A24C;
}

body.dark-mode .section-text {
  color: #CBD5E1;
}

body.dark-mode .contact-info-box {
  background: #1B2A35;
  color: white;
  box-shadow: 0 25px 60px rgba(0,0,0,0.6);
}

body.dark-mode .custom-input {
  background: #0F172A;
  border: 1px solid #334155;
  color: white;
}

body.dark-mode .custom-input::placeholder {
  color: #94A3B8;
}

body.dark-mode .submit-btn:hover {
  background: #D4A24C;
  color: #0F172A;
}

`}</style>
    </section>
  );
}

export default Contact;
