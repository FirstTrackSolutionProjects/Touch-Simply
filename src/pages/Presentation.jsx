import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus, Trash2, ChevronLeft, ChevronRight, Maximize, Minimize, Sparkles,
  ImagePlus, Download, Palette, Check, X, Type, LayoutTemplate, Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PptxGenJS from "pptxgenjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveToLibrary } from "../utils/library";
import PageBackButton from "../components/PageBackButton";

const themes = {
  light: "bg-white text-brand-black",
  dark: "bg-brand-black text-white",
  gradient: "bg-gradient-to-br from-brand-red to-red-900 text-white",
};

const themeOptions = [
  { key: "light", label: "Light", preview: "bg-white border-neutral-border" },
  { key: "dark", label: "Dark", preview: "bg-brand-black border-brand-black" },
  { key: "gradient", label: "Red", preview: "bg-gradient-to-br from-brand-red to-red-900 border-brand-red" },
];

const colors = ["#E60000", "#0F0F0F", "#4B5563", "#9CA3AF", "#F3F4F6", "#FFFFFF"];

const Presentation = () => {
  const location = useLocation();
  const NAV_H = 100; // top navbar ki height (px), apne hisaab se adjust karo
  const [slides, setSlides] = useState([{ title: "Welcome", content: "Create beautiful presentations easily 🚀", image: "", logo: "" }]);
  const [current, setCurrent] = useState(0);
  const [theme, setTheme] = useState("light");
  const [fullscreen, setFullscreen] = useState(false);
  const [accent, setAccent] = useState("#E60000");
  const previewRef = useRef();

  useEffect(() => {
    if (location.state?.editData?.rawData) {
      setSlides(location.state.editData.rawData.slides);
      setTheme(location.state.editData.rawData.theme);
      setAccent(location.state.editData.rawData.accent);
    }
  }, [location.state]);

  // Keyboard: arrows to navigate, Esc to exit fullscreen
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(c + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const handleChange = (field, value) => {
    setSlides((prev) => prev.map((s, i) => (i === current ? { ...s, [field]: value } : s)));
  };

  const addSlide = () => {
    setSlides([...slides, { title: "New Slide", content: "Write your content here...", image: "", logo: "" }]);
    setCurrent(slides.length);
  };

  const duplicateSlide = (index) => {
    const copy = { ...slides[index], title: `${slides[index].title} (copy)` };
    const updated = [...slides.slice(0, index + 1), copy, ...slides.slice(index + 1)];
    setSlides(updated);
    setCurrent(index + 1);
  };

  const deleteSlide = (index) => {
    if (slides.length === 1) return;
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    setCurrent(index < current ? current - 1 : Math.min(current, updated.length - 1));
  };

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleChange("image", URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleChange("logo", URL.createObjectURL(file));
    e.target.value = "";
  };

  const exportToPPT = async () => {
    try {
      const pptx = new PptxGenJS();
      pptx.layout = "LAYOUT_WIDE";

      slides.forEach((slideData) => {
        const slide = pptx.addSlide();
        slide.background = { color: theme === "dark" ? "000000" : "FFFFFF" };

        slide.addText(slideData.title, {
          x: 0.5, y: 0.5, w: 12, h: 0.8, fontSize: 24, bold: true,
          color: theme === "dark" ? "FFFFFF" : "111111", align: "center",
        });

        slide.addText(slideData.content, {
          x: 1, y: 1.5, w: 10, h: 2, fontSize: 18,
          color: theme === "dark" ? "DDDDDD" : "333333", align: "center",
        });

        if (slideData.image) {
          slide.addImage({ path: slideData.image, x: 3, y: 3, w: 5, h: 3 });
        }
        if (slideData.logo) {
          slide.addImage({ path: slideData.logo, x: 0.3, y: 0.3, w: 0.7, h: 0.7 });
        }
      });

      await pptx.writeFile("presentation.pptx");

      const blob = await pptx.write("blob");
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        saveToLibrary({
          title: slides[0]?.title || "Presentation",
          type: "presentation",
          thumbnail: slides[0]?.image || "",
          rawData: { slides, theme, accent },
        });
      };
    } catch (err) {
      console.error("PPT Export Error", err);
    }
  };

  const exportToPDF = async () => {
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3, useCORS: true, backgroundColor: "#ffffff", scrollY: -window.scrollY,
      });
      const imgData = canvas.toDataURL("image/png");
      const tempPdf = new jsPDF("p", "mm", "a4");
      const imgProps = tempPdf.getImageProperties(imgData);
      const orientation = imgProps.width > imgProps.height ? "landscape" : "portrait";
      const pdf = new jsPDF(orientation, "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save("presentation.pdf");

      saveToLibrary({
        title: slides[0]?.title || "Presentation",
        type: "presentation",
        thumbnail: imgData,
        rawData: { slides, theme, accent },
      });
    } catch (err) {
      console.error("PDF Export Error", err);
    }
  };

  const slide = slides[current];
  const hasImage = !!slide.image;

  // Shared field styles
  const fieldCls =
    "w-full border border-neutral-border p-3 rounded-xl outline-none bg-neutral-bg text-sm text-neutral-text-primary placeholder-neutral-text-secondary transition-all focus:bg-white focus:border-brand-red/50 focus:ring-4 focus:ring-brand-red/10";
  const labelCls = "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-text-secondary mb-2";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-neutral-bg">
      {/* ================= SIDEBAR ================= */}
      {!fullscreen && (
        <aside
          style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
          className="w-full lg:w-[360px] shrink-0 bg-white border-r border-neutral-border flex flex-col lg:sticky lg:overflow-hidden z-10 max-lg:!h-auto"
        >
          {/* Sidebar header */}
          <div className="p-5 pb-4 border-b border-neutral-border">
            <PageBackButton className="mb-4" fallback="/templates" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 text-white flex items-center justify-center shadow-lg shadow-brand-red/30">
                  <LayoutTemplate size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-text-primary tracking-tight leading-none">Slides</h2>
                  <p className="text-xs text-neutral-text-secondary mt-1">{slides.length} {slides.length === 1 ? "slide" : "slides"} in deck</p>
                </div>
              </div>
              <button
                onClick={addSlide}
                title="Add slide"
                className="w-10 h-10 flex items-center justify-center bg-brand-black text-white rounded-xl hover:bg-black hover:-translate-y-0.5 active:scale-95 transition-all shadow-md"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Slide list */}
            <div>
              <p className={labelCls}><LayoutTemplate size={13} /> Deck</p>
              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {slides.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`group relative cursor-pointer rounded-xl p-3 pl-3 transition-all border flex items-center gap-3 ${
                      current === i
                        ? "bg-brand-red/5 border-brand-red shadow-sm shadow-brand-red/10"
                        : "bg-neutral-bg border-neutral-border hover:bg-white hover:border-brand-red/30 hover:shadow-sm"
                    }`}
                  >
                    <span
                      className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-xs font-extrabold transition-all ${
                        current === i ? "bg-brand-red text-white shadow-md shadow-brand-red/30" : "bg-white border border-neutral-border text-neutral-text-secondary"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-neutral-text-primary truncate">{s.title || "Untitled"}</h3>
                      <p className="text-xs text-neutral-text-secondary truncate">{s.content}</p>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 max-lg:opacity-100 transition-opacity">
                      <button
                        title="Duplicate"
                        onClick={(e) => { e.stopPropagation(); duplicateSlide(i); }}
                        className="p-1.5 rounded-md text-gray-400 hover:text-neutral-text-primary hover:bg-white transition"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        title="Delete"
                        onClick={(e) => { e.stopPropagation(); deleteSlide(i); }}
                        className="p-1.5 rounded-md text-gray-400 hover:text-brand-red hover:bg-brand-red/5 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <p className={labelCls}><Type size={13} /> Content</p>
              <div className="space-y-3">
                <input
                  value={slide.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Slide title"
                  className={`${fieldCls} font-semibold`}
                />
                <textarea
                  value={slide.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Slide content"
                  rows={4}
                  className={`${fieldCls} resize-none leading-relaxed`}
                />
              </div>
            </div>

            {/* Media */}
            <div>
              <p className={labelCls}><ImagePlus size={13} /> Media</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "image", label: "Image", icon: ImagePlus, onChange: handleImageUpload },
                  { key: "logo", label: "Logo", icon: Sparkles, onChange: handleLogoUpload },
                ].map(({ key, label, icon: Icon, onChange }) => (
                  <div key={key} className="relative">
                    <label className="group flex flex-col items-center justify-center gap-2 h-24 border-2 border-dashed border-neutral-border rounded-xl cursor-pointer bg-neutral-bg hover:bg-white hover:border-brand-red/40 transition-all overflow-hidden">
                      {slide[key] ? (
                        <img src={slide[key]} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <span className="w-9 h-9 rounded-lg bg-white border border-neutral-border flex items-center justify-center text-neutral-text-secondary group-hover:text-brand-red group-hover:border-brand-red/30 transition">
                            <Icon size={18} />
                          </span>
                          <span className="text-xs font-semibold text-neutral-text-secondary group-hover:text-neutral-text-primary">Add {label}</span>
                        </>
                      )}
                      <input type="file" hidden accept="image/*" onChange={onChange} />
                    </label>
                    {slide[key] && (
                      <button
                        title={`Remove ${label}`}
                        onClick={() => handleChange(key, "")}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-brand-black/80 text-white flex items-center justify-center hover:bg-brand-red transition shadow"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <p className={labelCls}><LayoutTemplate size={13} /> Theme</p>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={`relative rounded-xl p-2 border-2 transition-all text-center ${
                      theme === t.key ? "border-brand-red bg-brand-red/5" : "border-neutral-border hover:border-brand-red/30 bg-neutral-bg"
                    }`}
                  >
                    <div className={`h-12 rounded-lg border ${t.preview} flex items-end p-1.5`}>
                      <span className="h-1 w-6 rounded-full" style={{ background: accent }} />
                    </div>
                    <p className="text-[11px] font-bold text-neutral-text-primary mt-2">{t.label}</p>
                    {theme === t.key && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shadow">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent */}
            <div>
              <p className={labelCls}><Palette size={13} /> Accent Color</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    title={c}
                    className={`relative w-9 h-9 rounded-full border-2 shadow-sm transition-all hover:scale-110 ${
                      accent === c ? "border-brand-black scale-110 ring-4 ring-black/5" : "border-neutral-border"
                    }`}
                    style={{ background: c }}
                  >
                    {accent === c && (
                      <Check size={14} className="absolute inset-0 m-auto" style={{ color: ["#F3F4F6", "#FFFFFF", "#9CA3AF"].includes(c) ? "#0F0F0F" : "#fff" }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* ================= PREVIEW AREA ================= */}
      <div
        className={`flex-1 min-w-0 flex flex-col items-center justify-center p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100 ${
          fullscreen ? "fixed inset-0 z-[100] !bg-brand-black !bg-none" : ""
        }`}
      >
        {/* Top info bar */}
        {!fullscreen && (
          <div className="w-full max-w-5xl flex items-center justify-between mb-5">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">Live Preview</p>
              <h1 className="text-lg md:text-2xl font-extrabold text-neutral-text-primary tracking-tight truncate">
                {slides[0]?.title || "Presentation"}
              </h1>
            </div>
            <span className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-neutral-border text-neutral-text-primary shadow-sm">
              Slide {current + 1} of {slides.length}
            </span>
          </div>
        )}

        {/* Slide canvas */}
        <div className="w-full max-w-5xl relative">
          <div className="absolute -inset-4 bg-brand-red/10 blur-3xl rounded-[2rem] pointer-events-none" />
          <div
            ref={previewRef}
            className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 p-6 md:p-14 flex items-center justify-center ${themes[theme]}`}
            style={{ borderTop: `8px solid ${accent}` }}
          >
            {slide.logo && (
              <img src={slide.logo} alt="logo" className="absolute top-5 left-5 w-12 h-12 md:w-14 md:h-14 object-contain" />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className={
                  hasImage
                    ? "w-full flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center md:text-left"
                    : "text-center"
                }
              >
                <div className={hasImage ? "flex-1 min-w-0" : ""}>
                  <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight leading-tight">{slide.title}</h1>
                  <span
                    className={`block h-1.5 w-16 md:w-24 rounded-full mt-4 md:mt-6 ${hasImage ? "mx-auto md:mx-0" : "mx-auto"}`}
                    style={{ background: accent }}
                  />
                  <p className={`text-xs md:text-xl mt-4 md:mt-6 opacity-90 leading-relaxed whitespace-pre-line ${hasImage ? "" : "max-w-2xl mx-auto"}`}>
                    {slide.content}
                  </p>
                </div>
                {hasImage && (
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full md:w-[42%] max-h-[140px] md:max-h-[300px] object-cover rounded-2xl shadow-2xl ring-1 ring-black/10"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <span className="absolute bottom-4 right-5 text-[10px] md:text-xs font-bold opacity-40">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Controls toolbar */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-8 bg-white/90 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl border border-neutral-border">
          <button
            onClick={prevSlide}
            disabled={current === 0}
            className="w-10 h-10 flex items-center justify-center text-neutral-text-primary hover:bg-neutral-bg rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5 px-1 max-w-[140px] overflow-hidden">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${current === i ? "w-6 bg-brand-red" : "w-2 bg-neutral-border hover:bg-gray-400"}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={current === slides.length - 1}
            className="w-10 h-10 flex items-center justify-center text-neutral-text-primary hover:bg-neutral-bg rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>

          <div className="w-px h-6 bg-neutral-border mx-1" />

          <button
            onClick={() => setFullscreen(!fullscreen)}
            title={fullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
            className="w-10 h-10 flex items-center justify-center text-neutral-text-primary hover:bg-neutral-bg rounded-xl transition"
          >
            {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          <button
            onClick={exportToPPT}
            className="flex items-center gap-2 bg-brand-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-black hover:-translate-y-0.5 transition-all shadow-md"
          >
            <Download size={16} /> PPTX
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-brand-red text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-red-hover hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-red/30"
          >
            <Download size={16} /> PDF
          </button>
        </div>

        {!fullscreen && (
          <p className="hidden md:block text-[11px] text-neutral-text-secondary mt-4">
            Tip: ← → arrow keys se slides badlo, Esc se fullscreen band karo.
          </p>
        )}
      </div>
    </div>
  );
};

export default Presentation;