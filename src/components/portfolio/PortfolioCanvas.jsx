import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ModernPortfolio from "../../templates/ModernPortfolio";
import MinimalPortfolio from "../../templates/MinimalPortfolio";
import CreativePortfolio from "../../templates/CreativePortfolio";

import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, ImageRun } from "docx";
import { saveAs } from "file-saver";

import { saveToLibrary } from "../../utils/library";

const PortfolioCanvas = ({ data }) => {
  const [template, setTemplate] =
    useState("modern");

  const previewRef = useRef();

  const tabs = [
    {
      id: "modern",
      label: "Modern",
    },
    {
      id: "minimal",
      label: "Minimal",
    },
    {
      id: "creative",
      label: "Creative",
    },
  ];

  // ================= ANIMATION =================
  const variants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 20,
    },

    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
    },

    exit: {
      opacity: 0,
      scale: 0.98,
      y: -20,
    },
  };

  // ================= TEMPLATE =================
  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return (
          <MinimalPortfolio
            data={data}
          />
        );

      case "creative":
        return (
          <CreativePortfolio
            data={data}
          />
        );

      default:
        return (
          <ModernPortfolio
            data={data}
          />
        );
    }
  };

  const waitForImages = async (root) => {
    const images = Array.from(root.querySelectorAll("img"));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        });
      })
    );
  };

  // ================= DOWNLOAD =================
  const handleDownload = async (
    type = "png"
  ) => {
    if (!previewRef.current)
      return;

    const element =
      previewRef.current;

    const originalHeight =
      element.style.height;

    const originalOverflow =
      element.style.overflow;

    try {
      // Full Scroll Capture
      element.style.height =
        "auto";

      element.style.overflow =
        "visible";

      await new Promise((res) =>
        setTimeout(res, 300)
      );

      await waitForImages(element);

      // =========================================
      // PNG
      // =========================================
      if (type === "png") {
        const dataUrl =
          await htmlToImage.toPng(
            element,
            {
              cacheBust: true,
              pixelRatio: 3,
              useCORS: true,
              backgroundColor: "#ffffff",
              width: element.scrollWidth,
              height: element.scrollHeight,
            }
          );

        // Download
        const link =
          document.createElement(
            "a"
          );

        link.download = `${template}-portfolio.png`;
        link.href = dataUrl;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Save Library
        saveToLibrary({
          id: Date.now(),

          title:
            data?.name ||
            "Portfolio",

          type: "portfolio",

          format: "png",

          thumbnail:
            dataUrl,
          file: dataUrl,
          createdAt:
            new Date().toISOString(),
        });
      }

          // =========================================
      // PDF
      // =========================================
      if (type === "pdf") {
        const dataUrl =
          await htmlToImage.toPng(
            element,
            {
              cacheBust: true,
              pixelRatio: 2,
              useCORS: true,
              backgroundColor: "#ffffff",
              width: element.scrollWidth,
              height: element.scrollHeight,
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
          dataUrl,
          "PNG",
          x,
          y,
          imgWidth,
          imgHeight
        );

        pdf.save(
          `${template}-portfolio.pdf`
        );

        const pdfData =
          pdf.output("datauristring");

        saveToLibrary({
          id: Date.now(),
          title:
            data?.name ||
            "Portfolio",
          type: "portfolio",
          format: "pdf",
          thumbnail:
            dataUrl,
          file: pdfData,
          createdAt:
            new Date().toISOString(),
        });
      }

      // =========================================
      // DOCX
      // =========================================
      if (type === "docx") {
        const canvas =
          await htmlToImage.toCanvas(
            element,
            {
              pixelRatio: 2,
              backgroundColor: "#ffffff",
              cacheBust: true,
              useCORS: true,
              width: element.scrollWidth,
              height: element.scrollHeight,
            }
          );

        const imgData =
          canvas.toDataURL(
            "image/png"
          );

        const base64Data =
          imgData.split(",")[1];
        const imageData =
          Uint8Array.from(
            atob(base64Data),
            (c) => c.charCodeAt(0)
          );

        const imageWidth = 600;
        const imageHeight = Math.round(
          (canvas.height * imageWidth) /
            canvas.width
        );

        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  text:
                    data?.name ||
                    "Portfolio",
                  heading: "TITLE",
                }),
                new Paragraph({
                  text: "",
                }),
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageData,
                      transformation: {
                        width: imageWidth,
                        height: imageHeight,
                      },
                    }),
                  ],
                }),
              ],
            },
          ],
        });

        const blob =
          await Packer.toBlob(doc);

        saveAs(
          blob,
          `${template}-portfolio.docx`
        );

        const reader =
          new FileReader();

        reader.readAsDataURL(
          blob
        );

        reader.onloadend =
          () => {
            saveToLibrary({
              id: Date.now(),

              title:
                data?.name ||
                "Portfolio",

              type:
                "portfolio",

              format:
                "docx",

              thumbnail:
                imgData,

              file:
                reader.result,

              createdAt:
                new Date().toISOString(),
            });
          };
      }
    } catch (err) {
      console.error(
        "Download failed",
        err
      );
    } finally {
      // Restore
      element.style.height =
        originalHeight;

      element.style.overflow =
        originalOverflow;
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">

      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

        {/* TEMPLATE SWITCH */}
        <div className="bg-white shadow-sm border rounded-full p-1 flex gap-1">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() =>
                setTemplate(
                  tab.id
                )
              }
              className={`px-4 py-1.5 text-sm rounded-full transition ${
                template ===
                tab.id
                  ? "bg-purple-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DOWNLOAD BUTTONS */}
        <div className="flex gap-2 flex-wrap">

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              handleDownload("png");
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            PNG
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              handleDownload("pdf");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            PDF
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              handleDownload("docx");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            DOCX
          </button>

        </div>
      </div>

      {/* ================= PREVIEW ================= */}
      <div className="flex-1 flex justify-center items-start bg-gray-200 rounded-2xl p-4 sm:p-6">

        <div className="bg-white rounded-xl overflow-hidden shadow-2xl border w-full max-w-5xl">

          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b">

            <div className="w-3 h-3 bg-red-400 rounded-full" />

            <div className="w-3 h-3 bg-yellow-400 rounded-full" />

            <div className="w-3 h-3 bg-green-400 rounded-full" />

          </div>

          {/* Content */}
          <div
            ref={previewRef}
            className="overflow-y-auto h-[700px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={template}
                variants={
                  variants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.35,
                }}
              >
                {renderTemplate()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PortfolioCanvas;