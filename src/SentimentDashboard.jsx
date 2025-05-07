import React from "react";
import SentimentGauge from "./components/SentimentGauge.jsx";
import ComponentCard from "./components/ComponentCard.jsx";

const sentimentScore = 68; // pull this from backend later
const componentData = [
  { title: "Price Momentum", value: "+1.5", description: "Strong upward trend in corn prices this week." },
  { title: "COT Positioning", value: "Bullish", description: "Managed money continues to add long positions." },
  { title: "Weather Impact", value: "Moderate", description: "Mixed precipitation with drought in parts of IA." },
  { title: "Export Activity", value: "Weak", description: "Export volumes lag seasonal averages." },
  { title: "Technical Indicators", value: "Neutral", description: "RSI and MACD provide mixed signals." },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full p-6 gap-6">
      {/* Left: Cards */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {componentData.map((component, index) => (
          <ComponentCard
            key={index}
            title={component.title}
            value={component.value}
            description={component.description}
          />
        ))}
      </div>

      {/* Right: Gauge */}
      <div className="w-full md:w-[280px] flex-shrink-0">
        <SentimentGauge score={sentimentScore} />
      </div>
    </div>
  );
};

export default Dashboard;
