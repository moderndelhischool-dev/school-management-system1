// import { useEffect, useState } from "react";

// function About() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [expanded, setExpanded] = useState(false);

//   const slides = [
//     {
//       img: "/about1.jpg",
//       subtitle: "OUR DEDICATED FACULTY",
//       title: "Experienced & Qualified Teachers",
//       shortText:
//         "Our highly qualified teachers are committed to nurturing young minds.",
//       fullText:
//         "The teaching staff at Modern New Delhi Public High School brings years of experience, dedication and passion for education. They focus on academic excellence, discipline and character development of every student.",
//     },
//     {
//       img: "/about2.jpg",
//       subtitle: "TEAMWORK & GUIDANCE",
//       title: "Strong Leadership & Coordination",
//       shortText:
//         "Our staff works together to create a positive learning environment.",
//       fullText:
//         "With strong coordination and leadership, our faculty ensures students receive proper guidance, mentorship and support in academics as well as extracurricular activities.",
//     },
//     {
//       img: "/about3.jpg",
//       subtitle: "SPORTS & ACTIVITY SUPPORT",
//       title: "Encouraging Student Participation",
//       shortText:
//         "Teachers actively support students in sports and cultural events.",
//       fullText:
//         "Our staff members play an important role in organizing sports events, competitions and school activities, motivating students to develop confidence, teamwork and leadership skills.",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % slides.length);
//       setExpanded(false);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <section id="about" className="about-section">
//       <div className="container">
//         <div className="about-header text-center">
//           <h2>About Our School</h2>
//           <p>
//             Meet the dedicated educators shaping the future of our students.
//           </p>
//         </div>

//         <div className="about-wrapper">
//           <div className="image-box">
//             <img
//               src={slides[activeIndex].img}
//               alt="Teachers"
//               className="fade-image"
//             />
//           </div>

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

// #about {
//   scroll-margin-top: 100px;
// }

// .about-section {
//   padding: 100px 0;
//   background: #F4F6F8;
// }

// /* HEADER */
// .about-header h2 {
//   font-size: 38px;
//   font-weight: 800;
//   color: #0F4C6C;
// }

// .about-header p {
//   color: #4B5563;
//   margin-top: 10px;
// }

// /* WRAPPER */
// .about-wrapper {
//   display: flex;
//   align-items: center;
//   gap: 50px;
//   margin-top: 60px;
// }

// /* IMAGE BOX */
// .image-box {
//   flex: 1;
//   border-radius: 20px;
//   overflow: hidden;
//   box-shadow: 0 25px 60px rgba(15,76,108,0.25);
//   transition: all 0.4s ease;
// }

// .image-box:hover {
//   transform: translateY(-15px) scale(1.03);
//   box-shadow:
//     0 35px 70px rgba(15,76,108,0.35),
//     0 0 25px rgba(212,162,76,0.3);
// }

// .fade-image {
//   width: 100%;
//   height: 450px;
//   object-fit: cover;
//   animation: fadeZoom 1s ease;
//   transition: transform 0.6s ease;
// }

// @keyframes fadeZoom {
//   0% { opacity: 0; transform: scale(1.05); }
//   100% { opacity: 1; transform: scale(1); }
// }

// .image-box:hover .fade-image {
//   transform: scale(1.08);
// }

// /* CONTENT BOX */
// .content-box {
//   flex: 1;
//   background: white;
//   padding: 50px;
//   border-radius: 20px;
//   box-shadow: 0 20px 50px rgba(15,76,108,0.15);
//   transition: all 0.4s ease;
//   border-top: 4px solid #D4A24C;
// }

// .content-box:hover {
//   transform: translateY(-15px);
//   box-shadow:
//     0 35px 70px rgba(15,76,108,0.25),
//     0 0 25px rgba(212,162,76,0.25);
// }

// /* Subtitle */
// .content-box span {
//   font-size: 12px;
//   letter-spacing: 2px;
//   font-weight: 600;
//   color: #D4A24C;
// }

