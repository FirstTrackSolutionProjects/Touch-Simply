import React from "react";

const ModernLogo = ({ data }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-black text-white px-10 py-6 rounded-2xl shadow-xl">
        <h1
          style={{
            color: data.color,
            fontFamily: data.font,
            fontSize: "42px",
            letterSpacing: "2px",
          }}
        >
          {data.name || "Brand"}
        </h1>
      </div>
    </div>
  );
};

export default ModernLogo;