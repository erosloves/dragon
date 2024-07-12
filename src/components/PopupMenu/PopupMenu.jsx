"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "./PopupMenu.module.css";
import { ToggleMenuContext } from "@/contexts/ToggleMenu";
import { useToggleMenuContext } from "@/contexts/ToggleMenu";
import { paths } from "@/app/paths";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const PopupMenu = ({}) => {
  const path = usePathname();

  const { isMenuVisible, setMenuVisible, setBurgerOpen, toggleMenuVisible } =
    useContext(ToggleMenuContext);

  useEffect(() => {
    setMenuVisible(false);
    setBurgerOpen(false);
  }, [path, setMenuVisible, setBurgerOpen]);
  return (
    <AnimatePresence>
      {isMenuVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={styles.popupWrapper}
        >
          <Link
            href={paths.models}
            className={styles.li}
            onClick={() => {
              toggleMenuVisible();
            }}
          >
            Models
          </Link>
          <Link
            href={paths.contacts}
            className={styles.li}
            onClick={() => {
              toggleMenuVisible();
            }}
          >
            Contacts
          </Link>

          <Link
            href="https://t.me/thedragonmm_bot"
            className={styles.li}
            target="_blank"
          >
            {/* Casting */}
            Become a model
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
