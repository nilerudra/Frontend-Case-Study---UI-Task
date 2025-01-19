import React from "react";
import "./SearchBar.css";
import searchIcon from "../images/search.png";

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-bar">
      <img src={searchIcon} alt="Search Icon" />
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
