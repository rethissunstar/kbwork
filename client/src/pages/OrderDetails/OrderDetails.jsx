import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SINGLE_ORDER_QUERY } from "../../utils/queries";
import formatDate from "../../utils/formatDate";
import styles from "./OrderDetails.module.css";

function OrderDetails() {
  const { orderId } = useParams();
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { _id: orderId },
  });

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const order = data ? data.getSingleOrder : [];

  return (
    <div className={styles.orderDetails}>
      <h3 className={styles.orderId}>Order ID: {order._id}</h3>
      <div className={styles.orderSummary}>
        <p>Order Date: {formatDate(order.createdAt)}</p>
        <p>Subtotal: ${order.orderSubTotal}</p>
        <p>Tax: ${order.orderTax}</p>
        <p>Total: ${order.orderTotal}</p>
      </div>
      <h4>Items:</h4>
      {order.orderItems.map((item) => (
        <div key={item.productId} className={styles.orderItem}>
          <img src={item.image} alt={item.model} className={styles.orderItemImage} />
          <div className={styles.orderItemDetails}>
            <p>Brand: {item.brand}</p>
            <p>Model: {item.model}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
