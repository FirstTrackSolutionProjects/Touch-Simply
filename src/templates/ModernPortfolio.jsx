import React from "react";

const ModernPortfolio = ({ data }) => {
  return (
    <div className="bg-gray-950 text-white min-h-full font-sans">

      {/* ================= HERO ================= */}
      <section className="px-6 py-14 text-center border-b border-gray-800">

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
        
        <h1 className="text-4xl font-bold">{data.name}</h1>

        <p className="mt-3 text-gray-400">
          {data.email} • {data.phone}
        </p>

        <p className="mt-2 text-gray-500 text-sm">
          🎂 {data.dob} | 📍 {data.city}, {data.state} - {data.pincode}
        </p>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          {data.about || "Building modern web applications"}
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">

          {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
              GitHub
            </a>
          )}

          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
              LinkedIn
            </a>
          )}

          {data.twitter && (
            <a href={data.twitter} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
              Twitter
            </a>
          )}

          {data.instagram && (
            <a href={data.instagram} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline">
              Instagram
            </a>
          )}

          {data.facebook && (
            <a href={data.facebook} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
              Facebook
            </a>
          )}

          {data.youtube && (
            <a href={data.youtube} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">
              YouTube
            </a>
          )}

        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="px-6 py-10 border-b border-gray-800">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Education
        </h2>

        {data.education?.length > 0 ? (
          <div className="max-w-3xl mx-auto relative">

            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gray-700"></div>

            <div className="space-y-8">
              {data.education.map((edu, i) => (
                <div key={i} className="relative pl-8">

                  <div className="absolute left-0 top-2 w-4 h-4 bg-purple-500 rounded-full"></div>

                  <div className="bg-gray-900 p-5 rounded-xl shadow hover:scale-[1.02] transition">

                    <h3 className="text-lg font-semibold">
                      {edu.degree || "Degree"}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {edu.college || "College / University"}
                    </p>

                    <p className="text-gray-500 text-xs mt-2">
                      {edu.startYear} - {edu.isPresent ? "Present" : edu.endYear}
                    </p>

                    {edu.desc && (
                      <p className="text-gray-400 text-sm mt-3">
                        {edu.desc}
                      </p>
                    )}

                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-500">
            No education added
          </p>
        )}
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="px-6 py-10 border-b border-gray-800">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Experience
        </h2>

        {data.experience?.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="bg-gray-900 p-5 rounded-xl shadow hover:scale-[1.02] transition">

                <h3 className="text-lg font-semibold">
                  {exp.role || "Role"}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {exp.company || "Company"}
                </p>

                <p className="text-gray-500 text-xs mt-2">
                  {exp.start} - {exp.isWorking ? "Present" : exp.end}
                </p>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No experience added
          </p>
        )}
      </section>

      {/* ================= SKILLS & LANGUAGES ================= */}
      <section className="px-6 py-10 border-b border-gray-800">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Skills & Languages
        </h2>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">

          <div className="bg-gray-900 p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <p className="text-gray-400 text-sm">
              {data.skills || "No skills added"}
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Languages</h3>
            <p className="text-gray-400 text-sm">
              {data.languages || "No languages added"}
            </p>
          </div>

        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          My Projects
        </h2>

        {data.projects?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {data.projects.map((proj, i) => (
              <div key={i} className="bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.03] transition">

                {proj.image && (
                  <img
                    src={proj.image}
                    alt="project"
                    className="w-full h-44 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {proj.title || "Project Title"}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    {proj.desc || "Project description"}
                  </p>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 text-sm mt-3 inline-block"
                    >
                      🔗 View Code
                    </a>
                  )}
                </div>

              </div>
            ))}

          </div>
        ) : (
          <p className="text-center text-gray-500">
            No projects added yet
          </p>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-800">
        © {new Date().getFullYear()} {data.name}
      </footer>

    </div>
  );
};

export default ModernPortfolio;