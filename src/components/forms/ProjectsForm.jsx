import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const ProjectsForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [project, setProject] = useState({
    title: "",
    description: "",
    tech: "",
    live: "",
    github: "",
  });

  const [error, setError] = useState("");

  const addProject = () => {
    if (!project.title) {
      setError("Project title is required");
      return;
    }

    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, project],
    });

    setProject({
      title: "",
      description: "",
      tech: "",
      live: "",
      github: "",
    });

    setError("");
  };

  const removeProject = (index) => {
    const updated = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      {/* Form */}
      <div className="grid gap-5">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Project Title *
          </label>
          <input
            placeholder="e.g. Resume Builder App"
            value={project.title}
            onChange={(e) =>
              setProject({ ...project, title: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Tech */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Tech Stack
          </label>
          <input
            placeholder="React, Node, MongoDB"
            value={project.tech}
            onChange={(e) =>
              setProject({ ...project, tech: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Live Link"
            value={project.live}
            onChange={(e) =>
              setProject({ ...project, live: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) =>
              setProject({ ...project, github: e.target.value })
            }
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <textarea
          rows="3"
          placeholder="• Built responsive UI\n• Integrated APIs"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={addProject}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Project
        </button>

      </div>

      {/* Preview */}
      <div className="mt-6 space-y-4">
        {resumeData.projects.map((p, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded-lg text-sm flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">📁 {p.title}</p>

              {p.tech && (
                <p className="text-xs text-gray-500 mt-1">
                  Tech: {p.tech}
                </p>
              )}

              {p.description && (
                <p className="text-xs mt-2 whitespace-pre-line text-gray-600">
                  {p.description}
                </p>
              )}

              <div className="text-xs mt-2 flex gap-3">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    className="underline"
                  >
                    Live
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    className="underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => removeProject(i)}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;