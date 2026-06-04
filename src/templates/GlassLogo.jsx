import React from "react";
import * as Icons from "react-icons/fa";
import { motion } from "framer-motion";

const GlassLogo = ({ data }) => {
  const {
    name = "Brand",
    color = "#7c3aed",
    icon = "FaRocket",
    font = "Poppins",
    layout = "horizontal",
    gradient = true,
  } = data || {};

  const Icon =
    Icons[icon] || Icons.FaRocket;

  const glassGradient = `linear-gradient(
    135deg,
    ${color},
    #9333ea
  )`;

  // ================= ICON ONLY =================
  if (layout === "icon") {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative flex items-center justify-center select-none"
      >
        {/* GLOW */}
        <div
          className="absolute w-32 h-32 rounded-full blur-3xl opacity-30"
          style={{
            background: color,
          }}
        />

        {/* GLASS CONTAINER */}
        <div className="relative p-[2px] rounded-[30px] bg-white/20 backdrop-blur-2xl border border-white/20 shadow-[0_15px_50px_rgba(0,0,0,0.18)]">
          <div className="w-28 h-28 rounded-[28px] bg-white/10 backdrop-blur-3xl flex items-center justify-center border border-white/10">
            
            {/* INNER ICON BG */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                background: gradient
                  ? glassGradient
                  : color,
              }}
            >
              <Icon
                size={28}
                color="#fff"
              />
            </div>

            {/* SHINE */}
            <div className="absolute top-2 left-2 w-16 h-4 rounded-full bg-white/30 blur-md" />
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
        className="relative flex flex-col items-center justify-center gap-5 px-10 py-8 rounded-[32px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_15px_60px_rgba(0,0,0,0.15)] overflow-hidden select-none"
      >
        {/* BACKGROUND GLOW */}
        <div
          className="absolute w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{
            background: color,
          }}
        />

        {/* SHINE EFFECT */}
        <div className="absolute top-0 left-0 w-32 h-10 bg-white/30 blur-xl rotate-[-20deg]" />

        {/* ICON */}
        <div
          className="relative p-[2px] rounded-3xl"
          style={{
            background: gradient
              ? glassGradient
              : color,
          }}
        >
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
            <Icon
              size={34}
              color="#fff"
            />
          </div>
        </div>

        {/* BRAND */}
        <div className="text-center relative z-10">
          <h1
            className="tracking-[4px] uppercase leading-none"
            style={{
              fontFamily: font,
              fontSize: "30px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {name}
          </h1>

          <p
            className="mt-3 text-[11px] uppercase tracking-[8px]"
            style={{
              color,
            }}
          >
            Glass Studio
          </p>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-[1px]"
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
            className="w-12 h-[1px]"
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
      className="relative flex items-center gap-5 px-6 py-4 rounded-[28px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_10px_50px_rgba(0,0,0,0.16)] overflow-hidden select-none"
    >
      {/* BACKGROUND GLOW */}
      <div
        className="absolute -left-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{
          background: color,
        }}
      />

      {/* SHINE */}
      <div className="absolute top-0 left-0 w-24 h-6 bg-white/30 blur-lg rotate-[-20deg]" />

      {/* ICON */}
      <div
        className="relative p-[2px] rounded-2xl"
        style={{
          background: gradient
            ? glassGradient
            : color,
        }}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl">
          <Icon
            size={26}
            color="#fff"
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="relative z-10">
        <h1
          className="tracking-[3px] uppercase leading-none"
          style={{
            fontFamily: font,
            fontSize: "28px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {name}
        </h1>

        <div className="flex items-center gap-2 mt-3">
          <div
            className="w-8 h-[1px]"
            style={{
              background: color,
            }}
          />

          <p
            className="text-[10px] uppercase tracking-[5px]"
            style={{
              color,
            }}
          >
            Creative Glass
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassLogo;