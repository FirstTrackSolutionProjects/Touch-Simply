import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const LanguagesForm = ({ goBack, goNext }) => {
  const { resumeData, setResumeData } = useResume();

  const [lang, setLang] = useState("");
  const [error, setError] = useState("");

  const addLang = () => {
    if (!lang.trim()) return;

    const exists = resumeData.languages.some(
      (l) => l.name.toLowerCase() === lang.toLowerCase()
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
    <div className="px-4 md:px-8 py-4 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Languages</h2>

      {/* INPUT */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addLang()}
          className="flex-1 border p-2.5 rounded-lg"
          placeholder="Add language (e.g. English)"
        />
        <button
          onClick={addLang}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-3">
        {resumeData.languages.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No languages added yet...
          </p>
        ) : (
          resumeData.languages.map((l, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-100 p-3 rounded-lg"
            >
              <span className="font-medium">{l.name}</span>

              <div className="flex gap-2 items-center">
                <select
                  value={l.level}
                  onChange={(e) => updateLevel(i, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option>Basic</option>
                  <option>Intermediate</option>
                  <option>Fluent</option>
                  <option>Native</option>
                </select>

                <button
                  onClick={() => removeLang(i)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ERROR */}
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {/* NAVIGATION */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <button
          onClick={goBack}
          className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
        >
          ← Back
        </button>

        <button
          onClick={() => {
            const hasCurrentData = lang.trim();

            let updatedList = [...resumeData.languages];

            // ✅ auto add language if typed but not added
            if (hasCurrentData) {
              const exists = resumeData.languages.some(
                (l) => l.name.toLowerCase() === lang.toLowerCase()
              );

              if (!exists) {
                updatedList.push({
                  name: lang,
                  level: "Basic",
                });

                setResumeData({
                  ...resumeData,
                  languages: updatedList,
                });
              }

              setLang("");
              setError("");
            }

            // ✅ correct validation
            if (updatedList.length === 0) {
              setError("Please add at least one language");
              return;
            }

            goNext();
          }}
          className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Next →
        </button>

      </div>
    </div>
  );
};

export default LanguagesForm;