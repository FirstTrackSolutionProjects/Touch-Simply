import { useState, useEffect } from "react";

import PersonalForm from "../components/forms/PersonalForm";
import EducationForm from "../components/forms/EducationForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import LanguageForm from "../components/forms/LanguagesForm";
import SkillsForm from "../components/forms/SkillsForm";
import AgreementForm from "../components/forms/AgreementForm";
import Canvas from "../components/Canvas";

const Editor = () => {
  const [active, setActive] = useState("personal");
  const [mobileView, setMobileView] = useState("form");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const menu = [
    { key: "personal", label: "👤 Personal" },
    { key: "education", label: "🎓 Education" },
    { key: "experience", label: "💼 Experience" },
    { key: "projects", label: "🚀 Projects" },
    { key: "skills", label: "💪 Skills" },
    { key: "languages", label: "🌐 Languages" },
    { key: "agreement", label: "📄 Agreement" },
  ];

  const renderForm = () => {
    switch (active) {
      case "personal":
          return <PersonalForm goNext={() => setActive("education")} />;
      case "education":
        return <EducationForm 
        goBack={() => setActive("personal")}
        goNext={() => setActive("experience")} />;
      case "experience":
        return <ExperienceForm
        goBack={() => setActive("education")}
        goNext={() => setActive("projects")} />;
      case "projects":
        return <ProjectsForm
        goBack={() => setActive("experience")}
        goNext={() => setActive("skills")} />;
      case "skills":
        return <SkillsForm
        goBack={() => setActive("projects")}
        goNext={() => setActive("languages")} />;
      case "languages":
        return <LanguageForm 
        goBack={() => setActive("skills")}
        goNext={() => setActive("agreement")} />;
      case "agreement":
        return <AgreementForm goBack={() => setActive("languages")} />;
      default:
        return <PersonalForm />;
      
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-950 via-purple-950/60 to-black relative">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.15),transparent_60%)]" />

      {/* ================= Sidebar ================= */}
      <div className="md:w-64 sticky top-0 h-auto md:h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-4 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible z-10">

        <h2 className="hidden md:block text-lg font-bold text-white mb-4">
          Sections
        </h2>

        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              active === item.key
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= Mobile Toggle ================= */}
      {isMobile && (
        <div className="flex justify-center gap-3 p-3 bg-white/5 border-b border-white/10 z-10">
          <button
            onClick={() => setMobileView("form")}
            className={`px-4 py-2 rounded-full ${
              mobileView === "form"
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-300"
            }`}
          >
            Form
          </button>

          <button
            onClick={() => setMobileView("preview")}
            className={`px-4 py-2 rounded-full ${
              mobileView === "preview"
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-300"
            }`}
          >
            Preview
          </button>
        </div>
      )}

      {/* ================= Form Section ================= */}
      {(!isMobile || mobileView === "form") && (
        <div className="flex-1 flex justify-center p-6 z-10">

          <div className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border">

            <h2 className="text-xl font-semibold mb-5 capitalize">
              {active} Details
            </h2>

            <div className="transition-all duration-300">
              {renderForm()}
            </div>

          </div>
        </div>
      )}

      {/* ================= Preview Section ================= */}
      {(!isMobile || mobileView === "preview") && (
        <div className="md:w-1/2 flex justify-center p-6 bg-white/5 border-l border-white/10 z-10">

          <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-semibold text-white">Live Preview</h2>
            </div>
          <Canvas />

          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;