import React, { useState } from "react";

const AddProfileModal = ({ isOpen, onClose, onAddProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    img: "",
    description: "",
    address: "",
    location: { lat: "", lng: "" },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProfile({ ...formData, id: Date.now() });
    onClose();
    setFormData({
      name: "",
      email: "",
      img: "",
      description: "",
      address: "",
      location: { lat: "", lng: "" },
    }); // Clear form fields
  };

  const handleGetLocationFromAddress = async () => {
    const address = formData.address;
    if (!address) {
      alert("Please enter an address first.");
      return;
    }
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.length === 0) {
        alert("Address not found.");
      } else {
        const { lat, lon } = data[0];
        setFormData((prevState) => ({
          ...prevState,
          location: { lat, lng: lon },
        }));
      }
    } catch (error) {
      alert("Error fetching location.");
      console.error("Error:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevState) => ({
          ...prevState,
          location: { lat: latitude, lng: longitude },
        }));
      },
      (error) => {
        alert("Error getting current location.");
        console.error("Error:", error);
      }
    );
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxHeight: "90vh", // Reduced height
    overflowY: "auto", // Enable scrolling if content overflows
  };

  const inputGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const textareaStyle = {
    resize: "vertical",
    height: "80px",
    ...inputStyle,
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const secondaryButtonStyle = {
    backgroundColor: "#f0f0f0",
    color: "#007bff",
  };

  const modalFooterStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const primaryButtonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  };

  const cancelButtonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          Add New Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter Name"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter Email"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Photo URL:</label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter Photo URL"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={textareaStyle}
              placeholder="Describe the user..."
            ></textarea>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter Address"
            />
          </div>
          <div style={buttonGroupStyle}>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={handleGetLocationFromAddress}
            >
              Get Location From Address
            </button>
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={handleGetCurrentLocation}
            >
              Use Current Location
            </button>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Latitude:</label>
            <input
              type="text"
              value={formData.location.lat}
              disabled
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Longitude:</label>
            <input
              type="text"
              value={formData.location.lng}
              disabled
              style={inputStyle}
            />
          </div>
          <div style={modalFooterStyle}>
            <button type="submit" style={primaryButtonStyle}>
              Add Profile
            </button>
            <button type="button" style={cancelButtonStyle} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfileModal;
