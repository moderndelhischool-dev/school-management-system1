// import { useEffect, useState } from "react";

// function About() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [expanded, setExpanded] = useState(false);

//   const slides = [
//     {
//       img: "/about1.jpg",
//       subtitle: "CAMPUS INFORMATION",
//       title: "Where Knowledge Meets Innovation",
//       shortText: "Committed to academic excellence and holistic development.",
//       fullText:
//         "Modern New Delhi Public High School focuses on innovation, discipline, leadership, and moral values to prepare students for a bright future.",
//     },
//     {
//       img: "/about2.jpg",
//       subtitle: "SMART LEARNING",
//       title: "Interactive Smart Classrooms",
//       shortText: "Digital classrooms enhancing modern education.",
//       fullText:
//         "Our smart classrooms integrate technology with learning, making lessons engaging and interactive.",
//     },
//     {
//       img: "/about3.jpg",
//       subtitle: "SPORTS & ACTIVITIES",
//       title: "Building Strong Leaders",
//       shortText: "Encouraging teamwork and leadership.",
//       fullText:
//         "We provide sports and cultural activities that build confidence, discipline, and team spirit.",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % slides.length);
//       setExpanded(false);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="about-section">
//       <div className="about-header text-center">
//         <h2>About Our School</h2>
//         <p>
//           Modern New Delhi Public High School nurtures excellence and
//           innovation.
//         </p>
//       </div>

//       <div className="container">
//         <div className="about-wrapper">
//           {/* Image */}
//           <div className="image-box">
//             <img
//               key={activeIndex}
//               src={slides[activeIndex].img}
//               alt="about"
//               className="fade-img"
//             />
//           </div>

//           {/* Content */}
//           <div className="content-box">
//             <span>{slides[activeIndex].subtitle}</span>
//             <h3>{slides[activeIndex].title}</h3>

//             <p>
//               {slides[activeIndex].shortText}
//               {expanded && (
//                 <span className="extra-text">
//                   {" " + slides[activeIndex].fullText}
//                 </span>
//               )}
//             </p>

//             <button
//               className="learn-btn"
//               onClick={() => setExpanded(!expanded)}
//             >
//               {expanded ? "Show Less" : "Read More"}
//             </button>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="pagination-box">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               className={`page-btn ${activeIndex === index ? "active" : ""}`}
//               onClick={() => {
//                 setActiveIndex(index);
//                 setExpanded(false);
//               }}
//             >
//               {String(index + 1).padStart(2, "0")}
//             </button>
//           ))}
//         </div>
//       </div>

//       <style>{`

// .about-section {
//   padding: 80px 0;
//   background: #f5f3ff;
// }

// /* Header */
// .about-header h2 {
//   font-size: 36px;
//   font-weight: 700;
//   color: #4c1d95;
// }

// .about-header p {
//   color: #6b7280;
//   margin-top: 10px;
// }

// /* Wrapper */
// .about-wrapper {
//   position: relative;
//   display: flex;
//   align-items: center;
//   margin-top: 60px;
// }

// /* Image */
// .image-box {
//   flex: 1;
//   border-radius: 20px;
//   overflow: hidden;
//   box-shadow: 0 25px 60px rgba(76,29,149,0.25);
// }

// .image-box img {
//   width: 100%;
//   height: 450px;
//   object-fit: cover;
//   transition: opacity 0.8s ease-in-out;
// }

// .fade-img {
//   animation: fadeIn 0.8s ease;
// }

// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }

// /* Content */
// .content-box {
//   position: absolute;
//   right: 0;
//   background: #ffffff;
//   padding: 50px;
//   width: 45%;
//   border-radius: 20px;
//   box-shadow: 0 20px 50px rgba(76,29,149,0.15);
// }

// .content-box span {
//   font-size: 12px;
//   letter-spacing: 2px;
//   font-weight: 600;
//   color: #7c3aed;
// }

// .content-box h3 {
//   font-size: 28px;
//   font-weight: 700;
//   margin: 15px 0;
//   color: #4c1d95;
// }

// .content-box p {
//   color: #6b7280;
//   line-height: 1.7;
// }

// .extra-text {
//   display: block;
//   margin-top: 10px;
// }

// /* Button */
// .learn-btn {
//   margin-top: 20px;
//   padding: 12px 30px;
//   border: none;
//   background: linear-gradient(135deg,#4c1d95,#5b21b6);
//   color: white;
//   border-radius: 30px;
//   font-weight: 600;
//   transition: all 0.3s ease;
// }

// .learn-btn:hover {
//   background: linear-gradient(135deg,#5b21b6,#7c3aed);
//   transform: translateY(-3px);
// }

// /* Pagination */
// .pagination-box {
//   margin-top: 40px;
//   text-align: center;
// }

