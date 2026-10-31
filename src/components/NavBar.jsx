// Touch-Simply/src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  FileText,
  Palette,
  Briefcase,
  Presentation,
  Zap,
  FolderOpen,
  ShieldCheck,
  ReceiptText,
} from "lucide-react";
import UserAvatar from "./UserAvatar";
import { getWalletBalance } from "../services/walletService";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [credits, setCredits] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const location = useLocation();
  const { user, authLoading } = useAuth();
  const hasAdminAccess = ["ADMIN", "OWNER"].includes(String(user?.role || "").toUpperCase());
  const adminLinkLabel = String(user?.role || "").toUpperCase() === "OWNER" ? "Owner panel" : "Admin";

  useEffect(() => {
    const refresh = async () => {
      if (!user || authLoading) return;
      try {
        const w = await getWalletBalance();
        setCredits(w.data?.balance ?? 0);
      } catch (error) {
        console.error(error);
      }
    };
    refresh();
    // Listen for balance changes from other components (e.g. after recharge)
    window.addEventListener("touchsimply:balance-changed", refresh);
    return () => window.removeEventListener("touchsimply:balance-changed", refresh);
  }, [user, authLoading]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Templates", path: "/templates" },
    { name: "Projects", path: "/library" }, // Added Projects link
    { name: "Slides", path: "/presentation" },
    { name: "Contact", path: "/contact" },
    { name: "Chat", path: "/chat" },
  ];

  const createItems = [
    { label: "Resume", icon: <FileText size={15} />, to: "/templates?type=resume" },
    { label: "Logo", icon: <Palette size={15} />, to: "/logo" },
    { label: "Portfolio", icon: <Briefcase size={15} />, to: "/portfolio" },
    { label: "Presentation", icon: <Presentation size={15} />, to: "/presentation" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-indigo-300 via-purple-800 to-gray-900 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="w-full flex items-center justify-between h-16 px-4 md:px-12 lg:px-16">
          {/* Logo */}
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

          {/* Desktop Menu */}
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
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0"
                  }`}
                ></span>
              </Link>
            ))}

            {/* User Avatar / Credits / Create */}
            {user ? (
              <div className="flex items-center gap-3">
                {hasAdminAccess && (
                  <Link
                    to="/admin/dashboard"
                    className="hidden lg:flex items-center gap-1.5 text-sm text-white/90 hover:text-white"
                  >
                    <ShieldCheck size={16} /> {adminLinkLabel}
                  </Link>
                )}
                {/* Credits badge - clickable to buy credits */}
                <Link
                  to="/credits/buy"
                  className="hidden md:flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full hover:bg-amber-100 transition"
                >
                  <Zap size={12} className="text-amber-500" />
                  <span className="font-bold">{credits ?? "—"}</span>
                  <span>credits</span>
                </Link>
                <Link to="/transactions" className="hidden lg:flex items-center gap-1.5 text-sm text-white/90 hover:text-white"><ReceiptText size={16} /> History</Link>

                {/* CREATE dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setCreateOpen((v) => !v)}
                    className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                  >
                    Create <ChevronDown size={14} />
                  </button>
                  {createOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setCreateOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-2xl z-20 py-2">
                        {createItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setCreateOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {item.icon} {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Avatar */}
                <Link
                  to="/dashboard"
                  className="hover:scale-105 transition"
                >
                  <UserAvatar user={user} size="sm" />
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={25} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-gray-900 border-l border-white/10 z-50 shadow-2xl transform transition-all duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            <X size={22} />
          </button>
        </div>

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

          {user ? (
            <>
              {hasAdminAccess && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-900/50 text-purple-100 hover:bg-purple-800/60"
                >
                  <ShieldCheck size={16} /> {adminLinkLabel}
                </Link>
              )}
              <Link
                to="/credits/buy"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs bg-amber-900/40 border border-amber-700/50 text-amber-200 px-3 py-2 rounded-lg"
              >
                <Zap size={12} />
                <span className="font-bold">{credits ?? "—"}</span>
                <span>credits</span>
              </Link>
              <Link to="/transactions" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm text-gray-200"><ReceiptText size={16} /> Payment history</Link>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 mt-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <UserAvatar user={user} size="sm" />
                <span>Dashboard</span>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-center hover:bg-white/20 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
