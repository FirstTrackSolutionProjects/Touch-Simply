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
    <div className="flex justify-center items-start">

      {/* Resume Paper */}
      <div className="w-full max-w-[750px] bg-white shadow-2xl rounded-md p-6 border border-gray-200 scale-[0.95] md:scale-100 origin-top">

        {renderTemplate()}

      </div>

    </div>
  );
};

export default Canvas;