/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../utils/cartSlice";
import { toggleNewOrderAdded } from "../../utils/orderSlice";
import { CREATE_PAYMENT_INTENT, CREATE_ORDER } from "../../utils/mutations";
import { ClipLoader } from "react-spinners";
import styles from "./Payment.module.css";

function Payment({ setPaymentHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { loading, error }] = useMutation(CREATE_PAYMENT_INTENT);
  const [createOrder, { loading: orderLoading, error: orderError }] = useMutation(CREATE_ORDER);

  // Retrieve the cart total
  const cart = useSelector((state) => state.cart);
  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * 0.13;
  const shipping = subTotal > 100 ? 0 : 10;
  const total = subTotal + tax + shipping;

  // Fetch user from global state
  const user = useSelector((state) => state.auth.user);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#e6f1ff",
        fontSize: "20px",
        "::placeholder": {
          color: "#e6f1ff",
        },
        backgroundColor: "#00010a",
      },
      invalid: {
        color: "#da0016",
        iconColor: "#da0016",
      },
    },
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements has not been properly initialized");
      return;
    }
    try {
      const { data: paymentIntentResponse } = await createPaymentIntent({
        variables: { amount: total * 100 },
      });

      if (!paymentIntentResponse.createPaymentIntent.success) {
        throw new Error("Failed to create payment intent.");
      }

      const paymentMethodResponse = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (paymentMethodResponse.error) {
        throw new Error(paymentMethodResponse.error.message);
      }

      const confirmCardPayment = await stripe.confirmCardPayment(
        paymentIntentResponse.createPaymentIntent.clientSecret,
        {
          payment_method: paymentMethodResponse.paymentMethod.id,
        },
      );

      if (confirmCardPayment.error) {
        throw new Error(confirmCardPayment.error.message);
      }

      if (confirmCardPayment.paymentIntent.status !== "succeeded") {
        throw new Error("Payment could not be processed. Please try again.");
      }

      // Save order to user account
      const orderData = {
        user: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        shippingAddress: {
          street: user.address,
          city: user.city,
          province: user.stateProvince,
          postalCode: user.postalCode,
          country: user.country,
        },
        total,
        subTotal,
        tax,
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          brand: item.brand,
          model: item.model,
          image: item.imageURL,
        })),
      };

      try {
        const { data: orderResponse } = await createOrder({
          variables: {
            ...orderData,
          },
        });

        if (!orderResponse.createOrder._id) {
          throw new Error("Failed to create order.");
        }

        // This will trigger a refetch of the user's order history
        dispatch(toggleNewOrderAdded());

        // Clear the cart
        localStorage.removeItem("cart");

        // Clear the cart in Redux state
        dispatch(clearCart());

        // Redirect to the order confirmation page
        navigate("/order-confirmation"); // Redirect to the order confirmation page
      } catch (orderCreationError) {
        console.error("Error during order creation:", orderCreationError.message);
      }
    } catch (stripeError) {
      // Display stripeError.message to the user
      console.error(stripeError.message);
      // Set the error in a state to show in the UI, if needed.
    }
  };

  useEffect(() => {
    if (setPaymentHandler) {
      setPaymentHandler(handleSubmit);
    }
  }, [setPaymentHandler]);

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.heading}>Payment Details</h3>
        <p>Please enter your credit card details below.</p>
      </div>
      <form>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        {loading && <ClipLoader color="#e6f1ff" />}
        {error && <div className={styles.error}>Error: {error.message}</div>}

        {/* Display order creation loading state */}
        {orderLoading && <ClipLoader color="#e6f1ff" description="Creating order..." />}

        {/* Display order creation error */}
        {orderError && (
          <div className={styles.error}>Order Creation Error: {orderError.message}</div>
        )}
      </form>
    </div>
  );
}

export default Payment;
