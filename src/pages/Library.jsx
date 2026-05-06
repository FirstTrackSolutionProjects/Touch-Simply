import React, { useEffect, useState } from "react";
import { getLibrary, deleteFromLibrary } from "../utils/library";

const Library = () => {
  const [items, setItems] = useState([]);
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setItems(getLibrary());
  }, []);

  const handleDelete = (id) => {
    deleteFromLibrary(id);
    setItems(getLibrary());
    setPreview(null);
  };

  // 🔍 Filter Logic
  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">My Library</h1>
        <p className="text-sm text-gray-500">
          {items.length} Saved Items
        </p>
      </div>

      {/* FILTER */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center md:justify-start">
        {["all", "resume", "logo", "portfolio", "ppt"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize transition ${
              filter === cat
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* EMPTY */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-lg font-semibold">No files yet</h2>
          <p className="text-gray-500 text-sm mt-1">
            Save or download something to see it here
          </p>
        </div>
      ) : (

        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >

              {/* PREVIEW */}
              <div
                onClick={() => setPreview(item)}
                className="cursor-pointer"
              >
                {item.type === "png" ? (
                  <img
                    src={item.file}
                    alt=""
                    className="w-full h-48 object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100 text-5xl">
                    {item.category === "logo" && "🎨"}
                    {item.category === "portfolio" && "💼"}
                    {item.category === "ppt" && "📊"}
                    {item.category === "resume" && "📄"}
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="p-3 space-y-1">

                {/* NAME */}
                <div className="text-sm font-medium truncate">
                  {item.name}
                </div>

                {/* TYPE + CATEGORY */}
                <div className="flex justify-between text-xs">
                  <span className="bg-gray-200 px-2 py-1 rounded">
                    {item.type.toUpperCase()}
                  </span>

                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded capitalize">
                    {item.category}
                  </span>
                </div>

                {/* DATE */}
                <div className="text-xs text-gray-400">
                  {item.createdAt}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between mt-2 text-sm">
                  <a
                    href={item.file}
                    download={`${item.name}.${item.type}`}
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* 🔍 PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg max-w-3xl w-full p-4 relative">

            {/* CLOSE */}
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>

            {/* CONTENT */}
            {preview.type === "png" ? (
              <img
                src={preview.file}
                alt=""
                className="w-full max-h-[80vh] object-contain"
              />
            ) : preview.type === "pptx" ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-3">📊</div>
                <h2 className="text-lg font-semibold">
                  PowerPoint File
                </h2>
                <p className="text-gray-500 text-sm">
                  Download to view slides
                </p>
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-2">
                  {preview.category === "logo" && "🎨"}
                  {preview.category === "portfolio" && "💼"}
                  {preview.category === "resume" && "📄"}
                </div>
                <p className="text-gray-500">Preview not available</p>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-between mt-4">
              <a
                href={preview.file}
                download={`${preview.name}.${preview.type}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Download
              </a>

              <button
                onClick={() => handleDelete(preview.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Library;