/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { useQuery } from "@apollo/client";
import { Provider, useDispatch } from "react-redux";
import { VERIFY_TOKEN_QUERY } from "./utils/queries";
import cartReducer from "./utils/cartSlice";
import authReducer, { setError, setUser } from "./utils/authSlice";
import orderReducer from "./utils/orderSlice";
import cartSaver from "./utils/cartSaver";
import refundReducer from "./utils/refundSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Footer, Header, MobileHeader } from "./components";
import styles from "./App.module.css";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    refunds: refundReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartSaver),
});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check the token when the App component loads
  const token = localStorage.getItem("token");

  useQuery(VERIFY_TOKEN_QUERY, {
    variables: { token },
    skip: !token,
    onCompleted: (data) => {
      dispatch(setUser(data.verifyToken));
      setIsAuthenticated(true);
    },
    onError: (error) => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      dispatch(setError("Session expired. Please log in again."));
      console.error("The error", error);
    },
  });

  // Listen for localStorage changes to keep authentication state consistent across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        setIsAuthenticated(!!localStorage.getItem("token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        {isMobile ? <MobileHeader /> : <Header isAuthenticated={isAuthenticated} />}
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  );
}

export default AppWrapper;
