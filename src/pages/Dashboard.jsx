import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FileText,
  Briefcase,
  Palette,
  Presentation,
  ArrowRight,
  Sparkles,
  FolderOpen,
  LogOut,
  User,
  Home,
  Layers3,
  Wand2,
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Search,
  BarChart3,
  Zap,
  Activity,
  Star,
  Settings,
  Crown,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const isAdmin =
    user?.role === "admin";

  // ================= TOOLS =================
  const tools = [
    {
      title: "Resume Builder",
      desc: "Create ATS friendly resumes with modern templates.",
      icon: <FileText size={28} />,
      link: "/editor",
      gradient:
        "from-purple-600 to-indigo-600",
    },

    {
      title: "Portfolio Builder",
      desc: "Build beautiful personal portfolio websites.",
      icon: <Briefcase size={28} />,
      link: "/portfolio",
      gradient:
        "from-pink-500 to-rose-500",
    },

    {
      title: "Logo Maker",
      desc: "Design premium logos instantly.",
      icon: <Palette size={28} />,
      link: "/logo",
      gradient:
        "from-emerald-500 to-teal-500",
    },

    {
      title: "Presentation Maker",
      desc: "Generate modern presentations easily.",
      icon: (
        <Presentation size={28} />
      ),
      link: "/presentation",
      gradient:
        "from-orange-500 to-amber-500",
    },
  ];

  // ================= STATS =================
  const stats = [
    {
      title: "Resumes",
      value: "12",
      icon: <FileText size={22} />,
    },

    {
      title: "Portfolios",
      value: "4",
      icon: <Briefcase size={22} />,
    },

    {
      title: "Projects",
      value: "18",
      icon: <BarChart3 size={22} />,
    },

    {
      title: "AI Credits",
      value: "120",
      icon: <Zap size={22} />,
    },
  ];

  // ================= RECENT =================
  const recent = [
    {
      id: 1,
      title: "Modern Resume",
      type: "Resume",
      route: "/editor",
    },

    {
      id: 2,
      title: "Creative Portfolio",
      type: "Portfolio",
      route: "/portfolio",
    },

    {
      id: 3,
      title: "Startup Logo",
      type: "Logo",
      route: "/logo",
    },
  ];

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#060816] text-white flex relative overflow-hidden">

      {/* BG EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition duration-300 ${
          mobileMenu
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() =>
            setMobileMenu(false)
          }
        ></div>

        <div
          className={`absolute left-0 top-0 h-full w-72 bg-[#0b1023] border-r border-white/10 p-6 overflow-y-auto transform transition duration-300 ${
            mobileMenu
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  Touch Simply
                </h1>

                <p className="text-xs text-gray-400">
                  Creative Dashboard
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <X size={24} />
            </button>

          </div>

         {/* MENU */}
      <div className="mt-10">

        {/* MAIN */}
        <div className="mb-6">

          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] px-3 mb-3">
            Main
          </p>

          <div className="space-y-3">

            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <Home size={20} />
              Dashboard
            </Link>

            <Link
              to="/templates"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <Layers3 size={20} />
              Templates
            </Link>

          </div>

        </div>

        {/* WORKSPACE */}
        <div className="mb-6">

          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] px-3 mb-3">
            Workspace
          </p>

          <div className="space-y-3">

            <Link
              to="/library"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <FolderOpen size={20} />
              My Library
            </Link>

            <Link
              to="/activity"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <Activity size={20} />
              Activity
            </Link>

            <Link
              to="/favorites"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <Star size={20} />
              Favorites
            </Link>

            <Link
              to="/chat"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <Wand2 size={20} />
              AI Assistant
            </Link>

          </div>

        </div>

        {/* ACCOUNT */}
        <div>

          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] px-3 mb-3">
            Account
          </p>

          <div className="space-y-3">

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <Settings size={20} />
              Settings
            </Link>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500"
              >
                <ShieldCheck size={20} />
                Admin Panel
              </Link>
            )}

          </div>

        </div>

        {/* UPGRADE CARD */}
        <div className="mt-8 rounded-3xl p-5 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl">

          <div className="flex items-center gap-2">

            <Crown size={20} />

            <h3 className="font-semibold">
              Upgrade Pro
            </h3>

          </div>

          <p className="text-sm mt-3 text-white/80 leading-relaxed">
            Unlock premium templates and unlimited AI tools.
          </p>

          <button className="mt-4 w-full bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition">
            Upgrade Now
          </button>

        </div>

      </div>

          {/* USER */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <User size={20} />
              </div>

              <div>
                <h3 className="font-semibold">
                  {user?.name || "User"}
                </h3>

                <p className="text-xs text-gray-400 break-all">
                  {user?.email}
                </p>

                <p className="text-xs mt-1 text-purple-400 uppercase">
                  {user?.role || "user"}
                </p>
              </div>

            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>

          {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6 sticky top-0 h-screen z-40">

        <div>

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
              <Sparkles size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Touch Simply
              </h1>

              <p className="text-xs text-gray-400">
                Creative Dashboard
              </p>
            </div>

          </div>

          {/* MENU */}
          <div className="mt-10">

            {/* MAIN */}
            <div className="mb-6">

              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] px-3 mb-3">
                Main
              </p>

              <div className="space-y-3">

                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  <Home size={20} />
                  Dashboard
                </Link>

                <Link
                  to="/templates"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <Layers3 size={20} />
                  Templates
                </Link>

              </div>

            </div>

            {/* WORKSPACE */}
            <div className="mb-6">

              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] px-3 mb-3">
                Workspace
              </p>

              <div className="space-y-3">

                <Link
                  to="/library"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <FolderOpen size={20} />
                  My Library
                </Link>

                <Link
                  to="/activity"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <Activity size={20} />
                  Activity
                </Link>

                <Link
                  to="/favorites"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <Star size={20} />
                  Favorites
                </Link>

                <Link
                  to="/chat"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <Wand2 size={20} />
                  AI Assistant
                </Link>

              </div>

            </div>

            {/* ACCOUNT */}
            <div>

              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] px-3 mb-3">
                Account
              </p>

              <div className="space-y-3">

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
                >
                  <Settings size={20} />
                  Settings
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500"
                  >
                    <ShieldCheck size={20} />
                    Admin Panel
                  </Link>
                )}

              </div>

            </div>

            {/* UPGRADE CARD */}
            <div className="mt-8 rounded-3xl p-5 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl">

              <div className="flex items-center gap-2">

                <Crown size={20} />

                <h3 className="font-semibold">
                  Upgrade Pro
                </h3>

              </div>

              <p className="text-sm mt-3 text-white/80 leading-relaxed">
                Unlock premium templates and unlimited AI tools.
              </p>

              <button className="mt-4 w-full bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition">
                Upgrade Now
              </button>

            </div>

          </div>

        </div>

        {/* USER */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <h3 className="font-semibold">
                {user?.name || "User"}
              </h3>

              <p className="text-xs text-gray-400 break-all">
                {user?.email}
              </p>

              <p className="text-xs mt-1 text-purple-400 uppercase">
                {user?.role || "user"}
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-hidden relative z-10">

        {/* TOPBAR */}
        <div className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl sticky top-0 z-40">

          <div className="px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <button
                className="lg:hidden"
                onClick={() =>
                  setMobileMenu(true)
                }
              >
                <Menu size={28} />
              </button>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Welcome Back 👋
                </h2>

                <p className="text-gray-400 text-sm mt-1 hidden sm:block">
                  Create resumes, portfolios &
                  logos faster than ever.
                </p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* SEARCH */}
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">

                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="bg-transparent outline-none text-sm w-40"
                />

              </div>

              {/* BELL */}
              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition relative">

                <Bell size={20} />

                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-purple-500"></span>

              </button>

              <Link
                to="/editor"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition shadow-2xl"
              >
                Create
              </Link>

            </div>

          </div>

        </div>

        {/* HERO */}
        <div className="px-4 sm:px-6 lg:px-10 py-10">

          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[36px] overflow-hidden">

            <div className="grid lg:grid-cols-2 gap-10 items-center p-6 sm:p-10 lg:p-14">

              {/* LEFT */}
              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
                  🚀 AI Powered Creative Platform
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">

                  Build Amazing

                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Digital Designs
                  </span>

                </h1>

                <p className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                  Create professional resumes,
                  portfolios, logos and
                  presentations with AI powered
                  tools.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  <Link
                    to="/editor"
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-center font-semibold"
                  >
                    Create Resume
                  </Link>

                  <Link
                    to="/portfolio"
                    className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-center font-semibold"
                  >
                    Build Portfolio
                  </Link>

                </div>

              </div>

              {/* RIGHT */}
              <div className="hidden lg:flex justify-center">

                <div className="relative w-full max-w-md">

                  <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-2xl opacity-30"></div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-5 shadow-2xl">

                    <div className="space-y-4">

                      <div className="h-36 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600"></div>

                      <div className="grid grid-cols-2 gap-4">

                        <div className="h-24 rounded-2xl bg-white/5"></div>

                        <div className="h-24 rounded-2xl bg-white/5"></div>

                      </div>

                      <div className="h-16 rounded-2xl bg-white/5"></div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="px-4 sm:px-6 lg:px-10">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 backdrop-blur-xl"
              >

                <div className="flex items-center justify-between">

                  <div className="text-purple-400">
                    {item.icon}
                  </div>

                  <p className="text-3xl font-bold">
                    {item.value}
                  </p>

                </div>

                <p className="mt-4 text-gray-400 text-sm">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* TOOLS */}
        <div className="px-4 sm:px-6 lg:px-10 py-10">

          <div className="mb-8">

            <h2 className="text-3xl font-bold">
              Creative Tools
            </h2>

            <p className="text-gray-400 mt-2">
              Everything you need in one
              platform.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {tools.map((tool, index) => (
              <div
                key={index}
                className="group bg-white/[0.04] border border-white/10 rounded-3xl p-6 hover:scale-[1.02] hover:-translate-y-1 transition duration-300 backdrop-blur-xl shadow-2xl"
              >

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center shadow-xl`}
                >
                  {tool.icon}
                </div>

                <div className="mt-6">

                  <h3 className="text-xl font-semibold">
                    {tool.title}
                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed text-sm">
                    {tool.desc}
                  </p>

                </div>

                <Link
                  to={tool.link}
                  className={`mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${tool.gradient} text-white font-medium shadow-lg hover:opacity-90 transition`}
                >
                  Open Tool
                  <ArrowRight size={18} />
                </Link>

              </div>
            ))}

          </div>

        </div>

        {/* AI CARD */}
        <div className="px-4 sm:px-6 lg:px-10 pb-8">

          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/10 border border-purple-500/20 rounded-3xl p-6">

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <Sparkles size={24} />
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  AI Suggestion
                </h3>

                <p className="text-gray-300 mt-2 leading-relaxed">
                  Add more project details in
                  your resume to improve ATS
                  score and recruiter visibility.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RECENT */}
        <div className="px-4 sm:px-6 lg:px-10 pb-14">

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Recent Projects
                </h2>

                <p className="text-gray-400 mt-1">
                  Continue where you left off.
                </p>

              </div>

              <Link
                to="/library"
                className="text-purple-400 flex items-center gap-1 hover:gap-2 transition"
              >
                View All
                <ChevronRight size={18} />
              </Link>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-8">

              {recent.map((item, index) => (
                <div
                  key={index}
                  className="bg-black/30 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.03] transition"
                >

                  <div className="h-36 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-white/10"></div>

                  <div className="mt-5">

                    <p className="text-xs text-purple-400 uppercase tracking-wider">
                      {item.type}
                    </p>

                    <h3 className="text-lg font-semibold mt-2">
                      {item.title}
                    </h3>

                  </div>

                  <button
                    onClick={() =>
                      navigate(item.route)
                    }
                    className="mt-5 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                  >
                    Continue Editing
                  </button>

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