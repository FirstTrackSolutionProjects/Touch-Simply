import React from "react";

const CreativePortfolio = ({ data }) => {
  return (
    <div className="min-h-full flex bg-gray-950 text-white font-sans">

      {/* 🔥 SIDEBAR */}
      <aside className="w-1/3 bg-gray-900 p-6 flex flex-col items-center text-center border-r border-gray-800">

        {/* PROFILE IMAGE */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-purple-500">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              Image
            </div>
          )}
        </div>

        {/* NAME */}
        <h1 className="text-xl font-bold">
          {data.name || "Your Name"}
        </h1>

        {/* ABOUT */}
        <p className="text-sm text-gray-400 mt-2">
          {data.about || "Short bio about yourself"}
        </p>

        {/* SKILLS */}
        <div className="mt-6 w-full">
          <h3 className="text-sm font-semibold mb-2 text-left">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {data.skills && data.skills.length > 0 ? (
              data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-purple-600 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">
                Add skills
              </span>
            )}
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="mt-6 text-sm text-gray-400 space-y-1">
          {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer">
              🔗 GitHub
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer">
              🔗 LinkedIn
            </a>
          )}
        </div>
      </aside>

      {/* 🔥 MAIN CONTENT */}
      <main className="w-2/3 p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Projects
        </h2>

        {data.projects && data.projects.length > 0 ? (
          <div className="grid gap-6">

            {data.projects.map((proj, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-xl overflow-hidden shadow hover:scale-[1.02] transition duration-300"
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
                  <p className="text-sm text-gray-400 mt-2">
                    {proj.desc || "Project description"}
                  </p>

                  {/* TAGS */}
                  {proj.tags && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

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
          <p className="text-gray-500">No projects added</p>
        )}
      </main>
    </div>
  );
};

export default CreativePortfolio;