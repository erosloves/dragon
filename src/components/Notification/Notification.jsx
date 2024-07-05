import { motion } from "framer-motion";

import style from "./Notification.module.css";

const notifyVariants = {
  initial: { y: -200, x: "-50%", opacity: 0 },
  animate: { y: -90, opacity: 1 },
};
export default function Notification({ isVisible, notifyData }) {
  return (
    <motion.div
      transition={{ ease: "easeInOut", duration: 0.5 }}
      initial="initial"
      //   animate="animate"
      animate={isVisible ? "animate" : "initial"}
      exit="initial"
      variants={notifyVariants}
      className={style.notify}
      style={
        notifyData.status == "ok"
          ? {
              backgroundColor: "#9fea99",
              color: "green",
            }
          : {
              backgroundColor: "#ea9999",
              color: "red",
            }
      }
    >
      {notifyData.text}
    </motion.div>
  );
}
