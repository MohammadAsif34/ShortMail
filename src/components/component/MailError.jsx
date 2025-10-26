import React from "react";

const MailError = ({ message, retry }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        color: "#ff4d4f",
        fontFamily: "sans-serif",
      }}
    >
      <h2>⚠ Something went wrong!</h2>
      <p>{message || "Unable to load mails."}</p>
      {retry && (
        <button
          onClick={retry}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            border: "none",
            backgroundColor: "#1890ff",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default MailError;
