import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  LoaderCircle,
  Lock,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, getProfileAvatarUploadUrl, updateMyProfile } from "../services/profileService";

const emptyForm = { first_name: "", middle_name: "", last_name: "", phone: "", bio: "", location: "", website: "" };
const imageTypes = ["image/jpeg", "image/png", "image/webp"];

const toForm = (data) => ({
  first_name: data.first_name || "",
  middle_name: data.middle_name || "",
  last_name: data.last_name || "",
  phone: data.phone || "",
  bio: data.bio || "",
  location: data.location || "",
  website: data.website || "",
});

const AUTOCOMPLETE = {
  first_name: "given-name",
  middle_name: "additional-name",
  last_name: "family-name",
  phone: "tel",
  location: "address-level2",
  website: "url",
};

/* underline-only inputs: no boxes */
const lineInput =
  "peer w-full rounded-none border-0 border-b-2 border-neutral-border bg-transparent px-0 py-2.5 text-lg text-neutral-text-primary outline-none ring-0 transition placeholder:text-gray-300 hover:border-gray-400 focus:border-brand-red focus:outline-none focus:ring-0";

function Field({ label, children, className = "" }) {
  return (
    <label className={`group block ${className}`}>
      <span className="text-sm font-medium text-neutral-text-secondary transition-colors group-focus-within:text-brand-red">
        {label}
      </span>
      {children}
    </label>
  );
}

