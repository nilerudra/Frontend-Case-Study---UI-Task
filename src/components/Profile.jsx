import React, { useState } from "react";
import down from "../images/down.png";
function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            padding: "10px",
          }}
          src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h4>Fakhar Naveed</h4>
        <button
          onClick={toggleDropdown}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img width="20px" height="20px" src={down} alt="" />
        </button>
      </div>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            zIndex: 100,
            minWidth: "150px",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ padding: "10px", cursor: "pointer" }}>Profile</li>
            <li style={{ padding: "10px", cursor: "pointer" }}>Settings</li>
            <li style={{ padding: "10px", cursor: "pointer" }}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
