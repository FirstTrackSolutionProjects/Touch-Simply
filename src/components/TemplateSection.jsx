import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
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
      {/* Section header */}
      <div className="flex items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="h-9 w-1.5 rounded-full bg-brand-red" />
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-text-primary tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-neutral-text-secondary mt-0.5">
              Pick a design and start customizing instantly.
            </p>
          </div>
        </div>
        {data.length > 0 && (
          <span className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-brand-red/10 text-brand-red">
            {data.length} templates
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-border bg-neutral-bg px-4 py-12 text-center">
            <p className="text-base font-bold text-neutral-text-primary">No templates yet</p>
            <p className="text-sm text-neutral-text-secondary mt-1">New designs are coming soon.</p>
          </div>
        )}

        {data.slice(0, visible).map((t, i) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -8 }}
            className={`group relative flex flex-col rounded-2xl overflow-hidden border bg-white transition-shadow duration-300 hover:shadow-2xl
              ${selected === t.key
                ? "border-brand-red ring-4 ring-brand-red/10 shadow-xl shadow-brand-red/20"
                : "border-neutral-border shadow-sm hover:border-brand-red/30"}`}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3] bg-neutral-bg">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {t.tag && (
                <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {t.tag}
                </span>
              )}

              {selected === t.key && (
                <span className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg">
                  <FaCheckCircle size={14} />
                </span>
              )}

              {/* Desktop hover overlay */}
              <div className="absolute inset-0 hidden md:flex items-end justify-center pb-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => { setSelected(t.key); onUse(t.key, type); }}
                  className="flex items-center gap-2 bg-brand-red text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-red/30 translate-y-4 group-hover:translate-y-0 hover:scale-105 transition-all duration-300"
                >
                  <FaCheckCircle /> Use Template
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 p-4">
              <h3 className="text-neutral-text-primary text-sm md:text-base font-bold truncate group-hover:text-brand-red transition-colors">
                {t.name}
              </h3>
              <span className="hidden md:flex w-8 h-8 shrink-0 rounded-full bg-neutral-bg items-center justify-center text-neutral-text-secondary group-hover:bg-brand-red group-hover:text-white transition-all">
                <FaArrowRight size={12} />
              </span>
            </div>

            {/* Mobile button (hover touch pe kaam nahi karta) */}
            <button
              onClick={() => { setSelected(t.key); onUse(t.key, type); }}
              className="md:hidden mx-4 mb-4 flex items-center justify-center gap-2 bg-brand-black text-white text-xs font-bold py-2.5 rounded-xl active:scale-95 transition"
            >
              <FaCheckCircle size={12} /> Use Template
            </button>
          </motion.div>
        ))}
      </div>

      {isMobile && data.length > visible && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisible((prev) => Math.min(prev + 2, data.length))}
            className="inline-flex items-center gap-2 bg-brand-black text-white px-7 py-3 rounded-xl shadow-lg active:scale-95 hover:-translate-y-0.5 transition-all text-sm font-semibold"
          >
            Explore More <FaArrowRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSection;