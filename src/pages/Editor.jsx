// Touch-Simply/src/pages/Editor.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Copy, ArrowLeft, AlertTriangle } from "lucide-react";

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

  // Passed from Templates page or Library
  const { templateId, templateTitle, resumeId: existingResumeId } = location.state || {};

  const [resumeId, setResumeId] = useState(existingResumeId || null);
  const [config, setConfig] = useState(null);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const [balance, setBalance] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const [creating, setCreating] = useState(!existingResumeId);
  const [compiling, setCompiling] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [autoCompile, setAutoCompile] = useState(false);

  const debounceRef = useRef(null);
  const configRef = useRef(null);
  configRef.current = config;

  // ─────────────────────────────────────────────
  // BOOTSTRAP: create or load resume + load config
  // ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const fetchBalance = async () => {
      try {
        const w = await getWalletBalance();
        if (!cancelled) setBalance(w.data?.balance ?? 0);
      } catch {
        if (!cancelled) setBalance(null);
      }
    };

    const loadExisting = async (id) => {
      try {
        setCreating(true);
        const ws = await getSimpleWorkspace(id);
        const configUrl = ws.data?.configJsonUrl;
        if (!configUrl) throw new Error("Workspace is missing a config file.");
        const cfg = await loadConfigJson(configUrl);
        if (cancelled) return;
        setConfig(cfg);
        setResumeId(id);
        await fetchBalance();
      } catch (err) {
        if (cancelled) return;
        toast.error(err.message || "Failed to open resume from library.");
        navigate("/library");
      } finally {
        if (!cancelled) setCreating(false);
      }
    };

    if (existingResumeId) {
      loadExisting(existingResumeId);
      return () => { cancelled = true; };
    }

    if (!templateId) {
      toast.error("No template selected. Redirecting...");
      navigate("/templates");
      return;
    }

    const sessionKey = `${EDITOR_SESSION_KEY}-${templateId}`;

    (async () => {
      try {
        setCreating(true);

        // 0. Check session storage for existing resume
        const saved = sessionStorage.getItem(sessionKey);
        if (saved) {
          const { resumeId: savedId, templateId: savedTemplate } = JSON.parse(saved);
          if (savedTemplate === templateId) {
            const ws = await getSimpleWorkspace(savedId);
            const configUrl = ws.data?.configJsonUrl;
            if (configUrl) {
              const cfg = await loadConfigJson(configUrl);
              if (cancelled) return;
              setResumeId(savedId);
              setConfig(cfg);
              await fetchBalance();
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

        sessionStorage.setItem(sessionKey, JSON.stringify({ resumeId: resume.id, templateId }));

        // 2. Load config JSON
        let configJsonUrl = createRes.data?.configJsonUrl;
        if (!configJsonUrl) {
          const ws = await getSimpleWorkspace(resume.id);
          configJsonUrl = ws.data?.configJsonUrl;
        }
        if (!configJsonUrl) throw new Error("Backend did not return configJsonUrl — template config not available");

        const cfg = await loadConfigJson(configJsonUrl);
        if (cancelled) return;
        setConfig(cfg);

        // 3. Wallet balance
        await fetchBalance();
      } catch (err) {
        if (cancelled) return;
        toast.error(err.message || "Failed to prepare editor");
        navigate("/templates");
      } finally {
        if (!cancelled) setCreating(false);
      }
    })();

    return () => { cancelled = true; };
  }, [templateId, templateTitle, existingResumeId, navigate]);

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
      const urls = images.map((b64) => `data:image/png;base64,${b64}`);
      setPreviewImageUrls(urls);
      setIsDirty(false); // Compiled state matches saved state
      if (urls.length === 0) toast.warn("Compile succeeded but returned no pages");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Compile failed");
    } finally {
      setCompiling(false);
    }
  }, [resumeId, persistConfig]);

  const scheduleAutoCompile = useCallback(() => {
    if (!autoCompile) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { doCompile(); }, AUTO_COMPILE_MS);
  }, [autoCompile, doCompile]);

  // ─────────────────────────────────────────────
  // FORM CHANGE HANDLERS
  // ─────────────────────────────────────────────
  const handleChange = (path, value) => {
    setConfig((prev) => setValueAtPath(prev, [...path, "current_value"], value));
    setIsDirty(true);
    scheduleAutoCompile();
  };

  const addArrayField = (path) => {
    setConfig((prev) => {
      const items = getValueAtPath(prev, path);
      if (!Array.isArray(items) || items.length === 0) return prev;
      return setValueAtPath(prev, path, [...items, createEmptyConfigNode(items[0])]);
    });
    setIsDirty(true);
    scheduleAutoCompile();
  };

  const removeArrayField = (path, index) => {
    setConfig((prev) => {
      const items = getValueAtPath(prev, path);
      if (!Array.isArray(items) || items.length <= 1) return prev;
      return setValueAtPath(prev, path, items.filter((_, itemIndex) => itemIndex !== index));
    });
    setIsDirty(true);
    scheduleAutoCompile();
  };

  // ─────────────────────────────────────────────
  // DOWNLOAD with confirmation & conditional cost
  // ─────────────────────────────────────────────
  const handleDownload = async () => {
    if (!resumeId) return;
    if (previewImageUrls.length === 0) {
      toast.warn("Compile first before downloading");
      return;
    }

    const firstDownload = !isAlreadyDownloaded(resumeId);
    const needsCredits = isDirty || firstDownload;

    if (needsCredits) {
      if (balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST) {
        toast.error(`Not enough coins. ${DOWNLOAD_RESUME_CREDIT_COST} coins needed.`);
        navigate("/credits/buy", { state: { from: "/editor", needed: DOWNLOAD_RESUME_CREDIT_COST } });
        return;
      }
      const message = isDirty
        ? `This resume has been modified. Downloading it will cost ${DOWNLOAD_RESUME_CREDIT_COST} coins. Continue?`
        : `Downloading this resume for the first time will cost ${DOWNLOAD_RESUME_CREDIT_COST} coins. Continue?`;
      if (!window.confirm(message)) {
        return;
      }
    }

    setDownloading(true);
    try {
      const res = await downloadResume(resumeId);
      const downloadUrlOrBase64 = res.data?.downloadUrl;
      if (!downloadUrlOrBase64) throw new Error("No download payload returned");

      if (downloadUrlOrBase64.startsWith("JVBER") || (downloadUrlOrBase64.length > 2000 && !downloadUrlOrBase64.startsWith("http"))) {
        const byteChars = atob(downloadUrlOrBase64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
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
        window.open(downloadUrlOrBase64, "_blank");
      }

      if (needsCredits) {
        try {
          const w = await getWalletBalance();
          setBalance(w.data?.balance ?? 0);
          window.dispatchEvent(new Event("touchsimply:balance-changed"));
        } catch { /* ignore */ }
        markDownloaded(resumeId);
        toast.success(`Downloaded (${DOWNLOAD_RESUME_CREDIT_COST} coins deducted)`);
      } else {
        toast.success("Downloaded");
      }
      setIsDirty(false);
    } catch (err) {
      const status = err.response?.status;
      if (status === 402 || status === 400) {
        toast.error(`Not enough coins. ${DOWNLOAD_RESUME_CREDIT_COST} coins needed. Redirecting...`);
        navigate("/credits/buy", { state: { from: "/editor", needed: DOWNLOAD_RESUME_CREDIT_COST } });
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
      sessionStorage.removeItem(`${EDITOR_SESSION_KEY}-${templateId}`);
      sessionStorage.setItem(`${EDITOR_SESSION_KEY}-${templateId}`, JSON.stringify({ resumeId: newId, templateId }));
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

  const downloadLocked = balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg" title="Go back" aria-label="Go back"><ArrowLeft size={18} /></button>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              {templateTitle || "Resume Editor"}
            </h1>
            <p className="text-[11px] text-gray-500">
              {resumeId ? `ID: ${resumeId.slice(0, 8)}…` : ""}
              {isDirty && <span className="ml-2 text-amber-600 font-medium">• Unsaved changes</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full">
            <span className="font-bold">{balance ?? "—"}</span>
            <span>coins</span>
          </div>
          <button onClick={handleClone} className="flex items-center gap-1 text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50">
            <Copy size={13} /> Clone
          </button>
          {saving && <span className="text-[11px] text-gray-400">Saving…</span>}
        </div>
      </div>

      {downloadLocked && (
        <div className="flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900">
          <AlertTriangle size={14} />
          You need {DOWNLOAD_RESUME_CREDIT_COST} coins to download. Your balance is low.
          <button onClick={() => navigate("/credits/buy")} className="font-bold underline">Buy coins</button>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
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

        <div className="w-full md:w-1/2 p-4 md:p-6 border-t md:border-t-0 md:border-l bg-white">
          <WatermarkedPreview
            previewImageUrls={previewImageUrls}
            compiling={compiling}
            onCompile={doCompile}
            onDownload={handleDownload}
            downloadDisabled={downloading || previewImageUrls.length === 0 || downloadLocked}
            downloadLocked={downloadLocked}
            autoCompileEnabled={autoCompile}
            onToggleAutoCompile={() => setAutoCompile((v) => !v)}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
