import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Sparkles,
  ImagePlus,
  Download,
  Palette,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import PptxGenJS from "pptxgenjs";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

import { saveToLibrary } from "../utils/library";

const themes = {
  light: "bg-white text-black",

  dark: "bg-black text-white",

  gradient:
    "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",

  glass:
    "backdrop-blur-xl bg-white/20 text-white border border-white/30",

  darkglass:
    "backdrop-blur-xl bg-black/10 text-white border border-white/30",
};

const colors = [
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#22C55E",
  "#F97316",
  "#EF4444",
  "#111827",
];

const Presentation = () => {
  const location = useLocation();

  // ================= AUTO DOWNLOAD FROM LIBRARY =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const downloadType = params.get("download");

    if (downloadType) {
      setTimeout(() => {
        if (downloadType === "pptx") exportToPPT();
        if (downloadType === "pdf") exportToPDF();
      }, 1000);
    }
  }, [location.search]);

  const [slides, setSlides] = useState([
    {
      title: "Welcome",

      content:
        "Create beautiful presentations easily 🚀",

      image: "",

      logo: "",
    },
  ]);

  const [current, setCurrent] =
    useState(0);

  const [theme, setTheme] =
    useState("light");

  const [fullscreen, setFullscreen] =
    useState(false);

  const [accent, setAccent] =
    useState("#8B5CF6");

  const previewRef = useRef();

  useEffect(() => {
    if (location.state?.editData?.rawData) {
      setSlides(location.state.editData.rawData.slides);
      setTheme(location.state.editData.rawData.theme);
      setAccent(location.state.editData.rawData.accent);
    }
  }, [location.state]);

  // ================= UPDATE SLIDE =================
  const handleChange = (
    field,
    value
  ) => {
    const updated = [...slides];

    updated[current][field] =
      value;

    setSlides(updated);
  };

  // ================= ADD SLIDE =================
  const addSlide = () => {
    setSlides([
      ...slides,
      {
        title: "New Slide",

        content:
          "Write your content here...",

        image: "",

        logo: "",
      },
    ]);

    setCurrent(slides.length);
  };

  // ================= DELETE SLIDE =================
  const deleteSlide = (
    index
  ) => {
    if (slides.length === 1)
      return;

    const updated = slides.filter(
      (_, i) => i !== index
    );

    setSlides(updated);

    setCurrent(0);
  };

  // ================= NAVIGATION =================
  const nextSlide = () => {
    if (
      current <
      slides.length - 1
    ) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const url =
      URL.createObjectURL(file);

    const updated = [...slides];

    updated[current].image =
      url;

    setSlides(updated);
  };

  // ================= LOGO UPLOAD =================
  const handleLogoUpload = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const url =
      URL.createObjectURL(file);

    const updated = [...slides];

    updated[current].logo =
      url;

    setSlides(updated);
  };

  // ================= EXPORT PPT =================
  const exportToPPT = async () => {
    try {
      const pptx =
        new PptxGenJS();

      pptx.layout =
        "LAYOUT_WIDE";

      slides.forEach(
        (slideData) => {
          const slide =
            pptx.addSlide();

          slide.background = {
            color:
              theme === "dark"
                ? "000000"
                : "FFFFFF",
          };

          slide.addText(
            slideData.title,
            {
              x: 0.5,
              y: 0.5,
              w: 12,
              h: 0.8,

              fontSize: 24,

              bold: true,

              color:
                theme === "dark"
                  ? "FFFFFF"
                  : "111111",

              align: "center",
            }
          );

          slide.addText(
            slideData.content,
            {
              x: 1,
              y: 1.5,
              w: 10,
              h: 2,

              fontSize: 18,

              color:
                theme === "dark"
                  ? "DDDDDD"
                  : "333333",

              align: "center",
            }
          );

          // IMAGE
          if (slideData.image) {
            slide.addImage({
              path: slideData.image,

              x: 3,

              y: 3,

              w: 5,

              h: 3,
            });
          }

          // LOGO
          if (slideData.logo) {
            slide.addImage({
              path: slideData.logo,

              x: 0.3,

              y: 0.3,

              w: 0.7,

              h: 0.7,
            });
          }
        }
      );

      // Download
      await pptx.writeFile(
        "presentation.pptx"
      );

      // Save To Library
      const blob =
        await pptx.write(
          "blob"
        );

      const reader =
        new FileReader();

      reader.readAsDataURL(
        blob
      );

      reader.onloadend =
        () => {
          saveToLibrary({
            title: slides[0]?.title || "Presentation",
            type: "presentation",
            thumbnail: slides[0]?.image || "",
            rawData: { slides, theme, accent },
          });
        };
    } catch (err) {
      console.error(
        "PPT Export Error",
        err
      );
    }
  };

  // ================= EXPORT PDF =================
  const exportToPDF = async () => {
    try {
      const canvas =
        await html2canvas(
          previewRef.current,
          {
            scale: 3,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollY: -window.scrollY,
          }
        );

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const tempPdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const imgProps =
        tempPdf.getImageProperties(
          imgData
        );

      const orientation =
        imgProps.width > imgProps.height
          ? "landscape"
          : "portrait";

      const pdf = new jsPDF(
        orientation,
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();
      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      const ratio = Math.min(
        pdfWidth / imgProps.width,
        pdfHeight / imgProps.height
      );

      const imgWidth =
        imgProps.width * ratio;
      const imgHeight =
        imgProps.height * ratio;

      const x =
        (pdfWidth - imgWidth) / 2;
      const y =
        (pdfHeight - imgHeight) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        x,
        y,
        imgWidth,
        imgHeight
      );

      // Download
      pdf.save(
        "presentation.pdf"
      );

      // Save To Library
      const pdfData =
        pdf.output(
          "datauristring"
        );

      saveToLibrary({
        title: slides[0]?.title || "Presentation",
        type: "presentation",
        thumbnail: imgData,
        rawData: { slides, theme, accent },
      });
    } catch (err) {
      console.error(
        "PDF Export Error",
        err
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* ================= SIDEBAR ================= */}
      {!fullscreen && (
        <div className="w-full md:w-[340px] bg-white p-5 flex flex-col shadow-2xl">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold">
              Presentation
            </h2>

            <button
              onClick={addSlide}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition"
            >
              <Plus size={18} />
            </button>

          </div>

          {/* SLIDES */}
          <div className="space-y-3 overflow-y-auto max-h-[350px] pr-1">

            {slides.map(
              (slide, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setCurrent(i)
                  }
                  className={`cursor-pointer rounded-xl p-3 transition border ${
                    current === i
                      ? "bg-purple-100 border-purple-500"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="text-sm font-semibold">
                        {
                          slide.title
                        }
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-1">
                        {
                          slide.content
                        }
                      </p>
                    </div>

                    <button
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        deleteSlide(
                          i
                        );
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </div>
              )
            )}
          </div>

          {/* INPUTS */}
          <div className="mt-5 space-y-3">

            <input
              value={
                slides[current]
                  .title
              }
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }
              placeholder="Slide title"
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />

            <textarea
              value={
                slides[current]
                  .content
              }
              onChange={(e) =>
                handleChange(
                  "content",
                  e.target.value
                )
              }
              placeholder="Slide content"
              rows={4}
              className="w-full border border-gray-300 p-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-purple-500"
            />

            {/* IMAGE */}
            <label className="flex items-center gap-2 border border-gray-300 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition">

              <ImagePlus size={18} />

              Add Image

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={
                  handleImageUpload
                }
              />

            </label>

            {/* LOGO */}
            <label className="flex items-center gap-2 border border-gray-300 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition">

              <Sparkles size={18} />

              Add Logo

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={
                  handleLogoUpload
                }
              />

            </label>

            {/* THEME */}
            <select
              value={theme}
              onChange={(e) =>
                setTheme(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 p-3 rounded-xl outline-none"
            >

              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>

              <option value="gradient">
                Gradient
              </option>

              <option value="glass">
                Glass
              </option>

              <option value="darkglass">
                Dark Glass
              </option>

            </select>

            {/* COLORS */}
            <div>

              <p className="text-sm mb-2 flex items-center gap-2 font-medium">

                <Palette size={16} />

                Accent Color

              </p>

              <div className="flex gap-2 flex-wrap">

                {colors.map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() =>
                        setAccent(
                          c
                        )
                      }
                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                      style={{
                        background:
                          c,
                      }}
                    />
                  )
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREVIEW ================= */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">

        <div
          ref={previewRef}
          className={`relative w-full max-w-5xl min-h-[250px] md:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-12 flex items-center justify-center ${themes[theme]}`}
          style={{
            borderTop: `6px solid ${accent}`,
          }}
        >

          {/* LOGO */}
          {slides[current]
            .logo && (
            <img
              src={
                slides[current]
                  .logo
              }
              alt="logo"
              className="absolute top-5 left-5 w-12 h-12 object-contain"
            />
          )}

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.4,
              }}
              className="text-center"
            >

              <h1 className="text-3xl md:text-5xl font-bold mb-5">
                {
                  slides[current]
                    .title
                }
              </h1>

              <p className="text-sm md:text-xl max-w-2xl mx-auto opacity-90">
                {
                  slides[current]
                    .content
                }
              </p>

              {slides[current]
                .image && (
                <img
                  src={
                    slides[current]
                      .image
                  }
                  alt=""
                  className="mt-8 max-h-[180px] md:max-h-[260px] rounded-2xl mx-auto shadow-xl"
                />
              )}

            </motion.div>

          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">

          <button
            onClick={
              prevSlide
            }
            className="bg-white text-black p-3 rounded-xl hover:scale-105 transition"
          >
            <ChevronLeft />
          </button>

          <div className="text-white font-medium">
            {current + 1} /{" "}
            {slides.length}
          </div>

          <button
            onClick={
              nextSlide
            }
            className="bg-white text-black p-3 rounded-xl hover:scale-105 transition"
          >
            <ChevronRight />
          </button>

          <button
            onClick={() =>
              setFullscreen(
                !fullscreen
              )
            }
            className="bg-yellow-500 text-white px-4 py-3 rounded-xl hover:scale-105 transition"
          >
            <Maximize />
          </button>

          <button
            onClick={
              exportToPPT
            }
            className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
          >

            <Download size={18} />

            Export PPT

          </button>

          <button
            onClick={
              exportToPDF
            }
            className="bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
          >

            <Download size={18} />

            Export PDF

          </button>

        </div>
      </div>
    </div>
  );
};

export default Presentation;