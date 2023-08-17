import React from "react";
import styles from "./OrderConfirmation.module.css";

function OrderConfirmation() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Thank you for your order!</h1>
      <p className={styles.info}>
        Your payment has been successful. You will receive a confirmation email shortly.
      </p>
    </div>
  );
}

export default OrderConfirmation;
