// Touch-Simply/src/pages/Editor.jsx
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Loader2,
  Copy,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Coins,
  Check,
  PencilLine,
  Sparkles,
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
const isObj = (v) => v !== null && typeof v === "object";
const isPlain = (v) => isObj(v) && !Array.isArray(v);

const getValueAtPath = (value, path) =>
  path.reduce((current, key) => current?.[key], value);

const setValueAtPath = (value, path, nextValue) => {
  if (path.length === 0) return nextValue;

  const [key, ...remainingPath] = path;
  const next = Array.isArray(value) ? [...value] : { ...value };
  next[key] = setValueAtPath(value?.[key], remainingPath, nextValue);
  return next;
};

/** Template ke sample data (naam, skills, etc.) ko khali karta hai. */
const clearConfigValues = (node) => {
  if (Array.isArray(node)) return node.map(clearConfigValues);
  if (isPlain(node)) {
    const out = {};
    for (const key of Object.keys(node)) out[key] = clearConfigValues(node[key]);
    const cv = node.current_value;
    if (typeof cv === "string") {
      out.placeholder = node.title || node.label || node.name || "Enter value";
      out.current_value = "";
    } else if (Array.isArray(cv) && cv.every((x) => typeof x === "string")) {
      out.current_value = [];
    }
    return out;
  }
  return node;
};

const fillCleanCVExampleValues = (config) => {
  if (String(config?.template || "").toLowerCase() !== "cleancv") return config;

  const personalDetailHints = {
    gender: "Example: Female",
    father_name: "Enter your father's full name",
    mother_name: "Enter your mother's full name",
    nationality: "Example: Indian",
  };

  const visit = (node) => {
    if (Array.isArray(node)) return node.map(visit);
    if (!isPlain(node)) return node;

    const next = Object.fromEntries(Object.entries(node).map(([key, value]) => [key, visit(value)]));
    if (typeof node.current_value === "string" && !node.current_value.trim()) {
      if (typeof node.default_value === "string" && node.default_value.trim()) {
        next.current_value = node.default_value;
      } else if (personalDetailHints[node.name]) {
        next.placeholder = personalDetailHints[node.name];
      }
    } else if (
      Array.isArray(node.current_value) &&
      node.current_value.length === 0 &&
      Array.isArray(node.default_value) &&
      node.default_value.length > 0
    ) {
      next.current_value = [...node.default_value];
    }
    return next;
  };

  return visit(config);
};

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
  if (isPlain(node)) {
    const cv = node.current_value;
    if (typeof cv === "string") return { total: 1, filled: cv.trim() ? 1 : 0 };
    if (Array.isArray(cv) && cv.every((x) => typeof x === "string"))
      return { total: 1, filled: cv.length ? 1 : 0 };
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

const prettify = (key) =>
  String(key)
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (c) => c.toUpperCase());

/** Agar config kisi wrapper key ke andar hai to uska path nikalta hai. */
const findRootPath = (cfg) => {
  const path = [];
  let node = cfg;
  while (isPlain(node) && !("current_value" in node)) {
    const keys = Object.keys(node);
    if (keys.length !== 1) break;
    const child = node[keys[0]];
    if (!isPlain(child)) break;
    const childSections = Object.keys(child).filter((k) => isObj(child[k]));
    if (childSections.length < 2) break;
    path.push(keys[0]);
    node = child;
  }
  return path;
};

