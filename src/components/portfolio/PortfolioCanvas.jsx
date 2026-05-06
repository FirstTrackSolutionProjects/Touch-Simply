import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ModernPortfolio from "../../templates/ModernPortfolio";
import MinimalPortfolio from "../../templates/MinimalPortfolio";
import CreativePortfolio from "../../templates/CreativePortfolio";

import * as htmlToImage from "html-to-image";
import { saveToLibrary } from "../../utils/library";

const PortfolioCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");
  const previewRef = useRef();

  const tabs = [
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
    { id: "creative", label: "Creative" },
  ];

  const variants = {
    initial: { opacity: 0, scale: 0.98, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -20 },
  };

  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalPortfolio data={data} />;
      case "creative":
        return <CreativePortfolio data={data} />;
      default:
        return <ModernPortfolio data={data} />;
    }
  };

  // ✅ DOWNLOAD + SAVE (only addition)
 const handleDownload = async () => {
  if (!previewRef.current) return;

  const element = previewRef.current;

  // 🔥 Save original styles
  const originalHeight = element.style.height;
  const originalOverflow = element.style.overflow;

  try {
    // 🔥 Expand full content
    element.style.height = "auto";
    element.style.overflow = "visible";

    // wait for DOM update
    await new Promise((res) => setTimeout(res, 300));

    const dataUrl = await htmlToImage.toPng(element, {
      cacheBust: true,
      pixelRatio: 2, // better quality
    });

    // Download
    const link = document.createElement("a");
    link.download = `${template}-portfolio-full.png`;
    link.href = dataUrl;
    link.click();

    // Save to Library
    saveToLibrary({
      file: dataUrl,
      type: "png",
      category: "portfolio",
      name: data?.name || "Portfolio",
    });

  } catch (err) {
    console.error("Download failed", err);
  } finally {
    // 🔥 Restore original styles
    element.style.height = originalHeight;
    element.style.overflow = originalOverflow;
  }
};

  return (
    <div className="h-full flex flex-col gap-4">

      {/* 🔥 TOP BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

        {/* TEMPLATE SWITCH */}
        <div className="bg-white shadow-sm border rounded-full p-1 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTemplate(tab.id)}
              className={`px-4 py-1.5 text-sm rounded-full transition ${
                template === tab.id
                  ? "bg-purple-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ DOWNLOAD BUTTON (added) */}
        <button
          onClick={handleDownload}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
        >
          Download
        </button>
      </div>

      {/* 🔥 PREVIEW FRAME */}
      <div className="flex-1 flex justify-center items-start bg-gray-200 rounded-2xl p-4 sm:p-6">

        <div className="bg-white rounded-xl overflow-hidden shadow-2xl border transition-all duration-500 w-full max-w-5xl">

          {/* 🔥 FAKE BROWSER HEADER */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>

          {/* 🔥 CONTENT */}
          <div
            ref={previewRef}
            className="overflow-y-auto h-[700px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={template}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
              >
                {renderTemplate()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PortfolioCanvas;