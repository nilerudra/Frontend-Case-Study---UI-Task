import React from "react";
import "./Header.css";

function Header({ currentPage }) {
  const handleAddProfile = () => {
    // Handle add profile logic here
  };

  return (
    <div className="header">
      {currentPage === "Admin Panel" ? <h1>Admin Panel</h1> : <h1>Profiles</h1>}
    </div>
  );
}

export default Header;
