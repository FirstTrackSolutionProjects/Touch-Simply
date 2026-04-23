import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TemplateSection from "../components/TemplateSection";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Templates = () => {
  const navigate = useNavigate();

  const resumeTemplates = [
    { name: "Minimal", key: "minimal", image: "/images/minimal-resume.jpg" },
    { name: "Modern", key: "modern", image: "/images/modern-resume.jpg" },
    { name: "Professional", key: "professional", image: "/images/professional-resume.jpg" },
    { name: "Creative", key: "creative", image: "/images/creative-resume.jpg" },
  ];

  const logoTemplates = [
    { name: "Modern Logo", key: "logo-modern", image: "/images/modern-logo.jpg" },
    { name: "Minimal Logo", key: "logo-minimal", image: "/images/minimal-logo.jpg" },
    { name: "Creative Logo", key: "logo-creative", image: "/images/creative-logo.jpg" },
    { name: "Bold Logo", key: "logo-bold", image: "/images/bold-logo.jpg" },
  ];

  const portfolioTemplates = [
    { name: "Modern Portfolio", key: "portfolio-modern", image: "/images/modern-portfolio.jpg" },
    { name: "Clean Portfolio", key: "portfolio-minimal", image: "/images/clean-portfolio.jpg" },
    { name: "Creative Portfolio", key: "portfolio-creative", image: "/images/creative-portfolio.jpg" },
    { name: "Professional Portfolio", key: "portfolio-pro", image: "/images/professional-portfolio.jpg" },
  ];

  const handleUseTemplate = (key, type) => {
    localStorage.setItem("selectedTemplate", key);

    if (type === "resume") navigate("/editor");
    if (type === "logo") navigate("/logo");
    if (type === "portfolio") navigate("/portfolio");
  };

  return (
    <section className="relative py-24 px-6 md:px-16 min-h-screen bg-gradient-to-b from-gray-950 via-purple-950/40 to-black overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      {/* 🔥 HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 bg-clip-text text-transparent">
          Choose Your Template
        </h1>

        <p className="text-gray-400 mt-5 text-sm md:text-lg max-w-xl mx-auto">
          Build Resume, Logo & Portfolio in minutes with modern designs 🚀
        </p>
      </motion.div>

      {/* 🔥 SECTIONS */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-16 relative z-10"
      >

        {/* RESUME */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl hover:shadow-purple-500/20 transition duration-500"
        >
          <TemplateSection
            title="Resume Templates"
            data={resumeTemplates}
            type="resume"
            onUse={handleUseTemplate}
          />
        </motion.div>

        {/* LOGO */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition duration-500"
        >
          <TemplateSection
            title="Logo Templates"
            data={logoTemplates}
            type="logo"
            onUse={handleUseTemplate}
          />
        </motion.div>

        {/* PORTFOLIO */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl hover:shadow-purple-400/20 transition duration-500"
        >
          <TemplateSection
            title="Portfolio Templates"
            data={portfolioTemplates}
            type="portfolio"
            onUse={handleUseTemplate}
          />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Templates;