import React from "react";
import { icons } from "../utils/iconMap";

const ModernLogo = ({ data }) => {
  const Icon = icons[data.icon];

  const colorStyle = data.gradient
    ? {
        background: `linear-gradient(45deg, ${data.color}, #4f46e5)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : { color: data.color };

  return (
    <div className="flex items-center justify-center">

      {/* Horizontal */}
      {data.layout === "horizontal" && (
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: data.color }}
            className="p-3 rounded-xl text-white text-xl"
          >
            <Icon />
          </div>

          <h1
            style={{ ...colorStyle, fontFamily: data.font }}
            className="text-3xl font-bold"
          >
            {data.name || "Brand"}
          </h1>
        </div>
      )}

      {/* Stacked */}
      {data.layout === "stacked" && (
        <div className="text-center">
          <div
            style={{ backgroundColor: data.color }}
            className="inline-flex p-3 rounded-xl text-white text-xl mb-2"
          >
            <Icon />
          </div>

          <h1
            style={{ ...colorStyle, fontFamily: data.font }}
            className="text-3xl font-bold"
          >
            {data.name || "Brand"}
          </h1>
        </div>
      )}

      {/* Icon Only */}
      {data.layout === "icon" && (
        <div
          style={{ backgroundColor: data.color }}
          className="p-5 rounded-xl text-white text-3xl"
        >
          <Icon />
        </div>
      )}
    </div>
  );
};

export default ModernLogo;