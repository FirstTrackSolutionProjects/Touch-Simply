import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { generateExperienceDesc } from "../../utils/aiMock";

const ExperienceForm = () => {
  const { resumeData, setResumeData } = useResume();

  const emptyExp = {
    role: "",
    company: "",
    startYear: "",
    endYear: "",
    isCurrent: false,
    location: "",
    description: "",
  };

  const [exp, setExp] = useState(emptyExp);
  const [editIndex, setEditIndex] = useState(null);

  const saveExperience = () => {
    let updated = [...resumeData.experience];

    if (editIndex !== null) {
      updated[editIndex] = exp;
    } else {
      updated.push(exp);
    }

    setResumeData({ ...resumeData, experience: updated });
    setExp(emptyExp);
    setEditIndex(null);
  };

  const editExp = (i) => {
    setExp(resumeData.experience[i]);
    setEditIndex(i);
  };

  const removeExp = (i) => {
    const updated = resumeData.experience.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, experience: updated });
  };

  const handleAI = () => {
    const text = generateExperienceDesc(exp.role);
    setExp({ ...exp, description: text });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Experience</h2>

      <div className="grid gap-3">
        <input
          placeholder="Role"
          value={exp.role}
          onChange={(e) => setExp({ ...exp, role: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Company"
          value={exp.company}
          onChange={(e) => setExp({ ...exp, company: e.target.value })}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={exp.description}
          onChange={(e) =>
            setExp({ ...exp, description: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button onClick={handleAI} className="bg-purple-500 text-white p-2 rounded">
          ✨ Generate Description
        </button>

        <button onClick={saveExperience} className="bg-green-500 text-white p-2 rounded">
          {editIndex !== null ? "Update" : "Save"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {resumeData.experience.map((e, i) => (
          <div key={i} className="p-3 bg-gray-100 flex justify-between">
            <div>{e.role} - {e.company}</div>
            <div className="flex gap-2">
              <button onClick={() => editExp(i)}>Edit</button>
              <button onClick={() => removeExp(i)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;