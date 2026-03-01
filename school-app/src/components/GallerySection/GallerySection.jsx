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

/* ========================= */
/* SECTION */
/* ========================= */

.gallery-section {
  padding: 90px 8%;
  background: #F4F6F8;
  transition: 0.3s ease;
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
  color: #0F4C6C;
  font-weight: 700;
}

/* ========================= */
/* DROPDOWN */
/* ========================= */

.select-container {
  position: relative;
}

.select-container select {
  padding: 12px 55px 12px 22px;
  border-radius: 50px;
  border: 2px solid #0F4C6C;
  background: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(15, 76, 108, 0.15);
}

.select-container select:hover {
  background: #EAF3F8;
  box-shadow: 0 15px 35px rgba(15, 76, 108, 0.25);
}

.select-container select:focus {
  outline: none;
  border-color: #D4A24C;
  box-shadow: 0 0 0 4px rgba(212,162,76,0.25);
}

.select-container::after {
  content: "⌄";
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  font-weight: bold;
  color: #0F4C6C;
  pointer-events: none;
}

/* ========================= */
/* GRID */
/* ========================= */

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 35px;
}

/* ========================= */
/* CARD */
/* ========================= */

.gallery-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(15,76,108,0.08);
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}

/* POP + GOLD GLOW */
.gallery-card:hover {
  transform: translateY(-18px) scale(1.03);
  box-shadow: 
    0 30px 60px rgba(15,76,108,0.18),
    0 0 25px rgba(212,162,76,0.35);
}

/* Animated Top Gold Line */
.gallery-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg,#D4A24C,#F5D08A);
  transition: 0.4s ease;
}

.gallery-card:hover::before {
  width: 100%;
}

/* IMAGE */
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
  transform: scale(1.12);
}

/* CONTENT */
.gallery-content {
  padding: 25px;
  transition: 0.3s ease;
}

.gallery-content h3 {
  margin-bottom: 12px;
  font-weight: 600;
  color: #0F4C6C;
  transition: 0.3s ease;
}

.gallery-card:hover .gallery-content h3 {
  color: #D4A24C;
}

.gallery-content p {
  font-size: 0.95rem;
  color: #4B5563;
  line-height: 1.6;
}

.gallery-card:hover .gallery-content {
  transform: translateY(-3px);
}

/* ========================= */
/* DARK MODE */
/* ========================= */

body.dark-mode .gallery-section {
  background: #0E1A24;
}

body.dark-mode .gallery-card {
  background: #1B2A35;
  box-shadow: 0 25px 60px rgba(0,0,0,0.6);
}

body.dark-mode .gallery-content h3 {
  color: #E5E7EB;
}

body.dark-mode .gallery-content p {
  color: #CBD5E1;
}

body.dark-mode .gallery-card:hover .gallery-content h3 {
  color: #D4A24C;
}

/* ========================= */
/* RESPONSIVE */
/* ========================= */

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
