import React from "react";

const MinimalPortfolio = ({ data }) => {
  return (
    <div className="bg-[#fafaf9] text-[#1c1917] min-h-screen">

      {/* ================= HERO ================= */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

        <div className="grid lg:grid-cols-[220px_1fr] gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center lg:justify-start">

            {data.profileImage && (
              <div className="relative">

                <div className="absolute inset-0 bg-orange-200 rounded-[28px] rotate-6"></div>

                <img
                  src={data.profileImage}
                  alt="profile"
                  className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-[28px] object-cover border-4 border-white shadow-xl"
                />

              </div>
            )}

          </div>

          {/* CONTENT */}
          <div className="text-center lg:text-left">

            <p className="text-sm uppercase tracking-[0.25em] text-orange-600 font-medium">
              Portfolio
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
              {data.name}
            </h1>

            <p className="mt-5 text-gray-600 leading-8 max-w-2xl">
              {data.about ||
                "Creative developer focused on building clean, user-friendly and meaningful digital experiences."}
            </p>

            {/* INFO */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">

              <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm shadow-sm">
                {data.email}
              </div>

              <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm shadow-sm">
                {data.phone}
              </div>

              <div className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm shadow-sm">
                {data.city}, {data.state}
              </div>

            </div>

            {/* SOCIALS */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start font-semibold text-md text-yellow-600">

              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black transition"
                >
                  GitHub
                </a>
              )}

              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  LinkedIn
                </a>
              )}

              {data.twitter && (
                <a
                  href={data.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  Twitter
                </a>
              )}

              {data.instagram && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-500 transition"
                >
                  Instagram
                </a>
              )}

              {data.facebook && (
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  Facebook
                </a>
              )}

              {data.youtube && (
                <a
                  href={data.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-600 transition"
                >
                  YouTube
                </a>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================= EDUCATION ================= */}
      <section className="border-t border-gray-200">

        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">

          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-[2px] bg-orange-500"></div>

            <h2 className="text-2xl font-semibold">
              Education
            </h2>
          </div>

          {data.education?.length > 0 ? (
            <div className="space-y-8">

              {data.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                    <div>
                      <h3 className="text-xl font-semibold">
                        {edu.degree || "Degree"}
                      </h3>

                      <p className="mt-2 text-gray-600">
                        {edu.college || "College / University"}
                      </p>

                      {edu.desc && (
                        <p className="mt-4 text-gray-500 leading-7 text-sm">
                          {edu.desc}
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-orange-600 font-medium whitespace-nowrap">
                      {edu.startYear} -{" "}
                      {edu.isPresent ? "Present" : edu.endYear}
                    </div>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-400">
              No education added
            </p>
          )}

        </div>

      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="border-t border-gray-200 bg-white">

        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">

          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-[2px] bg-orange-500"></div>

            <h2 className="text-2xl font-semibold">
              Experience
            </h2>
          </div>

          {data.experience?.length > 0 ? (
            <div className="space-y-8">

              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-8"
                >

                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-orange-500"></div>

                  <div className="border-l-2 border-orange-200 pl-6">

                    <h3 className="text-xl font-semibold">
                      {exp.role || "Role"}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {exp.company || "Company"}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      {exp.start} -{" "}
                      {exp.isWorking ? "Present" : exp.end}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-400">
              No experience added
            </p>
          )}

        </div>

      </section>

      {/* ================= SKILLS ================= */}
      <section className="border-t border-gray-200">

        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Skills
              </h2>

              <p className="text-gray-600 leading-8">
                {data.skills || "No skills added"}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Languages
              </h2>

              <p className="text-gray-600 leading-8">
                {data.languages || "No languages added"}
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= PROJECTS ================= */}
      <section className="border-t border-gray-200 bg-white">

        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">

          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-[2px] bg-orange-500"></div>

            <h2 className="text-2xl font-semibold">
              Projects
            </h2>
          </div>

          {data.projects?.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">

              {data.projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-[#fafaf9] border border-gray-200 rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-md transition"
                >

                  {proj.image && (
                    <img
                      src={proj.image}
                      alt="project"
                      className="w-full h-52 object-cover"
                    />
                  )}

                  <div className="p-6">

                    <h3 className="text-xl font-semibold">
                      {proj.title || "Project Title"}
                    </h3>

                    <p className="mt-4 text-gray-600 leading-7 text-sm">
                      {proj.desc || "Project description"}
                    </p>

                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-5 text-orange-600 text-sm font-medium hover:underline"
                      >
                        View Project →
                      </a>
                    )}

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <p className="text-gray-400">
              No projects added
            </p>
          )}

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {data.name}
      </footer>

    </div>
  );
};

export default MinimalPortfolio;