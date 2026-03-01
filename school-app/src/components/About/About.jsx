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
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section id="about" className="about-section">
//       <div className="container">
//         <div className="about-header text-center">
//           <h2>About Our School</h2>
//           <p>
//             Modern New Delhi Public High School nurtures excellence and
//             innovation.
//           </p>
//         </div>

//         <div className="about-wrapper">
//           {/* IMAGE */}
//           <div className="image-box">
//             <img key={activeIndex} src={slides[activeIndex].img} alt="about" />
//           </div>

//           {/* CONTENT */}
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

//         {/* PAGINATION */}
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

//       /* 🔥 Navbar offset fix */
//       #about {
//         scroll-margin-top: 100px;
//       }

//       .about-section {
//         padding: 100px 0;
//         background: #f5f3ff;
//       }

//       .about-header h2 {
//         font-size: 38px;
//         font-weight: 800;
//         color: #4c1d95;
//       }

//       .about-header p {
//         color: #6b7280;
//         margin-top: 10px;
//       }

//       /* Layout fix (NO absolute now) */
//       .about-wrapper {
//         display: flex;
//         align-items: center;
//         gap: 50px;
//         margin-top: 60px;
//       }

//       .image-box {
//         flex: 1;
//         border-radius: 20px;
//         overflow: hidden;
//         box-shadow: 0 25px 60px rgba(76,29,149,0.25);
//       }

//       .image-box img {
//         width: 100%;
//         height: 450px;
//         object-fit: cover;
//       }

//       .content-box {
//         flex: 1;
//         background: white;
//         padding: 50px;
//         border-radius: 20px;
//         box-shadow: 0 20px 50px rgba(76,29,149,0.15);
//       }

//       .content-box span {
//         font-size: 12px;
//         letter-spacing: 2px;
//         font-weight: 600;
//         color: #7c3aed;
//       }

//       .content-box h3 {
//         font-size: 28px;
//         font-weight: 700;
//         margin: 15px 0;
//         color: #4c1d95;
//       }

//       .content-box p {
//         color: #6b7280;
//         line-height: 1.7;
//       }

//       .learn-btn {
//         margin-top: 20px;
//         padding: 12px 30px;
//         border: none;
//         background: linear-gradient(135deg,#4c1d95,#5b21b6);
//         color: white;
//         border-radius: 30px;
//         font-weight: 600;
//         transition: 0.3s ease;
//       }

//       .learn-btn:hover {
//         background: linear-gradient(135deg,#5b21b6,#7c3aed);
//         transform: translateY(-3px);
//       }

//       .pagination-box {
//         margin-top: 50px;
//         text-align: center;
//       }

//       .page-btn {
//         border: none;
//         background: #ede9fe;
//         margin: 0 5px;
//         padding: 8px 14px;
//         border-radius: 25px;
//         font-weight: 600;
//       }

//       .page-btn.active {
//         background: #4c1d95;
//         color: white;
//       }

//       /* MOBILE FIX */
//       @media (max-width: 992px) {
//         .about-wrapper {
//           flex-direction: column;
//         }

//         .image-box img {
//           height: 320px;
//         }

//         .content-box {
//           padding: 30px;
//         }
//       }

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
      subtitle: "OUR DEDICATED FACULTY",
      title: "Experienced & Qualified Teachers",
      shortText:
        "Our highly qualified teachers are committed to nurturing young minds.",
      fullText:
        "The teaching staff at Modern New Delhi Public High School brings years of experience, dedication and passion for education. They focus on academic excellence, discipline and character development of every student.",
    },
    {
      img: "/about2.jpg",
      subtitle: "TEAMWORK & GUIDANCE",
      title: "Strong Leadership & Coordination",
      shortText:
        "Our staff works together to create a positive learning environment.",
      fullText:
        "With strong coordination and leadership, our faculty ensures students receive proper guidance, mentorship and support in academics as well as extracurricular activities.",
    },
    {
      img: "/about3.jpg",
      subtitle: "SPORTS & ACTIVITY SUPPORT",
      title: "Encouraging Student Participation",
      shortText:
        "Teachers actively support students in sports and cultural events.",
      fullText:
        "Our staff members play an important role in organizing sports events, competitions and school activities, motivating students to develop confidence, teamwork and leadership skills.",
    },
  ];

  // ✅ Smooth Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setExpanded(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-header text-center">
          <h2>About Our School</h2>
          <p>
            Meet the dedicated educators shaping the future of our students.
          </p>
        </div>

        <div className="about-wrapper">
          {/* IMAGE */}
          <div className="image-box">
            <img
              src={slides[activeIndex].img}
              alt="Teachers"
              className="fade-image"
            />
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

/* ================= WRAPPER ================= */

.about-wrapper {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 60px;
}

/* ================= IMAGE BOX ================= */

.image-box {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(76,29,149,0.25);
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}

/* Hover Pop Effect */
.image-box:hover {
  transform: translateY(-18px) scale(1.03);
  box-shadow:
    0 35px 70px rgba(76,29,149,0.35),
    0 0 30px rgba(124,58,237,0.35);
}

/* Smooth Fade + Zoom Animation */
.fade-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  animation: fadeZoom 1s ease;
  transition: transform 0.6s ease;
}

@keyframes fadeZoom {
  0% {
    opacity: 0;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Image Zoom on Hover */
.image-box:hover .fade-image {
  transform: scale(1.08);
}

/* ================= CONTENT BOX ================= */

.content-box {
  flex: 1;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(76,29,149,0.15);
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Hover Pop Effect */
.content-box:hover {
  transform: translateY(-18px) scale(1.02);
  box-shadow:
    0 35px 70px rgba(76,29,149,0.25),
    0 0 30px rgba(124,58,237,0.25);
}

/* Subtitle */
.content-box span {
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  color: #7c3aed;
  transition: 0.3s ease;
}

/* Subtitle Highlight */
.content-box:hover span {
  color: #5b21b6;
}

/* Title */
.content-box h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 15px 0;
  color: #4c1d95;
  transition: 0.3s ease;
}

/* Title Hover Color */
.content-box:hover h3 {
  color: #6d28d9;
}

/* Paragraph */
.content-box p {
  color: #6b7280;
  line-height: 1.7;
}

/* ================= BUTTON ================= */

.learn-btn {
  margin-top: 20px;
  padding: 12px 30px;
  border: none;
  background: linear-gradient(135deg,#4c1d95,#5b21b6);
  color: white;
  border-radius: 30px;
  font-weight: 600;
  transition: 0.3s ease;
  cursor: pointer;
}

.learn-btn:hover {
  background: linear-gradient(135deg,#5b21b6,#7c3aed);
  transform: translateY(-3px);
}

/* ================= PAGINATION ================= */

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
  cursor: pointer;
  transition: 0.3s;
}

.page-btn:hover {
  background: #d8b4fe;
}

.page-btn.active {
  background: #4c1d95;
  color: white;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 992px) {
  .about-wrapper {
    flex-direction: column;
  }

  .fade-image {
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
