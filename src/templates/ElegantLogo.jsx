import React from "react";
import * as Icons from "react-icons/fa";

const ElegantLogo = ({ data }) => {
  const Icon = Icons[data.icon] || Icons.FaCrown;

  return (
    <div className="flex flex-col items-center justify-center text-center select-none">

      <Icon
        size={30}
        style={{
          color: data.color,
          marginBottom: "8px",
        }}
      />

      <h1
        style={{
          fontFamily: "Playfair Display",
          fontSize: "26px",
          fontWeight: "600",
          letterSpacing: "2px",
        }}
        className="uppercase"
      >
        {data.name || "Brand"}
      </h1>

      {/* subtle divider */}
      <div
        style={{ backgroundColor: data.color }}
        className="mt-2 h-[1px] w-10 opacity-70"
      ></div>

    </div>
  );
};

export default ElegantLogo;