import React from "react";
import Link from "next/link";

import styles from "./Header.module.css";
const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={"/"}>
        {/* The Dragon Model Management */}
        <img src="/logo.png" alt="The dranon MM" />
      </Link>
    </div>
  );
};

export default Header;
