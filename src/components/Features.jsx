import React from "react";
import {
  FaBolt,
  FaPaintBrush,
  FaFilePdf,
  FaSave,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaBolt />,
      title: "Easy Editor",
      desc: "Drag & drop builder with real-time preview.",
    },
    {
      icon: <FaPaintBrush />,
      title: "Modern Templates",
      desc: "Beautiful, job-ready resume designs.",
    },
    {
      icon: <FaFilePdf />,
      title: "PDF Export",
      desc: "Download your resume instantly as PDF.",
    },
    {
      icon: <FaSave />,
      title: "Auto Save",
      desc: "Your data is saved automatically.",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 via-indigo-50 to-purple-50 overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none"></div>

      {/* ================= HEADER ================= */}
      <div className="relative text-center max-w-2xl mx-auto">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-4 rounded-full bg-purple-100 text-purple-700 text-xs border border-purple-200">
          ⚡ Features
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Powerful Features
        </h2>

        <p className="text-gray-500 mt-4 text-sm md:text-base">
          Everything you need to build a professional resume effortlessly.
        </p>
      </div>

      {/* ================= CARDS ================= */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">

        {features.map((f, i) => (
          <div
            key={i}
            className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-2xl transition duration-300 text-center hover:-translate-y-2"
          >
            {/* Glow Hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-200/20 to-indigo-200/20 opacity-0 group-hover:opacity-100 transition"></div>

            {/* Icon */}
            <div className="relative w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 text-xl group-hover:scale-110 transition">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="relative mt-6 text-lg font-semibold text-gray-800">
              {f.title}
            </h3>

            {/* Description */}
            <p className="relative text-gray-500 mt-2 text-sm">
              {f.desc}
            </p>

            {/* Bottom Line Animation */}
            <div className="mt-4 h-1 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;