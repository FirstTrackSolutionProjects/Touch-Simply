import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaArrowRight, FaTimes, FaSearchPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const useFallbackImage = (event, fallbackImage) => {
  if (!fallbackImage || event.currentTarget.dataset.fallbackApplied === "true") return;
  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = fallbackImage;
};

const TemplateSection = ({ title, data, type, onUse }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [visible, setVisible] = useState(isMobile ? 2 : 4);
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisible(mobile ? 2 : 4);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const use = (template) => {
    setSelected(template.key);
    onUse(template.key, type);
  };

  return (
    <section className="mb-20 last:mb-0">
      {/* ───────── header: title · hairline · count ───────── */}
      <div className="mb-8 flex items-end gap-4 sm:gap-6">
        <div className="min-w-0">
          <h2 className="text-2xl font-black tracking-tight text-neutral-text-primary sm:text-4xl">{title}</h2>
          <p className="mt-1.5 text-sm text-neutral-text-secondary sm:text-base">
            Pick a design and start customizing instantly.
          </p>
        </div>
        <span className="mb-2 hidden h-px flex-1 bg-neutral-border sm:block" aria-hidden="true" />
        {data.length > 0 && (
          <span className="mb-1 shrink-0 text-sm font-semibold text-neutral-text-secondary">
            <b className="text-brand-red">{data.length}</b> {data.length === 1 ? "design" : "designs"}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
        {data.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-border px-4 py-16 text-center">
            <span className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-red-50 text-xl">✨</span>
            <p className="text-lg font-bold text-neutral-text-primary">New designs are on the way</p>
            <p className="mt-1 text-sm text-neutral-text-secondary">Check back soon for fresh templates.</p>
          </div>
        )}

        {data.slice(0, visible).map((t, i) => {
          const isSelected = selected === t.key;
          return (
            <motion.article
              key={t.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group relative min-w-0"
            >
              {/* preview */}
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#efeae6] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black/20 ${
                  isSelected ? "ring-4 ring-brand-red ring-offset-2" : "ring-1 ring-black/5"
                }`}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  onError={(event) => useFallbackImage(event, t.fallbackImage)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {t.tag && (
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-neutral-text-primary shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                    {t.tag}
                  </span>
                )}

                {isSelected && (
                  <span className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-brand-red text-white shadow-lg">
                    <FaCheckCircle size={15} />
                  </span>
                )}

                {/* desktop: action bar slides up on hover / keyboard focus */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pt-16 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 md:block">
                  <button
                    onClick={() => setPreview(t)}
                    className="pointer-events-auto flex w-full translate-y-3 items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-sm font-bold text-white shadow-lg shadow-black/30 transition-all duration-300 hover:bg-brand-red-hover group-focus-within:translate-y-0 group-hover:translate-y-0"
                  >
                    Preview design <FaSearchPlus size={12} />
                  </button>
                </div>
              </div>

              {/* caption */}
              <div className="mt-3.5 min-w-0">
                <h3 className="truncate text-base font-bold text-neutral-text-primary transition-colors group-hover:text-brand-red">
                  {t.name}
                </h3>
                <p className="mt-0.5 text-xs capitalize text-neutral-text-secondary">{type || "Template"} template</p>
              </div>

              {/* mobile button (hover touch par kaam nahi karta) */}
              <button
                onClick={() => setPreview(t)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black py-2.5 text-xs font-bold text-white transition active:scale-95 md:hidden"
              >
                <FaSearchPlus size={12} /> Preview design
              </button>
            </motion.article>
          );
        })}
      </div>

      {isMobile && data.length > visible && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisible((prev) => Math.min(prev + 2, data.length))}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-black px-7 py-3 text-sm font-bold text-neutral-text-primary transition active:scale-95 hover:bg-brand-black hover:text-white"
          >
            Explore more <FaArrowRight size={12} />
          </button>
        </div>
      )}

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.name} template preview`}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null); }}
          onKeyDown={(event) => { if (event.key === "Escape") setPreview(null); }}
        >
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-neutral-text-primary shadow hover:bg-red-50"
              aria-label="Close preview"
            >
              <FaTimes />
            </button>
            <div className="min-h-0 flex-1 overflow-auto bg-[#f4f1ef] p-4 md:p-6">
              <img
                src={preview.image}
                alt={`${preview.name} full preview`}
                onError={(event) => useFallbackImage(event, preview.fallbackImage)}
                className="mx-auto max-h-[72vh] w-auto rounded-lg object-contain shadow-lg"
              />
            </div>
            <div className="flex shrink-0 flex-col justify-center gap-4 p-6 md:w-80">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Template preview</p>
                <h3 className="mt-2 text-2xl font-black text-neutral-text-primary">{preview.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-text-secondary">Review this design first. If it looks right, choose it to start filling in your CV.</p>
              </div>
              <button
                type="button"
                onClick={() => use(preview)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 font-bold text-white hover:bg-brand-red-hover"
              >
                Use this template <FaArrowRight size={13} />
              </button>
              <button type="button" onClick={() => setPreview(null)} className="rounded-xl border border-neutral-border px-5 py-3 font-semibold text-neutral-text-primary hover:bg-neutral-bg">
                Keep browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TemplateSection;
