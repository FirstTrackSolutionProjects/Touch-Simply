import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { setAccountPassword } from "../services/authServices";

export default function AccountSecurity() {
  const { user } = useAuth();
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [saving, setSaving] = useState(false);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

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

  return <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-white px-4 py-10">
    <section className="mx-auto max-w-xl">
      <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-700"><ArrowLeft size={17} /> Back to dashboard</Link>
      <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-100/60 sm:p-9">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700"><KeyRound size={23} /></div>
        <p className="text-sm font-semibold text-purple-700">Account security</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Set an account password</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">Signed in as <b>{user?.email}</b>. Set a Touch Simply password to use both Google sign-in and email/password sign-in.</p>
        <div className="mt-5 flex gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-5 text-blue-900"><ShieldCheck className="mt-0.5 shrink-0" size={18} /><p>Google passwords are never shared with Touch Simply. Create a separate password here. If you already have a Touch Simply password, enter it first.</p></div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Current Touch Simply password <span className="font-normal text-gray-400">(only if already set)</span><input name="current_password" type="password" autoComplete="current-password" value={form.current_password} onChange={update} className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100" /></label>
          <label className="block text-sm font-medium text-gray-700">New password<input name="new_password" type="password" autoComplete="new-password" required minLength="8" value={form.new_password} onChange={update} className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100" /><span className="mt-1 block text-xs font-normal text-gray-500">8+ characters with uppercase, lowercase, number, and symbol.</span></label>
          <label className="block text-sm font-medium text-gray-700">Confirm new password<input name="confirm_password" type="password" autoComplete="new-password" required minLength="8" value={form.confirm_password} onChange={update} className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100" /></label>
          <button disabled={saving} className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-purple-200 disabled:cursor-wait disabled:opacity-60">{saving ? "Saving..." : "Set password"}</button>
        </form>
      </div>
    </section>
  </main>;
}
