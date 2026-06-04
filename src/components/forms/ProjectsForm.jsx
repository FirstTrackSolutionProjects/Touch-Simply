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

  // ✅ URL Validation
  const isValidUrl = (url) => {
    const pattern =
      /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

    return pattern.test(url);
  };

  // ✅ SAVE FUNCTION
  const addProject = () => {
    // Title Required
    if (!project.title.trim()) {
      setError("Project title is required");
      return false;
    }

    // ✅ Title Validation
    if (!/^[A-Za-z0-9\s&(),.-]+$/.test(project.title)) {
      setError("Enter valid project title");
      return false;
    }

    // ✅ Tech Validation
    if (
      project.tech &&
      !/^[A-Za-z0-9\s,#.+-]+$/.test(project.tech)
    ) {
      setError("Enter valid tech stack");
      return false;
    }

    // ✅ Live URL Validation
    if (
      project.live &&
      !isValidUrl(project.live)
    ) {
      setError("Enter valid live project URL");
      return false;
    }

    // ✅ GitHub URL Validation
    if (
      project.github &&
      !isValidUrl(project.github)
    ) {
      setError("Enter valid GitHub URL");
      return false;
    }

    // ✅ Description Validation
    if (
      project.description &&
      project.description.length < 10
    ) {
      setError("Description should be at least 10 characters");
      return false;
    }

    // ✅ Duplicate Check
    const exists = resumeData.projects.some(
      (p, i) =>
        p.title.toLowerCase() === project.title.toLowerCase() &&
        i !== editIndex
    );

    if (exists) {
      setError("This project already exists");
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

  // ✅ REMOVE
  const removeProject = (i) => {
    const updated = resumeData.projects.filter(
      (_, idx) => idx !== i
    );

    setResumeData({
      ...resumeData,
      projects: updated,
    });
  };

  // ✅ EDIT
  const editProject = (i) => {
    setProject(resumeData.projects[i]);
    setEditIndex(i);
  };

  // ✅ AI Description
  const handleAI = () => {
    const text = generateExperienceDesc(project.title);

    setProject({
      ...project,
      description: text,
    });
  };

  return (
    <div className="px-4 md:px-8 py-4 max-w-3xl mx-auto">

      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Projects
      </h2>

      {/* FORM */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">

        {/* TITLE */}
        <input
          placeholder="Project Title *"
          value={project.title}
          onChange={(e) =>
            setProject({
              ...project,
              title: e.target.value,
            })
          }
          className="w-full border p-2.5 rounded-lg"
        />

        {/* TECH */}
        <input
          placeholder="Tech Stack (React, Node...)"
          value={project.tech}
          onChange={(e) =>
            setProject({
              ...project,
              tech: e.target.value,
            })
          }
          className="w-full border p-2.5 rounded-lg"
        />

        {/* LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <input
            placeholder="https://live-project.com"
            value={project.live}
            onChange={(e) =>
              setProject({
                ...project,
                live: e.target.value,
              })
            }
            className="border p-2.5 rounded-lg"
          />

          <input
            placeholder="https://github.com/username/repo"
            value={project.github}
            onChange={(e) =>
              setProject({
                ...project,
                github: e.target.value,
              })
            }
            className="border p-2.5 rounded-lg"
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          rows="3"
          placeholder="Description"
          value={project.description}
          onChange={(e) =>
            setProject({
              ...project,
              description: e.target.value,
            })
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

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>

      {/* PROJECT LIST */}
      <div className="mt-6 space-y-3">
        {resumeData.projects.map((p, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
          >
            <div>
              <p className="font-medium">
                📁 {p.title}
              </p>

              <p className="text-xs text-gray-500">
                {p.tech}
              </p>
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
              project.title ||
              project.tech ||
              project.description;

            // ✅ Auto Save
            if (hasCurrentData) {
              const saved = addProject();

              if (!saved) return;
            }

            // ✅ Minimum One Project
            if (
              resumeData.projects.length === 0 &&
              !hasCurrentData
            ) {
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