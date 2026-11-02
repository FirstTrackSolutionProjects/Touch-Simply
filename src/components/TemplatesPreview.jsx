import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const TemplatesPreview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderSection = (title, data, link) => {
    const displayData = isMobile ? data.slice(0, 2) : data.slice(0, 4);

    return (
      <div className="mb-24 last:mb-0">
        <div className="flex justify-between items-end mb-8 border-b border-neutral-border pb-4">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-text-primary">
            {title}
          </h3>
          <Link to={link} className="text-sm font-semibold text-brand-red hover:text-brand-red-hover transition-colors flex items-center gap-1 group">
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-bg">
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-md">
                    {item.tag}
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Link to={link} className="bg-white text-brand-black px-6 py-2.5 rounded-lg font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Use Template
                  </Link>
                </div>
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-neutral-text-primary group-hover:text-brand-red transition-colors text-sm md:text-base">
                  {item.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary">
            Explore Templates
          </h2>
          <p className="text-neutral-text-secondary mt-4 text-lg">
            Create stunning designs with beautifully crafted templates.
          </p>
        </div>

        {renderSection("Resume Templates", resumeTemplates, "/templates?type=resume")}
        {renderSection("Logo Templates", logoTemplates, "/logo")}
        {renderSection("Portfolio Templates", portfolioTemplates, "/portfolio")}
      </div>
    </section>
  );
};

export default TemplatesPreview;
