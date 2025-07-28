// frontend/src/components/LivePreview.jsx
import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";

function LivePreview() {
  const { generatedCode } = useStore();
  const [previewHtml, setPreviewHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("LivePreview - generatedCode changed:", generatedCode);

    if (!generatedCode.jsx && !generatedCode.css) {
      setPreviewHtml("");
      setError("");
      return;
    }

    try {
      // Create a safe HTML structure for the preview
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            ${generatedCode.css || ""}
          </style>
        </head>
        <body>
          <div id="root">
            ${generatedCode.jsx || ""}
          </div>
        </body>
        </html>
      `;

      setPreviewHtml(htmlContent);
      setError("");
    } catch (err) {
      setError("Error rendering preview: " + err.message);
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
        <h4>Preview Error</h4>
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
        }}
      >
        <h4 style={{ color: "black" }}>Live Preview</h4>
        <p style={{ color: "black" }}>
          Start a conversation to see your component here!
        </p>
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
      <h4>Live Preview</h4>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "20px",
          minHeight: "200px",
          backgroundColor: "white",
        }}
      >
        {generatedCode.jsx ? (
          <div
            dangerouslySetInnerHTML={{
              __html: generatedCode.jsx
                .replace(/import.*?;?\n?/g, "")
                .replace(/export.*?;?\n?/g, "")
                .replace(/const.*?=.*?=>.*?{/g, "")
                .replace(/};/g, "")
                .replace(/return\s*\(/g, "")
                .replace(/\);/g, "")
                .replace(/useState.*?;/g, "")
                .replace(/useEffect.*?};/g, "")
                .replace(/React.*?{/g, "")
                .replace(/default.*?;/g, "")
                .replace(/className.*?/g, "")
                .replace(/<div.*?>/g, "<div>")
                .replace(/<p.*?>/g, "<p>")
                .replace(/const.*?useState.*?;/g, "")
                .replace(/useEffect.*?};/g, "")
                .replace(/\[.*?\]/g, "")
                .replace(/new Date\(\)/g, "new Date()")
                .replace(/toLocaleDateString.*?\)/g, "toLocaleDateString()"),
            }}
            style={{
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.6",
              color: "black",
            }}
          />
        ) : (
          <p style={{ color: "black" }}>No JSX code to preview</p>
        )}
      </div>
      {generatedCode.css && (
        <details style={{ marginTop: "10px" }}>
          <summary>Applied CSS</summary>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "12px",
              overflow: "auto",
            }}
          >
            {generatedCode.css}
          </pre>
        </details>
      )}
    </div>
  );
}

export default LivePreview;
