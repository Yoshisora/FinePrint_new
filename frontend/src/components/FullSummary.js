import React, { useEffect, useState } from "react";
import GaugeWrapper from "./gauge";
import sendText from "../apis/sendText";

const FullSummary = ({ risk_score }) => {
  const [termsText, setTermsText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const lastScannedDate = new Date().toLocaleDateString();

  useEffect(() => {
    chrome.storage.local.get(["termsText", "gptResponse", "company"], (result) => {
      if (result.termsText) setTermsText(result.termsText);
      if (result.gptResponse?.risk !== undefined) setRiskScore(result.gptResponse.risk);
      if (result.company) setCompanyName(result.company);
    });


    fetchData();
  }, []);

    const fetchData = async () => {
        try {
          const res = await sendText("testtext", "testsite");
          console.log(res.data);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data); 
              } else {
                console.error("Network or unexpected error", err);
              }
        }
      };
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Title */}
      <h1 style={{ fontSize: "64px", fontFamily: "var(--jost)", fontWeight: 800 }}>
        Fine<span style={{ color: "#00aaff" }}>Print</span>
      </h1>

      {/* Gauge and Report Info Row */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "20px" }}>
        {/* Gauge */}
        <div style={{ flexShrink: 0, paddingBottom: "20px" }}>
          <GaugeWrapper risk_score={risk_score} width={500} height={420} />
        </div>

        {/* Report Info */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "56px", marginTop: "4px", fontFamily: "var(--jost)", fontWeight: 700 }}>
            {companyName ? companyName : "Not Found"}
          </p>
          
          <h2 style={{ fontSize: "18px", marginTop: "12px" }}>Last Report:</h2>
          <p style={{ fontSize: "16px", marginTop: "4px" }}>{lastScannedDate}</p>
        </div>
      </div>

      {/* Terms Section */}
      <section style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Raw Terms:</h3>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{termsText}</p>
      </section>
    </div>
  );
};

export default FullSummary;
