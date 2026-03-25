import React from "react";

const PortfolioForm = ({ data, setData }) => {
  const handleProjectChange = (index, field, value) => {
    const updated = [...data.projects];
    updated[index][field] = value;
    setData({ ...data, projects: updated });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: "", desc: "" }],
    });
  };

return (
    <div className="space-y-5">
        <h2 className="text-xl font-bold text-gray-800">Portfolio Details</h2>

        <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <textarea
            placeholder="About You"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
        />

        <h3 className="font-semibold text-gray-700">Projects</h3>

        {data.projects.map((proj, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
            <input
                placeholder="Project Title"
                className="w-full border border-gray-300 rounded px-3 py-1"
                value={proj.title}
                onChange={(e) =>
                handleProjectChange(i, "title", e.target.value)
                }
            />

            <input
                placeholder="Description"
                className="w-full border border-gray-300 rounded px-3 py-1"
                value={proj.desc}
                onChange={(e) =>
                handleProjectChange(i, "desc", e.target.value)
                }
            />
            </div>
        ))}

        <button
            onClick={addProject}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
        >
            + Add Project
        </button>
        </div>
    );
};

export default PortfolioForm;