/* eslint-disable react/prop-types */
import React from "react";
import styles from "./AddToCartButton.module.css";

function AddToCartButton({ onClick }) {
  return (
    <button className={styles.button} type="button" aria-label="Add item to cart" onClick={onClick}>
      ADD TO CART
    </button>
  );
}

export default AddToCartButton;
