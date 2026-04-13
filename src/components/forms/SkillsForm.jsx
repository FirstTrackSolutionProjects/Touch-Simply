import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { suggestSkills } from "../../utils/aiMock";

const SkillsForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("General");

  // ✅ Add Skill
  const addSkill = () => {
    if (!skill.trim()) return;

    const exists = resumeData.skills.some(
      (s) => s.name === skill
    );
    if (exists) return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { name: skill, category }],
    });

    setSkill("");
  };

  // ❌ Remove
  const removeSkill = (i) => {
    const updated = resumeData.skills.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, skills: updated });
  };

  // 🤖 AI Suggest Skills
  const handleSuggest = () => {
    const list = suggestSkills(resumeData.personal?.role);

    const newSkills = list.map((s) => ({
      name: s,
      category: "Suggested",
    }));

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ...newSkills],
    });
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">Skills</h2>

      {/* Input */}
      <div className="flex gap-3">

        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Add skill"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2"
        >
          <option>General</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Tools</option>
        </select>

        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-4"
        >
          Add
        </button>
      </div>

      {/* 🤖 AI */}
      <button
        onClick={handleSuggest}
        className="bg-purple-600 text-white px-4 py-1 rounded"
      >
        ✨ Suggest Skills
      </button>

      {/* List */}
      <div className="flex flex-wrap gap-3">
        {resumeData.skills.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
          >
            <span>{s.name}</span>
            <span className="text-xs text-gray-500">
              ({s.category})
            </span>

            <button onClick={() => removeSkill(i)}>
              <FaTimes size={10} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;