// import { useState } from "react";

// function GallerySection() {
//   const [category, setCategory] = useState("sports");

//   const data = {
//     sports: [
//       {
//         img: "/sports1.jpg",
//         title: "Sports Day",
//         desc: "Students participated in track and field events including races, long jump and relay competitions.",
//       },
//       {
//         img: "/sports2.jpg",
//         title: "Tournament",
//         desc: "Inter-school tournament promoting teamwork and sportsmanship.",
//       },
//       {
//         img: "/sports3.jpg",
//         title: "Championship",
//         desc: "Exciting football matches showcasing discipline and team coordination.",
//       },
//       {
//         img: "/sports4.jpg",
//         title: "Competition",
//         desc: "Students competed in various athletic categories with great enthusiasm.",
//       },
//       {
//         img: "/sports5.jpg",
//         title: "Prize Distribution Ceremony",
//         desc: "Winners were honored with medals and trophies for outstanding performance.",
//       },
//     ],

//     festival: [
//       {
//         img: "/festival1.jpg",
//         title: "Celebration",
//         desc: "Students celebrated Diwali with traditional attire, dance performances and decorations.",
//       },
//       {
//         img: "/festival2.jpg",
//         title: "Independence Day",
//         desc: "Flag hoisting ceremony followed by patriotic songs and cultural performances.",
//       },
//       {
//         img: "/festival3.jpg",
//         title: "Festival",
//         desc: "A colorful celebration filled with joy, unity and festive spirit.",
//       },
//       {
//         img: "/festival4.jpg",
//         title: "Cultural Fest",
//         desc: "Students showcased traditional dances and cultural heritage performances.",
//       },
//     ],

//     events: [
//       {
//         img: "/event1.jpg",
//         title: "Science Exhibition",
//         desc: "Innovative science projects presented by students demonstrating creativity and learning.",
//       },
//       {
//         img: "/event2.jpg",
//         title: "Annual Cultural Function",
//         desc: "Grand annual celebration with dance, drama and music performances.",
//       },
//       {
//         img: "/event3.jpg",
//         title: "Award Ceremony",
//         desc: "Students recognized for academic excellence and co-curricular achievements.",
//       },
//       {
//         img: "/event4.jpg",
//         title: "Workshop",
//         desc: "Interactive sessions conducted to enhance practical knowledge and skills.",
//       },
//     ],
//   };

//   return (
//     <section className="gallery-section">
//       <div className="gallery-header">
//         <h2>Our Activities</h2>

//         <div className="select-container">
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="sports">Sports</option>
//             <option value="festival">Festival</option>
//             <option value="events">Events</option>
//           </select>
//         </div>
//       </div>

//       <div className="gallery-grid">
//         {data[category].map((item, index) => (
//           <div className="gallery-card" key={index}>
//             <div className="image-wrapper">
//               <img src={item.img} alt={item.title} />
//             </div>
//             <div className="gallery-content">
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style>{`

// /* SECTION */

// .gallery-section {
//   padding: 90px 8%;
//   background: #F4F6F8;
// }

// /* HEADER */

// .gallery-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 50px;
//   flex-wrap: wrap;
// }

// .gallery-header h2 {
//   font-size: 2.5rem;
//   color: #0F4C6C;
//   font-weight: 700;
// }

// /* DROPDOWN */

// .select-container select {
//   padding: 12px 55px 12px 22px;
//   border-radius: 50px;
//   border: 2px solid #0F4C6C;
//   background: white;
//   font-weight: 600;
//   cursor: pointer;
// }

// /* GRID */

// .gallery-grid {
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 25px;
// }

// /* CARD */

// .gallery-card {
//   background: white;
//   border-radius: 18px;
//   overflow: hidden;
//   box-shadow: 0 15px 35px rgba(15,76,108,0.08);
//   transition: 0.4s;
// }

// .gallery-card:hover {
//   transform: translateY(-10px);
// }

// /* IMAGE */

// .image-wrapper img {
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
// }

// /* CONTENT */

// .gallery-content {
//   padding: 20px;
// }

// .gallery-content h3 {
//   color: #0F4C6C;
//   margin-bottom: 10px;
// }

// .gallery-content p {
//   font-size: 0.9rem;
//   color: #555;
// }

// /* DARK MODE */

// body.dark-mode .gallery-section {
//   background: #0E1A24;
// }

// body.dark-mode .gallery-card {
//   background: #1B2A35;
// }

// body.dark-mode .gallery-content h3 {
//   color: #fff;
// }

// body.dark-mode .gallery-content p {
//   color: #CBD5E1;
// }

// /* RESPONSIVE */

// @media (max-width:1200px){
// .gallery-grid{
// grid-template-columns: repeat(3,1fr);
// }
// }

// @media (max-width:768px){
// .gallery-grid{
// grid-template-columns: repeat(2,1fr);
// }
// }

// @media (max-width:480px){
// .gallery-grid{
// grid-template-columns: 1fr;
// }
// }

// `}</style>
//     </section>
//   );
// }

