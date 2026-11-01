import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const TemplateSection = ({ title, data, type, onUse }) => {
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

  return (
    <div className="mb-16 last:mb-0">
      <h2 className="text-2xl font-bold text-neutral-text-primary mb-8 tracking-tight">
        {title}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.length === 0 && (
          <p className="col-span-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-8 text-center text-sm text-neutral-text-secondary">
            No templates available yet.
          </p>
        )}
        {data.slice(0, visible).map((t) => (
          <motion.div
            key={t.key}
            whileHover={{ y: -8 }}
            className={`relative group rounded-2xl overflow-hidden border transition duration-300 bg-white
              ${selected === t.key ? "border-brand-red shadow-lg shadow-brand-red/20" : "border-neutral-border"}`}
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">
                <button
                  onClick={() => { setSelected(t.key); onUse(t.key, type); }}
                  className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg hover:scale-105 transition shadow-lg"
                >
                  <FaCheckCircle /> Use Template
                </button>
              </div>
            </div>
            <div className="p-3 text-center bg-white">
              <h3 className="text-neutral-text-primary text-sm font-semibold">{t.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {isMobile && data.length > visible && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisible((prev) => Math.min(prev + 2, data.length))}
            className="bg-brand-black text-white px-6 py-3 rounded-xl shadow-lg active:scale-95 hover:scale-105 transition text-sm font-semibold"
          >
            Explore More →
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSection;