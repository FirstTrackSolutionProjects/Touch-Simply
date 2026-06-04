import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const CreativeTemplate = () => {
  const { resumeData } = useResume();

  // ================= DEMO DATA =================
  const demoData = {
    personal: {
      name: "Your Name",
      role: "Creative UI Designer",
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
        "Passionate creative designer and frontend developer skilled in modern UI/UX, React and Tailwind CSS.",
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
          "Worked on responsive UI design and modern frontend development projects.",
      },
    ],

    skills: [
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "JavaScript" },
      { name: "UI/UX" },
    ],

    projects: [
      {
        title: "Portfolio Website",
        tech: "React, Tailwind CSS",
        live: "https://yourproject.com",
        github: "https://github.com/username/project",
        description:
          "Modern responsive portfolio website with clean UI and animations.",
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
        "I hereby declare that the above information is true.",
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
    <div className="bg-gray-200 py-2 sm:py-4 md:py-6 px-0 sm:px-2 overflow-x-hidden">

      <div
        id="resume"
        className="
          w-full
          max-w-[210mm]
          min-h-screen
          md:min-h-[297mm]
          mx-auto
          bg-white
          text-gray-900
          overflow-hidden
          rounded-none
          md:rounded-md
          shadow-none
          md:shadow-xl
          text-[13px]
          sm:text-sm
          md:text-[14px]
          leading-relaxed
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen md:min-h-[297mm]">

          {/* ================= LEFT SIDEBAR ================= */}
          <div
            className="
              bg-gradient-to-b
              from-slate-900
              via-slate-800
              to-slate-900
              text-white
              p-4
              sm:p-5
              md:p-7
              space-y-5
              md:space-y-7
            "
          >

            {/* Profile */}
            <div className="text-center border-b border-white/10 pb-6">

              {personal?.image && (
                <img
                  src={personal.image}
                  alt="Profile"
                  crossOrigin="anonymous"
                  className="
                    w-20 h-20
                    sm:w-24 sm:h-24
                    md:w-28 md:h-28
                    mx-auto
                    rounded-full
                    border-4 border-white/30
                    shadow-lg
                    object-cover
                    mb-4
                  "
                />
              )}

              <h2
                className="
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  font-bold
                  tracking-wide
                  break-words
                  leading-tight
                "
              >
                {resumeData?.personal?.name ? (
                  <EditField
                    section="personal"
                    field="name"
                  />
                ) : (
                  personal.name
                )}
              </h2>

              <p className="text-sm text-gray-300 mt-1">
                {resumeData?.personal?.role ? (
                  <EditField
                    section="personal"
                    field="role"
                  />
                ) : (
                  personal.role
                )}
              </p>

              <p className="text-xs text-gray-400 mt-1">
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
            </div>

            {/* Contact */}
            <div>

              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Contact
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">

                <p className="break-all">
                  📧{" "}
                  {resumeData?.personal?.email ? (
                    <EditField
                      section="personal"
                      field="email"
                    />
                  ) : (
                    personal.email
                  )}
                </p>

                <p>
                  🎂{" "}
                  {resumeData?.personal?.dob ? (
                    <EditField
                      section="personal"
                      field="dob"
                    />
                  ) : (
                    personal.dob
                  )}
                </p>

                <p>
                  📞{" "}
                  {resumeData?.personal?.phone ? (
                    <EditField
                      section="personal"
                      field="phone"
                    />
                  ) : (
                    personal.phone
                  )}
                </p>

                <p className="leading-6">
                  📍{" "}
                  {resumeData?.personal?.city ? (
                    <>
                      <EditField
                        section="personal"
                        field="landmark"
                      />{" "}
                      <EditField
                        section="personal"
                        field="city"
                      />{" "}
                      <EditField
                        section="personal"
                        field="state"
                      />{" "}
                      <EditField
                        section="personal"
                        field="pincode"
                      />
                    </>
                  ) : (
                    <>
                      {personal.landmark} {personal.city}{" "}
                      {personal.state} {personal.pincode}
                    </>
                  )}
                </p>

                <p className="break-all text-[11px] sm:text-xs md:text-sm">
                  🔗{" "}
                  {resumeData?.personal?.linkedin ? (
                    <EditField
                      section="personal"
                      field="linkedin"
                    />
                  ) : (
                    personal.linkedin
                  )}
                </p>

                <p className="break-all text-[11px] sm:text-xs md:text-sm">
                  💻{" "}
                  {resumeData?.personal?.github ? (
                    <EditField
                      section="personal"
                      field="github"
                    />
                  ) : (
                    personal.github
                  )}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>

              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skills?.map((s, i) => (
                  <span
                    key={i}
                    className="
                      bg-white/10
                      border border-white/10
                      px-3 py-1
                      rounded-full
                      text-xs
                    "
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>

              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Languages
              </h3>

              <div className="space-y-2">
                {languages?.map((l, i) => (
                  <div
                    key={i}
                    className="
                      flex items-center justify-between
                      text-xs sm:text-sm
                      border-b border-white/10 pb-1
                    "
                  >
                    <span>{l.name}</span>

                    <span className="text-gray-400">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>

              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wider text-gray-300 mb-4">
                Education
              </h3>

              <div className="space-y-4">

                {education?.map((e, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-purple-400 pl-3"
                  >

                    <p className="font-semibold text-sm">
                      {resumeData?.education?.length >
                      0 ? (
                        <EditField
                          section="education"
                          field="level"
                          index={i}
                        />
                      ) : (
                        e.level
                      )}
                    </p>

                    <p className="text-gray-300 text-xs mt-1">
                      {resumeData?.education?.length >
                      0 ? (
                        <EditField
                          section="education"
                          field="school"
                          index={i}
                        />
                      ) : (
                        e.school
                      )}
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      {resumeData?.education?.length >
                      0 ? (
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
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="md:col-span-2 p-4 sm:p-6 md:p-10">

            {/* Summary */}
            <section className="mb-8 md:mb-10">

              <h2
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  font-bold
                  text-gray-800
                  border-b-2 border-purple-500
                  pb-2
                  mb-4
                "
              >
                Profile
              </h2>

              <p className="text-sm text-gray-700 leading-6 md:leading-7">
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
            </section>

            {/* Experience */}
            <section className="mb-8 md:mb-10">

              <h2
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  font-bold
                  text-gray-800
                  border-b-2 border-purple-500
                  pb-2
                  mb-6
                "
              >
                Experience
              </h2>

              <div className="space-y-5 sm:space-y-7">

                {experience?.map((e, i) => (
                  <div
                    key={i}
                    className="
                      relative
                      pl-4 sm:pl-6
                      border-l-2 border-gray-300
                    "
                  >

                    <div
                      className="
                        absolute
                        -left-[7px]
                        top-1
                        w-3 h-3
                        rounded-full
                        bg-purple-600
                      "
                    />

                    <h3 className="font-semibold text-base text-gray-800">
                      {resumeData?.experience?.length >
                      0 ? (
                        <EditField
                          section="experience"
                          field="role"
                          index={i}
                        />
                      ) : (
                        e.role
                      )}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {resumeData?.experience?.length >
                      0 ? (
                        <EditField
                          section="experience"
                          field="company"
                          index={i}
                        />
                      ) : (
                        e.company
                      )}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {resumeData?.experience?.length >
                      0 ? (
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

                    <p className="text-sm text-gray-700 mt-3 leading-6">
                      {resumeData?.experience?.length >
                      0 ? (
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
              </div>
            </section>

            {/* Projects */}
            <section>

              <h2
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  font-bold
                  text-gray-800
                  border-b-2 border-indigo-500
                  pb-2
                  mb-6
                "
              >
                Projects
              </h2>

              <div className="space-y-5 sm:space-y-7">

                {projects?.map((p, i) => (
                  <div
                    key={i}
                    className="
                      bg-gray-50
                      border border-gray-200
                      rounded-xl
                      p-3 sm:p-4
                    "
                  >

                    <h3 className="font-semibold text-base text-gray-800">
                      {resumeData?.projects?.length >
                      0 ? (
                        <EditField
                          section="projects"
                          field="title"
                          index={i}
                        />
                      ) : (
                        p.title
                      )}
                    </h3>

                    <p className="text-xs text-purple-600 mt-1">
                      ⚙️{" "}
                      {resumeData?.projects?.length >
                      0 ? (
                        <EditField
                          section="projects"
                          field="tech"
                          index={i}
                        />
                      ) : (
                        p.tech
                      )}
                    </p>

                    <div className="text-xs mt-3 space-y-1">

                      <p className="text-blue-600 break-all text-[11px] sm:text-xs md:text-sm">
                        🔗{" "}
                        {resumeData?.projects?.length >
                        0 ? (
                          <EditField
                            section="projects"
                            field="live"
                            index={i}
                          />
                        ) : (
                          p.live
                        )}
                      </p>

                      <p className="text-gray-600 break-all text-[11px] sm:text-xs md:text-sm">
                        💻{" "}
                        {resumeData?.projects?.length >
                        0 ? (
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

                    <p className="text-sm text-gray-700 mt-3 leading-6">
                      {resumeData?.projects?.length >
                      0 ? (
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
              </div>
            </section>

            {/* Signature */}
            <div className="mt-10 md:mt-14 text-center">
              <p className="text-sm sm:text-base font-semibold text-gray-800 italic leading-6">
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
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;