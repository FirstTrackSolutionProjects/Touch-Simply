import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { education, experience, skills, projects } = resumeData;

  return (
    <div className="bg-white p-6 md:p-10 font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            <EditField section="personal" field="name" />
          </h1>
          <p className="text-gray-600 text-sm">
            <EditField section="personal" field="email" /> |{" "}
            <EditField section="personal" field="phone" />
          </p>
        </div>

        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div>
          <Section title="Experience">
            {experience?.map((e, i) => (
              <Item key={i}>
                💼 <EditField section="experience" field="role" index={i} />
                <p className="text-sm text-gray-500">
                  <EditField section="experience" field="company" index={i} />
                </p>
              </Item>
            ))}
          </Section>

          <Section title="Projects">
            {projects?.map((p, i) => (
              <Item key={i}>
                📁 <EditField section="projects" field="title" index={i} />
                <p className="text-sm">
                  <EditField section="projects" field="description" index={i} type="textarea" />
                </p>
              </Item>
            ))}
          </Section>
        </div>

        {/* RIGHT */}
        <div>
          <Section title="Education">
            {education?.map((e, i) => (
              <Item key={i}>
                🎓 <EditField section="education" field="level" index={i} />
                <p className="text-sm">
                  <EditField section="education" field="school" index={i} />
                </p>
              </Item>
            ))}
          </Section>

          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {skills?.map((s, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {s.name}
                </span>
              ))}
            </div>
          </Section>
        </div>

      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-semibold text-lg border-b pb-1 mb-2">{title}</h2>
    {children}
  </div>
);

const Item = ({ children }) => <div className="mb-3">{children}</div>;

export default ModernTemplate;