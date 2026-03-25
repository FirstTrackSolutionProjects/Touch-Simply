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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-950 via-indigo-950 to-gray-950 mt-3">

      {/* ================= Sidebar ================= */}
      <div className="md:w-64 bg-white/5 backdrop-blur-md border-r border-white/10 px-4 py-5 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">

        <h2 className="hidden md:block text-lg font-bold mb-4 text-white">
          Sections
        </h2>

        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`px-4 py-2 rounded-lg text-sm text-left whitespace-nowrap transition ${
              active === item.key
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= Mobile Toggle ================= */}
      <div className="md:hidden flex justify-center gap-4 p-4 bg-white/5 backdrop-blur border-b border-white/10">
        <button
          onClick={() => setMobileView("form")}
          className={`px-4 py-2 rounded-lg text-sm ${
            mobileView === "form"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Form
        </button>

        <button
          onClick={() => setMobileView("preview")}
          className={`px-4 py-2 rounded-lg text-sm ${
            mobileView === "preview"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Preview
        </button>
      </div>

      {/* ================= Form Section ================= */}
      {(mobileView === "form" || window.innerWidth >= 768) && (
        <div className="flex-1 flex items-center justify-center p-4 md:p-6">

          <div className="w-full max-w-xl bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl border border-gray-200">

            <h2 className="text-lg md:text-xl font-semibold mb-4 capitalize text-gray-800">
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
        <div className="md:w-1/2 flex items-center justify-center bg-white/5 backdrop-blur-md p-4 md:p-6 border-l border-white/10">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-5">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Live Preview
              </h2>

              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded text-xs hover:scale-105 transition">
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