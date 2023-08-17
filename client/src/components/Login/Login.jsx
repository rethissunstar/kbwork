/* eslint-disable no-console */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { setError, setUser, showSignUp } from "../../utils/authSlice";
import styles from "./Login.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Login({ onSuccess }) {
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/forgot-password");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        variables: { email: formData.email, password: formData.password },
      });

      const userData = response.data.login.user; // Extract user data
      // Store token and user data in local storage
      localStorage.setItem("token", response.data.login.token);
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data as a string
      // Dispatch setUser action to store user data globally.
      dispatch(setUser(userData)); // Store only user data

      // Execute the onSuccess callback after successful login
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error logging in:", err);
      dispatch(setError(err.message));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        {error && <p className={styles.error}>Error: {error.message}</p>}
        <div>
          {/* Using the same style for both buttons */}
          <button type="button" className={styles.button} onClick={() => dispatch(showSignUp())}>
            Create Account
          </button>
        </div>

        {/* forgot password code */}
        <p className={styles.forgotPasswordLink}>
          <button className={styles.linkButton} type="button" onClick={handleClick}>
            Forgot Password?
          </button>
        </p>
      </form>
    </div>
  );
}
Login.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Login;
