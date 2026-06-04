import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ProfessionalTemplate = () => {
  const { resumeData } = useResume();

  // ================= DEMO DATA =================
  const demoData = {
    personal: {
      name: "Your Name",
      role: "Software Developer",
      experience: "2",
      email: "yourmail@example.com",
      phone: "+91 9876543210",
      linkedin: "linkedin.com/in/username",
      github: "github.com/username",
      summary:
        "Write a short professional summary about yourself here. Mention your skills, experience, and career goals.",
      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    education: [
      {
        level: "Bachelor Degree",
        specialization: "Computer Science",
        school: "Your College Name",
        startYear: "2020",
        endYear: "2024",
        cgpa: "8.5",
        location: "Your City",
      },
    ],

    experience: [
      {
        role: "Frontend Intern",
        company: "Company Name",
        startYear: "2023",
        endYear: "2024",
        isCurrent: false,
        location: "Bhubaneswar",
        description:
          "Describe your work experience, achievements, and responsibilities here.",
      },
    ],

    skills: [
      { name: "React" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
    ],

    projects: [
      {
        title: "Portfolio Website",
        tech: "React, Tailwind CSS",
        live: "https://yourproject.com",
        github: "https://github.com/username/project",
        description:
          "Add your project description and technologies used.",
      },
    ],

    languages: [
      {
        name: "English",
        level: "Fluent",
      },
      {
        name: "Hindi",
        level: "Intermediate",
      },
    ],

    agreement: {
      signature:
        "I hereby declare that the information provided is true and correct.",
    },
  };

  // ================= REAL DATA OR DEMO =================
  const personal =
    resumeData?.personal?.name
      ? resumeData.personal
      : demoData.personal;

  const education =
    resumeData?.education?.length > 0
      ? resumeData.education
      : demoData.education;

  const experience =
    resumeData?.experience?.length > 0
      ? resumeData.experience
      : demoData.experience;

  const skills =
    resumeData?.skills?.length > 0
      ? resumeData.skills
      : demoData.skills;

  const projects =
    resumeData?.projects?.length > 0
      ? resumeData.projects
      : demoData.projects;

  const languages =
    resumeData?.languages?.length > 0
      ? resumeData.languages
      : demoData.languages;

  const agreement =
    resumeData?.agreement?.signature
      ? resumeData.agreement
      : demoData.agreement;

  return (
    <div className="bg-gray-200 py-4 md:py-8 px-2 overflow-x-auto">

      <div
        id="resume"
        className="
          w-full
          max-w-[210mm]
          min-h-[297mm]
          mx-auto
          bg-white
          p-4 md:p-10
          font-serif
          text-gray-900
          text-sm
          md:text-[14px]
          leading-relaxed
          shadow-xl
        "
      >

        {/* ================= HEADER ================= */}
        <div className="text-center border-b pb-4 mb-6">

          {personal?.image && (
            <img
              src={personal.image}
              alt="Profile"
              crossOrigin="anonymous"
              className="
                w-20
                h-20
                md:w-24
                md:h-24
                mx-auto
                rounded-full
                object-cover
                border
                mb-3
              "
            />
          )}

          <h1 className="text-xl md:text-3xl font-bold tracking-wide">
            {resumeData?.personal?.name ? (
              <EditField section="personal" field="name" />
            ) : (
              personal.name
            )}
          </h1>

          <p className="text-xs md:text-sm text-gray-600">
            {resumeData?.personal?.email ? (
              <EditField section="personal" field="email" />
            ) : (
              personal.email
            )}{" "}
            |{" "}
            {resumeData?.personal?.phone ? (
              <EditField section="personal" field="phone" />
            ) : (
              personal.phone
            )}
          </p>

          <p className="text-sm mt-1 font-medium">
            {resumeData?.personal?.role ? (
              <EditField section="personal" field="role" />
            ) : (
              personal.role
            )}
          </p>

          <p className="text-xs text-gray-500">
            {resumeData?.personal?.experience ? (
              <EditField section="personal" field="experience" />
            ) : (
              personal.experience
            )}{" "}
            Years Experience
          </p>

          <div className="text-xs mt-2 space-y-1">
            <p>
              🔗{" "}
              {resumeData?.personal?.linkedin ? (
                <EditField section="personal" field="linkedin" />
              ) : (
                personal.linkedin
              )}
            </p>

            <p>
              💻{" "}
              {resumeData?.personal?.github ? (
                <EditField section="personal" field="github" />
              ) : (
                personal.github
              )}
            </p>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <Section title="Summary">
          <p className="text-xs md:text-sm">
            {resumeData?.personal?.summary ? (
              <EditField
                section="personal"
                field="summary"
                type="textarea"
              />
            ) : (
              personal.summary
            )}
          </p>
        </Section>

        {/* ================= EXPERIENCE ================= */}
        <Section title="Experience">
          {experience?.map((e, i) => (
            <Item key={i}>

              <p className="font-semibold text-sm md:text-base">
                💼{" "}
                {resumeData?.experience?.length > 0 ? (
                  <EditField
                    section="experience"
                    field="role"
                    index={i}
                  />
                ) : (
                  e.role
                )}
              </p>

              <p className="text-xs md:text-sm text-gray-600">
                {resumeData?.experience?.length > 0 ? (
                  <EditField
                    section="experience"
                    field="company"
                    index={i}
                  />
                ) : (
                  e.company
                )}
              </p>

              <p className="text-xs text-gray-500">
                {resumeData?.experience?.length > 0 ? (
                  <>
                    <EditField
                      section="experience"
                      field="startYear"
                      index={i}
                    />{" "}
                    -{" "}
                    <EditField
                      section="experience"
                      field="endYear"
                      index={i}
                    />
                  </>
                ) : (
                  `${e.startYear} - ${e.endYear}`
                )}
              </p>

              {e.location && (
                <p className="text-xs text-gray-500">
                  📍 {e.location}
                </p>
              )}

              <p className="text-xs md:text-sm mt-1">
                {resumeData?.experience?.length > 0 ? (
                  <EditField
                    section="experience"
                    field="description"
                    index={i}
                    type="textarea"
                  />
                ) : (
                  e.description
                )}
              </p>

            </Item>
          ))}
        </Section>

        {/* ================= EDUCATION ================= */}
        <Section title="Education">
          {education?.map((e, i) => (
            <Item key={i}>

              <p className="font-semibold text-sm md:text-base">
                🎓{" "}
                {resumeData?.education?.length > 0 ? (
                  <EditField
                    section="education"
                    field="level"
                    index={i}
                  />
                ) : (
                  e.level
                )}
              </p>

              <p className="text-xs md:text-sm">
                {resumeData?.education?.length > 0 ? (
                  <EditField
                    section="education"
                    field="specialization"
                    index={i}
                  />
                ) : (
                  e.specialization
                )}
              </p>

              <p className="text-xs md:text-sm">
                {resumeData?.education?.length > 0 ? (
                  <EditField
                    section="education"
                    field="school"
                    index={i}
                  />
                ) : (
                  e.school
                )}
              </p>

              <p className="text-xs text-gray-500">
                {resumeData?.education?.length > 0 ? (
                  <>
                    <EditField
                      section="education"
                      field="startYear"
                      index={i}
                    />{" "}
                    -{" "}
                    <EditField
                      section="education"
                      field="endYear"
                      index={i}
                    />
                  </>
                ) : (
                  `${e.startYear} - ${e.endYear}`
                )}
              </p>

              <p className="text-xs text-gray-600">
                CGPA:{" "}
                {resumeData?.education?.length > 0 ? (
                  <EditField
                    section="education"
                    field="cgpa"
                    index={i}
                  />
                ) : (
                  e.cgpa
                )}
              </p>

              {e.location && (
                <p className="text-xs text-gray-500">
                  📍 {e.location}
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
                📁{" "}
                {resumeData?.projects?.length > 0 ? (
                  <EditField
                    section="projects"
                    field="title"
                    index={i}
                  />
                ) : (
                  p.title
                )}
              </p>

              <p className="text-xs text-gray-600">
                ⚙️{" "}
                {resumeData?.projects?.length > 0 ? (
                  <EditField
                    section="projects"
                    field="tech"
                    index={i}
                  />
                ) : (
                  p.tech
                )}
              </p>

              <p className="text-xs md:text-sm mt-1">
                {resumeData?.projects?.length > 0 ? (
                  <EditField
                    section="projects"
                    field="description"
                    index={i}
                    type="textarea"
                  />
                ) : (
                  p.description
                )}
              </p>

              <div className="text-xs mt-1 space-y-1">

                <p className="text-blue-600 break-all">
                  🔗{" "}
                  {resumeData?.projects?.length > 0 ? (
                    <EditField
                      section="projects"
                      field="live"
                      index={i}
                    />
                  ) : (
                    p.live
                  )}
                </p>

                <p className="text-gray-600 break-all">
                  💻{" "}
                  {resumeData?.projects?.length > 0 ? (
                    <EditField
                      section="projects"
                      field="github"
                      index={i}
                    />
                  ) : (
                    p.github
                  )}
                </p>

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
          <p className="text-xs md:text-sm">
            {resumeData?.agreement?.signature ? (
              <EditField
                section="agreement"
                field="signature"
                type="textarea"
              />
            ) : (
              agreement.signature
            )}
          </p>
        </Section>

      </div>
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