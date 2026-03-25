import React from "react";

const MinimalLogo = ({ data }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <h1
        style={{
          color: data.color,
          fontFamily: data.font,
          fontSize: "36px",
          borderBottom: "2px solid",
          display: "inline-block",
        }}
      >
        {data.name || "Logo"}
      </h1>
    </div>
  );
};

export default MinimalLogo;