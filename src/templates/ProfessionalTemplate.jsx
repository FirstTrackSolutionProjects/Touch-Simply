import React from "react";
import { useResume } from "../context/ResumeContext";

const ProfessionalTemplate = () => {
  const { resumeData } = useResume();

  const { personal, education, experience, skills, projects } = resumeData;

  return (
    <div className="bg-white text-gray-900 font-serif p-10">

      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-wide">
          {personal?.name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {personal?.email} | {personal?.phone}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3 uppercase">
          Professional Experience
        </h2>

        {experience?.length > 0 ? (
          experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{exp.role}</p>
              <p className="text-sm text-gray-700">
                {exp.company}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No experience added</p>
        )}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3 uppercase">
          Education
        </h2>

        {education?.length > 0 ? (
          education.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-700">
                {edu.school}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No education added</p>
        )}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3 uppercase">
          Projects
        </h2>

        {projects?.length > 0 ? (
          projects.map((p, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-700">
                {p.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No projects added</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-1 mb-3 uppercase">
          Skills
        </h2>

        {skills?.length > 0 ? (
          <ul className="list-disc list-inside text-sm">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No skills added</p>
        )}
      </div>

    </div>
  );
};

export default ProfessionalTemplate;