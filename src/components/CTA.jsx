import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaPalette } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative py-20 px-6 md:px-20 text-center overflow-hidden mt-4">

      {/* 🔥 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-950 to-gray-950"></div>

      {/* 🔥 Glow Effects */}
      <div className="absolute top-[50px] left-[50px] w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[50px] right-[50px] w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>

      {/* 🔥 Content */}
      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Ready to Build Your{" "}
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Professional Resume?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Create a job-winning resume in minutes with modern templates and real-time preview.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          {/* Primary Button */}
          <Link
            to="/editor"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition"
          >
            <FaRocket />
            Start Building
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>

          {/* Secondary Button */}
          <Link
            to="/templates"
            className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white hover:text-gray-900 transition"
          >
            <FaPalette />
            View Templates
          </Link>

        </div>

        {/* Trust Line */}
        <p className="mt-6 text-xs text-gray-400">
          Trusted by 10,000+ users • Free & easy to use
        </p>

      </div>

      {/* 🔥 Bottom Shine Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40"></div>

    </section>
  );
};

export default CTA;