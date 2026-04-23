import React from "react";
import { FaPaintBrush, FaPenFancy, FaFileDownload } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaPaintBrush />,
      title: "Choose Template",
      desc: "Select from modern, professional resume designs.",
    },
    {
      icon: <FaPenFancy />,
      title: "Add Information",
      desc: "Fill in your details, experience, and skills.",
    },
    {
      icon: <FaFileDownload />,
      title: "Download Resume",
      desc: "Export your resume instantly as PDF.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 via-indigo-50 to-purple-50 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <div className="relative text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="text-gray-500 mt-4">
          Build your professional resume in just 3 simple steps.
        </p>
      </div>

      {/* 🔥 Steps Wrapper */}
      <div className="relative mt-16">

        {/* 🔥 Connection Line (desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-purple-200 via-indigo-200 to-purple-200 -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-200/40 transition duration-300 text-center group hover:-translate-y-2"
            >

              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-4 py-1 rounded-full shadow-md">
                Step {i + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {step.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;