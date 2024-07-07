"use client";
import css from "./index.module.css";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function NavigationBetween({
  currentId,
  setCurrentId,
  h2value,
  modelsCount,
}) {
  const [isDisabledPre, setDisabledPre] = useState(false);
  const [isDisabledNext, setDisabledNext] = useState(false);

  useEffect(() => {
    if (currentId == 1) {
      setDisabledPre(true);
    }
    if (currentId == modelsCount) {
      setDisabledNext(true);
    }
  }, [isDisabledPre, isDisabledNext, currentId, modelsCount]);

  return (
    <div className={css.wrapper}>
      <div className={isDisabledPre ? css.btnDisabled : css.btn}>
        ➜
        {!isDisabledPre && (
          <Link
            href={"/model-bio/" + (currentId - 1)}
            onClick={() => {
              setCurrentId(--currentId);
            }}
          ></Link>
        )}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className={css.paramType}
      >
        {h2value}
      </motion.h2>
      <div className={isDisabledNext ? css.btnDisabled : css.btn}>
        ➜
        {!isDisabledNext && (
          <Link
            href={"/model-bio/" + (currentId + 1)}
            onClick={() => {
              setCurrentId(++currentId);
            }}
          ></Link>
        )}
      </div>
    </div>
  );
}
