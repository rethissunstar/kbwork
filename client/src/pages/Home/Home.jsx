import React from "react";
import Hero from "../../components/Hero";
import CategoryCard from "../../components/CategoryCard";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <h1>
          Welcome to KB Fanatics. <br /> A store dedicated to mechanical keyboard enthusiasts.
        </h1>
        <Hero />
      </div>
      <div className={styles.categoryCardContainer}>
        <div className={styles.categoryCardTitle}>
          <h2>Categories</h2>
          <p>Explore our range of products</p>
        </div>
        <div className={styles.categoryContainer}>
          <CategoryCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
