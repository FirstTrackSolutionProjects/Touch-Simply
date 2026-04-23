import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 px-6 md:px-16 py-14 mt-10 relative overflow-hidden">

      {/* 🔥 Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-700/20 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Touch Simply
            </h2>

            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Build professional resumes effortlessly with modern templates,
              smart tools, and real-time editing.
            </p>

            {/* Contact */}
            <div className="mt-5 space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2 hover:text-white transition">
                <FaEnvelope /> support@touchsimply.com
              </p>
              <p className="flex items-center gap-2 hover:text-white transition">
                <FaPhoneAlt /> +91 98765 43210
              </p>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/about", label: "About Us" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/faq", label: "FAQ" },
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/refund", label: "Refund Policy" },
                { to: "/data-security", label: "Data Security" },
                { to: "/legal-policy", label: "Legal Policy" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>

            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get latest updates
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <button className="bg-blue-600 px-5 py-2 text-sm rounded-lg hover:bg-blue-700 transition text-white shadow-md hover:shadow-lg">
                Join
              </button>
            </div>

            {/* Tiny note */}
            <p className="text-xs text-gray-500 mt-2">
              No spam. Only useful updates.
            </p>
          </div>

        </div>

        {/* ================= SOCIAL ================= */}
        <div className="flex justify-center gap-6 mt-12 text-gray-400 text-lg">

          {[FaGlobe, FaLinkedin, FaTwitter, FaGithub].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition transform hover:scale-110"
            >
              <Icon />
            </a>
          ))}

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © 2026{" "}
          <span className="text-white font-medium">Touch Simply</span>. All
          rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;