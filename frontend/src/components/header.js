import React from "react";

const Header = ({bgColor}) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: bgColor || "var(--green)", // Defaults to green
        color: "white",
        padding: "10px",
        textAlign: "center",
        fontWeight: 800,
        fontSize: "32px",
        fontFamily: "'Jost', sans-serif"
      }}
    >
      FinePrint
    </div>
  );
};

export default Header;
