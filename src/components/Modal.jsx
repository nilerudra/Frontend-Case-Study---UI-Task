import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "800px",
          height: "80%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "25px",
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  );
};

export default Modal;
