import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/pro-light-svg-icons";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  // Calculate the total number of items in the cart
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.cart}>
      <Link to="/cart">
        <FontAwesomeIcon icon={faCartShopping} />
        {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
      </Link>
    </div>
  );
}

export default Cart;
