/* eslint-disable react/prop-types */
import React from "react";
import styles from "./OrderSummary.module.css";

function OrderSummary({ cart }) {
  // Calculate the total price of the cart
  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * 0.13; // 13% tax Ontario
  const shipping = subTotal > 100 ? 0 : 10; // free shipping over $100 otherwise $10 flat rate
  const total = subTotal + tax + shipping;

  return (
    <div className={styles.container}>
      <h3>Order Summary</h3>
      <ul>
        {cart.map((item) => (
          <li key={item._id} className={styles.item}>
            <div className={styles.itemImage}>
              <img src={item.imageURL} alt={`${item.brand} ${item.model}`} />
            </div>
            <div>{`${item.brand} ${item.model ? ` ${item.model}` : ""}`}</div>
            <div>
              {item.quantity} x ${item.price.toFixed(2)}
            </div>
            <div>Subtotal: ${(item.quantity * item.price).toFixed(2)}</div>
          </li>
        ))}
      </ul>
      <hr className={styles.divider} />
      <div className={styles.totals}>
        <strong>Subtotal: ${subTotal.toFixed(2)}</strong>
        <strong>Tax: ${tax.toFixed(2)}</strong>
        <strong>Shipping: ${shipping.toFixed(2)}</strong>
        <strong className={styles.total}>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default OrderSummary;
