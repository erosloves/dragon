import css from "./index.module.css";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NavigationBetween({ path, setPath, h2value }) {
  const [isDisabledPre, setDisabledPre] = useState(false);
  const [isDisabledNext, setDisabledNext] = useState(false);

  const handleClick = () => {
    console.log(path);
  };

  return (
    <div className={css.wrapper}>
      <div onClick={() => handleClick()}>
        <Link
          href={"/model-bio/" + (path - 1)}
          className={css.btn}
          style={{ transform: "scaleX(-1)" }}
        >
          ➜
        </Link>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className={css.paramType}
      >
        {h2value}
      </motion.h2>
      <div onClick={() => setPath(path + 1)}>
        <Link href={"/model-bio/" + (path + 1)} className={css.btn}>
          ➜
        </Link>
      </div>
    </div>
  );
}
