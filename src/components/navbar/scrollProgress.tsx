import { motion, useScroll } from "framer-motion";
import React from "react";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
  );
}

export default ScrollProgress;
