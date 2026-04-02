import React from "react";

const ModernLogo = ({ data }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">

      <div className="px-10 py-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

        <h1
          style={{
            color: data.color,
            fontFamily: data.font,
          }}
          className="text-4xl md:text-5xl font-bold tracking-widest"
        >
          {data.name || "BRAND"}
        </h1>

        {/* Glow line */}
        <div
          style={{ backgroundColor: data.color }}
          className="h-[3px] w-20 mt-3 rounded-full"
        ></div>

      </div>

    </div>
  );
};

export default ModernLogo;