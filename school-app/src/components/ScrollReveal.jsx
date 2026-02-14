import { motion } from "framer-motion";

function ScrollReveal({ children, delay = 0, direction = "left" }) {
  const xValue = direction === "left" ? -80 : 80;

  return (
    <motion.div
      initial={{ opacity: 0, x: xValue }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