// export default GallerySection;
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
        desc: "Inter-school tournament promoting teamwork and sportsmanship.",
      },
      {
        img: "/sports3.jpg",
        title: "Championship",
        desc: "Exciting football matches showcasing discipline and team coordination.",
      },
      {
        img: "/sports4.jpg",
        title: "Competition",
        desc: "Students competed in various athletic categories with great enthusiasm.",
      },
      // {
      //   img: "/sports5.jpg",
      //   title: "Prize Distribution Ceremony",
      //   desc: "Winners were honored with medals and trophies for outstanding performance.",
      // },
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
        title: "Festival",
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
        title: "Workshop",
        desc: "Interactive sessions conducted to enhance practical knowledge and skills.",
      },
    ],

    airobotics: [
      {
        img: "/sports5.jpg",
        title: "Prize Distribution Ceremony",
        desc: "Winners were honored with medals and trophies for outstanding performance.",
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
            <option value="sports">Sports</option>
            <option value="festival">Festival</option>
            <option value="events">Events</option>
            <option value="airobotics">AI & Robotics</option>
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

.gallery-section{
padding:90px 8%;
background:#F4F6F8;
}

/* HEADER */

.gallery-header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:50px;
flex-wrap:wrap;
}

.gallery-header h2{
font-size:2.5rem;
color:#0F4C6C;
font-weight:700;
}

/* DROPDOWN */

.select-container select{
padding:12px 55px 12px 22px;
border-radius:50px;
border:2px solid #0F4C6C;
background:white;
font-weight:600;
cursor:pointer;
}

/* GRID */

.gallery-grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:25px;
}

/* CARD */

.gallery-card{
background:white;
border-radius:18px;
overflow:hidden;
box-shadow:0 15px 35px rgba(15,76,108,0.08);
transition:0.4s;
}

.gallery-card:hover{
transform:translateY(-10px);
}

/* IMAGE */

.image-wrapper img{
width:100%;
height:200px;
object-fit:cover;
}

/* CONTENT */

.gallery-content{
padding:20px;
}

.gallery-content h3{
color:#0F4C6C;
margin-bottom:10px;
}

.gallery-content p{
font-size:0.9rem;
color:#555;
}

/* DARK MODE */

body.dark-mode .gallery-section{
background:#0E1A24;
}

body.dark-mode .gallery-card{
background:#1B2A35;
}

body.dark-mode .gallery-content h3{
color:#fff;
}

body.dark-mode .gallery-content p{
color:#CBD5E1;
}

/* RESPONSIVE */

@media(max-width:1200px){
.gallery-grid{
grid-template-columns:repeat(3,1fr);
}
}

@media(max-width:768px){
.gallery-grid{
grid-template-columns:repeat(2,1fr);
}
}

@media(max-width:480px){
.gallery-grid{
grid-template-columns:1fr;
}
}

      `}</style>
    </section>
  );
}

export default GallerySection;
