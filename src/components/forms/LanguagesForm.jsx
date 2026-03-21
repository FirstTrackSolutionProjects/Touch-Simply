import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const LanguagesForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [lang, setLang] = useState("");

  const addLang = () => {
    if (!lang) return;

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
      <h2 className="text-2xl font-bold mb-6">Languages</h2>

      <div className="flex gap-3">
        <input
          placeholder="Add language (e.g. English)"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addLang}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {resumeData.languages.map((l, i) => (
          <div key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2">
            🌍 {l}
            <button onClick={() => removeLang(i)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesForm;