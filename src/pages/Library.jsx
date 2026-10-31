import React, {
  useEffect,
  useState,
} from "react";

import LibraryCard from "../components/LibraryCard";

import {
  getAllResumeDownloads,
  redownloadFromLibrary,
} from "../services/resumeService";

import {
  FolderOpen,
  Search,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { getWalletBalance } from "../services/walletService";

const DOWNLOAD_RESUME_CREDIT_COST = 4;

const Library = () => {
  const [items, setItems] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);

  const [search, setSearch] =
    useState("");

  // ================= LOAD =================
  useEffect(() => {
    loadLibrary();
    getWalletBalance().then((response) => setBalance(Number(response?.data?.balance ?? 0))).catch(() => setBalance(null));
  }, []);

  const loadLibrary = async () => {
    try {
      setLoading(true);
      const res = await getAllResumeDownloads();
      // Map backend downloads to LibraryCard format
      const mapped = (res.data?.downloads || []).map((d) => ({
        id: d.id,
        resumeId: d.resume_id,
        title: d.title || "Untitled Resume",
        type: "resume",
        createdAt: d.created_at,
        updatedAt: d.updated_at,
        thumbnail: null, // Backend doesn't provide thumbnails yet
        description: d.description,
      }));
      setItems(mapped);
    } catch (err) {
      toast.error("Failed to load library");
    } finally {
      setLoading(false);
    }
  };

  // ================= REDOWNLOAD =================
  const handleRedownload = async (downloadId) => {
    try {
      if (balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST) {
        toast.warn("Download locked. Add at least 4 credits to your wallet first.");
        return;
      }
      const res = await redownloadFromLibrary(downloadId);
      const url = res?.data?.downloadUrl;
      if (url) {
        window.open(url, "_blank");
        toast.success("Download started");
      } else {
        toast.error("No download URL returned");
      }
    } catch (err) {
      if (err.response?.status === 402) toast.error("Download locked: insufficient credits. Please recharge your wallet.");
      else toast.error(err.response?.data?.message || "Failed to redownload");
    }
  };

  // ================= DELETE (Not implemented in backend yet for downloads) =================
  const handleDelete = undefined;

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

        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-purple-600" size={48} />
          <p className="text-gray-500 mt-4">Loading your library...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        /* EMPTY */
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">

          <FolderOpen
            size={80}
            className="text-gray-300 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No Files Found
          </h2>

          <p className="text-gray-500 mt-2">
            Download resumes to save them here.
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
              onRedownload={() => handleRedownload(item.id)}
              downloadLocked={balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST}
            />
          ))}

        </div>

      )}
    </div>
  );
};

export default Library;
