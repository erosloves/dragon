"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Transition({ children }) {
  const router = usePathname();
  const templateVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={usePathname}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={templateVariants}
        transition={{ ease: "easeInOut", duration: 1.5 }}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
