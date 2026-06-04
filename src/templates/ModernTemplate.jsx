import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const ModernTemplate = () => {
  const { resumeData } = useResume();

  // ================= DEMO DATA =================
  const demoData = {
    personal: {
      name: "Your Name",
      role: "Your Desired Role",
      experience: "2",
      email: "yourmail@example.com",
      phone: "+91 9876543210",
      dob: "01 Jan 2000",
      landmark: "Your Area",
      city: "Your City",
      state: "Your State",
      pincode: "000000",
      linkedin: "linkedin.com/in/username",
      github: "github.com/username",
      summary:
        "Write a short professional summary about yourself here.",
      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    education: [
      {
        level: "Bachelor Degree",
        school: "Your College Name",
        startYear: "2020",
        endYear: "2024",
      },
    ],

    experience: [
      {
        role: "Frontend Intern",
        company: "Company Name",
        startYear: "2023",
        endYear: "2024",
        isCurrent: false,
        description:
          "Describe your work experience, achievements, and responsibilities.",
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
        "I hereby declare that the information provided is true.",
    },
  };

  // ================= REAL DATA OR DEMO DATA =================

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
    <div className="bg-gray-100 py-4 px-2">
      <div
        id="resume"
        className="
          w-full
          max-w-[210mm]
          min-h-[297mm]
          mx-auto
          bg-white
          text-gray-800
          shadow-xl
          overflow-hidden
          font-sans
        "
      >
        {/* ================= HEADER ================= */}
        <div className="bg-slate-900 text-white px-5 md:px-10 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* IMAGE */}
            <img
              src={personal.image}
              alt="Profile"
              crossOrigin="anonymous"
              className="
                w-24
                h-24
                md:w-32
                md:h-32
                rounded-2xl
                object-cover
                border-4
                border-white/20
                shadow-lg
              "
            />

            {/* INFO */}
            <div className="flex-1 text-center md:text-left">

              <h1 className="text-3xl md:text-4xl font-bold break-words">
                {resumeData?.personal?.name ? (
                  <EditField
                    section="personal"
                    field="name"
                  />
                ) : (
                  personal.name
                )}
              </h1>

              <p className="text-slate-300 text-sm md:text-lg mt-2 font-medium">
                {resumeData?.personal?.role ? (
                  <EditField
                    section="personal"
                    field="role"
                  />
                ) : (
                  personal.role
                )}
              </p>

              <p className="text-xs md:text-sm text-slate-400 mt-1">
                {resumeData?.personal?.experience ? (
                  <EditField
                    section="personal"
                    field="experience"
                  />
                ) : (
                  personal.experience
                )}{" "}
                Years Experience
              </p>

              {/* CONTACT */}
              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  justify-center
                  md:justify-start
                  gap-x-4
                  gap-y-2
                  text-xs
                  md:text-sm
                  text-slate-200
                "
              >
                <span className="break-all">
                  📧{" "}
                  {resumeData?.personal?.email ? (
                    <EditField
                      section="personal"
                      field="email"
                    />
                  ) : (
                    personal.email
                  )}
                </span>

                <span>
                  📞{" "}
                  {resumeData?.personal?.phone ? (
                    <EditField
                      section="personal"
                      field="phone"
                    />
                  ) : (
                    personal.phone
                  )}
                </span>

                <span>
                  🎂{" "}
                  {resumeData?.personal?.dob ? (
                    <EditField
                      section="personal"
                      field="dob"
                    />
                  ) : (
                    personal.dob
                  )}
                </span>
              </div>

              {/* ADDRESS */}
              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  justify-center
                  md:justify-start
                  gap-2
                  text-xs
                  md:text-sm
                  text-slate-300
                "
              >
                <span>
                  {resumeData?.personal?.city ? (
                    <EditField
                      section="personal"
                      field="city"
                    />
                  ) : (
                    personal.city
                  )}
                </span>

                <span>
                  {resumeData?.personal?.state ? (
                    <EditField
                      section="personal"
                      field="state"
                    />
                  ) : (
                    personal.state
                  )}
                </span>
              </div>

              {/* LINKS */}
              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  justify-center
                  md:justify-start
                  gap-4
                  text-xs
                  md:text-sm
                "
              >
                <span className="text-cyan-300 break-all">
                  🔗{" "}
                  {resumeData?.personal?.linkedin ? (
                    <EditField
                      section="personal"
                      field="linkedin"
                    />
                  ) : (
                    personal.linkedin
                  )}
                </span>

                <span className="text-slate-200 break-all">
                  💻{" "}
                  {resumeData?.personal?.github ? (
                    <EditField
                      section="personal"
                      field="github"
                    />
                  ) : (
                    personal.github
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">

          {/* ================= SIDEBAR ================= */}
          <div className="bg-slate-50 border-r border-slate-200 p-5 md:p-6">

            {/* PROFILE */}
            <SidebarSection title="Profile">
              <p className="text-sm text-gray-700 leading-relaxed">
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
            </SidebarSection>

            {/* SKILLS */}
            <SidebarSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills?.map((s, i) => (
                  <span
                    key={i}
                    className="
                      bg-white
                      border
                      border-slate-200
                      px-3
                      py-1
                      rounded-lg
                      text-xs
                    "
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </SidebarSection>

            {/* LANGUAGES */}
            <SidebarSection title="Languages">
              <div className="space-y-2">
                {languages?.map((l, i) => (
                  <div
                    key={i}
                    className="
                      bg-white
                      border
                      border-slate-200
                      rounded-lg
                      px-3
                      py-2
                      text-xs
                    "
                  >
                    🌐 {l.name} - {l.level}
                  </div>
                ))}
              </div>
            </SidebarSection>

            {/* EDUCATION */}
            <SidebarSection title="Education">
              <div className="space-y-4">
                {education?.map((e, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-slate-300 pl-3"
                  >
                    <h3 className="font-semibold text-sm">
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

                    <p className="text-sm text-gray-600 mt-1">
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

                    <p className="text-xs text-gray-500 mt-1">
                      {resumeData?.education?.length > 0 ? (
                        <>
                          <EditField
                            section="education"
                            field="startYear"
                            index={i}
                          />{" "}
                          -
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
                ))}
              </div>
            </SidebarSection>
          </div>

          {/* ================= MAIN ================= */}
          <div className="p-5 md:p-8">

            {/* EXPERIENCE */}
            <MainSection title="Experience">
              <div className="space-y-6">
                {experience?.map((e, i) => (
                  <ModernCard key={i}>
                    <div className="flex flex-col md:flex-row md:justify-between gap-2">

                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
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

                        <p className="text-sm text-slate-600 mt-1">
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

                      <p
                        className="
                          text-xs
                          text-slate-500
                          bg-slate-100
                          h-fit
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        {resumeData?.experience?.length > 0 ? (
                          <>
                            <EditField
                              section="experience"
                              field="startYear"
                              index={i}
                            />{" "}
                            -
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

                    <p className="text-sm text-gray-700 mt-4 leading-relaxed">
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
                  </ModernCard>
                ))}
              </div>
            </MainSection>

            {/* PROJECTS */}
            <MainSection title="Projects">
              <div className="space-y-6">
                {projects?.map((p, i) => (
                  <ModernCard key={i}>
                    <h3 className="text-lg font-semibold text-slate-900">
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

                    <p className="text-sm text-indigo-600 mt-2 font-medium">
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

                    <p className="text-sm text-gray-700 mt-4 leading-relaxed">
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
                  </ModernCard>
                ))}
              </div>
            </MainSection>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

const MainSection = ({ title, children }) => (
  <div className="mb-10">
    <h2
      className="
        text-xl
        md:text-2xl
        font-bold
        text-slate-900
        mb-6
        flex
        items-center
        gap-3
      "
    >
      <span className="w-10 h-[3px] bg-slate-800 rounded-full"></span>
      {title}
    </h2>

    {children}
  </div>
);

const SidebarSection = ({ title, children }) => (
  <div className="mb-8">
    <h2
      className="
        text-sm
        md:text-base
        uppercase
        tracking-wider
        font-bold
        text-slate-800
        mb-4
      "
    >
      {title}
    </h2>

    {children}
  </div>
);

const ModernCard = ({ children }) => (
  <div
    className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
      hover:shadow-md
      transition
    "
  >
    {children}
  </div>
);

export default ModernTemplate;