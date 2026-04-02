import React, { useState } from "react";
import LogoForm from "../components/logo/LogoForm";
import LogoCanvas from "../components/logo/LogoCanvas";

const LogoBuilder = () => {
  const [data, setData] = useState({
    name: "",
    color: "#000000",
    font: "Arial",
  });

  return (
   <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-950 via-purple-900/30 to-black relative overflow-hidden">

  {/* Glow Effects */}
  <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-600/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-600/20 blur-3xl rounded-full"></div>

  {/* LEFT SIDE */}
  <div className="md:w-1/3 w-full p-4 md:p-6 bg-white/5 backdrop-blur-md border-r border-white/10">

    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-6 md:p-7 border border-white/40">

      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">
        Customize Your Logo
      </h2>

      <LogoForm data={data} setData={setData} />

    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex-1 flex items-center justify-center p-4 md:p-8">

    <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-white">
          Live Preview
        </h3>

        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs hover:scale-105 transition">
          Download
        </button>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-inner p-6 flex items-center justify-center min-h-[280px]">
        <LogoCanvas data={data} />
      </div>

    </div>
  </div>
</div>
  );
};

export default LogoBuilder;