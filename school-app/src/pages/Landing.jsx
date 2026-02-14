// import Home from "../components/home/Home";
// import About from "../components/about/About";
// import Contact from "../components/contact/Contact";
// import Footer from "../components/footer/Footer";

// function Landing() {
//   return (
//     <>
//       {/* HERO SECTION */}
//       <Home />

//       {/* ABOUT SECTION */}
//       <section id="about">
//         <About />
//       </section>

//       {/* CONTACT SECTION */}
//       <section id="contact">
//         <Contact />
//       </section>

//       {/* FOOTER */}
//       <Footer />
//     </>
//   );
// }

// export default Landing;
import Home from "../components/home/Home";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import ScrollReveal from "../components/ScrollReveal";

function Landing() {
  return (
    <>
      <ScrollReveal>
        <Home />
      </ScrollReveal>

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </>
  );
}

export default Landing;
