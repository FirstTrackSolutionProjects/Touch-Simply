import { useState } from "react";

import PersonalForm from "../components/forms/PersonalForm";
import EducationForm from "../components/forms/EducationForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import LanguageForm from "../components/forms/LanguagesForm";
import SkillsForm from "../components/forms/SkillsForm";
import Canvas from "../components/Canvas";

const Editor = () => {
  const [active, setActive] = useState("personal");
  const [mobileView, setMobileView] = useState("form");

  const menu = [
    { key: "personal", label: "👤 Personal" },
    { key: "education", label: "🎓 Education" },
    { key: "experience", label: "💼 Experience" },
    { key: "projects", label: "🚀 Projects" },
    { key: "skills", label: "💪 Skills" },
    { key: "languages", label: "🌐 Languages" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-950 via-purple-950/70 to-gray-950">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.15),transparent_60%)] pointer-events-none"></div>

      {/* ================= Sidebar ================= */}
      <div className="md:w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 px-4 py-6 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible z-10">

        <h2 className="hidden md:block text-lg font-bold mb-4 text-white">
          Sections
        </h2>

        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`relative px-4 py-2 rounded-lg text-sm text-left whitespace-nowrap transition-all duration-300 ${
              active === item.key
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {item.label}

            {/* Active Indicator */}
            {active === item.key && (
              <span className="absolute left-0 top-0 h-full w-1 bg-purple-400 rounded-r"></span>
            )}
          </button>
        ))}
      </div>

      {/* ================= Mobile Toggle ================= */}
      <div className="md:hidden flex justify-center gap-3 p-4 bg-white/5 backdrop-blur border-b border-white/10 z-10">

        <button
          onClick={() => setMobileView("form")}
          className={`px-5 py-2 rounded-full text-sm transition ${
            mobileView === "form"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Form
        </button>

        <button
          onClick={() => setMobileView("preview")}
          className={`px-5 py-2 rounded-full text-sm transition ${
            mobileView === "preview"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Preview
        </button>
      </div>

      {/* ================= Form Section ================= */}
      {(mobileView === "form" || window.innerWidth >= 768) && (
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 z-10">

          <div className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-gray-200">

            <h2 className="text-lg md:text-xl font-semibold mb-6 capitalize text-gray-800">
              {active} Details
            </h2>

            {active === "personal" && <PersonalForm />}
            {active === "education" && <EducationForm />}
            {active === "experience" && <ExperienceForm />}
            {active === "projects" && <ProjectsForm />}
            {active === "skills" && <SkillsForm />}
            {active === "languages" && <LanguageForm />}
          </div>
        </div>
      )}

      {/* ================= Preview Section ================= */}
      {(mobileView === "preview" || window.innerWidth >= 768) && (
        <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white/5 backdrop-blur-lg border-l border-white/10 z-10">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-5 md:p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Live Preview
              </h2>

              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-md text-xs hover:scale-105 transition">
                Download
              </button>
            </div>

            {/* Resume Preview */}
            <div className="scale-[0.85] md:scale-90 origin-top">
              <Canvas />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Editor;