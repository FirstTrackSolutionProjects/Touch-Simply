import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const EducationForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [edu, setEdu] = useState({
    level: "",
    specialization: "",
    school: "",
    startYear: "",
    endYear: "",
    cgpa: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const orderMap = {
    "10th": 1,
    "12th": 2,
    Diploma: 3,
    "B.Tech": 4,
    "B.Sc": 4,
    "B.Com": 4,
    BA: 4,
    "M.Tech": 5,
    MBA: 5,
    MCA: 5,
    "M.Sc": 5,
  };

  const degreeOptions = Object.keys(orderMap);

  const saveEducation = () => {
    if (!edu.level || !edu.school) {
      setError("Education level and school are required");
      return;
    }

    const exists = resumeData.education.some(
      (e, i) =>
        e.level === edu.level &&
        e.school === edu.school &&
        i !== editIndex
    );

    if (exists) {
      setError("This education already exists");
      return;
    }

    if (
      edu.startYear &&
      edu.endYear &&
      Number(edu.startYear) > Number(edu.endYear)
    ) {
      setError("Start year cannot be greater than end year");
      return;
    }

    let updated = [...resumeData.education];

    if (editIndex !== null) {
      updated[editIndex] = edu;
    } else {
      updated.push(edu);
    }

    updated.sort((a, b) => orderMap[a.level] - orderMap[b.level]);

    setResumeData({ ...resumeData, education: updated });

    setEdu({
      level: "",
      specialization: "",
      school: "",
      startYear: "",
      endYear: "",
      cgpa: "",
      location: "",
    });

    setEditIndex(null);
    setError("");
  };

  const removeEducation = (i) => {
    const updated = resumeData.education.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, education: updated });
  };

  const editEducation = (i) => {
    setEdu(resumeData.education[i]);
    setEditIndex(i);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Education</h2>

      <div className="grid gap-4 bg-white p-5 rounded-xl shadow">

        <select
          value={edu.level}
          onChange={(e) => setEdu({ ...edu, level: e.target.value })}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Select Education</option>
          {degreeOptions.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {edu.level && !["10th", "12th"].includes(edu.level) && (
          <input
            placeholder="Specialization"
            value={edu.specialization}
            onChange={(e) =>
              setEdu({ ...edu, specialization: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          />
        )}

        <input
          placeholder="School / College"
          value={edu.school}
          onChange={(e) => setEdu({ ...edu, school: e.target.value })}
          className="border px-3 py-2 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Start Year"
            value={edu.startYear}
            onChange={(e) =>
              setEdu({ ...edu, startYear: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          />
          <input
            placeholder="End Year"
            value={edu.endYear}
            onChange={(e) =>
              setEdu({ ...edu, endYear: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          />
        </div>

        <input
          placeholder="CGPA / %"
          value={edu.cgpa}
          onChange={(e) => setEdu({ ...edu, cgpa: e.target.value })}
          className="border px-3 py-2 rounded-lg"
        />

        <input
          placeholder="Location"
          value={edu.location}
          onChange={(e) =>
            setEdu({ ...edu, location: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={saveEducation}
          className="bg-purple-600 text-white py-2 rounded-lg"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>

        {editIndex !== null && (
          <button
            onClick={() => {
              setEditIndex(null);
              setEdu({});
            }}
            className="bg-gray-400 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {resumeData.education.map((e, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded flex justify-between">
            <div>
              🎓 {e.level} - {e.school}
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => editEducation(i)}>Edit</button>
              <button onClick={() => removeEducation(i)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;