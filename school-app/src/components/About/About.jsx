// function About() {
//   return (
//     <section id="about" className="p-5 about-section">
//       <div className="container">
//         <h2 className="fw-bold text-center mb-4">About Our School System</h2>

//         <p className="text-center mb-5">
//           Our school management system is designed to simplify daily operations
//           and improve communication between administration, teachers, students
//           and parents.
//         </p>

//         <div className="row text-center">
//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold">Student Management</h5>
//             <p>
//               Maintain student records, attendance, performance and fees in one
//               secure place.
//             </p>
//           </div>

//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold">Parent Access</h5>
//             <p>
//               Parents can easily track attendance, fee status and school
//               announcements.
//             </p>
//           </div>

//           <div className="col-md-4 mb-4">
//             <h5 className="fw-bold">Admin Control</h5>
//             <p>
//               Complete control over staff, academics, certificates and reports.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About;
function About() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        {/* Heading */}
        <h2 className="fw-bold text-center mb-3 about-heading">
          About Modern New Delhi Public High School
        </h2>

        <p className="text-center mb-5 about-intro">
          Modern New Delhi Public High School, Hoshiarpur, is dedicated to
          providing quality education in a disciplined and nurturing
          environment. Our school believes in academic excellence, moral values,
          and the all-round development of every student.
        </p>

        {/* Mission & Vision */}
        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="about-card">
              <h5 className="fw-bold">🎯 Our Mission</h5>
              <p>
                To provide meaningful education that builds strong character,
                encourages curiosity, and prepares students to become
                responsible citizens of society.
              </p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="about-card">
              <h5 className="fw-bold">🌟 Our Vision</h5>
              <p>
                To create a learning environment where students achieve academic
                success while developing confidence, leadership, and life
                skills.
              </p>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5 className="fw-bold">📚 Academic Excellence</h5>
              <p>
                A structured curriculum with experienced teachers focused on
                conceptual clarity and continuous improvement.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5 className="fw-bold">🏫 Safe & Disciplined Campus</h5>
              <p>
                A secure and disciplined environment that promotes respect,
                responsibility, and positive values.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5 className="fw-bold">🏅 Co-Curricular Activities</h5>
              <p>
                Sports, cultural programs, and extracurricular activities that
                support holistic student development.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style>{`

  .about-section {
    background: linear-gradient(180deg, #f0fdf4, #ffffff);
    transition: background 0.4s ease;
  }

  .about-heading {
    color: #16a34a;
  }

  .about-intro {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #555;
  }

  .about-card {
    background: white;
    padding: 30px;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    transition: all 0.35s ease;
    border: 1px solid #f0f0f0;
  }

  .about-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }

  .feature-card {
    background: white;
    padding: 30px;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    transition: all 0.35s ease;
    height: 100%;
    border: 1px solid #f0f0f0;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }

  /* ================= DARK MODE ================= */

  body.dark-mode .about-section {
    background: #121212 !important;
  }

  body.dark-mode .about-heading {
    color: #22c55e !important;
  }

  body.dark-mode .about-intro {
    color: #cccccc !important;
  }

  body.dark-mode .about-card,
  body.dark-mode .feature-card {
    background: #1e1e1e !important;
    color: white !important;
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    border: 1px solid #2c2c2c;
  }

  body.dark-mode .about-card:hover,
  body.dark-mode .feature-card:hover {
    box-shadow: 0 20px 45px rgba(0,0,0,0.6);
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .about-intro {
      font-size: 1rem;
    }

    .about-card,
    .feature-card {
      padding: 22px;
    }
  }

`}</style>
    </section>
  );
}

export default About;
