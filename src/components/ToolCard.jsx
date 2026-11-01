import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ToolCard = ({ tool }) => {
  return (
    <div className="group relative bg-white border border-neutral-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
        {tool.icon}
      </div>

      <div className="mt-5 flex-1">
        <h3 className="text-lg font-bold text-neutral-text-primary">{tool.title}</h3>
        <p className="text-neutral-text-secondary mt-2 text-sm leading-relaxed">{tool.desc}</p>
      </div>

      <Link
        to={tool.link}
        className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-bg text-neutral-text-primary font-semibold text-sm group-hover:bg-brand-black group-hover:text-white transition-colors duration-300 w-full"
      >
        Open Tool <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default ToolCard;