// frontend/src/components/PropertyEditor.jsx
import React, { useState } from "react";
import useStore from "../store/useStore";

function PropertyEditor() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [properties, setProperties] = useState({
    fontSize: "16px",
    color: "#000000",
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  });

  const { generatedCode, setGeneratedCode } = useStore();

  const handleElementClick = (element) => {
    setSelectedElement(element);
    // Extract current styles from the element
    const computedStyle = window.getComputedStyle(element);
    setProperties({
      fontSize: computedStyle.fontSize,
      color: computedStyle.color,
      backgroundColor: computedStyle.backgroundColor,
      padding: computedStyle.padding,
      borderRadius: computedStyle.borderRadius,
      border: computedStyle.border,
    });
  };

  const updateProperty = (property, value) => {
    setProperties((prev) => ({ ...prev, [property]: value }));

    // Update the generated code with new styles
    if (selectedElement && generatedCode.jsx) {
      const elementId = selectedElement.id || "selected-element";
      const newCSS = `
        #${elementId} {
          font-size: ${properties.fontSize};
          color: ${properties.color};
          background-color: ${properties.backgroundColor};
          padding: ${properties.padding};
          border-radius: ${properties.borderRadius};
          border: ${properties.border};
        }
      `;

      setGeneratedCode({
        ...generatedCode,
        css: generatedCode.css + "\n" + newCSS,
      });
    }
  };

  if (!selectedElement) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h4>Property Editor</h4>
        <p>Click on any element in the preview to edit its properties</p>
      </div>
    );
  }

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h4>Property Editor</h4>
      <p>Editing: {selectedElement.tagName.toLowerCase()}</p>

      <div style={{ marginBottom: "10px" }}>
        <label>Font Size:</label>
        <input
          type="range"
          min="8"
          max="48"
          value={parseInt(properties.fontSize)}
          onChange={(e) => updateProperty("fontSize", e.target.value + "px")}
        />
        <span>{properties.fontSize}</span>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Text Color:</label>
        <input
          type="color"
          value={properties.color}
          onChange={(e) => updateProperty("color", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Background Color:</label>
        <input
          type="color"
          value={properties.backgroundColor}
          onChange={(e) => updateProperty("backgroundColor", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Padding:</label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(properties.padding)}
          onChange={(e) => updateProperty("padding", e.target.value + "px")}
        />
        <span>{properties.padding}</span>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Border Radius:</label>
        <input
          type="range"
          min="0"
          max="20"
          value={parseInt(properties.borderRadius)}
          onChange={(e) =>
            updateProperty("borderRadius", e.target.value + "px")
          }
        />
        <span>{properties.borderRadius}</span>
      </div>

      <button
        onClick={() => setSelectedElement(null)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close Editor
      </button>
    </div>
  );
}

export default PropertyEditor;
