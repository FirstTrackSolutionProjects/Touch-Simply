import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import PageBackButton from "../components/PageBackButton";
import { getWalletBalance } from "../services/walletService";
import {
  FileText, Briefcase, Palette, Presentation, Sparkles, FolderOpen,
  LogOut, User, UserRound, Home, Layers3, Settings, Crown, Zap, Menu, X,
  Search, Bell, BarChart3, Activity, Star, ChevronRight, ShieldCheck,
  Download
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, authVerified } = useAuth();
  const NAV_H = 100; // top navbar ki height (px), apne hisaab se adjust karo
  const firstName = String(user?.first_name || user?.name || user?.fullName || "").split(" ")[0];

  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [credits, setCredits] = useState(null);
  const isAdmin = authVerified && ["ADMIN", "OWNER"].includes(String(user?.role || "").toUpperCase());

  const RATE_PER_CREDIT = 7;

  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const w = await getWalletBalance();
        setCredits(w.data?.balance ?? 0);
      } catch (err) {
        if (err?.response?.status !== 401) console.error("Failed to fetch balance", err);
      }
    };
    if (user) fetchBalance();
  }, [user]);

  // ================= TOOLS =================
  const tools = [
    { title: "Resume Builder", desc: "Create ATS friendly resumes with modern templates.", icon: <FileText size={24} />, link: "/templates?type=resume", gradient: "from-brand-black to-gray-800" },
    { title: "Portfolio Builder", desc: "Build beautiful personal portfolio websites.", icon: <Briefcase size={24} />, link: "/portfolio", gradient: "from-brand-red to-red-700" },
    { title: "Logo Maker", desc: "Design premium logos instantly.", icon: <Palette size={24} />, link: "/logo", gradient: "from-gray-700 to-gray-900" },
    { title: "Presentation Maker", desc: "Generate modern presentations easily.", icon: <Presentation size={24} />, link: "/presentation", gradient: "from-red-600 to-brand-red" },
  ];

  // ================= STATS =================
  const stats = [
    { title: "Resumes", value: "12", icon: <FileText size={22} /> },
    { title: "Portfolios", value: "4", icon: <Briefcase size={22} /> },
    { title: "Projects", value: "18", icon: <BarChart3 size={22} /> },
    { title: "AI Coins", value: credits !== null ? String(credits) : "—", icon: <Zap size={22} /> },
  ];

  // ================= RECENT =================
  const recent = [
    { id: 1, title: "Modern Resume", type: "Resume", route: "/templates?type=resume", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Creative Portfolio", type: "Portfolio", route: "/portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Startup Logo", type: "Logo", route: "/logo", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80" },
  ];

  // ================= SIDEBAR =================
  const navGroups = [
    { label: "Main", items: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/templates", label: "Templates", icon: Layers3 },
    ]},
    { label: "Workspace", items: [
      { to: "/projects", label: "My Projects", icon: FolderOpen },
      { to: "/downloads", label: "My Downloads", icon: Download },
      { to: "/transactions", label: "Activity", icon: Activity },
      { to: "/chat", label: "AI Assistant", icon: Sparkles, badge: "AI" },
    ]},
    { label: "Account", items: [
      { to: "/profile", label: "My Profile", icon: UserRound },
      { to: "/settings", label: "Settings", icon: Settings },
    ]},
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full min-h-0">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-4 px-2 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-brand-red/30 ring-4 ring-brand-red/10">T</div>
        <h1 className="text-xl font-extrabold text-neutral-text-primary tracking-tight">
          Touch <span className="text-brand-red">Simply</span>
        </h1>
      </div>

      {/* User mini card */}
      <div className="mb-4 flex items-center gap-3 p-2.5 rounded-2xl bg-neutral-bg border border-neutral-border shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-brand-black text-white flex items-center justify-center font-bold">
            {(firstName || "U").charAt(0).toUpperCase()}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-neutral-text-primary truncate">{firstName || "Welcome"}</p>
          <p className="text-[11px] text-neutral-text-secondary truncate">{isAdmin ? "Owner / Admin" : "Creator"}</p>
        </div>
      </div>

      {/* Nav (scrollable area) */}
      <nav className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-1 -mr-1 sidebar-scroll">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] text-neutral-text-secondary uppercase tracking-[0.22em] px-3 mb-1.5 font-bold">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenu(false)}
                    className={`group relative flex items-center gap-3 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-brand-red/10 text-brand-red"
                        : "text-neutral-text-secondary hover:bg-neutral-bg hover:text-neutral-text-primary hover:translate-x-0.5"
                    }`}
                  >
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-brand-red" />}
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      active
                        ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                        : "bg-neutral-bg group-hover:bg-white group-hover:shadow-sm"
                    }`}>
                      <Icon size={16} />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-brand-red text-white">{item.badge}</span>
                    )}
                  </Link>
                );
              })}
              {group.label === "Account" && isAdmin && (
                <Link to="/admin/dashboard" className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-brand-black text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg mt-2">
                  <ShieldCheck size={18} className="text-brand-red" />
                  <span className="flex-1">Admin Panel</span>
                  <ChevronRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom (always visible, never overlaps nav) */}
      <div className="mt-3 space-y-2 shrink-0">
        <div className="relative overflow-hidden rounded-2xl bg-brand-black p-3 text-white">
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-brand-red/40 blur-2xl rounded-full pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <Zap size={14} className="text-brand-red" /> Coins
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10">1 = ₹{RATE_PER_CREDIT}</span>
          </div>
          <p className="relative text-2xl font-extrabold mt-1">{credits ?? "—"}</p>
          <div className="relative mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-brand-red transition-all duration-700" style={{ width: `${Math.min(((credits || 0) / 50) * 100, 100)}%` }} />
          </div>
          <Link to="/credits/buy" className="relative mt-3 block text-center w-full bg-brand-red text-white text-xs font-bold py-2 rounded-xl hover:bg-brand-red-hover transition shadow-lg shadow-brand-red/30">
            Buy More
          </Link>
        </div>
        <button onClick={logout} className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold text-neutral-text-secondary hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-bg flex">
      {/* Sidebar thin scrollbar (separate CSS file ki zaroorat nahi) */}
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 9999px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll { scrollbar-width: thin; }
      `}</style>

      {/* Mobile Overlay */}
      {mobileMenu && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenu(false)} />}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-border p-4 pt-12 flex flex-col transform transition-transform lg:hidden ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4 p-2 text-neutral-text-secondary" onClick={() => setMobileMenu(false)}><X size={20} /></button>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
        className="hidden lg:flex flex-col w-72 shrink-0 bg-white border-r border-neutral-border p-4 sticky overflow-hidden self-start"
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        {/* TOPBAR */}
        <header className="flex items-center justify-between gap-4 border-b border-neutral-border bg-white px-4 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 text-neutral-text-primary" onClick={() => setMobileMenu(true)}><Menu size={24} /></button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-text-primary tracking-tight">Welcome Back{firstName ? `, ${firstName}` : ""} 👋</h2>
              <p className="text-neutral-text-secondary text-sm mt-1 hidden sm:block">Create resumes, portfolios & logos faster than ever.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-neutral-bg border border-neutral-border rounded-xl px-4 py-2.5 transition-all focus-within:bg-white focus-within:border-brand-red/40 focus-within:ring-4 focus-within:ring-brand-red/10">
              <Search size={18} className="text-neutral-text-secondary" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-40 text-neutral-text-primary placeholder-neutral-text-secondary"
              />
            </div>
            <button className="w-10 h-10 rounded-xl bg-white border border-neutral-border flex items-center justify-center hover:bg-neutral-bg transition relative">
              <Bell size={20} className="text-neutral-text-secondary" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-red border-2 border-white"></span>
            </button>
            <Link to="/templates?type=resume" className="hidden sm:flex px-5 py-2.5 rounded-xl bg-brand-black text-white text-sm font-semibold hover:bg-black transition shadow-md">
              Create
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10 overflow-x-clip">
          <PageBackButton fallback="/" />

          {/* HERO BANNER */}
          <div className="bg-brand-black rounded-[2rem] overflow-hidden relative shadow-2xl shadow-black/20 ring-1 ring-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/25 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-red/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
            <div className="grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-semibold mb-6">
                  🚀 AI Powered Creative Platform
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  Build Amazing
                  <span className="block text-brand-red">
                    Digital Designs
                  </span>
                </h1>
                <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
                  Create professional resumes, portfolios, logos and presentations with AI powered tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link to="/templates?type=resume" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red text-white font-semibold hover:bg-brand-red-hover hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-red/30">
                    Create Resume <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/portfolio" className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 hover:-translate-y-0.5 backdrop-blur text-white font-semibold transition-all">
                    Build Portfolio
                  </Link>
                </div>
              </div>
              <div className="relative w-full max-w-xl hidden lg:block">
                <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-3xl"></div>
                <img
                  src="/images/hero-section.jpg"
                  alt="Dashboard"
                  className="relative z-10 w-full rounded-3xl border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute -top-6 -left-6 bg-brand-black border border-white/10 rounded-2xl p-4 z-20">
                  <p className="text-xs text-gray-400">AI Resume Score</p>
                  <h3 className="text-2xl font-bold text-green-400">92%</h3>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-brand-black border border-white/10 rounded-2xl p-4 z-20">
                  <p className="text-xs text-gray-400">Projects</p>
                  <h3 className="text-2xl font-bold text-white">18+</h3>
                </div>
              </div>
            </div>
          </div>

          {/* RECHARGE COINS SECTION */}
          <div className="relative overflow-hidden bg-white border border-neutral-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-brand-red/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center shadow-lg shadow-brand-red/30">
                  <Zap size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-text-primary">Recharge Coins</h3>
                  <p className="text-neutral-text-secondary mt-1 text-sm md:text-base">
                    You currently have <span className="font-bold text-brand-red">{credits ?? "—"} coins</span>.
                  </p>
                  <p className="text-neutral-text-secondary mt-1 text-sm">
                    Conversion rate: <span className="font-semibold text-neutral-text-primary">1 coin = ₹{RATE_PER_CREDIT}</span> (e.g., 4 coins = ₹{4 * RATE_PER_CREDIT})
                  </p>
                </div>
              </div>
              <Link
                to="/credits/buy"
                className="inline-flex items-center justify-center gap-2 bg-brand-black text-white font-bold px-8 py-3.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
              >
                Buy Coins
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white border border-neutral-border rounded-3xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-red/30"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-brand-red/5 group-hover:bg-brand-red/10 group-hover:scale-125 transition-all duration-500"></div>
                <div className="relative flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-red/30 transition-all">{item.icon}</div>
                  <p className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary tracking-tight">{item.value}</p>
                </div>
                <p className="relative mt-4 text-neutral-text-secondary text-sm font-semibold">{item.title}</p>
                <p className="relative inline-flex items-center gap-1 mt-2 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[11px] font-bold">↑ +12% this month</p>
              </div>
            ))}
          </div>

          {/* TOOLS - USING ToolCard COMPONENT */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-text-primary">Creative Tools</h2>
              <p className="text-neutral-text-secondary mt-2">Everything you need in one platform.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </div>

          {/* AI CARD */}
          <div className="relative overflow-hidden bg-gradient-to-r from-brand-red/10 via-brand-red/5 to-transparent border border-brand-red/15 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-brand-black flex items-center justify-center shadow-lg">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-neutral-text-primary">AI Suggestion</h3>
                <p className="text-neutral-text-secondary mt-2 leading-relaxed text-sm md:text-base">
                  Add more project details in your resume to improve ATS score and recruiter visibility. Our AI can help you write better descriptions.
                </p>
                <Link to="/chat" className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-brand-red hover:gap-2 transition-all">
                  Try AI Assistant <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* RECENT */}
          <div className="bg-white border border-neutral-border rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-neutral-text-primary">Recent Projects</h2>
                <p className="text-neutral-text-secondary mt-1 text-sm">Continue where you left off.</p>
              </div>
              <Link to="/projects" className="text-brand-red flex items-center gap-1 hover:gap-2 transition-all text-sm font-semibold">
                View All <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((item) => (
                <div key={item.id} className="border border-neutral-border rounded-2xl p-4 hover:border-brand-red/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-neutral-bg">
                  <div className="relative h-40 sm:h-44 rounded-xl overflow-hidden border border-neutral-border">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-brand-red text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {item.type}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-brand-red font-semibold uppercase tracking-wider">{item.type}</p>
                    <h3 className="text-base md:text-lg font-bold text-neutral-text-primary mt-1">{item.title}</h3>
                  </div>
                  <Link
                    to={item.route}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-neutral-border hover:bg-brand-black hover:text-white hover:border-brand-black transition-all text-sm font-semibold text-neutral-text-primary"
                  >
                    Continue Editing
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;