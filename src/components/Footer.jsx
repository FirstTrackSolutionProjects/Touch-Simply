import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-brand-black text-neutral-text-secondary px-6 md:px-16 pt-16 pb-28 md:pb-14 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-red/10 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-red/5 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="Touch Simply" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Build professional resumes, portfolios, and logos effortlessly with our modern tools and templates.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="mailto:support@touchsimply.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <FaEnvelope /> support@touchsimply.com
              </a>
              <a href="tel:+919040170727" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                <FaPhoneAlt /> +91 9040170727
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase text-sm mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[ { to: "/about", label: "About Us" }, { to: "/blog", label: "Blog" }, { to: "/contact", label: "Contact" } ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-400 hover:text-brand-red transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase text-sm mb-5">Legal</h4>
            <ul className="space-y-3 text-sm">
              {[ { to: "/faq", label: "FAQ" }, { to: "/privacy-policy", label: "Privacy Policy" }, { to: "/terms", label: "Terms & Conditions" }, { to: "/refund", label: "Refund Policy" } ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-400 hover:text-brand-red transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase text-sm mb-5">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates and offers.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 text-sm rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition" />
              <button className="bg-brand-red px-6 py-2.5 text-sm rounded-lg hover:bg-brand-red-hover transition-colors text-white font-semibold shadow-lg shadow-brand-red/20">Join</button>
            </form>
            <p className="text-xs text-gray-500 mt-2">No spam. Only useful updates.</p>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-5 mt-16">
          {[FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaFacebook, FaYoutube].map((Icon, i) => (
            <a key={i} href="#" aria-label="Social media link" className="p-2.5 rounded-full bg-gray-900 text-gray-400 hover:bg-brand-red hover:text-white transition-all transform hover:scale-110">
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Touch Simply by <span className="text-gray-300 font-medium">First Track Solution Technologies</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;