// import Home from "../components/Home/Home";
// import About from "../components/About/About";
// import Contact from "../components/Contact/Contact";
// import Footer from "../components/Footer/Footer";
// import ScrollReveal from "../components/ScrollReveal";
// import Testimonial from "../components/Testimonial/Testimonial";
// import SocialSidebar from "../components/SocialSidebar/SocialSidebar";
// import ChatBot from "../components/ChatBot/ChatBot";
// import GallerySection from "../components/GallerySection/GallerySection";

// function Landing() {
//   return (
//     <>
//       <SocialSidebar />
//       <ChatBot />

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

//       {/* ✅ GALLERY SECTION ADDED HERE */}
//       <ScrollReveal>
//         <GallerySection />
//       </ScrollReveal>

//       <div id="contact">
//         <ScrollReveal>
//           <Contact />
//         </ScrollReveal>
//       </div>

//       <ScrollReveal>
//         <Testimonial />
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
import SocialSidebar from "../components/SocialSidebar/SocialSidebar";
import ChatBot from "../components/ChatBot/ChatBot";
import GallerySection from "../components/GallerySection/GallerySection";
import FeesStructure from "../components/FeesStructure/FeesStructure";

function Landing() {
  return (
    <>
      {/* Fixed Components */}
      <SocialSidebar />
      <ChatBot />

      {/* HOME */}
      <section id="home">
        <ScrollReveal>
          <Home />
        </ScrollReveal>
      </section>

      {/* ABOUT */}
      <section id="about">
        <ScrollReveal>
          <About />
        </ScrollReveal>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <ScrollReveal>
          <GallerySection />
        </ScrollReveal>
      </section>

      {/* FEES & UNIFORM */}
      <section id="fees">
        <ScrollReveal>
          <FeesStructure />
        </ScrollReveal>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </>
  );
}

export default Landing;
