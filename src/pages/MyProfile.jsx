import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, CalendarDays, Camera, LoaderCircle, Mail, Save, ShieldCheck, Trash2, UserRound, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, getProfileAvatarUploadUrl, updateMyProfile } from "../services/profileService";

const emptyForm = { first_name: "", middle_name: "", last_name: "", phone: "", bio: "", location: "", website: "" };
const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export default function MyProfile() {
  const { user, checkAuth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    getMyProfile().then(({ data }) => {
      if (!active) return;
      setProfile(data);
      setForm({ first_name: data.first_name || "", middle_name: data.middle_name || "", last_name: data.last_name || "", phone: data.phone || "", bio: data.bio || "", location: data.location || "", website: data.website || "" });
    }).catch((error) => toast.error(error?.response?.data?.message || "Could not load your profile")).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const previewUrl = useMemo(() => photo ? URL.createObjectURL(photo) : null, [photo]);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  const displayName = profile ? [profile.first_name, profile.middle_name, profile.last_name].filter(Boolean).join(" ") : user?.first_name || "My profile";
  const avatar = previewUrl || (!removePhoto && profile?.avatar_url);

  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!imageTypes.includes(file.type)) return toast.error("Choose a JPG, PNG, or WebP image");
    if (file.size > 5 * 1024 * 1024) return toast.error("Profile image must be 5 MB or smaller");
    setPhoto(file);
    setRemovePhoto(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      let avatar_key;
      if (photo) {
        const { data } = await getProfileAvatarUploadUrl(photo.type);
        const uploaded = await fetch(data.upload_url, { method: "PUT", headers: { "Content-Type": photo.type }, body: photo });
        if (!uploaded.ok) throw new Error("Photo upload failed. Please try again.");
        avatar_key = data.avatar_key;
      } else if (removePhoto) avatar_key = null;
      const { data } = await updateMyProfile({ ...form, ...(avatar_key !== undefined ? { avatar_key } : {}) });
      setProfile(data);
      setForm({ first_name: data.first_name || "", middle_name: data.middle_name || "", last_name: data.last_name || "", phone: data.phone || "", bio: data.bio || "", location: data.location || "", website: data.website || "" });
      setPhoto(null);
      setRemovePhoto(false);
      await checkAuth();
      toast.success("Your profile has been updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Could not update your profile");
    } finally { setSaving(false); }
  };

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const inputClass = "mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

  return <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-white px-4 py-10">
    <section className="mx-auto max-w-5xl">
      <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-700"><ArrowLeft size={17} /> Back to dashboard</Link>
      <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl shadow-purple-100/50">
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-800 px-6 py-8 text-white sm:px-9"><p className="text-sm font-semibold text-purple-200">Your account</p><h1 className="mt-1 text-3xl font-bold">My profile</h1><p className="mt-2 text-sm text-white/75">Manage your personal details and profile photo.</p></div>
        {loading ? <div className="grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-purple-600" size={30} /></div> : <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[250px_1fr]">
          <aside className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center">
            <div className="relative mx-auto h-28 w-28">
              {avatar ? <img src={avatar} alt="Your profile" className="h-28 w-28 rounded-full object-cover ring-4 ring-white" /> : <div className="grid h-28 w-28 place-items-center rounded-full bg-purple-100 text-purple-700 ring-4 ring-white"><UserRound size={42} /></div>}
              <label title="Upload profile photo" className="absolute bottom-0 right-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-purple-700 text-white shadow hover:bg-purple-800"><Camera size={17} /><input type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="sr-only" /></label>
            </div>
            {avatar && <button type="button" onClick={() => { setPhoto(null); setRemovePhoto(true); }} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700"><Trash2 size={13} /> Remove photo</button>}
            <p className="mt-2 text-xs text-gray-400">JPG, PNG or WebP · up to 5 MB</p>
            <h2 className="mt-4 break-words text-lg font-bold text-gray-900">{displayName}</h2><p className="mt-1 break-all text-sm text-gray-500">{profile?.email}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase text-purple-700"><BadgeCheck size={14} /> {profile?.role || "USER"}</span>
            <div className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-left text-sm text-gray-600"><p className="flex items-center gap-2"><CalendarDays size={16} className="shrink-0 text-purple-600" /> Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</p><p className="flex items-center gap-2"><ShieldCheck size={16} className="shrink-0 text-purple-600" /> {Number(profile?.wallet_balance || 0).toLocaleString()} credits</p></div>
          </aside>
          <form onSubmit={submit} className="space-y-5">
            <div><h2 className="text-lg font-bold text-gray-900">Personal information</h2><p className="mt-1 text-sm text-gray-500">These details belong to your account.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[ ["first_name", "First name", true], ["middle_name", "Middle name", false], ["last_name", "Last name", true], ["phone", "Phone number", false] ].map(([name, label, required]) => <label key={name} className="block text-sm font-medium text-gray-700">{label}<input name={name} required={required} maxLength={name === "phone" ? 20 : 100} type={name === "phone" ? "tel" : "text"} value={form[name]} onChange={updateField} autoComplete={name.replace("_", "-")} placeholder={name === "phone" ? "Optional" : ""} className={inputClass} /></label>)}
              <label className="block text-sm font-medium text-gray-700">Location<input name="location" maxLength={120} value={form.location} onChange={updateField} autoComplete="address-level2" placeholder="City, country (optional)" className={inputClass} /></label>
              <label className="block text-sm font-medium text-gray-700">Website<input name="website" type="url" maxLength={255} value={form.website} onChange={updateField} placeholder="https://example.com" className={inputClass} /></label>
            </div>
            <label className="block text-sm font-medium text-gray-700">About you<textarea name="bio" maxLength={500} rows={4} value={form.bio} onChange={updateField} placeholder="A short introduction (optional)" className={inputClass} /><span className="mt-1 block text-right text-xs font-normal text-gray-400">{form.bio.length}/500</span></label>
            <label className="block text-sm font-medium text-gray-700">Email address <span className="ml-1 text-xs font-normal text-gray-400">Managed by your sign-in account</span><span className="mt-1.5 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-gray-500"><Mail size={17} />{profile?.email || user?.email}</span></label>
            {profile?.phone && <p className="flex items-center gap-2 text-xs text-gray-500"><Phone size={14} /> Your phone number is included in your account profile.</p>}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5"><Link to="/settings" className="text-sm font-semibold text-purple-700 hover:text-purple-900">Account password &amp; security</Link><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-wait disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={17} /> : <Save size={17} />}{saving ? "Saving..." : "Save profile"}</button></div>
          </form>
        </div>}
      </div>
    </section>
  </main>;
}
