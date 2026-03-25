import React, { useState } from "react";
import PortfolioForm from "../components/portfolio/PortfolioForm";
import PortfolioCanvas from "../components/portfolio/PortfolioCanvas";

const PortfolioBuilder = () => {
  const [data, setData] = useState({
    name: "",
    about: "",
    projects: [],
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-950 via-indigo-950 to-gray-950">

      {/* LEFT (FORM) */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6">
          <PortfolioForm data={data} setData={setData} />
        </div>
      </div>

      {/* RIGHT (PREVIEW) */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Top Bar */}
          <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-600">
              Live Preview
            </h2>

            <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded">
              Download
            </button>
          </div>

          {/* Canvas */}
          <div className="p-6 min-h-[500px]">
            <PortfolioCanvas data={data} />
          </div>

        </div>
      </div>

    </div>
  );
};

export default PortfolioBuilder;