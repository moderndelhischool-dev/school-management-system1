// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef, useEffect, useState } from "react";

// const sliderImages = [
//   "/img1.jpg",
//   "/img2.jpg",
//   "/img3.jpg",
//   "/img4.jpg",
//   "/img5.jpg",
// ];

// function Home() {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 70%", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
//   const borderRadius = useTransform(scrollYProgress, [0, 1], [30, 15]);

//   const [index, setIndex] = useState(0);

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % sliderImages.length);
//   };

//   const prevSlide = () => {
//     setIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       id="home"
//       ref={ref}
//       style={{
//         minHeight: "120vh",
//         background: "#ffffff",
//         paddingTop: "120px",
//         paddingBottom: "120px",
//       }}
//     >
//       <div className="container text-center">
//         {/* HEADING */}
//         <h1 className="main-heading">
//           This is your <span>learning,</span>
//         </h1>

//         <div className="row justify-content-center align-items-center mt-5">
//           {/* LEFT CORNER */}
//           <div className="col-md-2">
//             <img src="/side1.jpg" className="corner-img" alt="" />
//           </div>

//           {/* LEFT SIDE (2 vertical) */}
//           <div className="col-md-2 left-side d-flex flex-column gap-4">
//             <img src="/side2.jpg" className="side-img" alt="" />
//             <img src="/side3.jpg" className="side-img" alt="" />
//           </div>

//           {/* CENTER SLIDER */}
//           <div className="col-md-4 position-relative center-column">
//             <motion.div
//               style={{
//                 scale,
//                 borderRadius,
//                 overflow: "hidden",
//               }}
//             >
//               <motion.img
//                 key={index}
//                 src={sliderImages[index]}
//                 alt=""
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.8 }}
//                 className="center-img"
//               />
//             </motion.div>

//             <button className="arrow left" onClick={prevSlide}>
//               ❮
//             </button>
//             <button className="arrow right" onClick={nextSlide}>
//               ❯
//             </button>
//           </div>

//           {/* RIGHT SIDE (2 vertical) */}
//           <div className="col-md-2 right-side d-flex flex-column gap-4">
//             <img src="/side4.jpg" className="side-img" alt="" />
//             <img src="/side5.jpg" className="side-img" alt="" />
//           </div>

//           {/* RIGHT CORNER */}
//           <div className="col-md-2">
//             <img src="/side6.jpg" className="corner-img" alt="" />
//           </div>
//         </div>
//       </div>

//       {/* ================= STYLES ================= */}
//       <style>{`
//         .main-heading {
//           font-size: 3rem;
//           font-weight: 700;
//           color: #2f7d32;
//         }

//         .main-heading span {
//           font-style: italic;
//           font-weight: 500;
//         }

//         .corner-img {
//           width: 100%;
//           height: 200px;
//           object-fit: cover;
//           border-radius: 20px;
//         }

//         .side-img {
//           width: 100%;
//           height: 160px;
//           object-fit: cover;
//           border-radius: 18px;
//         }

//         .center-img {
//           width: 100%;
//           height: 380px;
//           object-fit: cover;
//           border-radius: 30px;
//         }

//         /* 🔥 IMPORTANT SPACING FIX */
//         .left-side {
//           padding-right: 25px;
//         }

//         .right-side {
//           padding-left: 25px;
//         }

//         .center-column {
//           padding-left: 15px;
//           padding-right: 15px;
//         }

//         .arrow {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           background: rgba(0,0,0,0.5);
//           border: none;
//           color: white;
//           font-size: 20px;
//           padding: 8px 12px;
//           border-radius: 50%;
//           cursor: pointer;
//         }

//         .left { left: -40px; }
//         .right { right: -40px; }

//         @media (max-width: 992px) {
//           .row > div {
//             margin-bottom: 20px;
//           }
//         }

//         @media (max-width: 768px) {
//           .main-heading { font-size: 2rem; }
//           .center-img { height: 260px; }
//           .left { left: 10px; }
//           .right { right: 10px; }
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Home;
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/register");
  };

  const handleContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="home">
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
            <button
              className="btn btn-success hero-btn-green"
              onClick={handleApply}
            >
              Apply Now
            </button>

            <button
              className="btn btn-light hero-btn-white"
              onClick={handleContact}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100%;
          background: url("/img0.jpg") center center / cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
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
          color: #22c55e;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero-description {
          font-size: 1.1rem;
          color: #e5e5e5;
          margin-bottom: 30px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-btn-green {
          padding: 12px 30px;
          font-weight: 600;
          border-radius: 50px;
          background-color: #22c55e;
          border: none;
        }

        .hero-btn-green:hover {
          background-color: #16a34a;
        }

        .hero-btn-white {
          padding: 12px 30px;
          font-weight: 600;
          border-radius: 50px;
        }

        .hero-btn-white:hover {
          background-color: #f1f1f1;
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.3rem;
          }

          .hero-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Home;
