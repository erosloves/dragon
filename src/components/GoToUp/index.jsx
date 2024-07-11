import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const GoToUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    const screenHeight = document.documentElement.scrollHeight / 2;
    if (scrolled > screenHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    isVisible && (
      <motion.div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          transform: "rotate(90deg)",
          cursor: "pointer",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={scrollToTop}
      >
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="25"
            cy="25"
            r="24"
            stroke="#9d9d9d6b"
            strokeWidth="2"
            fill="#9d9d9d6b"
          />

          <polyline
            points="30,15 20,25 30,35"
            stroke="#9d9d9d6b"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>
    )
  );
};

export default GoToUp;
