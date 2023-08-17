import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import img1 from "../images/keyboard_01.jpg";
import img2 from "../images/keyboard_02.jpg";
import img3 from "../images/keyboard_03.jpg";

const images = [img1, img2, img3];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((current + 1) % images.length); // Increment current, but wrap around to 0 when it exceeds the length of the array
    }, 5000); // Change image every 3 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on unmount
    };
  }, [current]);

  return (
    <div className={styles.carousel}>
      {images.map((img, index) => (
        <img key={img} src={img} alt="" className={current === index ? styles.visible : ""} />
      ))}
    </div>
  );
}

export default Carousel;
