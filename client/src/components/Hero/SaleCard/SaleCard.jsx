import React from "react";
import styles from "./SaleCard.module.css";

function SaleCard() {
  return (
    <div>
      <div className={styles.card}>
        <h3>Summer Sale!</h3>
        <p>Up to 50% off on select items.</p>
      </div>
      <button type="button" className={styles.button}>
        Shop Now
      </button>
    </div>
  );
}

export default SaleCard;
