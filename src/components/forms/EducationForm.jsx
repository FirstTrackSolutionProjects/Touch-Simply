import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const EducationForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [edu, setEdu] = useState({
    degree: "",
    school: "",
  });

  const addEducation = () => {
    if (!edu.degree || !edu.school) return;

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, edu],
    });

    setEdu({ degree: "", school: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Education</h2>

      <div className="grid gap-4">

        <input
          placeholder="Degree (e.g. B.Tech)"
          value={edu.degree}
          onChange={(e) =>
            setEdu({ ...edu, degree: e.target.value })
          }
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          placeholder="School / University"
          value={edu.school}
          onChange={(e) =>
            setEdu({ ...edu, school: e.target.value })
          }
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={addEducation}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Education
        </button>

      </div>

      {/* Preview List */}
      <div className="mt-6 space-y-3">
        {resumeData.education.map((e, i) => (
          <div
            key={i}
            className="p-3 bg-gray-100 rounded-lg text-sm"
          >
            🎓 {e.degree} - {e.school}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;