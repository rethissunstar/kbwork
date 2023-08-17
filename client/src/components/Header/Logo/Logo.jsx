import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.container}>
      <span className={styles.logo}>KB FANATICS</span>
    </Link>
  );
}

export default Logo;
