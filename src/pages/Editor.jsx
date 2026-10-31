// Touch-Simply/src/pages/Editor.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Copy, ArrowLeft } from "lucide-react";

import {
  createResumeFromTemplate,
  compileResume,
  downloadResume,
  cloneResume,
  getSimpleWorkspace,
  uploadConfigJson,
} from "../services/resumeService";
import { getWalletBalance } from "../services/walletService";
import {
  loadConfigJson,
  createEmptyConfigNode,
} from "../utils/configJsonLoader";

import DynamicForm from "../components/DynamicForm";
import WatermarkedPreview from "../components/WatermarkedPreview";

const DOWNLOADED_KEY = "touchsimply-downloaded-resumes";
const EDITOR_SESSION_KEY = "touchsimply-editor-session";
const AUTO_COMPILE_MS = 3000;
const DOWNLOAD_RESUME_CREDIT_COST = 4;

const getValueAtPath = (value, path) =>
  path.reduce((current, key) => current?.[key], value);

const setValueAtPath = (value, path, nextValue) => {
  if (path.length === 0) return nextValue;

  const [key, ...remainingPath] = path;
  const next = Array.isArray(value) ? [...value] : { ...value };
  next[key] = setValueAtPath(value?.[key], remainingPath, nextValue);
  return next;
};

const isAlreadyDownloaded = (id) => {
  try {
    const list = JSON.parse(localStorage.getItem(DOWNLOADED_KEY) || "[]");
    return list.includes(id);
  } catch {
    return false;
  }
};

