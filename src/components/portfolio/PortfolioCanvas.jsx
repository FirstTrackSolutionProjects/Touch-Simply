// import React, { useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import ModernPortfolio from "../../templates/ModernPortfolio";
// import MinimalPortfolio from "../../templates/MinimalPortfolio";
// import CreativePortfolio from "../../templates/CreativePortfolio";

// import * as htmlToImage from "html-to-image";
// import jsPDF from "jspdf";
// import { Document, Packer, Paragraph, ImageRun } from "docx";
// import { saveAs } from "file-saver";

// import { saveToLibrary } from "../../utils/library";

// const PortfolioCanvas = ({ data }) => {
//   const [template, setTemplate] =
//     useState("modern");

//   const previewRef = useRef();

//   const tabs = [
//     {
//       id: "modern",
//       label: "Modern",
//     },
//     {
//       id: "minimal",
//       label: "Minimal",
//     },
//     {
//       id: "creative",
//       label: "Creative",
//     },
//   ];

//   // ================= ANIMATION =================
//   const variants = {
//     initial: {
//       opacity: 0,
//       scale: 0.98,
//       y: 20,
//     },

//     animate: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//     },

//     exit: {
//       opacity: 0,
//       scale: 0.98,
//       y: -20,
//     },
//   };

//   // ================= TEMPLATE =================
//   const renderTemplate = () => {
//     switch (template) {
//       case "minimal":
//         return (
//           <MinimalPortfolio
//             data={data}
//           />
//         );

//       case "creative":
//         return (
//           <CreativePortfolio
//             data={data}
//           />
//         );

//       default:
//         return (
//           <ModernPortfolio
//             data={data}
//           />
//         );
//     }
//   };

//   const waitForImages = async (root) => {
//     const images = Array.from(root.querySelectorAll("img"));
//     await Promise.all(
//       images.map((img) => {
//         if (img.complete) return Promise.resolve();
//         return new Promise((resolve) => {
//           img.onload = img.onerror = resolve;
//         });
//       })
//     );
//   };

//   // ================= DOWNLOAD =================
//   const handleDownload = async (
//     type = "png"
//   ) => {
//     if (!previewRef.current)
//       return;

//     const element =
//       previewRef.current;

//     const originalHeight =
//       element.style.height;

//     const originalOverflow =
//       element.style.overflow;

//     try {
//       // Full Scroll Capture
//       element.style.height =
//         "auto";

//       element.style.overflow =
//         "visible";

//       await new Promise((res) =>
//         setTimeout(res, 300)
//       );

//       await waitForImages(element);

//       // =========================================
//       // PNG
//       // =========================================
//       if (type === "png") {
//         const dataUrl =
//           await htmlToImage.toPng(
//             element,
//             {
//               cacheBust: true,
//               pixelRatio: 3,
//               useCORS: true,
//               backgroundColor: "#ffffff",
//               width: element.scrollWidth,
//               height: element.scrollHeight,
//             }
//           );

//         // Download
//         const link =
//           document.createElement(
//             "a"
//           );

//         link.download = `${template}-portfolio.png`;
//         link.href = dataUrl;
//         link.style.display = "none";

//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         // Save Library
//         saveToLibrary({
//           id: Date.now(),

//           title:
//             data?.name ||
//             "Portfolio",

//           type: "portfolio",

//           format: "png",

//           thumbnail:
//             dataUrl,
//           file: dataUrl,
//           createdAt:
//             new Date().toISOString(),
//         });
//       }

//           // =========================================
//       // PDF
//       // =========================================
//       if (type === "pdf") {
//         const dataUrl =
//           await htmlToImage.toPng(
//             element,
//             {
//               cacheBust: true,
//               pixelRatio: 2,
//               useCORS: true,
//               backgroundColor: "#ffffff",
//               width: element.scrollWidth,
//               height: element.scrollHeight,
//             }
//           );

//         const tempPdf = new jsPDF(
//           "p",
//           "mm",
//           "a4"
//         );

//         const imgProps =
//           tempPdf.getImageProperties(
//             dataUrl
//           );

//         const orientation =
//           imgProps.width > imgProps.height
//             ? "landscape"
//             : "portrait";

//         const pdf = new jsPDF(
//           orientation,
//           "mm",
//           "a4"
//         );

//         const pdfWidth =
//           pdf.internal.pageSize.getWidth();
//         const pdfHeight =
//           pdf.internal.pageSize.getHeight();

