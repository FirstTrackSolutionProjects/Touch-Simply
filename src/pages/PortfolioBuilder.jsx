import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Eye, ExternalLink, User, GraduationCap, BriefcaseBusiness,
  Wrench, Rocket, Link2, PencilLine, MonitorPlay
} from "lucide-react";
import PortfolioForm from "../components/portfolio/PortfolioForm";
import PortfolioCanvas from "../components/portfolio/PortfolioCanvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PageBackButton from "../components/PageBackButton";

// Form ke andar ke purple/blue/dull elements ko wrapper se hi restyle karta hai
// (PortfolioForm.jsx ko chhue bina). Real fix ke liye PortfolioForm.jsx edit karna better hai.
const FORM_SKIN = [
  // root wrapper ka dhundhla gradient strip hatao
  "[&>*]:!bg-none [&>*]:!bg-transparent [&>*]:!shadow-none",
  // text inputs / textarea / select
  "[&_input]:!rounded-xl [&_input]:!bg-neutral-bg [&_input]:!border [&_input]:!border-neutral-border [&_input]:!px-4 [&_input]:!py-3 [&_input]:!text-sm [&_input]:!transition-all",
  "[&_textarea]:!rounded-xl [&_textarea]:!bg-neutral-bg [&_textarea]:!border [&_textarea]:!border-neutral-border [&_textarea]:!px-4 [&_textarea]:!py-3 [&_textarea]:!text-sm",
  "[&_select]:!rounded-xl [&_select]:!bg-neutral-bg [&_select]:!border [&_select]:!border-neutral-border [&_select]:!px-4 [&_select]:!py-3 [&_select]:!text-sm",
  "[&_input:focus]:!bg-white [&_input:focus]:!border-brand-red/60 [&_input:focus]:!ring-4 [&_input:focus]:!ring-brand-red/10 [&_input:focus]:!outline-none",
  "[&_textarea:focus]:!bg-white [&_textarea:focus]:!border-brand-red/60 [&_textarea:focus]:!ring-4 [&_textarea:focus]:!ring-brand-red/10 [&_textarea:focus]:!outline-none",
  "[&_select:focus]:!bg-white [&_select:focus]:!border-brand-red/60 [&_select:focus]:!ring-4 [&_select:focus]:!ring-brand-red/10 [&_select:focus]:!outline-none",
  // checkbox
  "[&_input[type=checkbox]]:!p-0 [&_input[type=checkbox]]:!w-4 [&_input[type=checkbox]]:!h-4 [&_input[type=checkbox]]:!rounded [&_input[type=checkbox]]:!accent-brand-red",
  // purple / indigo buttons (Add Education, Add Experience, Add Project...) -> brand red
  "[&_button[class*=purple]]:!bg-none [&_button[class*=purple]]:!bg-brand-red [&_button[class*=purple]]:!rounded-xl [&_button[class*=purple]]:!font-bold [&_button[class*=purple]]:!shadow-lg [&_button[class*=purple]]:!shadow-brand-red/30 [&_button[class*=purple]]:hover:!bg-brand-red-hover",
  "[&_button[class*=indigo]]:!bg-none [&_button[class*=indigo]]:!bg-brand-red [&_button[class*=indigo]]:!rounded-xl",
  // blue buttons (Upload Image) -> brand black
  "[&_button[class*=blue]]:!bg-none [&_button[class*=blue]]:!bg-brand-black [&_button[class*=blue]]:!rounded-xl [&_button[class*=blue]]:hover:!bg-black",
  // headings
  "[&_h2]:!font-extrabold [&_h2]:!tracking-tight [&_h3]:!font-extrabold [&_h3]:!tracking-tight",
].join(" ");

const SECTIONS = [
  { label: "Personal", key: "personal", icon: User },
  { label: "Education", key: "education", icon: GraduationCap },
  { label: "Experience", key: "experience", icon: BriefcaseBusiness },
  { label: "Skills", key: "skills", icon: Wrench },
  { label: "Projects", key: "projects", icon: Rocket },
  { label: "Social", key: "social", icon: Link2 },
];

