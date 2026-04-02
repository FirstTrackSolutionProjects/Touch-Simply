import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FaHome, FaPaintBrush, FaUser, FaEnvelope, FaSignInAlt } from "react-icons/fa";

const NavBar = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-indigo-300 via-purple-800 to-gray-900 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="w-full flex items-center justify-between h-16 px-4 md:px-12 lg:px-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              className="h-14 w-14 md:h-20 md:w-20 object-contain"
              alt="logo"
            />
              <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-wide">
                Touch Simply
              </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/templates" className="hover:text-blue-600">Templates</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>

            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </div>

          {/* Mobile Button */}
          {/* <button
            className="md:hidden text-2xl text-white"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button> */}
        </div>
      </nav>

    {/* Overlay */}
      {/* <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      /> */}

      {/* Side Drawer */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900 border-l border-white/10 z-50 shadow-2xl transform transition-all duration-300 ease-out ${
          menuOpen
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }`}
      > */}
        {/* Header */}
        {/* <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-bold text-lg text-white">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl text-white hover:text-purple-400 transition"
          >
            ✕
          </button>
        </div> */}

       {/* Menu Items */}
        {/* <div className="flex flex-col p-6 gap-6 text-gray-300 font-medium"> */}

          {/* <Link
            onClick={() => setMenuOpen(false)}
            to="/"
            className="flex items-center gap-3 hover:text-purple-400 transition transform hover:translate-x-1"
          >
            <FaHome className="text-lg" />
            Home
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/templates"
            className="flex items-center gap-3 hover:text-purple-400 transition transform hover:translate-x-1"
          >
            <FaPaintBrush className="text-lg" />
            Templates
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/about"
            className="flex items-center gap-3 hover:text-purple-400 transition transform hover:translate-x-1"
          >
            <FaUser className="text-lg" />
            About
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/contact"
            className="flex items-center gap-3 hover:text-purple-400 transition transform hover:translate-x-1"
          >
            <FaEnvelope className="text-lg" />
            Contact
          </Link> */}


        {/* </div>
      </div> */}
    </>
  );
};

export default NavBar;