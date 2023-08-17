import React from "react";
import styles from "./FAQ.module.css";

function FAQ() {
  return (
    <section>
      <div>
        <h1 className={styles.header}> The KB Fanatics Experience</h1>

        <h2 className={styles.header}>
          {" "}
          What we are doing on a daily to get You a Quality Service
        </h2>
        <p>
          Welcome to KB Fanatics, the Ultimate Destination for all your keyboard purchasing and
          customization needs. At KB Fanatics, we are passionate about helping you create the
          perfect typing experience tailored to your preferences. Whether you are a gaming
          enthusiast, a programming wizard, or just someone who loves the feel of a high-quality
          keyboard beneath their fingertips, we have got you covered.
        </p>

        <h2 className={styles.header}> Let us Key Right Into IT!</h2>
        <p>
          Navigating the world of keyboards and accessories can be overwhelming, but with KB
          Fanatics , it is an enjoyable journey of discovery. Our user-friendly website and
          knowledgeable customer support ensure that you will find the information and guidance you
          need to make informed decisions. We believe that your keyboard is an extension of your
          creativity and productivity, and we are here to make sure it is nothing short of perfect.
          Thank you for choosing KB Fanatics as your partner in creating the ultimate keyboard
          setup. Join us on this exciting journey of finding the keys that unlock your typing
          potential.
        </p>
      </div>
    </section>
  );
}

export default FAQ;
