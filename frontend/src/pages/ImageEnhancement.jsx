import React, { useState } from "react";

export default function ImageEnhancement() {
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);

  // Theme colors
  const peach = "#F7BFA0";
  const lightPeach = "#FAD7C4";
  const softBg = "#FFF7F3";
  const textDark = "#4B3A36";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgURL = URL.createObjectURL(file);
    setOriginalImage(imgURL);

    // Mock enhanced output (replace with API call)
    setTimeout(() => {
      setEnhancedImage(imgURL);
    }, 1200);
  };

  return (
    <div
      style={{
        background: softBg,
        minHeight: "100vh",
        padding: "35px",
        color: textDark,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            background: `linear-gradient(90deg, ${peach}, ${lightPeach})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          AI Image Enhancement
        </h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: peach,
              fontWeight: 600,
              cursor: "pointer",
              color: "#4B3A36",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            Clear
          </button>

          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: peach,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFF",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            IS
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 80px 1fr",
          gap: "25px",
          alignItems: "center",
        }}
      >
        {/* ORIGINAL IMAGE PANEL */}
        <div
          style={{
            background: "#FFF",
            padding: "20px",
            borderRadius: "18px",
            minHeight: "500px",
            boxShadow: "0 5px 14px rgba(0,0,0,0.12)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Original Image</h2>

          <div
            style={{
              width: "100%",
              height: "420px",
              border: `2px dashed ${peach}`,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: lightPeach,
            }}
          >
            {originalImage ? (
              <img
                src={originalImage}
                alt="Original"
                style={{
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <label
                htmlFor="uploadInput"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  color: textDark,
                }}
              >
                <p style={{ fontSize: "18px", fontWeight: 600 }}>
                  Click to upload image
                </p>
              </label>
            )}

            <input
              id="uploadInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* CENTER BUTTON BLOCK */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: peach,
              padding: "18px",
              borderRadius: "14px",
              cursor: "pointer",
              width: "65px",
              height: "65px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.14)",
              fontWeight: "bold",
              color: "#4B3A36",
            }}
          >
            →
          </div>

          <button
            style={{
              padding: "12px 20px",
              width: "120px",
              borderRadius: "12px",
              background: lightPeach,
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              color: textDark,
              boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
            }}
          >
            Enhance
          </button>
        </div>

        {/* ENHANCED IMAGE PANEL */}
        <div
          style={{
            background: "#FFF",
            padding: "20px",
            borderRadius: "18px",
            minHeight: "500px",
            boxShadow: "0 5px 14px rgba(0,0,0,0.12)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Enhanced Image</h2>

          <div
            style={{
              width: "100%",
              height: "420px",
              border: `2px solid ${peach}`,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "#FFF2EC",
            }}
          >
            {enhancedImage ? (
              <img
                src={enhancedImage}
                alt="Enhanced"
                style={{
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <p style={{ fontSize: "18px", opacity: 0.6 }}>
                Enhanced image will appear here
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "14px",
          opacity: "0.7",
        }}
      >
        Powered by AI Image Enhancement Engine
      </div>
    </div>
  );
}
