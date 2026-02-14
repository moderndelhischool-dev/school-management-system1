// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// function ZoomCenterSection() {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
//   const borderRadius = useTransform(scrollYProgress, [0, 1], [25, 0]);

//   return (
//     <section
//       ref={ref}
//       style={{
//         height: "120vh",
//         background: "#f8f9fa",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <motion.img
//         src="/center.jpg"
//         alt="zoom"
//         style={{
//           width: "60%",
//           maxWidth: "800px",
//           scale,
//           borderRadius,
//         }}
//       />
//     </section>
//   );
// }

// export default ZoomCenterSection;
