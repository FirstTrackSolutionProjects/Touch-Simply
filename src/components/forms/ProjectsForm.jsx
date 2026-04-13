import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import { generateExperienceDesc } from "../../utils/aiMock";

const ProjectsForm = () => {
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

  // ✅ Save / Update
  const addProject = () => {
    if (!project.title) {
      setError("Project title is required");
      return;
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
  };

  // ✅ Remove
  const removeProject = (i) => {
    const updated = resumeData.projects.filter((_, idx) => idx !== i);
    setResumeData({ ...resumeData, projects: updated });
  };

  // ✅ Edit
  const editProject = (i) => {
    setProject(resumeData.projects[i]);
    setEditIndex(i);
  };

  // 🤖 AI Description
  const handleAI = () => {
    const text = generateExperienceDesc(project.title);
    setProject({ ...project, description: text });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      <div className="grid gap-5">

        <input
          placeholder="Project Title *"
          value={project.title}
          onChange={(e) =>
            setProject({ ...project, title: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        />

        <input
          placeholder="Tech Stack (React, Node...)"
          value={project.tech}
          onChange={(e) =>
            setProject({ ...project, tech: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Live Link"
            value={project.live}
            onChange={(e) =>
              setProject({ ...project, live: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          />

          <input
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) =>
              setProject({ ...project, github: e.target.value })
            }
            className="border px-3 py-2 rounded-lg"
          />
        </div>

        <textarea
          rows="3"
          placeholder="Description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          className="border px-3 py-2 rounded-lg"
        />

        {/* 🤖 AI */}
        <button
          onClick={handleAI}
          className="bg-purple-600 text-white py-1 rounded"
        >
          ✨ Generate Description
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={addProject}
          className="bg-blue-600 text-white py-2 rounded-lg"
        >
          {editIndex !== null ? "Update Project" : "+ Add Project"}
        </button>

      </div>

      {/* LIST */}
      <div className="mt-6 space-y-4">
        {resumeData.projects.map((p, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded-lg flex justify-between"
          >
            <div>
              <p className="font-semibold">📁 {p.title}</p>
              <p className="text-xs">{p.tech}</p>
            </div>

            <div className="flex gap-2 text-xs">
              <button onClick={() => editProject(i)}>Edit</button>
              <button onClick={() => removeProject(i)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;