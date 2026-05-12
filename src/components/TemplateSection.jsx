import React, { useState, useEffect } from "react";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const TemplateSection = ({ title, data, type, onUse }) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [visible, setVisible] = useState(isMobile ? 2 : 4);
  const [selected, setSelected] = useState(null);

useEffect(() => {
  const handleResize = () => {
    const mobile = window.innerWidth < 768;

    setIsMobile(mobile);
    setVisible(mobile ? 2 : 4);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

 useEffect(() => {
  const mobile = window.innerWidth < 768;

  setIsMobile(mobile);
  setVisible(mobile ? 2 : 4);
}, []);

  const handlePreview = (key, type) => {
    localStorage.setItem("selectedTemplate", key);

    if (type === "resume") navigate("/editor?preview=true");
    if (type === "logo") navigate("/logo?preview=true");
    if (type === "portfolio") navigate("/portfolio?preview=true");
  };

  return (
    <div className="mb-16 overflow-hidden">

      {/* 🔥 HEADING */}
      <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">
        {title}
      </h2>

      {/* 🔥 GRID */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {data.slice(0, visible).map((t) => (
          <motion.div
            key={t.key}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className={`relative group rounded-2xl overflow-hidden border transition duration-300
              ${
                selected === t.key
                  ? "border-purple-500 shadow-purple-500/30 shadow-lg"
                  : "border-white/10"
              }`}
          >

            {/* 🔥 IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-40 sm:h-52 object-cover transition duration-500 group-hover:scale-110"
              />

              {/* 🔥 SHINE EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

              {/* 🔥 OVERLAY */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">

                <button
                  onClick={() => {
                    setSelected(t.key);
                    onUse(t.key, type);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition shadow-lg"
                >
                  <FaCheckCircle /> Use Template
                </button>

                <button
                  onClick={() => handlePreview(t.key, type)}
                  className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                >
                  <FaEye /> Preview
                </button>
              </div>
            </div>

            {/* 🔥 INFO */}
            <div className="p-3 text-center bg-white/5 backdrop-blur-sm">
              <h3 className="text-white text-sm font-medium">
                {t.name}
              </h3>
            </div>

            {/* 🔥 SELECTED BADGE */}
            {selected === t.key && (
              <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                Selected
              </div>
            )}

          </motion.div>
        ))}
      </motion.div>

      {/* 🔥 MOBILE BUTTONS */}
      {isMobile && (
        <div className="flex justify-center mt-8 pb-2">
          {visible < data.length ? (
            <button
              onClick={() => setVisible((prev) => Math.min(prev + 2, data.length))}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg active:scale-95 hover:scale-105 transition"
            >
              Explore More →
            </button>
          ) : (
            <button
              onClick={() => setVisible(window.innerWidth < 768 ? 2 : 4)}
              className="border border-white/30 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl active:scale-95 transition"
            >
              Show Less ↑
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default TemplateSection;