//         const ratio = Math.min(
//           pdfWidth / imgProps.width,
//           pdfHeight / imgProps.height
//         );

//         const imgWidth =
//           imgProps.width * ratio;
//         const imgHeight =
//           imgProps.height * ratio;

//         const x =
//           (pdfWidth - imgWidth) / 2;
//         const y =
//           (pdfHeight - imgHeight) / 2;

//         pdf.addImage(
//           dataUrl,
//           "PNG",
//           x,
//           y,
//           imgWidth,
//           imgHeight
//         );

//         pdf.save(
//           `${template}-portfolio.pdf`
//         );

//         const pdfData =
//           pdf.output("datauristring");

//         saveToLibrary({
//           id: Date.now(),
//           title:
//             data?.name ||
//             "Portfolio",
//           type: "portfolio",
//           format: "pdf",
//           thumbnail:
//             dataUrl,
//           file: pdfData,
//           createdAt:
//             new Date().toISOString(),
//         });
//       }

//       // =========================================
//       // DOCX
//       // =========================================
//       if (type === "docx") {
//         const canvas =
//           await htmlToImage.toCanvas(
//             element,
//             {
//               pixelRatio: 2,
//               backgroundColor: "#ffffff",
//               cacheBust: true,
//               useCORS: true,
//               width: element.scrollWidth,
//               height: element.scrollHeight,
//             }
//           );

//         const imgData =
//           canvas.toDataURL(
//             "image/png"
//           );

//         const base64Data =
//           imgData.split(",")[1];
//         const imageData =
//           Uint8Array.from(
//             atob(base64Data),
//             (c) => c.charCodeAt(0)
//           );

//         const imageWidth = 600;
//         const imageHeight = Math.round(
//           (canvas.height * imageWidth) /
//             canvas.width
//         );

//         const doc = new Document({
//           sections: [
//             {
//               children: [
//                 new Paragraph({
//                   text:
//                     data?.name ||
//                     "Portfolio",
//                   heading: "TITLE",
//                 }),
//                 new Paragraph({
//                   text: "",
//                 }),
//                 new Paragraph({
//                   children: [
//                     new ImageRun({
//                       data: imageData,
//                       transformation: {
//                         width: imageWidth,
//                         height: imageHeight,
//                       },
//                     }),
//                   ],
//                 }),
//               ],
//             },
//           ],
//         });

//         const blob =
//           await Packer.toBlob(doc);

//         saveAs(
//           blob,
//           `${template}-portfolio.docx`
//         );

//         const reader =
//           new FileReader();

//         reader.readAsDataURL(
//           blob
//         );

//         reader.onloadend =
//           () => {
//             saveToLibrary({
//               id: Date.now(),

//               title:
//                 data?.name ||
//                 "Portfolio",

//               type:
//                 "portfolio",

//               format:
//                 "docx",

//               thumbnail:
//                 imgData,

//               file:
//                 reader.result,

//               createdAt:
//                 new Date().toISOString(),
//             });
//           };
//       }
//     } catch (err) {
//       console.error(
//         "Download failed",
//         err
//       );
//     } finally {
//       // Restore
//       element.style.height =
//         originalHeight;

//       element.style.overflow =
//         originalOverflow;
//     }
//   };

//   return (
//     <div className="h-full flex flex-col gap-4">

//       {/* ================= TOP BAR ================= */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

//         {/* TEMPLATE SWITCH */}
//         <div className="bg-white shadow-sm border rounded-full p-1 flex gap-1">
//           {tabs.map((tab) => (
//             <button
//               type="button"
//               key={tab.id}
//               onClick={() =>
//                 setTemplate(
//                   tab.id
//                 )
//               }
//               className={`px-4 py-1.5 text-sm rounded-full transition ${
//                 template ===
//                 tab.id
//                   ? "bg-purple-600 text-white shadow"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* DOWNLOAD BUTTONS */}
//         <div className="flex gap-2 flex-wrap">

//           <button
//             type="button"
//             onClick={(event) => {
//               event.preventDefault();
//               handleDownload("png");
//             }}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
//           >
//             PNG
//           </button>

//           <button
//             type="button"
//             onClick={(event) => {
//               event.preventDefault();
//               handleDownload("pdf");
//             }}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
//           >
//             PDF
//           </button>

//           <button
//             type="button"
//             onClick={(event) => {
//               event.preventDefault();
//               handleDownload("docx");
//             }}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
//           >
//             DOCX
//           </button>

