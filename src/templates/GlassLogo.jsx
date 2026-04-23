import React from "react";
import * as Icons from "react-icons/fa";

const GlassLogo = ({ data }) => {
  const Icon = Icons[data.icon] || Icons.FaRocket;

  const gradient = `linear-gradient(135deg, ${data.color}, #9333ea)`;

  return (
    <div className="flex items-center gap-4 px-6 py-3 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)] select-none">

      {/* ICON */}
      <div
        className="p-3 rounded-xl shadow-md"
        style={{
          background: data.gradient ? gradient : data.color,
        }}
      >
        <Icon size={20} color="#fff" />
      </div>

      {/* TEXT */}
      {data.layout !== "icon" && (
        <h1
          style={{
            fontFamily: data.font,
            fontSize: "20px",
            fontWeight: "600",
            color: "#111",
          }}
          className="tracking-wide"
        >
          {data.name || "Brand"}
        </h1>
      )}

    </div>
  );
};

export default GlassLogo;