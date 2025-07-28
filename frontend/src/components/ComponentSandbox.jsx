// frontend/src/components/ComponentSandbox.jsx
import React, { useState, useEffect, useRef } from "react";
import useStore from "../store/useStore";

function ComponentSandbox() {
  const { generatedCode } = useStore();
  const iframeRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!generatedCode.jsx && !generatedCode.css) {
      setError("");
      return;
    }

    try {
      // Create a complete HTML document for the iframe
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Component Preview</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            ${generatedCode.css || ""}
          </style>
        </head>
        <body>
          <div id="root">
            ${generatedCode.jsx || ""}
          </div>
          <script>
            // Add any interactive functionality here if needed
            console.log('Component sandbox loaded');
          </script>
        </body>
        </html>
      `;

      if (iframeRef.current) {
        const iframe = iframeRef.current;
        iframe.srcdoc = htmlContent;
        setError("");
      }
    } catch (err) {
      setError("Error creating sandbox: " + err.message);
    }
  }, [generatedCode]);

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #dc3545",
          borderRadius: "8px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
        }}
      >
        <h4>Sandbox Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!generatedCode.jsx && !generatedCode.css) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h4>Component Sandbox</h4>
          <p>Start a conversation to see your component here!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <h4>Component Sandbox</h4>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          overflow: "hidden",
          minHeight: "300px",
        }}
      >
        <iframe
          ref={iframeRef}
          title="Component Preview"
          style={{
            width: "100%",
            height: "400px",
            border: "none",
            backgroundColor: "white",
          }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

export default ComponentSandbox;
