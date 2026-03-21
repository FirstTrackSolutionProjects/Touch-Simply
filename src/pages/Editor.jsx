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
  const [mobileView, setMobileView] = useState("form"); // form | preview

  const menu = [
    { key: "personal", label: "👤 Personal" },
    { key: "education", label: "🎓 Education" },
    { key: "experience", label: "💼 Experience" },
    { key: "projects", label: "🚀 Projects" },
    { key: "skills", label: "💪 Skills" },
    { key: "languages", label: "🌐 Languages" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* Sidebar */}
      <div className="md:w-64 bg-white border-r px-4 py-5 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">

        <h2 className="hidden md:block text-lg font-bold mb-4">
          Sections
        </h2>

        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`px-4 py-2 rounded-lg text-sm text-left whitespace-nowrap transition ${
              active === item.key
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* MOBILE TOGGLE */}
      <div className="md:hidden flex justify-center gap-4 p-4 bg-white border-b">
        <button
          onClick={() => setMobileView("form")}
          className={`px-4 py-2 rounded-lg ${
            mobileView === "form"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Form
        </button>

        <button
          onClick={() => setMobileView("preview")}
          className={`px-4 py-2 rounded-lg ${
            mobileView === "preview"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Form Section */}
      {(mobileView === "form" || window.innerWidth >= 768) && (
        <div className="flex-1 flex items-center justify-center p-4 md:p-6">

          <div className="w-full max-w-xl bg-white p-5 md:p-6 rounded-xl shadow">

            <h2 className="text-lg md:text-xl font-semibold mb-4 capitalize">
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

      {/* Preview Section */}
      {(mobileView === "preview" || window.innerWidth >= 768) && (
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4 md:p-6 border-l">

          <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-5">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Live Preview
              </h2>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">
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