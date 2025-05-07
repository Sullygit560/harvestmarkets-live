import React from "react";

const ComponentCard = ({ title, value, description }) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 shadow bg-white">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default ComponentCard;
