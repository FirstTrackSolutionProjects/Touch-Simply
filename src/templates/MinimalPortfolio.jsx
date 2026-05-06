import React from "react";

const MinimalPortfolio = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 min-h-full font-sans">

      {/* HEADER */}
      <section className="px-6 py-12 border-b text-center">
        <h1 className="text-3xl font-bold">{data.name}</h1>

        <p className="text-gray-600 mt-2">
          {data.email} | {data.phone}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {data.dob} • {data.city}, {data.state} - {data.pincode}
        </p>
      </section>

      {/* EDUCATION */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Education
        </h2>

        {data.education?.length > 0 ? (
          <div className="max-w-3xl mx-auto relative">

            {/* vertical line */}
            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gray-700"></div>

            <div className="space-y-8">
              {data.education.map((edu, i) => (
                <div key={i} className="relative pl-8">

                  {/* dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-orange-500 rounded-full"></div>

                  <div className="bg-white p-5 rounded-xl shadow hover:scale-[1.02] transition">

                    {/* DEGREE */}
                    <h3 className="text-lg font-semibold">
                      {edu.degree || "Degree"}
                    </h3>

                    {/* COLLEGE */}
                    <p className="text-gray-400 text-sm mt-1">
                      {edu.college || "College / University"}
                    </p>

                    {/* DATE */}
                    <p className="text-gray-500 text-xs mt-2">
                      {edu.startYear} - {edu.isPresent ? "Present" : edu.endYear}
                    </p>

                    {/* OPTIONAL DESC */}
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

      {/* SOCIAL */}
      <section className="px-6 py-4 text-center border-b">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">

          {data.github && <a href={data.github} target="_blank">GitHub</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank">LinkedIn</a>}
          {data.twitter && <a href={data.twitter} target="_blank">Twitter</a>}
          {data.instagram && <a href={data.instagram} target="_blank">Instagram</a>}
          {data.facebook && <a href={data.facebook} target="_blank">Facebook</a>}
          {data.youtube && <a href={data.youtube} target="_blank">YouTube</a>}

        </div>
      </section>

      {/* PROJECTS */}
      <section className="px-6 py-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Projects</h2>

        {data.projects?.length > 0 ? (
          <div className="space-y-6">

            {data.projects.map((proj, i) => (
              <div key={i} className="border-b pb-4">

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

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t">
        © {new Date().getFullYear()} {data.name}
      </footer>
    </div>
  );
};

export default MinimalPortfolio;