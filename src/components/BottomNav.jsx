import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaLayerGroup,
  FaBriefcase,
  FaUser,
  FaPlus,
} from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("user");

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Templates", path: "/templates", icon: <FaLayerGroup /> },
    { name: "Portfolio", path: "/portfolio", icon: <FaBriefcase /> },
    {
      name: isLoggedIn ? "Profile" : "Account",
      path: "/login",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl md:hidden z-50">

      <div className="flex justify-between items-center px-4 py-2 relative">

        {/* LEFT ITEMS */}
        {navItems.slice(0, 2).map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive
                  ? "text-purple-600"
                  : "text-gray-500"
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}

        {/* CENTER BUTTON */}
        <Link
          to="/editor"
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaPlus className="text-lg" />
        </Link>

        {/* RIGHT ITEMS */}
        {navItems.slice(2).map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive
                  ? "text-purple-600"
                  : "text-gray-500"
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default BottomNav;