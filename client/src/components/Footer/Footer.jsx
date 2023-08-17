import React, { useState } from "react";
import { Link } from "react-router-dom";

import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import links from "./footerLinks";
import socialIcons from "../Header/SocialIcons/socialIcons";
import styles from "./Footer.module.css";
import payments from "./paymentOptions";

export default function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear(); // Get current year for copyright

  const handleNewsletterSignUp = (e) => {
    e.preventDefault();
    // console.log(email);
  };

  return (
    <footer>
      <div className={styles.newsletter}>
        <h3 className={styles.logo}>KB FANATICS</h3>
        <h4>Sign up for news stories and personal offers</h4>
        <form onSubmit={handleNewsletterSignUp} className={styles.newsletterForm}>
          <input
            type="email"
            name="newsletter"
            id="newsletter"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </form>
      </div>
      <nav className={styles.links}>
        <h4>Useful Pages</h4>
        <ul>
          {links.map((linkObj) => (
            <li key={linkObj.id}>
              <Link to={linkObj.url}>{linkObj.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.about}>
        <h4>About</h4>
        <p>
          We are an online store dedicated to mechanical keyboard enthusiasts. We stock components
          at reasonable prices and ensure they&apos;re always in stock.
        </p>
      </div>
      <div className={styles.contact}>
        <h4>Contact Us</h4>
        <p>
          Visit our <a href={links.find((link) => link.title === "Contact Us").url}>Contact Page</a>{" "}
          or email us directly at <a href="mailto:support@kbfanatics.com">support@kbfanatics.com</a>
        </p>
      </div>
      <div className={styles.socialIcons}>
        {socialIcons.map((iconObj) => (
          <a key={iconObj.id} href={iconObj.url} className={iconObj.className}>
            <FontAwesomeIcon icon={iconObj.icon} />
          </a>
        ))}
      </div>
      <div className={styles.payments}>
        {payments.map((paymentObj) => (
          <paymentObj.brand key={paymentObj.id} aria-label={paymentObj.label} size={30} />
        ))}
      </div>
      <div className={styles.copyright}>
        <p>© {currentYear} KB FANATICS. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
