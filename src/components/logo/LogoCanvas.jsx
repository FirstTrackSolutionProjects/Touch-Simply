import React, { useState, useRef } from "react";
import ModernLogo from "../../templates/ModernLogo";
import MinimalLogo from "../../templates/MinimalLogo";
import ElegantLogo from "../../templates/ElegantLogo";
import GlassLogo from "../../templates/GlassLogo";
import * as htmlToImage from "html-to-image";

const LogoCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");
  const ref = useRef();

  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalLogo data={data} />;
      case "elegant":
        return <ElegantLogo data={data} />;
      case "glass":
        return <GlassLogo data={data} />;
      default:
        return <ModernLogo data={data} />;
    }
  };

  const downloadLogo = async () => {
    const dataUrl = await htmlToImage.toPng(ref.current);
    const link = document.createElement("a");
    link.download = "logo.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>

      {/* TEMPLATE SWITCH */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["modern", "minimal", "elegant", "glass"].map((t) => (
          <button
            key={t}
            onClick={() => setTemplate(t)}
            className={`px-3 py-1 text-xs rounded-full ${
              template === t
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 🔥 BOTH VIEW */}
      <div ref={ref} className="grid md:grid-cols-2 gap-6">

        {/* LIGHT */}
        <div className="bg-white rounded-xl p-10 flex items-center justify-center shadow-xl hover:scale-105 transition">
          {renderTemplate()}
        </div>

        {/* DARK */}
        <div className="bg-gray-900 rounded-xl p-10 flex items-center justify-center shadow-xl hover:scale-105 transition">
          <div className="invert">
            {renderTemplate()}
          </div>
        </div>

      </div>

      {/* DOWNLOAD */}
      <button
        onClick={downloadLogo}
        className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
      >
        Download Logo
      </button>
    </div>
  );
};

export default LogoCanvas;