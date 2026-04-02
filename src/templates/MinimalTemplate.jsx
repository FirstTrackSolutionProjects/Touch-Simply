import React from "react";
import { useResume } from "../context/ResumeContext";

const MinimalTemplate = () => {
  const { resumeData } = useResume();

  const { personal, education, skills, experience } = resumeData;

  return (
    <div className="bg-white text-gray-900 font-sans p-8">

      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">
          {personal?.name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600">
          {personal?.email} | {personal?.phone}
        </p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 uppercase tracking-wide">
          Education
        </h2>

        {education?.length > 0 ? (
          education.map((e, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{e.degree}</p>
              <p className="text-sm text-gray-600">
                {e.school}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No education added</p>
        )}
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 uppercase tracking-wide">
          Experience
        </h2>

        {experience?.length > 0 ? (
          experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{exp.role}</p>
              <p className="text-sm text-gray-600">
                {exp.company}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No experience added</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase tracking-wide">
          Skills
        </h2>

        {skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="text-sm border px-3 py-1 rounded-md"
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
  );
};

export default MinimalTemplate;

