import React from "react";

const MinimalPortfolio = ({ data }) => {
  return (
    <div className="p-10 bg-white text-black min-h-full">
      <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>

      <p className="mt-3">{data.about || "About You"}</p>

      <h2 className="mt-6 text-xl font-semibold">Projects</h2>

      {data.projects.map((proj, i) => (
        <div key={i} className="mt-2">
          <h3 className="font-bold">{proj.title}</h3>
          <p className="text-gray-600">{proj.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default MinimalPortfolio;