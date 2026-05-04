import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { generateExperienceDesc } from "../../utils/aiMock";

const ProjectsForm = ({ goBack, goNext }) => {
  const { resumeData, setResumeData } = useResume();

  const emptyProject = {
    title: "",
    description: "",
    tech: "",
    live: "",
    github: "",
  };

  const [project, setProject] = useState(emptyProject);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // ✅ SAVE FUNCTION
  const addProject = () => {
    if (!project.title) {
      setError("Project title is required");
      return false;
    }

    let updated = [...resumeData.projects];

    if (editIndex !== null) {
      updated[editIndex] = project;
    } else {
      updated.push(project);
    }

    setResumeData({
      ...resumeData,
      projects: updated,
    });

    setProject(emptyProject);
    setEditIndex(null);
    setError("");

    return true;
  };

  // REMOVE
  const removeProject = (i) => {
    const updated = resumeData.projects.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, projects: updated });
  };

  // EDIT
  const editProject = (i) => {
    setProject(resumeData.projects[i]);
    setEditIndex(i);
  };

  // AI
  const handleAI = () => {
    const text = generateExperienceDesc(project.title);
    setProject({ ...project, description: text });
  };

  return (
    <div className="px-4 md:px-8 py-4 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Projects</h2>

      {/* FORM */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">

        <input
          placeholder="Project Title *"
          value={project.title}
          onChange={(e) =>
            setProject({ ...project, title: e.target.value })
          }
          className="w-full border p-2.5 rounded-lg"
        />

        <input
          placeholder="Tech Stack (React, Node...)"
          value={project.tech}
          onChange={(e) =>
            setProject({ ...project, tech: e.target.value })
          }
          className="w-full border p-2.5 rounded-lg"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            placeholder="Live Link"
            value={project.live}
            onChange={(e) =>
              setProject({ ...project, live: e.target.value })
            }
            className="border p-2.5 rounded-lg"
          />

          <input
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) =>
              setProject({ ...project, github: e.target.value })
            }
            className="border p-2.5 rounded-lg"
          />
        </div>

        <textarea
          rows="3"
          placeholder="Description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          className="w-full border p-2.5 rounded-lg"
        />

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAI}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
          >
            ✨ Generate
          </button>

          <button
            onClick={addProject}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {editIndex !== null ? "Update" : "+ Add"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-3">
        {resumeData.projects.map((p, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
          >
            <div>
              <p className="font-medium">📁 {p.title}</p>
              <p className="text-xs text-gray-500">{p.tech}</p>
            </div>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => editProject(i)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => removeProject(i)}
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
              project.title || project.tech || project.description;

            let updatedList = [...resumeData.projects];

            // ✅ auto save
            if (hasCurrentData) {
              if (!project.title) {
                setError("Project title is required");
                return;
              }

              if (editIndex !== null) {
                updatedList[editIndex] = project;
              } else {
                updatedList.push(project);
              }

              setResumeData({
                ...resumeData,
                projects: updatedList,
              });

              setProject(emptyProject);
              setEditIndex(null);
              setError("");
            }

            // ✅ correct check
            if (updatedList.length === 0) {
              setError("Please add at least one project");
              return;
            }

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

export default ProjectsForm;