// EmailVerification.js
import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import { showLogin } from "../../utils/authSlice";
import { VERIFY_EMAIL } from "../../utils/mutations";
import styles from "./EmailVerification.module.css";

function EmailVerification() {
  const { uniqueString } = useParams(); // Get the uniqueString from the URL
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    verifyEmail({ variables: { uniqueString } });
  }, [uniqueString, verifyEmail]);

  if (loading) return <p>Verifying...</p>;
  if (error) return <p>Error verifying email: {error.message}</p>;

  return (
    <div>
      {data && data.verifyEmail && data.verifyEmail.success ? (
        <div>
          <p>Email verified successfully!</p>
          <button className={styles.loginLink} type="button" onClick={() => navigate("/myaccount")}>
            Go to Login
          </button>
        </div>
      ) : (
        <p>Error verifying email.</p>
      )}
    </div>
  );
}

export default EmailVerification;
