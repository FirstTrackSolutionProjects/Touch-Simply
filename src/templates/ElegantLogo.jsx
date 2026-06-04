import React from "react";
import * as Icons from "react-icons/fa";
import { motion } from "framer-motion";

const ElegantLogo = ({ data }) => {
  const {
    name = "Brand",
    color = "#7c3aed",
    icon = "FaCrown",
    layout = "stacked",
    font = "Playfair Display",
  } = data || {};

  const Icon =
    Icons[icon] || Icons.FaCrown;

  // ================= LAYOUTS =================
  if (layout === "horizontal") {
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
        className="flex items-center gap-4 select-none"
      >
        {/* ICON */}
        <div className="relative">
          <div
            className="absolute inset-0 blur-xl opacity-20 rounded-full"
            style={{
              background: color,
            }}
          />

          <div
            className="w-14 h-14 rounded-full border flex items-center justify-center backdrop-blur-xl"
            style={{
              borderColor: `${color}40`,
              background: `${color}10`,
            }}
          >
            <Icon
              size={24}
              style={{
                color,
              }}
            />
          </div>
        </div>

        {/* TEXT */}
        <div>
          <h1
            className="uppercase leading-none"
            style={{
              fontFamily: font,
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "4px",
              color: "#111827",
            }}
          >
            {name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <div
              className="h-[1px] w-10"
              style={{
                background: color,
              }}
            />

            <p
              className="text-[10px] uppercase tracking-[6px]"
              style={{
                color,
              }}
            >
              Luxury Brand
            </p>

            <div
              className="h-[1px] w-10"
              style={{
                background: color,
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

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
          className="absolute w-24 h-24 rounded-full blur-3xl opacity-20"
          style={{
            background: color,
          }}
        />

        {/* OUTER RING */}
        <div
          className="w-28 h-28 rounded-full border flex items-center justify-center backdrop-blur-xl shadow-2xl"
          style={{
            borderColor: `${color}50`,
            background: `${color}10`,
          }}
        >
          {/* INNER */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}30`,
            }}
          >
            <Icon
              size={34}
              style={{
                color,
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // ================= STACKED DEFAULT =================
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
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
      {/* ICON WRAPPER */}
      <div className="relative mb-5">
        {/* GLOW */}
        <div
          className="absolute inset-0 blur-2xl rounded-full opacity-20"
          style={{
            background: color,
          }}
        />

        {/* OUTER */}
        <div
          className="w-20 h-20 rounded-full border flex items-center justify-center backdrop-blur-xl"
          style={{
            borderColor: `${color}40`,
            background: `${color}08`,
          }}
        >
          {/* INNER */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: `${color}15`,
            }}
          >
            <Icon
              size={26}
              style={{
                color,
              }}
            />
          </div>
        </div>
      </div>

      {/* BRAND NAME */}
      <h1
        className="uppercase leading-none"
        style={{
          fontFamily: font,
          fontSize: "34px",
          fontWeight: 700,
          letterSpacing: "5px",
          color: "#111827",
        }}
      >
        {name}
      </h1>

      {/* SUBTEXT */}
      <p
        className="mt-3 text-[11px] uppercase tracking-[8px]"
        style={{
          color,
        }}
      >
        Premium Studio
      </p>

      {/* DIVIDER */}
      <div className="flex items-center gap-3 mt-4">
        <div
          className="h-[1px] w-16 opacity-60"
          style={{
            background: color,
          }}
        />

        <div
          className="w-2 h-2 rotate-45"
          style={{
            background: color,
          }}
        />

        <div
          className="h-[1px] w-16 opacity-60"
          style={{
            background: color,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ElegantLogo;