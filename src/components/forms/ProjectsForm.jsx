import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const ProjectsForm = () => {
  const { resumeData, setResumeData } = useResume();

  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  const addProject = () => {
    if (!project.title) return;

    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, project],
    });

    setProject({ title: "", description: "" });
  };

  const removeProject = (index) => {
    const updated = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>

      <div className="grid gap-4">
        <input
          placeholder="Project Title"
          value={project.title}
          onChange={(e) =>
            setProject({ ...project, title: e.target.value })
          }
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Project Description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addProject}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {resumeData.projects.map((p, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded-lg flex justify-between">
            <span>📁 {p.title}</span>
            <button onClick={() => removeProject(i)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;