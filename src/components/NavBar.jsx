import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="w-full flex items-center justify-between h-16 px-4 md:px-12 lg:px-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.png" className="h-10 w-10 md:h-12 md:w-12 rounded object-contain" />
            <span className="font-bold text-base text-gray-800">
              Touch Simply
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/templates" className="hover:text-blue-600">Templates</Link>
        
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>

            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-5 gap-5 text-gray-700 font-medium">

          <Link onClick={() => setMenuOpen(false)} to="/" className="hover:text-blue-600">
            🏠 Home
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/templates" className="hover:text-blue-600">
            🎨 Templates
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/" className="hover:text-blue-600">
            📞 Contact
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/login" className="hover:text-blue-600">
            🔐 Login
          </Link>

        </div>
      </div>
    </>
  );
};

export default NavBar;