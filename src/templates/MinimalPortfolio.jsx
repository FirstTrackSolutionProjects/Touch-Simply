import React from "react";

const MinimalPortfolio = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 min-h-full font-sans">

      {/* HERO */}
      <section className="px-10 py-12 border-b text-center">
        <h1 className="text-3xl font-bold">
          {data.name || "Your Name"}
        </h1>

        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          {data.about || "A simple and clean portfolio"}
        </p>
      </section>

      {/* PROJECTS */}
      <section className="px-10 py-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">
          Projects
        </h2>

        {data.projects?.length > 0 ? (
          <div className="space-y-6">
            {data.projects.map((proj, i) => (
              <div key={i} className="border-b pb-4">
                
                {/* TITLE */}
                <h3 className="font-semibold text-lg">
                  {proj.title || "Project Title"}
                </h3>

                {/* DESC */}
                <p className="text-gray-600 mt-1">
                  {proj.desc || "Project description"}
                </p>

                {/* GITHUB */}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 mt-2 inline-block"
                  >
                    🔗 View Code
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No projects added</p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t">
        © {new Date().getFullYear()} {data.name || "Your Name"}
      </footer>
    </div>
  );
};

export default MinimalPortfolio;