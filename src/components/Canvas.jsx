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

      {/* Background Wrapper (Editor Feel) */}
      <div className="w-full flex justify-center bg-gray-100 p-4 md:p-6 rounded-xl">

        {/* Resume Paper */}
        <div className="w-full max-w-[800px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-sm border border-gray-200 transition-all duration-300 scale-[0.92] md:scale-100 origin-top">

          {/* Inner Content */}
          <div className="p-6 md:p-8">
            {renderTemplate()}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Canvas;