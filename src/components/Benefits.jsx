import React from "react";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaBolt,
  FaPalette,
  FaCheckCircle,
} from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: "Free to Use",
      desc: "No hidden charges. Build and download resumes for free.",
    },
    {
      icon: <FaChartLine />,
      title: "ATS Friendly",
      desc: "Optimized formats to pass Applicant Tracking Systems.",
    },
    {
      icon: <FaBolt />,
      title: "Fast & Easy",
      desc: "Create a professional resume in just a few minutes.",
    },
    {
      icon: <FaPalette />,
      title: "Professional Templates",
      desc: "Choose from a wide range of professionally designed templates.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 via-indigo-50 to-purple-50 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Touch Simply
            </span>
            ?
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 mt-4 text-sm md:text-base">
            We make resume building simple, fast, and effective so you can focus
            on landing your dream job.
          </p>

          {/* Points */}
          <ul className="mt-8 space-y-4">
            {[
              "Easy to use interface",
              "Professional templates",
              "Instant download",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-600 group"
              >
                <FaCheckCircle className="text-purple-600 group-hover:scale-110 transition" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT CARDS ================= */}
        <div className="grid sm:grid-cols-2 gap-6">

          {benefits.map((b, i) => (
            <div
              key={i}
              className="relative group bg-white/70 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-200/20 to-indigo-200/20 opacity-0 group-hover:opacity-100 transition"></div>

              {/* Icon */}
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 text-lg mb-4 group-hover:scale-110 transition">
                {b.icon}
              </div>

              {/* Title */}
              <h3 className="relative font-semibold text-lg text-gray-800">
                {b.title}
              </h3>

              {/* Desc */}
              <p className="relative text-gray-500 mt-2 text-sm">
                {b.desc}
              </p>

              {/* Bottom line animation */}
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Benefits;