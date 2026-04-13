import React, { useState } from "react";
import ModernLogo from "../../templates/ModernLogo";
import MinimalLogo from "../../templates/MinimalLogo";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";

const LogoCanvas = ({ data }) => {
  const [template, setTemplate] = useState("modern");
  const ref = useRef();

  return (
    <div className="h-full flex flex-col">

      {/* 🔥 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Logo Preview
        </h2>

        <div className="flex gap-2">
          {["modern", "minimal"].map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1 text-xs rounded-full transition ${
                template === t
                  ? "bg-purple-600 text-white shadow"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 Canvas */}
      <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center p-6 border">

        {/* Paper */}
        <div className="w-full max-w-md h-[260px] bg-white rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">

          {/* subtle grid bg */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

         <div ref={ref}>
          {template === "modern" && <ModernLogo data={data} />}
          {template === "minimal" && <MinimalLogo data={data} />}
        </div>

      
        </div>
      </div>
    </div>
  );
};

export default LogoCanvas;