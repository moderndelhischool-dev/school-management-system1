// import { useState } from "react";

// function Home() {
//   const [showModal, setShowModal] = useState(false);
//   const [animate, setAnimate] = useState(false);

//   const handleApply = () => {
//     setShowModal(true);
//     setTimeout(() => setAnimate(true), 10);
//   };

//   const handleClose = () => {
//     setAnimate(false);
//     setTimeout(() => setShowModal(false), 300);
//   };

//   const handleContact = () => {
//     const section = document.getElementById("contact");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <section className="hero-section" id="home">
//         <div className="hero-content">
//           <p className="hero-subtitle">THE BEST SCHOOL OF THE STATE</p>

//           <h1 className="hero-title">
//             Transformative <br /> Education
//           </h1>

//           <p className="hero-description">
//             Modern New Delhi Public High School is committed to academic
//             excellence, character development, and building future leaders.
//           </p>

//           <div className="hero-buttons">
//             <button className="hero-btn-primary" onClick={handleApply}>
//               Apply Now
//             </button>

//             <button className="hero-btn-outline" onClick={handleContact}>
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </section>

//       {showModal && (
//         <div className={`modal-overlay ${animate ? "overlay-show" : ""}`}>
//           <div className={`admission-modal ${animate ? "modal-show" : ""}`}>
//             <h2>Admission Details</h2>

//             <form className="admission-form">
//               <div className="form-row">
//                 <input type="text" placeholder="Student Full Name" required />
//                 <input type="date" required />
//               </div>

//               <div className="form-row">
//                 <input type="text" placeholder="Father's Name" required />
//                 <input type="text" placeholder="Mother's Name" required />
//               </div>

//               <div className="form-row">
//                 <input type="email" placeholder="Email Address" required />
//                 <input type="tel" placeholder="Mobile Number" required />
//               </div>

//               <div className="form-row">
//                 <input type="text" placeholder="Class Applying For" required />
//                 <input type="text" placeholder="Previous School Name" />
//               </div>

//               <textarea placeholder="Full Address" rows="3"></textarea>

//               <div className="form-buttons">
//                 <button type="submit" className="submit-btn">
//                   Submit Application
//                 </button>
//                 <button
//                   type="button"
//                   className="close-btn"
//                   onClick={handleClose}
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <style>{`

// /* ================= HERO ================= */

// .hero-section {
//   position: relative;
//   height: 100vh;
//   width: 100%;
//   background: url("/img0.jpg") center center / cover no-repeat;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .hero-content {
//   max-width: 900px;
//   padding: 20px;
//   text-align: center;
//   color: white;
// }

// .hero-subtitle {
//   font-weight: 700;
//   letter-spacing: 2px;
//   margin-bottom: 20px;
//   text-transform: uppercase;
//   color: #D4A24C;
// }

// .hero-title {
//   font-size: 4rem;
//   font-weight: 900;
//   margin-bottom: 25px;
//   line-height: 1.2;
// }

// .hero-description {
//   font-size: 1.2rem;
//   margin-bottom: 35px;
//   color: #F4F6F8;
// }

// .hero-buttons {
//   display: flex;
//   gap: 20px;
//   justify-content: center;
//   flex-wrap: wrap;
// }

// /* PRIMARY BUTTON */
// .hero-btn-primary {
//   padding: 14px 34px;
//   border-radius: 50px;
//   border: none;
//   background: #D4A24C;
//   color: #0F4C6C;
//   font-weight: 700;
//   transition: 0.3s ease;
// }

// .hero-btn-primary:hover {
//   background: white;
//   color: #0F4C6C;
//   transform: translateY(-4px);
//   box-shadow: 0 12px 30px rgba(212,162,76,0.5);
// }

// /* OUTLINE BUTTON */
// .hero-btn-outline {
//   padding: 14px 34px;
//   border-radius: 50px;
//   border: 2px solid white;
//   background: transparent;
//   color: white;
//   font-weight: 700;
//   transition: 0.3s ease;
// }

// .hero-btn-outline:hover {
//   background: white;
//   color: #0F4C6C;
//   transform: translateY(-4px);
// }

// /* ================= MODAL ================= */

// .modal-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0,0,0,0);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   transition: background 0.3s ease;
// }

// .overlay-show {
//   background: rgba(0,0,0,0.7);
// }

// .admission-modal {
//   background: #ffffff;
//   width: 90%;
//   max-width: 750px;
//   padding: 40px;
//   border-radius: 20px;
//   box-shadow: 0 30px 70px rgba(15,76,108,0.3);
//   transform: scale(0.8);
//   opacity: 0;
//   transition: all 0.3s ease;
//   border-top: 6px solid #D4A24C;
// }

// .modal-show {
//   transform: scale(1);
//   opacity: 1;
// }

// .admission-modal h2 {
//   text-align: center;
//   margin-bottom: 25px;
//   color: #0F4C6C;
// }

// .admission-form input,
// .admission-form textarea {
//   width: 100%;
//   padding: 12px;
//   margin-bottom: 15px;
//   border-radius: 12px;
//   border: 1px solid #E5E7EB;
//   outline: none;
//   transition: 0.3s ease;
// }

// .admission-form input:focus,
// .admission-form textarea:focus {
//   border-color: #D4A24C;
//   box-shadow: 0 0 0 3px rgba(212,162,76,0.25);
// }

// .form-row {
//   display: flex;
//   gap: 15px;
// }

// .form-buttons {
//   display: flex;
//   justify-content: space-between;
// }

// .submit-btn {
//   background: linear-gradient(135deg,#0F4C6C,#1B5E84);
//   color: white;
//   border: none;
//   padding: 10px 25px;
//   border-radius: 50px;
//   font-weight: 600;
//   transition: 0.3s ease;
// }

// .submit-btn:hover {
//   background: #D4A24C;
//   color: #0F4C6C;
// }

// .close-btn {
//   background: #E5E7EB;
//   border: none;
//   padding: 10px 25px;
//   border-radius: 50px;
// }

// /* ================= DARK MODE ================= */

// body.dark-mode .hero-section {
//   background: url("/img0.jpg") center center / cover no-repeat;
// }

// body.dark-mode .admission-modal {
//   background: #1B2A35;
//   color: white;
// }

// body.dark-mode .admission-form input,
// body.dark-mode .admission-form textarea {
//   background: #0F172A;
//   border: 1px solid #334155;
//   color: white;
// }

// @media(max-width:768px){
//   .form-row{
//     flex-direction: column;
//   }

//   .hero-title{
//     font-size: 2.5rem;
//   }
// }

//       `}</style>
//     </>
//   );
// }

