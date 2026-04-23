import { useRef } from "react";
import { useResume } from "../context/ResumeContext";
import * as htmlToImage from "html-to-image";

import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";

const Canvas = () => {
  const { template, setTemplate } = useResume(); // 🔥 IMPORTANT
  const resumeRef = useRef();

  // 🎯 Template Render
  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalTemplate />;
      case "modern":
        return <ModernTemplate />;
      case "creative":
        return <CreativeTemplate />;
      case "professional":
        return <ProfessionalTemplate />;
      default:
        return <MinimalTemplate />;
    }
  };

  // 📥 Download Function
  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(resumeRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "resume.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-6">

      {/* 🔥 TOP BAR */}
      <div className="w-full max-w-[900px] flex flex-col gap-3 mb-4">

        {/* Row 1 */}
        <div className="flex justify-between items-center">

          {/* Template Name */}
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700">
            Template: {template.toUpperCase()}
          </span>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:scale-105 transition shadow-md"
          >
            ⬇ Download Resume
          </button>

        </div>

        {/* 🔥 TEMPLATE SWITCHER */}
        <div className="flex gap-2 flex-wrap">
          {["minimal", "modern", "creative", "professional"].map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1 rounded-full text-xs capitalize transition 
                ${
                  template === t
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      {/* 🔥 BACKGROUND */}
      <div className="w-full flex justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4 md:p-8 rounded-2xl shadow-inner">

        <div className="relative group">

          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl"></div>

          {/* 🔥 RESUME AREA */}
          <div
            ref={resumeRef}
            className="relative w-full max-w-[800px] bg-white 
                       shadow-[0_20px_60px_rgba(0,0,0,0.2)] 
                       rounded-md border border-gray-200
                       transition-all duration-300 
                       scale-[0.9] md:scale-100 origin-top
                       group-hover:scale-[0.92]"
          >

            {/* Top Strip */}
            <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-md"></div>

            {/* Template Content */}
            <div className="p-6 md:p-10">
              {renderTemplate()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;