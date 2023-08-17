import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashXmark, faPlus, faMinus } from "@fortawesome/pro-light-svg-icons";
import { addToCart, removeFromCart, updateQuantity } from "../../utils/cartSlice";
import SubmitButton from "../../components/SubmitButton";
import styles from "./Cart.module.css";

function Cart() {
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  const cart = useSelector((state) => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return state.cart;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item._id));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * 0.13; // 13% tax Ontario
  const shipping = subTotal > 100 ? 0 : 10; // free shipping over $100 otherwise $10 flat rate
  const total = subTotal + tax + shipping;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Cart</h1>
      {cart.length === 0 && <p className={styles.emptyList}>Your cart is empty</p>}

      {cart.length > 0 && (
        <div className={styles.checkout}>
          <div className={styles.cartHeadings}>
            <b>Product</b>
            <b>Price</b>
            <b>Quantity</b>
            <b>Remove</b>
          </div>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item._id} className={styles.cartItem}>
                <div>
                  <img src={item.imageURL} alt={item.brand} className={styles.itemImage} />
                </div>
                <div className={styles.itemInfo}>
                  <p>
                    {item.brand} {item.product} {item.model}
                  </p>
                </div>
                <p className={styles.itemPrice}>${item.price}</p>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.controlButton}
                    type="button"
                    onClick={() => handleDecrease(item)}
                  >
                    <FontAwesomeIcon icon={faMinus} className={styles.icons} />
                  </button>
                  <span className={styles.itemQuantity}>{item.quantity}</span>
                  <button
                    className={styles.controlButton}
                    type="button"
                    onClick={() => handleIncrease(item)}
                  >
                    <FontAwesomeIcon icon={faPlus} className={styles.icons} />
                  </button>
                </div>
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => handleRemove(item._id)}
                >
                  <FontAwesomeIcon icon={faTrashXmark} />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.totals}>
            <p className={styles.subTotal}>
              Sub-Total: <span>${subTotal.toFixed(2)}</span>
            </p>
            <p className={styles.tax}>
              Tax: <span>${tax.toFixed(2)}</span>
            </p>
            <p className={styles.shipping}>
              Shipping: <span>${shipping.toFixed(2)}</span>
            </p>
            <p className={styles.total}>
              Total: <span>${total.toFixed(2)}</span>
            </p>
          </div>
          <SubmitButton text="Checkout" onClick={goToCheckout} />
        </div>
      )}
    </div>
  );
}

export default Cart;