// /* Title */
// .content-box h3 {
//   font-size: 28px;
//   font-weight: 700;
//   margin: 15px 0;
//   color: #0F4C6C;
// }

// /* Paragraph */
// .content-box p {
//   color: #4B5563;
//   line-height: 1.7;
// }

// /* BUTTON */
// .learn-btn {
//   margin-top: 20px;
//   padding: 12px 30px;
//   border: none;
//   background: linear-gradient(135deg,#0F4C6C,#1B5E84);
//   color: white;
//   border-radius: 30px;
//   font-weight: 600;
//   transition: 0.3s ease;
//   cursor: pointer;
// }

// .learn-btn:hover {
//   background: #D4A24C;
//   color: #0F4C6C;
//   transform: translateY(-3px);
// }

// /* PAGINATION */
// .pagination-box {
//   margin-top: 50px;
//   text-align: center;
// }

// .page-btn {
//   border: none;
//   background: #E5E7EB;
//   margin: 0 5px;
//   padding: 8px 14px;
//   border-radius: 25px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: 0.3s;
// }

// .page-btn:hover {
//   background: #D4A24C;
//   color: #0F4C6C;
// }

// .page-btn.active {
//   background: #0F4C6C;
//   color: white;
// }

// /* DARK MODE */
// body.dark-mode .about-section {
//   background: #0E1A24;
// }

// body.dark-mode .content-box {
//   background: #1B2A35;
//   color: white;
// }

// body.dark-mode .content-box p {
//   color: #CBD5E1;
// }

// body.dark-mode .about-header h2 {
//   color: #D4A24C;
// }

// @media (max-width: 992px) {
//   .about-wrapper {
//     flex-direction: column;
//   }

//   .fade-image {
//     height: 320px;
//   }

