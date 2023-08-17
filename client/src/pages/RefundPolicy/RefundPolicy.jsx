import React, { useState } from "react";
import styles from "./RefundPolicy.module.css";
import { useDispatch } from "react-redux";
import { toggleNewRefundAdded } from "../../utils/refundSlice";

function RefundPolicy() {
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();

  const submitForm = (event) => {
    event.preventDefault();
    // console.log(formData);
    dispatch(toggleNewRefundAdded);
  };

  return (
    <section>
      <div>
        <h1 className={styles.header}>How We Do Refunds</h1>
        <p>Simply Give Us Your Info so we can Contact You</p>

        <form>
          <label htmlFor="email"> Email</label>

          <input name="email" onChange={handleChange} id="email" type="text" />

          <label htmlFor="refundReason">Refund Reason</label>

          <input name="refundreason" onChange={handleChange} id="refundreason" type="text" />

          <input onClick={submitForm} type="submit" />
        </form>
      </div>
    </section>
  );
}

export default RefundPolicy;
