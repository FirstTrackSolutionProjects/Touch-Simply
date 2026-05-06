import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernLogo from "../../templates/ModernLogo";
import MinimalLogo from "../../templates/MinimalLogo";
import ElegantLogo from "../../templates/ElegantLogo";
import GlassLogo from "../../templates/GlassLogo";
import * as htmlToImage from "html-to-image";
import { saveToLibrary } from "../../utils/library";

const LogoCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");
  const [open, setOpen] = useState(false);

  const lightRef = useRef();
  const darkRef = useRef();

  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalLogo data={data} />;
      case "elegant":
        return <ElegantLogo data={data} />;
      case "glass":
        return <GlassLogo data={data} />;
      default:
        return <ModernLogo data={data} />;
    }
  };

  const downloadLogo = async (type) => {
  const element = type === "light" ? lightRef.current : darkRef.current;
  if (!element) return;

  try {
    const dataUrl = await htmlToImage.toPng(element);

    // ✅ 1. Download
    const link = document.createElement("a");
    link.download = `${template}-${type}.png`;
    link.href = dataUrl;
    link.click();

    // ✅ 2. Save to Library (🔥 THIS WAS MISSING)
    saveToLibrary({
      file: dataUrl,
      type: "png",
      category: "logo",
      name: `${data.name || "Logo"} (${type})`
    });

    setOpen(false);
  } catch (err) {
    console.error("Download failed", err);
  }
};

  return (
    <div className="space-y-8">

      {/* 🔥 TEMPLATE SWITCH */}
      <div className="flex gap-3 flex-wrap">
        {["modern", "minimal", "elegant", "glass"].map((t) => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setTemplate(t)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              template === t
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* 🔥 PREVIEW */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* LIGHT */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl"
        >
          <p className="text-xs text-gray-500 mb-3">Light Version</p>

          <motion.div
            ref={lightRef}
            key={template}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-10 flex items-center justify-center"
          >
            {renderTemplate()}
          </motion.div>
        </motion.div>

        {/* DARK */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl"
        >
          <p className="text-xs text-gray-400 mb-3">Dark Version</p>

          <motion.div
            ref={darkRef}
            key={template + "-dark"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-xl p-10 flex items-center justify-center"
          >
            <div className="invert">
              {renderTemplate()}
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* 🔥 DOWNLOAD BUTTON */}
      <div className="flex justify-center relative">

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setOpen(!open)}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-xl"
        >
          Download Logo ⬇
        </motion.button>

        {/* DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-3 w-52 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <button
                onClick={() => downloadLogo("light")}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                🌞 Light Version
              </button>

              <button
                onClick={() => downloadLogo("dark")}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                🌙 Dark Version
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default LogoCanvas;