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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-md md:hidden z-50">

      {/* Glass Container */}
      <div className="relative flex justify-between items-center px-5 py-3 
                      bg-white/80 backdrop-blur-xl 
                      border border-gray-200 
                      shadow-2xl rounded-2xl">

        {/* LEFT ITEMS */}
        {navItems.slice(0, 2).map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center justify-center relative group"
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute -top-2 w-10 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></span>
              )}

              {/* Icon */}
              <div
                className={`text-lg transition ${
                  isActive
                    ? "text-purple-600 scale-110"
                    : "text-gray-500 group-hover:text-purple-500"
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] mt-1 transition ${
                  isActive
                    ? "text-purple-600 font-semibold"
                    : "text-gray-500 group-hover:text-purple-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* CENTER BUTTON (Floating) */}
        <Link
          to="/library"
          className="absolute -top-7 left-1/2 -translate-x-1/2 
                     bg-gradient-to-r from-purple-600 to-indigo-600 
                     text-white p-4 rounded-full shadow-xl 
                     hover:scale-110 active:scale-95 transition"
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
              className="flex flex-col items-center justify-center relative group"
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute -top-2 w-10 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></span>
              )}

              {/* Icon */}
              <div
                className={`text-lg transition ${
                  isActive
                    ? "text-purple-600 scale-110"
                    : "text-gray-500 group-hover:text-purple-500"
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] mt-1 transition ${
                  isActive
                    ? "text-purple-600 font-semibold"
                    : "text-gray-500 group-hover:text-purple-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;