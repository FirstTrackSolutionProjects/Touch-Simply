import React from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";

const iconList = [
  "FaRocket",
  "FaCode",
  "FaCrown",
  "FaShoppingCart",
  "FaGem",
  "FaBolt",
  "FaGlobe",
  "FaFeather",
];

const colors = [
  "#7c3aed",
  "#6366f1",
  "#ec4899",
  "#22c55e",
  "#f59e0b",
  "#06b6d4",
  "#ef4444",
  "#0f172a",
];

const fonts = [
  "Poppins",
  "Montserrat",
  "Playfair Display",
  "Oswald",
  "Raleway",
];

const layouts = [
  { value: "horizontal", label: "Horizontal" },
  { value: "stacked", label: "Stacked" },
  { value: "icon", label: "Icon Only" },
];

const sectionAnimation = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const LogoForm = ({ data, setData }) => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-sm text-gray-500 mt-1">
          Build a modern brand identity with colors, icons & layouts.
        </p>
      </div>

      {/* BRAND NAME */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="show"
      >
        <label className="text-sm font-medium text-gray-700">
          Brand Name
        </label>

        <input
          value={data.name}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value,
            })
          }
          placeholder="Enter brand name"
          className="w-full mt-2 px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-lg border border-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </motion.div>

      {/* COLOR PICKER */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm font-medium text-gray-700 mb-3">
          Brand Color
        </p>

        <div className="flex flex-wrap gap-4">
          {colors.map((c) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                setData({
                  ...data,
                  color: c,
                })
              }
              className={`relative w-11 h-11 rounded-full border-4 transition-all ${
                data.color === c
                  ? "border-white shadow-2xl scale-110"
                  : "border-transparent"
              }`}
              style={{
                background: c,
                boxShadow:
                  data.color === c
                    ? `0 0 25px ${c}`
                    : "",
              }}
            >
              {data.color === c && (
                <div className="absolute inset-0 rounded-full border-2 border-black/20" />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ICON PICKER */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm font-medium text-gray-700 mb-3">
          Icon Style
        </p>

        <div className="grid grid-cols-4 gap-4">
          {iconList.map((icon) => {
            const Icon = Icons[icon];

            return (
              <motion.button
                key={icon}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setData({
                    ...data,
                    icon,
                  })
                }
                className={`h-16 rounded-2xl flex items-center justify-center transition-all ${
                  data.icon === icon
                    ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl"
                    : "bg-white/70 backdrop-blur-lg hover:bg-white border border-white/50"
                }`}
              >
                <Icon size={22} />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* FONT SELECT */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm font-medium text-gray-700 mb-3">
          Font Style
        </p>

        <div className="space-y-3">
          {fonts.map((font) => (
            <motion.button
              key={font}
              whileHover={{ scale: 1.02 }}
              onClick={() =>
                setData({
                  ...data,
                  font,
                })
              }
              style={{
                fontFamily: font,
              }}
              className={`w-full text-left px-4 py-4 rounded-2xl transition-all border ${
                data.font === font
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-xl"
                  : "bg-white/70 hover:bg-white border-white/50"
              }`}
            >
              <span className="text-lg">
                {font}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* LAYOUT */}
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm font-medium text-gray-700 mb-3">
          Layout Style
        </p>

        <div className="grid grid-cols-3 gap-3">
          {layouts.map((layout) => (
            <motion.button
              key={layout.value}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              onClick={() =>
                setData({
                  ...data,
                  layout: layout.value,
                })
              }
              className={`py-3 rounded-xl text-sm font-medium transition-all ${
                data.layout === layout.value
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white/70 hover:bg-white border border-white/40"
              }`}
            >
              {layout.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* INFO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-4 text-sm text-gray-600"
      >
        Your logo is previewed on both{" "}
        <span className="font-semibold">
          Light
        </span>{" "}
        and{" "}
        <span className="font-semibold">
          Dark
        </span>{" "}
        backgrounds for better visibility testing.
      </motion.div>

    </div>
  );
};

export default LogoForm;