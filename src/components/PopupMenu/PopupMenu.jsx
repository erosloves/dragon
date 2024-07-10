"use client";
import React, { useContext } from "react";
import Link from "next/link";
import styles from "./PopupMenu.module.css";
import { ToggleMenuContext } from "@/contexts/ToggleMenu";
import { useToggleMenuContext } from "@/contexts/ToggleMenu";
import { paths } from "@/app/paths";
import { AnimatePresence, motion } from "framer-motion";
export const PopupMenu = ({}) => {
  const toggle = useContext(ToggleMenuContext);
  const { toggleMenuVisible } = useToggleMenuContext();
  return (
    <AnimatePresence>
      {toggle.isMenuVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={styles.popupWrapper}
        >
          <Link
            href={paths.home}
            className={styles.li}
            onClick={() => {
              toggleMenuVisible();
            }}
          >
            Home
          </Link>
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
            Casting
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
