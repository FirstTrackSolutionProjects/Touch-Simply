import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { generateExperienceDesc } from "../../utils/aiMock";

const ExperienceForm = ({ goBack, goNext }) => {
  const { resumeData, setResumeData } = useResume();

  const emptyExp = {
    role: "",
    company: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    isCurrent: false,
    location: "",
    description: "",
  };

  const [exp, setExp] = useState(emptyExp);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const saveExperience = () => {
    if (!exp.role || !exp.company || !exp.startYear) {
      setError("Role, company & start date are required");
      return;
    }

    if (!exp.isCurrent && (!exp.endMonth || !exp.endYear)) {
      setError("Please add end date or mark as currently working");
      return;
    }

    let updated = [...resumeData.experience];

    if (editIndex !== null) {
      updated[editIndex] = exp;
    } else {
      updated.push(exp);
    }

    setResumeData({ ...resumeData, experience: updated });
    setExp(emptyExp);
    setEditIndex(null);
    setError("");
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
    <div className="px-4 md:px-8 py-4 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Experience
      </h2>

      {/* FORM */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">

        <input
          placeholder="Role (e.g. Frontend Developer)"
          value={exp.role}
          onChange={(e) => setExp({ ...exp, role: e.target.value })}
          className="w-full border p-2.5 rounded-lg text-sm md:text-base"
        />

        <input
          placeholder="Company (e.g. Infosys)"
          value={exp.company}
          onChange={(e) => setExp({ ...exp, company: e.target.value })}
          className="w-full border p-2.5 rounded-lg text-sm md:text-base"
        />

        {/* START DATE */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Start Date</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <select
              value={exp.startMonth}
              onChange={(e) => setExp({ ...exp, startMonth: e.target.value })}
              className="border p-2.5 rounded-lg text-sm"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Year"
              value={exp.startYear}
              onChange={(e) => setExp({ ...exp, startYear: e.target.value })}
              className="border p-2.5 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* CURRENT JOB */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={exp.isCurrent}
            onChange={(e) =>
              setExp({
                ...exp,
                isCurrent: e.target.checked,
                endMonth: "",
                endYear: "",
              })
            }
          />
          I currently work here
        </label>

        {/* END DATE */}
        <div>
          <p className="text-xs text-gray-500 mb-1">End Date</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <select
              value={exp.endMonth}
              onChange={(e) => setExp({ ...exp, endMonth: e.target.value })}
              disabled={exp.isCurrent}
              className="border p-2.5 rounded-lg text-sm disabled:bg-gray-100"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Year"
              value={exp.isCurrent ? "" : exp.endYear}
              onChange={(e) => setExp({ ...exp, endYear: e.target.value })}
              disabled={exp.isCurrent}
              className="border p-2.5 rounded-lg text-sm disabled:bg-gray-100"
            />
          </div>
        </div>

        <textarea
          placeholder="Describe your work..."
          value={exp.description}
          onChange={(e) =>
            setExp({ ...exp, description: e.target.value })
          }
          className="w-full border p-2.5 rounded-lg text-sm md:text-base"
          rows={3}
        />

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAI}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm"
          >
            ✨ Generate
          </button>

          <button
            onClick={saveExperience}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm"
          >
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      {/* EXPERIENCE LIST */}
      <div className="mt-6 space-y-3">
        {resumeData.experience.map((e, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
          >
            <div>
              <p className="font-medium text-sm md:text-base">
                {e.role} @ {e.company}
              </p>
              <p className="text-xs text-gray-500">
                {e.startMonth} {e.startYear} -{" "}
                {e.isCurrent
                  ? "Present"
                  : `${e.endMonth} ${e.endYear}`}
              </p>
            </div>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => editExp(i)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => removeExp(i)}
                className="text-red-500"
              >
                Remove
              </button>
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
              exp.role || exp.company || exp.startYear || exp.startMonth;

            let updatedList = [...resumeData.experience];

            // ✅ Auto-save if user typed something
            if (hasCurrentData) {
              if (!exp.role || !exp.company || !exp.startYear) {
                setError("Role, company & start date are required");
                return;
              }

              if (!exp.isCurrent && (!exp.endMonth || !exp.endYear)) {
                setError("Please add end date or mark as currently working");
                return;
              }

              if (editIndex !== null) {
                updatedList[editIndex] = exp;
              } else {
                updatedList.push(exp);
              }

              // update state
              setResumeData({ ...resumeData, experience: updatedList });

              // reset form
              setExp(emptyExp);
              setEditIndex(null);
              setError("");
            }

            // ✅ Check using updated list (NOT state)
            if (updatedList.length === 0) {
              setError("Add at least one experience");
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

export default ExperienceForm;