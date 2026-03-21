import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const ExperienceForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [exp, setExp] = useState({
    role: "",
    company: "",
    duration: "",
  });

  const addExperience = () => {
    if (!exp.role || !exp.company) return;

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, exp],
    });

    setExp({ role: "", company: "", duration: "" });
  };

  const removeExp = (index) => {
    const updated = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Experience</h2>

      <div className="grid gap-4">
        <input
          placeholder="Job Role"
          value={exp.role}
          onChange={(e) => setExp({ ...exp, role: e.target.value })}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Company Name"
          value={exp.company}
          onChange={(e) => setExp({ ...exp, company: e.target.value })}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Duration (e.g. 2022-2024)"
          value={exp.duration}
          onChange={(e) => setExp({ ...exp, duration: e.target.value })}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addExperience}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Experience
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {resumeData.experience.map((e, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded-lg flex justify-between">
            <span>💼 {e.role} - {e.company}</span>
            <button onClick={() => removeExp(i)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;