import { useState } from "react";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleApply = () => {
    setShowModal(true);
    setTimeout(() => setAnimate(true), 10);
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setShowModal(false), 300);
  };

  const handleContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const student = form[0].value;
    const dob = form[1].value;
    const father = form[2].value;
    const mother = form[3].value;
    const email = form[4].value;
    const phone = form[5].value;
    const classApply = form[6].value;
    const school = form[7].value;
    const address = form[8].value;

    const message = `New Admission Application

Student Name: ${student}
DOB: ${dob}

Father Name: ${father}
Mother Name: ${mother}

Email: ${email}
Mobile: ${phone}

Class Applying: ${classApply}
Previous School: ${school}

Address: ${address}`;

    const whatsappURL = `https://wa.me/919910127966?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <section className="hero-section" id="home">
        <img src="/img0.jpg" className="hero-image" alt="school" />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          {/* <p className="hero-subtitle">THE BEST SCHOOL OF THE STATE</p> */}
          <p className="hero-subtitle">MODERN NEW DELHI PUBLIC HIGH SCHOOL</p>
          {/* <h1 className="hero-title">
            Transformative <br /> Education
          </h1> */}
          <h1 className="hero-title">
            Shaping Future <br /> <span>Leaders</span>
          </h1>

          <p className="hero-description">
            Modern New Delhi Public High School is committed to academic
            excellence, character development and building future leaders.{" "}
          </p>
          {/* <p className="hero-description">
            Providing quality education, strong values and holistic development
            to empower students for a successful future.
          </p> */}

          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={handleApply}>
              Apply Now
            </button>

            <button className="hero-btn-outline" onClick={handleContact}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className={`modal-overlay ${animate ? "overlay-show" : ""}`}>
          <div className={`admission-modal ${animate ? "modal-show" : ""}`}>
            <h2>Admission Details</h2>

            <form className="admission-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" placeholder="Student Full Name" required />

                <input type="date" required />
              </div>

              <div className="form-row">
                <input type="text" placeholder="Father's Name" required />

                <input type="text" placeholder="Mother's Name" required />
              </div>

              <div className="form-row">
                <input type="email" placeholder="Email Address" required />

                <input type="tel" placeholder="Mobile Number" required />
              </div>

              <div className="form-row">
                <input type="text" placeholder="Class Applying For" required />

                <input type="text" placeholder="Previous School Name" />
              </div>

              <textarea placeholder="Full Address" rows="3"></textarea>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>

                <button
                  type="button"
                  className="close-btn"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`

/* HERO */

.hero-section{
position:relative;
width:100%;
overflow:hidden;
}

/* IMAGE */

.hero-image{
width:100%;
display:block;
transform:translateY(-50px);
margin-bottom:-30px;
}

/* OVERLAY */

.hero-overlay{
position:absolute;
top:-50px;
left:0;
width:100%;
height:calc(100% + 28px);
background:rgba(0,0,0,0.45);
}

/* CONTENT */

.hero-content{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
text-align:center;
color:white;
max-width:900px;
padding:20px;
}

/* TEXT */

.hero-subtitle{
font-weight:700;
letter-spacing:2px;
margin-bottom:20px;
text-transform:uppercase;
color:#D4A24C;
}

.hero-title{
font-size:4rem;
font-weight:900;
margin-bottom:25px;
line-height:1.2;
}

.hero-description{
font-size:1.2rem;
margin-bottom:35px;
color:#F4F6F8;
}

/* BUTTONS */

.hero-buttons{
display:flex;
gap:20px;
justify-content:center;
flex-wrap:wrap;
}
.close-btn{
background:#E5E7EB;
border:none;
padding:10px 25px;
border-radius:50px;
font-weight:600;
cursor:pointer;
transition:0.3s ease;
}

.close-btn:hover{
background:#D4A24C;
color:#0F4C6C;
}
.hero-btn-primary{
padding:14px 34px;
border-radius:50px;
border:none;
background:#D4A24C;
color:#0F4C6C;
font-weight:700;
transition:0.3s ease;
}

.hero-btn-primary:hover{
background:white;
color:#0F4C6C;
transform:translateY(-4px);
box-shadow:0 12px 30px rgba(212,162,76,0.5);
}

.hero-btn-outline{
padding:14px 34px;
border-radius:50px;
border:2px solid white;
background:transparent;
color:white;
font-weight:700;
transition:0.3s ease;
}

.hero-btn-outline:hover{
background:white;
color:#0F4C6C;
transform:translateY(-4px);
}

/* MODAL */

.modal-overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0);
display:flex;
align-items:center;
justify-content:center;
z-index:1000;
transition:background 0.3s ease;
}

.overlay-show{
background:rgba(0,0,0,0.7);
}

.admission-modal{
background:#ffffff;
width:90%;
max-width:750px;
padding:40px;
border-radius:20px;
box-shadow:0 30px 70px rgba(15,76,108,0.3);
transform:scale(0.8);
opacity:0;
transition:all 0.3s ease;
border-top:6px solid #D4A24C;
}

.modal-show{
transform:scale(1);
opacity:1;
}

.admission-modal h2{
text-align:center;
margin-bottom:25px;
color:#0F4C6C;
}

.admission-form input,
.admission-form textarea{
width:100%;
padding:12px;
margin-bottom:15px;
border-radius:12px;
border:1px solid #E5E7EB;
outline:none;
transition:0.3s ease;
}

.admission-form input:focus,
.admission-form textarea:focus{
border-color:#D4A24C;
box-shadow:0 0 0 3px rgba(212,162,76,0.25);
}

.form-row{
display:flex;
gap:15px;
}

.form-buttons{
display:flex;
justify-content:space-between;
}

/* MOBILE */
@media(max-width:768px){

/* GLOBAL FIX */

html,body{
margin:0;
padding:0;
overflow-x:hidden;
}

/* HERO */

.hero-section{
position:relative;
width:100%;
height:100vh;
overflow:hidden;
}

/* IMAGE */

.hero-image{
position:absolute;
top:-30px;
left:20px;

width:110%;
height:110%;

object-fit:cover;
display:block;

/* center image */

left:50%;
transform:translateX(-50%);
}

/* OVERLAY */

.hero-overlay{
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.45);
}

/* CONTENT */

.hero-content{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:90%;
text-align:center;
}

/* TEXT */

.hero-title{
font-size:2.1rem;
line-height:1.3;
}

.hero-description{
font-size:1rem;
padding:0 10px;
}

/* BUTTONS */

.hero-buttons{
flex-direction:column;
gap:12px;
align-items:center;
}

.hero-btn-primary,
.hero-btn-outline{
width:220px;
}

/* FORM */

.form-row{
flex-direction:column;
gap:10px;
}

/* ===== APPLY FORM FIX ===== */

.modal-overlay{
padding:15px;
overflow-y:auto;
align-items:flex-start;
}

.admission-modal{
width:100%;
max-width:100%;
padding:25px;
margin-top:20px;
}

.admission-form input,
.admission-form textarea{
font-size:14px;
}

/* BUTTONS */

.form-buttons{
flex-direction:column;
gap:10px;
}

.submit-btn,
.close-btn{
width:100%;
}

}

`}</style>
    </>
  );
}

export default Home;
