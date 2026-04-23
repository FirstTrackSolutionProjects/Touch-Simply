import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const CreativeTemplate = () => {
  const { resumeData } = useResume();
  const { education, experience, skills, projects } = resumeData;

  return (
    <div className="bg-gray-100 p-4 md:p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl mb-6">
        <h1 className="text-3xl font-bold">
          <EditField section="personal" field="name" />
        </h1>
        <p className="text-sm">
          <EditField section="personal" field="email" /> |{" "}
          <EditField section="personal" field="phone" />
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Sidebar */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills?.map((s, i) => (
              <span key={i} className="bg-purple-100 px-3 py-1 rounded text-sm">
                {s.name}
              </span>
            ))}
          </div>

          <h2 className="mt-5 font-semibold">Education</h2>
          {education?.map((e, i) => (
            <div key={i} className="mt-2 text-sm">
              🎓 <EditField section="education" field="level" index={i} />
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl shadow">

          <Section title="Experience">
            {experience?.map((e, i) => (
              <Item key={i}>
                💼 <EditField section="experience" field="role" index={i} />
              </Item>
            ))}
          </Section>

          <Section title="Projects">
            {projects?.map((p, i) => (
              <Item key={i}>
                📁 <EditField section="projects" field="title" index={i} />
              </Item>
            ))}
          </Section>

        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-semibold text-lg mb-2">{title}</h2>
    {children}
  </div>
);

const Item = ({ children }) => <div className="mb-2">{children}</div>;

export default CreativeTemplate;