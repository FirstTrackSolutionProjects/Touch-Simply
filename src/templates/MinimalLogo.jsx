import React from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";

const MinimalLogo = ({ data }) => {
  const {
    name = "Your Brand",
    color = "#7c3aed",
    font = "Poppins",
    layout = "horizontal",
    icon = "FaCube",
  } = data || {};

  const Icon =
    Icons[icon] || Icons.FaCube;

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
        className="flex items-center justify-center select-none"
      >
        <div className="relative">

          {/* OUTER */}
          <div
            className="w-28 h-28 rounded-[28px] border flex items-center justify-center"
            style={{
              borderColor: `${color}30`,
              background: `${color}05`,
            }}
          >
            {/* INNER */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: `${color}12`,
                border: `1px solid ${color}25`,
              }}
            >
              <Icon
                size={30}
                style={{
                  color,
                }}
              />
            </div>
          </div>

          {/* CORNER DOT */}
          <div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{
              background: color,
            }}
          />
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
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}25`,
          }}
        >
          <Icon
            size={24}
            style={{
              color,
            }}
          />
        </div>

        {/* BRAND */}
        <h1
          className="uppercase leading-none"
          style={{
            color: "#111827",
            fontFamily: font,
            fontSize: "38px",
            fontWeight: 300,
            letterSpacing: "8px",
          }}
        >
          {name}
        </h1>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mt-5">
          <div
            className="w-10 h-[1px]"
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
            className="w-10 h-[1px]"
            style={{
              background: color,
            }}
          />
        </div>

        {/* SUBTEXT */}
        {/* <p
          className="mt-4 text-[10px] uppercase tracking-[7px]"
          style={{
            color: `${color}CC`,
          }}
        >
          Simplicity Matters
        </p> */}
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
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}20`,
        }}
      >
        <Icon
          size={22}
          style={{
            color,
          }}
        />
      </div>

      {/* TEXT */}
      <div>
        <h1
          style={{
            color: "#111827",
            fontFamily: font,
            letterSpacing: "6px",
            fontWeight: 300,
          }}
          className="text-4xl uppercase leading-none"
        >
          {name}
        </h1>

        {/* MINIMAL LINE */}
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
              color: `${color}CC`,
            }}
          >
            Minimal
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MinimalLogo;