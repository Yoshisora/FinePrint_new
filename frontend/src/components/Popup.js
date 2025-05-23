import React from "react";
import Rating from "@mui/material/Rating";

const Popup = ({ inputText, setInputText, ratingValue, setRatingValue, onClose, onSubmit, reviewed}) => {
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

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Rating
          name="user-rating"
          value={ratingValue}
          onChange={(event, newValue) => setRatingValue(newValue)}
          size="small"
        />
      </div>

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <button
          onClick={onClose}
          style={{ marginRight: "10px", padding: "5px 10px", fontSize: "12px" }}
        >
          Cancel
        </button>
        <button
            onClick={() => {
                if (!reviewed) {
                onSubmit();
                onClose();
                }
            }}
            title={reviewed ? "You have already submitted a review." : ""}
            disabled={reviewed}
            style={{
                padding: "5px 10px",
                fontSize: "12px"
            }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Popup;
