import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-950 via-fuchsia-900/30 to-gray-950 py-16 md:py-24">

      <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Create Stunning <span className="text-blue-500">Designs</span> in Minutes
          </h1>

          <p className="mt-5 text-gray-300 text-base md:text-lg">
            Design everything you need in one place with modern templates and live preview.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">

            <Link
              to="/templates"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Create Resume
            </Link>

            <Link
              to="/editor"
              className="border border-gray-400 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Explore Templates
            </Link>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end w-full">
          <img
            src="/templates/template1.png"
            alt="preview"
            className="w-64 sm:w-72 md:w-96 shadow-2xl rounded-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;