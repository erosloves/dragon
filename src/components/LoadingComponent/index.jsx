import { Spin } from "antd";
import { motion } from "framer-motion";
import style from "./index.module.css";
const LoadingComponent = () => {
  return (
    <motion.div
      className={style.loadingComponent}
      key="loading"
      initial={{ opacity: 0, y: -10, x: "-10%" }}
      animate={{ opacity: 1, y: -10, x: "-10%" }}
      exit={{ opacity: 0, y: -10, x: "-10%" }}
      transition={{ duration: 0.3 }}
    >
      <Spin size="large" style={{ scale: 2, transform: "translateY(-50%)" }} />
    </motion.div>
  );
};

export default LoadingComponent;
