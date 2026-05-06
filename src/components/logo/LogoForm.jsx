import React from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";

const iconList = ["FaRocket", "FaCode", "FaCrown", "FaShoppingCart"];

const colors = ["#7c3aed", "#6366f1", "#ec4899", "#22c55e", "#f59e0b"];

const fonts = ["Poppins", "Montserrat", "Playfair Display"];

const layouts = [
  { value: "horizontal", label: "Horizontal" },
  { value: "stacked", label: "Stacked" },
  { value: "icon", label: "Icon Only" },
];

const LogoForm = ({ data, setData }) => {
  return (
    <div className="space-y-6 text-sm">

      {/* 🔥 BRAND NAME */}
      <div>
        <label className="text-gray-500 text-xs">Brand Name</label>
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Your Brand"
          className="w-full mt-1 p-3 rounded-xl bg-white/80 backdrop-blur border focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* 🎨 COLOR PICKER */}
      <div>
        <p className="text-gray-500 text-xs mb-2">Brand Color</p>
        <div className="flex gap-3">
          {colors.map((c) => (
            <motion.div
              key={c}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setData({ ...data, color: c })}
              className={`w-9 h-9 rounded-full cursor-pointer border-2 transition ${
                data.color === c
                  ? "border-black scale-110"
                  : "border-transparent"
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* 🧩 ICON PICKER */}
      <div>
        <p className="text-gray-500 text-xs mb-2">Icon Style</p>
        <div className="grid grid-cols-4 gap-3">
          {iconList.map((icon) => {
            const Icon = Icons[icon];
            return (
              <motion.div
                key={icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setData({ ...data, icon })}
                className={`p-3 rounded-xl cursor-pointer flex justify-center items-center transition ${
                  data.icon === icon
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/70 backdrop-blur hover:bg-white"
                }`}
              >
                <Icon size={18} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🔤 FONT SELECT (VISUAL) */}
      <div>
        <p className="text-gray-500 text-xs mb-2">Font Style</p>
        <div className="grid grid-cols-1 gap-2">
          {fonts.map((font) => (
            <motion.div
              key={font}
              whileHover={{ scale: 1.02 }}
              onClick={() => setData({ ...data, font })}
              className={`p-3 rounded-xl cursor-pointer border transition ${
                data.font === font
                  ? "bg-purple-600 text-white"
                  : "bg-white/70 hover:bg-white"
              }`}
              style={{ fontFamily: font }}
            >
              {font}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 📐 LAYOUT SELECT */}
      <div>
        <p className="text-gray-500 text-xs mb-2">Layout</p>
        <div className="grid grid-cols-3 gap-2">
          {layouts.map((l) => (
            <motion.div
              key={l.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setData({ ...data, layout: l.value })}
              className={`p-2 text-center rounded-lg cursor-pointer text-xs transition ${
                data.layout === l.value
                  ? "bg-indigo-600 text-white"
                  : "bg-white/70 hover:bg-white"
              }`}
            >
              {l.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 👁️ BOTH VIEW INFO */}
      <div className="text-xs text-gray-500 bg-white/60 rounded-xl p-3">
        Your logo is previewed on both <b>Light</b> and <b>Dark</b> backgrounds.
        Make sure your color works well in both.
      </div>

    </div>
  );
};

export default LogoForm;