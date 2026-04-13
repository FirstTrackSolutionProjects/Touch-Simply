import React from "react";

const MinimalLogo = ({ data }) => {
  return (
    <div className="text-center">

      <h1
        style={{
          color: data.color,
          fontFamily: data.font,
          letterSpacing: "2px",
        }}
        className="text-4xl font-light"
      >
        {data.name || "Your Brand"}
      </h1>

      <div className="flex justify-center mt-2">
        <div
          style={{ backgroundColor: data.color }}
          className="h-[2px] w-10 rounded-full"
        ></div>
      </div>

    </div>
  );
};

export default MinimalLogo;