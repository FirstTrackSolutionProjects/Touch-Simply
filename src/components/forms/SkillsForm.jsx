import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SkillsForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("General");

  const addSkill = () => {
    if (!skill.trim()) return;

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
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-gray-800">
        Skills
      </h2>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          placeholder="Type skill & press Enter..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="flex-1 px-4 py-2.5 rounded-xl border bg-white/70 backdrop-blur focus:ring-2 focus:ring-purple-500 outline-none transition"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border bg-white/70 backdrop-blur focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option>General</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>Tools</option>
        </select>

        <button
          onClick={addSkill}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 rounded-xl font-medium shadow hover:scale-105 transition"
        >
          Add
        </button>

      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-3">

        {resumeData.skills.length === 0 && (
          <p className="text-sm text-gray-400">
            No skills added yet
          </p>
        )}

        {resumeData.skills.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm 
            bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 
            shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium">{s.name}</span>

            <span className="text-xs opacity-70">
              ({s.category})
            </span>

            <button
              onClick={() => removeSkill(i)}
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

export default SkillsForm;