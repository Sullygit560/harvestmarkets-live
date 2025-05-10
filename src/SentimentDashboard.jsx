import React, { useState, useEffect } from "react";

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

const describeArc = (x, y, radius, score) => {
  const clampedScore = Math.max(0, Math.min(score, 100));
  const angle = (Math.PI * clampedScore) / 100;
  const xEnd = x + radius * Math.cos(angle - Math.PI);
  const yEnd = y + radius * Math.sin(angle - Math.PI);
  const largeArcFlag = clampedScore > 50 ? 1 : 0;
  return `M${x - radius},${y} A${radius},${radius} 0 ${largeArcFlag},1 ${xEnd},${yEnd}`;
};

const getGradientColor = (score) => {
  const r = score < 50 ? 231 : 255 - Math.round((score - 50) * 4.8);
  const g = score < 50 ? Math.round(score * 4.8) : 223;
  const b = 200;
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
};

const getLabel = (score) => {
  if (score >= 66) return "Bullish";
  if (score <= 33) return "Bearish";
  return "Neutral";
};

const SentimentDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState("Corn");
  const [showModal, setShowModal] = useState(false);
  const [sentimentScore, setSentimentScore] = useState(null);
  const [componentScores, setComponentScores] = useState({});

  useEffect(() => {
    fetch("https://harvestmarkets-api.onrender.com/api/latest-score")
      .then(res => res.json())
      .then(data => {
        if (data?.score !== undefined) {
          setSentimentScore(data.score);
        }
        if (data?.scores) {
          setComponentScores(data.scores);
        }
      })
      .catch(err => console.error("Failed to fetch score:", err));
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      {/* Banner */}
      <div style={{ width: "100%", height: "260px", overflow: "hidden", borderRadius: "8px" }}>
        <img
          src={cropImages[selectedCrop]}
          alt={`${selectedCrop} banner`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Header & Gauge */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "2rem",
        marginTop: "1.25rem",
        marginBottom: "1.5rem"
      }}>
        {/* Left Side */}
        <div style={{ flex: "1 1 60%", minWidth: "300px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "0.75rem" }}>
            Ag Sentiment Index
          </h1>

          <div style={{ marginBottom: "0.75rem" }}>
            {Object.keys(cropImages).map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                style={{
                  background: crop === selectedCrop ? "#2d3748" : "#e2e8f0",
                  color: crop === selectedCrop ? "#fff" : "#2d3748",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {crop}
              </button>
            ))}
          </div>

          <p style={{ fontSize: "0.95rem", maxWidth: "600px", color: "#333" }}>
            The Ag Sentiment Index is a dynamic scoring model designed to reflect current market conditions —
            including psychology, fundamentals, and technical trends — in U.S. corn production.
          </p>
        </div>

        {/* Gauge Side */}
        <div style={{ flex: "1 1 35%", minWidth: "240px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {sentimentScore !== null ? (
            <>
              <svg width="200" height="140">
                <path d="M20,120 A80,80 0 0,1 180,120" fill="none" stroke="#eee" strokeWidth="20" />
                <path
                  d={describeArc(100, 120, 80, sentimentScore)}
                  fill="none"
                  stroke={getGradientColor(sentimentScore)}
                  strokeWidth="20"
                  strokeLinecap="round"
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
              <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: "0.25rem" }}>
                {sentimentScore.toFixed(2)} / 100 — {getLabel(sentimentScore)}
              </div>
            </>
          ) : (
            <div style={{ fontWeight: "bold", padding: "2rem 0" }}>Loading score...</div>
          )}

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "#2d3748",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              marginTop: "0.5rem"
            }}
          >
            Generate Analysis
          </button>
        </div>
      </div>

      {/* Component Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {Object.entries(componentScores).map(([key, value]) => {
          const title = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <div
              key={key}
              style={{
                backgroundColor: getGradientColor(value),
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#222" }}>
                Score: {value} — {getLabel(value)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "600px",
              width: "90%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Market Sentiment Analysis</h2>
            <p style={{ fontSize: "0.95rem", marginBottom: "1rem", lineHeight: "1.5" }}>
              Current conditions suggest a {getLabel(sentimentScore)?.toLowerCase()} outlook with a composite score of {sentimentScore}.
              Key contributors include price and export strength.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
              With a score {Math.abs(sentimentScore - 70).toFixed(1)} points from the next trade trigger threshold,
              traders may consider monitoring for further alignment before acting.
            </p>
            <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#2d3748",
                  color: "#fff",
                  padding: "8px 16px",
                  fontSize: "0.9rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentDashboard;
