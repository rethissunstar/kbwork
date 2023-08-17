/* eslint-disable no-console */
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EMAILCHECK_MUTATION } from "../../utils/mutations";
import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const [emailCheck, { errorEmailCheck }] = useMutation(EMAILCHECK_MUTATION);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const checkUserExistence = async () => {
    try {
      const response = await emailCheck({
        variables: { email },
      });

      return response?.data?.emailCheck?.success;

      // return userExists;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userExists = await checkUserExistence();

      if (userExists) {
        setSuccessMessage("Password reset email sent. Please check your inbox.");
      } else {
        setErrorMessage("User with this email does not exist.");
      }
    } catch (error) {
      setErrorMessage("Error sending password reset email.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Forgot Password</h1>
        <p>
          Please enter your email address below and we will send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {" "}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email: </label>{" "}
          <input type="email" name="email" id="email" onChange={handleEmailChange} required />
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Sending..." : "Reset Password"}
        </button>
        {errorEmailCheck && <p>Error: {errorEmailCheck.message}</p>}
        {successMessage ? <p>{successMessage}</p> : <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
