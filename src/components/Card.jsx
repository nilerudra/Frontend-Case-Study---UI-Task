import React, { useState } from "react";
import "./Card.css";

function Card({ profile }) {
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
              <h4>Profile Details</h4>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Description:</strong> {profile.description}
              </p>
              <p>
                <strong>Address:</strong>
                {profile.address}
              </p>
              <p>
                <strong>Location:</strong> Lat: {profile.location.lat}, Lng:{" "}
                {profile.location.lng}
              </p>
              {/* Locate Button in Profile Popup */}
              <button className="locate btn" onClick={handleLocateClick}>
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
