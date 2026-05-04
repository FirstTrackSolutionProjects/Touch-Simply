import React from "react";
import { useResume } from "../context/ResumeContext";
import EditField from "../components/EditField";

const CreativeTemplate = () => {
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
    <div className="w-full max-w-[210mm] mx-auto bg-white text-gray-900 
    text-sm md:text-[14px] leading-relaxed">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3">

        {/* ================= LEFT SIDEBAR ================= */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-6 space-y-6">

          {/* Profile */}
          <div className="text-center">
            {personal?.image && (
              <img
                src={personal.image}
                alt="Profile"
                className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 border-white mb-3 object-cover"
              />
            )}
            <h2 className="text-lg md:text-xl font-bold">
              <EditField section="personal" field="name" />
            </h2>
            <p className="text-xs md:text-sm text-gray-300">
              <EditField section="personal" field="role" />
            </p>
          </div>

          {/* Contact */}
          <div className="text-xs md:text-sm space-y-1">
            <p>📧 <EditField section="personal" field="email" /></p>
            <p>📞 <EditField section="personal" field="phone" /></p>
            {personal?.linkedin && (
              <p>🔗 <EditField section="personal" field="linkedin" /></p>
            )}
            {personal?.github && (
              <p>💻 <EditField section="personal" field="github" /></p>
            )}
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills?.map((s, i) => (
                <span
                  key={i}
                  className="bg-white/10 px-2 py-1 rounded text-xs"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            {languages?.map((l, i) => (
              <p key={i} className="text-xs text-gray-300">
                {l.name} - {l.level}
              </p>
            ))}
          </div>

          {/* Education */}
          <div>
            <h3 className="font-semibold mb-2">Education</h3>
            {education?.map((e, i) => (
              <div key={i} className="text-xs mb-2">
                <p className="font-medium">
                  <EditField section="education" field="level" index={i} />
                </p>
                <p className="text-gray-300">
                  <EditField section="education" field="school" index={i} />
                </p>
                <p className="text-gray-400">
                  <EditField section="education" field="startYear" index={i} /> -{" "}
                  <EditField section="education" field="endYear" index={i} />
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* ================= RIGHT MAIN ================= */}
        <div className="md:col-span-2 p-4 md:p-8">

          {/* Summary */}
          {personal?.summary && (
            <div className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-3">
                Profile
              </h2>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                <EditField section="personal" field="summary" type="textarea" />
              </p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-8 md:mb-10">
            <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-5">
              Experience
            </h2>

            <div className="relative border-l-2 border-gray-300 pl-5 md:pl-6 space-y-5">
              {experience?.map((e, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[8px] md:-left-[10px] top-1 w-3 h-3 md:w-4 md:h-4 bg-purple-600 rounded-full"></div>

                  <h3 className="font-semibold text-sm md:text-base">
                    <EditField section="experience" field="role" index={i} />
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500">
                    <EditField section="experience" field="company" index={i} />
                  </p>

                  <p className="text-xs text-gray-400">
                    <EditField section="experience" field="startYear" index={i} /> -{" "}
                    {e.isCurrent ? "Present" : (
                      <EditField section="experience" field="endYear" index={i} />
                    )}
                  </p>

                  {e.description && (
                    <p className="text-xs md:text-sm mt-2 text-gray-700">
                      <EditField
                        section="experience"
                        field="description"
                        index={i}
                        type="textarea"
                      />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-base md:text-lg font-bold border-b pb-2 mb-5">
              Projects
            </h2>

            <div className="relative border-l-2 border-gray-300 pl-5 md:pl-6 space-y-5">
              {projects?.map((p, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[8px] md:-left-[10px] top-1 w-3 h-3 md:w-4 md:h-4 bg-indigo-600 rounded-full"></div>

                  <h3 className="font-semibold text-sm md:text-base">
                    <EditField section="projects" field="title" index={i} />
                  </h3>

                  {p.tech && (
                    <p className="text-xs text-purple-600">
                      <EditField section="projects" field="tech" index={i} />
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
                    <p className="text-xs md:text-sm mt-2 text-gray-700">
                      <EditField
                        section="projects"
                        field="description"
                        index={i}
                        type="textarea"
                      />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agreement */}
          {agreement?.signature && (
            <p className="text-sm md:text-base font-semibold text-gray-800 text-center mt-10">
              {agreement.signature}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;