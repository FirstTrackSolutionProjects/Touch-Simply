import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const MinimalTemplate = () => {
  const { resumeData } = useResume();

  const {
    personal,
    education,
    experience,
    skills,
    projects,
    languages,
        agreement,
  } = resumeData;

  return (
    <div
      id="resume"
      className="w-full max-w-[210mm] mx-auto bg-white text-gray-900 
      font-sans p-4 md:p-10 text-sm md:text-[14px] leading-relaxed"
    >

      {/* ================= HEADER ================= */}
      <div className="mb-6 border-b pb-4 text-center">

        {personal?.image && (
          <img
            src={personal.image}
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover border mb-3"
          />
        )}

        <h1 className="text-xl md:text-3xl font-bold">
          <EditField section="personal" field="name" />
        </h1>

        <p className="text-xs md:text-sm text-gray-600">
          <EditField section="personal" field="email" /> |{" "}
          <EditField section="personal" field="phone" />
        </p>

        <p className="mt-1 font-medium text-sm md:text-base">
          <EditField section="personal" field="role" />
        </p>

        <p className="text-xs text-gray-500">
          <EditField section="personal" field="experience" /> Years Experience
        </p>

        <div className="text-xs mt-2 space-y-1">
          {personal?.linkedin && (
            <p>🔗 <EditField section="personal" field="linkedin" /></p>
          )}
          {personal?.github && (
            <p>💻 <EditField section="personal" field="github" /></p>
          )}
        </div>

        {personal?.summary && (
          <p className="text-xs md:text-sm mt-3">
            <EditField section="personal" field="summary" type="textarea" />
          </p>
        )}
      </div>

      {/* ================= EXPERIENCE ================= */}
      <Section title="Experience">
        {experience?.map((e, i) => (
          <Item key={i}>
            💼 <EditField section="experience" field="role" index={i} />

            {e.company && (
              <p className="text-xs md:text-sm text-gray-500">
                <EditField section="experience" field="company" index={i} />
              </p>
            )}

            {(e.startYear || e.endYear) && (
              <p className="text-xs text-gray-500">
                <EditField section="experience" field="startYear" index={i} /> -{" "}
                {e.isCurrent ? "Present" : (
                  <EditField section="experience" field="endYear" index={i} />
                )}
              </p>
            )}

            {e.location && (
              <p className="text-xs text-gray-500">
                📍 <EditField section="experience" field="location" index={i} />
              </p>
            )}

            {e.description && (
              <p className="text-xs md:text-sm mt-1">
                <EditField
                  section="experience"
                  field="description"
                  index={i}
                  type="textarea"
                />
              </p>
            )}
          </Item>
        ))}
      </Section>

      {/* ================= PROJECTS ================= */}
      <Section title="Projects">
        {projects?.map((p, i) => (
          <Item key={i}>
            📁 <EditField section="projects" field="title" index={i} />

            {p.tech && (
              <p className="text-xs text-purple-600">
                ⚙️ <EditField section="projects" field="tech" index={i} />
              </p>
            )}

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

            {p.description && (
              <p className="text-xs md:text-sm mt-1">
                <EditField
                  section="projects"
                  field="description"
                  index={i}
                  type="textarea"
                />
              </p>
            )}
          </Item>
        ))}
      </Section>

      {/* ================= EDUCATION ================= */}
      <Section title="Education">
        {education?.map((e, i) => (
          <Item key={i}>
            🎓 <EditField section="education" field="level" index={i} />

            {e.specialization && (
              <p className="text-xs md:text-sm">
                <EditField section="education" field="specialization" index={i} />
              </p>
            )}

            {e.school && (
              <p className="text-xs md:text-sm">
                <EditField section="education" field="school" index={i} />
              </p>
            )}

            {(e.startYear || e.endYear) && (
              <p className="text-xs text-gray-500">
                <EditField section="education" field="startYear" index={i} /> -{" "}
                <EditField section="education" field="endYear" index={i} />
              </p>
            )}

            {e.cgpa && (
              <p className="text-xs text-gray-600">
                CGPA: <EditField section="education" field="cgpa" index={i} />
              </p>
            )}

            {e.location && (
              <p className="text-xs text-gray-500">
                📍 <EditField section="education" field="location" index={i} />
              </p>
            )}
          </Item>
        ))}
      </Section>

      {/* ================= SKILLS ================= */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills?.map((s, i) => (
            <span
              key={i}
              className="bg-gray-200 px-2 md:px-3 py-1 rounded text-xs md:text-sm"
            >
              {s.name}
            </span>
          ))}
        </div>
      </Section>

      {/* ================= LANGUAGES ================= */}
      <Section title="Languages">
        {languages?.map((l, i) => (
          <Item key={i}>
            🌐 {l.name} - {l.level}
          </Item>
        ))}
      </Section>

      {/* ================= AGREEMENT ================= */}
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
  );
};

/* ================= REUSABLE ================= */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="font-semibold text-base md:text-lg border-b pb-1 mb-2">
      {title}
    </h2>
    {children}
  </div>
);

const Item = ({ children }) => (
  <div className="mb-3">{children}</div>
);

export default MinimalTemplate;