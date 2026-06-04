import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  ImageRun,
} from "docx";

import { saveAs } from "file-saver";

import { saveToLibrary } from "../../utils/library";

const LogoCanvas = ({ data }) => {
  const location = useLocation();
  const [template, setTemplate] =
    useState("modern");

  const [open, setOpen] =
    useState(false);

  // ================= AUTO DOWNLOAD FROM LIBRARY =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const downloadType = params.get("download");

    if (downloadType) {
      setTimeout(() => {
        if (downloadType === "png-light") downloadPNG("light");
        if (downloadType === "png-dark") downloadPNG("dark");
        // if (downloadType === "pdf") downloadPDF("light");
        // if (downloadType === "docx") downloadDOCX("light");
      }, 1000);
    }
  }, [location.search]);

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

  // ================= WAIT FOR IMAGES =================
  const waitForImages = async (
    root
  ) => {
    const images = Array.from(
      root.querySelectorAll("img")
    );

    await Promise.all(
      images.map((img) => {
        if (img.complete)
          return Promise.resolve();

        return new Promise(
          (resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          }
        );
      })
    );
  };

  // ================= GENERATE IMAGE =================
  const generateImage = async (
    type
  ) => {
    const element =
      type === "light"
        ? lightRef.current
        : darkRef.current;

    if (!element) return null;

    await waitForImages(
      element
    );

    const dataUrl =
      await htmlToImage.toPng(
        element,
        {
          pixelRatio: 4,
          cacheBust: true,
          useCORS: true,

          backgroundColor:
            type === "light"
              ? "#ffffff"
              : "#111827",

          width:
            element.scrollWidth,

          height:
            element.scrollHeight,

          style: {
            margin: "0",
          },
        }
      );

    return dataUrl;
  };

  // ================= PNG =================
  const downloadPNG = async (
    type
  ) => {
    try {
      const dataUrl =
        await generateImage(
          type
        );

      if (!dataUrl) return;

      const link =
        document.createElement(
          "a"
        );

      link.download = `${template}-${type}.png`;

      link.href = dataUrl;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      // SAVE LIBRARY
      saveToLibrary({
        title: data?.name || "Logo",
        type: "logo",
        thumbnail: dataUrl,
        rawData: data,
      });

      setOpen(false);
    } catch (err) {
      console.error(err);

      alert(
        "PNG download failed"
      );
    }
  };

  // ================= PDF =================
  // const downloadPDF = async (
  //   type
  // ) => {
  //   try {
  //     const dataUrl =
  //       await generateImage(
  //         type
  //       );

  //     if (!dataUrl) return;

  //     const pdf = new jsPDF(
  //       "landscape",
  //       "mm",
  //       "a4"
  //     );

  //     const imgProps =
  //       pdf.getImageProperties(
  //         dataUrl
  //       );

  //     const pdfWidth =
  //       pdf.internal.pageSize.getWidth();

  //     const pdfHeight =
  //       pdf.internal.pageSize.getHeight();

  //     const ratio = Math.min(
  //       pdfWidth /
  //         imgProps.width,
  //       pdfHeight /
  //         imgProps.height
  //     );

  //     const imgWidth =
  //       imgProps.width *
  //       ratio;

  //     const imgHeight =
  //       imgProps.height *
  //       ratio;

  //     const x =
  //       (pdfWidth -
  //         imgWidth) /
  //       2;

  //     const y =
  //       (pdfHeight -
  //         imgHeight) /
  //       2;

  //     pdf.addImage(
  //       dataUrl,
  //       "PNG",
  //       x,
  //       y,
  //       imgWidth,
  //       imgHeight
  //     );

  //     pdf.save(
  //       `${template}-${type}.pdf`
  //     );

  //     const pdfData =
  //       pdf.output(
  //         "datauristring"
  //       );

  //     // SAVE LIBRARY
  //     saveToLibrary({
  //       title: data?.name || "Logo",
  //       type: "logo",
  //       thumbnail: dataUrl,
  //       rawData: data,
  //     });

  //     setOpen(false);
  //   } catch (err) {
  //     console.error(err);

  //     alert(
  //       "PDF download failed"
  //     );
  //   }
  // };

  // ================= DOCX =================
  // const downloadDOCX = async (
  //   type
  // ) => {
  //   try {
  //     const dataUrl =
  //       await generateImage(
  //         type
  //       );

  //     if (!dataUrl) return;

  //     const base64 =
  //       dataUrl.split(",")[1];

  //     const imageBuffer =
  //       Uint8Array.from(
  //         atob(base64),
  //         (c) =>
  //           c.charCodeAt(0)
  //       );

  //     const doc =
  //       new Document({
  //         sections: [
  //           {
  //             children: [
  //               new Paragraph({
  //                 children: [
  //                   new ImageRun({
  //                     data:
  //                       imageBuffer,

  //                     transformation:
  //                       {
  //                         width: 500,
  //                         height: 250,
  //                       },
  //                   }),
  //                 ],
  //               }),
  //             ],
  //           },
  //         ],
  //       });

  //     const blob =
  //       await Packer.toBlob(doc);

  //     saveAs(
  //       blob,
  //       `${template}-${type}.docx`
  //     );

  //     // SAVE LIBRARY
  //     const reader =
  //       new FileReader();

  //     reader.readAsDataURL(
  //       blob
  //     );

  //     reader.onloadend =
  //       () => {
  //         saveToLibrary({
  //           title: data?.name || "Logo",
  //           type: "logo",
  //           thumbnail: dataUrl,
  //           rawData: data,
  //         });
  //       };

  //     setOpen(false);
  //   } catch (err) {
  //     console.error(err);

  //     alert(
  //       "DOCX download failed"
  //     );
  //   }
  // };

  return (
    <div className="space-y-10 relative">

      {/* TEMPLATE BUTTONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {[
          "modern",
          "minimal",
          "elegant",
          "glass",
        ].map((t) => (
          <motion.button
            key={t}
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setTemplate(t)
            }
            className={`relative overflow-hidden rounded-2xl p-5 border transition-all ${
              template === t
                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl border-transparent"
                : "bg-white/10 backdrop-blur-xl border-white/10 text-white hover:bg-white/20"
            }`}
          >
            <div className="text-lg font-semibold capitalize">
            {t}
            </div>

            <p className="text-xs opacity-70 mt-1">
              Professional logo style
            </p>

            {template === t && (
                <motion.div
                  layoutId="activeTemplate"
                  className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                  />
                )}
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
         className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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
            className="bg-white rounded-2xl p-10 flex items-center justify-center min-h-[280px] border border-gray-100"
          >
            {renderTemplate()}
          </motion.div>

        </motion.div>

        {/* DARK */}
        <motion.div
          whileHover={{
            y: -5,
          }}
         className="bg-gradient-to-br from-gray-950 to-black rounded-3xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
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
            className="bg-gray-900 rounded-xl p-10 flex items-center justify-center min-h-[250px]"
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
          className="px-10 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl font-semibold shadow-[0_15px_40px_rgba(99,102,241,0.45)] tracking-wide"
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
              className="absolute top-full mt-4 w-72 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden z-50 border border-white/30"
            >

              {/* PNG */}
              <button
                onClick={() =>
                  downloadPNG(
                    "light"
                  )
                }
                className="w-full px-5 py-4 text-left hover:bg-gray-100/80 text-sm transition-all flex items-center gap-3"
              >
                🌞 PNG Light
              </button>

              <button
                onClick={() =>
                  downloadPNG(
                    "dark"
                  )
                }
                className="w-full px-5 py-4 text-left hover:bg-gray-100/80 text-sm transition-all flex items-center gap-3"
              >
                🌙 PNG Dark
              </button>

              {/* PDF */}
              {/* <button
                onClick={() =>
                  downloadPDF(
                    "light"
                  )
                }
                className="w-full px-5 py-4 text-left hover:bg-gray-100/80 text-sm transition-all flex items-center gap-3"
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
              </button> */}

              {/* DOCX */}
              {/* <button
                onClick={() =>
                  downloadDOCX(
                    "light"
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                📝 DOCX Light
              </button>

              <button
                onClick={() =>
                  downloadDOCX(
                    "dark"
                  )
                }
                className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm"
              >
                📝 DOCX Dark
              </button> */}

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
};

export default LogoCanvas;