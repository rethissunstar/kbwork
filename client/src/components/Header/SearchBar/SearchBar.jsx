/* eslint-disable no-console */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchTerm);
  };

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className={styles.button} type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}

export default SearchBar;
