import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Users, Star, Sparkles } from "lucide-react";

/* ---------- count-up (respects reduced motion) ---------- */
const Counter = ({ end, duration = 1600, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(end);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(end);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const stats = [
  {
    icon: FileText,
    value: 10000,
    suffix: "+",
    label: "Resumes Created",
    note: "Across resumes, portfolios & logos",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Active Users",
    note: "Building their next opportunity",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "/5",
    label: "Average Rating",
    note: "From verified users",
    decimal: true,
  },
];

/* avatar initials for the trust row */
const avatars = ["RS", "AD", "AV", "PS", "MK"];

const Stats = () => {
  return (
    <section className="relative w-full bg-white py-20 md:py-24 overflow-hidden">
      {/* subtle grid — same language as Hero/About */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* red glow — matches Hero's brand-red/5 blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] max-w-full bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- header ---------- */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/15 text-brand-red text-xs font-bold uppercase tracking-[0.18em]"
          >
            <Sparkles size={12} />
            Trusted by thousands
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-5 text-3xl md:text-4xl font-extrabold text-neutral-text-primary tracking-tight"
          >
            Numbers that <span className="text-brand-red">speak</span> for us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-neutral-text-secondary text-base md:text-lg leading-relaxed"
          >
            A growing community of professionals who trust Touch Simply to
            shape their next career move.
          </motion.p>
        </div>

        {/* ---------- stat cards ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          {stats.map(({ icon: Icon, value, suffix, label, note, decimal }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden bg-neutral-bg border border-neutral-border rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:border-brand-red/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* corner glow on hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-red/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-border text-brand-red flex items-center justify-center shadow-sm group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red group-hover:shadow-lg group-hover:shadow-brand-red/30 group-hover:scale-105 transition-all duration-300">
                  <Icon size={22} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-text-secondary bg-white border border-neutral-border px-2.5 py-1 rounded-full">
                  Live
                </span>
              </div>

              <div className="relative mt-6 text-4xl md:text-5xl font-black tracking-tight text-neutral-text-primary tabular-nums">
                {decimal ? (
                  <>{value.toFixed(1)}{suffix}</>
                ) : (
                  <Counter end={value} suffix={suffix} />
                )}
              </div>

              <p className="relative mt-2 text-base font-bold text-neutral-text-primary">
                {label}
              </p>
              <p className="relative mt-1 text-sm text-neutral-text-secondary leading-relaxed">
                {note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ---------- trust strip ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {/* avatar stack */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {avatars.map((initials, i) => (
                <div
                  key={initials}
                  style={{ zIndex: avatars.length - i }}
                  className="w-9 h-9 rounded-full bg-brand-black text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-sm"
                >
                  {initials}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full bg-brand-red text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-sm">
                +
              </div>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-neutral-text-primary">
                4,900+ creators joined
              </p>
              <p className="text-xs text-neutral-text-secondary">
                in the last 12 months
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-neutral-border" />

          {/* stars */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-brand-red">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-neutral-text-primary">4.8 out of 5</p>
              <p className="text-xs text-neutral-text-secondary">
                based on 1,200+ reviews
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;