import React, { useState } from "react";

import cornBanner from "./assets/corn.jpg";
import soybeansBanner from "./assets/soybeans.jpg";
import wheatBanner from "./assets/wheat.jpg";
import cottonBanner from "./assets/cotton.jpg";
import canolaBanner from "./assets/canola.jpg";

const cropImages = {
  Corn: cornBanner,
  Soybeans: soybeansBanner,
  Wheat: wheatBanner,
  Cotton: cottonBanner,
  Canola: canolaBanner,
};

const SentimentDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState("Corn");

  const sentimentScore = 64;
  const sentimentLabel =
    sentimentScore >= 66 ? "Bullish" : sentimentScore <= 33 ? "Bearish" : "Neutral";

  const components = [
    {
      title: "Price Momentum",
      description: "Tracks recent price movement to measure short-term market direction.",
      score: 70.7,
    },
    {
      title: "COT Positioning",
      description: "Based on Commitment of Traders data to gauge trader sentiment.",
      score: 59.04,
    },
    {
      title: "News Sentiment",
      description: "Sentiment extracted from recent ag news and headlines.",
      score: 66.7,
    },
    {
      title: "Weather Impact",
      description: "Evaluates how current weather conditions may influence yields.",
      score: 53,
    },
    {
      title: "Export Demand",
      description: "Represents the strength of foreign demand for U.S. corn.",
      score: 100,
    },
    {
      title: "Technical Indicators",
      description: "Includes RSI, moving averages, and other trading signals.",
      score: 50,
    },
  ];

  const getLabel = (score) => {
    if (score >= 66) return "Bullish";
    if (score <= 33) return "Bearish";
    return "Neutral";
  };

  const getColor = (score) => {
    if (score >= 66) return "#e6f9f0"; // light green
    if (score <= 33) return "#fceaea"; // light red
    return "#fff9e5"; // light yellow
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "1rem", // 🔧 tighter top padding
      }}
    >
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "260px", // slightly shorter than before
          overflow: "hidden",
          borderRadius: "8px",
          margin: "0",
        }}
      >
        <img
          src={cropImages[selectedCrop]}
          alt={`${selectedCrop} banner`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Title and Gauge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          Ag Sentiment Index — April 13, 2025
        </h1>

        {/* Gauge — slightly wider */}
        <div style={{ position: "relative", width: 200, height: 140 }}>
          <svg width="200" height="140">
            <path
              d="M20,120 A80,80 0 0,1 180,120"
              fill="none"
              stroke="#ddd"
              strokeWidth="20"
            />
            <defs>
              <linearGradient
                id="sentimentGradient"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#e74c3c" />
                <stop offset="50%" stopColor="#f1c40f" />
                <stop offset="100%" stopColor="#2ecc71" />
              </linearGradient>
            </defs>
            <path
              d="M20,120 A80,80 0 0,1 180,120"
              fill="none"
              stroke="url(#sentimentGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="180"
              strokeDashoffset={180 - sentimentScore * 1.8}
            />
            <line
              x1="100"
              y1="120"
              x2={100 + 70 * Math.cos((Math.PI * sentimentScore / 100) - Math.PI)}
              y2={120 + 70 * Math.sin((Math.PI * sentimentScore / 100) - Math.PI)}
              stroke="#333"
              strokeWidth="4"
            />
            <circle cx="100" cy="120" r="5" fill="#333" />
          </svg>
          <div
            style={{ textAlign: "center", marginTop: "4px", fontWeight: "bold" }}
          >
            {sentimentScore.toFixed(2)} / 100 — {sentimentLabel}
          </div>
        </div>
      </div>

      {/* Crop Selector */}
      <div style={{ margin: "0.5rem 0 1rem" }}>
        {Object.keys(cropImages).map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            style={{
              background: crop === selectedCrop ? "#2d3748" : "#e2e8f0",
              color: crop === selectedCrop ? "#fff" : "#2d3748",
              border: "none",
              padding: "6px 12px",
              borderRadius: "16px",
              marginRight: "8px",
              cursor: "pointer",
              fontSize: "0.85rem",
              transition: "background 0.2s ease",
            }}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.95rem",
          maxWidth: "800px",
          color: "#333",
          marginBottom: "1.25rem",
        }}
      >
        The Ag Sentiment Index is a dynamic scoring model designed to reflect
        current market conditions — including psychology, fundamentals, and
        technical trends — in U.S. corn production.
      </p>

      {/* Component Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {components.map((comp) => (
          <div
            key={comp.title}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: getColor(comp.score), // 🔧 color-coded background
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {comp.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#555" }}>
              {comp.description}
            </p>
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "#222",
              }}
            >
              Score: {comp.score} — {getLabel(comp.score)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentDashboard;
