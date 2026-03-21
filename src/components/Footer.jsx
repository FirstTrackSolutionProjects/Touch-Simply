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
    <footer className="bg-gray-950 text-gray-300 px-6 md:px-16 py-12 mt-10">

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Touch Simply</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Build professional resumes effortlessly with modern templates,
            smart tools, and real-time editing.
          </p>

          {/* Contact Info */}
          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <FaEnvelope /> support@touchsimply.com
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> +91 98765 43210
            </p>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-white transition">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to get latest updates
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition text-white">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Social Section */}
      <div className="flex justify-center gap-6 mt-10 text-gray-400 text-lg">
        <a href="#" className="hover:text-white transition">
          <FaGlobe />
        </a>
        <a href="#" className="hover:text-white transition">
          <FaLinkedin />
        </a>
        <a href="#" className="hover:text-white transition">
          <FaTwitter />
        </a>
        <a href="#" className="hover:text-white transition">
          <FaGithub />
        </a>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © 2026{" "}
        <span className="text-white font-medium">Touch Simply</span>. All rights
        reserved.
      </div>

    </footer>
  );
};

export default Footer;