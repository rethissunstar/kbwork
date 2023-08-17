import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router
import categories from "./CategoryCardList";
import styles from "./CategoryCard.module.css";

function CategoryCard() {
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <div className={styles.categoryCard}>
      {categories.map((category) => (
        <div className={`${styles.categoryItem} ${styles[category.className]}`}>
          <div className={styles.categoryImage}>
            <img src={category.image} alt={category.name} />
          </div>
          <div className={styles.categoryContent}>
            <h2>{category.name}</h2>
            <button
              type="button"
              className={styles.button}
              onClick={() => handleClick(category.url)}
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryCard;
