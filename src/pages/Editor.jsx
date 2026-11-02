// Touch-Simply/src/pages/Editor.jsx
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Loader2,
  Copy,
  ArrowLeft,
  AlertTriangle,
  Coins,
  Check,
  PencilLine,
} from "lucide-react";

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

// ─────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────
const getValueAtPath = (value, path) =>
  path.reduce((current, key) => current?.[key], value);

const setValueAtPath = (value, path, nextValue) => {
  if (path.length === 0) return nextValue;

  const [key, ...remainingPath] = path;
  const next = Array.isArray(value) ? [...value] : { ...value };
  next[key] = setValueAtPath(value?.[key], remainingPath, nextValue);
  return next;
};

/**
 * Template ke default (sample) text ko hata deta hai.
 * Har node jiske paas string `current_value` hai, uska value "" ho jata hai
 * aur purana sample value `placeholder` me chala jata hai
 * (agar DynamicForm placeholder support karta hai to wahi grey hint dikhega).
 */
const clearConfigValues = (node) => {
  if (Array.isArray(node)) return node.map(clearConfigValues);
  if (node && typeof node === "object") {
    const out = {};
    for (const key of Object.keys(node)) out[key] = clearConfigValues(node[key]);
    if (typeof node.current_value === "string") {
      out.placeholder = node.placeholder || node.current_value;
      out.current_value = "";
    }
    return out;
  }
  return node;
};

