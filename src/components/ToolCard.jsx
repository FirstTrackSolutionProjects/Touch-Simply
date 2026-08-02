import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ToolCard = ({ tool }) => {
  return (
    <div className="group relative overflow-hidden bg-white/[0.04] border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30 flex flex-col">
      {/* ✅ Add pointer-events-none here */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>

      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center shrink-0`}>
        {tool.icon}
      </div>

      <div className="mt-6 flex-1">
        <h3 className="text-xl font-semibold">{tool.title}</h3>
        <p className="text-gray-400 mt-3 leading-relaxed text-sm">{tool.desc}</p>
      </div>

      <Link
        to={tool.link}
        className={`mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${tool.gradient} text-white font-medium shadow-lg hover:opacity-90 transition hover:scale-105 w-full sm:w-auto relative z-10`}
      >
        Open Tool
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default ToolCard;