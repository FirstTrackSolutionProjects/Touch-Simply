import React from "react";
import { useNavigate } from "react-router-dom";
import TemplateSection from "../components/TemplateSection";

const Templates = () => {
  const navigate = useNavigate();

  // Resume Templates
  const resumeTemplates = [
    { name: "Minimal", key: "minimal", image: "/templates/template1.png" },
    { name: "Modern", key: "modern", image: "/templates/template2.png" },
    { name: "Professional", key: "professional", image: "/templates/template3.png" },
    { name: "Creative", key: "creative", image: "/templates/template4.png" },
  ];

  // Logo Templates
  const logoTemplates = [
    { name: "Modern Logo", key: "logo-modern", image: "/templates/logo1.png" },
    { name: "Minimal Logo", key: "logo-minimal", image: "/templates/logo2.png" },
    { name: "Creative Logo", key: "logo-creative", image: "/templates/logo1.png" },
    { name: "Bold Logo", key: "logo-bold", image: "/templates/logo2.png" },
  ];

  // Portfolio Templates
  const portfolioTemplates = [
    { name: "Modern Portfolio", key: "portfolio-modern", image: "/templates/portfolio1.png" },
    { name: "Clean Portfolio", key: "portfolio-minimal", image: "/templates/portfolio2.png" },
    { name: "Creative Portfolio", key: "portfolio-creative", image: "/templates/portfolio1.png" },
    { name: "Professional Portfolio", key: "portfolio-pro", image: "/templates/portfolio2.png" },
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