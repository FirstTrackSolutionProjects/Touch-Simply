import React from "react";
import { Download, FileText, Image as ImageIcon, Presentation, Briefcase, Pencil } from "lucide-react";

const LibraryCard = ({ item, onRedownload, onModify, downloadLocked = false }) => {

  const getIcon = () => {
    switch (item.type) {
      case "resume": return <FileText size={18} />;
      case "portfolio": return <Briefcase size={18} />;
      case "presentation":
      case "ppt": return <Presentation size={18} />;
      case "logo": return <ImageIcon size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const fallbackImage = "https://placehold.co/600x400/e2e8f0/a4b1c2?text=Preview+Unavailable";

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={item.thumbnail || fallbackImage}
          alt={item.title || "File"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <div className="absolute top-3 right-3 bg-brand-purple/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow">
          {item.type}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start gap-2 mb-2">
          <div className="text-brand-purple mt-0.5">{getIcon()}</div>
          <h2 className="text-base font-bold text-gray-800 truncate flex-1" title={item.title}>
            {item.title || "Untitled"}
          </h2>
        </div>

        <p className="text-[11px] text-gray-400 mt-auto pt-2">
          Last updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={onModify}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
            title="Modify this project"
          >
            <Pencil size={15} />
            Modify
          </button>
          <button
            onClick={onRedownload}
            disabled={downloadLocked}
            className="flex items-center justify-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            title={downloadLocked ? "Not enough coins" : "Download this version"}
          >
            <Download size={15} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
