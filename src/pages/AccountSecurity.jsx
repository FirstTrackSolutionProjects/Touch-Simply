import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { setAccountPassword } from "../services/authServices";

const RULES = [
  { id: "len", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "num", label: "One number", test: (p) => /\d/.test(p) },
  { id: "sym", label: "One symbol (e.g. ! @ #)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const STRENGTH = [
  { label: "Too short", bar: "bg-gray-300", text: "text-neutral-text-secondary" },
  { label: "Weak", bar: "bg-brand-red", text: "text-brand-red" },
  { label: "Fair", bar: "bg-amber-500", text: "text-amber-600" },
  { label: "Good", bar: "bg-lime-500", text: "text-lime-600" },
  { label: "Strong", bar: "bg-emerald-500", text: "text-emerald-600" },
];

const lineInput =
  "w-full rounded-none border-0 border-b-2 border-neutral-border bg-transparent px-0 py-3 pr-10 text-lg text-neutral-text-primary outline-none ring-0 transition placeholder:text-gray-300 hover:border-gray-400 focus:border-brand-red focus:outline-none focus:ring-0";

function PasswordField({ label, name, value, onChange, autoComplete, required, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="text-sm font-medium text-neutral-text-secondary transition-colors group-focus-within:text-brand-red"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className={lineInput}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-neutral-text-secondary transition hover:text-brand-red"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
      {children}
    </div>
  );
}

export default function AccountSecurity() {
  const { user } = useAuth();
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [hasExisting, setHasExisting] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const results = useMemo(() => RULES.map((r) => ({ ...r, ok: r.test(form.new_password) })), [form.new_password]);
  const score = results.filter((r) => r.ok).length;
  const allMet = score === RULES.length;
  const strengthLevel = form.new_password ? (score === 5 ? 4 : Math.max(1, score - 1)) : 0;
  const strengthInfo = STRENGTH[strengthLevel];

  const confirmTyped = form.confirm_password.length > 0;
  const matches = confirmTyped && form.new_password === form.confirm_password;
  const canSubmit = allMet && matches && !saving;

  const toggleExisting = () => {
    setHasExisting((v) => {
      if (v) setForm((c) => ({ ...c, current_password: "" }));
      return !v;
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (form.new_password !== form.confirm_password) return toast.error("Passwords do not match");
    setSaving(true);
    try {
      await setAccountPassword({
        ...(form.current_password ? { current_password: form.current_password } : {}),
        new_password: form.new_password,
        confirm_password: form.confirm_password,
      });
      setForm({ current_password: "", new_password: "", confirm_password: "" });
      toast.success("Password set. You can now sign in with email and password.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* ───────── left: context + live checklist ───────── */}
      <aside className="relative overflow-hidden bg-brand-black px-6 py-8 text-white sm:px-10 lg:px-14 lg:py-12">
        {/* decoration */}
        <div className="pointer-events-none absolute -bottom-28 -right-28 hidden h-72 w-72 rounded-full bg-brand-red sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-48 -right-48 hidden h-[28rem] w-[28rem] rounded-full border border-white/10 sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-72 -right-72 hidden h-[40rem] w-[40rem] rounded-full border border-white/5 sm:block" aria-hidden="true" />

        <div className="relative z-10 flex h-full flex-col">
          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back to dashboard
          </Link>

          <div className="mt-10 lg:mt-16">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-red text-white">
              <KeyRound size={26} />
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Set an account password
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400">
              Signed in as <b className="break-all text-white">{user?.email}</b>. Add a Touch Simply password to sign in
              with Google or with email and password.
            </p>
          </div>

          <ul className="mt-9 space-y-3" aria-label="Password requirements">
            {results.map((r) => (
              <li
                key={r.id}
                className={`flex items-center gap-3 text-sm transition-colors ${r.ok ? "text-white" : "text-gray-500"}`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all ${
                    r.ok ? "border-emerald-500 bg-emerald-500 text-white" : "border-gray-600"
                  }`}
                  aria-hidden="true"
                >
                  {r.ok && <Check size={12} strokeWidth={3} />}
                </span>
                {r.label}
                <span className="sr-only">{r.ok ? "met" : "not met yet"}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 flex max-w-sm gap-2.5 text-xs leading-relaxed text-gray-500 lg:mt-auto lg:pt-10">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-red" />
            Your Google password is never shared with Touch Simply. This is a separate password just for this site.
          </p>
        </div>
      </aside>

      {/* ───────── right: form ───────── */}
      <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-16">
        <form onSubmit={submit} className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-neutral-text-primary">Create your password</h2>
            <p className="mt-1.5 text-sm text-neutral-text-secondary">
              Pick something only you would know. You can change it again anytime.
            </p>
          </div>

          {/* existing password (optional) */}
          {hasExisting ? (
            <PasswordField
              label="Current Touch Simply password"
              name="current_password"
              value={form.current_password}
              onChange={update}
              autoComplete="current-password"
            />
          ) : null}
          <button
            type="button"
            onClick={toggleExisting}
            className="-mt-3 text-sm font-semibold text-brand-red transition hover:text-brand-red-hover"
          >
            {hasExisting ? "I don't have one yet" : "I already have a Touch Simply password"}
          </button>

          <PasswordField
            label="New password"
            name="new_password"
            value={form.new_password}
            onChange={update}
            autoComplete="new-password"
            required
          >
            {/* strength meter */}
            <div className="mt-3 flex items-center gap-3" aria-live="polite">
              <div className="flex flex-1 gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      strengthLevel >= i ? strengthInfo.bar : "bg-neutral-border"
                    }`}
                  />
                ))}
              </div>
              <span className={`w-16 text-right text-xs font-bold ${strengthInfo.text}`}>
                {form.new_password ? strengthInfo.label : ""}
              </span>
            </div>
          </PasswordField>

          <PasswordField
            label="Confirm new password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={update}
            autoComplete="new-password"
            required
          >
            {confirmTyped && (
              <p
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                  matches ? "text-emerald-600" : "text-brand-red"
                }`}
                aria-live="polite"
              >
                {matches ? <Check size={14} strokeWidth={3} /> : null}
                {matches ? "Passwords match" : "Passwords don't match yet"}
              </p>
            )}
          </PasswordField>

          <button
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-4 text-base font-bold text-white transition hover:bg-brand-red-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving && <Loader2 size={18} className="animate-spin" />}
            {saving ? "Saving..." : "Set password"}
          </button>
        </form>
      </section>
    </main>
  );
}