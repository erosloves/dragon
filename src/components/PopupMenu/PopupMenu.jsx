"use client";
import React, { useContext } from "react";
import Link from "next/link";
import styles from "./PopupMenu.module.css";
import { ToggleMenuContext } from "@/contexts/ToggleMenu";
import { useToggleMenuContext } from "@/contexts/ToggleMenu";
import { paths } from "@/app/paths";
export const PopupMenu = ({}) => {
  const toggle = useContext(ToggleMenuContext);
  const { toggleMenuVisible } = useToggleMenuContext();
  return (
    <div
      className={
        toggle.isMenuVisible ? styles.popupMenuActive : styles.popupMenuDisabled
      }
    >
      <div className={styles.popupMenuWrapper}>
        <nav className={styles.nav}>
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
          {/* <Link
            href={paths.form}
            className={styles.li}
            onClick={() => {
              toggleMenuVisible();
            }}
          >
            Become a model
          </Link> */}

          <Link
            href="https://t.me/thedragonmm_bot"
            className={styles.li}
            target="_blank"
          >
            Casting to agency
          </Link>
        </nav>
      </div>
    </div>
  );
};
