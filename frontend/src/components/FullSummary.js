import React from "react";
import GaugeWrapper from "./gauge";
import ReviewBox from "./review";

const FullSummary = ({ risk_score, termsText, companyName }) => {
  const lastScannedDate = new Date().toLocaleDateString();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "64px", fontFamily: "var(--jost)", fontWeight: 800 }}>
        Fine<span style={{ color: "#00aaff" }}>Print</span>
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "20px" }}>
        <div style={{ flexShrink: 0, paddingBottom: "20px" }}>
          <GaugeWrapper risk_score={risk_score} width={500} height={420} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "56px", marginTop: "4px", fontFamily: "var(--jost)", fontWeight: 700 }}>
            {companyName || "Unknown"}
          </p>
          <h2 style={{ fontSize: "18px", marginTop: "12px" }}>Last Report:</h2>
          <p style={{ fontSize: "16px", marginTop: "4px" }}>{lastScannedDate}</p>
        </div>
      </div>

      {/* Wrapped Clause Summary in styled summary box */}
      <div
        style={{
          width: "100%",
          minHeight: "400px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "24px",
          fontFamily: "var(--jost)",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        {/* Privacy & Tracking */}
        {(termsText?.user_data || termsText?.limited_liability) && (
          <div>
            <strong>
              Privacy & Tracking: {(termsText.user_data?.risk_score ?? 0) + (termsText.limited_liability?.risk_score ?? 0)} / 20
            </strong>
            <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
              {termsText.user_data && <li>{termsText.user_data.explanation}</li>}
              {termsText.limited_liability && <li>{termsText.limited_liability.explanation}</li>}
            </ul>
          </div>
        )}

        {/* Service Terms */}
        {(termsText?.licence_to_use_user_content || termsText?.suspension_of_service) && (
          <div>
            <strong>
              Service Terms: {(termsText.licence_to_use_user_content?.risk_score ?? 0) + (termsText.suspension_of_service?.risk_score ?? 0)} / 20
            </strong>
            <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
              {termsText.licence_to_use_user_content && (
                <li>{termsText.licence_to_use_user_content.explanation}</li>
              )}
              {termsText.suspension_of_service && (
                <li>{termsText.suspension_of_service.explanation}</li>
              )}
            </ul>
          </div>
        )}

        {/* Subscriptions & Renewals */}
        {termsText?.renewal_of_service && (
          <div>
            <strong>
              Subscriptions & Renewals: {termsText.renewal_of_service.risk_score} / 10
            </strong>
            <ul style={{ paddingLeft: "20px", marginTop: "4px" }}>
              <li>{termsText.renewal_of_service.explanation}</li>
            </ul>
          </div>
        )}

        {/* Fallback if nothing found */}
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

      {/* ReviewBox container */}
      <div
        style={{
          marginTop: "40px",
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxSizing: "border-box"
        }}
      >
        <ReviewBox />
      </div>
    </div>
  );
};

export default FullSummary;
