/* eslint-disable react/prop-types */
import React from "react";
import styles from "./ShippingDetails.module.css";

function ShippingDetails({ user }) {
  return (
    <div className={styles.container}>
      <div>
        <h3>Shipping Details</h3>
        <p>Please enter your shipping details below.</p>
      </div>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            defaultValue={
              user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : ""
            }
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            placeholder="Enter your address"
            defaultValue={user?.address}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="city">City:</label>
          <input type="text" placeholder="Enter your city" defaultValue={user?.city} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="state">State/Province:</label>
          <input
            id="state"
            type="text"
            placeholder="Enter your state / province"
            defaultValue={user?.stateProvince}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="postcode">Postal Code:</label>
          <input
            id="postcode"
            type="text"
            placeholder="Enter your postal code"
            defaultValue={user?.postalCode}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            type="text"
            placeholder="Enter your country"
            defaultValue={user?.country}
          />
        </div>
      </form>
    </div>
  );
}

export default ShippingDetails;
