import React from "react";

const SummaryBox = ({ termsText, bgColor }) => {
  // Map solid → soft colors
  const colorMap = {
    "#13B756": "var(--soft-green)",       // green
    "#8BC33C": "var(--soft-light-green)", // light-green
    "#FFC300": "var(--soft-yellow)",      // yellow
    "#F97127": "var(--soft-orange)",      // orange
    "#FB4245": "var(--soft-red)",         // red
    "#929292": "#DEE1E6"             // fallback/default
  };

  const softColor = colorMap[bgColor] || "var(--white)";

  return (
    <div
      style={{
        backgroundColor: softColor,
        borderRadius: "8px",
        padding: "10px",
        width: "100%",
        height: "194px",
        maxHeight: "250px",
        overflowY: "auto",
        fontSize: "12px",
        boxSizing: "border-box"
      }}
    >
      <strong>Important</strong>
      <ul>
        <i> {termsText.licence_to_use_user_content}</i>
        <i> {termsText.limited_liability}</i>
        <i> {termsText.renewal_of_service}</i>
        <i> {termsText.suspension_of_service}</i>
        <i> {termsText.user_data}</i>
      </ul>
    </div>
  );
};

export default SummaryBox;
