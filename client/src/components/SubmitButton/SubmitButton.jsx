/* eslint-disable react/prop-types */
import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./SubmitButton.module.css";

function SubmitButton({ text, onClick, isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      style={{ position: "relative" }}
      className={styles.submitButton}
      onClick={onClick}
    >
      {isLoading ? (
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <ClipLoader color="#123ABC" loading size={20} />
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default SubmitButton;
