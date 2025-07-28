// frontend/src/components/ImageUpload.jsx
import React, { useState } from "react";

function ImageUpload({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage && onImageUpload) {
      onImageUpload(selectedImage);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h5 style={{ margin: "0 0 10px 0", color: "black" }}>Image Upload</h5>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={{ marginBottom: "10px" }}
      />

      {previewUrl && (
        <div style={{ marginBottom: "10px" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "150px",
              borderRadius: "4px",
            }}
          />
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        {selectedImage && (
          <>
            <button
              onClick={handleUpload}
              style={{
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Use Image
            </button>
            <button
              onClick={clearImage}
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
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
