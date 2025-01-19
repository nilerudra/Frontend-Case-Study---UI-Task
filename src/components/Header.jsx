import React from "react";
import "./Header.css";

function Header({ setFilter, filter }) {
  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  const getButtonStyle = (buttonFilter) => ({
    backgroundColor: buttonFilter === filter ? "#d1c4e9" : "transparent",
  });

  return (
    <div className="header">
      <h1>Profiles</h1>
    </div>
  );
}

export default Header;
