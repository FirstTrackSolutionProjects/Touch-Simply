import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Send, ChevronLeft, CheckCircle2, Loader2, UserRound, CreditCard, Bug,
  Lightbulb, HelpCircle, LifeBuoy, ShieldCheck, ListChecks, Check, RotateCcw, Inbox
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { createMyTicket } from "../services/supportService";

const categories = [
  { name: "Account & Login", desc: "Sign-in, profile, security", icon: UserRound },
  { name: "Payments & Coins", desc: "Purchases, balance, refunds", icon: CreditCard },
  { name: "Bug Report", desc: "Something isn't working", icon: Bug },
  { name: "Feature Request", desc: "Ideas to improve us", icon: Lightbulb },
  { name: "Other", desc: "Anything else", icon: HelpCircle },
];

const suggestions = {
  "Account & Login": ["Can't sign in", "Update my profile", "Reset password"],
  "Payments & Coins": ["Coins not added", "Refund request", "Payment failed"],
  "Bug Report": ["Page not loading", "Something crashed", "Wrong result"],
  "Feature Request": ["New template idea", "Export option", "Better editor"],
  Other: ["General question", "Feedback"],
};

const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/* ---------- small UI pieces ---------- */

const BotAvatar = () => (
  <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-brand-red to-red-700 text-white flex items-center justify-center shadow-md shadow-brand-red/30">
    <LifeBuoy size={18} />
  </span>
);

const UserAvatar = ({ letter }) => (
  <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-black text-white text-sm font-bold flex items-center justify-center">
    {letter}
  </span>
);

