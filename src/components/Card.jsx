import React, { useState } from "react";
import "./Card.css";

function Card({ profile, currentPage }) {
  const [showMap, setShowMap] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // Toggle map visibility
  const handleLocateClick = () => {
    setShowMap(!showMap);
  };

  // Toggle profile details visibility
  const handleProfileClick = () => {
    setShowProfileDetails(!showProfileDetails);
  };

  // Handle delete logic
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `https://frontend-case-study-ui-task-backend.onrender.com/api/users/${profile._id}`,
        {
          method: "DELETE", // DELETE request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="card">
      <img
        className="prof-img"
        src={profile.img}
        alt={`${profile.name}'s Profile`}
      />
      <div className="card-info">
        <h3>{profile.name}</h3>
        <span style={{ color: "gray" }}>{profile.description}</span>
        <br />
        <div className="button-group">
          <button className="block btn" onClick={handleProfileClick}>
            Profile
          </button>
          <button className="details btn" onClick={handleLocateClick}>
            Summary
          </button>
          {currentPage === "Admin Panel" && (
            <button
              className="block btn"
              style={{ backgroundColor: "red" }}
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Profile Details Popup */}
      {showProfileDetails && (
        <div className="map-popup">
          <div className="map-container">
            <div className="close-btn" onClick={handleProfileClick}>
              &times;
            </div>

            <div className="profile-popup">
              <img src={profile.img} alt="Profile" className="profile-photo" />
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Description:</strong> {profile.description}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <p>
                <strong>Location:</strong> Lat: {profile.location.lat}, Lng:{" "}
                {profile.location.lng}
              </p>
              <button className="locate" onClick={handleLocateClick}>
                Locate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Popup */}
      {showMap && (
        <div className="map-popup">
          <div className="map-container">
            <div className="close-btn" onClick={handleLocateClick}>
              &times;
            </div>

            <div id="map" style={{ width: "100%", height: "400px" }}>
              <iframe
                src={`https://www.google.com/maps?q=${profile.location.lat},${profile.location.lng}&z=15&output=embed`}
                style={{ width: "100%", height: "400px", border: "none" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
