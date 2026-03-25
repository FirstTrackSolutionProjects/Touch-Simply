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
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 via-indigo-50 to-purple-50">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Powerful Features
        </h2>
        <p className="text-gray-500 mt-4">
          Everything you need to build a professional resume effortlessly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">

        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-200 transition duration-300 text-center group"
          >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 text-xl group-hover:scale-110 transition">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="mt-6 text-lg font-semibold text-gray-800">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 mt-2 text-sm">
              {f.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;