/* eslint-disable no-console */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD_MUTATION } from "../../utils/mutations";
import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [passwordReset, { error, data, loading }] = useMutation(RESET_PASSWORD_MUTATION);
  const { email } = useParams(); // Get the email from the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState({ password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await passwordReset({ variables: { email: email, password: password } });

      if (!response.data.resetPassword.success) {
        throw new Error("Password reset failed");
      }
    } catch (err) {
      console.error("error resetting password", err);
    }
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      {data && data.resetPassword && data.resetPassword.success ? (
        <div>
          <p>{data.resetPassword.message}</p>
          <button className={styles.button} type="button" onClick={() => navigate("/myaccount")}>
            Login to continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Enter new Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} />
          </div>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Processing..." : "Set new password"}
          </button>
          {error && <p className={styles.error}>Error: {error.message}</p>}
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
