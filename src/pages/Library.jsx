import React, { useEffect, useState } from "react";
import LibraryCard from "../components/LibraryCard";
import { getAllResumeDownloads, redownloadFromLibrary, deleteResumeDownload } from "../services/resumeService";
import { FolderOpen, Search, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { getWalletBalance } from "../services/walletService";
import { useNavigate } from 'react-router-dom';

const DOWNLOAD_RESUME_CREDIT_COST = 4;

const Library = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadLibrary();
    getWalletBalance().then((response) => setBalance(Number(response?.data?.balance ?? 0))).catch(() => setBalance(null));
  }, []);

  const loadLibrary = async () => {
    try {
      setLoading(true);
      const res = await getAllResumeDownloads();
      const mapped = (res.data?.downloads || []).map((d) => ({
        id: d.id,
        resumeId: d.resume_id,
        title: d.title || "Untitled Resume",
        type: "resume",
        createdAt: d.created_at,
        updatedAt: d.updated_at,
        thumbnail: null, // You might want to fetch a real thumbnail later
        description: d.description,
      }));
      setItems(mapped);
    } catch (err) {
      toast.error("Failed to load library");
    } finally {
      setLoading(false);
    }
  };

  const handleRedownload = async (downloadItem) => {
    if (balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST) {
      toast.warn("Not enough coins to download. Please recharge your wallet.");
      navigate('/credits/buy');
      return;
    }
    try {
      const res = await redownloadFromLibrary(downloadItem.id);
      const url = res?.data?.downloadUrl;
      if (url) {
        window.open(url, "_blank");
        toast.success("Download started");
        // Note: Since this is a re-download of an unmodified project, we assume it's free for now.
        // If backend charges, we'd need to re-fetch balance.
      } else {
        toast.error("No download URL returned");
      }
    } catch (err) {
      if (err.response?.status === 402) {
        toast.error("Download locked: not enough coins. Please recharge your wallet.");
        navigate('/credits/buy');
      } else {
        toast.error(err.response?.data?.message || "Failed to redownload");
      }
    }
  };
  
  const handleModify = (item) => {
    // Navigate to editor with the resume ID
    if (item.resumeId) {
        navigate(`/editor`, { state: { resumeId: item.resumeId, templateTitle: item.title } });
    } else {
        toast.error("Cannot find the original resume to edit.");
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete “${item.title || "Untitled Resume"}” from your library?`)) return;
    try {
      await deleteResumeDownload(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      toast.success("Resume removed from your library");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete resume");
    }
  };

  const filteredItems = items.filter((item) =>
    (item?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FolderOpen size={32} className="text-brand-purple"/>
          <h1 className="text-3xl font-bold text-gray-800">My Library</h1>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search saved projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-purple-600" size={48} />
          <p className="text-gray-500 mt-4">Loading your library...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FolderOpen size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Your Library is Empty</h2>
          <p className="text-gray-500 mt-2">
            {search ? "No projects match your search." : "Download a resume to save it here for easy access."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <LibraryCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onRedownload={() => handleRedownload(item)}
              onModify={handleModify}
              downloadLocked={balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
