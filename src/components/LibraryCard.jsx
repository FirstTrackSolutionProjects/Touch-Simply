import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Download,
  FileText,
  Image as ImageIcon,
  Presentation,
  Briefcase,
  Pencil,
  ChevronDown,
} from "lucide-react";

const LibraryCard = ({ item, onDelete }) => {
  const [showDownloads, setShowDownloads] = useState(false);

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

  // ================= DOWNLOAD OPTIONS =================
  const getDownloadOptions = () => {
    const baseLink = getEditLink();
    const formats = [];

    if (item.type === "resume") {
      formats.push({ label: "PDF", format: "pdf" });
      formats.push({ label: "PNG", format: "png" });
      formats.push({ label: "DOCX", format: "docx" });
    } else if (item.type === "portfolio") {
      formats.push({ label: "PDF", format: "pdf" });
      formats.push({ label: "PNG", format: "png" });
      formats.push({ label: "DOCX", format: "docx" });
    } else if (item.type === "logo") {
      formats.push({ label: "PNG Light", format: "png-light" });
      formats.push({ label: "PNG Dark", format: "png-dark" });
      formats.push({ label: "PDF", format: "pdf" });
    } else if (item.type === "presentation" || item.type === "ppt") {
      formats.push({ label: "PPTX", format: "pptx" });
      formats.push({ label: "PDF", format: "pdf" });
    }

    return formats.map((f) => (
      <Link
        key={f.format}
        to={`${baseLink}?download=${f.format}`}
        state={{ editData: item }}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        Download as {f.label}
      </Link>
    ));
  };

  // ================= FALLBACK IMAGE =================
  const fallbackImage = "https://placehold.co/600x400?text=No+Preview";

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* ================= THUMBNAIL ================= */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
        <img
          src={item.thumbnail || fallbackImage}
          alt={item.title || "File"}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          PROJECT
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-purple-600">{getIcon()}</div>
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {item.title || "Untitled"}
          </h2>
        </div>

        <p className="text-xs text-gray-500 uppercase mb-4 tracking-wide font-medium">
          {item.type}
        </p>

        {/* ================= BUTTONS ================= */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {/* EDIT */}
            <Link
              to={getEditLink()}
              state={{ editData: item }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:scale-[1.02] transition-all"
            >
              <Pencil size={18} />
              Edit
            </Link>

            {/* DOWNLOAD DROPDOWN TOGGLE */}
            <div className="relative">
              <button
                onClick={() => setShowDownloads(!showDownloads)}
                className="w-12 h-11 flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-900 transition-all hover:scale-105"
                title="Download Options"
              >
                <Download size={18} />
              </button>

              {showDownloads && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDownloads(false)} 
                  />
                  <div className="absolute bottom-full mb-2 right-0 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 py-2 overflow-hidden">
                    <p className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b mb-1">Export As</p>
                    {getDownloadOptions()}
                  </div>
                </>
              )}
            </div>

            {/* DELETE */}
            <button
              onClick={() => onDelete(item.id)}
              className="w-12 h-11 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all hover:scale-105"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 mt-4 text-center">
          Last updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default LibraryCard;