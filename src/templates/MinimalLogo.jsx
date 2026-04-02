import React from "react";

const MinimalLogo = ({ data }) => {
  return (
    <div className="flex items-center justify-center h-full bg-white">

      <div className="text-center">

        <h1
          style={{
            color: data.color,
            fontFamily: data.font,
          }}
          className="text-4xl md:text-5xl font-light tracking-wide"
        >
          {data.name || "Your Brand"}
        </h1>

        {/* Elegant underline */}
        <div
          style={{ backgroundColor: data.color }}
          className="h-[2px] w-16 mx-auto mt-2 rounded-full"
        ></div>

      </div>

    </div>
  );
};

export default MinimalLogo;