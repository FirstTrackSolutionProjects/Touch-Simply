import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Touch Simply
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-100">
          Helping you create professional resumes effortlessly and land your dream job faster.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="about"
            className="rounded-xl shadow-md"
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Touch Simply is a modern resume builder platform designed to help
              students, job seekers, and professionals create impactful resumes
              in minutes. We combine clean design with powerful tools to simplify
              your job application journey.
            </p>

            <p className="mt-4 text-gray-600">
              Whether you're a fresher or an experienced professional, our platform
              helps you stand out with ATS-friendly and visually appealing resumes.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Our Mission</h3>
            <p className="text-gray-600">
              To simplify resume creation and empower individuals to present their
              skills and experiences in the best possible way.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">Our Vision</h3>
            <p className="text-gray-600">
              To become the go-to platform for resume building worldwide by offering
              smart, fast, and user-friendly tools.
            </p>
          </div>

        </div>

        {/* Features / Why Choose Us */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Why Choose Us</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold mb-2">⚡ Easy to Use</h4>
              <p className="text-gray-600 text-sm">
                Build resumes quickly with a simple and intuitive interface.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold mb-2">🎨 Modern Templates</h4>
              <p className="text-gray-600 text-sm">
                Choose from professionally designed templates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold mb-2">📄 ATS Friendly</h4>
              <p className="text-gray-600 text-sm">
                Get resumes optimized for job application systems.
              </p>
            </div>

          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-600 text-white rounded-xl p-10 text-center">
          <div className="grid sm:grid-cols-3 gap-6">

            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-sm">Resumes Created</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">5K+</h3>
              <p className="text-sm">Happy Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-sm">Templates</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;