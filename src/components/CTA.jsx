import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative py-20 px-6 md:px-20 text-center overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-95"></div>

      {/* Decorative Blur Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-white">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Ready to Build Your <br className="hidden md:block" />
          <span className="text-yellow-300">Professional Resume?</span>
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-blue-100">
          Create a job-winning resume in minutes with modern templates.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            to="/editor"
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition"
          >
            🚀 Start Building
          </Link>

          <Link
            to="/templates"
            className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition"
          >
            🎨 View Templates
          </Link>

        </div>

      </div>
    </section>
  );
};

export default CTA;