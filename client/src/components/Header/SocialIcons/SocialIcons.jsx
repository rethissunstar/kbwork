import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import socialIcons from "./socialIcons";
import styles from "./SocialIcons.module.css";

function SocialIcons() {
  return (
    <div className={styles.socialIcons}>
      {socialIcons.map((iconObj) => (
        <a href={iconObj.url} className={iconObj.className} key={iconObj.id}>
          <FontAwesomeIcon icon={iconObj.icon} />
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;
