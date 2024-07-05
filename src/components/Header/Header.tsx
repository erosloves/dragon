import React from "react";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import styles from "./Header.module.css";
import Image from "next/image";
const Header = () => {
  return (
    <div className={styles.header}>
      <BurgerMenu />
      <Link href={"/"}>
        {/* <Image
          src={"/logo.gif"}
          alt=""
          width={150}
          height={100}
          style={{ objectFit: "cover" }}
        /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            fontSize: "30px",
          }}
        >
          THE NORMAL AGENCY
        </div>
      </Link>
    </div>
  );
};

export default Header;
