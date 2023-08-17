import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import styles from "./Account.module.css";

function Account() {
  return (
    <div className={styles.account}>
      <Link to="/myaccount">
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  );
}

export default Account;
