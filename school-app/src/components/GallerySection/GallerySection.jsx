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
        title: "Volleyball Winners",
        desc: "Our school volleyball team proudly celebrated their victory after winning medals in the sports competition.",
      },
      {
        img: "/sports2.jpg",
        title: "Tug of War",
        desc: "Students participated in the exciting tug of war event, showing strength, teamwork, and determination.",
      },
      {
        img: "/sports3.jpg",
        title: "Prize Distribution",
        desc: "Winners were honored on the podium for securing first, second, and third positions in the competition.",
      },
      {
        img: "/sports4.jpg",
        title: "ASMITA Khelo India",
        desc: "Students represented the school in the prestigious ASMITA Khelo India sports league and achieved great success.",
      },
      {
        img: "/sports5.jpg",
        title: "Prize Ceremony",
        desc: "Winners were honored with medals and trophies for outstanding performance.",
      },
    ],

    festival: [
      {
        img: "/festival1.jpg",
        title: "Traditional Dance Performance",
        desc: "Students performed colorful traditional dances, showcasing culture, talent, and festive spirit.",
      },
      {
        img: "/festival2.jpg",
        title: "Independence Day Celebration",
        desc: "Students celebrated Independence Day with patriotic performances, songs, and cultural activities.",
      },
      {
        img: "/festival3.jpg",
        title: "Festival Celebration",
        desc: "Students celebrated festivals together with traditional dress, decorations, and joyful activities.",
      },
      {
        img: "/festival4.jpg",
        title: "Janmashtami Celebration",
        desc: "Students dressed as Radha and Krishna to celebrate Janmashtami with devotion and enthusiasm.",
      },
      // {
      //   img: "/festival5.jpg",
      //   title: "Diwali Celebration",
      //   desc: "Students enjoyed cultural activities and festive decorations during Diwali celebration.",
      // },
    ],

    events: [
      {
        img: "/event1.jpg",
        title: "Tree Plantation Drive",
        desc: "Students participated in a tree plantation drive to promote environmental awareness and a greener future.",
      },
      {
        img: "/event2.jpg",
        title: "Swachhata Abhiyan",
        desc: "Students actively took part in the Swachhata campaign to spread awareness about cleanliness and hygiene.",
      },
      {
        img: "/event3.jpg",
        title: "Red Cross Activity",
        desc: "Students participated in Red Cross activities to learn about social service, health awareness, and community support.",
      },
      {
        img: "/event4.jpg",
        title: "Cleanliness Drive",
        desc: "Students worked together in a cleanliness drive to keep the surroundings clean and promote responsibility.",
      },
      // {
      //   img: "/event5.jpg",
      //   title: "School Seminar",
      //   desc: "Educational seminars conducted for students to enhance knowledge and awareness.",
      // },
    ],

    airobotics: [
      // {
      //   img: "/ai-robotics.jpg", // 👉 अपनी image यहाँ डालना
      //   title: "AI & Robotics Lab Activity",
      //   desc: "Students explored Artificial Intelligence and Robotics through practical experiments, coding and hands-on robotic projects.",
      // },
      {
        img: "/ai2.jpg",
        title: "Robot Programming",
        desc: "Students learned programming logic by building and controlling small robots.",
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
grid-template-columns:repeat(5,1fr);   /* 👉 1 row = 5 cards */
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
