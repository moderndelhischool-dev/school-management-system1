// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   const handleApply = () => {
//     navigate("/register");
//   };

//   const handleContact = () => {
//     const section = document.getElementById("contact");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="hero-section" id="home">
//       <div className="hero-overlay">
//         <div className="hero-content text-center">
//           <p className="hero-subtitle">The Best School of The State</p>

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
//       </div>

//       <style>{`

//         .hero-section {
//           position: relative;
//           height: 100vh;
//           width: 100%;
//           background: url("/img0.jpg") center center / cover no-repeat;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         /* Light overlay only for readability */
//         .hero-overlay {
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.45);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .hero-content {
//           max-width: 900px;
//           padding: 20px;
//           color: white;
//         }

//         .hero-subtitle {
//           color: #c4b5fd;
//           font-weight: 600;
//           letter-spacing: 1px;
//           margin-bottom: 15px;
//           text-transform: uppercase;
//         }

//         .hero-title {
//           font-size: 4rem;
//           font-weight: 800;
//           line-height: 1.2;
//           margin-bottom: 20px;
//         }

//         .hero-description {
//           font-size: 1.1rem;
//           color: #f3f4f6;
//           margin-bottom: 30px;
//         }

//         .hero-buttons {
//           display: flex;
//           gap: 20px;
//           justify-content: center;
//           flex-wrap: wrap;
//         }

//         /* Purple primary button */
//         .hero-btn-primary {
//           padding: 12px 32px;
//           font-weight: 600;
//           border-radius: 50px;
//           background: #5b21b6;
//           border: none;
//           color: white;
//           transition: 0.3s ease;
//         }

//         .hero-btn-primary:hover {
//           background: #7c3aed;
//           transform: translateY(-3px);
//           box-shadow: 0 10px 25px rgba(124,58,237,0.4);
//         }

//         /* Outline button */
//         .hero-btn-outline {
//           padding: 12px 32px;
//           font-weight: 600;
//           border-radius: 50px;
//           background: transparent;
//           border: 2px solid #c4b5fd;
//           color: white;
//           transition: 0.3s ease;
//         }

//         .hero-btn-outline:hover {
//           background: rgba(255,255,255,0.15);
//           transform: translateY(-3px);
//         }

//         @media (max-width: 992px) {
//           .hero-title {
//             font-size: 3rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .hero-title {
//             font-size: 2.3rem;
//           }

//           .hero-description {
//             font-size: 1rem;
//           }
//         }

//       `}</style>
//     </section>
//   );
// }

// export default Home;
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
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

  return (
    <>
      <section
        className={`hero-section ${showModal ? "blur-bg" : ""}`}
        id="home"
      >
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <p className="hero-subtitle">The Best School of The State</p>

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
        </div>
      </section>

      {showModal && (
        <div className={`modal-overlay ${animate ? "overlay-show" : ""}`}>
          <div className={`admission-modal ${animate ? "modal-show" : ""}`}>
            <h2>Admission Details</h2>

            <form className="admission-form">
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

        /* ORIGINAL HERO CSS SAME */
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100%;
          background: url("/img0.jpg") center center / cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: filter 0.3s ease;
        }

        .blur-bg {
          filter: blur(6px);
        }

        .hero-overlay {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          max-width: 900px;
          padding: 20px;
          color: white;
        }

        .hero-subtitle {
          color: #c4b5fd;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero-description {
          font-size: 1.1rem;
          color: #f3f4f6;
          margin-bottom: 30px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          padding: 12px 32px;
          font-weight: 600;
          border-radius: 50px;
          background: #5b21b6;
          border: none;
          color: white;
          transition: 0.3s ease;
        }

        .hero-btn-primary:hover {
          background: #7c3aed;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(124,58,237,0.4);
        }

        .hero-btn-outline {
          padding: 12px 32px;
          font-weight: 600;
          border-radius: 50px;
          background: transparent;
          border: 2px solid #c4b5fd;
          color: white;
          transition: 0.3s ease;
        }

        .hero-btn-outline:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-3px);
        }

        /* MODAL OVERLAY */
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
          background: rgba(0,0,0,0.6);
        }

        /* MODAL BOX */
        .admission-modal {
          background: white;
          width: 90%;
          max-width: 750px;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transform: scale(0.8);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .modal-show {
          transform: scale(1);
          opacity: 1;
        }

        .admission-modal h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #5b21b6;
        }

        .admission-form input,
        .admission-form textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
          transition: 0.3s;
        }

        .admission-form input:focus,
        .admission-form textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 10px rgba(124,58,237,0.3);
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
          background: #5b21b6;
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 50px;
          transition: 0.3s;
        }

        .submit-btn:hover {
          background: #7c3aed;
        }

        .close-btn {
          background: #e5e7eb;
          border: none;
          padding: 10px 25px;
          border-radius: 50px;
        }

        @media(max-width:768px){
          .form-row{
            flex-direction: column;
          }
        }

      `}</style>
    </>
  );
}

export default Home;
