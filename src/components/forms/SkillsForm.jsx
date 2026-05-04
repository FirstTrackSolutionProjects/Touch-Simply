import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { suggestSkills } from "../../utils/aiMock";

const SkillsForm = ({ goBack, goNext }) => {
  const { resumeData, setResumeData } = useResume();

  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;

    const exists = resumeData.skills.some(
      (s) => s.name.toLowerCase() === skill.toLowerCase()
    );
    if (exists) return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { name: skill, category }],
    });

    setSkill("");
  };

  const removeSkill = (i) => {
    const updated = resumeData.skills.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, skills: updated });
  };

  const handleSuggest = () => {
  const list = suggestSkills(resumeData.personal?.role);

  const filtered = list.filter(
    (s) =>
      !resumeData.skills.some(
        (existing) =>
          existing.name.toLowerCase() === s.toLowerCase()
      )
  );

  const newSkills = filtered.map((s) => ({
    name: s,
    category: "Suggested",
  }));

  setResumeData({
    ...resumeData,
    skills: [...resumeData.skills, ...newSkills],
  });
};

  return (
    <div className="space-y-6 p-4 md:p-6 bg-white rounded-xl shadow-sm">

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold">Skills</h2>

        <button
          onClick={handleSuggest}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          ✨ Suggest Skills
        </button>
      </div>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a skill (e.g. React, Node.js)"
        />

        <button
          onClick={addSkill}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="max-h-[200px] overflow-y-auto border rounded-lg p-3">

        {resumeData.skills.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No skills added yet...
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                <span className="font-medium">{s.name}</span>

                <span className="text-xs text-gray-500">
                  ({s.category})
                </span>

                <button
                  onClick={() => removeSkill(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">

        {/* Back */}
        <button
          onClick={() => goBack && goBack()}
          className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
        >
          ← Back
        </button>

        {/* Next */}
        <button
            onClick={() => {
              const hasCurrentData = skill.trim();

              let updatedList = [...resumeData.skills];

              // ✅ auto add skill if user typed but didn't click "Add"
              if (hasCurrentData) {
                const exists = resumeData.skills.some(
                  (s) => s.name.toLowerCase() === skill.toLowerCase()
                );

                if (!exists) {
                  updatedList.push({
                    name: skill,
                    category,
                  });

                  setResumeData({
                    ...resumeData,
                    skills: updatedList,
                  });
                }

                setSkill("");
                setError("");
              }

              // ✅ correct check (not state)
              if (updatedList.length === 0) {
                setError("Please add at least one skill");
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

export default SkillsForm;