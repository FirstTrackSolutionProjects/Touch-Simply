import { useRef, useEffect, useState } from "react";
import { useResume } from "../context/ResumeContext";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { saveToLibrary } from "../utils/library";

import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";

const Canvas = () => {
  const { template, setTemplate, resumeData } = useResume();
  const resumeRef = useRef();

  // ✅ Responsive Scale
  const [scale, setScale] = useState(1);

  useEffect(() => {
  const updateScale = () => {
    const width = window.innerWidth;


  if (width < 768) 
    setScale(1);  
    else if (width < 1200) 
      setScale(0.7);  
    else setScale(0.85);                   
  };

  updateScale();
  window.addEventListener("resize", updateScale);

  return () => window.removeEventListener("resize", updateScale);
}, []);

  // 🎯 Template Render
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

  // 📥 PNG
  const downloadPNG = async () => {
    if (!isFormComplete()) {
    alert("⚠️ Please complete all sections & accept agreement before downloading");
    return;
  }
  const node = resumeRef.current;

  const dataUrl = await htmlToImage.toPng(node, {
    pixelRatio: 3,
  });

  const link = document.createElement("a");
  link.download = "resume.png";
  link.href = dataUrl;
  link.click();

  saveToLibrary({
    id: Date.now(),
    type: "png",
    file: dataUrl,
    createdAt: new Date().toLocaleString(),
  });
}

  // 📄 PDF
  const downloadPDF = async () => {
    if (!isFormComplete()) {
    alert("⚠️ Please complete all sections & accept agreement before downloading");
    return;
  }
  const node = resumeRef.current;

  const dataUrl = await htmlToImage.toPng(node);

  const pdf = new jsPDF("p", "mm", "a4");

  const imgProps = pdf.getImageProperties(dataUrl);
  const ratio = Math.min(210 / imgProps.width, 297 / imgProps.height);

  pdf.addImage(dataUrl, "PNG", 0, 0, imgProps.width * ratio, imgProps.height * ratio);

  pdf.save("resume.pdf");

  const pdfData = pdf.output("datauristring");

  saveToLibrary({
    id: Date.now(),
    type: "pdf",
    file: pdfData,
    createdAt: new Date().toLocaleString(),
  });
};

  // 📄 DOCX
  const downloadDOCX = async () => {
    if (!isFormComplete()) {
    alert("⚠️ Please complete all sections & accept agreement before downloading");
    return;
  }
  const { personal, education, experience, skills, projects, languages } =
    resumeData;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: personal?.name || "Your Name",
                bold: true,
                size: 32,
              }),
            ],
          }),

          new Paragraph(
            `${personal?.email || ""} | ${personal?.phone || ""}`
          ),

          new Paragraph(""),

          // EXPERIENCE
          new Paragraph({
            children: [new TextRun({ text: "Experience", bold: true })],
          }),

          ...experience.flatMap((e) => [
            new Paragraph({
              children: [
                new TextRun({ text: e.role || "", bold: true }),
              ],
            }),
            new Paragraph(e.company || ""),
            new Paragraph(
              `${e.startYear || ""} - ${e.endYear || "Present"}`
            ),
            new Paragraph(e.description || ""),
            new Paragraph(""),
          ]),

          // PROJECTS
          new Paragraph({
            children: [new TextRun({ text: "Projects", bold: true })],
          }),

          ...projects.flatMap((p) => [
            new Paragraph({
              children: [
                new TextRun({ text: p.title || "", bold: true }),
              ],
            }),
            new Paragraph(p.tech || ""),
            new Paragraph(p.description || ""),
            new Paragraph(""),
          ]),

          // EDUCATION
          new Paragraph({
            children: [new TextRun({ text: "Education", bold: true })],
          }),

          ...education.flatMap((e) => [
            new Paragraph({
              children: [
                new TextRun({ text: e.level || "", bold: true }),
              ],
            }),
            new Paragraph(e.school || ""),
            new Paragraph(
              `${e.startYear || ""} - ${e.endYear || ""}`
            ),
            new Paragraph(""),
          ]),

          // SKILLS
          new Paragraph({
            children: [new TextRun({ text: "Skills", bold: true })],
          }),
          new Paragraph(skills.map((s) => s.name).join(", ")),

          new Paragraph(""),

          // LANGUAGES
          new Paragraph({
            children: [new TextRun({ text: "Languages", bold: true })],
          }),
          new Paragraph(
            languages.map((l) => `${l.name} (${l.level})`).join(", ")
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  // ✅ Download
  saveAs(blob, "resume.docx");

  // ✅ Save to Library
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  reader.onloadend = () => {
    saveToLibrary({
      id: Date.now(),
      type: "docx",
      file: reader.result,
      createdAt: new Date().toLocaleString(),
    });
  };
};
// ✅ Check if form is complete
const isFormComplete = () => {
  const { personal, education, experience, skills, languages, agreement } = resumeData;

  return (
    personal?.name &&
    personal?.email &&
    personal?.phone &&
    education.length > 0 &&
    experience.length > 0 &&
    skills.length > 0 &&
    languages.length > 0 &&
    agreement?.agreed === true &&
    agreement?.signature
  );
};

  return (
    <div className="w-full bg-white border-b shadow-sm px-4 py-3 flex flex-col gap-4">

    {/* TITLE */}
    <h1 className="text-lg font-semibold text-center md:text-left">
      Resume Builder
    </h1>

    {/* TEMPLATE BUTTONS */}
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
      {["minimal", "modern", "creative", "professional"].map((t) => (
        <button
          key={t}
          onClick={() => setTemplate(t)}
          className={`w-full sm:w-auto px-3 py-2 text-sm rounded-full border transition-all duration-200 capitalize
            ${
              template === t
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {t}
        </button>
      ))}
    </div>

    {/* DOWNLOAD BUTTONS */}
    <div className="grid grid-cols-3 gap-2">
      
      <button
        onClick={downloadPNG}
        className="py-2 text-sm font-medium rounded-md border 
        bg-white text-gray-700 
        hover:bg-gray-100 transition active:scale-95"
      >
        PNG
      </button>

      <button
        onClick={downloadPDF}
        className="py-2 text-sm font-medium rounded-md 
        bg-black text-white 
        shadow-md active:scale-95"
      >
        PDF
      </button>

      <button
        onClick={downloadDOCX}
        className="py-2 text-sm font-medium rounded-md 
        bg-blue-600 text-white 
        shadow-md active:scale-95"
      >
        DOCX
      </button>

    </div>


      {/* ===== PREVIEW ===== */}
        <div className="flex-1 w-full overflow-auto bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center py-4 px-2">

    <div className="flex justify-center w-full">

      <div
        className="bg-white shadow-xl border rounded-md transition-all duration-300 w-full max-w-[210mm] "
        style={{
          minHeight: "297mm",
          transform: window.innerWidth < 768 ? "none" : `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <div ref={resumeRef} className="p-4 md:p-10">
          {renderTemplate()}
        </div>
      </div>

    </div>
  </div>

    </div>

  );
};

export default Canvas;