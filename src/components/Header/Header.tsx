import React from "react";
import Link from "next/link";

import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        {/* The Dragon Model Management */}
        <img src="/logo.png" alt="The dranon MM" />
      </Link>
    </header>
  );
};

export default Header;
