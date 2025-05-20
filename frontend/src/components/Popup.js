import React from "react";

const Popup = ({ inputText, setInputText, onClose, onSubmit }) => {
  return (
      <div style={{
        position: "absolute",
        bottom: "20px", 
        left: "50%",             
        transform: "translateX(-50%)", 
        width: "300px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 1000
      }}>

      <textarea
        placeholder="Write your review here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="5"
        style={{
          width: "100%",
          padding: "5px",
          fontSize: "12px",
          boxSizing: "border-box" 
        }}
      />

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          style={{ marginRight: "10px", padding: "5px 10px", fontSize: "12px" }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onSubmit();
            onClose();
          }}
          style={{ padding: "5px 10px", fontSize: "12px" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Popup;
