// frontend/src/components/CodeTemplates.jsx
import React, { useState } from "react";

function CodeTemplates({ onTemplateSelect }) {
  const [showTemplates, setShowTemplates] = useState(false);

  const templates = [
    {
      name: "Button Component",
      prompt: "Create a modern button component with hover effects",
      description: "A styled button with CSS animations",
    },
    {
      name: "Card Component",
      prompt: "Create a card component with image, title, and description",
      description: "A responsive card layout",
    },
    {
      name: "Navigation Bar",
      prompt: "Create a responsive navigation bar with logo and menu items",
      description: "A modern navbar with mobile support",
    },
    {
      name: "Form Component",
      prompt: "Create a contact form with validation styling",
      description: "A styled form with input fields",
    },
    {
      name: "Modal Component",
      prompt: "Create a modal dialog component with overlay",
      description: "A popup modal with backdrop",
    },
    {
      name: "Loading Spinner",
      prompt: "Create an animated loading spinner component",
      description: "A CSS animated spinner",
    },
  ];

  const useTemplate = (template) => {
    if (onTemplateSelect) {
      onTemplateSelect(template.prompt);
    }
    setShowTemplates(false);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <button
        onClick={() => setShowTemplates(!showTemplates)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {showTemplates ? "Hide Templates" : "Show Templates"}
      </button>

      {showTemplates && (
        <div
          style={{
            marginTop: "10px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h5 style={{ margin: "0 0 15px 0", color: "black" }}>
            Code Templates
          </h5>
          <div style={{ display: "grid", gap: "10px" }}>
            {templates.map((template, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={() => useTemplate(template)}
              >
                <h6 style={{ margin: "0 0 5px 0", color: "black" }}>
                  {template.name}
                </h6>
                <p style={{ margin: "0", fontSize: "12px", color: "#6c757d" }}>
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeTemplates;
