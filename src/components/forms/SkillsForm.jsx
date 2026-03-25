import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const SkillsForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("General");

  const addSkill = () => {
    if (!skill) return;

    const newSkill = { name: skill, category };

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });

    setSkill("");
  };

  const removeSkill = (index) => {
    const updated = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          placeholder="Add skill (e.g. React)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option>General</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>Tools</option>
        </select>

        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* Skills List */}
      <div className="mt-6 flex flex-wrap gap-3">
        {resumeData.skills.length === 0 && (
          <p className="text-sm text-gray-400">
            No skills added yet
          </p>
        )}

        {resumeData.skills.map((s, i) => (
          <div
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            {s.name} 
            <span className="text-xs opacity-70">({s.category})</span>

            <button
              onClick={() => removeSkill(i)}
              className="text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;