// src/components/CodePreview.jsx
import React, { useState } from "react";

function CodePreview({ jsxCode, cssCode }) {
  const [activeTab, setActiveTab] = useState("jsx");

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        height: "400px",
        overflowY: "auto",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setActiveTab("jsx")}
          disabled={activeTab === "jsx"}
        >
          JSX/TSX
        </button>
        <button
          onClick={() => setActiveTab("css")}
          disabled={activeTab === "css"}
          style={{ marginLeft: 10 }}
        >
          CSS
        </button>
      </div>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {activeTab === "jsx"
          ? jsxCode || "No JSX code yet."
          : cssCode || "No CSS code yet."}
      </pre>
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => {
            const codeToCopy = activeTab === "jsx" ? jsxCode : cssCode;
            if (codeToCopy) {
              navigator.clipboard.writeText(codeToCopy);
              alert("Copied to clipboard!");
            }
          }}
        >
          Copy
        </button>
        {/* Download as .zip functionality can be added later */}
      </div>
    </div>
  );
}

export default CodePreview;
