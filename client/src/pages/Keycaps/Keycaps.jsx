import React from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/cartSlice";
import { GET_KEYCAPS } from "../../utils/queries";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import styles from "./Keycaps.module.css";

function Keycaps() {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const { loading, error, data } = useQuery(GET_KEYCAPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Keycaps</h1>
      <p className={styles.description}>Shop our selection of Keycaps.</p>
      <div className={styles.cards}>
        {data.keycaps.map(({ _id, brand, model, price, quantity, imageURL }) => (
          <div key={_id} className={styles.card}>
            <img src={imageURL} alt={brand} className={styles.cardImage} />
            <div className={styles.cardCopy}>
              <h3 className={styles.cardTitle}>
                {brand} {model}
              </h3>
              <div className={styles.cardText}>
                <p>In Stock: {quantity}</p>
                <p>Price: ${price}</p>
              </div>
              <AddToCartButton
                onClick={() => handleAddToCart({ _id, brand, model, price, imageURL })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keycaps;
