import React from "react";
import { useNavigate } from "react-router-dom";
import TemplateSection from "../components/TemplateSection";

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
    <section className="relative py-20 px-6 md:px-16 min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.15),transparent_60%)] pointer-events-none"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Choose Your Template
        </h1>

        <p className="text-gray-300 mt-4 text-sm md:text-base">
          Build Resume, Logo & Portfolio in minutes 🚀
        </p>
      </div>

      {/* Sections Wrapper */}
      <div className="space-y-16 relative z-10">

        <div className="bg-gradient-to-br from-gray-800/70 via-purple-900/40 to-gray-900/80 backdrop-blur-lg border border-purple-500/20 p-6 md:p-10 rounded-2xl  transition duration-300">
          <TemplateSection
            title="Resume Templates"
            data={resumeTemplates}
            type="resume"
            onUse={handleUseTemplate}
          />
        </div>

        <div className="bg-gradient-to-br from-gray-800/70 via-purple-900/40 to-gray-900/80 backdrop-blur-lg border border-purple-500/20 p-6 md:p-10 rounded-2xl  transition duration-300">
          <TemplateSection
            title="Logo Templates"
            data={logoTemplates}
            type="logo"
            onUse={handleUseTemplate}
          />
        </div>

       <div className="bg-gradient-to-br from-gray-800/70 via-purple-900/40 to-gray-900/80 backdrop-blur-lg border border-purple-500/20 p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-purple-500/20 transition duration-300">
          <TemplateSection
            title="Portfolio Templates"
            data={portfolioTemplates}
            type="portfolio"
            onUse={handleUseTemplate}
          />
        </div>

      </div>
    </section>
  );
};

export default Templates;