import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageBackButton({ fallback = "/" , className = "" }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(fallback);
  };

  return (
    <button type="button" onClick={goBack} className={`inline-flex items-center gap-2 rounded-lg border border-neutral-border bg-white px-3.5 py-2 text-sm font-medium text-neutral-text-secondary shadow-sm transition hover:border-brand-red/30 hover:text-brand-red ${className}`} aria-label="Go back to the previous page">
      <ArrowLeft size={17} /> Back
    </button>
  );
}
