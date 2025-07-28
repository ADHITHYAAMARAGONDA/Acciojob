// frontend/src/components/CollaborationPanel.jsx
import React, { useState } from "react";

function CollaborationPanel() {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const generateShareUrl = () => {
    const url = `${window.location.origin}/share/${Date.now()}`;
    setShareUrl(url);
    setIsSharing(true);
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Share URL copied to clipboard!");
  };

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        marginBottom: "15px",
      }}
    >
      <h5 style={{ margin: "0 0 10px 0", color: "black" }}>Collaboration</h5>

      {!isSharing ? (
        <button
          onClick={generateShareUrl}
          style={{
            padding: "8px 16px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Share Session
        </button>
      ) : (
        <div>
          <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "black" }}>
            Share this URL with others:
          </p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={shareUrl}
              readOnly
              style={{
                flex: 1,
                padding: "6px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />
            <button
              onClick={copyShareUrl}
              style={{
                padding: "6px 12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Copy
            </button>
            <button
              onClick={() => setIsSharing(false)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "15px" }}>
        <h6 style={{ margin: "0 0 8px 0", color: "black" }}>
          Features Coming Soon:
        </h6>
        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
            fontSize: "12px",
            color: "#6c757d",
          }}
        >
          <li>Real-time collaboration</li>
          <li>Live cursors</li>
          <li>Comment system</li>
          <li>Version history</li>
        </ul>
      </div>
    </div>
  );
}

export default CollaborationPanel;
