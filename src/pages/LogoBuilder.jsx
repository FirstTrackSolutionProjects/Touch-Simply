import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogoForm from "../components/logo/LogoForm";
import LogoCanvas from "../components/logo/LogoCanvas";

const LogoBuilder = () => {
  const location = useLocation();
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-950 via-purple-900/30 to-black">

      {/* LEFT PANEL */}
      <div className="md:w-1/3 w-full p-5 border-r border-white/10 bg-white/5 backdrop-blur-xl">

        <div className="bg-white/95 rounded-2xl p-6 shadow-xl">

          <h2 className="text-xl font-bold mb-4">
            Customize Logo
          </h2>

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
            className="mt-5 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:scale-105 transition"
          >
            ✨ Generate AI Logo
          </button> */}

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6 md:p-10">

        <h2 className="text-white text-lg mb-4 font-semibold">
          Live Preview (Light + Dark)
        </h2>

        <LogoCanvas data={data} />

      </div>
    </div>
  );
};

export default LogoBuilder;