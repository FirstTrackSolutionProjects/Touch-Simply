import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { personal, education, experience, skills, projects, languages, agreement } =
    resumeData;

  return (
    <div
      id="resume"
      className="w-full max-w-[210mm] mx-auto bg-white text-gray-900 
      p-4 md:p-[20mm] text-sm md:text-[14px] leading-relaxed"
    >
      {/* HEADER */}
      <div className="border-b pb-3 mb-4">

        {personal?.image && (
          <img
            src={personal.image}
            alt="Profile"
            crossOrigin="anonymous"
            className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover border mb-3"
          />
        )}

        <h1 className="text-xl md:text-2xl font-bold">
          <EditField section="personal" field="name" />
        </h1>

        <p className="text-xs md:text-sm">
          <EditField section="personal" field="email" /> |{" "}
          <EditField section="personal" field="phone" />
        </p>

        <p className="text-xs md:text-sm">
          <EditField section="personal" field="dob" /> |{" "}
          <EditField section="personal" field="landmark" /> |{" "}
          <EditField section="personal" field="city" /> |{" "}
          <EditField section="personal" field="state" /> |{" "}
          <EditField section="personal" field="pincode" />
        </p>

        <p className="text-blue-600 text-sm">
          <EditField section="personal" field="role" />
        </p>

        <p className="text-xs md:text-sm">
          <EditField section="personal" field="linkedin" /> |{" "}
          <EditField section="personal" field="github" />
        </p>
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1">
          <Section title="Experience">
            {experience?.map((e, i) => (
              <Item key={i}>
                <strong>
                  <EditField section="experience" field="role" index={i} />
                </strong>
                <p>
                  <EditField section="experience" field="company" index={i} />
                </p>
                <small>
                  <EditField section="experience" field="startYear" index={i} /> -{" "}
                  <EditField section="experience" field="endYear" index={i} />
                </small>
                <p>
                  <EditField
                    section="experience"
                    field="description"
                    index={i}
                    type="textarea"
                  />
                </p>
              </Item>
            ))}
          </Section>

          <Section title="Projects">
            {projects?.map((p, i) => (
              <Item key={i}>
                <strong>
                  <EditField section="projects" field="title" index={i} />
                </strong>
                <p>
                  <EditField section="projects" field="tech" index={i} />
                </p>
                 <div className="text-xs mt-1 space-y-1">
              {p.live && (
                <p className="text-blue-600">
                  🔗 <EditField section="projects" field="live" index={i} />
                </p>
              )}
              {p.github && (
                <p className="text-gray-600">
                  💻 <EditField section="projects" field="github" index={i} />
                </p>
              )}
            </div>
                <p>
                  <EditField
                    section="projects"
                    field="description"
                    index={i}
                    type="textarea"
                  />
                </p>
              </Item>
            ))}
          </Section>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[35%]">
          <Section title="Education">
            {education?.map((e, i) => (
              <Item key={i}>
                <strong>
                  <EditField section="education" field="level" index={i} />
                </strong>
                <p>
                  <EditField section="education" field="school" index={i} />
                </p>
                <small>
                  <EditField section="education" field="startYear" index={i} /> -{" "}
                  <EditField section="education" field="endYear" index={i} />
                </small>
              </Item>
            ))}
          </Section>

          <Section title="Skills">
            {skills?.map((s, i) => (
              <p key={i}>• {s.name}</p>
            ))}
          </Section>

          <Section title="Languages">
            {languages?.map((l, i) => (
              <p key={i}>
                {l.name} - {l.level}
              </p>
            ))}
          </Section>

          <Section title="Additional Info">
            {agreement && (
              <p>
                <EditField
                  section="agreement"
                  field="signature"
                  type="textarea"
                />
              </p>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

/* HELPERS */

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="border-b font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

const Item = ({ children }) => (
  <div className="mb-3 text-xs md:text-sm">
    {children}
  </div>
);

export default ModernTemplate;