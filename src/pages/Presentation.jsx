import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Trash2, ChevronLeft, ChevronRight, Maximize, Sparkles, ImagePlus, Download, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PptxGenJS from "pptxgenjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveToLibrary } from "../utils/library";

const themes = {
  light: "bg-white text-brand-black",
  dark: "bg-brand-black text-white",
  gradient: "bg-gradient-to-br from-brand-red to-red-900 text-white",
};

const colors = ["#E60000", "#0F0F0F", "#4B5563", "#9CA3AF", "#F3F4F6", "#FFFFFF"];

const Presentation = () => {
  const location = useLocation();
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

  const handleChange = (field, value) => {
    const updated = [...slides];
    updated[current][field] = value;
    setSlides(updated);
  };

  const addSlide = () => {
    setSlides([...slides, { title: "New Slide", content: "Write your content here...", image: "", logo: "" }]);
    setCurrent(slides.length);
  };

  const deleteSlide = (index) => {
    if (slides.length === 1) return;
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    setCurrent(0);
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
    const url = URL.createObjectURL(file);
    const updated = [...slides];
    updated[current].image = url;
    setSlides(updated);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = [...slides];
    updated[current].logo = url;
    setSlides(updated);
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

      const pdfData = pdf.output("datauristring");
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-bg">
      {/* Sidebar */}
      {!fullscreen && (
        <div className="w-full md:w-[340px] bg-white border-r border-neutral-border p-5 flex flex-col shadow-sm z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-text-primary">Slides</h2>
            <button onClick={addSlide} className="bg-brand-black text-white p-2 rounded-lg hover:bg-black transition">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2 mb-6">
            {slides.map((slide, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`cursor-pointer rounded-xl p-4 transition border ${
                  current === i ? "bg-brand-red/5 border-brand-red" : "bg-neutral-bg border-neutral-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-neutral-text-primary truncate">{slide.title}</h3>
                    <p className="text-xs text-neutral-text-secondary truncate">{slide.content}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteSlide(i); }} className="text-gray-400 hover:text-brand-red p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto">
            <input
              value={slides[current].title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Slide title"
              className="w-full border border-neutral-border p-3 rounded-xl outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red bg-neutral-bg text-sm"
            />
            <textarea
              value={slides[current].content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Slide content"
              rows={4}
              className="w-full border border-neutral-border p-3 rounded-xl outline-none resize-none focus:border-brand-red focus:ring-1 focus:ring-brand-red bg-neutral-bg text-sm"
            />
            
            <label className="flex items-center justify-center gap-2 border border-neutral-border p-3 rounded-xl cursor-pointer hover:bg-neutral-bg transition text-sm font-medium">
              <ImagePlus size={18} />
              Add Image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </label>

            <label className="flex items-center justify-center gap-2 border border-neutral-border p-3 rounded-xl cursor-pointer hover:bg-neutral-bg transition text-sm font-medium">
              <Sparkles size={18} />
              Add Logo
              <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
            </label>
            
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border border-neutral-border p-3 rounded-xl outline-none text-sm font-medium"
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="gradient">Red Gradient</option>
            </select>

            <div>
              <p className="text-sm font-semibold text-neutral-text-primary mb-2 flex items-center gap-2"><Palette size={16} /> Accent Color</p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    className={`w-8 h-8 rounded-full border-2 ${accent === c ? "border-brand-black scale-110" : "border-transparent"} shadow-sm transition`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100">
        <div
          ref={previewRef}
          className={`relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl p-8 md:p-12 flex items-center justify-center ${themes[theme]}`}
          style={{ borderTop: `8px solid ${accent}` }}
        >
          {slides[current].logo && (
            <img src={slides[current].logo} alt="logo" className="absolute top-5 left-5 w-12 h-12 object-contain" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-5">{slides[current].title}</h1>
              <p className="text-sm md:text-xl max-w-2xl mx-auto opacity-90">{slides[current].content}</p>
              {slides[current].image && (
                <img src={slides[current].image} alt="" className="mt-8 max-h-[180px] md:max-h-[260px] rounded-2xl mx-auto shadow-xl" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 bg-white p-3 rounded-2xl shadow-lg border border-neutral-border">
          <button onClick={prevSlide} className="p-2 text-neutral-text-primary hover:bg-neutral-bg rounded-lg transition"><ChevronLeft size={20} /></button>
          <div className="text-sm font-bold text-neutral-text-primary px-4">{current + 1} / {slides.length}</div>
          <button onClick={nextSlide} className="p-2 text-neutral-text-primary hover:bg-neutral-bg rounded-lg transition"><ChevronRight size={20} /></button>
          
          <div className="w-px h-6 bg-neutral-border mx-2"></div>

          <button onClick={() => setFullscreen(!fullscreen)} className="p-2 text-neutral-text-primary hover:bg-neutral-bg rounded-lg transition"><Maximize size={18} /></button>
          
          <button onClick={exportToPPT} className="flex items-center gap-2 bg-brand-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black transition">
            <Download size={16} /> PPTX
          </button>
          <button onClick={exportToPDF} className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-red-hover transition">
            <Download size={16} /> PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;