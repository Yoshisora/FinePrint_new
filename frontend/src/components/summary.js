import React from "react";

const SummaryBox = ({ termsText, bgColor }) => {
  const colorMap = {
    "#13B756": "var(--soft-green)",
    "#8BC33C": "var(--soft-light-green)",
    "#FFC300": "var(--soft-yellow)",
    "#F97127": "var(--soft-orange)",
    "#FB4245": "var(--soft-red)",
    "#929292": "#DEE1E6",
  };

  const softColor = colorMap[bgColor] || "var(--white)";

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
  ];

  const renderItem = (item) => <li>{item.explanation}</li>;

  return (
    <div
      style={{
        backgroundColor: softColor,
        borderRadius: "8px",
        padding: "12px",
        width: "100%",
        height: "194px",
        maxHeight: "250px",
        overflowY: "auto",
        fontSize: "12px",
        boxSizing: "border-box",
      }}
    >
      <strong style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>
        Important
      </strong>

      {clauseCategories.map(({ title, keys, maxScore }) => {
        const relevantItems = keys
          .map((key) => termsText?.[key])
          .filter(Boolean);

        if (relevantItems.length === 0) return null;

        const totalScore = relevantItems.reduce(
          (sum, item) => sum + (item.risk_score ?? 0),
          0
        );

        return (
          <div key={title} style={{ marginBottom: "10px" }}>
            <strong>
              {title}: {totalScore} / {maxScore}
            </strong>
            <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
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
  );
};

export default SummaryBox;