//   .content-box {
//     padding: 30px;
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
      img: "/about2.jpg",
      subtitle: "OUR DEDICATED FACULTY",
      title: "Experienced & Qualified Teachers",
      shortText:
        "Our highly qualified teachers are committed to nurturing young minds.",
      fullText:
        "The teaching staff at Modern New Delhi Public High School brings years of experience, dedication and passion for education. They focus on academic excellence, discipline and character development of every student.",
    },
    {
      img: "/about1.jpg",
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
          <h2>About Modern New Delhi Public High School</h2>
          <p>
            Modern New Delhi Public High School is dedicated to providing
            quality education and nurturing students with strong moral values,
            discipline and leadership skills.
          </p>
        </div>

        <section className="vision-mission">
          <div className="vision-box">
            <h3>Our Vision</h3>
            <p>
              To inspire students to become responsible citizens and future
              leaders through innovative education and strong values.
            </p>
          </div>

          <div className="mission-box">
            <h3>Our Mission</h3>
            <ul>
              <li>Provide quality education</li>
              <li>Encourage creativity and innovation</li>
              <li>Develop leadership and confidence</li>
              <li>Promote discipline and strong values</li>
            </ul>
          </div>
        </section>

        <div className="about-wrapper">
          <div className="image-box">
            <img
              src={slides[activeIndex].img}
              alt="Teachers"
              className="fade-image"
            />
          </div>

          <div className="content-box">
            <span>{slides[activeIndex].subtitle}</span>
            <h3>{slides[activeIndex].title}</h3>

            <p>
              {slides[activeIndex].shortText}
              {expanded && <span>{" " + slides[activeIndex].fullText}</span>}
            </p>

            <button
              className="learn-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

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

        <section className="principal-section">
          <h2>Principal's Message</h2>

          <p>
            At Modern New Delhi Public High School we believe that education is
            the foundation of success. Our aim is to create an environment where
            students can explore their talents, develop confidence and achieve
            excellence in academics, sports and cultural activities.
          </p>
        </section>

        <section className="facilities">
          <h2>Our Facilities</h2>

          <div className="facility-grid">
            <div className="facility-card">Smart Classrooms</div>
            <div className="facility-card">Science Laboratory</div>
            <div className="facility-card">Computer Lab</div>
            <div className="facility-card">Library</div>
            <div className="facility-card">Sports Ground</div>
            <div className="facility-card">Cultural Activities</div>
          </div>
        </section>

        <section className="choose">
          <h2>Why Choose Our School</h2>

          <div className="choose-grid">
            <div className="choose-card">Experienced Teachers</div>
            <div className="choose-card">Modern Education System</div>
            <div className="choose-card">Safe Environment</div>
            <div className="choose-card">Focus on Overall Development</div>
          </div>
        </section>
      </div>

      <style>{`

#about {
  scroll-margin-top: 100px;
}

.about-section {
  padding: 100px 0;
  background: #F4F6F8;
}

/* HEADER */
.about-header h2 {
  font-size: 38px;
  font-weight: 800;
  color: #0F4C6C;
}

.about-header p {
  color: #4B5563;
  margin-top: 10px;
}

/* WRAPPER */
.about-wrapper {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 60px;
}

/* IMAGE BOX */
.image-box {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(15,76,108,0.25);
  transition: all 0.4s ease;
}

.image-box:hover {
  transform: translateY(-15px) scale(1.03);
  box-shadow:
    0 35px 70px rgba(15,76,108,0.35),
    0 0 25px rgba(212,162,76,0.3);
}

.fade-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  animation: fadeZoom 1s ease;
  transition: transform 0.6s ease;
}

@keyframes fadeZoom {
  0% { opacity: 0; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

.image-box:hover .fade-image {
  transform: scale(1.08);
}

/* CONTENT BOX */
.content-box {
  flex: 1;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(15,76,108,0.15);
  transition: all 0.4s ease;
  border-top: 4px solid #D4A24C;
}

.content-box:hover {
  transform: translateY(-15px);
  box-shadow:
    0 35px 70px rgba(15,76,108,0.25),
    0 0 25px rgba(212,162,76,0.25);
}

/* Subtitle */
.content-box span {
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  color: #D4A24C;
}

/* Title */
.content-box h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 15px 0;
  color: #0F4C6C;
}

/* Paragraph */
.content-box p {
  color: #4B5563;
  line-height: 1.7;
}

/* BUTTON */
.learn-btn {
  margin-top: 20px;
  padding: 12px 30px;
  border: none;
  background: linear-gradient(135deg,#0F4C6C,#1B5E84);
  color: white;
  border-radius: 30px;
  font-weight: 600;
  transition: 0.3s ease;
  cursor: pointer;
}

.learn-btn:hover {
  background: #D4A24C;
  color: #0F4C6C;
  transform: translateY(-3px);
}

/* PAGINATION */
.pagination-box {
  margin-top: 50px;
  text-align: center;
}

.page-btn {
  border: none;
  background: #E5E7EB;
  margin: 0 5px;
  padding: 8px 14px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.page-btn:hover {
  background: #D4A24C;
  color: #0F4C6C;
}

.page-btn.active {
  background: #0F4C6C;
  color: white;
}

/* DARK MODE */
body.dark-mode .about-section {
  background: #0E1A24;
}

body.dark-mode .content-box {
  background: #1B2A35;
  color: white;
}

body.dark-mode .content-box p {
  color: #CBD5E1;
}

body.dark-mode .about-header h2 {
  color: #D4A24C;
}

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
#about {
scroll-margin-top:100px;
}

.about-section{
padding:100px 0;
background:#F4F6F8;
}

/* HEADER */

.about-header h2{
font-size:38px;
font-weight:800;
color:#0F4C6C;
}

.about-header p{
color:#4B5563;
margin-top:10px;
}

/* VISION MISSION */

.vision-mission{
display:flex;
gap:40px;
margin-top:50px;
}

.vision-box,
.mission-box{
flex:1;
background:white;
padding:35px;
border-radius:15px;
box-shadow:0 10px 30px rgba(0,0,0,0.08);
transition:.3s;
border-top:4px solid #D4A24C;
}

.vision-box:hover,
.mission-box:hover{
transform:translateY(-8px);
background:#0F4C6C;
color:white;
}

/* WRAPPER */

.about-wrapper{
display:flex;
gap:50px;
margin-top:60px;
}

.image-box{
flex:1;
border-radius:20px;
overflow:hidden;
box-shadow:0 20px 50px rgba(0,0,0,0.2);
}

.fade-image{
width:100%;
height:450px;
object-fit:cover;
}

.content-box{
flex:1;
background:white;
padding:50px;
border-radius:20px;
box-shadow:0 20px 50px rgba(15,76,108,0.15);
border-top:4px solid #D4A24C;
}

.content-box span{
color:#D4A24C;
font-weight:600;
letter-spacing:1px;
}

.content-box h3{
color:#0F4C6C;
}

.content-box p{
color:#4B5563;
line-height:1.7;
}

/* BUTTON */

.learn-btn{
margin-top:20px;
padding:12px 30px;
border:none;
background:#0F4C6C;
color:white;
border-radius:30px;
cursor:pointer;
}

.learn-btn:hover{
background:#D4A24C;
color:#0F4C6C;
}

/* PRINCIPAL */

.principal-section{
margin-top:70px;
background:white;
padding:40px;
border-radius:15px;
box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

/* FACILITIES */

.facilities{
margin-top:70px;
}

.facility-grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:20px;
margin-top:20px;
}

.facility-card{
background:white;
padding:25px;
border-radius:12px;
text-align:center;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
transition:.3s;
}

.facility-card:hover{
background:#0F4C6C;
color:white;
transform:translateY(-6px);
}

/* CHOOSE */

.choose{
margin-top:70px;
}

.choose-grid{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:20px;
margin-top:20px;
}

.choose-card{
background:white;
padding:25px;
border-radius:12px;
text-align:center;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
transition:.3s;
}

.choose-card:hover{
background:#0F4C6C;
color:white;
transform:translateY(-6px);
}

/* DARK MODE */

body.dark-mode .about-section{
background:#0E1A24;
}

body.dark-mode .about-header h2{
color:#D4A24C;
}

body.dark-mode .about-header p{
color:#CBD5E1;
}

body.dark-mode .vision-box,
body.dark-mode .mission-box,
body.dark-mode .content-box,
body.dark-mode .principal-section,
body.dark-mode .facility-card,
body.dark-mode .choose-card{
background:#1B2A35;
color:white;
}

body.dark-mode .content-box p{
color:#CBD5E1;
}

body.dark-mode .facility-card:hover,
body.dark-mode .choose-card:hover{
background:#D4A24C;
color:#0F4C6C;
}

/* MOBILE ONLY (PHONE SIZE) */

@media (max-width:576px){

.about-section{
padding:60px 15px;
}

/* HEADER */

.about-header h2{
font-size:26px;
}

.about-header p{
font-size:14px;
line-height:1.6;
}

/* VISION MISSION */

.vision-mission{
flex-direction:column;
gap:20px;
}

.vision-box,
.mission-box{
padding:20px;
}

/* IMAGE + CONTENT */

.about-wrapper{
flex-direction:column;
gap:25px;
margin-top:40px;
}

.fade-image{
height:220px;
}

/* CONTENT BOX */

.content-box{
padding:20px;
}

.content-box h3{
font-size:20px;
}

.content-box p{
font-size:14px;
}

/* BUTTON */

.learn-btn{
padding:10px 22px;
font-size:14px;
}

/* PAGINATION */

.page-btn{
padding:6px 12px;
font-size:12px;
margin:3px;
}

/* PRINCIPAL */

.principal-section{
padding:25px 20px;
margin-top:40px;
}

/* FACILITIES */

.facility-grid{
grid-template-columns:1fr;
gap:15px;
}

.facility-card{
padding:18px;
font-size:14px;
}

/* CHOOSE */

.choose-grid{
grid-template-columns:1fr;
gap:15px;
}

.choose-card{
padding:18px;
font-size:14px;
}

}

`}</style>
    </section>
  );
}

export default About;
