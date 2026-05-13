import React from "react";

import { Link } from "react-router-dom";

import {
  Trash2,
  Download,
  FileText,
  Image as ImageIcon,
  Presentation,
  Briefcase,
  Pencil,
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

  // ================= EDIT LINK =================
  const getEditLink = () => {
    switch (item.type) {

      case "resume":
        return "/editor";

      case "portfolio":
        return "/portfolio";

      case "logo":
        return "/logo";

      case "presentation":
      case "ppt":
        return "/presentation";

      default:
        return "/";
    }
  };

  // ================= FALLBACK IMAGE =================
  const fallbackImage =
    "https://placehold.co/600x400?text=No+Preview";

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      {/* ================= THUMBNAIL ================= */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">

        <img
          src={
            item.thumbnail || fallbackImage
          }
          alt={item.title || "File"}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

        {/* FORMAT BADGE */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase">
          {item.format}
        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">

        {/* TITLE */}
        <div className="flex items-center gap-2 mb-2">

          <div className="text-purple-600">
            {getIcon()}
          </div>

          <h2 className="text-lg font-bold text-gray-800 truncate">
            {item.title || "Untitled"}
          </h2>

        </div>

        {/* TYPE */}
        <p className="text-sm text-gray-500 uppercase mb-1 tracking-wide">
          {item.type}
        </p>

        {/* DATE */}
        <p className="text-xs text-gray-400 mb-5">
          {item.createdAt
            ? new Date(
                item.createdAt
              ).toLocaleString()
            : "Unknown Date"}
        </p>

        {/* ================= BUTTONS ================= */}
        <div className="flex gap-2">

          {/* DOWNLOAD */}
          <a
            href={item.file}
            download
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-xl font-medium hover:scale-[1.02] hover:bg-gray-900 transition-all"
          >
            <Download size={18} />
            Download
          </a>

          {/* EDIT */}
          <Link
            to={getEditLink()}
            state={{ editData: item }}
            className="w-12 flex items-center justify-center bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all hover:scale-105"
          >
            <Pencil size={18} />
          </Link>

          {/* DELETE */}
          <button
            onClick={() =>
              onDelete(item.id)
            }
            className="w-12 flex items-center justify-center bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-105"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default LibraryCard;