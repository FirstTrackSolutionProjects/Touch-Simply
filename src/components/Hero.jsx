import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-16 md:py-24">

      <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Create Professional <span className="text-blue-600">Resumes</span> in Minutes
          </h1>

          <p className="mt-5 text-gray-600 text-base md:text-lg">
            Build a job-winning resume with modern templates, real-time preview, and easy editing.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">

            <Link
              to="/templates"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center shadow transition"
            >
              🚀 Create Resume
            </Link>

            <Link
              to="/templates"
              className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-lg text-center transition"
            >
              Browse Templates
            </Link>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end w-full">
          <img
            src="/templates/template1.png"
            alt="resume preview"
            className="w-64 sm:w-72 md:w-96 shadow-2xl rounded-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;