"use client";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  const homePage = "/models";
  return (
    path == homePage && (
      <footer className={styles.footer}>
        The Dragon Model Managment
        <div className={styles.socials}></div>
      </footer>
    )
  );
}
