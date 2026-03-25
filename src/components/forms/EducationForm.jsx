import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const EducationForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [edu, setEdu] = useState({
    degree: "",
    school: "",
    year: "",
    location: "",
    cgpa: "",
  });

  const [error, setError] = useState("");

  const addEducation = () => {
    if (!edu.degree || !edu.school) {
      setError("Degree and School are required");
      return;
    }

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, edu],
    });

    setEdu({
      degree: "",
      school: "",
      year: "",
      location: "",
      cgpa: "",
    });

    setError("");
  };

  const removeEducation = (index) => {
    const updated = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: updated });
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Education
      </h2>

      {/* Form */}
      <div className="grid gap-5">

        {/* Degree */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Degree *
          </label>
          <input
            placeholder="e.g. B.Tech in Computer Science"
            value={edu.degree}
            onChange={(e) =>
              setEdu({ ...edu, degree: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* School */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            School / University *
          </label>
          <input
            placeholder="Enter college or school name"
            value={edu.school}
            onChange={(e) =>
              setEdu({ ...edu, school: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Year + CGPA */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              placeholder="e.g. 2024"
              value={edu.year}
              onChange={(e) =>
                setEdu({ ...edu, year: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              CGPA / %
            </label>
            <input
              placeholder="e.g. 8.5 CGPA"
              value={edu.cgpa}
              onChange={(e) =>
                setEdu({ ...edu, cgpa: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            placeholder="e.g. Bhubaneswar"
            value={edu.location}
            onChange={(e) =>
              setEdu({ ...edu, location: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={addEducation}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Education
        </button>

      </div>

      {/* Preview List */}
      <div className="mt-6 space-y-4">
        {resumeData.education.map((e, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded-lg text-sm flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">
                🎓 {e.degree}
              </p>
              <p>{e.school}</p>

              <div className="text-xs text-gray-500 mt-1">
                {e.year && <span>{e.year} • </span>}
                {e.location && <span>{e.location} • </span>}
                {e.cgpa && <span>{e.cgpa}</span>}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeEducation(i)}
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

export default EducationForm;