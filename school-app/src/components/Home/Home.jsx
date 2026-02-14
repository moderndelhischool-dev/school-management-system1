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
import { useEffect, useState } from "react";

const sliderImages = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
];

function Home() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sliderImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "80vh", // 🔥 Reduced section height
        background: "#ffffff",
        paddingTop: "40px", // 🔥 Reduced top space
        paddingBottom: "40px", // 🔥 Reduced bottom space
      }}
    >
      <div className="container text-center">
        {/* HEADING */}
        <h1 className="main-heading">
          This is your <span>learning,</span>
        </h1>

        <div className="row justify-content-center align-items-center mt-4">
          {/* LEFT CORNER */}
          <div className="col-md-2">
            <img src="/side1.jpg" className="corner-img img-hover" alt="" />
          </div>

          {/* LEFT SIDE */}
          <div className="col-md-2 left-side d-flex flex-column gap-4">
            <img src="/side2.jpg" className="side-img img-hover" alt="" />
            <img src="/side3.jpg" className="side-img img-hover" alt="" />
          </div>

          {/* CENTER SLIDER */}
          <div className="col-md-4 center-column">
            <div className="center-wrapper">
              <img
                src={sliderImages[index]}
                alt=""
                className="center-img img-hover"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-2 right-side d-flex flex-column gap-4">
            <img src="/side4.jpg" className="side-img img-hover" alt="" />
            <img src="/side5.jpg" className="side-img img-hover" alt="" />
          </div>

          {/* RIGHT CORNER */}
          <div className="col-md-2">
            <img src="/side6.jpg" className="corner-img img-hover" alt="" />
          </div>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .main-heading {
          font-size: 3rem;
          font-weight: 700;
          color: #2f7d32;
          margin-bottom: 20px;
        }

        .main-heading span {
          font-style: italic;
          font-weight: 500;
        }

        .corner-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 20px;
        }

        .side-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 18px;
        }

        .center-wrapper {
          overflow: hidden;
          border-radius: 30px;
        }

        .center-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          border-radius: 30px;
        }

        /* Hover Effect */
        .img-hover {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
        }

        .img-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        }

        /* Spacing */
        .left-side {
          padding-right: 25px;
        }

        .right-side {
          padding-left: 25px;
        }

        .center-column {
          padding-left: 15px;
          padding-right: 15px;
        }

        @media (max-width: 768px) {
          .main-heading { font-size: 2rem; }
          .center-img { height: 260px; }
        }
      `}</style>
    </section>
  );
}

export default Home;
