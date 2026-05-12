// src/components/LibraryCard.jsx

import React from "react";

import {
  Trash2,
  Download,
  FileText,
  Image as ImageIcon,
  Presentation,
  Briefcase,
} from "lucide-react";

const LibraryCard = ({
  item,
  onDelete,
}) => {
  // ================= ICON =================
  const getIcon = () => {
    switch (item.type) {
      case "resume":
        return <FileText size={18} />;

      case "portfolio":
        return <Briefcase size={18} />;

      case "presentation":
      case "ppt":
        return <Presentation size={18} />;

      case "logo":
        return <ImageIcon size={18} />;

      default:
        return <FileText size={18} />;
    }
  };

  // ================= FALLBACK IMAGE =================
  const fallbackImage =
    "https://placehold.co/600x400?text=No+Preview";

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">

      {/* THUMBNAIL */}
      <div className="w-full h-56 bg-gray-100 overflow-hidden">

        <img
          src={
            item.thumbnail || fallbackImage
          }
          alt={item.title || "File"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <div className="flex items-center gap-2 mb-2">

          {getIcon()}

          <h2 className="text-lg font-bold text-gray-800 truncate">
            {item.title || "Untitled"}
          </h2>

        </div>

        {/* TYPE */}
        <p className="text-sm text-gray-500 uppercase mb-1">
          {item.type} • {item.format}
        </p>

        {/* DATE */}
        <p className="text-xs text-gray-400 mb-4">
          {item.createdAt
            ? new Date(
                item.createdAt
              ).toLocaleString()
            : "Unknown Date"}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3">

          {/* DOWNLOAD */}
          <a
            href={item.file}
            download
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-xl font-medium hover:scale-105 transition-all"
          >
            <Download size={18} />
            Download
          </a>

          {/* DELETE */}
          <button
            onClick={() =>
              onDelete(item.id)
            }
            className="w-12 flex items-center justify-center bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default LibraryCard;