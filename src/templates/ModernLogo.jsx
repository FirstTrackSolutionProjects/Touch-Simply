import React from "react";
import { icons } from "../utils/iconMap";

const ModernLogo = ({ data }) => {
  const Icon = icons[data.icon];

  const gradient = `linear-gradient(135deg, ${data.color}, #4f46e5)`;

  const textStyle = data.gradient
    ? {
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : { color: data.color };

  const iconBg = data.gradient ? gradient : data.color;

  return (
    <div className="flex items-center justify-center select-none">

      {/* HORIZONTAL */}
      {data.layout === "horizontal" && (
        <div className="flex items-center gap-4">

          <div
            style={{ background: iconBg }}
            className="p-3 rounded-2xl text-white text-xl shadow-lg"
          >
            <Icon />
          </div>

          <h1
            style={{ ...textStyle, fontFamily: data.font }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            {data.name || "Brand"}
          </h1>
        </div>
      )}

      {/* STACKED */}
      {data.layout === "stacked" && (
        <div className="text-center">

          <div
            style={{ background: iconBg }}
            className="inline-flex p-3 rounded-2xl text-white text-xl mb-3 shadow-lg"
          >
            <Icon />
          </div>

          <h1
            style={{ ...textStyle, fontFamily: data.font }}
            className="text-3xl font-bold"
          >
            {data.name || "Brand"}
          </h1>
        </div>
      )}

      {/* ICON ONLY */}
      {data.layout === "icon" && (
        <div
          style={{ background: iconBg }}
          className="p-5 rounded-2xl text-white text-3xl shadow-lg"
        >
          <Icon />
        </div>
      )}
    </div>
  );
};

export default ModernLogo;