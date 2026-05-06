import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PptxGenJS from "pptxgenjs";
import { saveToLibrary } from "../utils/library";

const themes = {
  light: "bg-white text-black",
  dark: "bg-black text-white",
  gradient: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
  glass: "backdrop-blur-xl bg-white/20 text-white border border-white/30",
};

const Presentation = () => {
  const [slides, setSlides] = useState([
    { title: "Welcome", content: "This is your first slide", image: "" },
  ]);

  const [current, setCurrent] = useState(0);
  const [theme, setTheme] = useState("light");
  const [fullscreen, setFullscreen] = useState(false);
  const [aiInput, setAiInput] = useState("");

  // 🔹 Update slide
  const handleChange = (field, value) => {
    const updated = [...slides];
    updated[current][field] = value;
    setSlides(updated);
  };

  // 🔹 Add slide
  const addSlide = () => {
    setSlides([
      ...slides,
      { title: "New Slide", content: "Write something...", image: "" },
    ]);
    setCurrent(slides.length);
  };

  // 🔹 Delete slide
  const deleteSlide = (index) => {
    if (slides.length === 1) return;
    setSlides(slides.filter((_, i) => i !== index));
    setCurrent(0);
  };

  // 🔹 Navigation
  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // 🖼️ Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    const updated = [...slides];
    updated[current].image = url;
    setSlides(updated);
  };

  // 🤖 AI Generator (simple logic)
  const generateSlides = () => {
    if (!aiInput) return;

    const generated = [
      { title: aiInput, content: "Introduction about " + aiInput },
      { title: "Details", content: "Key points of " + aiInput },
      { title: "Conclusion", content: "Summary of " + aiInput },
    ];

    setSlides(generated);
    setCurrent(0);
  };

  // 📥 Export PPT
  const exportToPPT = async () => {
    const pptx = new PptxGenJS();

    slides.forEach((slideData) => {
      const slide = pptx.addSlide();

      slide.addText(slideData.title, {
        x: 1,
        y: 1,
        w: 8,
        h: 1,
        fontSize: 28,
        bold: true,
        align: "center",
      });

      slide.addText(slideData.content, {
        x: 1,
        y: 2,
        w: 8,
        h: 3,
        fontSize: 18,
        align: "center",
      });

      if (slideData.image) {
        slide.addImage({
          path: slideData.image,
          x: 3,
          y: 4,
          w: 3,
          h: 2,
        });
      }
    });

    const blob = await pptx.write("blob");
    const url = URL.createObjectURL(blob);

    saveToLibrary({
      file: url,
      type: "pptx",
      category: "ppt",
      name: slides[0]?.title || "Presentation",
      slides,
    });

    pptx.writeFile("presentation.pptx");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* LEFT PANEL */}
      {!fullscreen && (
        <div className="w-full md:w-[320px] bg-white p-5 flex flex-col">

          <h2 className="text-lg font-bold mb-3">Slides</h2>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`p-2 rounded cursor-pointer ${
                  current === i ? "bg-purple-200" : "bg-gray-100"
                }`}
              >
                Slide {i + 1}
              </div>
            ))}
          </div>

          <button onClick={addSlide} className="btn bg-purple-600 text-white mt-2 p-2 rounded">
            <Plus size={16} /> Add
          </button>

          <button onClick={() => deleteSlide(current)} className="btn bg-red-500 text-white mt-2 p-2 rounded">
            <Trash2 size={16} /> Delete
          </button>

          {/* EDIT */}
          <input
            value={slides[current].title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="border p-2 mt-3 rounded"
          />

          <textarea
            value={slides[current].content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="border p-2 mt-2 rounded"
          />

          {/* IMAGE */}
          <input type="file" onChange={handleImageUpload} className="mt-2" />

          {/* THEME */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="mt-3 border p-2 rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="gradient">Gradient</option>
            <option value="glass">Glass</option>
          </select>

          {/* AI */}
          <div className="mt-4">
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Enter topic..."
              className="border p-2 w-full rounded"
            />
            <button
              onClick={generateSlides}
              className="bg-blue-600 text-white w-full mt-2 p-2 rounded flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> AI Generate
            </button>
          </div>
        </div>
      )}

      {/* RIGHT PREVIEW */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">

        <div
          className={`w-full max-w-4xl h-[220px] md:h-[400px] rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-xl ${themes[theme]}`}
        >
          <AnimatePresence mode="wait">
            <motion.div key={current}>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                {slides[current].title}
              </h1>

              <p className="mb-3">{slides[current].content}</p>

              {slides[current].image && (
                <img
                  src={slides[current].image}
                  alt=""
                  className="max-h-[150px] mx-auto rounded"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="flex gap-3 mt-5 flex-wrap justify-center">

          <button onClick={prevSlide} className="btn bg-white p-2 rounded">
            <ChevronLeft />
          </button>

          <span className="text-white">
            {current + 1}/{slides.length}
          </span>

          <button onClick={nextSlide} className="btn bg-white p-2 rounded">
            <ChevronRight />
          </button>

          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="bg-yellow-500 text-white px-3 py-2 rounded"
          >
            <Maximize />
          </button>

          <button
            onClick={exportToPPT}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export PPT
          </button>
        </div>

      </div>
    </div>
  );
};

export default Presentation;