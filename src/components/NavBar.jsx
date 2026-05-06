import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Library", path: "/library" },
    { name: "Slides", path: "/presentation" }
  ];

  return (
    <>
      {/* 🔥 Navbar */}
      <nav className="w-full bg-gradient-to-r from-indigo-300 via-purple-800 to-gray-900 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="w-full flex items-center justify-between h-16 px-4 md:px-12 lg:px-16">

          {/* ✅ Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              className="h-12 w-12 md:h-16 md:w-16 object-contain transition-transform duration-300 group-hover:scale-105"
              alt="logo"
            />
            <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-wide">
              Touch Simply
            </span>
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative transition duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-400"
                    : "hover:text-blue-400"
                }`}
              >
                {link.name}

                {/* 🔥 Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}

            {/* ✅ Login Button */}
            <Link
              to="/login"
              className="ml-4 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur-md border border-white/20"
            >
              Login
            </Link>

          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={25} />
          </button>
        </div>
      </nav>

      {/* 🔥 Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* 🔥 Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-gray-900 border-l border-white/10 z-50 shadow-2xl transform transition-all duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-5 p-6 text-gray-300">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`transition ${
                location.pathname === link.path
                  ? "text-blue-400"
                  : "hover:text-purple-400"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-center hover:bg-white/20 transition"
          >
            Login
          </Link>

        </div>
      </div>
    </>
  );
};

export default NavBar;