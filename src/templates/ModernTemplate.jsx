import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ModernTemplate = () => {
  const { resumeData } = useResume();

  const { education, experience, skills, projects } = resumeData;

  return (
    <div className="font-sans text-gray-800 bg-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            <EditField section="personal" field="name" placeholder="Your Name" />
          </h1>

          <p className="text-sm text-gray-600">
            <EditField section="personal" field="email" placeholder="Email" />
          </p>

          <p className="text-sm text-gray-600">
            <EditField section="personal" field="phone" placeholder="Phone" />
          </p>
        </div>

        {/* Accent */}
        <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div>

          {/* Experience */}
          <h2 className="text-lg font-semibold mb-3 border-b pb-1">
            Experience
          </h2>

          {experience?.length > 0 ? (
            experience.map((exp, i) => (
              <div key={i} className="mb-3">

                <p className="font-medium">
                  💼{" "}
                  <EditField
                    section="experience"
                    field="role"
                    index={i}
                    placeholder="Role"
                  />
                </p>

                <p className="text-sm text-gray-600">
                  <EditField
                    section="experience"
                    field="company"
                    index={i}
                    placeholder="Company"
                  />
                </p>

                <p className="text-xs text-gray-500">
                  {exp.startYear} - {exp.isCurrent ? "Present" : exp.endYear}
                </p>

                <p className="text-sm">
                  <EditField
                    section="experience"
                    field="description"
                    index={i}
                    type="textarea"
                    placeholder="Work Description"
                  />
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
                  📁{" "}
                  <EditField
                    section="projects"
                    field="title"   // ✅ FIXED
                    index={i}
                    placeholder="Project Title"
                  />
                </p>

                <p className="text-xs text-gray-500">
                  {p.tech}
                </p>

                <p className="text-sm text-gray-700">
                  <EditField
                    section="projects"
                    field="description"
                    index={i}
                    type="textarea"
                    placeholder="Project Description"
                  />
                </p>

              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No projects added</p>
          )}

        </div>

        {/* RIGHT */}
        <div>

          {/* Education */}
          <h2 className="text-lg font-semibold mb-3 border-b pb-1">
            Education
          </h2>

          {education?.length > 0 ? (
            education.map((edu, i) => (
              <div key={i} className="mb-3">

                <p className="font-medium">
                  🎓{" "}
                  <EditField
                    section="education"
                    field="level"   // ✅ FIXED
                    index={i}
                    placeholder="Degree"
                  />{" "}
                  <EditField
                    section="education"
                    field="specialization"
                    index={i}
                    placeholder="Specialization"
                  />
                </p>

                <p className="text-sm text-gray-600">
                  <EditField
                    section="education"
                    field="school"
                    index={i}
                    placeholder="School / College"
                  />
                </p>

                <p className="text-xs text-gray-500">
                  {edu.startYear} - {edu.endYear}
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
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                >
                  {s.name} {/* ✅ FIXED */}
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