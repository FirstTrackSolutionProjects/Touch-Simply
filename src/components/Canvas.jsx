import { useResume } from "../context/ResumeContext";

import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";

const Canvas = () => {
  const { template } = useResume();

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

  return (
    <div className="w-full flex justify-center items-start py-6">

      {/* 🔥 Outer Background (Editor Feel) */}
      <div className="w-full flex justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4 md:p-8 rounded-2xl shadow-inner">

        {/* 🔥 Paper Wrapper */}
        <div className="relative group">

          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl"></div>

          {/* Resume Paper */}
          <div className="relative w-full max-w-[800px] bg-white 
                          shadow-[0_20px_60px_rgba(0,0,0,0.2)] 
                          rounded-md border border-gray-200
                          transition-all duration-300 
                          scale-[0.9] md:scale-100 origin-top
                          group-hover:scale-[0.92]">

            {/* Top Strip (like real page header) */}
            <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-md"></div>

            {/* Inner Content */}
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