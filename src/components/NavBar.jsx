import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown, FileText, Palette, Briefcase, Presentation,
  Zap, ShieldCheck, ReceiptText, LogIn, Download,
} from "lucide-react";
import UserAvatar from "./UserAvatar";
import { getWalletBalance } from "../services/walletService";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [credits, setCredits] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const location = useLocation();
  const { user, authLoading, authVerified } = useAuth();
  const hasAdminAccess = authVerified && ["ADMIN", "OWNER"].includes(String(user?.role || "").toUpperCase());
  const adminLinkLabel = String(user?.role || "").toUpperCase() === "OWNER" ? "Owner Panel" : "Admin";

  useEffect(() => {
    if (!user && !authLoading) setCreateOpen(false);
  }, [user, authLoading]);

  useEffect(() => {
    const refresh = async () => {
      if (!user || authLoading) { setCredits(null); return; }
      try {
        const w = await getWalletBalance();
        setCredits(w.data?.balance ?? 0);
      } catch (error) {
        if (error?.response?.status === 401) setCredits(null);
      }
    };
    refresh();
    window.addEventListener("touchsimply:balance-changed", refresh);
    return () => window.removeEventListener("touchsimply:balance-changed", refresh);
  }, [user, authLoading]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Slides", path: "/presentation" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (user) {
    navLinks.splice(2, 0, { name: "My Projects", path: "/projects" });
    navLinks.splice(3, 0, { name: "My Downloads", path: "/downloads" });
  }

  const createItems = [
    { label: "Resume", icon: <FileText size={15} />, to: "/templates?type=resume" },
    { label: "Logo", icon: <Palette size={15} />, to: "/logo" },
    { label: "Portfolio", icon: <Briefcase size={15} />, to: "/portfolio" },
    { label: "Presentation", icon: <Presentation size={15} />, to: "/presentation" },
  ];

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-neutral-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
          
          {/* 1. Left Side: Logo & Branding (Desktop) */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Touch Simply Home">
            <img
              src="/images/logo.png"
              className="h-12 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              alt="Touch Simply logo"
            />
            {/* Desktop Branding Text */}
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight hidden sm:block">
              <span className="text-brand-red">Touch</span>
              <span className="text-neutral-text-primary"> Simply</span>
            </span>
          </Link>

          {/* 2. Center: Mobile Branding Text (Hidden on Desktop) */}
          <div className="sm:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-brand-red">Touch</span>
              <span className="text-neutral-text-primary"> Simply</span>
            </span>
          </div>

          {/* 3. Right Side: Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-6 text-neutral-text-primary font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-2 text-sm transition-colors duration-300 group ${
                  (link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path)) ? "text-brand-red" : "hover:text-brand-red"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-red rounded-full transition-all duration-300 ${
                    (link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path)) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                {hasAdminAccess && (
                  <Link to="/admin/dashboard" className="flex items-center gap-1.5 text-sm text-neutral-text-secondary hover:text-brand-red transition">
                    <ShieldCheck size={16} /> {adminLinkLabel}
                  </Link>
                )}
                <Link to="/credits/buy" className="flex items-center gap-1 text-xs bg-brand-red/5 border border-brand-red/20 text-brand-red px-3 py-1.5 rounded-full hover:bg-brand-red/10 transition">
                  <Zap size={12} />
                  <span className="font-bold">{credits ?? "—"}</span>
                  <span>coins</span>
                </Link>
                <div className="relative">
                  <button onClick={() => setCreateOpen((v) => !v)} className="flex items-center gap-1 bg-brand-black hover:bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-300">
                    Create <ChevronDown size={14} className={`transition-transform ${createOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {createOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setCreateOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-border rounded-xl shadow-xl z-20 py-2 animate-fade-in-down">
                        {createItems.map((item) => (
                          <Link key={item.label} to={item.to} onClick={() => setCreateOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-text-primary hover:bg-brand-red/5 hover:text-brand-red transition-colors">
                            {item.icon} {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-red text-white hover:bg-brand-red-hover transition-colors text-sm font-semibold shadow-md shadow-brand-red/10">
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setMenuOpen(true)} className="text-neutral-text-primary p-2 -mr-2">
              <Menu size={28} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-neutral-border">
          <div className="flex items-center gap-2">
             <img src="/images/logo.png" alt="Touch Simply" className="h-10 w-auto" />
             <span className="text-lg font-extrabold tracking-tight">
              <span className="text-brand-red">Touch</span>
              <span className="text-neutral-text-primary"> Simply</span>
            </span>
          </div>
          <button onClick={() => setMenuOpen(false)} className="text-neutral-text-secondary hover:text-neutral-text-primary"><X size={24} /></button>
        </div>
        <div className="flex flex-col p-4 space-y-2 text-neutral-text-primary">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setMenuOpen(false)} className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${(link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path)) ? "text-brand-red bg-brand-red/5" : "hover:bg-neutral-bg"}`}>
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-neutral-border">
            {user ? (
              <div className="space-y-3">
                {hasAdminAccess && (
                  <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-brand-black/5 text-brand-black hover:bg-brand-black/10 transition">
                    <ShieldCheck size={18} /> {adminLinkLabel}
                  </Link>
                )}
                <Link to="/credits/buy" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-base bg-brand-red/10 text-brand-red rounded-lg hover:bg-brand-red/20 transition font-medium">
                  <Zap size={14} /> <span className="font-bold">{credits ?? "—"}</span> coins
                </Link>
                <Link to="/projects" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-base hover:bg-neutral-bg"><FileText size={18} /> My Projects</Link>
                <Link to="/downloads" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-base hover:bg-neutral-bg"><Download size={18} /> My Downloads</Link>
                <Link to="/transactions" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-base hover:bg-neutral-bg"><ReceiptText size={18} /> Payment History</Link>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-bg hover:bg-neutral-border/50 transition">
                  <UserAvatar user={user} size="sm" /> <span className="font-medium">Dashboard</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-red text-white hover:bg-brand-red-hover transition font-semibold">
                <LogIn size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
