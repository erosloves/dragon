import React from "react";
import Link from "next/link";

import styles from "./Header.module.css";
import Image from "next/image";
const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "30px",
            fontFamily: "NeueHaasDisplayThin",
            fontWeight: "lighter",
            letterSpacing: "8px",
          }}
        >
          The Dragon Model Management
        </div>
      </Link>
    </div>
  );
};

export default Header;
