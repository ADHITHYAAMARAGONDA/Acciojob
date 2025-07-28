// src/components/CodePreview.jsx
import React, { useState } from "react";

function CodePreview({ jsxCode, cssCode }) {
  const [activeTab, setActiveTab] = useState("jsx");

  const downloadAsZip = () => {
    if (!jsxCode && !cssCode) {
      alert("No code to download!");
      return;
    }

    // Create a simple download function (for now, we'll create separate files)
    const downloadFile = (content, filename) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    if (jsxCode) {
      downloadFile(jsxCode, "component.jsx");
    }
    if (cssCode) {
      downloadFile(cssCode, "styles.css");
    }

    alert("Files downloaded!");
  };

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
          style={{
            padding: "8px 16px",
            backgroundColor: activeTab === "jsx" ? "#007bff" : "#f8f9fa",
            color: activeTab === "jsx" ? "white" : "black",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          JSX/TSX
        </button>
        <button
          onClick={() => setActiveTab("css")}
          disabled={activeTab === "css"}
          style={{
            marginLeft: 10,
            padding: "8px 16px",
            backgroundColor: activeTab === "css" ? "#007bff" : "#f8f9fa",
            color: activeTab === "css" ? "white" : "black",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          CSS
        </button>
      </div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "#f8f9fa",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "14px",
          lineHeight: "1.4",
          color: "black",
        }}
      >
        {activeTab === "jsx"
          ? jsxCode || "No JSX code yet."
          : cssCode || "No CSS code yet."}
      </pre>
      <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            const codeToCopy = activeTab === "jsx" ? jsxCode : cssCode;
            if (codeToCopy) {
              navigator.clipboard.writeText(codeToCopy);
              alert("Copied to clipboard!");
            }
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>
        <button
          onClick={downloadAsZip}
          style={{
            padding: "8px 16px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default CodePreview;
