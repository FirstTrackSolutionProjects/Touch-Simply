import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaPalette } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-brand-red">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Ready to Build Your <br className="hidden md:block" />
          Professional Resume?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
          Create a job-winning resume in minutes with modern templates and real-time preview.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link to="/editor" className="group flex items-center justify-center gap-2 bg-brand-black text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all">
            <FaRocket /> Start Building
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link to="/templates" className="flex items-center justify-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 rounded-xl hover:bg-neutral-bg transition-all">
            <FaPalette /> View Templates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;