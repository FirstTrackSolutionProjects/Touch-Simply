import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import TemplateSection from "../components/TemplateSection";
import PageBackButton from "../components/PageBackButton";
import { getResumeTemplates } from "../services/resumeService";
import { useAuth } from "../context/AuthContext";

const DEFAULT_RESUME_TEMPLATE_IMAGE = "/images/modern-resume.jpg";
const TEMPLATE_PREVIEW_BY_S3_KEY_SUFFIX = {
  "/CleanCV": "/template-previews/CleanCV.png",
  "/PremiumCV": "/template-previews/PremiumCV.png",
};

const getResumeTemplatePreview = (template) => {
  const s3Key = String(template.s3_key || template.s3Key || "").replace(/\/+$/, "");
  const matchingPreview = Object.entries(TEMPLATE_PREVIEW_BY_S3_KEY_SUFFIX)
    .find(([suffix]) => s3Key.toLowerCase().endsWith(suffix.toLowerCase()));

  return {
    image: matchingPreview?.[1]
      || template.preview_image_url
      || template.previewImageUrl
      || template.preview_url
      || DEFAULT_RESUME_TEMPLATE_IMAGE,
    fallbackImage: matchingPreview ? DEFAULT_RESUME_TEMPLATE_IMAGE : undefined,
  };
};

const Templates = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const { user } = useAuth();
  const [resumeTemplates, setResumeTemplates] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getResumeTemplates();
        const list = (res.data?.templates || []).map((t) => ({
          name: t.title,
          key: t.id,
          ...getResumeTemplatePreview(t),
        }));
        setResumeTemplates(list);
      } catch (e) {
        toast.error("Failed to load resume templates.");
      }
    })();
  }, []);

  const logoTemplates = [
    { name: "Modern Logo", key: "logo-modern", image: "/images/modern-logo.jpg" },
    { name: "Minimal Logo", key: "logo-minimal", image: "/images/minimal-logo.jpg" },
    { name: "Creative Logo", key: "logo-creative", image: "/images/creative-logo.jpg" },
    { name: "Bold Logo", key: "logo-bold", image: "/images/bold-logo.jpg" },
  ];

  const portfolioTemplates = [
    { name: "Modern Portfolio", key: "portfolio-modern", image: "/images/modern-portfolio.jpg" },
    { name: "Clean Portfolio", key: "portfolio-minimal", image: "/images/clean-portfolio.jpg" },
    { name: "Creative Portfolio", key: "portfolio-creative", image: "/images/creative-portfolio.jpg" },
    { name: "Professional Portfolio", key: "portfolio-pro", image: "/images/professional-portfolio.jpg" },
  ];

  const presentationTemplates = [
    { name: "Startup Pitch", key: "ppt-startup", image: "/images/ppt-startup.jpg" },
    { name: "Business Deck", key: "ppt-business", image: "/images/ppt-business.jpg" },
    { name: "Creative Slides", key: "ppt-creative", image: "/images/ppt-creative.jpg" },
    { name: "Minimal Slides", key: "ppt-minimal", image: "/images/ppt-minimal.jpg" },
  ];

  const handleUseTemplate = (key, type) => {
    let destination;
    if (type === "resume") {
      const template = resumeTemplates.find((t) => t.key === key);
      destination = { pathname: "/editor", state: { templateId: key, templateTitle: template?.name || "Resume" } };
    }
    if (type === "logo") destination = { pathname: "/logo", state: { templateId: key } };
    if (type === "portfolio") destination = { pathname: "/portfolio", state: { templateId: key } };
    if (type === "presentation") destination = { pathname: "/presentation", state: { templateId: key } };

    if (!destination) return;
    if (!user) {
      toast.info("Please log in to use this template.");
      navigate("/login", { state: { from: destination } });
      return;
    }
    navigate(destination.pathname, { state: destination.state });
  };

  return (
    <section className="py-24 px-6 bg-neutral-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <PageBackButton className="mb-8" />
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-text-primary">
            Choose Your Template
          </h1>
          <p className="text-neutral-text-secondary mt-5 text-lg max-w-xl mx-auto">
            Build Resumes, Logos, Portfolios & Presentations 🚀
          </p>
        </div>

        <div className="space-y-16">
          {(!typeFilter || typeFilter === "resume") && <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-border">
            <TemplateSection title="Resume Templates" data={resumeTemplates} type="resume" onUse={handleUseTemplate} />
          </div>}
          {(!typeFilter || typeFilter === "logo") && <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-border">
            <TemplateSection title="Logo Templates" data={logoTemplates} type="logo" onUse={handleUseTemplate} />
          </div>}
          {(!typeFilter || typeFilter === "portfolio") && <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-border">
            <TemplateSection title="Portfolio Templates" data={portfolioTemplates} type="portfolio" onUse={handleUseTemplate} />
          </div>}
          {(!typeFilter || typeFilter === "presentation") && <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-border">
            <TemplateSection title="Presentation Templates" data={presentationTemplates} type="presentation" onUse={handleUseTemplate} />
          </div>}
        </div>
      </div>
    </section>
  );
};

export default Templates;
