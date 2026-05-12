import React, {
  useEffect,
  useState,
} from "react";

import LibraryCard from "../components/LibraryCard";

import {
  getLibrary,
  deleteFromLibrary,
  clearLibrary,
} from "../utils/library";

import {
  FolderOpen,
  Trash2,
  Search,
} from "lucide-react";

const Library = () => {
  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // ================= LOAD =================
  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = () => {
    const data = getLibrary();
    setItems(data);
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    deleteFromLibrary(id);
    loadLibrary();
  };

  // ================= CLEAR =================
  const handleClear = () => {
    const confirmDelete =
      window.confirm(
        "Delete all library items?"
      );

    if (confirmDelete) {
      clearLibrary();
      loadLibrary();
    }
  };

  // ================= FILTER =================
  const filteredItems =
    items.filter((item) =>
      (item?.title || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div className="flex items-center gap-3">

          <FolderOpen size={32} />

          <h1 className="text-3xl font-bold text-gray-800">
            My Library
          </h1>

        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4">

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="px-3 py-2 outline-none bg-transparent"
            />

          </div>

          {/* CLEAR */}
          {items.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          )}

        </div>
      </div>

      {/* EMPTY */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">

          <FolderOpen
            size={80}
            className="text-gray-300 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No Files Found
          </h2>

          <p className="text-gray-500 mt-2">
            Download resumes,
            portfolios, logos, or
            presentations to save them
            here.
          </p>

        </div>
      ) : (

        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredItems.map((item) => (
            <LibraryCard
              key={item.id}
              item={item}
              onDelete={
                handleDelete
              }
            />
          ))}

        </div>

      )}
    </div>
  );
};

export default Library;