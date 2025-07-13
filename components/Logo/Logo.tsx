import React from "react";

const Logo = () => {
  return (
    <div
      style={{
        fontWeight: "700",
        fontSize: "1.2rem",
        color: "#000",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        letterSpacing: "2px",
        userSelect: "none",
        display: "inline-block",
        border: "2px solid #000",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        backgroundColor: "#fff",
      }}
      aria-label="BlitzQuestions logo"
    >
      BlitzQuestions
    </div>
  );
};

export default Logo;