const PortfolioBuilder = () => {
  const location = useLocation();
  const NAV_H = 100; // top navbar ki height (px), apne hisaab se adjust karo
  const [mobileTab, setMobileTab] = useState("edit"); // edit | preview
  const [activeSection, setActiveSection] = useState("personal");
  const scrollRef = useRef(null);
  const formRef = useRef(null);

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

  // ===== Profile completion =====
  const personalFilled = ["name", "email", "phone", "dob", "city", "state", "pincode"].filter(
    (k) => String(data[k] || "").trim()
  ).length;
  const socialFilled = ["github", "linkedin", "instagram", "facebook", "twitter", "youtube"].some(
    (k) => String(data[k] || "").trim()
  )
    ? 1
    : 0;
  const eduFilled = data.education?.some((e) => e.degree?.trim() && e.college?.trim()) ? 1 : 0;
  const projFilled = data.projects?.some((p) => p.title?.trim()) ? 1 : 0;
  const percent = Math.round(((personalFilled + socialFilled + eduFilled + projFilled) / 10) * 100);

  const R = 20;
  const C = 2 * Math.PI * R;

  // ===== Jump to section inside form =====
  const jumpTo = (key) => {
    setActiveSection(key);
    const root = formRef.current;
    const scroller = scrollRef.current;
    if (!root || !scroller) return;
    const nodes = root.querySelectorAll("h1,h2,h3,h4,h5,h6,p,label");
    const target = Array.from(nodes).find((n) => {
      const t = n.textContent.trim().toLowerCase();
      return t.length < 40 && t.includes(key);
    });
    if (target) {
      const top =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        16;
      scroller.scrollTo({ top, behavior: "smooth" });
    }
  };

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
    <div
      style={{ "--page-h": `calc(100vh - ${NAV_H}px)` }}
      className="relative bg-brand-black overflow-hidden lg:h-[var(--page-h)]"
    >
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

      {/* Mobile tab switch */}
      <div className="relative z-20 lg:hidden flex p-1.5 m-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
        {[
          { k: "edit", label: "Edit", icon: PencilLine },
          { k: "preview", label: "Preview", icon: MonitorPlay },
        ].map(({ k, label, icon: Icon }) => (
          <button
            key={k}
            onClick={() => setMobileTab(k)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
              mobileTab === k ? "bg-brand-red text-white shadow-lg shadow-brand-red/30" : "text-gray-300"
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:h-full">
        {/* ================= LEFT: FORM ================= */}
        <div className={`${mobileTab === "edit" ? "flex" : "hidden"} lg:flex lg:w-1/2 w-full p-3 sm:p-4 lg:h-full`}>
          <div className="relative flex flex-col w-full bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden lg:h-full">
            <div className="absolute top-0 left-8 h-1.5 w-20 rounded-b-full bg-brand-red z-10" />

            {/* Form header */}
            <div className="shrink-0 px-5 sm:px-6 pt-6 pb-4 border-b border-neutral-border bg-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <PageBackButton className="shrink-0" fallback="/templates" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">Portfolio Builder</p>
                    <h2 className="text-lg md:text-xl font-extrabold text-neutral-text-primary tracking-tight leading-tight truncate">
                      Build Your Portfolio
                    </h2>
                  </div>
                </div>

                {/* Progress ring */}
                <div className="relative w-14 h-14 shrink-0" title="Profile completion">
                  <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r={R} fill="none" strokeWidth="5" className="stroke-neutral-border" />
                    <circle
                      cx="24"
                      cy="24"
                      r={R}
                      fill="none"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="stroke-brand-red transition-all duration-700"
                      strokeDasharray={C}
                      strokeDashoffset={C - (C * percent) / 100}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-neutral-text-primary">
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Section chips */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SECTIONS.map(({ label, key, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => jumpTo(key)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${
                      activeSection === key
                        ? "bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/30"
                        : "bg-neutral-bg text-neutral-text-secondary border-neutral-border hover:border-brand-red/40 hover:text-brand-red"
                    }`}
                  >
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable form */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 scroll-smooth bg-neutral-bg/60">
              <div ref={formRef} className={FORM_SKIN}>
                <PortfolioForm data={data} setData={setData} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: PREVIEW ================= */}
        <div className={`${mobileTab === "preview" ? "flex" : "hidden"} lg:flex lg:w-1/2 w-full p-3 sm:p-4 lg:h-full`}>
          <div className="flex flex-col w-full bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden lg:h-full">
            {/* Header */}
            <div className="shrink-0 flex flex-wrap gap-3 justify-between px-5 py-4 border-b border-neutral-border items-center bg-white">
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

              <button
                onClick={() => {
                  localStorage.setItem("portfolioData", JSON.stringify(data));
                  window.open("/portfolio/view", "_blank");
                }}
                className="group inline-flex items-center gap-2 bg-brand-black text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
              >
                Open Portfolio{" "}
                <ExternalLink size={15} className="text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Preview body */}
            <div id="portfolio-preview" className="flex-1 p-4 bg-neutral-bg overflow-y-auto">
              <PortfolioCanvas data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;