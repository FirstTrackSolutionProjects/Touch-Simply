import React from "react";

const ModernPortfolio = ({ data }) => {
  return (
    <div className="p-10 bg-gray-900 text-white min-h-full">
      <h1 className="text-4xl font-bold">{data.name || "Your Name"}</h1>

      <p className="mt-4 text-gray-300">{data.about || "Your Portfolio Description"}</p>

      <h2 className="mt-8 text-2xl">Projects</h2>

      {data.projects.map((proj, i) => (
        <div key={i} className="mt-4 p-4 bg-gray-800 rounded">
          <h3 className="text-xl font-semibold">{proj.title}</h3>
          <p className="text-gray-400">{proj.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ModernPortfolio;