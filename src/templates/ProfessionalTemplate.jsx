import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ProfessionalTemplate = () => {
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
      className="w-full max-w-[210mm] mx-auto bg-white 
      p-4 md:p-10 font-serif text-gray-900 
      text-sm md:text-[14px] leading-relaxed"
    >

      {/* ================= HEADER ================= */}
      <div className="text-center border-b pb-4 mb-6">

        {personal?.image && (
          <img
            src={personal.image}
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover border mb-3"
          />
        )}

        <h1 className="text-xl md:text-3xl font-bold tracking-wide">
          <EditField section="personal" field="name" />
        </h1>

        <p className="text-xs md:text-sm text-gray-600">
          <EditField section="personal" field="email" /> |{" "}
          <EditField section="personal" field="phone" />
        </p>

        <p className="text-sm mt-1 font-medium">
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
      </div>

      {/* ================= SUMMARY ================= */}
      {personal?.summary && (
        <Section title="Summary">
          <p className="text-xs md:text-sm">
            <EditField section="personal" field="summary" type="textarea" />
          </p>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <Section title="Experience">
        {experience?.map((e, i) => (
          <Item key={i}>
            <p className="font-semibold text-sm md:text-base">
              💼 <EditField section="experience" field="role" index={i} />
            </p>

            <p className="text-xs md:text-sm text-gray-600">
              <EditField section="experience" field="company" index={i} />
            </p>

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

      {/* ================= EDUCATION ================= */}
      <Section title="Education">
        {education?.map((e, i) => (
          <Item key={i}>
            <p className="font-semibold text-sm md:text-base">
              🎓 <EditField section="education" field="level" index={i} />
            </p>

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

      {/* ================= PROJECTS ================= */}
      <Section title="Projects">
        {projects?.map((p, i) => (
          <Item key={i}>
            <p className="font-semibold text-sm md:text-base">
              📁 <EditField section="projects" field="title" index={i} />
            </p>

            {p.tech && (
              <p className="text-xs text-gray-600">
                Tech: <EditField section="projects" field="tech" index={i} />
              </p>
            )}

            {p.description && (
              <p className="text-xs md:text-sm">
                <EditField
                  section="projects"
                  field="description"
                  index={i}
                  type="textarea"
                />
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
          </Item>
        ))}
      </Section>

      {/* ================= SKILLS ================= */}
      <Section title="Skills">
        <ul className="list-disc ml-5 text-xs md:text-sm space-y-1">
          {skills?.map((s, i) => (
            <li key={i}>{s.name}</li>
          ))}
        </ul>
      </Section>

      {/* ================= LANGUAGES ================= */}
      <Section title="Languages">
        <ul className="list-disc ml-5 text-xs md:text-sm space-y-1">
          {languages?.map((l, i) => (
            <li key={i}>
              {l.name} - {l.level}
            </li>
          ))}
        </ul>
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
    <h2 className="font-semibold text-base md:text-lg border-b pb-1 mb-2 uppercase tracking-wide">
      {title}
    </h2>
    {children}
  </div>
);

const Item = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export default ProfessionalTemplate;