const Bubble = ({ from, time, letter, wide, children }) => {
  const isBot = from === "bot";
  return (
    <div className={`msg-in flex items-end gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}>
      {isBot ? <BotAvatar /> : <UserAvatar letter={letter} />}
      <div className={`flex flex-col ${isBot ? "items-start" : "items-end"} ${wide ? "w-full max-w-[92%]" : "max-w-[85%]"}`}>
        <div
          className={`px-4 py-3 text-sm leading-relaxed break-words ${
            isBot
              ? "bg-white text-neutral-text-primary border border-neutral-border rounded-2xl rounded-bl-md shadow-sm"
              : "bg-brand-red text-white rounded-2xl rounded-br-md shadow-lg shadow-brand-red/20 whitespace-pre-wrap"
          } ${wide ? "w-full" : ""}`}
        >
          {children}
        </div>
        <span className="text-[10px] text-neutral-text-secondary mt-1 px-1">{time}</span>
      </div>
    </div>
  );
};

const TypingBubble = () => (
  <div className="msg-in flex items-end gap-2.5">
    <BotAvatar />
    <div className="bg-white border border-neutral-border rounded-2xl rounded-bl-md shadow-sm px-4 py-3.5 flex items-center gap-1.5">
      {[0, 150, 300].map((d) => (
        <span key={d} className="w-2 h-2 rounded-full bg-brand-red/70 animate-bounce" style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  </div>
);

const CategoryCard = ({ name, desc, icon: Icon, isSelected, disabled, onClick }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`group relative flex items-center gap-3 p-3 rounded-xl border-2 text-left outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-brand-red/20 ${
      isSelected
        ? "border-brand-red bg-brand-red/5 shadow-md shadow-brand-red/10"
        : disabled
        ? "border-neutral-border bg-neutral-bg opacity-50 cursor-default"
        : "border-neutral-border bg-white hover:-translate-y-0.5 hover:border-brand-red/40 hover:shadow-md active:scale-[0.97]"
    }`}
  >
    <span
      className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-all duration-300 ${
        isSelected
          ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
          : "bg-neutral-bg text-neutral-text-secondary group-hover:bg-brand-red/10 group-hover:text-brand-red"
      }`}
    >
      <Icon size={18} />
    </span>
    <span className="min-w-0">
      <span className={`block text-[13px] font-bold ${isSelected ? "text-brand-red" : "text-neutral-text-primary"}`}>{name}</span>
      <span className="block text-[11px] text-neutral-text-secondary leading-snug">{desc}</span>
    </span>
    {isSelected && (
      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center">
        <Check size={10} strokeWidth={3} />
      </span>
    )}
  </button>
);

/* ---------- page ---------- */

const SupportPage = () => {
  const { user } = useAuth();
  const letter = (user?.first_name || user?.email || "U").charAt(0).toUpperCase();

  const idRef = useRef(10);
  const timersRef = useRef([]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const makeInitial = () => [
    { id: 1, from: "bot", kind: "text", time: nowTime(), text: `Hi ${user?.first_name || "there"}! I'm the Touch Simply support assistant.` },
    { id: 2, from: "bot", kind: "categories", time: nowTime(), text: "What is your request about? Pick a topic to start." },
  ];

  const [messages, setMessages] = useState(makeInitial);
  const [stage, setStage] = useState("category"); // category | subject | description | confirm | done
  const [category, setCategory] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const step1Done = !!category;
  const step2Done = subject.trim().length > 0;
  const step3Done = description.trim().length > 0;
  const progress = Math.round(([step1Done, step2Done, step3Done].filter(Boolean).length / 3) * 100);

  const inputEnabled = (stage === "subject" || stage === "description") && !typing;
  const maxLen = stage === "subject" ? 100 : 1000;

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (inputEnabled) inputRef.current?.focus();
  }, [inputEnabled]);

  const addUser = (text) =>
    setMessages((m) => [...m, { id: idRef.current++, from: "user", kind: "text", time: nowTime(), text }]);

  const botSay = (msg, delay = 750) => {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: idRef.current++, from: "bot", time: nowTime(), kind: "text", ...msg }]);
    }, delay);
    timersRef.current.push(t);
  };

  const pickCategory = (c) => {
    if (stage !== "category") return;
    setCategory(c.name);
    addUser(c.name);
    setStage("subject");
    botSay({
      text: `Got it, "${c.name}". Now give me a short subject for your issue. You can type it or tap a suggestion.`,
      chips: suggestions[c.name],
    });
  };

  const handleSubject = (text) => {
    const value = text.trim();
    if (value.length < 3) {
      toast.error("Subject must be at least 3 characters.");
      return;
    }
    setSubject(value);
    addUser(value);
    setInput("");
    setStage("description");
    botSay({ text: "Thanks! Now describe your issue in detail. The more you share, the faster we can help." });
  };

  const handleDescription = (text) => {
    const value = text.trim();
    if (value.length < 10) {
      toast.error("Please describe your issue in at least 10 characters.");
      return;
    }
    setDescription(value);
    addUser(value);
    setInput("");
    setStage("confirm");
    botSay({ kind: "summary", text: "Here's your ticket. Check it once and submit when you're ready." }, 900);
  };

  const sendInput = (e) => {
    e?.preventDefault();
    if (!inputEnabled || !input.trim()) return;
    if (stage === "subject") handleSubject(input);
    else if (stage === "description") handleDescription(input);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendInput();
    }
  };

  const submitTicket = async () => {
    if (submitting || stage !== "confirm") return;
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
      setStage("done");
      botSay({ kind: "success", ticketId: response?.data?.id ?? null, text: "Your ticket is submitted!" }, 700);
      toast.success("Your support ticket has been sent to our team.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not submit your ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetChat = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setTyping(false);
    setCategory(null);
    setSubject("");
    setDescription("");
    setInput("");
    setStage("category");
    setMessages(makeInitial());
  };

  const renderBody = (m) => {
    if (m.kind === "categories") {
      return (
        <>
          <p className="mb-3 font-semibold">{m.text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {categories.map((c) => (
              <CategoryCard
                key={c.name}
                {...c}
                isSelected={category === c.name}
                disabled={stage !== "category"}
                onClick={() => pickCategory(c)}
              />
            ))}
          </div>
        </>
      );
    }

    if (m.kind === "summary") {
      return (
        <>
          <p className="font-semibold">{m.text}</p>
          <div className="mt-3 rounded-xl border border-neutral-border bg-neutral-bg p-3.5 space-y-2.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-text-secondary">Topic</p>
              <p className="text-sm font-bold text-brand-red">{category}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-text-secondary">Subject</p>
              <p className="text-sm font-bold text-neutral-text-primary break-words">{subject}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-text-secondary">Details</p>
              <p className="text-xs text-neutral-text-secondary whitespace-pre-wrap break-words max-h-24 overflow-y-auto">{description}</p>
            </div>
          </div>
          <p className="text-[11px] text-neutral-text-secondary mt-2.5">
            Replies will be sent to <b className="text-neutral-text-primary">{user?.email || "your email"}</b>
          </p>
          {stage === "confirm" && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={submitTicket}
                disabled={submitting}
                className="group inline-flex items-center gap-2 bg-brand-red text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-red/30 hover:bg-brand-red-hover hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
                {submitting ? "Submitting Ticket..." : "Submit Ticket"}
              </button>
              <button
                type="button"
                onClick={resetChat}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm font-semibold text-neutral-text-primary hover:bg-neutral-bg transition disabled:opacity-60"
              >
                <RotateCcw size={14} /> Start over
              </button>
            </div>
          )}
        </>
      );
    }

    if (m.kind === "success") {
      return (
        <>
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30">
              <CheckCircle2 size={24} />
            </span>
            <div>
              <p className="font-bold text-neutral-text-primary">Ticket Submitted!</p>
              <p className="text-xs text-neutral-text-secondary">
                {m.ticketId ? `Ticket #${m.ticketId}. ` : ""}We'll reply on <b className="text-neutral-text-primary">{user?.email}</b>.
              </p>
            </div>
          </div>
          <ol className="mt-3 space-y-2">
            {["Ticket received", "Team reviews your request", "Reply sent to your email"].map((t, i) => (
              <li key={t} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-text-secondary">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${
                    i === 0 ? "bg-green-500 text-white" : "bg-neutral-bg border border-neutral-border"
                  }`}
                >
                  {i === 0 ? <Check size={11} strokeWidth={3} /> : i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <Link to="/dashboard" className="bg-brand-black text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg">
              Back to Dashboard
            </Link>
            <button
              type="button"
              onClick={resetChat}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm font-semibold text-neutral-text-primary hover:bg-neutral-bg transition"
            >
              <RotateCcw size={14} /> New ticket
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <p>{m.text}</p>
        {m.chips && stage === "subject" && !typing && (
          <div className="mt-3 flex flex-wrap gap-2">
            {m.chips.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSubject(s)}
                className="rounded-full border border-brand-red/30 bg-brand-red/5 px-3.5 py-1.5 text-xs font-semibold text-brand-red transition hover:bg-brand-red hover:text-white active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  const placeholder =
    stage === "subject"
      ? "Type a short subject, e.g. Coins not added after payment"
      : stage === "description"
      ? "Describe your issue in detail... (Shift+Enter for new line)"
      : stage === "category"
      ? "Pick a topic above to begin"
      : stage === "confirm"
      ? "Review your ticket and submit"
      : "Ticket submitted";

  return (
    <div className="min-h-screen bg-neutral-bg py-8 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes msgIn{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}
        .msg-in{animation:msgIn .35s ease both}
        @media (prefers-reduced-motion: reduce){.msg-in{animation:none}.animate-bounce{animation:none}}
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-text-secondary hover:text-brand-red transition">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ============ CHAT WINDOW ============ */}
          <div className="flex h-[calc(100vh-9rem)] min-h-[560px] max-h-[760px] flex-col overflow-hidden rounded-[2rem] border border-neutral-border bg-white shadow-2xl shadow-black/10">
            {/* header */}
            <div className="relative overflow-hidden bg-brand-black px-5 py-4 sm:px-6">
              <div className="absolute -top-16 -right-10 w-64 h-64 bg-brand-red/30 blur-3xl rounded-full pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center shadow-lg shadow-brand-red/40 ring-4 ring-brand-red/15">
                      <LifeBuoy size={24} className="text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-brand-black" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">Support Center</h1>
                    <p className="text-xs text-gray-400 truncate">{typing ? "typing..." : "Online · We're here to help"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                      <span>Progress</span>
                      <span className="text-white">{progress}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-brand-red transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetChat}
                    title="Start over"
                    className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition"
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto bg-neutral-bg/70 px-4 py-5 sm:px-6 space-y-4"
              style={{
                backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              {messages.map((m) => (
                <Bubble key={m.id} from={m.from} time={m.time} letter={letter} wide={m.kind === "categories" || m.kind === "summary" || m.kind === "success"}>
                  {m.from === "user" ? m.text : renderBody(m)}
                </Bubble>
              ))}
              {typing && <TypingBubble />}
            </div>

            {/* input bar */}
            <form onSubmit={sendInput} className="border-t border-neutral-border bg-white px-4 py-3.5 sm:px-6">
              <div
                className={`flex items-end gap-2.5 rounded-2xl border bg-neutral-bg px-3 py-2 transition-all ${
                  inputEnabled ? "border-neutral-border focus-within:border-brand-red focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-red/10" : "border-neutral-border opacity-70"
                }`}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  maxLength={maxLen}
                  disabled={!inputEnabled}
                  placeholder={placeholder}
                  className="flex-1 resize-none bg-transparent px-1.5 py-2 text-sm text-neutral-text-primary outline-none placeholder:text-gray-400 disabled:cursor-not-allowed max-h-32"
                />
                <button
                  type="submit"
                  disabled={!inputEnabled || !input.trim()}
                  className="group w-10 h-10 shrink-0 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/30 hover:bg-brand-red-hover hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                  aria-label="Send"
                >
                  <Send size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-neutral-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Inbox size={12} className="text-brand-red" /> Replies go to <b className="text-neutral-text-primary">{user?.email || "your email"}</b>
                </span>
                {inputEnabled && <span>{input.length}/{maxLen}</span>}
              </div>
            </form>
          </div>

          {/* ============ SIDE PANEL ============ */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-neutral-border bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-text-secondary">Your account</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-black text-white flex items-center justify-center font-bold">{letter}</div>
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