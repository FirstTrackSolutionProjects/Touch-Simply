// // src/pages/Dashboard.jsx

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// import {
//   FileText,
//   Briefcase,
//   Palette,
//   Presentation,
//   ArrowRight,
//   Sparkles,
//   FolderOpen,
//   LogOut,
//   User,
//   Home,
//   Layers3,
//   Wand2,
//   ChevronRight,
// } from "lucide-react";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const user =
//     JSON.parse(
//       localStorage.getItem("user")
//     ) || {};

//   const tools = [
//     {
//       title: "Resume Builder",
//       desc: "Create ATS friendly resumes with modern templates.",
//       icon: <FileText size={28} />,
//       link: "/editor",
//       gradient:
//         "from-purple-600 to-indigo-600",
//     },

//     {
//       title: "Portfolio Builder",
//       desc: "Build beautiful personal portfolio websites.",
//       icon: <Briefcase size={28} />,
//       link: "/portfolio",
//       gradient:
//         "from-pink-500 to-rose-500",
//     },

//     {
//       title: "Logo Maker",
//       desc: "Design premium logos for your brand instantly.",
//       icon: <Palette size={28} />,
//       link: "/logo",
//       gradient:
//         "from-emerald-500 to-teal-500",
//     },

//     {
//       title: "Presentation Maker",
//       desc: "Generate modern business presentations easily.",
//       icon: <Presentation size={28} />,
//       link: "/presentation",
//       gradient:
//         "from-orange-500 to-amber-500",
//     },
//   ];

//   const recent = [
//     {
//       title: "Modern Resume",
//       type: "Resume",
//     },

//     {
//       title: "Creative Portfolio",
//       type: "Portfolio",
//     },

//     {
//       title: "Startup Logo",
//       type: "Logo",
//     },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-[#060816] text-white flex">

//       {/* ================= SIDEBAR ================= */}
//       <aside className="hidden lg:flex w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6 sticky top-0 h-screen">

//         <div>

//           {/* LOGO */}
//           <div className="flex items-center gap-3">

//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl">
//               <Sparkles size={22} />
//             </div>

//             <div>
//               <h1 className="text-xl font-bold">
//                 Touch Simply
//               </h1>

//               <p className="text-xs text-gray-400">
//                 Creative Dashboard
//               </p>
//             </div>

//           </div>

//           {/* MENU */}
//           <div className="mt-10 space-y-3">

//             <Link
//               to="/dashboard"
//               className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
//             >
//               <Home size={20} />
//               Dashboard
//             </Link>

//             <Link
//               to="/templates"
//               className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
//             >
//               <Layers3 size={20} />
//               Templates
//             </Link>

//             <Link
//               to="/library"
//               className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
//             >
//               <FolderOpen size={20} />
//               My Library
//             </Link>

//             <Link
//               to="/chat"
//               className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
//             >
//               <Wand2 size={20} />
//               AI Assistant
//             </Link>

//           </div>

//         </div>

//         {/* USER */}
//         <div className="bg-white/5 border border-white/10 rounded-3xl p-4">

//           <div className="flex items-center gap-3">

//             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
//               <User size={20} />
//             </div>

//             <div>
//               <h3 className="font-semibold">
//                 {user?.name || "User"}
//               </h3>

//               <p className="text-xs text-gray-400">
//                 {user?.email}
//               </p>
//             </div>

//           </div>

//           <button
//             onClick={handleLogout}
//             className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>

//         </div>

//       </aside>

//       {/* ================= MAIN ================= */}
//       <main className="flex-1 overflow-hidden">

//         {/* TOPBAR */}
//         <div className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl sticky top-0 z-50">

//           <div className="px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">

//             <div>

//               <h2 className="text-2xl font-bold">
//                 Welcome Back 👋
//               </h2>

//               <p className="text-gray-400 text-sm mt-1">
//                 Create resumes, portfolios & logos faster than ever.
//               </p>

//             </div>

//             <div className="flex items-center gap-3">

//               <Link
//                 to="/templates"
//                 className="hidden sm:flex px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
//               >
//                 Browse Templates
//               </Link>

//               <Link
//                 to="/editor"
//                 className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition shadow-2xl"
//               >
//                 Create Now
//               </Link>

