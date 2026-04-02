import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { FaGlobe, FaTimes } from "react-icons/fa";

const LanguagesForm = () => {
  const { resumeData, setResumeData } = useResume();
  const [lang, setLang] = useState("");

  const addLang = () => {
    if (!lang.trim()) return;

    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, lang],
    });

    setLang("");
  };

  const removeLang = (index) => {
    const updated = resumeData.languages.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, languages: updated });
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-gray-800">
        Languages
      </h2>

      {/* Input */}
      <div className="flex gap-3">

        <input
          placeholder="Type language & press Enter..."
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addLang()}
          className="flex-1 px-4 py-2.5 rounded-xl border bg-white/70 backdrop-blur focus:ring-2 focus:ring-purple-500 outline-none transition"
        />

        <button
          onClick={addLang}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 rounded-xl font-medium shadow hover:scale-105 transition"
        >
          Add
        </button>

      </div>

      {/* List */}
      <div className="flex flex-wrap gap-3">

        {resumeData.languages.length === 0 && (
          <p className="text-sm text-gray-400">
            No languages added yet
          </p>
        )}

        {resumeData.languages.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm 
            bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 
            shadow-sm hover:shadow-md transition"
          >
            <FaGlobe className="text-indigo-500" />

            <span className="font-medium">{l}</span>

            <button
              onClick={() => removeLang(i)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}

      </div>

    </div>
  );
};

export default LanguagesForm;