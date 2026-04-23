import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ModernPortfolio from "../../templates/ModernPortfolio";
import MinimalPortfolio from "../../templates/MinimalPortfolio";
import CreativePortfolio from "../../templates/CreativePortfolio";

const PortfolioCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");

  const tabs = [
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
    { id: "creative", label: "Creative" },
  ];

  // 🔥 animation variants
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="h-full flex flex-col">

      {/* TEMPLATE SWITCH */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-full flex gap-1 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTemplate(tab.id)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                template === tab.id
                  ? "bg-purple-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 ANIMATED TEMPLATE SWITCH */}
      <div id="portfolio-preview" className="rounded-xl overflow-hidden">

        <AnimatePresence mode="wait">
          {template === "modern" && (
            <motion.div
              key="modern"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <ModernPortfolio data={data} />
            </motion.div>
          )}

          {template === "minimal" && (
            <motion.div
              key="minimal"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <MinimalPortfolio data={data} />
            </motion.div>
          )}

          {template === "creative" && (
            <motion.div
              key="creative"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <CreativePortfolio data={data} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default PortfolioCanvas;