import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Briefcase, Eye, ExternalLink } from "lucide-react";
import PortfolioForm from "../components/portfolio/PortfolioForm";
import PortfolioCanvas from "../components/portfolio/PortfolioCanvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PageBackButton from "../components/PageBackButton";

const PortfolioBuilder = () => {
  const location = useLocation();
  const NAV_H = 100; // top navbar ki height (px), apne hisaab se adjust karo
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    state: "",
    pincode: "",

    github: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",

    education: [
      {
        degree: "",
        college: "",
        startYear: "",
        endYear: "",
        isPresent: false,
      },
    ],

    projects: [
      {
        title: "",
        desc: "",
        github: "",
        image: "",
      },
    ],
  });

  useEffect(() => {
    if (location.state?.editData?.rawData) {
      setData(location.state.editData.rawData);
    }
  }, [location.state]);

  const downloadPDF = async () => {
    const element = document.getElementById("portfolio-preview");

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",

        onclone: (doc) => {
          // 🔥 REMOVE ALL OKLCH COLORS
          const all = doc.querySelectorAll("*");
          all.forEach((el) => {
            el.style.color = "#000000";
            el.style.backgroundColor = "#ffffff";
            el.style.borderColor = "#dddddd";
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("portfolio.pdf");
    } catch (err) {
      console.error("PDF ERROR:", err);
      alert("Download failed");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-brand-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-brand-red/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ================= LEFT: FORM ================= */}
      <div className="relative z-10 lg:w-1/2 w-full p-4 sm:p-6">
        <div className="relative overflow-hidden bg-white p-5 sm:p-8 rounded-3xl shadow-2xl shadow-black/30">
          <div className="absolute top-0 left-8 h-1.5 w-20 rounded-b-full bg-brand-red" />
          <div className="absolute -top-14 -right-14 w-44 h-44 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative">
            <PageBackButton className="mb-5" fallback="/templates" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 text-white flex items-center justify-center shadow-lg shadow-brand-red/30">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">Portfolio Builder</p>
                <h2 className="text-xl md:text-2xl font-extrabold text-neutral-text-primary tracking-tight leading-tight">
                  Build Your Portfolio
                </h2>
                <p className="text-xs md:text-sm text-neutral-text-secondary mt-0.5">
                  Fill in your details and watch the preview update live.
                </p>
              </div>
            </div>

            <PortfolioForm data={data} setData={setData} />
          </div>
        </div>
      </div>

      {/* ================= RIGHT: PREVIEW ================= */}
      <div className="relative z-10 lg:w-1/2 w-full p-4 sm:p-6">
        <div
          style={{ top: NAV_H + 16 }}
          className="lg:sticky flex flex-col bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden lg:max-h-[calc(100vh-132px)]"
        >
          {/* Header */}
          <div className="flex flex-wrap gap-3 justify-between px-5 py-4 border-b border-neutral-border items-center bg-white">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-brand-red" />
              <div>
                <h2 className="text-lg font-extrabold text-neutral-text-primary tracking-tight leading-none">Live Preview</h2>
                <p className="flex items-center gap-1.5 text-[11px] text-neutral-text-secondary mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <Eye size={12} /> Updates as you type
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  localStorage.setItem("portfolioData", JSON.stringify(data));
                  window.open("/portfolio/view", "_blank");
                }}
                className="group inline-flex items-center gap-2 bg-brand-black text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
              >
                Open Portfolio <ExternalLink size={15} className="text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Preview body */}
          <div id="portfolio-preview" className="p-4 bg-neutral-bg lg:overflow-y-auto">
            <PortfolioCanvas data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;