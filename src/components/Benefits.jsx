import React from "react";

const Benefits = () => {
  const benefits = [
    {
      icon: "💸",
      title: "Free to Use",
      desc: "No hidden charges. Build and download resumes for free.",
    },
    {
      icon: "📊",
      title: "ATS Friendly",
      desc: "Optimized formats to pass Applicant Tracking Systems.",
    },
    {
      icon: "⚡",
      title: "Fast & Easy",
      desc: "Create a professional resume in just a few minutes.",
    },
    {
      icon: "🎨",
      title: "Professional Templates",
      desc: "Choose from a wide range of professionally designed templates.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-white">

      {/* Top Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Our Touch Simply?
          </h2>

          <p className="text-gray-500 mt-4">
            We make resume building simple, fast, and effective so you can focus on getting your dream job.
          </p>

          <ul className="mt-8 space-y-4 text-gray-600">
            <li>✔ Easy to use interface</li>
            <li>✔ Professional templates</li>
            <li>✔ Instant PDF download</li>
          </ul>
        </div>

        {/* Right Cards */}
        <div className="grid sm:grid-cols-2 gap-6">

          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-2xl mb-4">
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