import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send, ChevronLeft, CheckCircle2, Loader2, UserRound, CreditCard, Bug,
  Lightbulb, HelpCircle, LifeBuoy, Mail, Sparkles, ShieldCheck, ListChecks, Check, Lock, Inbox
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { createMyTicket } from "../services/supportService";

const TicketCategory = ({ name, desc, icon: Icon, isSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative flex h-full flex-col items-start gap-3 p-4 rounded-2xl border-2 text-left outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-brand-red/20 active:scale-[0.97] ${
      isSelected
        ? "border-brand-red bg-brand-red/5 shadow-lg shadow-brand-red/10 ring-4 ring-brand-red/10"
        : "border-neutral-border bg-white hover:-translate-y-0.5 hover:border-brand-red/40 hover:shadow-md"
    }`}
  >
    <span
      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
        isSelected
          ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
          : "bg-neutral-bg text-neutral-text-secondary group-hover:bg-brand-red/10 group-hover:text-brand-red"
      }`}
    >
      <Icon size={20} />
    </span>
    <span>
      <span className={`block text-sm font-bold ${isSelected ? "text-brand-red" : "text-neutral-text-primary"}`}>{name}</span>
      <span className="block text-[11px] text-neutral-text-secondary mt-0.5 leading-snug">{desc}</span>
    </span>
    <span
      className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
        isSelected ? "bg-brand-red border-brand-red text-white scale-100" : "border-neutral-border text-transparent scale-90"
      }`}
    >
      <Check size={12} strokeWidth={3} />
    </span>
  </button>
);

const StepTitle = ({ n, title, hint, done }) => (
  <div className="flex items-start gap-3 mb-4">
    <span
      className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
        done ? "bg-green-500 text-white shadow-md shadow-green-500/20" : "bg-brand-red text-white shadow-md shadow-brand-red/20"
      }`}
    >
      {done ? <Check size={15} strokeWidth={3} /> : n}
    </span>
    <div>
      <h3 className="text-base font-extrabold text-neutral-text-primary leading-tight">{title}</h3>
      {hint && <p className="text-xs text-neutral-text-secondary mt-0.5">{hint}</p>}
    </div>
  </div>
);

const suggestions = {
  "Account & Login": ["Can't sign in", "Update my profile", "Reset password"],
  "Payments & Coins": ["Coins not added", "Refund request", "Payment failed"],
  "Bug Report": ["Page not loading", "Something crashed", "Wrong result"],
  "Feature Request": ["New template idea", "Export option", "Better editor"],
  Other: ["General question", "Feedback"],
};

const fieldCls =
  "w-full rounded-xl border border-neutral-border bg-neutral-bg px-4 py-3 text-sm text-neutral-text-primary outline-none transition-all placeholder:text-gray-400 hover:border-brand-red/40 focus:border-brand-red focus:bg-white focus:ring-4 focus:ring-brand-red/10";

