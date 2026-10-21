// Touch-Simply/src/pages/Templates.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import TemplateSection from "../components/TemplateSection";
import { getResumeTemplates } from "../services/resumeService";

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
  const [resumeTemplates, setResumeTemplates] = useState([]);

  // Fetch real resume templates (with UUIDs) from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await getResumeTemplates();
        const list = (res.data?.templates || []).map((t) => ({
          name: t.title,
          key: t.id, // real UUID
          image:
            t.previewImageUrl || "/images/modern-resume.jpg",
        }));
        setResumeTemplates(list);
      } catch (e) {
        console.error("Failed to load resume templates", e);
        // Temporary UX mitigation: show an error toast if templates fail to load
        toast.error("Failed to load resume templates. Please try again later.");
        setResumeTemplates([]); // Ensure it's empty if fetch fails
      }
    })();
  }, []);

  const logoTemplates = [
    {
      name: "Modern Logo",
      key: "logo-modern",
      image: "/images/modern-logo.jpg",
    },
    {
      name: "Minimal Logo",
      key: "logo-minimal",
      image: "/images/minimal-logo.jpg",
    },
    {
      name: "Creative Logo",
      key: "logo-creative",
      image: "/images/creative-logo.jpg",
    },
    {
      name: "Bold Logo",
      key: "logo-bold",
      image: "/images/bold-logo.jpg",
    },
  ];

  const portfolioTemplates = [
    {
      name: "Modern Portfolio",
      key: "portfolio-modern",
      image: "/images/modern-portfolio.jpg",
    },
    {
      name: "Clean Portfolio",
      key: "portfolio-minimal",
      image: "/images/clean-portfolio.jpg",
    },
    {
      name: "Creative Portfolio",
      key: "portfolio-creative",
      image: "/images/creative-portfolio.jpg",
    },
    {
      name: "Professional Portfolio",
      key: "portfolio-pro",
      image: "/images/professional-portfolio.jpg",
    },
  ];

  const presentationTemplates = [
    {
      name: "Startup Pitch",
      key: "ppt-startup",
      image: "/images/ppt-startup.jpg",
    },
    {
      name: "Business Deck",
      key: "ppt-business",
      image: "/images/ppt-business.jpg",
    },
    {
      name: "Creative Slides",
      key: "ppt-creative",
      image: "/images/ppt-creative.jpg",
    },
    {
      name: "Minimal Slides",
      key: "ppt-minimal",
      image: "/images/ppt-minimal.jpg",
    },
  ];

  const handleUseTemplate = (key, type) => {
    if (type === "resume") {
      const template = resumeTemplates.find((t) => t.key === key);
      navigate("/editor", {
        state: {
          templateId: key,
          templateTitle: template?.name || "Resume",
        },
      });
    }
    if (type === "logo") navigate("/logo", { state: { templateId: key } });
    if (type === "portfolio")
      navigate("/portfolio", { state: { templateId: key } });
    if (type === "presentation")
      navigate("/presentation", { state: { templateId: key } });
  };

  return (
    <section className="relative py-24 px-6 md:px-16 min-h-screen bg-gradient-to-b from-gray-950 via-purple-950/40 to-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      {/* Header */}
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
          Build Resume, Logo, Portfolio & Presentations 🚀
        </p>
      </motion.div>

      {/* Sections */}
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
          className="group bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl"
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
          className="group bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl"
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
          className="group bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl"
        >
          <TemplateSection
            title="Portfolio Templates"
            data={portfolioTemplates}
            type="portfolio"
            onUse={handleUseTemplate}
          />
        </motion.div>

        {/* PPT */}
        <motion.div
          variants={fadeUp}
          className="group bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl hover:shadow-indigo-400/20 transition"
        >
          <TemplateSection
            title="Presentation Templates (PPT)"
            data={presentationTemplates}
            type="presentation"
            onUse={handleUseTemplate}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Templates;