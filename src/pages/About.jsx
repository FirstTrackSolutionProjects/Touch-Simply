import React from "react";
import { FaBolt, FaPaintBrush, FaFileAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-16">

         {/* WHO WE ARE */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="about"
            className="rounded-2xl shadow-lg"
          />

        {/* COMPANY INTRO */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-14 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Touch Simply
          </h1>

          <p className="text-gray-600 leading-relaxed text-lg">
            <span className="font-semibold text-gray-800">
              First Track Solution Technologies
            </span>{" "}
            is a growing technology company founded in 2022 with a vision to
            simplify digital experiences for everyone.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            One of our key products,{" "}
            <span className="font-medium text-indigo-600">
              Touch Simply
            </span>
            , is a modern resume builder designed to help students, job seekers,
            and professionals create impactful resumes quickly and effortlessly.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We understand how challenging it can be to stand out in today's
            competitive job market. That's why we focus on delivering tools that
            are simple, fast, and effective—without compromising on design or
            quality.
          </p>
        </div>

       

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-relaxed">
              We are a passionate team of developers and designers committed to
              building user-friendly digital products. Our goal is to make complex
              tasks simple and accessible for everyone.
            </p>

            <p className="mt-4 text-gray-600">
              With <span className="font-semibold">Touch Simply</span>, we aim to
              eliminate the hassle of resume creation and provide a seamless
              experience from start to finish.
            </p>
          </div>
        </div>

        {/* MISSION & VISION */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals by providing simple yet powerful tools that
              help them showcase their skills, experience, and potential with
              confidence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-purple-600">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a globally trusted platform where anyone can create
              professional resumes quickly and efficiently without needing design
              or technical skills.
            </p>
          </div>

        </div>

        {/* WHY CHOOSE US */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl mb-4">
                <FaBolt />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">
                Fast & Easy
              </h4>
              <p className="text-gray-600 text-sm">
                Create a professional resume in minutes without complexity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xl mb-4">
                <FaPaintBrush />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">
                Modern Design
              </h4>
              <p className="text-gray-600 text-sm">
                Clean, professional templates that stand out to recruiters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl mb-4">
                <FaFileAlt />
              </div>
              <h4 className="font-semibold mb-2 text-gray-800">
                ATS Optimized
              </h4>
              <p className="text-gray-600 text-sm">
                Built to pass Applicant Tracking Systems and increase visibility.
              </p>
            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-800 to-indigo-900 text-white rounded-2xl p-12 text-center shadow-lg">
          <div className="grid sm:grid-cols-3 gap-8">

            <div>
              <h3 className="text-4xl font-bold">10K+</h3>
              <p className="text-sm text-gray-200 mt-1">Resumes Created</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">5K+</h3>
              <p className="text-sm text-gray-200 mt-1">Happy Users</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-sm text-gray-200 mt-1">Templates</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;