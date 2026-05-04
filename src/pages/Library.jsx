import React, { useEffect, useState } from "react";
import { getLibrary, deleteFromLibrary } from "../utils/library";

const Library = () => {
  const [items, setItems] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setItems(getLibrary());
  }, []);

  const handleDelete = (id) => {
    deleteFromLibrary(id);
    setItems(getLibrary());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">My Library</h1>
        <p className="text-sm text-gray-500">
          {items.length} Saved Resumes
        </p>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-lg font-semibold">No resumes yet</h2>
          <p className="text-gray-500 text-sm mt-1">
            Download a resume to see it here
          </p>
        </div>
      ) : (

        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                  <div className="h-48 flex items-center justify-center bg-gray-100 text-4xl">
                    {item.type === "pdf" && "📄"}
                    {item.type === "docx" && "📝"}
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded">
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.createdAt}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between mt-3 text-sm">
                  <a
                    href={item.file}
                    download={`resume.${item.type}`}
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

            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>

            {preview.type === "png" ? (
              <img
                src={preview.file}
                alt=""
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-2xl">
                Preview not available
              </div>
            )}

            <div className="flex justify-between mt-4">
              <a
                href={preview.file}
                download={`resume.${preview.type}`}
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