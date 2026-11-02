import React from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaPaintBrush, FaFileAlt, FaBullseye, FaEye, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const About = () => {
  const cards = [
    { icon: <FaBullseye />, title: "Our Mission", text: "Empower individuals with tools to showcase their skills confidently." },
    { icon: <FaEye />, title: "Our Vision", text: "Become a global platform for professional resume creation." },
  ];

  const features = [
    { icon: <FaBolt />, title: "Fast & Easy", desc: "Create resumes in minutes" },
    { icon: <FaPaintBrush />, title: "Modern Design", desc: "Templates that stand out" },
    { icon: <FaFileAlt />, title: "ATS Optimized", desc: "Built for tracking systems" },
  ];

  const steps = [
    { n: "01", title: "Pick a template", desc: "Choose from resume, portfolio, logo and presentation designs." },
    { n: "02", title: "Customize it", desc: "Edit content, add images and make it yours in a few clicks." },
    { n: "03", title: "Download & share", desc: "Export your work and put it in front of the right people." },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] max-w-full bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <motion.span
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/15 text-brand-red text-xs font-bold uppercase tracking-[0.18em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" /> Who we are
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-text-primary tracking-tight leading-tight"
          >
            About <span className="text-brand-red">Touch Simply</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-neutral-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            A growing tech company focused on simplifying digital experiences.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/templates"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red text-white font-semibold hover:bg-brand-red-hover hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-red/30"
            >
              Explore Templates <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-neutral-border bg-white text-neutral-text-primary font-semibold hover:border-brand-red/40 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* ================= MISSION & VISION ================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="group relative overflow-hidden bg-neutral-bg p-8 md:p-10 rounded-3xl border border-neutral-border hover:border-brand-red/30 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-red/5 group-hover:bg-brand-red/10 group-hover:scale-125 transition-all duration-500" />
              <div className="absolute left-0 top-10 h-12 w-1.5 rounded-r-full bg-brand-red" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 text-white text-xl flex items-center justify-center shadow-lg shadow-brand-red/30 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-text-primary mb-4 tracking-tight">{item.title}</h3>
                <p className="text-neutral-text-secondary text-base md:text-lg leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= WHY CHOOSE US ================= */}
        <div className="text-center mb-28">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Why us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary mt-3 tracking-tight">Why Choose Us</h2>
            <span className="block h-1.5 w-16 rounded-full bg-brand-red mx-auto mt-5" />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group relative overflow-hidden p-8 bg-white border border-neutral-border rounded-3xl hover:border-brand-red/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-brand-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red text-2xl mb-6 group-hover:bg-brand-red group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-red/30 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="font-extrabold text-xl text-neutral-text-primary mb-2">{item.title}</h4>
                <p className="text-neutral-text-secondary text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= HOW IT WORKS ================= */}
        <div className="mb-28">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Simple process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary mt-3 tracking-tight">How It Works</h2>
            <span className="block h-1.5 w-16 rounded-full bg-brand-red mx-auto mt-5" />
          </motion.div>

          <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] border-t-2 border-dashed border-neutral-border" />
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="relative text-center md:px-4"
              >
                <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-white border-4 border-brand-red/15 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-extrabold text-brand-red">{s.n}</span>
                </div>
                <h4 className="mt-6 text-xl font-extrabold text-neutral-text-primary">{s.title}</h4>
                <p className="mt-2 text-neutral-text-secondary text-sm md:text-base leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden bg-brand-black rounded-[2rem] px-6 py-14 md:py-20 text-center shadow-2xl shadow-black/20 ring-1 ring-white/5"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-red/30 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-red/15 blur-3xl rounded-full pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to build something <span className="text-brand-red">amazing?</span>
            </h2>
            <p className="mt-5 text-gray-400 text-base md:text-lg max-w-xl mx-auto">
              Start creating professional resumes, portfolios and more with Touch Simply today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/editor"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-red text-white font-semibold hover:bg-brand-red-hover hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-red/30"
              >
                Create Resume <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center px-8 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:-translate-y-0.5 backdrop-blur text-white font-semibold transition-all"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;