function Group({ title, hint, children }) {
  return (
    <section className="grid gap-6 border-t border-neutral-border py-10 md:grid-cols-[200px_1fr] md:gap-12">
      <div>
        <h2 className="text-xl font-extrabold text-neutral-text-primary">{title}</h2>
        <p className="mt-1.5 max-w-[22ch] text-sm leading-relaxed text-neutral-text-secondary">{hint}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}

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
    getMyProfile()
      .then(({ data }) => {
        if (!active) return;
        setProfile(data);
        setForm(toForm(data));
      })
      .catch((error) => toast.error(error?.response?.data?.message || "Could not load your profile"))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const previewUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : null), [photo]);
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl]
  );

  const displayName = profile
    ? [profile.first_name, profile.middle_name, profile.last_name].filter(Boolean).join(" ")
    : user?.first_name || "My profile";
  const avatar = previewUrl || (!removePhoto && profile?.avatar_url);

  const baseline = useMemo(() => (profile ? toForm(profile) : emptyForm), [profile]);
  const dirty = Boolean(photo) || removePhoto || Object.keys(form).some((k) => form[k] !== baseline[k]);

  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!imageTypes.includes(file.type)) return toast.error("Choose a JPG, PNG, or WebP image");
    if (file.size > 5 * 1024 * 1024) return toast.error("Profile image must be 5 MB or smaller");
    setPhoto(file);
    setRemovePhoto(false);
  };

  const discard = () => {
    setForm(baseline);
    setPhoto(null);
    setRemovePhoto(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      let avatar_key;
      if (photo) {
        const { data } = await getProfileAvatarUploadUrl(photo.type);
        const uploaded = await fetch(data.upload_url, {
          method: "PUT",
          headers: { "Content-Type": photo.type },
          body: photo,
        });
        if (!uploaded.ok) throw new Error("Photo upload failed. Please try again.");
        avatar_key = data.avatar_key;
      } else if (removePhoto) avatar_key = null;
      const { data } = await updateMyProfile({ ...form, ...(avatar_key !== undefined ? { avatar_key } : {}) });
      setProfile(data);
      setForm(toForm(data));
      setPhoto(null);
      setRemovePhoto(false);
      await checkAuth();
      toast.success("Your profile has been updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Could not update your profile");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const field = (name, label, { required = false, type = "text", placeholder = "", max = 100 } = {}) => (
    <Field label={label} key={name}>
      <input
        name={name}
        required={required}
        maxLength={max}
        type={type}
        value={form[name]}
        onChange={updateField}
        autoComplete={AUTOCOMPLETE[name]}
        placeholder={placeholder}
        className={lineInput}
      />
    </Field>
  );

  const roleLabel = String(profile?.role || "USER").toLowerCase();
  const joined = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white pb-28">
      <form onSubmit={submit} className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 pt-8 text-sm font-medium text-neutral-text-secondary transition hover:text-brand-red"
        >
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        {loading ? (
          <div className="grid min-h-[50vh] place-items-center">
            <LoaderCircle className="animate-spin text-brand-red" size={32} />
          </div>
        ) : (
          <>
            {/* ───────── hero ───────── */}
            <header className="grid items-center gap-10 py-10 md:grid-cols-[1fr_auto] md:py-14">
              <div className="order-2 min-w-0 md:order-1">
                <p className="flex items-center gap-2 text-sm font-semibold capitalize text-neutral-text-secondary">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
                  {roleLabel} account
                </p>
                <h1 className="mt-3 break-words text-5xl font-black leading-[1.02] tracking-tight text-neutral-text-primary sm:text-7xl">
                  {displayName}
                </h1>
                <p className="mt-4 break-all text-lg text-neutral-text-secondary">{profile?.email || user?.email}</p>

                <dl className="mt-8 flex flex-wrap items-stretch gap-y-4 text-sm">
                  <div className="pr-6">
                    <dt className="text-neutral-text-secondary">Member since</dt>
                    <dd className="mt-0.5 text-base font-bold text-neutral-text-primary">{joined}</dd>
                  </div>
                  <div className="border-l border-neutral-border px-6">
                    <dt className="text-neutral-text-secondary">Wallet</dt>
                    <dd className="mt-0.5 text-base font-bold text-neutral-text-primary">
                      {Number(profile?.wallet_balance || 0).toLocaleString()} coins
                    </dd>
                  </div>
                  <div className="border-l border-neutral-border pl-6">
                    <dt className="text-neutral-text-secondary">History</dt>
                    <dd className="mt-0.5">
                      <Link
                        to="/transactions"
                        className="inline-flex items-center gap-1 text-base font-bold text-brand-red hover:text-brand-red-hover"
                      >
                        Payments &amp; coins <ArrowUpRight size={16} />
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* avatar inside big red circle */}
              <div className="order-1 flex flex-col items-center md:order-2">
                <div className="relative grid h-64 w-64 place-items-center rounded-full bg-brand-red sm:h-72 sm:w-72">
                  <span className="pointer-events-none absolute -inset-3 rounded-full border-2 border-red-200" aria-hidden="true" />
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Your profile"
                      className="h-44 w-44 rounded-full object-cover ring-[6px] ring-white sm:h-52 sm:w-52"
                    />
                  ) : (
                    <div className="grid h-44 w-44 place-items-center rounded-full bg-white text-brand-red ring-[6px] ring-white sm:h-52 sm:w-52">
                      <UserRound size={64} />
                    </div>
                  )}
                  <label
                    title="Upload profile photo"
                    className="absolute bottom-6 right-6 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-brand-black text-white shadow-lg ring-4 ring-white transition hover:scale-105 hover:bg-gray-800 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-black sm:bottom-8 sm:right-8"
                  >
                    <Camera size={20} />
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} className="sr-only" />
                  </label>
                </div>

                <div className="mt-5 h-5 text-center text-xs text-neutral-text-secondary">
                  {avatar ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        setRemovePhoto(true);
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 size={13} /> Remove photo
                    </button>
                  ) : (
                    "JPG, PNG or WebP · up to 5 MB"
                  )}
                </div>
              </div>
            </header>

            {/* ───────── details ───────── */}
            <Group title="Name" hint="How you appear across Touch Simply.">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {field("first_name", "First name", { required: true })}
                {field("middle_name", "Middle name")}
                {field("last_name", "Last name", { required: true, })}
              </div>
            </Group>

            <Group title="Contact" hint="Where we can reach you and where to find you.">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {field("phone", "Phone number", { type: "tel", placeholder: "Optional", max: 20 })}
                {field("location", "Location", { placeholder: "City, country", max: 120 })}
                {field("website", "Website", { type: "url", placeholder: "https://example.com", max: 255 })}
                <div>
                  <span className="text-sm font-medium text-neutral-text-secondary">Email address</span>
                  <p className="flex items-center gap-2 border-b-2 border-dashed border-neutral-border py-2.5 text-lg text-neutral-text-secondary">
                    <Lock size={16} className="shrink-0" />
                    <span className="truncate">{profile?.email || user?.email}</span>
                  </p>
                  <p className="mt-1.5 text-xs text-gray-400">Managed by your sign-in account</p>
                </div>
              </div>
            </Group>

            <Group title="About you" hint="A short introduction, if you'd like one.">
              <Field label="Bio">
                <textarea
                  name="bio"
                  maxLength={500}
                  rows={4}
                  value={form.bio}
                  onChange={updateField}
                  placeholder="Write a few lines about yourself"
                  className={`${lineInput} resize-none leading-relaxed`}
                />
              </Field>
              <p className="mt-1 text-right text-xs text-gray-400">{form.bio.length}/500</p>
            </Group>

            <div className="border-t border-neutral-border py-8">
              <Link
                to="/settings"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-hover"
              >
                Account password &amp; security <ArrowUpRight size={15} />
              </Link>
            </div>
          </>
        )}

        {/* ───────── floating save bar (only when something changed) ───────── */}
        <div
          className={`fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-300 ${
            dirty || saving ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          }`}
          aria-live="polite"
        >
          <div className="flex items-center gap-3 rounded-full bg-brand-black py-2 pl-5 pr-2 text-white shadow-2xl">
            <span className="text-sm font-medium">{saving ? "Saving your changes…" : "You have unsaved changes"}</span>
            <button
              type="button"
              onClick={discard}
              disabled={saving}
              className="rounded-full px-3 py-2 text-sm font-semibold text-gray-300 transition hover:text-white disabled:opacity-50"
            >
              Discard
            </button>
            <button
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-red-hover disabled:cursor-wait disabled:opacity-70"
            >
              {saving ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? "Saving" : "Save profile"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}