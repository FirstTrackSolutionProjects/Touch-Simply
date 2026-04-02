import React, { useState, useEffect } from "react";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TemplateSection = ({ title, data, type, onUse }) => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [visible, setVisible] = useState(isMobile ? 2 : 4);

  // Resize detect
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setVisible(isMobile ? 2 : 4);
  }, [isMobile]);

  // 🔥 PREVIEW FUNCTION
  const handlePreview = (key, type) => {
    localStorage.setItem("selectedTemplate", key);

    if (type === "resume") navigate("/editor?preview=true");
    if (type === "logo") navigate("/logo?preview=true");
    if (type === "portfolio") navigate("/portfolio?preview=true");
  };

  return (
    <div className="mb-16">

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-6">
        {title}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {data.slice(0, visible).map((t) => (
          <div
            key={t.key}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-lg transition"
          >

            {/* Image */}
            <div className="relative">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-52 object-cover group-hover:scale-105 transition"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">

                {/* USE */}
                <button
                  onClick={() => onUse(t.key, type)}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  <FaCheckCircle /> Use
                </button>

                {/* 🔥 PREVIEW */}
                <button
                  onClick={() => handlePreview(t.key, type)}
                  className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
                >
                  <FaEye /> Preview
                </button>

              </div>
            </div>

            {/* Info */}
            <div className="p-3 text-center">
              <h3 className="text-white text-sm font-medium">
                {t.name}
              </h3>
            </div>

          </div>
        ))}
      </div>

      {/* Mobile Buttons */}
      {isMobile && (
        visible < data.length ? (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisible((prev) => prev + 2)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              Explore More →
            </button>
          </div>
        ) : (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisible(2)}
              className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              Show Less ↑
            </button>
          </div>
        )
      )}

    </div>
  );
};

export default TemplateSection;