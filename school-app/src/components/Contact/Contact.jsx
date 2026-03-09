

import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";

function Contact() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const form = e.target;

    const first = form[0].value;
    const last = form[1].value;
    const email = form[2].value;
    const phone = form[3].value;
    const message = form[4].value;

    emailjs
      .send(
        "service_4zdyax9",
        "template_selcapa",
        {
          first_name: first,
          last_name: last,
          email: email,
          phone: phone,
          message: message,
        },
        "QFq-pDk16ard8gF4c",
      )
      .then(() => {
        setSuccess(true);
        setLoading(false);
        form.reset();

        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="contact-section">
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
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Last Name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control custom-input"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control custom-input"
                      rows="4"
                      placeholder="Write your message..."
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn submit-btn"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Submit Now"}
                    </button>
                  </div>

                  {success && (
                    <div className="success-message">
                      ✔ Message submitted successfully
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

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
                  <strong>Location:</strong> Hoshiarpur, Punjab
                </p>
                <p>
                  <strong>Office:</strong> 01882-298792
                </p>
                <p>
                  <strong>Principal:</strong> 9855106665
                </p>
                <p>
                  <strong>President:</strong> 9855440343
                </p>
                <p>
                  <strong>Email:</strong> mndps.hsp@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`

.contact-section{
background:#F4F6F8;
transition:0.3s ease;
}

.contact-hero{
height:220px;
background:linear-gradient(135deg,#0F4C6C,#1B5E84);
display:flex;
align-items:center;
justify-content:center;
}

.contact-hero-box{
background:rgba(255,255,255,0.08);
padding:30px 50px;
border-radius:14px;
text-align:center;
color:white;
backdrop-filter:blur(12px);
}

.section-heading{
color:#0F4C6C;
}

.section-text{
color:#4B5563;
}

.custom-input{
border-radius:12px;
padding:12px;
border:1px solid #E5E7EB;
}

.custom-input::placeholder{
color:#6B7280;
}

.custom-input:focus{
border-color:#D4A24C;
box-shadow:0 0 0 3px rgba(212,162,76,0.25);
}

.submit-btn{
background:linear-gradient(135deg,#0F4C6C,#1B5E84);
color:white;
padding:12px 32px;
border-radius:40px;
border:none;
font-weight:600;
}

.submit-btn:hover{
background:#D4A24C;
transform:translateY(-3px);
}

.success-message{
margin-top:15px;
padding:12px;
background:#22C55E;
color:white;
border-radius:10px;
text-align:center;
animation:fadeIn 0.4s ease;
}

@keyframes fadeIn{
from{opacity:0;transform:translateY(10px);}
to{opacity:1;transform:translateY(0);}
}

.contact-info-box{
background:white;
padding:25px;
border-radius:18px;
box-shadow:0 20px 50px rgba(15,76,108,0.12);
border-top:4px solid #D4A24C;
}

.contact-details p{
margin-bottom:10px;
color:#374151;
}

.map-container{
height:250px;
border-radius:15px;
overflow:hidden;
}

body.dark-mode .contact-section{
background:#0E1A24;
}

body.dark-mode .section-heading{
color:#D4A24C;
}

body.dark-mode .section-text{
color:#CBD5E1;
}

body.dark-mode .custom-input{
background:#0F172A;
border:1px solid #334155;
color:white;
}

body.dark-mode .custom-input::placeholder{
color:#CBD5E1;
}

body.dark-mode .contact-info-box{
background:#1B2A35;
color:white;
}

body.dark-mode .contact-details p{
color:#CBD5E1;
}

body.dark-mode .success-message{
background:#16A34A;
}

`}</style>
    </section>
  );
}

export default Contact;
