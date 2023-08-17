import React from "react";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <section>
      <div>
        <h1 className={styles.header}>About Us</h1>
        <p>
          Welcome to KB Fanatics, the ultimate destination for all your keyboard purchasing and
          customization needs. At KB Fanatics, we are passionate about helping you create the
          perfect typing experience tailored to your preferences. Whether you are a gaming
          enthusiast, a programming wizard, or just someone who loves the feel of a high-quality
          keyboard beneath their fingertips, we have got you covered.
        </p>

        <h1 className={styles.header}>Our Expertise</h1>

        <p>
          With years of experience in the keyboard and tech industry alongside intense Gaming our
          team at Kb Fanatics possesses a deep understanding of the nuances that make a keyboard
          truly exceptional. We recognize that choosing the right keyboard goes beyond aesthetics,
          it is about finding the perfect combination of keys, layouts, and accessories that elevate
          your typing comfort and productivity during your work endeavors and gaming ventures.
        </p>

        <h1 className={styles.header}>Key Selection</h1>

        <p>
          Every key matters. At KB Fanatics, we curate a diverse selection of key switches, from the
          satisfying tactile feedback of mechanical switches to the whisper-quiet keystrokes of
          membrane switches. Our site will guide you through the different switch types, helping you
          select the one that matches your typing style and preferences.
        </p>

        <h1 className={styles.header}>Layout Customization</h1>

        <p>
          Keyboards come in various layouts, and we understand that one size does not fit all.
          Whether you are a fan of the traditional QWERTY layout, an ergonomic enthusiast seeking
          split or curved layouts, or a programmer who needs dedicated function keys, we offer a
          range of options to suit your needs. Our goal is to empower you to create a keyboard
          layout that complements your work style perfectly. Try Us Out!
        </p>
      </div>
    </section>
  );
}

export default AboutUs;

// doing all work in return for front end
