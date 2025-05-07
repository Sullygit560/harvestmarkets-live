import React from "react";

const SentimentGauge = ({ score }) => {
  return (
    <div className="border p-4 rounded bg-white shadow text-center">
      <div className="text-2xl font-semibold">Sentiment Score</div>
      <div className="text-4xl font-bold text-green-600 mt-2">{score}</div>
      <div className="text-sm text-gray-500 mt-1">(Gauge will go here)</div>
    </div>
  );
};

export default SentimentGauge;
