import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import putReview from "../apis/putReviews";

const ReviewBox = ({site}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [reviewed, setReviewed] = useState(false);

  const submitReview =  async (review, rating, site) => {
    try {
        const res = await putReview(review, rating, site);
        return res.data;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data); 
        } 
        else {
            console.error("Network or unexpected error", err);
        }
    }
  };
  const handleSubmit = () => {
    if (!rating || text.trim() === "") {
      alert("Please provide both a rating and a review.");
      return;
    }

    const reviewData = {
      rating,
      text,
      timestamp: new Date().toISOString()
    };

    submitReview(text, rating, site).then(data => {
        if (data) {
            console.log("Review submitted:", text);
            setReviewed(true);
        }
    })
    .catch(err => {
        console.error("Error submitting review:", err);
    })
    .finally(() => {
        setRating(0);
        setText("");
    });

  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "260px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "var(--jost)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}
    >
      {/* Title + Stars */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ fontSize: "18px" }}>What does the community have to say?</strong>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="medium"
        />
      </div>

      {/* Review Textarea */}
      <textarea
        placeholder="Write a review"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          padding: "12px",
          fontSize: "14px",
          fontFamily: "Arial",
          border: "1px solid #ccc",
          borderRadius: "6px",
          resize: "none",
          boxSizing: "border-box",
          lineHeight: "1.5"
        }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSubmit}
          disabled={reviewed}
          title={reviewed ? "You have already submitted a review." : ""}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            fontFamily: "var(--jost)",
            borderRadius: "6px",
            border: "1px solid black",
            backgroundColor: reviewed ? "#ddd" : "black",
            color: reviewed ? "#666" : "white",
            cursor: reviewed ? "default" : "pointer"
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewBox;
