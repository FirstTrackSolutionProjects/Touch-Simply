import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ModernLogo from "../../templates/ModernLogo";
import MinimalLogo from "../../templates/MinimalLogo";
import ElegantLogo from "../../templates/ElegantLogo";
import GlassLogo from "../../templates/GlassLogo";

import * as htmlToImage from "html-to-image";

import jsPDF from "jspdf";

import {
  Document,
  Packer,
  Paragraph,
} from "docx";

import { saveAs } from "file-saver";

import { saveToLibrary } from "../../utils/library";

const LogoCanvas = ({ data }) => {
  const [template, setTemplate] =
    useState("modern");

  const [open, setOpen] =
    useState(false);

  const lightRef = useRef();
  const darkRef = useRef();

  // ================= TEMPLATE =================
  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return (
          <MinimalLogo data={data} />
        );

      case "elegant":
        return (
          <ElegantLogo data={data} />
        );

      case "glass":
        return (
          <GlassLogo data={data} />
        );

      default:
        return (
          <ModernLogo data={data} />
        );
    }
  };

  // ================= PNG =================
  const downloadPNG = async (
    type
  ) => {
    const element =
      type === "light"
        ? lightRef.current
        : darkRef.current;

    if (!element) return;

    try {
      const dataUrl =
        await htmlToImage.toPng(
          element,
          {
            pixelRatio: 3,
            cacheBust: true,
            useCORS: true,
            backgroundColor: "#ffffff",
          }
        );

      // Download
      const link =
        document.createElement("a");

      link.download = `${template}-${type}.png`;
      link.href = dataUrl;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Save Library
      saveToLibrary({
        id: Date.now(),

        title: `${
          data?.name || "Logo"
        } (${type})`,

        type: "logo",

        format: "png",

        thumbnail: dataUrl,

        file: dataUrl,

        createdAt:
          new Date().toISOString(),
      });

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PDF =================
  const downloadPDF = async (
    type
  ) => {
    const element =
      type === "light"
        ? lightRef.current
        : darkRef.current;

    if (!element) return;

    try {
      const dataUrl =
        await htmlToImage.toPng(
          element,
          {
            pixelRatio: 3,
            cacheBust: true,
            useCORS: true,
            backgroundColor: "#ffffff",
          }
        );

      const tempPdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );
      const imgProps =
        tempPdf.getImageProperties(
          dataUrl
        );

      const orientation =
        imgProps.width >
        imgProps.height
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
        dataUrl,
        "PNG",
        x,
        y,
        imgWidth,
        imgHeight
      );

      pdf.save(
        `${template}-${type}.pdf`
      );

      const pdfData =
        pdf.output(
          "datauristring"
        );

      // Save Library
      saveToLibrary({
        id: Date.now(),

        title: `${
          data?.name || "Logo"
        } PDF`,

        type: "logo",

        format: "pdf",

        thumbnail: dataUrl,

        file: pdfData,

        createdAt:
          new Date().toISOString(),
      });

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="space-y-8">

      {/* TEMPLATE BUTTONS */}
      <div className="flex gap-3 flex-wrap">
        {[
          "modern",
          "minimal",
          "elegant",
          "glass",
        ].map((t) => (
          <motion.button
            key={t}
            whileTap={{
              scale: 0.9,
            }}
            whileHover={{
              scale: 1.05,
            }}
            onClick={() =>
              setTemplate(t)
            }
            className={`px-4 py-2 text-sm rounded-full transition ${
              template === t
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* PREVIEW */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* LIGHT */}
        <motion.div
          whileHover={{
            y: -5,
          }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl"
        >
          <p className="text-xs text-gray-500 mb-3">
            Light Version
          </p>

          <motion.div
            ref={lightRef}
            key={template}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className="bg-white rounded-xl p-10 flex items-center justify-center"
          >
            {renderTemplate()}
          </motion.div>
        </motion.div>

        {/* DARK */}
        <motion.div
          whileHover={{
            y: -5,
          }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl"
        >
          <p className="text-xs text-gray-400 mb-3">
            Dark Version
          </p>

          <motion.div
            ref={darkRef}
            key={
              template + "-dark"
            }
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className="bg-gray-900 rounded-xl p-10 flex items-center justify-center"
          >
            <div className="invert">
              {renderTemplate()}
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* DOWNLOAD */}
      <div className="flex justify-center relative">

        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          whileHover={{
            scale: 1.05,
          }}
          onClick={() =>
            setOpen(!open)
          }
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-xl"
        >
          Download Logo ⬇
        </motion.button>

        {/* DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
              }}
              className="absolute top-full mt-3 w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
            >

              {/* PNG */}
              <button
                onClick={() =>
                  downloadPNG(
                    "light"
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                🌞 PNG Light
              </button>

              <button
                onClick={() =>
                  downloadPNG(
                    "dark"
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                🌙 PNG Dark
              </button>

              {/* PDF */}
              <button
                onClick={() =>
                  downloadPDF(
                    "light"
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                📄 PDF Light
              </button>

              <button
                onClick={() =>
                  downloadPDF(
                    "dark"
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                📄 PDF Dark
              </button>
             

         

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default LogoCanvas;