import React from "react";

const CreativePortfolio = ({ data }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-gradient-to-br from-gray-100 to-gray-200">

      {/* LEFT SIDEBAR */}
      <div className="md:w-1/3 bg-black text-white p-8 flex flex-col justify-between">

        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>

          <p className="mt-3 text-gray-400 text-sm">{data.email}</p>
          <p className="text-gray-400 text-sm">{data.phone}</p>

          <p className="mt-4 text-gray-500 text-sm">🎂 {data.dob}</p>
          <p className="text-gray-500 text-sm">
            📍 {data.city}, {data.state} - {data.pincode}
          </p>
        </div>

        {/* SOCIAL */}
        <div className="mt-10 space-y-2 text-sm">
          {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="block hover:text-purple-400">GitHub</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="block hover:text-blue-400">LinkedIn</a>}
          {data.twitter && <a href={data.twitter} target="_blank" rel="noreferrer" className="block hover:text-sky-400">Twitter</a>}
          {data.instagram && <a href={data.instagram} target="_blank" rel="noreferrer" className="block hover:text-pink-400">Instagram</a>}
        </div>

        <p className="text-xs text-gray-600 mt-10">
          © {new Date().getFullYear()}
        </p>
      </div>

      {/* RIGHT CONTENT */}
      <div className="md:w-2/3 p-8 space-y-12">

        {/* ABOUT */}
        <section>
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <p className="text-gray-700">
              {data.about || "Creative developer crafting unique digital experiences."}
            </p>
          </div>
        </section>

       

        {/* EDUCATION */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Education</h2>

          <div className="relative border-l-2 border-gray-300 pl-6 space-y-10">
            {data.education?.map((edu, i) => (
              <div key={i} className="relative">

                <div className="absolute -left-[11px] top-2 w-5 h-5 bg-black rounded-full"></div>

                <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 hover:scale-[1.02] transition">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm mt-1">{edu.college}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {edu.startYear} - {edu.isPresent ? "Present" : edu.endYear}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </section>

      

        {/* PROJECTS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {data.projects?.map((proj, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] transition"
              >

                {proj.image && (
                  <img
                    src={proj.image}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{proj.title}</h3>

                  <p className="text-gray-600 text-sm mt-2">
                    {proj.desc}
                  </p>

                  <div className="flex gap-4 mt-3 text-sm">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-purple-600">
                        Code
                      </a>
                    )}
                    {proj.live && (
                      <a href={proj.live} target="_blank" rel="noreferrer" className="text-green-600">
                        Live
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CreativePortfolio;