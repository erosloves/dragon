"use client";
import { motion } from "framer-motion";
const templateVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};
export default function Transition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={templateVariants}
      transition={{ ease: "easeInOut", duration: 1 }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
