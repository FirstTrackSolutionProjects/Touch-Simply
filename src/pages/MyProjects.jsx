import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderOpen, Search, Loader2, Pencil, Trash2, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { getMyProjects, deleteResume } from "../services/resumeService";
import { getWalletBalance } from "../services/walletService";

const DOWNLOAD_RESUME_CREDIT_COST = 4;
const PAGE_SIZE = 12;

/**
 * "My Projects" — every resume a user is building.
 * These are the auto-saved workspaces. Editing opens the editor and
 * continues from where the user left off. Downloading from the editor
 * costs 4 coins per resume (unchanged behaviour).
 */
const MyProjects = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadProjects();
    getWalletBalance()
      .then((r) => setBalance(Number(r?.data?.balance ?? 0)))
      .catch(() => setBalance(null));
  }, [page]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await getMyProjects({
        page,
        limit: PAGE_SIZE,
        sort_by: "updated_at",
        direction: "desc",
        ...(search.trim() ? { title: search.trim() } : {}),
      });
      const rows = res.data?.rows || [];
      setItems(
        rows.map((r) => ({
          id: r.id,
          title: r.title || "Untitled Resume",
          description: r.description,
          updatedAt: r.updated_at,
          createdAt: r.created_at,
          templateId: r.template_id,
        }))
      );
      setTotal(res.data?.pagination?.totalCount || 0);
    } catch (err) {
      toast.error("Failed to load your projects");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditor = (project) => {
    navigate("/editor", { state: { resumeId: project.id, templateTitle: project.title } });
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete the project “${project.title}”? This cannot be undone.`)) return;
    try {
      await deleteResume(project.id);
      setItems((cur) => cur.filter((p) => p.id !== project.id));
      setTotal((t) => Math.max(0, t - 1));
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  // Trigger the editor + download flow. The editor already knows how to charge
  // 4 coins on first download and to reuse the stored PDF for redownloads.
  const handleDownload = (project) => {
    if (balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST) {
      toast.warn(`You need ${DOWNLOAD_RESUME_CREDIT_COST} coins to download.`);
      navigate("/credits/buy", { state: { from: "/projects" } });
      return;
    }
    navigate("/editor", {
      state: { resumeId: project.id, templateTitle: project.title, autoDownload: true },
    });
  };

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FolderOpen size={32} className="text-brand-red" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Auto-saved resumes you're working on. Downloading costs {DOWNLOAD_RESUME_CREDIT_COST} coins.
            </p>
          </div>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setPage(1); loadProjects(); } }}
            className="px-3 py-2 outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-brand-red" size={48} />
          <p className="text-gray-500 mt-4">Loading your projects...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FolderOpen size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">No projects yet</h2>
          <p className="text-gray-500 mt-2">Start a resume and it will appear here automatically.</p>
          <button
            onClick={() => navigate("/templates?type=resume")}
            className="mt-6 rounded-xl bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red-hover"
          >
            Browse Templates
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
              >
                <div className="h-32 bg-gradient-to-br from-brand-red/10 to-brand-red/5 flex items-center justify-center">
                  <FileText size={42} className="text-brand-red" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-800 truncate" title={project.title}>
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                  )}
                  <p className="text-[11px] text-gray-400 mt-auto pt-2">
                    Last edited:{" "}
                    {project.updatedAt
                      ? new Date(project.updatedAt).toLocaleDateString()
                      : "—"}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleOpenEditor(project)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-200"
                    >
                      <Pencil size={15} /> Edit
                    </button>
                    <button
                      onClick={() => handleDownload(project)}
                      className="flex items-center justify-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800"
                      title={`Download (${DOWNLOAD_RESUME_CREDIT_COST} coins)`}
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="flex items-center justify-center border border-red-200 text-red-600 px-3 py-2.5 rounded-lg hover:bg-red-50"
                      aria-label="Delete project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
              <span>
                Page {page} of {pageCount} · {total} project{total === 1 ? "" : "s"}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((v) => v - 1)}
                  className="rounded-lg border border-gray-200 bg-white p-2 disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  disabled={page >= pageCount}
                  onClick={() => setPage((v) => v + 1)}
                  className="rounded-lg border border-gray-200 bg-white p-2 disabled:opacity-40"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyProjects;