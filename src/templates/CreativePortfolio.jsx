import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

import {
  MapPin,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

const CreativePortfolio = ({ data }) => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative px-4 sm:px-6 md:px-14 py-14 md:py-24 overflow-hidden">

        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-52 sm:w-72 h-52 sm:h-72 bg-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Available For Work
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-5xl xl:text-2xl font-black leading-tight break-words">
              {data.name || "Your Name"}
            </h1>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {data.about ||
                "Creative frontend developer building modern, interactive and visually stunning digital experiences."}
            </p>

            {/* INFO */}
            <div className="mt-8 space-y-4 text-gray-400 flex flex-col items-center lg:items-start">

              {data.email && (
                <div className="flex items-center gap-3 text-sm sm:text-base break-all">
                  <Mail size={18} />
                  <span>{data.email}</span>
                </div>
              )}

              {data.phone && (
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <Phone size={18} />
                  <span>{data.phone}</span>
                </div>
              )}

              {(data.city || data.state || data.pincode) && (
                <div className="flex items-center gap-3 text-sm sm:text-base text-center lg:text-left">
                  <MapPin size={18} />
                  <span>
                    {data.city}, {data.state} - {data.pincode}
                  </span>
                </div>
              )}

            </div>

            {/* SOCIAL */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-10">

              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-purple-600 transition flex items-center justify-center"
                >
                  <FaGithub size={18} />
                </a>
              )}

              {data.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-blue-600 transition flex items-center justify-center"
                >
                  <FaLinkedin size={18} />
                </a>
              )}

              {data.twitter && (
                <a
                  href={data.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-sky-500 transition flex items-center justify-center"
                >
                  <FaTwitter size={18} />
                </a>
              )}

              {data.instagram && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-pink-500 transition flex items-center justify-center"
                >
                  <FaInstagram size={18} />
                </a>
              )}

              {data.facebook && (
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-blue-500 transition flex items-center justify-center"
                >
                  <FaFacebook size={18} />
                </a>
              )}

              {data.youtube && (
                <a
                  href={data.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/10 hover:bg-red-500 transition flex items-center justify-center"
                >
                  <FaYoutube size={18} />
                </a>
              )}

            </div>

          </div>

       {/* RIGHT IMAGE */}

<div className="order-1 lg:order-2 flex justify-center lg:justify-end">

  <div className="relative">

    {/* Glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-cyan-500/30 rounded-[24px] blur-2xl scale-105"></div>

    {/* CARD */}
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 p-2 rounded-[24px] shadow-2xl">

      {data.profileImage ? (
        <img
          src={data.profileImage}
          alt="profile"
          className="
            w-[150px]
            sm:w-[190px]
            md:w-[230px]
            lg:w-[260px]

            h-[210px]
            sm:h-[260px]
            md:h-[310px]
            lg:h-[340px]

            object-cover
            rounded-[20px]
          "
        />
      ) : (
        <div
          className="
            w-[150px]
            sm:w-[190px]
            md:w-[230px]
            lg:w-[260px]

            h-[210px]
            sm:h-[260px]
            md:h-[310px]
            lg:h-[340px]

            rounded-[20px]
            bg-gradient-to-br
            from-purple-500
            to-cyan-500
            flex
            items-center
            justify-center
            text-lg
            sm:text-xl
            font-bold
          "
        >
          PROFILE
        </div>
      )}

    </div>

  </div>

</div>

        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="px-4 sm:px-6 md:px-14 py-14 md:py-16">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl sm:text-4xl font-bold mb-10 md:mb-12 text-center md:text-left">
            Skills & Languages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">
                Skills
              </h3>

              <p className="text-gray-300 leading-8 text-sm sm:text-base break-words">
                {data.skills || "No skills added"}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:-translate-y-2 transition duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">
                Languages
              </h3>

              <p className="text-gray-300 leading-8 text-sm sm:text-base break-words">
                {data.languages || "No languages added"}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="px-4 sm:px-6 md:px-14 py-14 md:py-16 bg-white/[0.03]">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl sm:text-4xl font-bold mb-10 md:mb-14 text-center md:text-left">
            Education
          </h2>

          <div className="space-y-6 md:space-y-8">

            {data.education?.map((edu, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8 hover:border-purple-500/50 transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      {edu.degree}
                    </h3>

                    <p className="text-gray-400 mt-2 text-sm sm:text-base">
                      {edu.college}
                    </p>
                  </div>

                  <div className="px-5 py-2 rounded-full bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs sm:text-sm w-fit">
                    {edu.startYear} -{" "}
                    {edu.isPresent ? "Present" : edu.endYear}
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="px-4 sm:px-6 md:px-14 py-14 md:py-16">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl sm:text-4xl font-bold mb-10 md:mb-14 text-center md:text-left">
            Experience
          </h2>

          <div className="grid gap-6 md:gap-8">

            {data.experience?.length > 0 ? (
              data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-5 sm:p-8 hover:scale-[1.02] transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold">
                        {exp.role || "Role"}
                      </h3>

                      <p className="text-gray-400 mt-2 text-sm sm:text-base">
                        {exp.company || "Company"}
                      </p>
                    </div>

                    <div className="text-xs sm:text-sm px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 w-fit">
                      {exp.start} -{" "}
                      {exp.isWorking ? "Present" : exp.end}
                    </div>

                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No experience added
              </p>
            )}

          </div>

        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="px-4 sm:px-6 md:px-14 py-14 md:py-16 bg-white/[0.03]">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-center md:text-left">
              Featured Projects
            </h2>

            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <Globe size={18} />
              Portfolio Showcase
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

            {data.projects?.map((proj, i) => (
              <div
                key={i}
                className="group bg-[#111827] border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-3 transition duration-300"
              >

                {proj.image && (
                  <div className="overflow-hidden">
                    <img
                      src={proj.image}
                      alt="project"
                      className="w-full h-52 sm:h-56 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6">

                  <h3 className="text-xl sm:text-2xl font-semibold break-words">
                    {proj.title || "Project"}
                  </h3>

                  <p className="text-gray-400 text-sm mt-4 leading-7 break-words">
                    {proj.desc || "Project description"}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">

                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-sm"
                      >
                        View Code
                      </a>
                    )}

                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-sm"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm px-4">
        © {new Date().getFullYear()} {data.name} • All Rights Reserved
      </footer>

    </div>
  );
};

export default CreativePortfolio;