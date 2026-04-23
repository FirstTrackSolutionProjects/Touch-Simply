import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";

const MAX_TITLE = 50;
const MAX_DESC = 200;

const PortfolioForm = ({ data, setData }) => {
  const [removingIndex, setRemovingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Ensure at least 1 project
  useEffect(() => {
    if (!data.projects || data.projects.length === 0) {
      setData({
        ...data,
        projects: [
          { title: "", desc: "", github: "", image: "" },
        ],
      });
    }
  }, [data.projects]);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...data.projects];
    updated[index][field] = value;
    setData({ ...data, projects: updated });

    validateField(index, field, value);
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleProjectChange(index, "image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 VALIDATION
  const validateField = (index, field, value) => {
    let newErrors = { ...errors };
    if (!newErrors[index]) newErrors[index] = {};

    // TITLE
    if (field === "title") {
      if (!value.trim()) {
        newErrors[index].title = "Title is required";
      } else {
        delete newErrors[index]?.title;
      }
    }

    // GITHUB (STRICT VALIDATION)
    if (field === "github") {
      const githubRegex =
        /^https:\/\/github\.com\/[A-Za-z0-9-]+(\/[A-Za-z0-9._-]+)?\/?$/;

      if (value && !githubRegex.test(value)) {
        newErrors[index].github = "Enter valid GitHub URL";
      } else {
        delete newErrors[index]?.github;
      }
    }

    setErrors(newErrors);
  };

  // ADD PROJECT (with validation check)
  const addProject = () => {
    const hasErrors = Object.values(errors).some(
      (err) => Object.keys(err).length > 0
    );

    if (hasErrors) {
      alert("Fix errors before adding new project");
      return;
    }

    setData({
      ...data,
      projects: [
        ...data.projects,
        { title: "", desc: "", github: "", image: "" },
      ],
    });
  };

  const removeProject = (index) => {
    if (data.projects.length === 1) return;

    if (window.confirm("Delete project?")) {
      setRemovingIndex(index);

      setTimeout(() => {
        const updated = data.projects.filter((_, i) => i !== index);
        setData({ ...data, projects: updated });
        setRemovingIndex(null);
      }, 300);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Details</h2>

      {/* BASIC INFO */}
      <input
        placeholder="Your Name"
        className="w-full border px-3 py-2 rounded"
        value={data.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <textarea
        placeholder="About You"
        className="w-full border px-3 py-2 rounded"
        value={data.about}
        onChange={(e) => handleChange("about", e.target.value)}
      />

      {/* PROJECTS */}
      {data.projects.map((proj, i) => (
        <div
          key={i}
          className={`border p-4 rounded-xl space-y-3 relative transition ${
            removingIndex === i ? "opacity-0 scale-95" : ""
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Project {i + 1}</h4>

            {i !== 0 && (
              <button
                onClick={() => removeProject(i)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* TITLE */}
          <div>
            <input
              placeholder="Project Title"
              maxLength={MAX_TITLE}
              className="w-full border px-2 py-1 rounded"
              value={proj.title}
              onChange={(e) =>
                handleProjectChange(i, "title", e.target.value)
              }
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span className="text-red-500">
                {errors[i]?.title}
              </span>
              <span>
                {proj.title.length}/{MAX_TITLE}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <textarea
              placeholder="Description"
              maxLength={MAX_DESC}
              className="w-full border px-2 py-1 rounded"
              value={proj.desc}
              onChange={(e) =>
                handleProjectChange(i, "desc", e.target.value)
              }
            />
            <div className="text-xs text-gray-400 text-right">
              {proj.desc.length}/{MAX_DESC}
            </div>
          </div>

          {/* GITHUB */}
          <div>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              className="w-full border px-2 py-1 rounded"
              value={proj.github}
              onChange={(e) =>
                handleProjectChange(i, "github", e.target.value)
              }
            />
            {errors[i]?.github && (
              <p className="text-xs text-red-500 mt-1">
                {errors[i].github}
              </p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label className="cursor-pointer">
              <div className="w-24 h-24 border-dashed border-2 flex items-center justify-center rounded overflow-hidden hover:border-purple-500 transition">
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 text-center px-2">
                    Upload Image
                  </span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleImageUpload(i, e.target.files[0])
                }
              />
            </label>
          </div>
        </div>
      ))}

      {/* ADD BUTTON */}
      <button
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded hover:scale-[1.02] transition"
      >
        <Plus size={18} />
        Add Project
      </button>
    </div>
  );
};

export default PortfolioForm;