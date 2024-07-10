import React from "react";
import Link from "next/link";

import styles from "./Header.module.css";
import Image from "next/image";
const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        {/* The Dragon Model Management */}
        <img src="/logo.png" />
      </Link>
    </div>
  );
};

export default Header;