//             </div>

//           </div>

//         </div>

//         {/* HERO */}
//         <div className="relative overflow-hidden">

//           {/* BG GLOW */}
//           <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

//           <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

//           <div className="relative px-4 sm:px-6 lg:px-10 py-10">

//             <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[36px] overflow-hidden">

//               <div className="grid lg:grid-cols-2 gap-10 items-center p-6 sm:p-10 lg:p-14">

//                 {/* LEFT */}
//                 <div>

//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
//                     🚀 AI Powered Creative Platform
//                   </div>

//                   <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">

//                     Build Amazing

//                     <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//                       Digital Designs
//                     </span>

//                   </h1>

//                   <p className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">

//                     Create professional resumes, stunning portfolios,
//                     logos and presentations with modern templates,
//                     AI tools and instant downloads.

//                   </p>

//                   {/* BUTTONS */}
//                   <div className="flex flex-col sm:flex-row gap-4 mt-8">

//                     <Link
//                       to="/editor"
//                       className="px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-2xl hover:scale-105 transition duration-300 text-center"
//                     >
//                       Create Resume
//                     </Link>

//                     <Link
//                       to="/portfolio"
//                       className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition duration-300 text-center"
//                     >
//                       Build Portfolio
//                     </Link>

//                   </div>

//                   {/* TAGS */}
//                   <div className="flex flex-wrap gap-3 mt-8">

//                     {[
//                       "100+ Templates",
//                       "AI Assisted",
//                       "Instant Download",
//                       "Mobile Friendly",
//                     ].map((item, i) => (
//                       <div
//                         key={i}
//                         className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
//                       >
//                         {item}
//                       </div>
//                     ))}

//                   </div>

//                 </div>

//                 {/* RIGHT */}
//                 <div className="relative flex justify-center">

//                   <div className="relative w-full max-w-md">

//                     <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 blur-2xl opacity-30"></div>

//                     <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-5 shadow-2xl">

//                       {/* BROWSER */}
//                       <div className="flex items-center gap-2 mb-5">
//                         <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                         <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                         <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                       </div>

//                       {/* UI */}
//                       <div className="space-y-4">

//                         <div className="h-36 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600"></div>

//                         <div className="grid grid-cols-2 gap-4">

//                           <div className="h-24 rounded-2xl bg-white/5"></div>

//                           <div className="h-24 rounded-2xl bg-white/5"></div>

//                         </div>

//                         <div className="h-16 rounded-2xl bg-white/5"></div>

//                       </div>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* TOOLS */}
//         <div className="px-4 sm:px-6 lg:px-10 py-8">

//           <div className="flex items-center justify-between mb-8">

//             <div>

//               <h2 className="text-3xl font-bold">
//                 Creative Tools
//               </h2>

//               <p className="text-gray-400 mt-2">
//                 Everything you need in one platform.
//               </p>

//             </div>

//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

//             {tools.map((tool, index) => (
//               <div
//                 key={index}
//                 className="group bg-white/[0.04] border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition duration-300 backdrop-blur-xl shadow-2xl"
//               >

//                 {/* ICON */}
//                 <div
//                   className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center shadow-xl`}
//                 >
//                   {tool.icon}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="mt-6">

//                   <h3 className="text-2xl font-semibold">
//                     {tool.title}
//                   </h3>

//                   <p className="text-gray-400 mt-3 leading-relaxed">
//                     {tool.desc}
//                   </p>

//                 </div>

//                 {/* BUTTON */}
//                 <Link
//                   to={tool.link}
//                   className={`mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${tool.gradient} text-white font-medium shadow-lg hover:opacity-90 transition`}
//                 >
//                   Open Tool
//                   <ArrowRight size={18} />
//                 </Link>

//               </div>
//             ))}

//           </div>

//         </div>

//         {/* RECENT */}
//         <div className="px-4 sm:px-6 lg:px-10 pb-14">

//           <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8">

//             <div className="flex items-center justify-between">

//               <div>

//                 <h2 className="text-2xl font-bold">
//                   Recent Projects
//                 </h2>

//                 <p className="text-gray-400 mt-1">
//                   Continue where you left off.
//                 </p>

//               </div>

