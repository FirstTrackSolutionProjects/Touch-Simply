import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ProfessionalTemplate = () => {
  const { resumeData } = useResume();
  const { education, experience, skills, projects } = resumeData;

  return (
    <div className="bg-white p-6 md:p-10 font-serif text-gray-900">

      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">
          <EditField section="personal" field="name" />
        </h1>
        <p className="text-sm text-gray-600">
          <EditField section="personal" field="email" /> |{" "}
          <EditField section="personal" field="phone" />
        </p>
      </div>

      <Section title="Experience">
        {experience?.map((e, i) => (
          <Item key={i}>
            💼 <EditField section="experience" field="role" index={i} />
          </Item>
        ))}
      </Section>

      <Section title="Education">
        {education?.map((e, i) => (
          <Item key={i}>
            🎓 <EditField section="education" field="level" index={i} />
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

      <Section title="Skills">
        <ul className="list-disc ml-5">
          {skills?.map((s, i) => (
            <li key={i}>{s.name}</li>
          ))}
        </ul>
      </Section>

    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-semibold text-lg border-b pb-1 mb-2 uppercase">
      {title}
    </h2>
    {children}
  </div>
);

const Item = ({ children }) => <div className="mb-2">{children}</div>;

export default ProfessionalTemplate;