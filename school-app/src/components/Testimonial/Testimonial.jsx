import { useEffect, useState } from "react";

function Testimonial() {
  const testimonials = [
    { img: "/about1.jpg", text: "Academic excellence with strong values." },
    { img: "/about2.jpg", text: "Smart classrooms enhancing learning." },
    { img: "/about3.jpg", text: "Sports building leadership skills." },
    { img: "/about4.jpg", text: "Safe and disciplined campus." },
    { img: "/about5.jpg", text: "Creative co-curricular exposure." },
    { img: "/about6.jpg", text: "Holistic personality development." },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Get visible 3 slides
  const getSlides = () => {
    const prev = index === 0 ? testimonials.length - 1 : index - 1;
    const next = index === testimonials.length - 1 ? 0 : index + 1;

    return [prev, index, next];
  };

  const visibleSlides = getSlides();

  return (
    <section className="testimonial-section">
      <div className="testimonial-wrapper">
        {visibleSlides.map((slideIndex, i) => (
          <div key={i} className={`card ${i === 1 ? "active" : ""}`}>
            <img src={testimonials[slideIndex].img} alt="" />
            <div className="overlay">
              <p>{testimonials[slideIndex].text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={index === i ? "active" : ""}
            onClick={() => setIndex(i)}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      <style>{`

.testimonial-section {
  padding: 100px 0;
  background: #f5f8f6;
  transition: 0.4s ease;
}

/* Dark Mode */
body.dark-mode .testimonial-section {
  background: #121212;
}

/* Wrapper */
.testimonial-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  max-width: 1300px;
  margin: auto;
  padding: 0 40px;
}

/* Card */
.card {
  flex: 1;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transform: scale(0.9);
  transition: all 0.5s ease;
  opacity: 0.6;
}

.card.active {
  transform: scale(1);
  opacity: 1;
}

.card img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

/* Remove white boxes */
.overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  max-width: 80%;
}

.overlay p {
  margin: 0;
  font-size: 16px;
}

/* Pagination Centered */
/* ===== Pagination Proper Center ===== */

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;   /* 🔥 Center horizontally */
  align-items: center;
  gap: 12px;
  margin-top: 60px;
  padding: 20px 0;          /* Top & Bottom spacing */
}

.pagination button {
  min-width: 45px;
  height: 45px;
  border: none;
  background: #e5e7eb;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button.active {
  background: #16a34a;
  color: white;
  transform: scale(1.15);
}

.pagination button:hover {
  background: #22c55e;
  color: white;
}

/* Dark Mode */
body.dark-mode .pagination button {
  background: #2c2c2c;
  color: white;
}

body.dark-mode .pagination button.active {
  background: #22c55e;
}


/* Responsive */
@media (max-width: 992px) {
  .testimonial-wrapper {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}

`}</style>
    </section>
  );
}

export default Testimonial;
