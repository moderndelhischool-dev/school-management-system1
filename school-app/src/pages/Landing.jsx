// import Home from "../components/Home/Home";
// import About from "../components/About/About";
// import Contact from "../components/Contact/Contact";
// import Footer from "../components/Footer/Footer";
// import ScrollReveal from "../components/ScrollReveal";
// import Testimonial from "../components/Testimonial/Testimonial";
// import SocialSidebar from "../components/SocialSidebar/SocialSidebar";
// function Landing() {
//   return (
//     <>
//       <div id="home">
//         <ScrollReveal>
//           <Home />
//         </ScrollReveal>
//       </div>

//       <div id="about">
//         <ScrollReveal>
//           <About />
//         </ScrollReveal>
//       </div>

//       <div id="contact">
//         <ScrollReveal>
//           <Contact />
//         </ScrollReveal>
//       </div>

//       <ScrollReveal>
//         <Testimonial />
//       </ScrollReveal>

//       <ScrollReveal>
//         <SocialSidebar />
//       </ScrollReveal>

//       <ScrollReveal>
//         <Footer />
//       </ScrollReveal>
//     </>
//   );
// }

// export default Landing;
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import ScrollReveal from "../components/ScrollReveal";
import Testimonial from "../components/Testimonial/Testimonial";
import SocialSidebar from "../components/SocialSidebar/SocialSidebar";
import ChatBot from "../components/ChatBot/ChatBot"; // ✅ NEW IMPORT

function Landing() {
  return (
    <>
      {/* Fixed Components */}
      <SocialSidebar />
      <ChatBot /> {/* ✅ Chatbot Added */}
      {/* Sections */}
      <div id="home">
        <ScrollReveal>
          <Home />
        </ScrollReveal>
      </div>
      <div id="about">
        <ScrollReveal>
          <About />
        </ScrollReveal>
      </div>
      <div id="contact">
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <Testimonial />
      </ScrollReveal>
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </>
  );
}

export default Landing;
