import React from "react";

const MinimalPortfolio = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 min-h-full font-sans">

      {/* ================= HEADER ================= */}
      <section className="px-6 py-12 border-b text-center">

         {/* PROFILE IMAGE */}
        {data.profileImage && (
          <div className="flex justify-center mb-6">
            <img
              src={data.profileImage}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-2xl"
            />
          </div>
        )}
        
        <h1 className="text-3xl font-bold">{data.name}</h1>

        <p className="text-gray-600 mt-2">
          {data.email} | {data.phone}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {data.dob} • {data.city}, {data.state} - {data.pincode}
        </p>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Education
        </h2>

        {data.education?.length > 0 ? (
          <div className="max-w-3xl mx-auto relative">

            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gray-300"></div>

            <div className="space-y-8">
              {data.education.map((edu, i) => (
                <div key={i} className="relative pl-8">

                  <div className="absolute left-0 top-2 w-4 h-4 bg-orange-500 rounded-full"></div>

                  <div className="bg-white p-5 rounded-xl shadow hover:scale-[1.02] transition">

                    <h3 className="text-lg font-semibold">
                      {edu.degree || "Degree"}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {edu.college || "College / University"}
                    </p>

                    <p className="text-gray-400 text-xs mt-2">
                      {edu.startYear} - {edu.isPresent ? "Present" : edu.endYear}
                    </p>

                    {edu.desc && (
                      <p className="text-gray-500 text-sm mt-3">
                        {edu.desc}
                      </p>
                    )}

                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-400">
            No education added
          </p>
        )}
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="px-6 py-10 border-t">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Experience
        </h2>

        {data.experience?.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="border-b pb-4">

                <h3 className="font-semibold text-lg">
                  {exp.role || "Role"}
                </h3>

                <p className="text-gray-600 text-sm">
                  {exp.company || "Company"}
                </p>

                <p className="text-gray-400 text-xs mt-1">
                  {exp.start} - {exp.isWorking ? "Present" : exp.end}
                </p>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No experience added
          </p>
        )}
      </section>

      {/* ================= SKILLS & LANGUAGES ================= */}
      <section className="px-6 py-10 border-t">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Skills & Languages
        </h2>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">

          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <p className="text-gray-600 text-sm">
              {data.skills || "No skills added"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            <p className="text-gray-600 text-sm">
              {data.languages || "No languages added"}
            </p>
          </div>

        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      <section className="px-6 py-4 text-center border-t">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">

          {data.github && <a href={data.github} target="_blank">GitHub</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank">LinkedIn</a>}
          {data.twitter && <a href={data.twitter} target="_blank">Twitter</a>}
          {data.instagram && <a href={data.instagram} target="_blank">Instagram</a>}
          {data.facebook && <a href={data.facebook} target="_blank">Facebook</a>}
          {data.youtube && <a href={data.youtube} target="_blank">YouTube</a>}

        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="px-6 py-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Projects</h2>

        {data.projects?.length > 0 ? (
          <div className="space-y-6">

            {data.projects.map((proj, i) => (
              <div key={i} className="border-b pb-4">

                  {proj.image && (
                  <img
                    src={proj.image}
                    alt="project"
                    className="w-full h-44 object-cover"
                  />
                )}

                <h3 className="font-semibold text-lg">
                  {proj.title || "Project Title"}
                </h3>

                <p className="text-gray-600 mt-1">
                  {proj.desc || "Project description"}
                </p>

                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    className="text-blue-600 text-sm mt-2 inline-block"
                  >
                    View Code
                  </a>
                )}
              </div>
            ))}

          </div>
        ) : (
          <p className="text-gray-400">No projects added</p>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t">
        © {new Date().getFullYear()} {data.name}
      </footer>

    </div>
  );
};

export default MinimalPortfolio;