import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const EducationForm = ({ goBack, goNext }) => {
  const { resumeData, setResumeData } = useResume();

  const emptyEdu = {
    level: "",
    specialization: "",
    school: "",
    startYear: "",
    endYear: "",
    cgpa: "",
    location: "",
  };

  const [edu, setEdu] = useState(emptyEdu);
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

  // ✅ SAVE FUNCTION (returns true/false)
  const saveEducation = () => {
    if (!edu.level || !edu.school) {
      setError("Education level and school are required");
      return false;
    }

    const exists = resumeData.education.some(
      (e, i) =>
        e.level === edu.level &&
        e.school === edu.school &&
        i !== editIndex
    );

    if (exists) {
      setError("This education already exists");
      return false;
    }

    if (
      edu.startYear &&
      edu.endYear &&
      Number(edu.startYear) > Number(edu.endYear)
    ) {
      setError("Start year cannot be greater than end year");
      return false;
    }

    let updated = [...resumeData.education];

    if (editIndex !== null) {
      updated[editIndex] = edu;
    } else {
      updated.push(edu);
    }

    updated.sort((a, b) => orderMap[a.level] - orderMap[b.level]);

    setResumeData({ ...resumeData, education: updated });

    // reset form
    setEdu(emptyEdu);
    setEditIndex(null);
    setError("");

    return true;
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
    <div className="px-4 md:px-8 py-4 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Education</h2>

      {/* FORM */}
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
            type="number"
            placeholder="Start Year"
            value={edu.startYear}
            onChange={(e) =>
              setEdu({ ...edu, startYear: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          />
          <input
            type="number"
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

        {/* SAVE BUTTON */}
        <button
          onClick={saveEducation}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>

        {editIndex !== null && (
          <button
            onClick={() => {
              setEditIndex(null);
              setEdu(emptyEdu);
            }}
            className="bg-gray-400 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-3">
        {resumeData.education.map((e, i) => (
          <div
            key={i}
            className="p-3 bg-gray-100 rounded flex justify-between items-center"
          >
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

      {/* NAVIGATION */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <button
          onClick={goBack}
          className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
        >
          ← Back
        </button>

       <button
          onClick={() => {
            const hasCurrentData =
              edu.level || edu.school || edu.startYear || edu.endYear;

            let updatedList = [...resumeData.education];

            // ✅ If user typed something → simulate save
            if (hasCurrentData) {
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

              if (editIndex !== null) {
                updatedList[editIndex] = edu;
              } else {
                updatedList.push(edu);
              }

              // sort
              updatedList.sort((a, b) => orderMap[a.level] - orderMap[b.level]);

              // update state
              setResumeData({ ...resumeData, education: updatedList });

              // reset form
              setEdu(emptyEdu);
              setEditIndex(null);
              setError("");
            }

            // ✅ NOW check updated list (not old state)
            if (updatedList.length === 0) {
              setError("Please add at least one education");
              return;
            }

            // ✅ move next
            goNext();
          }}
          className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default EducationForm;