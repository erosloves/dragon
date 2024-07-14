import { motion, AnimatePresence } from "framer-motion";

import style from "./Notification.module.css";
import { useContext } from "react";
import { NotificationContext } from "@/contexts/notification";
const notifyVariants = {
  initial: { y: -200, x: "-50%", opacity: 0 },
  animate: { y: 20, opacity: 1 },
};
export default function Notification() {
  const { isNotifyVisible, notifyData } = useContext(NotificationContext);
  const calcStatus = () => {
    switch (notifyData.status) {
      case "ok":
        return style.ok;
      case "error":
        return style.error;
      default:
        return style.ok;
    }
  };
  return (
    <AnimatePresence>
      {isNotifyVisible && (
        <motion.div
          transition={{ ease: "easeInOut", duration: 0.5 }}
          initial="initial"
          animate="animate"
          exit="initial"
          variants={notifyVariants}
          className={`${style.notify} ${calcStatus()}`}
        >
          {notifyData.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