/** form completion progress ke liye */
const countFields = (node) => {
  if (Array.isArray(node)) {
    return node.reduce(
      (acc, item) => {
        const r = countFields(item);
        return { total: acc.total + r.total, filled: acc.filled + r.filled };
      },
      { total: 0, filled: 0 }
    );
  }
  if (node && typeof node === "object") {
    if (typeof node.current_value === "string") {
      return { total: 1, filled: node.current_value.trim() ? 1 : 0 };
    }
    return Object.values(node).reduce(
      (acc, item) => {
        const r = countFields(item);
        return { total: acc.total + r.total, filled: acc.filled + r.filled };
      },
      { total: 0, filled: 0 }
    );
  }
  return { total: 0, filled: 0 };
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

// ─────────────────────────────────────────────
// Form + page styling (DynamicForm ko bina chhede restyle karta hai)
// ─────────────────────────────────────────────
const EDITOR_CSS = `
.ts-editor {
  --ink: #16141f;
  --ink-soft: #5d5a6e;
  --line: #e4e1f0;
  --violet: #5b3df5;
  --violet-deep: #3f27c9;
  --brand: #e0301e;
  --paper: #f3f2f9;
}
.ts-editor-bg {
  background:
    radial-gradient(900px 420px at 8% -10%, rgba(91,61,245,.12), transparent 60%),
    radial-gradient(700px 380px at 100% 0%, rgba(224,48,30,.07), transparent 60%),
    var(--paper);
}

/* ---------- form column ---------- */
.ts-form h1, .ts-form h2, .ts-form h3 { color: var(--ink); letter-spacing: -0.01em; }

.ts-form > div,
.ts-form > section,
.ts-form > form > div,
.ts-form > form > section {
  background: #fff;
  border: 1px solid var(--line) !important;
  border-radius: 20px !important;
  box-shadow: 0 1px 0 rgba(22,20,31,.03), 0 12px 32px -18px rgba(63,39,201,.28) !important;
  position: relative;
}
.ts-form > div:not(:last-child),
.ts-form > section:not(:last-child),
.ts-form > form > div:not(:last-child),
.ts-form > form > section:not(:last-child) { margin-bottom: 20px; }

.ts-form label {
  color: var(--ink-soft);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .01em;
  margin-bottom: 6px;
}
.ts-form input,
.ts-form textarea,
.ts-form select {
  width: 100%;
  background: #faf9fe;
  border: 1.5px solid var(--line) !important;
  border-radius: 12px !important;
  color: var(--ink);
  font-size: 14px;
  padding: 11px 14px;
  transition: border-color .15s, box-shadow .15s, background .15s;
}
.ts-form input::placeholder,
.ts-form textarea::placeholder { color: #aaa6bf; }
.ts-form input:hover,
.ts-form textarea:hover { border-color: #cfc9ec !important; }
.ts-form input:focus,
.ts-form textarea:focus,
.ts-form select:focus {
  outline: none;
  background: #fff;
  border-color: var(--violet) !important;
  box-shadow: 0 0 0 4px rgba(91,61,245,.14);
}
.ts-form button { transition: background .15s, color .15s, border-color .15s; }

/* ---------- preview "desk" ---------- */
.ts-desk {
  background:
    radial-gradient(600px 300px at 50% 0%, rgba(255,255,255,.08), transparent 70%),
    #1d1a2b;
  border-radius: 24px;
  padding: 18px;
  box-shadow: 0 30px 60px -30px rgba(22,20,31,.55);
}
.ts-sheet {
  background: #fff;
  border-radius: 14px;
  padding: 14px;
  min-height: 420px;
}

@media (prefers-reduced-motion: no-preference) {
  .ts-progress-bar { transition: width .5s cubic-bezier(.2,.8,.2,1); }
}
`;

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
        setConfig(cfg); // library resume: user ka apna data, clear nahi karna
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
      toast.info("Choose a resume template to start.");
      navigate("/templates?type=resume", { replace: true });
      return;
    }

    const sessionKey = `${EDITOR_SESSION_KEY}-${templateId}`;

    (async () => {
      try {
        setCreating(true);

        // 0. Check session storage for existing resume (user ka kaam wapas aaye)
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

        // ✅ Naya resume: template ka sample data (Aditya Kumar etc.) hata do
        const blankCfg = clearConfigValues(cfg);
        setConfig(blankCfg);

        // server par bhi blank config save karo, taaki reload par purana sample wapas na aaye
        try {
          await uploadConfigJson(resume.id, blankCfg);
        } catch {
          /* agar fail ho to compile ke time save ho jayega */
        }

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

  // unmount par pending auto-compile timer saaf karo
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

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
  // derived
  // ─────────────────────────────────────────────
  const { total, filled } = useMemo(
    () => (config ? countFields(config) : { total: 0, filled: 0 }),
    [config]
  );
  const percent = total ? Math.round((filled / total) * 100) : 0;

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  if (creating) {
    return (
      <div className="ts-editor ts-editor-bg min-h-screen flex items-center justify-center">
        <style>{EDITOR_CSS}</style>
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-10 py-9 shadow-xl border border-[#e4e1f0]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#5b3df5]/20 blur-xl" />
            <Loader2 className="relative animate-spin text-[#5b3df5]" size={34} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#16141f]">Setting up your editor</p>
            <p className="text-xs text-[#5d5a6e] mt-1">Template load ho raha hai, bas ek second…</p>
          </div>
        </div>
      </div>
    );
  }

  const downloadLocked = balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST;

  return (
    <div className="ts-editor ts-editor-bg min-h-screen flex flex-col">
      <style>{EDITOR_CSS}</style>

      {/* ───────── top bar ───────── */}
      <div className="sticky top-0 z-30 border-b border-[#e4e1f0] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/templates?type=resume")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e4e1f0] bg-white text-[#16141f] hover:border-[#5b3df5] hover:text-[#5b3df5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b3df5]"
              title="Back to resume templates"
              aria-label="Back to resume templates"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-[#16141f] md:text-lg">
                {templateTitle || "Resume Editor"}
              </h1>
              <p className="flex items-center gap-2 text-[11px] text-[#5d5a6e]">
                {resumeId && <span>ID {resumeId.slice(0, 8)}</span>}
                {saving ? (
                  <span className="inline-flex items-center gap-1 text-[#5b3df5]">
                    <Loader2 size={11} className="animate-spin" /> Saving
                  </span>
                ) : isDirty ? (
                  <span className="inline-flex items-center gap-1 font-medium text-amber-600">
                    <PencilLine size={11} /> Unsaved changes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <Check size={11} /> All changes saved
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* progress (desktop) */}
          <div className="hidden w-64 lg:block">
            <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-[#5d5a6e]">
              <span>Resume completion</span>
              <span className="text-[#16141f]">{percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e9e6f7]">
              <div
                className="ts-progress-bar h-full rounded-full bg-gradient-to-r from-[#5b3df5] to-[#e0301e]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/credits/buy")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold ${
                downloadLocked
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
              title="Your coin balance"
            >
              <Coins size={14} />
              {balance ?? "—"} coins
            </button>
            <button
              onClick={handleClone}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#e4e1f0] bg-white px-3.5 py-2 text-xs font-semibold text-[#16141f] hover:border-[#5b3df5] hover:text-[#5b3df5]"
            >
              <Copy size={14} /> <span className="hidden sm:inline">Clone</span>
            </button>
          </div>
        </div>
      </div>

      {downloadLocked && (
        <div className="flex items-center justify-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          <AlertTriangle size={14} />
          Download ke liye {DOWNLOAD_RESUME_CREDIT_COST} coins chahiye. Aapka balance kam hai.
          <button onClick={() => navigate("/credits/buy")} className="font-bold underline">
            Buy coins
          </button>
        </div>
      )}

      {/* ───────── body ───────── */}
      <div className="mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 gap-6 px-4 py-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* form */}
        <section className="min-w-0">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#16141f]">Fill in your details</h2>
              <p className="text-sm text-[#5d5a6e]">
                Jo likhoge wahi aapke resume me aayega. Fields khali hain, apna data bharo.
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5b3df5] border border-[#e4e1f0] lg:hidden">
              {percent}% done
            </span>
          </div>

          <div className="ts-form">
            {config ? (
              <DynamicForm
                config={config}
                onChange={handleChange}
                onAddArrayField={addArrayField}
                onRemoveArrayField={removeArrayField}
              />
            ) : (
              <p className="text-sm text-[#5d5a6e]">Loading form…</p>
            )}
          </div>
        </section>

        {/* preview */}
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="ts-desk">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-white">Live preview</p>
              <p className="text-[11px] text-white/60">
                {previewImageUrls.length > 0
                  ? `${previewImageUrls.length} page${previewImageUrls.length > 1 ? "s" : ""}`
                  : "Compile dabao preview dekhne ke liye"}
              </p>
            </div>

            <div className="ts-sheet">
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
        </aside>
      </div>
    </div>
  );
};

export default Editor;