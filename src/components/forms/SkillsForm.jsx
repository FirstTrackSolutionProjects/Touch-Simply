import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const SkillsForm = () => {
  const { resumeData, setResumeData } = useResume();
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill) return;

    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill],
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

      <div className="flex gap-3">
        <input
          placeholder="Add skill (e.g. React)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border p-3 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {resumeData.skills.map((s, i) => (
          <div key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2">
            {s}
            <button onClick={() => removeSkill(i)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;