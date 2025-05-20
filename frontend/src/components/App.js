import React, { useEffect, useState } from "react";
import Header from "./header";
import SummaryBox from "./summary";
import GaugeWrapper from "./gauge";
import Emoji from "./emoji";
import FullSummary from "./FullSummary";
import BulletList from "./bulletList";
import sendText from "../apis/sendText";
import Popup from "./Popup";

const App = () => {
  const isReportPage = window.location.pathname.includes("report.html");

  const [termsText, setTermsText] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [riskScore, setRiskScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");


  const isDevelopmentMode = false;

  function assign_color(score) {
    if (typeof score !== "number" || score < 0 || score > 100) return "#929292";
    if (score <= 20) return "#13B756";
    if (score <= 40) return "#8BC33C";
    if (score <= 60) return "#FFC300";
    if (score <= 80) return "#F97127";
    return "#FB4245";
  }

  const colorMap = {
    "#13B756": "var(--soft-green)",
    "#8BC33C": "var(--soft-light-green)",
    "#FFC300": "var(--soft-yellow)",
    "#F97127": "var(--soft-orange)",
    "#FB4245": "var(--soft-red)",
    "#929292": "#DEE1E6"
  };

//   const fetchData = async (tosText, siteKey) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/text", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           text: tosText,
//           site: siteKey
//         })
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("Server response:", data);
//       return data;
//     } catch (error) {
//       console.error("Error posting to /text:", error);
//       throw error;
//     }
//   };

  const fetchData = async (text, site) => {
    try {
        const res = await sendText(text, site);
        console.log(res.data);
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

  useEffect(() => {
    if (isDevelopmentMode) {
      const mockTermsText = {
        licence_to_use_user_content: null,
        limited_liability: "Apple may modify, suspend, or discontinue the Services...",
        renewal_of_service: "Subscriptions automatically renew until cancelled.",
        suspension_of_service: "Apple may terminate this Agreement...",
        user_data: null
      };
      setTermsText(mockTermsText);
      setCompanyName("FinePrint");
      setLoading(false);
    } else {
        console.log("testing...");
      chrome.storage.local.get(["termsText", "company"], (result) => {
        if (result.termsText?.trim()) {
          fetchData(result.termsText, result.company || "unknown")
            .then(data => {
              setTermsText(data.data); 
              setCompanyName(result.company || "unknown");
            })
            .catch(err => {
              console.error("Error fetching data:", err);
              setError("Failed to load terms and conditions.");
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setTermsText("No terms and conditions found on this page.");
          setCompanyName(result.company || "Unknown");
          setLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (termsText && termsText !== "Loading...") {
        const mockGPTResponse = { risk: 70 };
        let risk = 0;

        for (const [key, value] of Object.entries(termsText)) {
            risk += value.risk_score * 2;
        }
        setRiskScore(risk);

        chrome.runtime.sendMessage({
            type: "SET_BADGE",
            text: '!',
            color: assign_color(risk)
        });
    }
  }, [termsText]);

  if (isReportPage) {
    return <FullSummary risk_score={riskScore ?? 0} />;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div style={{ width: "345px", height: "600px", fontFamily: "sans-serif" }}>
      <Header bgColor={assign_color(riskScore ?? 0)} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GaugeWrapper risk_score={riskScore ?? 0} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <Emoji />
      </div>

      <div style={{ padding: "0 12px" }}>
        {loading ? (
          <BulletList />
        ) : (
          <SummaryBox termsText={termsText} bgColor={assign_color(riskScore ?? 0)} />
        )}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        marginTop: "10px"
      }}>
        <button
          onClick={() => {
            setShowPopup(true);
            console.log("Paste T&C Link");
          }}
          style={{
            backgroundColor: colorMap[assign_color(riskScore ?? 0)],
            borderRadius: "8px",
            padding: "10px",
            width: "135px",
            height: "33px",
            fontSize: "12px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Post Review
        </button>

        <button
          onClick={() => {
            console.log("View Full Report");
            chrome.tabs.create({ url: chrome.runtime.getURL("report.html") });
          }}
          style={{
            backgroundColor: colorMap[assign_color(riskScore ?? 0)],
            borderRadius: "8px",
            padding: "10px",
            width: "135px",
            height: "33px",
            fontSize: "12px",
            border: "none",
            cursor: "pointer"
          }}
        >
          View Full Report
        </button>
        {showPopup && (
          <Popup
            inputText={inputText}
            setInputText={setInputText}
            onClose={() => setShowPopup(false)}
            onSubmit={() => {
              console.log("Review submitted:", inputText);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