// .page-btn {
//   border: none;
//   background: #ede9fe;
//   margin: 0 5px;
//   padding: 8px 14px;
//   border-radius: 25px;
//   font-weight: 600;
//   transition: all 0.3s ease;
// }

// .page-btn.active {
//   background: #4c1d95;
//   color: white;
//   transform: scale(1.15);
// }

// .page-btn:hover {
//   background: #7c3aed;
//   color: white;
// }

// /* Responsive */
// @media (max-width: 992px) {
//   .about-wrapper {
//     flex-direction: column;
//   }

//   .content-box {
//     position: relative;
//     width: 100%;
//     margin-top: 20px;
//   }

//   .image-box img {
//     height: 350px;
//   }
// }

//       `}</style>
//     </section>
//   );
// }

// export default About;
import { useEffect, useState } from "react";

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const slides = [
    {
      img: "/about1.jpg",
      subtitle: "CAMPUS INFORMATION",
      title: "Where Knowledge Meets Innovation",
      shortText: "Committed to academic excellence and holistic development.",
      fullText:
        "Modern New Delhi Public High School focuses on innovation, discipline, leadership, and moral values to prepare students for a bright future.",
    },
    {
      img: "/about2.jpg",
      subtitle: "SMART LEARNING",
      title: "Interactive Smart Classrooms",
      shortText: "Digital classrooms enhancing modern education.",
      fullText:
        "Our smart classrooms integrate technology with learning, making lessons engaging and interactive.",
    },
    {
      img: "/about3.jpg",
      subtitle: "SPORTS & ACTIVITIES",
      title: "Building Strong Leaders",
      shortText: "Encouraging teamwork and leadership.",
      fullText:
        "We provide sports and cultural activities that build confidence, discipline, and team spirit.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setExpanded(false);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-header text-center">
          <h2>About Our School</h2>
          <p>
            Modern New Delhi Public High School nurtures excellence and
            innovation.
          </p>
        </div>

        <div className="about-wrapper">
          {/* IMAGE */}
          <div className="image-box">
            <img key={activeIndex} src={slides[activeIndex].img} alt="about" />
          </div>

          {/* CONTENT */}
          <div className="content-box">
            <span>{slides[activeIndex].subtitle}</span>
            <h3>{slides[activeIndex].title}</h3>

            <p>
              {slides[activeIndex].shortText}
              {expanded && (
                <span className="extra-text">
                  {" " + slides[activeIndex].fullText}
                </span>
              )}
            </p>

            <button
              className="learn-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="pagination-box">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`page-btn ${activeIndex === index ? "active" : ""}`}
              onClick={() => {
                setActiveIndex(index);
                setExpanded(false);
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>

      <style>{`

      /* 🔥 Navbar offset fix */
      #about {
        scroll-margin-top: 100px;
      }

      .about-section {
        padding: 100px 0;
        background: #f5f3ff;
      }

      .about-header h2 {
        font-size: 38px;
        font-weight: 800;
        color: #4c1d95;
      }

      .about-header p {
        color: #6b7280;
        margin-top: 10px;
      }

      /* Layout fix (NO absolute now) */
      .about-wrapper {
        display: flex;
        align-items: center;
        gap: 50px;
        margin-top: 60px;
      }

      .image-box {
        flex: 1;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 60px rgba(76,29,149,0.25);
      }

      .image-box img {
        width: 100%;
        height: 450px;
        object-fit: cover;
      }

      .content-box {
        flex: 1;
        background: white;
        padding: 50px;
        border-radius: 20px;
        box-shadow: 0 20px 50px rgba(76,29,149,0.15);
      }

      .content-box span {
        font-size: 12px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #7c3aed;
      }

      .content-box h3 {
        font-size: 28px;
        font-weight: 700;
        margin: 15px 0;
        color: #4c1d95;
      }

      .content-box p {
        color: #6b7280;
        line-height: 1.7;
      }

      .learn-btn {
        margin-top: 20px;
        padding: 12px 30px;
        border: none;
        background: linear-gradient(135deg,#4c1d95,#5b21b6);
        color: white;
        border-radius: 30px;
        font-weight: 600;
        transition: 0.3s ease;
      }

      .learn-btn:hover {
        background: linear-gradient(135deg,#5b21b6,#7c3aed);
        transform: translateY(-3px);
      }

      .pagination-box {
        margin-top: 50px;
        text-align: center;
      }

      .page-btn {
        border: none;
        background: #ede9fe;
        margin: 0 5px;
        padding: 8px 14px;
        border-radius: 25px;
        font-weight: 600;
      }

      .page-btn.active {
        background: #4c1d95;
        color: white;
      }

      /* MOBILE FIX */
      @media (max-width: 992px) {
        .about-wrapper {
          flex-direction: column;
        }

        .image-box img {
          height: 320px;
        }

        .content-box {
          padding: 30px;
        }
      }

      `}</style>
    </section>
  );
}

export default About;
