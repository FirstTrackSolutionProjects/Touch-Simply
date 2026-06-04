import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const MinimalTemplate = () => {
  const { resumeData } = useResume();

  // ================= DEMO DATA =================
  const demoData = {
    personal: {
      name: "Your Name",
      role: "Your Desired Role",
      experience: "2",
      email: "yourmail@example.com",
      phone: "+91 9876543210",
      city: "Your City",
      state: "Your State",
      landmark: "Your Area",
      pincode: "000000",
      linkedin: "linkedin.com/in/username",
      github: "github.com/username",
      summary:
        "Write a short professional summary about yourself here. Showcase your skills, experience and career goals.",
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
      },
    ],

    experience: [
      {
        role: "Software Developer",
        company: "Company Name",
        startYear: "2023",
        endYear: "2024",
        isCurrent: false,
        description:
          "Describe your work experience, achievements and responsibilities here.",
      },
    ],

    skills: [
      { name: "React" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" },
      { name: "HTML/CSS" },
    ],

    projects: [
      {
        title: "Portfolio Website",
        tech: "React, Tailwind CSS",
        live: "https://yourproject.com",
        github: "https://github.com/username/project",
        description:
          "Add your project description and technologies used here.",
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
    <div className="bg-gray-200 py-3 sm:py-6 px-1 sm:px-3 overflow-x-hidden">
      <div
        id="resume"
        className="
          w-full
          max-w-[210mm]
          min-h-[297mm]
          mx-auto
          bg-white
          text-gray-800
          font-sans
          px-4
          sm:px-6
          md:px-8
          py-5
          sm:py-8
          shadow-xl
          overflow-hidden
          text-sm
          leading-relaxed
        "
      >
        {/* ================= HEADER ================= */}
        <div className="border-b border-gray-300 pb-5 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">

            {/* IMAGE */}
            {personal?.image && (
              <img
                src={personal.image}
                alt="Profile"
                crossOrigin="anonymous"
                className="
                  w-24
                  h-24
                  sm:w-28
                  sm:h-28
                  rounded-full
                  object-cover
                  border-2
                  border-gray-300
                  shrink-0
                "
              />
            )}

            {/* INFO */}
            <div className="flex-1 min-w-0 text-center sm:text-left w-full">

              {/* NAME */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight break-words">
                {resumeData?.personal?.name ? (
                  <EditField section="personal" field="name" />
                ) : (
                  personal.name
                )}
              </h1>

              {/* ROLE */}
              <p className="text-base sm:text-lg text-gray-600 font-medium mt-1 break-words">
                {resumeData?.personal?.role ? (
                  <EditField section="personal" field="role" />
                ) : (
                  personal.role
                )}
              </p>

              {/* EXPERIENCE */}
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {resumeData?.personal?.experience ? (
                  <EditField section="personal" field="experience" />
                ) : (
                  personal.experience
                )}{" "}
                Years Experience
              </p>

              {/* CONTACT */}
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-600">

                <div className="flex items-start gap-1 min-w-[220px] max-w-full">
                  <span>📧</span>

                  <span className="break-all">
                    {resumeData?.personal?.email ? (
                      <EditField section="personal" field="email" />
                    ) : (
                      personal.email
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-1 min-w-[170px]">
                  <span>📞</span>

                  <span className="break-all">
                    {resumeData?.personal?.phone ? (
                      <EditField section="personal" field="phone" />
                    ) : (
                      personal.phone
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-1 min-w-[150px]">
                  <span>📍</span>

                  <span className="break-all">
                    {resumeData?.personal?.city ? (
                      <EditField section="personal" field="city" />
                    ) : (
                      personal.city
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-1 min-w-[240px] max-w-full">
                  <span>🔗</span>

                  <span className="break-all">
                    {resumeData?.personal?.linkedin ? (
                      <EditField section="personal" field="linkedin" />
                    ) : (
                      personal.linkedin
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-1 min-w-[240px] max-w-full">
                  <span>💻</span>

                  <span className="break-all">
                    {resumeData?.personal?.github ? (
                      <EditField section="personal" field="github" />
                    ) : (
                      personal.github
                    )}
                  </span>
                </div>
              </div>

              {/* ADDRESS */}
              <p className="mt-3 text-xs sm:text-sm text-gray-500 break-words">
                {resumeData?.personal?.landmark ? (
                  <EditField section="personal" field="landmark" />
                ) : (
                  personal.landmark
                )}{" "}
                {resumeData?.personal?.state ? (
                  <EditField section="personal" field="state" />
                ) : (
                  personal.state
                )}{" "}
                {resumeData?.personal?.pincode ? (
                  <EditField section="personal" field="pincode" />
                ) : (
                  personal.pincode
                )}
              </p>

              {/* SUMMARY */}
              <p className="text-sm text-gray-700 mt-4 leading-relaxed break-words">
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
            </div>
          </div>
        </div>

        {/* ================= EXPERIENCE ================= */}
        {experience?.length > 0 && (
          <Section title="Experience">
            {experience.map((e, i) => (
              <div
                key={i}
                className="mb-5 pb-5 border-b border-gray-200 last:border-none"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

                  <div className="min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
                      {resumeData?.experience?.length > 0 ? (
                        <EditField
                          section="experience"
                          field="role"
                          index={i}
                        />
                      ) : (
                        e.role
                      )}
                    </h3>

                    <p className="text-sm text-gray-600 break-words">
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
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 shrink-0">
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
                </div>

                <p className="text-sm text-gray-700 mt-3 leading-relaxed break-words">
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
              </div>
            ))}
          </Section>
        )}

        {/* ================= PROJECTS ================= */}
        {projects?.length > 0 && (
          <Section title="Projects">
            {projects.map((p, i) => (
              <div
                key={i}
                className="mb-5 pb-5 border-b border-gray-200 last:border-none"
              >
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
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
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
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

                <div className="flex flex-col gap-2 mt-3 text-xs sm:text-sm">
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

                  <p className="text-gray-700 break-all">
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

                <p className="text-sm text-gray-700 mt-3 leading-relaxed break-words">
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
              </div>
            ))}
          </Section>
        )}

        {/* ================= EDUCATION ================= */}
        <Section title="Education">
          {education?.map((e, i) => (
            <div
              key={i}
              className="mb-5 pb-5 border-b border-gray-200 last:border-none"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

                <div className="min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
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
                  </h3>

                  <p className="text-sm text-gray-700 break-words">
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

                  <p className="text-sm text-gray-600 break-words">
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
                </div>

                <p className="text-xs sm:text-sm text-gray-500 shrink-0">
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
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-2">
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
            </div>
          ))}
        </Section>

        {/* ================= SKILLS ================= */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills?.map((s, i) => (
              <span
                key={i}
                className="
                  bg-gray-100
                  border
                  border-gray-300
                  px-3
                  py-1
                  rounded-md
                  text-xs
                  sm:text-sm
                  break-words
                "
              >
                {s.name}
              </span>
            ))}
          </div>
        </Section>

        {/* ================= LANGUAGES ================= */}
        <Section title="Languages">
          <div className="flex flex-wrap gap-2">
            {languages?.map((l, i) => (
              <span
                key={i}
                className="
                  bg-gray-100
                  border
                  border-gray-200
                  px-3
                  py-1
                  rounded-md
                  text-xs
                  sm:text-sm
                "
              >
                🌐 {l.name} - {l.level}
              </span>
            ))}
          </div>
        </Section>

        {/* ================= AGREEMENT ================= */}
        <Section title="Additional Info">
          <p className="text-sm text-gray-700 leading-relaxed break-words">
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

/* ================= SECTION ================= */

const Section = ({ title, children }) => (
  <div className="mb-7 sm:mb-8">
    <h2
      className="
        text-lg
        sm:text-xl
        font-bold
        text-gray-900
        border-b
        border-gray-300
        pb-2
        mb-4
        sm:mb-5
      "
    >
      {title}
    </h2>

    {children}
  </div>
);

export default MinimalTemplate;