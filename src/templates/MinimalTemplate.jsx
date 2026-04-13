import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const MinimalTemplate = () => {
  const { resumeData } = useResume();

  const { education, skills, experience, projects, languages } = resumeData;

  return (
    <div className="bg-white text-gray-900 font-sans p-8 space-y-6">

      {/* HEADER */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">
          <EditField section="personal" field="name" placeholder="Your Name" />
        </h1>

        <p className="text-sm text-gray-600">
          <EditField section="personal" field="email" placeholder="Email" /> |{" "}
          <EditField section="personal" field="phone" placeholder="Phone" />
        </p>
      </div>

      {/* SUMMARY */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase">Summary</h2>
        <EditField
          section="personal"
          field="summary"
          type="textarea"
          placeholder="Write a professional summary..."
          className="text-sm text-gray-700"
        />
      </div>

      {/* EDUCATION */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase">Education</h2>

        {education?.length > 0 ? (
          education.map((e, i) => (
            <div key={i} className="mb-2">

              <p className="font-medium">
                🎓{" "}
                <EditField
                  section="education"
                  field="level"   // ✅ FIXED
                  index={i}
                  placeholder="Degree"
                />
                {" "}
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
                  placeholder="School"
                />{" "}
                ({e.startYear} - {e.endYear})
              </p>

            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No education added</p>
        )}
      </div>

      {/* EXPERIENCE */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase">Experience</h2>

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
                />{" "}
                -{" "}
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

              <p className="text-sm text-gray-700">
                <EditField
                  section="experience"
                  field="description"
                  index={i}
                  type="textarea"
                  placeholder="Description"
                />
              </p>

            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No experience added</p>
        )}
      </div>

      {/* PROJECTS */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase">Projects</h2>

        {projects?.length > 0 ? (
          projects.map((p, i) => (
            <div key={i} className="mb-3">

              <p className="font-medium">
                📁{" "}
                <EditField
                  section="projects"
                  field="title"
                  index={i}
                  placeholder="Project Title"
                />
              </p>

              <p className="text-xs text-gray-500">{p.tech}</p>

              <p className="text-sm">
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

      {/* SKILLS */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase">Skills</h2>

        {skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={i}
                className="text-sm border px-3 py-1 rounded-md"
              >
                {s.name} {/* ✅ FIXED structure */}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No skills added</p>
        )}
      </div>

      {/* LANGUAGES */}
      <div>
        <h2 className="text-lg font-semibold mb-2 uppercase">Languages</h2>

        {languages?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {languages.map((l, i) => (
              <span key={i} className="text-sm border px-3 py-1 rounded">
                {l.name} ({l.level})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No languages added</p>
        )}
      </div>

    </div>
  );
};

export default MinimalTemplate;