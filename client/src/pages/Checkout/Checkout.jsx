/* eslint-disable no-return-assign */
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../../components/SubmitButton";
import ShippingDetails from "../../components/ShippingDetails";
import Payment from "../../components/Payment";
import OrderSummary from "../../components/OrderSummary";
import styles from "./Checkout.module.css";

function Checkout() {
  // Get cart from global state
  const cart = useSelector((state) => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return state.cart;
  });

  const paymentHandlerRef = useRef(null);

  const handleOrderSubmit = async () => {
    if (paymentHandlerRef.current) {
      await paymentHandlerRef.current();
    }
  };

  // Fetch user from global state
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Checkout</h1>
      </div>
      <div className={styles.shippingDetails}>
        <ShippingDetails user={user} />
      </div>
      <div className={styles.orderSummary}>
        <OrderSummary cart={cart} />
      </div>
      <div className={styles.paymentDetails}>
        <Payment setPaymentHandler={(handler) => (paymentHandlerRef.current = handler)} />
      </div>
      <div className={styles.button}>
        <SubmitButton text="Place Order" onClick={handleOrderSubmit} />
      </div>
    </div>
  );
}

export default Checkout;
