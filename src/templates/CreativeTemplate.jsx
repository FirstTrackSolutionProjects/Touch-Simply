import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const CreativeTemplate = () => {
  const { resumeData } = useResume();
  const { projects, skills, education, experience } = resumeData;

  return (
    <div className="bg-gray-100 p-6 font-sans">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl mb-6">
        <h1 className="text-3xl font-bold">
          <EditField section="personal" field="name" />
        </h1>

        <p className="text-sm">
          <EditField section="personal" field="email" />
        </p>

        <p className="text-sm">
          <EditField section="personal" field="phone" />
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="bg-white p-4 rounded-xl">

          {/* Skills */}
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills?.map((s, i) => (
              <span key={i} className="bg-purple-100 px-3 py-1 rounded">
                {s.name} ✅
              </span>
            ))}
          </div>

          {/* Education */}
          <h2 className="mt-4 font-semibold">Education</h2>
          {education?.map((e, i) => (
            <div key={i}>
              <p>
                🎓 <EditField section="education" field="level" index={i} />{" "}
                <EditField section="education" field="specialization" index={i} />
              </p>
              <p className="text-sm">
                <EditField section="education" field="school" index={i} />
              </p>
            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl">

          {/* Experience */}
          <h2 className="font-semibold mb-2">Experience</h2>
          {experience?.map((exp, i) => (
            <div key={i}>
              <p>
                💼 <EditField section="experience" field="role" index={i} />
              </p>
              <p className="text-sm">
                <EditField section="experience" field="company" index={i} />
              </p>
            </div>
          ))}

          {/* Projects */}
          <h2 className="mt-4 font-semibold">Projects</h2>
          {projects?.map((p, i) => (
            <div key={i}>
              <p>
                📁 <EditField section="projects" field="title" index={i} />
              </p>
              <p className="text-sm">
                <EditField
                  section="projects"
                  field="description"
                  index={i}
                  type="textarea"
                />
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;