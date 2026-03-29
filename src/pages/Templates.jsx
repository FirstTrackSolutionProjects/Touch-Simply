import React from "react";
import { useNavigate } from "react-router-dom";
import TemplateSection from "../components/TemplateSection";

const Templates = () => {
  const navigate = useNavigate();

  // Resume Templates
  const resumeTemplates = [
    { name: "Minimal", key: "minimal", image: "/images/minimal-resume.jpg" },
    { name: "Modern", key: "modern", image: "/images/modern-resume.jpg" },
    { name: "Professional", key: "professional", image: "/images/professional-resume.jpg" },
    { name: "Creative", key: "creative", image: "/images/creative-resume.jpg" },
  ];

  // Logo Templates
  const logoTemplates = [
    { name: "Modern Logo", key: "logo-modern", image: "/images/modern-logo.jpg" },
    { name: "Minimal Logo", key: "logo-minimal", image: "/images/minimal-logo.jpg" },
    { name: "Creative Logo", key: "logo-creative", image: "/images/creative-logo.jpg" },
    { name: "Bold Logo", key: "logo-bold", image: "/images/bold-logo.jpg" },
  ];

  // Portfolio Templates
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
    <section className="py-16 px-6 md:px-16 bg-gradient-to-b from-gray-900 via-purple-950 to-gray-900 min-h-screen">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Choose Your Template
        </h1>
        <p className="text-gray-400 mt-3">
          Resume, Logo & Portfolio — all in one place
        </p>
      </div>

      {/* Sections */}
      <TemplateSection
        title="Resume Templates"
        data={resumeTemplates}
        type="resume"
        onUse={handleUseTemplate}
      />

      <TemplateSection
        title="Logo Templates"
        data={logoTemplates}
        type="logo"
        onUse={handleUseTemplate}
      />

      <TemplateSection
        title="Portfolio Templates"
        data={portfolioTemplates}
        type="portfolio"
        onUse={handleUseTemplate}
      />

    </section>
  );
};

export default Templates;