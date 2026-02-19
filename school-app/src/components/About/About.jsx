// function About() {
//   return (
//     <section id="about" className="about-section py-5">
//       <div className="container">
//         {/* Heading */}
//         <h2 className="fw-bold text-center mb-3 about-heading">
//           About Modern New Delhi Public High School
//         </h2>

//         <p className="text-center mb-5 about-intro">
//           Modern New Delhi Public High School, Hoshiarpur, is dedicated to
//           providing quality education in a disciplined and nurturing
//           environment. Our school believes in academic excellence, moral values,
//           and the all-round development of every student.
//         </p>

//         {/* Mission & Vision */}
//         <div className="row mb-5">
//           <div className="col-md-6 mb-4">
//             <div className="about-card">
//               <h5 className="fw-bold">🎯 Our Mission</h5>
//               <p>
//                 To provide meaningful education that builds strong character,
//                 encourages curiosity, and prepares students to become
//                 responsible citizens of society.
//               </p>
//             </div>
//           </div>

//           <div className="col-md-6 mb-4">
//             <div className="about-card">
//               <h5 className="fw-bold">🌟 Our Vision</h5>
//               <p>
//                 To create a learning environment where students achieve academic
//                 success while developing confidence, leadership, and life
//                 skills.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Key Highlights */}
//         <div className="row text-center">
//           <div className="col-md-4 mb-4">
//             <div className="feature-card">
//               <h5 className="fw-bold">📚 Academic Excellence</h5>
//               <p>
//                 A structured curriculum with experienced teachers focused on
//                 conceptual clarity and continuous improvement.
//               </p>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="feature-card">
//               <h5 className="fw-bold">🏫 Safe & Disciplined Campus</h5>
//               <p>
//                 A secure and disciplined environment that promotes respect,
//                 responsibility, and positive values.
//               </p>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="feature-card">
//               <h5 className="fw-bold">🏅 Co-Curricular Activities</h5>
//               <p>
//                 Sports, cultural programs, and extracurricular activities that
//                 support holistic student development.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Styling */}
//       <style>{`

//   .about-section {
//     background: linear-gradient(180deg, #f0fdf4, #ffffff);
//     transition: background 0.4s ease;
//   }

//   .about-heading {
//     color: #16a34a;
//   }

//   .about-intro {
//     font-size: 1.05rem;
//     line-height: 1.7;
//     color: #555;
//   }

//   .about-card {
//     background: white;
//     padding: 30px;
//     border-radius: 18px;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//     transition: all 0.35s ease;
//     border: 1px solid #f0f0f0;
//   }

//   .about-card:hover {
//     transform: translateY(-8px);
//     box-shadow: 0 20px 40px rgba(0,0,0,0.15);
//   }

//   .feature-card {
//     background: white;
//     padding: 30px;
//     border-radius: 18px;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//     transition: all 0.35s ease;
//     height: 100%;
//     border: 1px solid #f0f0f0;
//   }

//   .feature-card:hover {
//     transform: translateY(-8px);
//     box-shadow: 0 20px 40px rgba(0,0,0,0.15);
//   }

//   /* ================= DARK MODE ================= */

//   body.dark-mode .about-section {
//     background: #121212 !important;
//   }

//   body.dark-mode .about-heading {
//     color: #22c55e !important;
//   }

//   body.dark-mode .about-intro {
//     color: #cccccc !important;
//   }

//   body.dark-mode .about-card,
//   body.dark-mode .feature-card {
//     background: #1e1e1e !important;
//     color: white !important;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.4);
//     border: 1px solid #2c2c2c;
//   }

//   body.dark-mode .about-card:hover,
//   body.dark-mode .feature-card:hover {
//     box-shadow: 0 20px 45px rgba(0,0,0,0.6);
//   }

//   /* MOBILE */
//   @media (max-width: 768px) {
//     .about-intro {
//       font-size: 1rem;
//     }

//     .about-card,
//     .feature-card {
//       padding: 22px;
//     }
//   }

// `}</style>
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
    {
      img: "/about4.jpg",
      subtitle: "SAFE CAMPUS",
      title: "Secure Learning Environment",
      shortText: "Safe and disciplined campus.",
      fullText:
        "Our campus ensures safety, monitoring, and positive discipline for every student.",
    },
    {
      img: "/about5.jpg",
      subtitle: "CO-CURRICULAR",
      title: "Beyond Academics",
      shortText: "Activities shaping creativity.",
      fullText:
        "Music, arts, competitions, and events allow students to explore talents beyond textbooks.",
    },
    {
      img: "/about6.jpg",
      subtitle: "HOLISTIC GROWTH",
      title: "Complete Development",
      shortText: "Balanced academic and personal growth.",
      fullText:
        "We focus on intellectual, emotional, and social development of every child.",
    },
  ];

  // Smooth Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setExpanded(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about-section">
      <div className="about-header text-center">
        <h2>About Our School</h2>
        <p>
          Modern New Delhi Public High School nurtures excellence and
          innovation.
        </p>
      </div>

      <div className="container">
        <div className="about-wrapper">
          {/* Image */}
          <div className="image-box">
            <img
              key={activeIndex}
              src={slides[activeIndex].img}
              alt="about"
              className="fade-img"
            />
          </div>

          {/* Content */}
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

        {/* Smooth Pagination */}
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

.about-section {
  padding: 80px 0;
  background: #f8f9f8;
}

/* Header */
.about-header h2 {
  font-size: 36px;
  font-weight: 700;
}

.about-header p {
  color: #666;
  margin-top: 10px;
}

/* Wrapper */
.about-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 60px;
}

/* Image */
.image-box {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
}

.image-box img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  transition: opacity 0.8s ease-in-out;
}

.fade-img {
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Content */
.content-box {
  position: absolute;
  right: 0;
  background: #e9efe9;
  padding: 50px;
  width: 45%;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  transition: all 0.4s ease;
}

.content-box span {
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  color: #555;
}

.content-box h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 15px 0;
}

.content-box p {
  color: #666;
  line-height: 1.7;
}

.extra-text {
  display: block;
  margin-top: 10px;
  animation: fadeIn 0.4s ease;
}

/* Button */
.learn-btn {
  margin-top: 20px;
  padding: 12px 30px;
  border: none;
  background: #16a34a;
  color: white;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.learn-btn:hover {
  background: #15803d;
  transform: translateY(-3px);
}

/* Pagination */
.pagination-box {
  margin-top: 40px;
  text-align: center;
}

.page-btn {
  border: none;
  background: #e5e7eb;
  margin: 0 5px;
  padding: 8px 14px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.page-btn.active {
  background: #16a34a;
  color: white;
  transform: scale(1.15);
}

.page-btn:hover {
  background: #22c55e;
  color: white;
}

/* Responsive */
@media (max-width: 992px) {
  .about-wrapper {
    flex-direction: column;
  }

  .content-box {
    position: relative;
    width: 100%;
    margin-top: 20px;
  }

  .image-box img {
    height: 350px;
  }
}

`}</style>
    </section>
  );
}

export default About;