const markDownloaded = (id) => {
  try {
    const list = JSON.parse(localStorage.getItem(DOWNLOADED_KEY) || "[]");
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(DOWNLOADED_KEY, JSON.stringify(list));
    }
  } catch {
    // ignore
  }
};

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Passed from Templates page
  const { templateId, templateTitle } = location.state || {};

  const [resumeId, setResumeId] = useState(null);
  const [config, setConfig] = useState(null);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const [balance, setBalance] = useState(null);

  const [creating, setCreating] = useState(true);
  const [compiling, setCompiling] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [autoCompile, setAutoCompile] = useState(false);

  const debounceRef = useRef(null);
  const configRef = useRef(null);
  configRef.current = config;

  // ─────────────────────────────────────────────
  // BOOTSTRAP: create resume + load config
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!templateId) {
      toast.error("No template selected. Redirecting...");
      navigate("/templates");
      return;
    }
    let cancelled = false;
    const sessionKey = `${EDITOR_SESSION_KEY}-${templateId}`;

    (async () => {
      try {
        setCreating(true);

        // 0. Check session storage for existing resume
        const saved = sessionStorage.getItem(sessionKey);
        if (saved) {
          const { resumeId: savedId, templateId: savedTemplate } =
            JSON.parse(saved);
          if (savedTemplate === templateId) {
            setResumeId(savedId);
            const ws = await getSimpleWorkspace(savedId);
            const configUrl = ws.data?.configJsonUrl;
            if (configUrl) {
              const cfg = await loadConfigJson(configUrl);
              setConfig(cfg);

              // Wallet balance
              try {
                const w = await getWalletBalance();
                setBalance(w.data?.balance ?? 0);
              } catch {
                setBalance(null);
              }

              setCreating(false);
              return;
            }
          }
        }

        // 1. Create resume record
        const createRes = await createResumeFromTemplate(templateId, {
          title: templateTitle || "Untitled Resume",
          description: "Created from editor",
        });

        if (cancelled) return;

        const resume = createRes.data?.resume;
        if (!resume?.id) throw new Error("Backend did not return resume id");
        setResumeId(resume.id);

        // Save to session
        sessionStorage.setItem(
          sessionKey,
          JSON.stringify({
            resumeId: resume.id,
            templateId,
          })
        );

        // 2. Load config JSON
        let configJsonUrl = createRes.data?.configJsonUrl;
        if (!configJsonUrl) {
          const ws = await getSimpleWorkspace(resume.id);
          configJsonUrl = ws.data?.configJsonUrl;
        }

        if (!configJsonUrl) {
          throw new Error(
            "Backend did not return configJsonUrl — template config not available"
          );
        }
        const cfg = await loadConfigJson(configJsonUrl);
        if (cancelled) return;

        setConfig(cfg);

        // 3. Wallet balance
        try {
          const w = await getWalletBalance();
          setBalance(w.data?.balance ?? 0);
        } catch {
          setBalance(null);
        }
      } catch (err) {
        if (cancelled) return;
        toast.error(err.message || "Failed to prepare editor");
        navigate("/templates");
      } finally {
        if (!cancelled) setCreating(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [templateId, templateTitle, navigate]);

  // ─────────────────────────────────────────────
  // PERSIST CONFIG JSON
  // ─────────────────────────────────────────────
  const persistConfig = useCallback(async () => {
    if (!resumeId || !configRef.current) return;
    setSaving(true);
    try {
      await uploadConfigJson(resumeId, configRef.current);
    } finally {
      setSaving(false);
    }
  }, [resumeId]);

  // ─────────────────────────────────────────────
  // COMPILE
  // ─────────────────────────────────────────────
  const doCompile = useCallback(async () => {
    if (!resumeId) return;
    setCompiling(true);
    try {
      await persistConfig();

      const res = await compileResume(resumeId);
      const images = res.data?.images || [];
      // Convert base64 PNG buffers to data URLs
      const urls = images.map((b64) => `data:image/png;base64,${b64}`);
      setPreviewImageUrls(urls);

      if (urls.length === 0) {
        toast.warn("Compile succeeded but returned no pages");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Compile failed"
      );
    } finally {
      setCompiling(false);
    }
  }, [resumeId, persistConfig]);

  const scheduleAutoCompile = useCallback(() => {
    if (!autoCompile) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doCompile();
    }, AUTO_COMPILE_MS);
  }, [autoCompile, doCompile]);

  // ─────────────────────────────────────────────
  // FORM CHANGE HANDLERS
  // ─────────────────────────────────────────────
  const handleChange = (path, value) => {
    setConfig((prev) =>
      setValueAtPath(prev, [...path, "current_value"], value)
    );
    scheduleAutoCompile();
  };

  const addArrayField = (path) => {
    setConfig((prev) => {
      const items = getValueAtPath(prev, path);
      if (!Array.isArray(items) || items.length === 0) return prev;
      return setValueAtPath(prev, path, [
        ...items,
        createEmptyConfigNode(items[0]),
      ]);
    });
    scheduleAutoCompile();
  };

  const removeArrayField = (path, index) => {
    setConfig((prev) => {
      const items = getValueAtPath(prev, path);
      if (!Array.isArray(items) || items.length <= 1) return prev;
      return setValueAtPath(
        prev,
        path,
        items.filter((_, itemIndex) => itemIndex !== index)
      );
    });
    scheduleAutoCompile();
  };

  // ─────────────────────────────────────────────
  // DOWNLOAD (credit deduction on first download)
  // ─────────────────────────────────────────────
  const handleDownload = async () => {
    if (!resumeId) return;
    if (previewImageUrls.length === 0) {
      toast.warn("Compile first before downloading");
      return;
    }

    setDownloading(true);
    try {
      const res = await downloadResume(resumeId);
      const downloadUrlOrBase64 = res.data?.downloadUrl;

      if (!downloadUrlOrBase64) throw new Error("No download payload returned");

      // Heuristic: if it looks like a base64 PDF (starts with JVBER which is "%PDF"), decode it.
      if (
        downloadUrlOrBase64.startsWith("JVBER") ||
        (downloadUrlOrBase64.length > 2000 &&
          !downloadUrlOrBase64.startsWith("http"))
      ) {
        // Decode base64 → Blob → trigger download
        const byteChars = atob(downloadUrlOrBase64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${templateTitle || "resume"}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // It's an actual URL — open in new tab
        window.open(downloadUrlOrBase64, "_blank");
      }

      try {
        const w = await getWalletBalance();
        setBalance(w.data?.balance ?? 0);
        // Notify navbar
        window.dispatchEvent(new Event("touchsimply:balance-changed"));
      } catch {
        // ignore
      }

      const firstTime = !isAlreadyDownloaded(resumeId);
      markDownloaded(resumeId);
      toast.success(
        firstTime
          ? `Downloaded (${DOWNLOAD_RESUME_CREDIT_COST} credits deducted)`
          : "Downloaded"
      );
    } catch (err) {
      const status = err.response?.status;
      if (status === 402 || status === 400) {
        toast.error(
          `Insufficient credits. ${DOWNLOAD_RESUME_CREDIT_COST} credits needed. Redirecting...`
        );
        navigate("/credits/buy", {
          state: { from: "/editor", needed: DOWNLOAD_RESUME_CREDIT_COST },
        });
      } else {
        toast.error(err.response?.data?.message || "Download failed");
      }
    } finally {
      setDownloading(false);
    }
  };

  // ─────────────────────────────────────────────
  // CLONE
  // ─────────────────────────────────────────────
  const handleClone = async () => {
    if (!templateId) return;
    try {
      const res = await cloneResume(templateId, templateTitle || "Resume");
      const newId = res.data?.resume?.id;
      if (!newId) throw new Error("Clone did not return new resume");
      // Clear the session key so bootstrap creates a fresh entry for the clone
      sessionStorage.removeItem(`${EDITOR_SESSION_KEY}-${templateId}`);
      // Seed the session with the new resumeId
      sessionStorage.setItem(`${EDITOR_SESSION_KEY}-${templateId}`, JSON.stringify({
        resumeId: newId, templateId,
      }));
      toast.success("Cloned! Opening new resume...");
      navigate("/editor", {
        state: { templateId, templateTitle: `${templateTitle} (Clone)` },
        replace: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Clone failed");
    }
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  if (creating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-600">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-sm">Preparing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/templates")}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Back to templates"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              {templateTitle || "Resume Editor"}
            </h1>
            <p className="text-[11px] text-gray-500">
              {resumeId ? `ID: ${resumeId.slice(0, 8)}…` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full">
            <span className="font-bold">{balance ?? "—"}</span>
            <span>credits</span>
          </div>
          <button
            onClick={handleClone}
            className="flex items-center gap-1 text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <Copy size={13} /> Clone
          </button>
          {saving && (
            <span className="text-[11px] text-gray-400">Saving…</span>
          )}
        </div>
      </div>

      {/* SPLIT PANES */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT: form */}
        <div className="w-full md:w-1/2 overflow-y-auto p-4 md:p-6">
          {config ? (
            <DynamicForm
              config={config}
              onChange={handleChange}
              onAddArrayField={addArrayField}
              onRemoveArrayField={removeArrayField}
            />
          ) : (
            <p className="text-sm text-gray-500">Loading form…</p>
          )}
        </div>

        {/* RIGHT: preview */}
        <div className="w-full md:w-1/2 p-4 md:p-6 border-t md:border-t-0 md:border-l bg-white">
          <WatermarkedPreview
            previewImageUrls={previewImageUrls}
            compiling={compiling}
            onCompile={doCompile}
            onDownload={handleDownload}
            downloadDisabled={downloading || previewImageUrls.length === 0 || (balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST)}
            downloadLocked={balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST}
            autoCompileEnabled={autoCompile}
            onToggleAutoCompile={() => setAutoCompile((v) => !v)}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
