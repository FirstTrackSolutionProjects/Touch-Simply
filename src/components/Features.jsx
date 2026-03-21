import React from "react";

const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Easy Editor",
      desc: "Drag & drop builder with real-time preview.",
    },
    {
      icon: "🎨",
      title: "Modern Templates",
      desc: "Beautiful, job-ready resume designs.",
    },
    {
      icon: "📄",
      title: "PDF Export",
      desc: "Download your resume instantly as PDF.",
    },
    {
      icon: "💾",
      title: "Auto Save",
      desc: "Your data is saved automatically.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white to-gray-50">

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
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 text-center group"
          >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-2xl group-hover:bg-blue-600 group-hover:text-white transition">
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