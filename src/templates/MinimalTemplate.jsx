import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const MinimalTemplate = () => {
  const { resumeData } = useResume();
  const { education, experience, skills, projects } = resumeData;

  return (
    <div className="bg-white text-gray-900 font-sans p-6 md:p-10">

      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          <EditField section="personal" field="name" placeholder="Your Name" />
        </h1>
        <p className="text-sm text-gray-600">
          <EditField section="personal" field="email" /> |{" "}
          <EditField section="personal" field="phone" />
        </p>
      </div>

      {/* Experience */}
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

      {/* Projects */}
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

      {/* Education */}
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

      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills?.map((s, i) => (
            <span key={i} className="bg-gray-200 px-3 py-1 rounded text-sm">
              {s.name}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-semibold text-lg mb-2 border-b pb-1">{title}</h2>
    {children}
  </div>
);

const Item = ({ children }) => (
  <div className="mb-3">{children}</div>
);

export default MinimalTemplate;