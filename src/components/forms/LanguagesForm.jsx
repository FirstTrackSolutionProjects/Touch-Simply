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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Languages
      </h2>

      {/* Input Section */}
      <div className="flex gap-3">
        <input
          placeholder="Add language (e.g. English)"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border px-4 py-2.5 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
        />

        <button
          onClick={addLang}
          className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Add
        </button>
      </div>

      {/* Languages List */}
      <div className="mt-6 flex flex-wrap gap-3">
        {resumeData.languages.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 transition"
          >
            <FaGlobe className="text-gray-500" />

            <span>{l}</span>

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