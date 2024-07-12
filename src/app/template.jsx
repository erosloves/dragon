"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function Transition({ children }) {
  const templateVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={`template`}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={templateVariants}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="container"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
