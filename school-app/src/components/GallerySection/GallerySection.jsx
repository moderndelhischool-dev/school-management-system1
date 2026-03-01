import { useState } from "react";

function GallerySection() {
  const [category, setCategory] = useState("sports");

  const data = {
    sports: [
      {
        img: "/sports1.jpg",
        title: "Sports Day",
        desc: "Students participated in track and field events including races, long jump and relay competitions.",
      },
      {
        img: "/sports2.jpg",
        title: "Tournament",
        desc: "Inter-school  tournament promoting teamwork and sportsmanship.",
      },
      {
        img: "/sports3.jpg",
        title: " Championship",
        desc: "Exciting football matches showcasing discipline and team coordination.",
      },
      {
        img: "/sports4.jpg",
        title: " Competition",
        desc: "Students competed in various athletic categories with great enthusiasm.",
      },
      {
        img: "/sports5.jpg",
        title: "Prize Distribution Ceremony",
        desc: "Winners were honored with medals and trophies for outstanding performance.",
      },
    ],

    festival: [
      {
        img: "/festival1.jpg",
        title: "Celebration",
        desc: "Students celebrated Diwali with traditional attire, dance performances and decorations.",
      },
      {
        img: "/festival2.jpg",
        title: "Independence Day",
        desc: "Flag hoisting ceremony followed by patriotic songs and cultural performances.",
      },
      {
        img: "/festival3.jpg",
        title: " Festival",
        desc: "A colorful celebration filled with joy, unity and festive spirit.",
      },
      {
        img: "/festival4.jpg",
        title: "Cultural Fest",
        desc: "Students showcased traditional dances and cultural heritage performances.",
      },
    ],

    events: [
      {
        img: "/event1.jpg",
        title: "Science Exhibition",
        desc: "Innovative science projects presented by students demonstrating creativity and learning.",
      },
      {
        img: "/event2.jpg",
        title: "Annual Cultural Function",
        desc: "Grand annual celebration with dance, drama and music performances.",
      },
      {
        img: "/event3.jpg",
        title: "Award Ceremony",
        desc: "Students recognized for academic excellence and co-curricular achievements.",
      },
      {
        img: "/event4.jpg",
        title: " Workshop",
        desc: "Interactive sessions conducted to enhance practical knowledge and skills.",
      },
    ],
  };

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>Our Activities</h2>

        <div className="select-container">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="sports"> Sports</option>
            <option value="festival">Festival</option>
            <option value="events">Events</option>
          </select>
        </div>
      </div>

      <div className="gallery-grid">
        {data[category].map((item, index) => (
          <div className="gallery-card" key={index}>
            <div className="image-wrapper">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="gallery-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
       .gallery-section {
  padding: 90px 8%;
  background: #f3f4f6;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.gallery-header h2 {
  font-size: 2.5rem;
  color: #6d28d9;
  font-weight: 700;
}

/* ========================= */
/* PREMIUM DROPDOWN */
/* ========================= */

.select-container {
  position: relative;
}

.select-container select {
  padding: 12px 55px 12px 22px;
  border-radius: 50px;
  border: 2px solid #6d28d9;
  background: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(109, 40, 217, 0.15);
}

/* Hover */
.select-container select:hover {
  background: #f5f3ff;
  box-shadow: 0 15px 35px rgba(109, 40, 217, 0.25);
}

/* Focus */
.select-container select:focus {
  outline: none;
  border-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.25);
}

/* Custom Arrow */
.select-container::after {
  content: "⌄";
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  font-weight: bold;
  color: #6d28d9;
  pointer-events: none;
}

/* Option styling (limited control by browser) */
.select-container select option {
  padding: 12px;
  font-weight: 500;
  background: #ffffff;
  color: #111827;
}

/* ========================= */
/* GALLERY GRID */
/* ========================= */

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 35px;
}

.gallery-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.gallery-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-card:hover img {
  transform: scale(1.08);
}

.gallery-content {
  padding: 25px;
}

.gallery-content h3 {
  margin-bottom: 12px;
  font-weight: 600;
  color: #111827;
}

.gallery-content p {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .gallery-header {
    flex-direction: column;
    gap: 20px;
  }
}
      `}</style>
    </section>
  );
}

export default GallerySection;