// export default Home;

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

  /* ===== WHATSAPP SUBMIT FUNCTION ===== */

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

    const whatsappURL = `https://wa.me/919910127966?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-content">
          <p className="hero-subtitle">THE BEST SCHOOL OF THE STATE</p>

          <h1 className="hero-title">
            Transformative <br /> Education
          </h1>

          <p className="hero-description">
            Modern New Delhi Public High School is committed to academic
            excellence, character development, and building future leaders.
          </p>

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

/* ================= HERO ================= */

.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  background: url("/img0.jpg") center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 900px;
  padding: 20px;
  text-align: center;
  color: white;
}

.hero-subtitle {
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: #D4A24C;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 25px;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 35px;
  color: #F4F6F8;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn-primary {
  padding: 14px 34px;
  border-radius: 50px;
  border: none;
  background: #D4A24C;
  color: #0F4C6C;
  font-weight: 700;
  transition: 0.3s ease;
}

.hero-btn-primary:hover {
  background: white;
  color: #0F4C6C;
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(212,162,76,0.5);
}

.hero-btn-outline {
  padding: 14px 34px;
  border-radius: 50px;
  border: 2px solid white;
  background: transparent;
  color: white;
  font-weight: 700;
  transition: 0.3s ease;
}

.hero-btn-outline:hover {
  background: white;
  color: #0F4C6C;
  transform: translateY(-4px);
}

/* ================= MODAL ================= */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: background 0.3s ease;
}

.overlay-show {
  background: rgba(0,0,0,0.7);
}

.admission-modal {
  background: #ffffff;
  width: 90%;
  max-width: 750px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 30px 70px rgba(15,76,108,0.3);
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.3s ease;
  border-top: 6px solid #D4A24C;
}

.modal-show {
  transform: scale(1);
  opacity: 1;
}

.admission-modal h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #0F4C6C;
}

.admission-form input,
.admission-form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  outline: none;
  transition: 0.3s ease;
}

.admission-form input:focus,
.admission-form textarea:focus {
  border-color: #D4A24C;
  box-shadow: 0 0 0 3px rgba(212,162,76,0.25);
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.submit-btn {
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 50px;
  font-weight: 600;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background: #D4A24C;
  color: #0F4C6C;
}

.close-btn {
  background: #E5E7EB;
  border: none;
  padding: 10px 25px;
  border-radius: 50px;
}

body.dark-mode .hero-section {
  background: url("/img0.jpg") center center / cover no-repeat;
}

body.dark-mode .admission-modal {
  background: #1B2A35;
  color: white;
}

body.dark-mode .admission-form input,
body.dark-mode .admission-form textarea {
  background: #0F172A;
  border: 1px solid #334155;
  color: white;
}

@media(max-width:768px){
  .form-row{
    flex-direction: column;
  }

  .hero-title{
    font-size: 2.5rem;
  }
}

`}</style>
    </>
  );
}

export default Home;
