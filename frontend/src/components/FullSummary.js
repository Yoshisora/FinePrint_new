import React, { useEffect, useState } from "react";
import GaugeWrapper from "./gauge";
import ReviewBox from "./review";
import Rating from "@mui/material/Rating";
import getReviews from "../apis/getReviews";

const FullSummary = ({ risk_score, termsText, companyName, url }) => {
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("date-desc");

  const loadReviews = async (site) => {
    try {
      const res = await getReviews(site);
      console.log("Fetched reviews:", res.data.data);
      setReviews(res.data.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.error("Network or unexpected error", err);
      }
    }
  };

  useEffect(() => {
    if (companyName) {
      loadReviews(companyName);
    }
  }, [companyName]);

  const lastScannedDate = new Date().toLocaleDateString();

  const clauseCategories = [
    {
      title: "Privacy & Tracking",
      keys: ["user_data", "limited_liability"],
      maxScore: 20,
    },
    {
      title: "Service Terms",
      keys: ["licence_to_use_user_content", "suspension_of_service"],
      maxScore: 20,
    },
    {
      title: "Subscriptions & Renewals",
      keys: ["renewal_of_service"],
      maxScore: 10,
    },
    {
        title: "Data Deletion",
        keys: ["data_after_deletion"],
        maxScore: 10,
    }
  ];

  const renderItem = (item) => (
    <li>
      {item.explanation}
      {item.quote && (
        <div style={{
          fontStyle: "italic",
          margin: "8px 16px",
          paddingLeft: "12px",
          paddingRight: "12px",
          borderLeft: "3px solid #ccc",
          color: "#333"
        }}>
          “{item.quote}”
        </div>
      )}
    </li>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "64px", fontFamily: "var(--jost)", fontWeight: 800 }}>
        Fine<span style={{ color: "#00aaff" }}>Print</span>
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "20px" }}>
        <div style={{ flexShrink: 0, paddingBottom: "20px" }}>
          <GaugeWrapper risk_score={risk_score} width={500} height={420} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap:"6px" }}>
          <p style={{ fontSize: "56px", margin: 0, fontWeight: 700 }}>
            {companyName || "Unknown"}
          </p>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "32px",
                fontFamily: "var(--jost)",
                fontWeight: "500",
                color: "#00aaff",
                textDecoration: "underline",
                marginTop: "4px"
              }}
            >
              Terms and Conditions
            </a>
          )}

          <p style={{ fontSize: "36px", fontWeight: 600, margin: "12px 0 0 0" }}>Last Report:</p>
          <p style={{ fontSize: "32px", margin: 0 }}>{lastScannedDate}</p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          minHeight: "400px",
          border: "1px solid #ddd",
          borderTop: "66px solid #00aaff",
          borderRadius: "8px",
          padding: "24px",
          fontFamily: "Arial",
          fontSize: "16px",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {clauseCategories.map(({ title, keys, maxScore }) => {
          const relevantItems = keys.map((key) => termsText?.[key]).filter(Boolean);
          if (relevantItems.length === 0) return null;

          const totalScore = relevantItems.reduce((sum, item) => sum + (item.risk_score ?? 0), 0);

          return (
            <div key={title}>
              <strong>{title}: {totalScore} / {maxScore}</strong>
              <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
                {relevantItems.map(renderItem)}
              </ul>
            </div>
          );
        })}

        {!termsText ||
          clauseCategories.every(({ keys }) =>
            keys.every((key) => !termsText?.[key])
          ) && (
            <p style={{ fontStyle: "italic", color: "#555" }}>
              No notable terms were found.
            </p>
        )}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxSizing: "border-box",
        }}
      >
        <ReviewBox site={companyName} onReviewSubmit={() => loadReviews(companyName)} />

        {reviews.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ margin: 0 }}>User Reviews</h2>
              <div>
                <label htmlFor="sort-select" style={{ marginRight: "8px", fontWeight: "bold" }}>
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="date-desc">Date (Newest)</option>
                  <option value="date-asc">Date (Oldest)</option>
                  <option value="rating-desc">Rating (High → Low)</option>
                  <option value="rating-asc">Rating (Low → High)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[...reviews]
                .sort((a, b) => {
                  if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date);
                  if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
                  if (sortOption === "rating-desc") return b.rating - a.rating;
                  if (sortOption === "rating-asc") return a.rating - b.rating;
                  return 0;
                })
                .map((review, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <Rating value={Math.max(0, review.rating)} readOnly />
                    <p style={{ fontFamily: "Arial", fontSize: "16px" }}>{review.review}</p>
                    <p style={{ fontFamily: "Arial" }}>
                      <strong>Date:</strong> {review.date}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullSummary;
