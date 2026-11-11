import React, { useEffect, useState } from "react";
import LibraryCard from "../components/LibraryCard";
import { getAllResumeDownloads, redownloadFromLibrary, deleteResumeDownload } from "../services/resumeService";
import { FolderOpen, Search, Loader2, Download } from "lucide-react";
import { toast } from "react-toastify";
import { getWalletBalance } from "../services/walletService";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

/**
 * "My Downloads" — every PDF the user has ever downloaded.
 * Re-downloading a previously downloaded file is FREE (no coins deducted);
 * the backend only charges on the first download of a resume from the editor.
 */
const MyDownloads = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDownloads();
    getWalletBalance()
      .then((response) => setBalance(Number(response?.data?.balance ?? 0)))
      .catch(() => setBalance(null));
  }, []);

  const loadDownloads = async () => {
    try {
      setLoading(true);
      const res = await getAllResumeDownloads({ page: 1, limit: 100 });
      const mapped = (res.data?.downloads || []).map((d) => ({
        id: d.id,
        resumeId: d.resume_id,
        title: d.title || "Untitled Resume",
        type: "resume",
        createdAt: d.created_at,
        updatedAt: d.updated_at,
        thumbnail: null,
        description: d.description,
      }));
      setItems(mapped);
    } catch (err) {
      toast.error("Failed to load your downloads");
    } finally {
      setLoading(false);
    }
  };

  // Re-download is always free for previously downloaded files.
  const handleRedownload = async (downloadItem) => {
    try {
      const res = await redownloadFromLibrary(downloadItem.id);
      const url = res?.data?.downloadUrl;
      if (url) {
        window.open(url, "_blank");
        toast.success("Download started");
      } else {
        toast.error("No download URL returned");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to re-download");
    }
  };

  // Take the user back to the editor so they can modify the original resume
  // and then re-download it (the new download will cost coins).
  const handleModify = (item) => {
    if (item.resumeId) {
      navigate("/editor", { state: { resumeId: item.resumeId, templateTitle: item.title } });
    } else {
      toast.error("The original project is no longer available. Please create a new resume.");
    }
  };

  const handleDelete = async (item) => {
    setPendingDelete(item);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      setDeleting(true);
      await deleteResumeDownload(pendingDelete.id);
      setItems((current) => current.filter((entry) => entry.id !== pendingDelete.id));
      setPendingDelete(null);
      toast.success("Download removed. The owner can restore it from Trash.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete download");
    } finally {
      setDeleting(false);
    }
  };

  const filteredItems = items.filter((item) =>
    (item?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Download size={32} className="text-brand-red" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Downloads</h1>
            <p className="text-sm text-gray-500 mt-1">
              Previously downloaded resumes. Re-downloads are free — no coins deducted.
            </p>
          </div>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search downloads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-brand-red" size={48} />
          <p className="text-gray-500 mt-4">Loading your downloads...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FolderOpen size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">No downloads yet</h2>
          <p className="text-gray-500 mt-2">
            {search ? "No downloads match your search." : "Every resume you download from the editor will appear here."}
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
              downloadLocked={false}
            />
          ))}
        </div>
      )}
      <DeleteConfirmationModal
        open={Boolean(pendingDelete)}
        itemType="download"
        loading={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default MyDownloads;
