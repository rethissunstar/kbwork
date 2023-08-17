import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/pro-light-svg-icons";
import { NavLinks, Cart, SocialIcons, Logo } from "./Header";
import styles from "./MobileHeader.module.css";
import SearchBar from "./SearchBar";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/myaccount");
  };

  return (
    <div className={styles.mobileHeader}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.menuIcon}>
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          onClick={handleClick}
          className={`${styles.menuIcon}  ${isOpen ? styles.rotateIcon : ""}`}
        />
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.userControls}>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/myaccount">Login</Link>
          )}
          <Cart />
        </div>
        <div className={styles.navLinks}>
          <NavLinks mobile />
        </div>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div className={styles.socialIcons}>
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
