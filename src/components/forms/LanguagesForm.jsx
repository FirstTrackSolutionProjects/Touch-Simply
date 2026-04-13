import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const LanguagesForm = () => {
  const { resumeData, setResumeData } = useResume();
  const [lang, setLang] = useState("");

  const addLang = () => {
    if (!lang.trim()) return;

    const exists = resumeData.languages.some(
      (l) => l.name === lang
    );
    if (exists) return;

    setResumeData({
      ...resumeData,
      languages: [
        ...resumeData.languages,
        { name: lang, level: "Basic" },
      ],
    });

    setLang("");
  };

  const updateLevel = (i, level) => {
    const updated = [...resumeData.languages];
    updated[i].level = level;
    setResumeData({ ...resumeData, languages: updated });
  };

  const removeLang = (i) => {
    const updated = resumeData.languages.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, languages: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Languages</h2>

      <div className="flex gap-2">
        <input
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Add language"
        />
        <button onClick={addLang} className="bg-blue-500 text-white px-4">
          Add
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {resumeData.languages.map((l, i) => (
          <div key={i} className="flex gap-3 items-center bg-gray-100 p-2">
            <span>{l.name}</span>

            <select
              value={l.level}
              onChange={(e) => updateLevel(i, e.target.value)}
              className="border px-2"
            >
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Fluent</option>
              <option>Native</option>
            </select>

            <button onClick={() => removeLang(i)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesForm;
