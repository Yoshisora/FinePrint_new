import React from "react";

const SummaryBox = ({ termsText, bgColor }) => {
  const colorMap = {
    "#13B756": "var(--soft-green)",
    "#8BC33C": "var(--soft-light-green)",
    "#FFC300": "var(--soft-yellow)",
    "#F97127": "var(--soft-orange)",
    "#FB4245": "var(--soft-red)",
    "#929292": "#DEE1E6"
  };

  const softColor = colorMap[bgColor] || "var(--white)";

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
        boxSizing: "border-box"
      }}
    >
      <strong style={{ fontSize: "14px", display: "block", marginBottom: "6px" }}>
        Important
      </strong>

      {/* Privacy & Tracking */}
      {(termsText?.user_data || termsText?.limited_liability) && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Privacy & Tracking</strong>
          <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
            {termsText.user_data && <li>{termsText.user_data}</li>}
            {termsText.limited_liability && <li>{termsText.limited_liability}</li>}
          </ul>
        </div>
      )}

      {/* Service Terms */}
      {(termsText?.licence_to_use_user_content || termsText?.suspension_of_service) && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Service Terms</strong>
          <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
            {termsText.licence_to_use_user_content && (
              <li>{termsText.licence_to_use_user_content}</li>
            )}
            {termsText.suspension_of_service && (
              <li>{termsText.suspension_of_service}</li>
            )}
          </ul>
        </div>
      )}

      {/* Subscriptions & Renewals */}
      {termsText?.renewal_of_service && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Subscriptions & Renewals</strong>
          <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
            <li>{termsText.renewal_of_service}</li>
          </ul>
        </div>
      )}

      {/* Fallback in case everything is null */}
      {!termsText ||
        (!termsText.user_data &&
          !termsText.limited_liability &&
          !termsText.licence_to_use_user_content &&
          !termsText.suspension_of_service &&
          !termsText.renewal_of_service) && (
          <p style={{ fontStyle: "italic", color: "#555" }}>
            No notable terms were found.
          </p>
        )}
    </div>
  );
};

export default SummaryBox;
