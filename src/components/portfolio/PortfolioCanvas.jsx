import React, { useState } from "react";
import ModernPortfolio from "../../templates/ModernPortfolio";
import MinimalPortfolio from "../../templates/MinimalPortfolio";

const PortfolioCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");

  return (
    <div className="h-full">
      
      {/* Template Switch */}
     <div className="flex gap-2 mb-4">
        <button
            onClick={() => setTemplate("modern")}
            className={`px-3 py-1 rounded text-sm ${
            template === "modern"
                ? "bg-purple-600 text-white"
                : "border"
            }`}
        >
            Modern
        </button>

        <button
            onClick={() => setTemplate("minimal")}
            className={`px-3 py-1 rounded text-sm ${
            template === "minimal"
                ? "bg-purple-600 text-white"
                : "border"
            }`}
        >
            Minimal
        </button>
        </div>

      {/* Template Render */}
      <div className="h-[90%] overflow-auto">
        {template === "modern" && <ModernPortfolio data={data} />}
        {template === "minimal" && <MinimalPortfolio data={data} />}
      </div>
    </div>
  );
};

export default PortfolioCanvas;