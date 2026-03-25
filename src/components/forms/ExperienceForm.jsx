import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const ExperienceForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [exp, setExp] = useState({
    role: "",
    company: "",
    duration: "",
    location: "",
    description: "",
  });

  const [error, setError] = useState("");

  const addExperience = () => {
    if (!exp.role || !exp.company) {
      setError("Role and Company are required");
      return;
    }

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, exp],
    });

    setExp({
      role: "",
      company: "",
      duration: "",
      location: "",
      description: "",
    });

    setError("");
  };

  const removeExp = (index) => {
    const updated = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: updated });
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Experience
      </h2>

      {/* Form */}
      <div className="grid gap-5">

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Job Role *
          </label>
          <input
            placeholder="e.g. Frontend Developer"
            value={exp.role}
            onChange={(e) => setExp({ ...exp, role: e.target.value })}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Company *
          </label>
          <input
            placeholder="Company name"
            value={exp.company}
            onChange={(e) => setExp({ ...exp, company: e.target.value })}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Duration + Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              placeholder="e.g. Jan 2022 - Present"
              value={exp.duration}
              onChange={(e) =>
                setExp({ ...exp, duration: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              placeholder="e.g. Remote / Bhubaneswar"
              value={exp.location}
              onChange={(e) =>
                setExp({ ...exp, location: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Work Description
          </label>
          <textarea
            rows="3"
            placeholder="• Built responsive UI\n• Improved performance\n• Worked with APIs"
            value={exp.description}
            onChange={(e) =>
              setExp({ ...exp, description: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={addExperience}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Experience
        </button>

      </div>

      {/* Preview List */}
      <div className="mt-6 space-y-4">
        {resumeData.experience.map((e, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded-lg text-sm flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">
                💼 {e.role} - {e.company}
              </p>

              <div className="text-xs text-gray-500 mt-1">
                {e.duration && <span>{e.duration} • </span>}
                {e.location && <span>{e.location}</span>}
              </div>

              {e.description && (
                <ul className="mt-2 list-disc list-inside text-xs text-gray-600 whitespace-pre-line">
                  {e.description}
                </ul>
              )}
            </div>

            {/* Remove */}
            <button
              onClick={() => removeExp(i)}
              className="text-red-500 text-xs hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExperienceForm;