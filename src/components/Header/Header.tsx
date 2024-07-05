import React from "react";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <div className={styles.header}>
      <BurgerMenu />
      <Link href={"/"}>
        <img src="logo.gif" alt="" style={{ width: "200px" }} />
      </Link>
    </div>
  );
};

export default Header;
