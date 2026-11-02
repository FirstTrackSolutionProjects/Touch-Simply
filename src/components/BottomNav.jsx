import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaLayerGroup, FaBriefcase, FaUser, FaPlus } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Templates", path: "/templates", icon: <FaLayerGroup /> },
    { name: "Portfolio", path: "/portfolio", icon: <FaBriefcase /> },
    { name: isLoggedIn ? "Profile" : "Account", path: isLoggedIn ? "/dashboard" : "/login", icon: <FaUser /> },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-md md:hidden z-50">
      <div className="relative flex justify-between items-center px-5 py-3 bg-white/90 backdrop-blur-xl border border-neutral-border shadow-2xl rounded-2xl">
        
        {/* LEFT ITEMS */}
        {navItems.slice(0, 2).map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={index} to={item.path} className="flex flex-col items-center justify-center relative group">
              {isActive && <span className="absolute -top-2 w-10 h-1 bg-brand-red rounded-full"></span>}
              <div className={`text-lg transition ${isActive ? "text-brand-red scale-110" : "text-gray-500 group-hover:text-brand-red"}`}>{item.icon}</div>
              <span className={`text-[11px] mt-1 transition ${isActive ? "text-brand-red font-semibold" : "text-gray-500 group-hover:text-brand-red"}`}>{item.name}</span>
            </Link>
          );
        })}

        {/* CENTER BUTTON (Floating) */}
        <Link to="/templates?type=resume" aria-label="Create a resume: choose a template" title="Choose a resume template" className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-black text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition border-4 border-white">
          <FaPlus className="text-lg" />
        </Link>

        {/* RIGHT ITEMS */}
        {navItems.slice(2).map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={index} to={item.path} className="flex flex-col items-center justify-center relative group">
              {isActive && <span className="absolute -top-2 w-10 h-1 bg-brand-red rounded-full"></span>}
              <div className={`text-lg transition ${isActive ? "text-brand-red scale-110" : "text-gray-500 group-hover:text-brand-red"}`}>{item.icon}</div>
              <span className={`text-[11px] mt-1 transition ${isActive ? "text-brand-red font-semibold" : "text-gray-500 group-hover:text-brand-red"}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
