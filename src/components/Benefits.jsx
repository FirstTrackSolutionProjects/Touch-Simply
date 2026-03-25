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
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 via-indigo-50 to-purple-50">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Touch Simply</span>?
          </h2>

          <p className="text-gray-500 mt-4">
            We make resume building simple, fast, and effective so you can focus on getting your dream job.
          </p>

          {/* Points */}
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-gray-600">
              <FaCheckCircle className="text-purple-600" />
              Easy to use interface
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <FaCheckCircle className="text-indigo-600" />
              Professional templates
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <FaCheckCircle className="text-purple-600" />
              Instant PDF download
            </li>
          </ul>
        </div>

        {/* RIGHT CARDS */}
        <div className="grid sm:grid-cols-2 gap-6">

          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-purple-200 transition duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 text-lg mb-4 group-hover:scale-110 transition">
                {b.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-gray-800">
                {b.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-500 mt-2 text-sm">
                {b.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default Benefits;