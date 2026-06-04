import React from "react";
import { motion } from "framer-motion";
import { icons } from "../utils/iconMap";

const ModernLogo = ({ data }) => {
  const {
    name = "Brand",
    color = "#7c3aed",
    font = "Poppins",
    layout = "horizontal",
    gradient = true,
    icon,
  } = data || {};

  const Icon =
    icons[icon];

  // ================= GRADIENT =================
  const gradientStyle = `linear-gradient(
    135deg,
    ${color},
    #4f46e5
  )`;

  const textStyle = gradient
    ? {
        background: gradientStyle,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:
          "transparent",
      }
    : {
        color,
      };

  const iconBg = gradient
    ? gradientStyle
    : color;

  // ================= ICON ONLY =================
  if (layout === "icon") {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        whileHover={{
          y: -4,
        }}
        className="relative flex items-center justify-center select-none"
      >
        {/* GLOW */}
        <div
          className="absolute w-32 h-32 rounded-full blur-3xl opacity-25"
          style={{
            background: color,
          }}
        />

        {/* MAIN BOX */}
        <div
          style={{
            background: iconBg,
          }}
          className="relative p-6 rounded-[30px] text-white shadow-[0_20px_60px_rgba(79,70,229,0.45)] overflow-hidden"
        >
          {/* SHINE */}
          <div className="absolute top-0 left-0 w-20 h-6 bg-white/30 blur-md rotate-[-20deg]" />

          <div className="relative z-10 text-4xl">
            {Icon && <Icon />}
          </div>
        </div>
      </motion.div>
    );
  }

  // ================= STACKED =================
  if (layout === "stacked") {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="flex flex-col items-center justify-center text-center select-none"
      >
        {/* ICON */}
        <motion.div
          whileHover={{
            rotate: -4,
            scale: 1.05,
          }}
          style={{
            background: iconBg,
          }}
          className="relative inline-flex p-5 rounded-[28px] text-white text-3xl mb-5 shadow-[0_15px_50px_rgba(79,70,229,0.35)] overflow-hidden"
        >
          {/* SHINE */}
          <div className="absolute top-0 left-0 w-20 h-6 bg-white/25 blur-md rotate-[-20deg]" />

          <div className="relative z-10">
            {Icon && <Icon />}
          </div>
        </motion.div>

        {/* BRAND */}
        <h1
          style={{
            ...textStyle,
            fontFamily: font,
            letterSpacing: "-1px",
          }}
          className="text-4xl md:text-5xl font-black leading-none"
        >
          {name}
        </h1>

        {/* SUBTEXT */}
        <p
          className="mt-3 text-[11px] uppercase tracking-[8px]"
          style={{
            color: `${color}CC`,
          }}
        >
          Creative Studio
        </p>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mt-5">
          <div
            className="w-10 h-[2px] rounded-full"
            style={{
              background: color,
            }}
          />

          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: color,
            }}
          />

          <div
            className="w-10 h-[2px] rounded-full"
            style={{
              background: color,
            }}
          />
        </div>
      </motion.div>
    );
  }

  // ================= HORIZONTAL DEFAULT =================
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="flex items-center gap-5 select-none"
    >
      {/* ICON */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: -4,
        }}
        style={{
          background: iconBg,
        }}
        className="relative p-4 rounded-[24px] text-white text-2xl shadow-[0_15px_45px_rgba(79,70,229,0.35)] overflow-hidden"
      >
        {/* SHINE */}
        <div className="absolute top-0 left-0 w-16 h-5 bg-white/25 blur-md rotate-[-20deg]" />

        <div className="relative z-10">
          {Icon && <Icon />}
        </div>
      </motion.div>

      {/* TEXT */}
      <div>
        <h1
          style={{
            ...textStyle,
            fontFamily: font,
            letterSpacing: "-1px",
          }}
          className="text-4xl md:text-5xl font-black leading-none"
        >
          {name}
        </h1>

        {/* SUBTEXT */}
        <div className="flex items-center gap-3 mt-3">
          <div
            className="w-8 h-[2px] rounded-full"
            style={{
              background: color,
            }}
          />

          <p
            className="text-[11px] uppercase tracking-[5px]"
            style={{
              color: `${color}CC`,
            }}
          >
            Modern Brand
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernLogo;