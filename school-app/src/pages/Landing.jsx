import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Landing() {
  const navigate = useNavigate();

  // go to login page
  const goToLogin = () => {
    navigate("/login");
  };

  // smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= HOME / HERO ================= */}
      <section
        id="home"
        className="py-5"
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            {/* TEXT */}
            <div className="col-md-6 order-2 order-md-1">
              <h1 className="fw-bold mb-3">Smart School Management System</h1>

              <p className="text-muted mb-4">
                A modern, secure and easy-to-use platform to manage students,
                parents, teachers and school administration efficiently.
              </p>

              {/* BUTTONS */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
                <button className="btn btn-primary px-4" onClick={goToLogin}>
                  Get Started
                </button>

                <button
                  className="btn btn-outline-primary px-4"
                  onClick={() => scrollToSection("about")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="col-md-6 order-1 order-md-2 text-center mb-4 mb-md-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="school"
                className="img-fluid"
                style={{ maxWidth: "260px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">About Our School System</h2>

          <p className="text-center text-muted mb-5 px-2 px-md-5">
            Our school management system is designed to simplify daily
            operations and improve communication between administration,
            teachers, students and parents.
          </p>

          <div className="row text-center">
            <div className="col-md-4 mb-4 px-4">
              <h5 className="fw-bold">Student Management</h5>
              <p className="text-muted">
                Maintain student records, attendance, performance and fees in
                one secure place.
              </p>
            </div>

            <div className="col-md-4 mb-4 px-4">
              <h5 className="fw-bold">Parent Access</h5>
              <p className="text-muted">
                Parents can easily track attendance, fee status and school
                announcements.
              </p>
            </div>

            <div className="col-md-4 mb-4 px-4">
              <h5 className="fw-bold">Admin Control</h5>
              <p className="text-muted">
                Complete control over staff, academics, certificates and
                reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Contact Us</h2>

          <p className="text-center text-muted mb-5 px-2 px-md-5">
            Feel free to reach out to us for any queries or support.
          </p>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-6">
              <div className="card shadow-sm p-4">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your message"
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}

export default Landing;
