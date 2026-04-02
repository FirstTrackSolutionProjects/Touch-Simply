import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-950 via-purple-900/40 to-gray-950 py-15 md:py-24 mt-4">

      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_40%)] pointer-events-none"></div>

      <div className="relative w-full px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="max-w-xl text-center md:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Create Stunning{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Designs
            </span>{" "}
            in Minutes
          </h1>

          <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed">
            Design everything you need in one place with modern templates and real-time preview.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">

            <Link
              to="/editor"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 text-white px-6 py-3 rounded-xl shadow-lg transition"
            >
              Create Resume
            </Link>

            <Link
              to="/templates"
              className="border border-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              Browse Templates
            </Link>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:justify-end w-full">

          {/* Glow behind image */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-purple-600/30 blur-3xl rounded-full"></div>

          <img
            src="/images/hero-section.jpg"
            alt="preview"
            className="relative w-72 sm:w-80 md:w-[420px] rounded-2xl shadow-2xl border border-white/10"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;