import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Palette, Eye, Sparkles } from "lucide-react";
import LogoForm from "../components/logo/LogoForm";
import LogoCanvas from "../components/logo/LogoCanvas";
import PageBackButton from "../components/PageBackButton";

const LogoBuilder = () => {
  const location = useLocation();
  const NAV_H = 100; // top navbar ki height (px), apne hisaab se adjust karo
  const [data, setData] = useState({
    name: "Your Brand",
    color: "#7c3aed",
    font: "Poppins",
    icon: "FaRocket",
    layout: "horizontal",
    gradient: true,
  });

  useEffect(() => {
    if (location.state?.editData?.rawData) {
      setData(location.state.editData.rawData);
    }
  }, [location.state]);

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-brand-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-brand-red/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ================= LEFT PANEL ================= */}
      <aside
        style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
        className="relative z-10 w-full lg:w-[420px] xl:w-[460px] shrink-0 lg:sticky lg:overflow-y-auto max-lg:!h-auto p-4 sm:p-5 border-r border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-2xl shadow-black/30">
          <div className="absolute top-0 left-8 h-1.5 w-20 rounded-b-full bg-brand-red" />
          <div className="absolute -top-14 -right-14 w-40 h-40 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative">
            <PageBackButton className="mb-5" fallback="/templates" />

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 text-white flex items-center justify-center shadow-lg shadow-brand-red/30">
                <Palette size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">Logo Maker</p>
                <h2 className="text-xl md:text-2xl font-extrabold text-neutral-text-primary tracking-tight leading-tight">
                  Customize Logo
                </h2>
              </div>
            </div>

            <LogoForm data={data} setData={setData} />

            {/* 🔥 AI SUGGEST */}
            {/* <button
              onClick={() =>
                setData({
                  ...data,
                  name: "NovaTech",
                  color: "#6366f1",
                  icon: "FaCode",
                  font: "Montserrat",
                })
              }
              className="mt-5 w-full bg-brand-red text-white py-2 rounded-lg hover:scale-105 transition"
            >
              ✨ Generate AI Logo
            </button> */}
          </div>
        </div>
      </aside>

      {/* ================= RIGHT PANEL ================= */}
      <main className="relative z-10 flex-1 min-w-0 p-4 sm:p-6 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="h-9 w-1.5 rounded-full bg-brand-red" />
            <div>
              <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">
                Live Preview
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">Light + Dark version, updates as you type.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <Eye size={13} /> Real-time
          </span>
        </div>

        <LogoCanvas data={data} />

        <p className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-8">
          <Sparkles size={14} className="text-brand-red" /> Tip: brand name, color, icon aur font badalke apna perfect logo banao.
        </p>
      </main>
    </div>
  );
};

export default LogoBuilder;