const SupportPage = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const categories = [
    { name: "Account & Login", desc: "Sign-in, profile, security", icon: UserRound },
    { name: "Payments & Coins", desc: "Purchases, balance, refunds", icon: CreditCard },
    { name: "Bug Report", desc: "Something isn't working", icon: Bug },
    { name: "Feature Request", desc: "Ideas to improve us", icon: Lightbulb },
    { name: "Other", desc: "Anything else", icon: HelpCircle },
  ];

  const step1Done = !!category;
  const step2Done = subject.trim().length > 0;
  const step3Done = description.trim().length > 0;
  const progress = Math.round(([step1Done, step2Done, step3Done].filter(Boolean).length / 3) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || subject.trim().length < 3 || description.trim().length < 10) {
      toast.error("Please select a category and fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await createMyTicket({
        subject: `${category}: ${subject.trim()}`,
        message: description.trim(),
      });
      setTicketId(response?.data?.id ?? null);
      setSubmitted(true);
      toast.success("Your support ticket has been sent to our team.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not submit your ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCategory(null);
    setSubject("");
    setDescription("");
    setSubmitted(false);
    setTicketId(null);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-bg flex items-center justify-center p-6">
        <div className="relative overflow-hidden max-w-md w-full bg-white rounded-[2rem] shadow-2xl shadow-black/10 p-10 text-center border border-neutral-border">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-green-400/20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-green-500/30 ring-8 ring-green-100">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="relative text-2xl font-extrabold text-neutral-text-primary mt-6">Ticket Submitted!</h1>
          <p className="relative text-neutral-text-secondary mt-2 text-sm leading-relaxed">
            We've received your request{ticketId ? ` as ticket #${ticketId}` : ""}. Our support team will get back to you shortly at{" "}
            <span className="font-semibold text-neutral-text-primary">{user?.email}</span>.
          </p>

          <div className="relative mt-6 rounded-2xl bg-neutral-bg border border-neutral-border p-4 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-text-secondary">{category}</p>
            <p className="text-sm font-bold text-neutral-text-primary mt-1 truncate">{subject}</p>
          </div>

          <ol className="relative mt-5 space-y-3 text-left">
            {["Ticket received", "Team reviews your request", "Reply sent to your email"].map((t, i) => (
              <li key={t} className="flex items-center gap-3 text-xs font-semibold text-neutral-text-secondary">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${i === 0 ? "bg-green-500 text-white" : "bg-neutral-bg border border-neutral-border text-neutral-text-secondary"}`}>
                  {i === 0 ? <Check size={13} strokeWidth={3} /> : i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>

          <div className="relative mt-7 space-y-3">
            <Link to="/dashboard" className="block w-full bg-brand-black text-white font-bold py-3.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg">
              Back to Dashboard
            </Link>
            <button onClick={resetForm} className="w-full rounded-xl border border-neutral-border bg-white py-3 text-sm font-semibold text-neutral-text-primary hover:bg-neutral-bg transition">
              Submit another ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}.fade-up{animation:fadeUp .55s ease both}`}</style>
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-text-secondary hover:text-brand-red transition">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        {/* ============ HERO ============ */}
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-black p-7 sm:p-10 shadow-2xl shadow-black/20 ring-1 ring-white/5">
          <div className="absolute -top-24 -right-16 w-96 h-96 bg-brand-red/30 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-28 -left-20 w-80 h-80 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-semibold mb-5">
                <Sparkles size={14} className="text-brand-red" /> We're here to help
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center shadow-lg shadow-brand-red/40 ring-4 ring-brand-red/15">
                  <LifeBuoy size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Support Center</h1>
                  <p className="text-gray-400 text-sm sm:text-base mt-1">How can we help you today? Submit a ticket below.</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-semibold text-gray-300">
                      <Inbox size={12} className="text-brand-red" /> Replies on email
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-semibold text-gray-300">
                      <Lock size={12} className="text-brand-red" /> Private &amp; secure
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-5 py-4 min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                <span>Ticket progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <div className="mt-2.5 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-brand-red transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[11px] text-gray-500 mt-2">{progress === 100 ? "Ready to submit" : "Fill all 3 steps to submit"}</p>
            </div>
          </div>
        </div>

        {/* ============ BODY ============ */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="fade-up rounded-3xl border border-neutral-border bg-white shadow-sm">
            <div className="space-y-5 p-5 md:p-7">
              <section className="rounded-2xl border border-neutral-border/70 p-5 md:p-6 transition-colors hover:border-brand-red/30">
                <StepTitle n="1" title="Select a topic" hint="Pick what your request is about." done={step1Done} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((c) => (
                    <TicketCategory key={c.name} name={c.name} desc={c.desc} icon={c.icon} isSelected={category === c.name} onClick={() => setCategory(c.name)} />
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-neutral-border/70 p-5 md:p-6 transition-colors hover:border-brand-red/30">
                <StepTitle n="2" title="Subject" hint="A short summary of your issue." done={step2Done} />
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Coins not added after payment"
                  className={fieldCls}
                  minLength={3}
                  maxLength={100}
                  required
                />
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {category &&
                      suggestions[category]?.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSubject(s)}
                          className="rounded-full border border-neutral-border bg-white px-3 py-1 text-[11px] font-semibold text-neutral-text-secondary transition hover:border-brand-red/40 hover:text-brand-red active:scale-95"
                        >
                          {s}
                        </button>
                      ))}
                  </div>
                  <span className="text-[11px] text-neutral-text-secondary">{subject.length}/100</span>
                </div>
              </section>

              <section className="rounded-2xl border border-neutral-border/70 p-5 md:p-6 transition-colors hover:border-brand-red/30">
                <StepTitle n="3" title="Describe your issue" hint="The more detail you share, the faster we can help." done={step3Done} />
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide as much detail as possible..."
                  rows={7}
                  className={`${fieldCls} resize-y leading-relaxed`}
                  maxLength={1000}
                  minLength={10}
                  required
                />
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-border">
                    <div className="h-full rounded-full bg-brand-red transition-all duration-300" style={{ width: `${Math.min(description.length / 10, 100)}%` }} />
                  </div>
                  <span className="text-[11px] text-neutral-text-secondary">{description.length}/1000</span>
                </div>
              </section>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-b-3xl border-t border-neutral-border bg-neutral-bg/70 px-6 py-4 md:px-8">
              <p className="text-xs text-neutral-text-secondary flex items-center gap-1.5">
                <Mail size={14} className="text-brand-red" /> Replies go to <b className="text-neutral-text-primary">{user?.email || "your email"}</b>
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-2 bg-brand-red text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-red/30 hover:bg-brand-red-hover hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
                {submitting ? "Submitting Ticket..." : "Submit Ticket"}
              </button>
            </div>
          </form>

          {/* SIDE PANEL */}
          <aside className="fade-up space-y-5 lg:sticky lg:top-6" style={{ animationDelay: "120ms" }}>
            <div className="rounded-3xl border border-neutral-border bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-text-secondary">Your account</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-black text-white flex items-center justify-center font-bold">
                  {(user?.first_name || user?.email || "U").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-neutral-text-primary truncate">{user?.first_name || "Welcome"}</p>
                  <p className="text-xs text-neutral-text-secondary truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-brand-black p-5 text-white">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-red/40 blur-2xl rounded-full pointer-events-none" />
              <div className="relative flex items-center gap-2 text-sm font-bold">
                <ListChecks size={17} className="text-brand-red" /> Tips for faster help
              </div>
              <ul className="relative mt-4 space-y-3 text-xs text-gray-300 leading-relaxed">
                <li className="flex gap-2.5"><span className="mt-1 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-red" />Mention what you were doing when the issue happened.</li>
                <li className="flex gap-2.5"><span className="mt-1 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-red" />For payment issues, include the date and amount.</li>
                <li className="flex gap-2.5"><span className="mt-1 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-red" />Share any error message you saw, word for word.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-brand-red/15 bg-gradient-to-br from-brand-red/10 via-brand-red/5 to-transparent p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-text-primary">
                <ShieldCheck size={17} className="text-brand-red" /> Your data is safe
              </div>
              <p className="text-xs text-neutral-text-secondary mt-2 leading-relaxed">
                Your ticket is only visible to our support team. Never share your password in a ticket.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-brand-red hover:underline">
                Need something else? Contact us →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;