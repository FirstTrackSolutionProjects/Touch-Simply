import React from "react";

const MinimalLogo = ({ data }) => {
  return (
    <div className="text-center select-none">

      <h1
        style={{
          color: data.color,
          fontFamily: data.font,
          letterSpacing: "3px",
        }}
        className="text-4xl md:text-5xl font-extralight tracking-widest"
      >
        {data.name || "Your Brand"}
      </h1>

      {/* elegant underline */}
      <div className="flex justify-center mt-3">
        <div
          style={{
            background: `linear-gradient(to right, transparent, ${data.color}, transparent)`,
          }}
          className="h-[2px] w-16 rounded-full opacity-80"
        ></div>
      </div>

    </div>
  );
};

export default MinimalLogo;