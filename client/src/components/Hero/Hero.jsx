import React from "react";
import Carousel from "./Carousel";
// import SaleCard from "./SaleCard";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <Carousel />
      {/* <SaleCard /> */}
    </section>
  );
}

export default Hero;
