import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import { getWalletBalance } from "../services/walletService";
import {
  FileText, Briefcase, Palette, Presentation, Sparkles, FolderOpen,
  LogOut, User, UserRound, Home, Layers3, Settings, Crown, Zap, Menu, X,
  Search, Bell, BarChart3, Activity, Star, ChevronRight, ShieldCheck
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [credits, setCredits] = useState(null);
  const isAdmin = ["ADMIN", "OWNER"].includes(String(user?.role || "").toUpperCase());

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
    { title: "Resume Builder", desc: "Create ATS friendly resumes with modern templates.", icon: <FileText size={24} />, link: "/editor", gradient: "from-brand-black to-gray-800" },
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
    { id: 1, title: "Modern Resume", type: "Resume", route: "/editor", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Creative Portfolio", type: "Portfolio", route: "/portfolio", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Startup Logo", type: "Logo", route: "/logo", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80" },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white font-bold text-xl shadow-md shadow-brand-red/20">T</div>
        <div>
          <h1 className="text-xl font-extrabold text-neutral-text-primary tracking-tight">Touch <span className="text-brand-red">Simply</span></h1>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-xs text-neutral-text-secondary uppercase tracking-[0.2em] px-3 mb-3 font-semibold">Main</p>
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-red/10 text-brand-red font-semibold">
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/templates" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-text-secondary hover:bg-neutral-bg transition-colors">
          <Layers3 size={18} /> Templates
        </Link>

        <p className="text-xs text-neutral-text-secondary uppercase tracking-[0.2em] px-3 mt-6 mb-3 font-semibold">Workspace</p>
        <Link to="/library" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-text-secondary hover:bg-neutral-bg transition-colors">
          <FolderOpen size={18} /> My Library
        </Link>
        <Link to="/transactions" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-text-secondary hover:bg-neutral-bg transition-colors">
          <Activity size={18} /> Activity
        </Link>
        <Link to="/chat" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-text-secondary hover:bg-neutral-bg transition-colors">
          <Sparkles size={18} /> AI Assistant
        </Link>

        <p className="text-xs text-neutral-text-secondary uppercase tracking-[0.2em] px-3 mt-6 mb-3 font-semibold">Account</p>
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-text-secondary hover:bg-neutral-bg transition-colors">
          <UserRound size={18} /> My Profile
        </Link>
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-text-secondary hover:bg-neutral-bg transition-colors">
          <Settings size={18} /> Settings
        </Link>
        {isAdmin && (
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-black text-white hover:bg-black transition-colors mt-2">
            <ShieldCheck size={18} /> Admin Panel
          </Link>
        )}
      </nav>

      <div className="mt-8 space-y-4">
        <div className="bg-neutral-bg rounded-xl p-4 border border-neutral-border">
          <div className="flex items-center gap-2 text-brand-black font-semibold mb-2">
            <Zap size={16} className="text-brand-red" /> Coins
          </div>
          <p className="text-2xl font-extrabold text-neutral-text-primary">{credits ?? "—"}</p>
          <Link to="/credits/buy" className="mt-3 block text-center w-full bg-brand-red text-white text-xs font-bold py-2 rounded-lg hover:bg-brand-red-hover transition">Buy More</Link>
        </div>
        <button onClick={logout} className="flex items-center justify-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-neutral-text-secondary hover:text-brand-red hover:bg-brand-red/5 rounded-lg transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-bg flex">
      {/* Mobile Overlay */}
      {mobileMenu && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenu(false)} />}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-border p-4 flex flex-col transform transition-transform lg:hidden ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4 p-2 text-neutral-text-secondary" onClick={() => setMobileMenu(false)}><X size={20} /></button>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-border p-4 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* TOPBAR */}
        <header className="bg-white/80 backdrop-blur-md border-b border-neutral-border sticky top-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 text-neutral-text-primary" onClick={() => setMobileMenu(true)}><Menu size={24} /></button>
            <div>
              <h2 className="text-xl font-bold text-neutral-text-primary">Welcome Back 👋</h2>
              <p className="text-neutral-text-secondary text-sm mt-1 hidden sm:block">Create resumes, portfolios & logos faster than ever.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-neutral-bg border border-neutral-border rounded-xl px-4 py-2.5">
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
            <Link to="/editor" className="hidden sm:flex px-5 py-2.5 rounded-xl bg-brand-black text-white text-sm font-semibold hover:bg-black transition shadow-md">
              Create
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10">
          
          {/* HERO BANNER */}
          <div className="bg-brand-black rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 blur-3xl rounded-full pointer-events-none"></div>
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
                  <Link to="/editor" className="px-7 py-3.5 rounded-xl bg-brand-red text-white text-center font-semibold hover:bg-brand-red-hover transition">
                    Create Resume
                  </Link>
                  <Link to="/portfolio" className="px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-center font-semibold transition">
                    Build Portfolio
                  </Link>
                </div>
              </div>
              <div className="relative w-full max-w-xl hidden lg:block">
                <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-3xl"></div>
                <img
                  src="/images/hero-section.jpg"
                  alt="Dashboard"
                  className="relative z-10 w-full rounded-3xl border border-white/10 shadow-2xl"
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
          <div className="bg-white border border-neutral-border rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                  <Zap size={26} className="text-brand-red" />
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
                className="inline-flex items-center justify-center gap-2 bg-brand-black text-white font-bold px-8 py-3.5 rounded-xl hover:bg-black transition shadow-lg"
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
                className="bg-white border border-neutral-border rounded-3xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-red/30"
              >
                <div className="flex items-center justify-between">
                  <div className="text-brand-red">{item.icon}</div>
                  <p className="text-2xl md:text-3xl font-extrabold text-neutral-text-primary">{item.value}</p>
                </div>
                <p className="mt-3 md:mt-4 text-neutral-text-secondary text-sm font-medium">{item.title}</p>
                <p className="text-green-600 text-xs mt-2 font-medium">+12% this month</p>
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
          <div className="bg-gradient-to-r from-brand-red/5 to-transparent border border-brand-red/10 rounded-3xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-brand-black flex items-center justify-center shadow-lg">
                <Sparkles size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-neutral-text-primary">AI Suggestion</h3>
                <p className="text-neutral-text-secondary mt-2 leading-relaxed text-sm md:text-base">
                  Add more project details in your resume to improve ATS score and recruiter visibility. Our AI can help you write better descriptions.
                </p>
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
              <Link to="/library" className="text-brand-red flex items-center gap-1 hover:gap-2 transition-all text-sm font-semibold">
                View All <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((item) => (
                <div key={item.id} className="border border-neutral-border rounded-2xl p-4 hover:border-brand-red/30 hover:shadow-md transition group bg-neutral-bg">
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
                    className="mt-4 w-full flex items-center justify-center py-2.5 rounded-lg bg-white border border-neutral-border hover:bg-brand-black hover:text-white transition text-sm font-semibold text-neutral-text-primary"
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
