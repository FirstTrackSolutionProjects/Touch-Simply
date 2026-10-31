import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, CalendarDays, LoaderCircle, Mail, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, updateMyProfile } from "../services/profileService";

const initialForm = { first_name: "", middle_name: "", last_name: "", phone: "" };

export default function MyProfile() {
  const { user, checkAuth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    getMyProfile().then(({ data }) => {
      if (!active) return;
      setProfile(data);
      setForm({ first_name: data.first_name || "", middle_name: data.middle_name || "", last_name: data.last_name || "", phone: data.phone || "" });
    }).catch((error) => toast.error(error?.response?.data?.message || "Could not load your profile")).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const { data } = await updateMyProfile(form);
      setProfile(data);
      setForm({ first_name: data.first_name || "", middle_name: data.middle_name || "", last_name: data.last_name || "", phone: data.phone || "" });
      await checkAuth();
      toast.success("Your profile has been updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update your profile");
    } finally { setSaving(false); }
  };

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const displayName = profile ? [profile.first_name, profile.middle_name, profile.last_name].filter(Boolean).join(" ") : user?.first_name || "My profile";

  return <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-white px-4 py-10">
    <section className="mx-auto max-w-4xl">
      <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-700"><ArrowLeft size={17} /> Back to dashboard</Link>
      <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl shadow-purple-100/50">
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-800 px-6 py-8 text-white sm:px-9">
          <p className="text-sm font-semibold text-purple-200">Your account</p>
          <h1 className="mt-1 text-3xl font-bold">My profile</h1>
          <p className="mt-2 text-sm text-white/75">View and update your personal details.</p>
        </div>
        {loading ? <div className="grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-purple-600" size={30} /></div> : <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="Profile" className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white" /> : <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-purple-100 text-purple-700 ring-4 ring-white"><UserRound size={38} /></div>}
            <h2 className="mt-4 break-words text-lg font-bold text-gray-900">{displayName}</h2>
            <p className="mt-1 break-all text-sm text-gray-500">{profile?.email}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase text-purple-700"><BadgeCheck size={14} /> {profile?.role || "USER"}</span>
            <div className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-left text-sm text-gray-600">
              <p className="flex items-center gap-2"><CalendarDays size={16} className="shrink-0 text-purple-600" /> Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</p>
              <p className="flex items-center gap-2"><ShieldCheck size={16} className="shrink-0 text-purple-600" /> {Number(profile?.wallet_balance || 0).toLocaleString()} credits</p>
            </div>
          </aside>
          <form onSubmit={submit} className="space-y-5">
            <div><h2 className="text-lg font-bold text-gray-900">Personal information</h2><p className="mt-1 text-sm text-gray-500">These details belong to your account.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[["first_name", "First name", true], ["middle_name", "Middle name", false], ["last_name", "Last name", true]].map(([name, label, required]) => <label key={name} className="block text-sm font-medium text-gray-700">{label}<input name={name} required={required} maxLength={100} value={form[name]} onChange={updateField} autoComplete={name.replace("_", "-")} className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100" /></label>)}
              <label className="block text-sm font-medium text-gray-700">Phone number<input name="phone" type="tel" maxLength={20} value={form.phone} onChange={updateField} autoComplete="tel" placeholder="Optional" className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100" /><span className="mt-1 block text-xs font-normal text-gray-400">Include country code if needed, e.g. +91.</span></label>
            </div>
            <label className="block text-sm font-medium text-gray-700">Email address <span className="ml-1 text-xs font-normal text-gray-400">Managed by your sign-in account</span><span className="mt-1.5 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-gray-500"><Mail size={17} />{profile?.email || user?.email}</span></label>
            {profile?.phone && <p className="flex items-center gap-2 text-xs text-gray-500"><Phone size={14} /> Phone number is visible only to you in your account profile.</p>}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
              <Link to="/settings" className="text-sm font-semibold text-purple-700 hover:text-purple-900">Account password &amp; security</Link>
              <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-wait disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={17} /> : <Save size={17} />}{saving ? "Saving..." : "Save profile"}</button>
            </div>
          </form>
        </div>}
      </div>
    </section>
  </main>;
}
