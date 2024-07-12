"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";
const Header = ({}) => {
  const path = usePathname();
  const homePage = "/";
  console.log();
  return (
    <AnimatePresence>
      {!(path == homePage) && (
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className={styles.header}
        >
          <BurgerMenu />
          <Link href={"/"} className={styles.logo}>
            <img src="/logo.png" alt="The dranon MM" />
          </Link>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
