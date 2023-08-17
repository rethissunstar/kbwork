import React from "react";
import styles from "./Header.module.css";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Account from "./Account";
import Cart from "./Cart";
import SocialIcons from "./SocialIcons";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.navLinks}>
        <NavLinks />
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.userControls}>
        <div className={styles.account}>
          <Account />
        </div>
        <div className={styles.cart}>
          <Cart />
        </div>
      </div>
      <div className={styles.socialIcons}>
        <SocialIcons />
      </div>
    </header>
  );
}

export { NavLinks, Account, Cart, SocialIcons, Logo };
