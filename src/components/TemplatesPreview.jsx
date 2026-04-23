import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TemplatesPreview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resumeTemplates = [
    { id: 1, name: "Modern Resume", image: "/images/modern-resume.jpg", tag: "Popular" },
    { id: 2, name: "Creative Resume", image: "/images/creative-resume.jpg" },
    { id: 3, name: "Professional Resume", image: "/images/professional-resume.jpg" },
    { id: 4, name: "Minimal Resume", image: "/images/minimal-resume.jpg" },
  ];

  const logoTemplates = [
    { id: 1, name: "Minimal Logo", image: "/images/minimal-logo.jpg" },
    { id: 2, name: "Modern Logo", image: "/images/modern-logo.jpg", tag: "New" },
    { id: 3, name: "Creative Logo", image: "/images/creative-logo.jpg" },
    { id: 4, name: "Bold Logo", image: "/images/bold-logo.jpg" },
  ];

  const portfolioTemplates = [
    { id: 1, name: "Modern Portfolio", image: "/images/modern-portfolio.jpg" },
    { id: 2, name: "Clean Portfolio", image: "/images/clean-portfolio.jpg" },
    { id: 3, name: "Creative Portfolio", image: "/images/creative-portfolio.jpg" },
    { id: 4, name: "Professional Portfolio", image: "/images/professional-portfolio.jpg" },
  ];

  const renderSection = (title, data, link) => {
    const displayData = isMobile ? data.slice(0, 2) : data.slice(0, 4);

    return (
      <div className="mt-20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {title}
          </h3>

          <Link
            to={link}
            className="text-sm text-purple-600 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1"
            >
              {/* 🔥 Badge */}
              {item.tag && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full z-10 shadow">
                  {item.tag}
                </span>
              )}

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition duration-300">
                <Link
                  to={link}
                  className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 bg-white text-black px-5 py-2 rounded-lg font-medium shadow-lg transition"
                >
                  Use Template
                </Link>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-purple-50 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300/20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <div className="relative text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Templates
        </h2>
        <p className="text-gray-500 mt-4">
          Create stunning designs with beautifully crafted templates.
        </p>
      </div>

      {/* Sections */}
      {renderSection("Resume Templates", resumeTemplates, "/editor")}
      {renderSection("Logo Templates", logoTemplates, "/logo")}
      {renderSection("Portfolio Templates", portfolioTemplates, "/portfolio")}

      {/* CTA */}
      <div className="text-center mt-20">
        <Link
          to="/templates"
          className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition"
        >
          Explore All Templates →
        </Link>
      </div>

    </section>
  );
};

export default TemplatesPreview;