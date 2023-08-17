/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { setUser, setError, clearUser, showLogin } from "../../utils/authSlice";
// import SubmitButton from "../SubmitButton";
import styles from "./SignUp.module.css";

function SignUp({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [signup, { error }] = useMutation(SIGNUP_MUTATION);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    stateProvince: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearUser()), [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signup({ variables: { input: formData } });
      console.log(response.data.signup);

      // Dispatch setUser action to store user data globally.
      dispatch(setUser(response.data.signup));

      // Redirect to login after successful signup
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error signing up:", err);
      dispatch(setError(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Sign Up</h1>
        <p>Please complete the sign up form below to create an account.</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">*First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName">*Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">*Email:</label>
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
          <label htmlFor="password">*Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="stateProvince">State/Province:</label>
          <input
            type="text"
            id="stateProvince"
            name="stateProvince"
            value={formData.stateProvince}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className={styles.controlsGroup}>
          <button className={styles.Button} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          {error && <p className={styles.error}>Error: {error.message}</p>}
          <button className={styles.loginLink} type="button" onClick={() => dispatch(showLogin())}>
            Already have an account? Log in here.
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