const wrapPath = (path, inner) => path.reduceRight((acc, k) => ({ [k]: acc }), inner);

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
// styling
// ─────────────────────────────────────────────
const EDITOR_CSS = `
.ts-editor {
  --ink: #141414;
  --muted: #6b6767;
  --line: #ece7e5;
  --brand: #e0301e;
  --brand-deep: #b92213;
  --brand-soft: #fdeeeb;
  --paper: #f7f4f3;
}
.ts-editor-bg { background: var(--paper); }

/* ---- form (DynamicForm ko restyle karta hai) ---- */
.ts-form > div,
.ts-form > section,
.ts-form > form > div,
.ts-form > form > section {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.ts-form h1, .ts-form h2, .ts-form h3 {
  color: var(--ink);
  font-size: 15px;
  letter-spacing: -0.01em;
}
.ts-form label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}
.ts-form input,
.ts-form textarea,
.ts-form select {
  width: 100%;
  background: #fff;
  border: 1.5px solid var(--line) !important;
  border-radius: 10px !important;
  color: var(--ink);
  font-size: 13.5px;
  padding: 8px 12px;
  transition: border-color .15s, box-shadow .15s;
}
.ts-form textarea { min-height: 84px; }
.ts-form input::placeholder,
.ts-form textarea::placeholder { color: #b4aeac; }
.ts-form input:hover,
.ts-form textarea:hover { border-color: #ddd3d0 !important; }
.ts-form input:focus,
.ts-form textarea:focus,
.ts-form select:focus {
  outline: none;
  border-color: var(--brand) !important;
  box-shadow: 0 0 0 3px rgba(224,48,30,.15);
}
/* "Entry 1 / Remove" jaise andar ke cards ko halka karo */
.ts-form [class*="rounded"][class*="border"] {
  border-color: var(--line) !important;
  border-radius: 14px !important;
  background: #fffdfc;
}
.ts-form button[class*="red"], .ts-form button[class*="text-red"] { color: var(--brand) !important; }
.ts-form button:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }

/* ---- preview panel: violet buttons ko brand red karo ---- */
.ts-preview button[class*="violet"],
.ts-preview button[class*="purple"],
.ts-preview button[class*="indigo"] {
  background: var(--brand) !important;
  background-image: none !important;
  border-color: var(--brand) !important;
  color: #fff !important;
}
.ts-preview button[class*="violet"]:hover,
.ts-preview button[class*="purple"]:hover,
.ts-preview button[class*="indigo"]:hover { background: var(--brand-deep) !important; }

/* thin scrollbars */
.ts-scroll { scrollbar-width: thin; scrollbar-color: #d9cfcb transparent; }
.ts-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
.ts-scroll::-webkit-scrollbar-thumb { background: #d9cfcb; border-radius: 8px; }

@media (prefers-reduced-motion: no-preference) {
  .ts-progress-bar { transition: width .45s cubic-bezier(.2,.8,.2,1); }
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

  const [activeIdx, setActiveIdx] = useState(0);
  const [workH, setWorkH] = useState(null);

  const debounceRef = useRef(null);
  const configRef = useRef(null);
  const workRef = useRef(null);
  const bodyRef = useRef(null);
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
        setConfig(fillCleanCVExampleValues(cfg));
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

        // 0. Session me pehle se resume hai to wahi kholo (user ka data safe rahe)
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
              setConfig(fillCleanCVExampleValues(cfg));
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

        // New resumes start blank. Clean CV then seeds its known dummy examples
        // into empty fields so users can see what to replace, like Premium CV.
        const blankCfg = fillCleanCVExampleValues(clearConfigValues(cfg));
        setConfig(blankCfg);
        try {
          await uploadConfigJson(resume.id, blankCfg);
        } catch {
          /* compile ke time save ho jayega */
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

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  // workspace ko screen ki bachi hui height me fit karo (desktop par)
  useEffect(() => {
    const measure = () => {
      if (!workRef.current || window.innerWidth < 1024) {
        setWorkH(null);
        return;
      }
      const top = workRef.current.getBoundingClientRect().top + window.scrollY;
      setWorkH(Math.max(560, window.innerHeight - top));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // navbar/fonts load hone ke baad
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [creating]);

  // ─────────────────────────────────────────────
  // PERSIST / COMPILE
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

  const doCompile = useCallback(async () => {
    if (!resumeId) return;
    setCompiling(true);
    try {
      await persistConfig();
      const res = await compileResume(resumeId);
      const images = res.data?.images || [];
      const urls = images.map((b64) => `data:image/png;base64,${b64}`);
      setPreviewImageUrls(urls);
      setIsDirty(false);
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
  // DOWNLOAD
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
      if (!window.confirm(message)) return;
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
  // derived: sections (tabs)
  // ─────────────────────────────────────────────
  const rootPath = useMemo(() => (config ? findRootPath(config) : []), [config]);

  const sections = useMemo(() => {
    if (!config) return [];
    const node = getValueAtPath(config, rootPath);
    if (!isPlain(node)) return [];
    return Object.keys(node)
      .filter((k) => isObj(node[k]))
      .map((key) => {
        const val = node[key];
        const stats = countFields(val);
        const defaultLabel =
          (isPlain(val) && typeof val.label === "string" && val.label) ||
          (isPlain(val) && typeof val.title === "string" && val.title) ||
          prettify(key);
        const label = key.toLowerCase() === "header" ? "Personal Information" : defaultLabel;
        return { key, label, ...stats };
      });
  }, [config, rootPath]);

  const safeIdx = Math.min(activeIdx, Math.max(sections.length - 1, 0));
  const activeSection = sections[safeIdx];

  const viewConfig = useMemo(() => {
    if (!config || !activeSection) return config;
    const value = getValueAtPath(config, [...rootPath, activeSection.key]);
    return wrapPath(rootPath, { [activeSection.key]: value });
  }, [config, rootPath, activeSection]);

  const total = sections.reduce((a, s) => a + s.total, 0);
  const filled = sections.reduce((a, s) => a + s.filled, 0);
  const percent = total ? Math.round((filled / total) * 100) : 0;

  const goTo = (i) => {
    setActiveIdx(i);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  if (creating) {
    return (
      <div className="ts-editor ts-editor-bg flex min-h-[70vh] items-center justify-center">
        <style>{EDITOR_CSS}</style>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#ece7e5] bg-white px-10 py-9 shadow-lg">
          <Loader2 className="animate-spin text-[#e0301e]" size={32} />
          <div className="text-center">
            <p className="text-sm font-semibold text-[#141414]">Setting up your editor</p>
            <p className="mt-1 text-xs text-[#6b6767]">Loading your template…</p>
          </div>
        </div>
      </div>
    );
  }

  const downloadLocked = balance !== null && balance < DOWNLOAD_RESUME_CREDIT_COST;
  const isLast = safeIdx >= sections.length - 1;

  return (
    <div
      ref={workRef}
      style={workH ? { height: workH } : undefined}
      className="ts-editor ts-editor-bg flex flex-col"
    >
      <style>{EDITOR_CSS}</style>

      {/* ───────── toolbar ───────── */}
      <div className="shrink-0 border-b border-[#ece7e5] bg-white">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/templates?type=resume")}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#ece7e5] text-[#141414] hover:border-[#e0301e] hover:text-[#e0301e]"
              title="Back to resume templates"
              aria-label="Back to resume templates"
            >
              <ArrowLeft size={17} />
            </button>
            <span className="hidden h-8 w-1 rounded-full bg-[#e0301e] sm:block" />
            <div className="min-w-0">
              <h1 className="truncate text-[15px] font-bold leading-tight text-[#141414]">
                {templateTitle || "Resume Editor"}
              </h1>
              <p className="flex items-center gap-2 text-[11px] text-[#6b6767]">
                {saving ? (
                  <span className="inline-flex items-center gap-1 text-[#e0301e]">
                    <Loader2 size={11} className="animate-spin" /> Saving…
                  </span>
                ) : isDirty ? (
                  <span className="inline-flex items-center gap-1 font-medium text-amber-600">
                    <PencilLine size={11} /> Unsaved changes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-emerald-600">
                    <Check size={11} /> Saved
                  </span>
                )}
                {resumeId && <span className="text-[#b4aeac]">ID {resumeId.slice(0, 8)}</span>}
              </p>
            </div>
          </div>

          <div className="hidden w-60 md:block">
            <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-[#6b6767]">
              <span>Completed</span>
              <span className="text-[#141414]">{percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#f0e9e7]">
              <div
                className="ts-progress-bar h-full rounded-full bg-gradient-to-r from-[#e0301e] to-[#ff7a59]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/credits/buy")}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f3c4bd] bg-[#fdeeeb] px-3 py-1.5 text-xs font-bold text-[#b92213] hover:bg-[#fbdcd7]"
              title="Your coin balance"
            >
              <Coins size={13} />
              {balance ?? "—"} coins
            </button>
            <button
              onClick={handleClone}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#ece7e5] bg-white px-3 py-1.5 text-xs font-semibold text-[#141414] hover:border-[#e0301e] hover:text-[#e0301e]"
            >
              <Copy size={13} /> <span className="hidden sm:inline">Clone</span>
            </button>
          </div>
        </div>

        {downloadLocked && (
          <div className="flex items-center justify-center gap-2 border-t border-[#f3c4bd] bg-[#fdeeeb] px-4 py-1.5 text-xs text-[#8f1a0e]">
            <AlertTriangle size={13} />
            You need {DOWNLOAD_RESUME_CREDIT_COST} coins to download.
            <button onClick={() => navigate("/credits/buy")} className="font-bold underline">
              Buy coins
            </button>
          </div>
        )}
      </div>

      {/* ───────── workspace ───────── */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 p-3 md:p-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* form panel */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#ece7e5] bg-white shadow-sm">
          {/* section tabs */}
          <div className="ts-scroll shrink-0 overflow-x-auto border-b border-[#ece7e5] px-3 py-2.5">
            <div className="flex w-max gap-1.5">
              {sections.map((s, i) => {
                const active = i === safeIdx;
                const done = s.total > 0 && s.filled === s.total;
                return (
                  <button
                    key={s.key}
                    onClick={() => goTo(i)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                      active
                        ? "bg-[#e0301e] text-white shadow-sm"
                        : "bg-[#f7f4f3] text-[#4a4646] hover:bg-[#fdeeeb] hover:text-[#b92213]"
                    }`}
                  >
                    {done && !active && <Check size={13} className="text-emerald-600" />}
                    {s.label}
                    {s.total > 0 && (
                      <span
                        className={`rounded-full px-1.5 text-[10px] font-bold ${
                          active ? "bg-white/25 text-white" : "bg-white text-[#6b6767]"
                        }`}
                      >
                        {s.filled}/{s.total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* active section body */}
          <div ref={bodyRef} className="ts-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5">
            <div className="ts-form">
              {viewConfig ? (
                <DynamicForm
                  key={activeSection?.key}
                  config={viewConfig}
                  onChange={handleChange}
                  onAddArrayField={addArrayField}
                  onRemoveArrayField={removeArrayField}
                />
              ) : (
                <p className="text-sm text-[#6b6767]">Loading form…</p>
              )}
            </div>
          </div>

          {/* step footer */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#ece7e5] bg-[#fdfbfa] px-4 py-2.5">
            <button
              onClick={() => goTo(Math.max(0, safeIdx - 1))}
              disabled={safeIdx === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#ece7e5] bg-white px-3.5 py-2 text-sm font-semibold text-[#141414] hover:border-[#141414] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={15} /> Back
            </button>

            <span className="text-xs text-[#6b6767]">
              Step {sections.length ? safeIdx + 1 : 0} of {sections.length}
            </span>

            {isLast ? (
              <button
                onClick={doCompile}
                disabled={compiling}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#141414] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e0301e] disabled:opacity-60"
              >
                {compiling ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                Compile preview
              </button>
            ) : (
              <button
                onClick={() => goTo(safeIdx + 1)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#e0301e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b92213]"
              >
                Next <ArrowRight size={15} />
              </button>
            )}
          </div>
        </section>

        {/* preview panel */}
        <aside className="ts-preview flex min-h-[420px] min-h-0 flex-col overflow-hidden rounded-2xl border border-[#ece7e5] bg-white shadow-sm">
          <div className="flex shrink-0 items-center justify-between border-b border-[#ece7e5] px-4 py-2.5">
            <p className="flex items-center gap-2 text-sm font-bold text-[#141414]">
              <span className="h-2 w-2 rounded-full bg-[#e0301e]" />
              Live preview
            </p>
            <p className="text-[11px] text-[#6b6767]">
              {previewImageUrls.length > 0
                ? `${previewImageUrls.length} page${previewImageUrls.length > 1 ? "s" : ""}`
                : "Press Compile to see your resume"}
            </p>
          </div>
          <div className="ts-scroll min-h-0 flex-1 overflow-y-auto bg-[#f7f4f3] p-3 md:p-4">
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
        </aside>
      </div>
    </div>
  );
};

export default Editor;