//         </div>
//       </div>

//       {/* ================= PREVIEW ================= */}
//       <div className="flex-1 flex justify-center items-start bg-gray-200 rounded-2xl p-4 sm:p-6">

//         <div className="bg-white rounded-xl overflow-hidden shadow-2xl border w-full max-w-5xl">

//           {/* Browser Header */}
//           <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b">

//             <div className="w-3 h-3 bg-red-400 rounded-full" />

//             <div className="w-3 h-3 bg-yellow-400 rounded-full" />

//             <div className="w-3 h-3 bg-green-400 rounded-full" />

//           </div>

//           {/* Content */}
//           <div
//             ref={previewRef}
//             className="overflow-y-auto h-[700px]"
//           >
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={template}
//                 variants={
//                   variants
//                 }
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{
//                   duration: 0.35,
//                 }}
//               >
//                 {renderTemplate()}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default PortfolioCanvas;


import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ModernPortfolio from "../../templates/ModernPortfolio";
import MinimalPortfolio from "../../templates/MinimalPortfolio";
import CreativePortfolio from "../../templates/CreativePortfolio";

import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";
import { saveToLibrary } from "../../utils/library";

const PortfolioCanvas = ({ data }) => {
  const location = useLocation();
  const [template, setTemplate] =
    useState("modern");

  const previewRef = useRef();

  // ================= AUTO DOWNLOAD FROM LIBRARY =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const downloadType = params.get("download");

    if (downloadType) {
      setTimeout(() => {
        if (downloadType === "png") downloadPNG();
        if (downloadType === "pdf") downloadPDF();
        if (downloadType === "docx") downloadDOCX();
      }, 1000);
    }
  }, [location.search]);

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
          <MinimalPortfolio data={data} />
        );

      case "creative":
        return (
          <CreativePortfolio data={data} />
        );

      default:
        return (
          <ModernPortfolio data={data} />
        );
    }
  };

  // ================= WAIT FOR IMAGES =================
  const waitForImages = async (root) => {
    const images = Array.from(
      root.querySelectorAll("img")
    );

    await Promise.all(
      images.map((img) => {
        if (img.complete)
          return Promise.resolve();

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  // ================= GET FULL IMAGE =================
  const generateImage = async () => {
    const element = previewRef.current;

    if (!element) return null;

    const originalHeight =
      element.style.height;

    const originalOverflow =
      element.style.overflow;

    try {
      // FULL SCROLL CAPTURE
      element.style.height = "auto";
      element.style.maxHeight = "none";
      element.style.overflow = "visible";

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      await waitForImages(element);

      const dataUrl =
        await htmlToImage.toPng(
          element,
          {
            cacheBust: true,
            pixelRatio: 3,
            useCORS: true,
            backgroundColor:
              "#ffffff",
            width:
              element.scrollWidth,
            height:
              element.scrollHeight,

            style: {
              transform: "scale(1)",
              transformOrigin:
                "top left",
            },
          }
        );

      return dataUrl;
    } finally {
      element.style.height =
        originalHeight;

      element.style.overflow =
        originalOverflow;
    }
  };

  // ================= PNG =================
  const downloadPNG = async () => {
    try {
      const dataUrl =
        await generateImage();

      if (!dataUrl) return;

      const link =
        document.createElement("a");

      link.download =
        `${template}-portfolio.png`;

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
        title: data?.name || "Portfolio",
        type: "portfolio",
        thumbnail: dataUrl,
        rawData: data,
      });
    } catch (err) {
      console.error(err);
      alert("PNG download failed");
    }
  };

  // ================= PDF =================
  const downloadPDF = async () => {
    try {
      const dataUrl =
        await generateImage();

      if (!dataUrl) return;

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

      const imgWidth =
        pdfWidth;

      const imgHeight =
        (imgProps.height *
          imgWidth) /
        imgProps.width;

      let heightLeft =
        imgHeight;

      let position = 0;

      // FIRST PAGE
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;

      // MULTIPLE PAGES
      while (heightLeft > 0) {
        position =
          heightLeft -
          imgHeight;

        pdf.addPage();

        pdf.addImage(
          dataUrl,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -=
          pdfHeight;
      }

      pdf.save(
        `${template}-portfolio.pdf`
      );

      // SAVE LIBRARY
      const pdfData =
        pdf.output(
          "datauristring"
        );

      saveToLibrary({
        title: data?.name || "Portfolio",
        type: "portfolio",
        thumbnail: dataUrl,
        rawData: data,
      });
    } catch (err) {
      console.error(err);
      alert("PDF download failed");
    }
  };

  // ================= DOCX =================
  const downloadDOCX = async () => {
    try {
      // PREVIEW IMAGE FOR LIBRARY
      const previewImage = await htmlToImage.toPng(previewRef.current, {
        pixelRatio: 1,
        cacheBust: true,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const {
        name,
        email,
        phone,
        about,
        education,
        experience,
        projects,
        skills,
        languages,
      } = data;

      const doc = new Document({
        sections: [
          {
            children: [
              // HEADER
              new Paragraph({
                children: [
                  new TextRun({
                    text: name || "Your Name",
                    bold: true,
                    size: 36,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${email || ""} | ${phone || ""}`,
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),

              // ABOUT
              ...(about || "Building modern web applications"
                ? [
                    new Paragraph({
                      children: [new TextRun({ text: "About Me", bold: true, size: 24 })],
                    }),
                    new Paragraph({ text: about || "Building modern web applications" }),
                    new Paragraph({ text: "" }),
                  ]
                : []),

              // EXPERIENCE
              new Paragraph({
                children: [new TextRun({ text: "Professional Experience", bold: true, size: 24 })],
              }),
              ...(experience?.flatMap((exp) => [
                new Paragraph({
                  children: [new TextRun({ text: exp.role || "Role", bold: true })],
                }),
                new Paragraph({
                  children: [new TextRun({ text: exp.company || "Company" })],
                }),
                new Paragraph({
                  text: `${exp.start || ""} - ${exp.isWorking ? "Present" : exp.end || ""}`,
                }),
                new Paragraph({ text: "" }),
              ]) || []),

              // PROJECTS
              new Paragraph({
                children: [new TextRun({ text: "Projects", bold: true, size: 24 })],
              }),
              ...(projects?.flatMap((proj) => [
                new Paragraph({
                  children: [new TextRun({ text: proj.title || "Project Title", bold: true })],
                }),
                new Paragraph({ text: proj.desc || "" }),
                ...(proj.github
                  ? [new Paragraph({ children: [new TextRun({ text: `GitHub: ${proj.github}`, color: "0000FF" })] })]
                  : []),
                new Paragraph({ text: "" }),
              ]) || []),

              // EDUCATION
              new Paragraph({
                children: [new TextRun({ text: "Education", bold: true, size: 24 })],
              }),
              ...(education?.flatMap((edu) => [
                new Paragraph({
                  children: [new TextRun({ text: edu.degree || "Degree", bold: true })],
                }),
                new Paragraph({ text: edu.college || "College" }),
                new Paragraph({
                  text: `${edu.startYear || ""} - ${edu.isPresent ? "Present" : edu.endYear || ""}`,
                }),
                new Paragraph({ text: "" }),
              ]) || []),

              // SKILLS & LANGUAGES
              new Paragraph({
                children: [new TextRun({ text: "Skills", bold: true, size: 24 })],
              }),
              new Paragraph({ text: skills || "No skills listed" }),
              new Paragraph({ text: "" }),

              new Paragraph({
                children: [new TextRun({ text: "Languages", bold: true, size: 24 })],
              }),
              new Paragraph({ text: languages || "No languages listed" }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${template}-portfolio.docx`);

      // SAVE TO LIBRARY
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        saveToLibrary({
          title: name || "Portfolio",
          type: "portfolio",
          thumbnail: previewImage,
          rawData: data,
        });
      };
    } catch (err) {
      console.error(err);
      alert("DOCX download failed");
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
            onClick={
              downloadPNG
            }
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            PNG
          </button>

          <button
            type="button"
            onClick={
              downloadPDF
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            PDF
          </button>

          <button
            type="button"
            onClick={
              downloadDOCX
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
          >
            DOCX
          </button>

        </div>
      </div>

      {/* ================= PREVIEW ================= */}
      <div className="flex-1 flex justify-center items-start bg-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden">

        <div className="bg-white rounded-xl overflow-hidden shadow-2xl border w-full max-w-5xl">

          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b">

            <div className="w-3 h-3 bg-red-400 rounded-full" />

            <div className="w-3 h-3 bg-yellow-400 rounded-full" />

            <div className="w-3 h-3 bg-green-400 rounded-full" />

          </div>

          {/* CONTENT */}
          <div
            ref={previewRef}
            className="overflow-y-auto h-[700px] bg-white"
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