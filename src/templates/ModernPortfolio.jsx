import React from "react";

const ModernPortfolio = ({ data }) => {
  return (
    <div className="bg-gray-950 text-white min-h-full font-sans">

      {/* HERO */}
      <section className="px-10 py-14 text-center border-b border-gray-800">
        <h1 className="text-4xl font-bold">
          {data.name || "Your Name"}
        </h1>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          {data.about || "Building modern and scalable web applications"}
        </p>
      </section>

      {/* PROJECTS */}
      <section className="px-10 py-10">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          My Projects
        </h2>

        {data.projects?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {data.projects.map((proj, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-xl overflow-hidden shadow hover:scale-[1.02] transition"
              >
                {/* IMAGE */}
                {proj.image && (
                  <img
                    src={proj.image}
                    alt="project"
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-4">
                  {/* TITLE */}
                  <h3 className="text-lg font-semibold">
                    {proj.title || "Project Title"}
                  </h3>

                  {/* DESC */}
                  <p className="text-gray-400 text-sm mt-2">
                    {proj.desc || "Project description"}
                  </p>

                  {/* GITHUB */}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-purple-400 text-sm"
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

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-800">
        © {new Date().getFullYear()} {data.name || "Your Name"}
      </footer>
    </div>
  );
};

export default ModernPortfolio;