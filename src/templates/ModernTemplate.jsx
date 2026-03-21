import React from "react";
import { useResume } from "../context/ResumeContext";

const ModernTemplate = () => {
  const { resumeData } = useResume();

  const { personal, education, experience, skills, projects } = resumeData;

  return (
    <div className="font-sans text-gray-800 bg-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {personal?.name || "Your Name"}
          </h1>
          <p className="text-sm text-gray-600">
            {personal?.email}
          </p>
          <p className="text-sm text-gray-600">
            {personal?.phone}
          </p>
        </div>

        {/* Right Accent */}
        <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Left Column */}
        <div>

          {/* Experience */}
          <h2 className="text-lg font-semibold mb-3 border-b pb-1">
            Experience
          </h2>

          {experience?.length > 0 ? (
            experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium">{exp.role}</p>
                <p className="text-sm text-gray-600">
                  {exp.company}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No experience added</p>
          )}

          {/* Projects */}
          <h2 className="text-lg font-semibold mt-6 mb-3 border-b pb-1">
            Projects
          </h2>

          {projects?.length > 0 ? (
            projects.map((p, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium text-blue-600">
                  {p.name}
                </p>
                <p className="text-sm text-gray-700">
                  {p.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No projects added</p>
          )}

        </div>

        {/* Right Column */}
        <div>

          {/* Education */}
          <h2 className="text-lg font-semibold mb-3 border-b pb-1">
            Education
          </h2>

          {education?.length > 0 ? (
            education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.school}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No education added</p>
          )}

          {/* Skills */}
          <h2 className="text-lg font-semibold mt-6 mb-3 border-b pb-1">
            Skills
          </h2>

          {skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No skills added</p>
          )}

        </div>
      </div>

    </div>
  );
};

export default ModernTemplate;