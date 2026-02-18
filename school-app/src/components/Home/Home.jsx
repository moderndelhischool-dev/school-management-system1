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

@media (max-width: 576px) {
  .hero-overlay {
    background: rgba(0, 0, 0, 0.05);
  }
}

      `}</style>
    </section>
  );
}

export default Home;
