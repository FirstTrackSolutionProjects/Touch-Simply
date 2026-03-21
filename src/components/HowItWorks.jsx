import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      icon: "🎨",
      title: "Choose Template",
      desc: "Select from modern, professional resume designs.",
    },
    {
      icon: "✍️",
      title: "Add Information",
      desc: "Fill in your details, experience, and skills.",
    },
    {
      icon: "📄",
      title: "Download Resume",
      desc: "Export your resume instantly as PDF.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white to-gray-50">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="text-gray-500 mt-4">
          Build your professional resume in just 3 simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        {steps.map((step, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition text-center"
          >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
              Step {i + 1}
            </div>

            {/* Icon */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-3xl mb-6">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 mt-2 text-sm">
              {step.desc}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorks;