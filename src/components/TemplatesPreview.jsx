import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TemplatesPreview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resumeTemplates = [
    { id: 1, name: "Modern Resume", image: "/templates/template1.png" },
    { id: 2, name: "Creative Resume", image: "/templates/template2.png" },
    { id: 3, name: "Professional Resume", image: "/templates/template3.png" },
    { id: 4, name: "Minimal Resume", image: "/templates/template4.png" },
  ];

  const logoTemplates = [
    { id: 1, name: "Minimal Logo", image: "/templates/logo1.png" },
    { id: 2, name: "Modern Logo", image: "/templates/logo2.png" },
    { id: 3, name: "Creative Logo", image: "/templates/logo1.png" },
    { id: 4, name: "Bold Logo", image: "/templates/logo2.png" },
  ];

  const portfolioTemplates = [
    { id: 1, name: "Modern Portfolio", image: "/templates/portfolio1.png" },
    { id: 2, name: "Clean Portfolio", image: "/templates/portfolio2.png" },
    { id: 3, name: "Creative Portfolio", image: "/templates/portfolio1.png" },
    { id: 4, name: "Professional Portfolio", image: "/templates/portfolio2.png" },
  ];

  const renderSection = (title, data, link) => {
    const displayData = isMobile ? data.slice(0, 2) : data.slice(0, 4);

    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {title}
        </h3>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition">
                <Link
                  to={link}
                  className="opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-2 rounded-lg font-medium shadow transition"
                >
                  Use
                </Link>
              </div>

              {/* Info */}
              <div className="p-3 text-center">
                <h4 className="font-medium text-gray-800">
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
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-purple-50">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
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
      <div className="text-center mt-16">
        <Link
          to="/templates"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Explore All Templates →
        </Link>
      </div>

    </section>
  );
};

export default TemplatesPreview;