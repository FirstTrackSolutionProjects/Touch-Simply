import React, { useEffect, useState } from "react";
import { getAllResumeDownloads, redownloadFromLibrary, deleteResumeDownload } from "../services/resumeService";
import {
  FolderOpen, Search, Download, Pencil, Trash2, FileText, Clock, X,
  Zap, BadgeCheck, Layers3, ChevronRight, Sparkles
} from "lucide-react";
import { toast } from "react-toastify";
import { getWalletBalance } from "../services/walletService";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

/** "2 days ago" style label */
const timeAgo = (date) => {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

/** "Super Admin-01a1c535-d28c-79f4-..." -> "Super Admin" (hides the long id suffix) */
const cleanTitle = (title) => {
  const cleaned = String(title || "").replace(/[-_\s]*[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{3,4}.*$/i, "").trim();
  return cleaned || title || "Untitled Resume";
};

/** Mini resume "paper" preview drawn with CSS (shown when there is no thumbnail) */
const ResumePreview = () => (
  <div className="w-28 h-36 rounded-lg bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 p-3 flex flex-col gap-1.5 transition-all duration-500 rotate-3 group-hover:rotate-0 group-hover:scale-110 group-hover:-translate-y-1">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-brand-red/80 shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="h-1.5 w-full rounded bg-gray-800/80" />
        <div className="h-1 w-2/3 rounded bg-gray-300" />
      </div>
    </div>
    <div className="h-px bg-gray-200 my-0.5" />
    <div className="h-1.5 w-1/3 rounded bg-brand-red/70" />
    <div className="h-1 w-full rounded bg-gray-200" />
    <div className="h-1 w-5/6 rounded bg-gray-200" />
    <div className="h-1 w-full rounded bg-gray-200" />
    <div className="h-1.5 w-1/3 rounded bg-brand-red/70 mt-1" />
    <div className="h-1 w-full rounded bg-gray-200" />
    <div className="h-1 w-4/6 rounded bg-gray-200" />
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-100" />
    <div className="p-5 space-y-3">
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-3 w-1/2 rounded bg-gray-100" />
      <div className="flex gap-2 pt-3">
        <div className="h-10 flex-1 rounded-xl bg-gray-100" />
        <div className="h-10 w-10 rounded-xl bg-gray-100" />
        <div className="h-10 w-28 rounded-xl bg-gray-200" />
      </div>
    </div>
  </div>
);

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
    <div className="min-h-screen bg-neutral-bg">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">

        {/* ============ HERO HEADER ============ */}
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-black p-6 sm:p-10 shadow-2xl shadow-black/20 ring-1 ring-white/5">
          <div className="absolute -top-24 -right-16 w-96 h-96 bg-brand-red/30 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-28 -left-20 w-80 h-80 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-semibold mb-5">
                <Sparkles size={14} className="text-brand-red" /> Free re-downloads
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center shadow-lg shadow-brand-red/40 ring-4 ring-brand-red/15">
                  <Download size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">My Downloads</h1>
                  <p className="text-gray-400 text-sm sm:text-base mt-1">
                    Every resume you've downloaded, ready anytime. Re-downloads cost no coins.
                  </p>
                </div>
              </div>
            </div>

            {/* Stat chips */}
            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-4 py-3 min-w-[110px]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                  <Layers3 size={13} className="text-brand-red" /> Downloads
                </div>
                <p className="text-2xl font-extrabold text-white mt-1">{items.length}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-4 py-3 min-w-[110px]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                  <Zap size={13} className="text-brand-red" /> Coins
                </div>
                <p className="text-2xl font-extrabold text-white mt-1">{balance ?? "—"}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-4 py-3 min-w-[110px]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                  <BadgeCheck size={13} className="text-brand-red" /> Re-download
                </div>
                <p className="text-2xl font-extrabold text-green-400 mt-1">Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ TOOLBAR ============ */}
        <div className="flex items-center max-w-xl bg-white border border-neutral-border rounded-2xl px-4 shadow-sm transition-all focus-within:border-brand-red/40 focus-within:ring-4 focus-within:ring-brand-red/10">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search downloads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-3 outline-none bg-transparent w-full text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition" aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        {/* ============ CONTENT ============ */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center bg-white border border-dashed border-gray-300 rounded-[2rem] py-20 px-6">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-red/15 to-brand-red/5 flex items-center justify-center mb-6">
              <FolderOpen size={44} className="text-brand-red" />
            </div>
            <h2 className="relative text-2xl font-extrabold text-neutral-text-primary">
              {search ? "No matching downloads" : "No downloads yet"}
            </h2>
            <p className="relative text-neutral-text-secondary mt-2 max-w-sm">
              {search
                ? "No downloads match your search. Try a different keyword."
                : "Every resume you download from the editor will appear here."}
            </p>
            <button
              onClick={() => (search ? setSearch("") : navigate("/my-library"))}
              className="relative mt-7 inline-flex items-center gap-2 rounded-2xl bg-brand-black px-7 py-3.5 text-sm font-bold text-white hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg"
            >
              {search ? "Clear Search" : "Go to My Library"} <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10 hover:border-brand-red/30"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => handleRedownload(item)}
                  className="relative h-44 cursor-pointer overflow-hidden bg-gradient-to-br from-brand-red/10 via-white to-gray-100 flex items-center justify-center"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-red/10 group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-brand-red/5" />
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="relative h-full w-full object-cover" />
                  ) : (
                    <ResumePreview />
                  )}

                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur text-brand-red px-2.5 py-1 rounded-full shadow-sm">
                    <FileText size={11} /> PDF
                  </span>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 px-2.5 py-1 rounded-full shadow-sm">
                    <BadgeCheck size={11} /> Free
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-text-primary text-xs font-bold shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Download size={13} /> Download PDF
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-extrabold text-neutral-text-primary text-lg truncate" title={item.title}>
                    {cleanTitle(item.title)}
                  </h3>
                  <p className="text-xs text-neutral-text-secondary mt-1 line-clamp-2 min-h-[2rem]">
                    {item.description || "Downloaded resume"}
                  </p>

                  <div className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-gray-500 bg-gray-100 self-start px-2.5 py-1 rounded-full">
                    <Clock size={12} />
                    Updated {timeAgo(item.updatedAt || item.createdAt)}
                  </div>

                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleModify(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-bold py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <Pencil size={15} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="flex items-center justify-center border border-red-200 text-red-600 p-2.5 rounded-xl hover:bg-red-50 hover:border-red-300 transition-colors"
                      aria-label="Delete download"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleRedownload(item)}
                      className="flex items-center justify-center gap-2 bg-brand-black text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-brand-red hover:shadow-lg hover:shadow-brand-red/30 transition-all"
                    >
                      <Download size={15} /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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