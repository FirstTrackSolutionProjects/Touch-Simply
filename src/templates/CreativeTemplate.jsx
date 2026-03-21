import React from "react";
import { useResume } from "../context/ResumeContext";

const CreativeTemplate = () => {
  const { resumeData } = useResume();

  const { personal, projects, skills, education } = resumeData;

  return (
    <div className="bg-gray-100 p-6 font-sans">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-3xl font-bold">{personal?.name || "Your Name"}</h1>
        <p className="text-sm mt-1">{personal?.email}</p>
        <p className="text-sm">{personal?.phone}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Left Sidebar */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          
          {/* Skills */}
          <h2 className="text-lg font-semibold mb-3 border-b pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills?.length > 0 ? (
              skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No skills added</p>
            )}
          </div>

          {/* Education */}
          <h2 className="text-lg font-semibold mt-6 mb-3 border-b pb-1">
            Education
          </h2>
          {education?.length > 0 ? (
            education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No education added</p>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-md">

          {/* Projects */}
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Projects
          </h2>

          {projects?.length > 0 ? (
            projects.map((p, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-lg text-indigo-600">
                  {p.name}
                </h3>
                <p className="text-gray-700 text-sm">
                  {p.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No projects added</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;