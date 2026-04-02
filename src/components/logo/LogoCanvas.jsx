import React, { useState } from "react";
import ModernLogo from "../../templates/ModernLogo";
import MinimalLogo from "../../templates/MinimalLogo";

const LogoCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");

  return (
    <div className="h-full flex flex-col">

      {/* 🔥 Template Switch */}
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setTemplate("modern")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            template === "modern"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow"
              : "bg-white/20 text-gray-700 hover:bg-white"
          }`}
        >
          Modern
        </button>

        <button
          onClick={() => setTemplate("minimal")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            template === "minimal"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow"
              : "bg-white/20 text-gray-700 hover:bg-white"
          }`}
        >
          Minimal
        </button>
      </div>

      {/* 🔥 Canvas Area */}
      <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow-inner p-6">

        <div className="transition-all duration-300 hover:scale-105">
          {template === "modern" && <ModernLogo data={data} />}
          {template === "minimal" && <MinimalLogo data={data} />}
        </div>

      </div>

    </div>
  );
};

export default LogoCanvas;