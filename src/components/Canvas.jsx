import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";

import { saveToLibrary } from "../utils/library";

import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";

const Canvas = () => {
  const location = useLocation();

  const {
    template,
    setTemplate,
    resumeData,
  } = useResume();

  const resumeRef = useRef();

  const [isMobile, setIsMobile] =
    useState(false);

  // ================= MOBILE CHECK =================
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // ================= AUTO DOWNLOAD =================
  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );

    const downloadType =
      params.get("download");

    if (downloadType && resumeRef.current) {
      setTimeout(() => {
        if (downloadType === "png")
          downloadPNG();

        if (downloadType === "pdf")
          downloadPDF();

        if (downloadType === "docx")
          downloadDOCX();
      }, 1000);
    }
  }, [location.search]);

  // ================= TEMPLATE =================
  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalTemplate />;

      case "modern":
        return <ModernTemplate />;

      case "creative":
        return <CreativeTemplate />;

      case "professional":
        return <ProfessionalTemplate />;

      default:
        return <ModernTemplate />;
    }
  };

  // ================= VALIDATION =================
  const isFormComplete = () => {
    const {
      personal,
      education,
      skills,
      languages,
      agreement,
    } = resumeData;

    return (
      personal?.name?.trim() &&
      personal?.email?.trim() &&
      personal?.phone?.trim() &&
      education?.length > 0 &&
      skills?.length > 0 &&
      languages?.length > 0 &&
      agreement?.agreed === true &&
      agreement?.signature
    );
  };

  const validateBeforeDownload =
    () => {
      if (!isFormComplete()) {
        alert(
          "⚠️ Please complete all sections before downloading"
        );

        return false;
      }

      return true;
    };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const preview =
        await htmlToImage.toPng(
          resumeRef.current,
          {
            pixelRatio: 2,
            cacheBust: true,
            useCORS: true,
            backgroundColor: "#ffffff",
          }
        );

      saveToLibrary({
        title:
          resumeData?.personal?.name ||
          "Resume",

        type: "resume",

        thumbnail: preview,

        rawData: resumeData,
      });

      alert("✅ Resume Saved");
    } catch (error) {
      console.log(error);

      alert("Save Failed");
    }
  };

  // ================= PNG =================
  const downloadPNG = async () => {
    if (!validateBeforeDownload())
      return;

    try {
      const dataUrl =
        await htmlToImage.toPng(
          resumeRef.current,
          {
            pixelRatio: 3,
            cacheBust: true,
            useCORS: true,
            backgroundColor: "#ffffff",
          }
        );

      const link =
        document.createElement("a");

      link.download = "resume.png";

      link.href = dataUrl;

      link.click();

      saveToLibrary({
        title:
          resumeData?.personal?.name ||
          "Resume",

        type: "resume",

        thumbnail: dataUrl,

        rawData: resumeData,
      });
    } catch (error) {
      console.log(error);

      alert("PNG Download Failed");
    }
  };

  // ================= PDF =================
  const downloadPDF = async () => {
    if (!validateBeforeDownload())
      return;

    try {
      const dataUrl =
        await htmlToImage.toPng(
          resumeRef.current,
          {
            pixelRatio: 3,
            cacheBust: true,
            useCORS: true,
            backgroundColor: "#ffffff",
          }
        );

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const imgProps =
        pdf.getImageProperties(
          dataUrl
        );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        pdf.internal.pageSize.getHeight();

      const ratio = Math.min(
        pdfWidth / imgProps.width,
        pdfHeight /
          imgProps.height
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

      pdf.save("resume.pdf");
    } catch (error) {
      console.log(error);

      alert("PDF Download Failed");
    }
  };

  // ================= DOCX =================
  const downloadDOCX = async () => {
    if (!validateBeforeDownload())
      return;

    try {
      const {
        personal,
        education,
        skills,
        languages,
      } = resumeData;

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      personal?.name ||
                      "Your Name",

                    bold: true,

                    size: 34,
                  }),
                ],
              }),

              new Paragraph(
                `${personal?.email || ""} | ${
                  personal?.phone || ""
                }`
              ),

              new Paragraph(""),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "Education",
                    bold: true,
                  }),
                ],
              }),

              ...education.flatMap(
                (e) => [
                  new Paragraph(
                    e.level || ""
                  ),

                  new Paragraph(
                    e.school || ""
                  ),

                  new Paragraph(
                    `${e.startYear} - ${e.endYear}`
                  ),

                  new Paragraph(""),
                ]
              ),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "Skills",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph(
                skills
                  .map(
                    (s) => s.name
                  )
                  .join(", ")
              ),

              new Paragraph(""),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "Languages",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph(
                languages
                  .map(
                    (l) =>
                      `${l.name} (${l.level})`
                  )
                  .join(", ")
              ),
            ],
          },
        ],
      });

      const blob =
        await Packer.toBlob(doc);

      saveAs(blob, "resume.docx");
    } catch (error) {
      console.log(error);

      alert("DOCX Download Failed");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-gray-100
        to-slate-200
      "
    >
      {/* ================= TOP NAVBAR ================= */}
      <div
        className="
          sticky
          top-0
          z-50
          bg-white/90
          backdrop-blur-md
          border-b
          shadow-sm
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-3
            sm:px-6
            py-4
          "
        >
          {/* TOP */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >
            {/* TITLE */}
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-gray-800
                "
              >
                Resume Builder
              </h1>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                Build professional resumes
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div
              className="
                grid
                grid-cols-2
                sm:flex
                gap-2
              "
            >
              <button
                onClick={handleSave}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-medium
                  shadow-md
                  transition
                "
              >
                Save
              </button>

              <button
                onClick={downloadPNG}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  bg-white
                  hover:bg-gray-100
                  font-medium
                "
              >
                PNG
              </button>

              <button
                onClick={downloadPDF}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-black
                  text-white
                  hover:opacity-90
                  font-medium
                "
              >
                PDF
              </button>

              <button
                onClick={downloadDOCX}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  font-medium
                "
              >
                DOCX
              </button>
            </div>
          </div>

          {/* TEMPLATE BUTTONS */}
          <div
            className="
              mt-5
              flex
              gap-3
              overflow-x-auto
              pb-1
              scrollbar-hide
            "
          >
            {[
              "minimal",
              "modern",
              "creative",
              "professional",
            ].map((t) => (
              <button
                key={t}
                onClick={() =>
                  setTemplate(t)
                }
                className={`
                  whitespace-nowrap
                  px-5
                  py-2.5
                  rounded-full
                  text-sm
                  font-medium
                  border
                  transition-all
                  duration-200

                  ${
                    template === t
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RESUME PREVIEW ================= */}
      <div
        className="
          w-full
          flex
          justify-center
          px-2
          sm:px-4
          py-6
        "
      >
        <div
          className="
            w-full
            flex
            justify-center
            overflow-auto
          "
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              border
              overflow-hidden
              transition-all
              duration-300
            "
            style={{
              width: isMobile
                ? "100%"
                : "210mm",

              minHeight: isMobile
                ? "auto"
                : "297mm",
            }}
          >
            <div
              ref={resumeRef}
              className="
                p-2
                sm:p-4
                md:p-8
              "
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;