//               <Link
//                 to="/library"
//                 className="text-purple-400 flex items-center gap-1 hover:gap-2 transition"
//               >
//                 View All
//                 <ChevronRight size={18} />
//               </Link>

//             </div>

//             <div className="grid md:grid-cols-3 gap-5 mt-8">

//               {recent.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-black/30 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.03] transition"
//                 >

//                   <div className="h-36 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-white/10"></div>

//                   <div className="mt-5">

//                     <p className="text-xs text-purple-400 uppercase tracking-wider">
//                       {item.type}
//                     </p>

//                     <h3 className="text-lg font-semibold mt-2">
//                       {item.title}
//                     </h3>

//                   </div>

//                   <button className="mt-5 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
//                     Continue Editing
//                   </button>

//                 </div>
//               ))}

//             </div>

//           </div>

//         </div>

//       </main>

//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.jsx

import React, {
  useEffect,
  useState,
} from "react";

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
  Trash2,
  Pencil,
} from "lucide-react";

import {
  getUserResumes,
  deleteResume,
} from "../services/resumeService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data =
        await getUserResumes();

      setResumes(data.resumes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

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
      desc: "Design premium logos for your brand instantly.",
      icon: <Palette size={28} />,
      link: "/logo",
      gradient:
        "from-emerald-500 to-teal-500",
    },

    {
      title: "Presentation Maker",
      desc: "Generate modern business presentations easily.",
      icon: <Presentation size={28} />,
      link: "/presentation",
      gradient:
        "from-orange-500 to-amber-500",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#060816] text-white flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6 sticky top-0 h-screen">

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
          <div className="mt-10 space-y-3">

            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
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

            <Link
              to="/library"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
            >
              <FolderOpen size={20} />
              My Library
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

              <p className="text-xs text-gray-400">
                {user?.email}
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
      <main className="flex-1 overflow-hidden">

        {/* TOPBAR */}
        <div className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl sticky top-0 z-50">

          <div className="px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Welcome Back 👋
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Create resumes, portfolios & logos faster than ever.
              </p>

            </div>

            <div className="flex items-center gap-3">

              <Link
                to="/templates"
                className="hidden sm:flex px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Browse Templates
              </Link>

              <Link
                to="/editor"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition shadow-2xl"
              >
                Create Now
              </Link>

            </div>

          </div>

        </div>

        {/* HERO */}
        <div className="relative overflow-hidden">

          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

          <div className="relative px-4 sm:px-6 lg:px-10 py-10">

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

                  <p className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">

                    Create professional resumes, stunning portfolios,
                    logos and presentations with modern templates,
                    AI tools and instant downloads.

                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <Link
                      to="/editor"
                      className="px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-2xl hover:scale-105 transition duration-300 text-center"
                    >
                      Create Resume
                    </Link>

                    <Link
                      to="/portfolio"
                      className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition duration-300 text-center"
                    >
                      Build Portfolio
                    </Link>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="relative flex justify-center">

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

        </div>

        {/* TOOLS */}
        <div className="px-4 sm:px-6 lg:px-10 py-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Creative Tools
              </h2>

              <p className="text-gray-400 mt-2">
                Everything you need in one platform.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {tools.map((tool, index) => (
              <div
                key={index}
                className="group bg-white/[0.04] border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition duration-300 backdrop-blur-xl shadow-2xl"
              >

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center shadow-xl`}
                >
                  {tool.icon}
                </div>

                <div className="mt-6">

                  <h3 className="text-2xl font-semibold">
                    {tool.title}
                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed">
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

        {/* RECENT */}
        <div className="px-4 sm:px-6 lg:px-10 pb-14">

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  My Resumes
                </h2>

                <p className="text-gray-400 mt-1">
                  Continue where you left off.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-8">

              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-black/30 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.03] transition"
                >

                  <div className="h-36 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-white/10"></div>

                  <div className="mt-5">

                    <p className="text-xs text-purple-400 uppercase tracking-wider">
                      Resume
                    </p>

                    <h3 className="text-lg font-semibold mt-2">
                      {resume.title}
                    </h3>

                  </div>

                  <div className="flex gap-2 mt-5">

                    <Link
                      to={`/editor/${resume.id}`}
                      className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-center flex items-center justify-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          resume.id
                        )
                      }
                      className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

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