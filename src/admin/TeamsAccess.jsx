import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Activity, Bell, BookOpen, Check, ChevronDown, FileText, LayoutDashboard, LoaderCircle, Package, Pencil, RefreshCw, Search, ShieldCheck, Trash2, User, UserPlus, Users, X } from "lucide-react";
import { createAdminTeam, deleteAdminTeam, getAdminTeamEmployees, getAdminTeams, updateAdminTeam } from "./adminService";

const permissionOptions = [
  { id: "overview", label: "Overview", desc: "Dashboard stats and summary", icon: LayoutDashboard },
  { id: "users", label: "Users", desc: "View and manage accounts", icon: User },
  { id: "resumes", label: "Resumes", desc: "Browse user resumes", icon: FileText },
  { id: "transactions", label: "Transactions", desc: "Payments and coin activity", icon: Activity },
  { id: "templates", label: "Templates", desc: "Resume template library", icon: BookOpen },
  { id: "plans", label: "Coin plans", desc: "Pricing and coin packs", icon: Package },
  { id: "notifications", label: "Announcements", desc: "Send updates to users", icon: Bell },
];

const emptyForm = { name: "", description: "", member_ids: [], permissions: [], new_employee: { first_name: "", middle_name: "", last_name: "", email: "", password: "", confirm_password: "" } };
const nameOf = (person) => [person?.first_name, person?.middle_name, person?.last_name].filter(Boolean).join(" ") || "User";
const initials = (text) => (text || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
const inputCls = "mt-1.5 w-full rounded-xl border border-neutral-border bg-neutral-bg px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 hover:border-brand-red/40 focus:border-brand-red focus:bg-white focus:ring-4 focus:ring-brand-red/10";

function StepTitle({ n, title, hint, right }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-red text-xs font-bold text-white shadow-md shadow-brand-red/20">{n}</span>
        <div>
          <h4 className="text-sm font-bold text-neutral-text-primary">{title}</h4>
          {hint && <p className="mt-0.5 text-xs leading-relaxed text-neutral-text-secondary">{hint}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

function AvatarStack({ people, max = 4, onDark = false }) {
  if (!people.length) return null;
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const tone = onDark ? "bg-white/25 text-white ring-brand-red" : "bg-brand-red/10 text-brand-red ring-white";
  const extraTone = onDark ? "bg-white text-brand-red ring-brand-red" : "bg-neutral-bg text-neutral-text-secondary ring-white";
  return (
    <div className="flex -space-x-2">
      {shown.map((p) => (
        <span key={p.id} title={nameOf(p)} className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold ring-2 ${tone}`}>{initials(nameOf(p))}</span>
      ))}
      {extra > 0 && <span className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold ring-2 ${extraTone}`}>+{extra}</span>}
    </div>
  );
}

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeePickerOpen, setEmployeePickerOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const pickerRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const openPicker = () => {
    const rect = pickerRef.current?.getBoundingClientRect();
    setOpenUp(rect ? window.innerHeight - rect.bottom < 320 && rect.top > 320 : false);
    setEmployeePickerOpen(true);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [teamResponse, employeeResponse] = await Promise.all([getAdminTeams(), getAdminTeamEmployees()]);
      setTeams(teamResponse.data?.teams || []);
      setEmployees(employeeResponse.data || []);
    } catch (error) { toast.error(error?.response?.data?.message || "Could not load team data"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const reset = () => { setEditingId(null); setForm(emptyForm); };
  const editTeam = (team) => {
    setEditingId(team.id);
    setForm({ ...emptyForm, name: team.name, description: team.description || "", member_ids: team.member_ids || [], permissions: team.permissions || [] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggle = (key, value) => setForm((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  const allSelected = form.permissions.length === permissionOptions.length;
  const filteredEmployees = employees.filter((employee) => `${nameOf(employee)} ${employee.email || ""}`.toLowerCase().includes(employeeSearch.trim().toLowerCase()));
  const selectedMembers = employees.filter((employee) => form.member_ids.includes(employee.id));

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) await updateAdminTeam(editingId, form);
      else await createAdminTeam(form);
      toast.success(editingId ? "Team access updated" : "Team created and access assigned");
      reset();
      await load();
    } catch (error) { toast.error(error?.response?.data?.message || "Could not save team"); }
    finally { setSaving(false); }
  };
  const remove = async (team) => {
    if (!window.confirm(`Delete team "${team.name}"? Its panel access will be revoked.`)) return;
    try { await deleteAdminTeam(team.id); toast.success("Team deleted and access revoked"); await load(); if (editingId === team.id) reset(); }
    catch (error) { toast.error(error?.response?.data?.message || "Could not delete team"); }
  };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      {/* ---------------- LEFT: FORM ---------------- */}
      <form onSubmit={save} className="rounded-3xl border border-neutral-border bg-white shadow-sm">
        <div className="flex items-start gap-4 rounded-t-3xl border-b border-neutral-border bg-gradient-to-br from-brand-red/5 via-white to-white p-6 md:p-7">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-red-hover text-white shadow-lg shadow-brand-red/20"><ShieldCheck size={22} /></div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">Owner controls</p>
            <h3 className="mt-0.5 text-xl font-bold">{editingId ? "Edit team access" : "Create a team"}</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-text-secondary">Employees see only the panel sections selected below. Access is also enforced on the backend.</p>
          </div>
          {editingId && <span className="ml-auto shrink-0 rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white">Editing</span>}
        </div>

        <div className="space-y-8 p-6 md:p-7">
          {/* Step 1 */}
          <section>
            <StepTitle n="1" title="Team details" hint="Give the team a clear name and purpose." />
            <div className="space-y-4">
              <label className="block text-sm font-semibold">Team name
                <input required maxLength="100" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={inputCls} placeholder="e.g. Content team" />
              </label>
              <label className="block text-sm font-semibold">
                <span className="flex items-center justify-between">Description <span className="text-xs font-normal text-neutral-text-secondary">optional &middot; {form.description.length}/500</span></span>
                <textarea maxLength="500" rows="3" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className={`${inputCls} resize-none`} placeholder="What this team is responsible for" />
              </label>
            </div>
            {!editingId && (
              <div className="mt-5 rounded-2xl border border-brand-red/15 bg-brand-red/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-red shadow-sm"><UserPlus size={17} /></div>
                  <div>
                    <h5 className="text-sm font-bold text-neutral-text-primary">Create an employee login (optional)</h5>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-text-secondary">Create an individual admin account and add it to this team. Share its login details directly with that employee. Never reuse one password across a team.</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-semibold">First name
                    <input value={form.new_employee.first_name} onChange={(e) => setForm((v) => ({ ...v, new_employee: { ...v.new_employee, first_name: e.target.value } }))} className={inputCls} maxLength="100" autoComplete="off" placeholder="First name" />
                  </label>
                  <label className="block text-sm font-semibold">Last name
                    <input value={form.new_employee.last_name} onChange={(e) => setForm((v) => ({ ...v, new_employee: { ...v.new_employee, last_name: e.target.value } }))} className={inputCls} maxLength="100" autoComplete="off" placeholder="Last name" />
                  </label>
                  <label className="block text-sm font-semibold sm:col-span-2">Work email
                    <input type="email" value={form.new_employee.email} onChange={(e) => setForm((v) => ({ ...v, new_employee: { ...v.new_employee, email: e.target.value } }))} className={inputCls} autoComplete="off" placeholder="name@company.com" />
                  </label>
                  <label className="block text-sm font-semibold">Initial password
                    <input type="password" value={form.new_employee.password} onChange={(e) => setForm((v) => ({ ...v, new_employee: { ...v.new_employee, password: e.target.value } }))} className={inputCls} autoComplete="new-password" placeholder="At least 8 characters" />
                  </label>
                  <label className="block text-sm font-semibold">Confirm password
                    <input type="password" value={form.new_employee.confirm_password} onChange={(e) => setForm((v) => ({ ...v, new_employee: { ...v.new_employee, confirm_password: e.target.value } }))} className={inputCls} autoComplete="new-password" placeholder="Re-enter password" />
                  </label>
                </div>
                <p className="mt-2 text-xs text-neutral-text-secondary">Use uppercase, lowercase, a number, and a special character. The password is stored as a secure hash; the employee can change it in Account security after signing in.</p>
              </div>
            )}
          </section>

          {/* Step 2 */}
          <section>
            <StepTitle
              n="2"
              title="Panel access"
              hint="Choose which sections this team can open."
              right={
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-brand-red/5 px-2.5 py-1 text-xs font-bold text-brand-red">{form.permissions.length}/{permissionOptions.length}</span>
                  <button type="button" onClick={() => setForm((current) => ({ ...current, permissions: allSelected ? [] : permissionOptions.map((p) => p.id) }))} className="text-xs font-semibold text-brand-red hover:underline">{allSelected ? "Clear all" : "Select all"}</button>
                </div>
              }
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {permissionOptions.map(({ id, label, desc, icon: Icon }, index) => {
                const checked = form.permissions.includes(id);
                const lastOdd = index === permissionOptions.length - 1 && permissionOptions.length % 2 === 1;
                return (
                  <label key={id} className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all ${lastOdd ? "sm:col-span-2" : ""} ${checked ? "border-brand-red bg-brand-red/5 shadow-sm ring-4 ring-brand-red/10" : "border-neutral-border bg-white hover:-translate-y-0.5 hover:border-brand-red/50 hover:shadow-sm"}`}>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${checked ? "bg-brand-red text-white shadow-md shadow-brand-red/20" : "bg-neutral-bg text-neutral-text-secondary group-hover:bg-brand-red/10 group-hover:text-brand-red"}`}><Icon size={18} /></span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${checked ? "text-brand-red-hover" : "text-neutral-text-primary"}`}>{label}</span>
                      <span className="block truncate text-xs text-neutral-text-secondary">{desc}</span>
                    </span>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all ${checked ? "border-brand-red bg-brand-red text-white" : "border-neutral-border bg-white text-transparent"}`}><Check size={12} strokeWidth={3} /></span>
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle("permissions", id)} />
                  </label>
                );
              })}
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <StepTitle n="3" title="Assign employees" hint="Search by name or email. Only active ADMIN accounts can be assigned." right={<span className="shrink-0 rounded-full bg-brand-red/5 px-2.5 py-1 text-xs font-bold text-brand-red">{form.member_ids.length} selected</span>} />
            {employees.length ? (
              <div ref={pickerRef} className="relative">
                <div className="flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-bg px-3.5 py-3 transition hover:border-brand-red/40 focus-within:border-brand-red focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-red/10">
                  <Search size={16} className="shrink-0 text-gray-400" />
                  <input
                    value={employeeSearch}
                    onFocus={openPicker}
                    onChange={(event) => { setEmployeeSearch(event.target.value); if (!employeePickerOpen) openPicker(); }}
                    onKeyDown={(event) => { if (event.key === "Escape") setEmployeePickerOpen(false); }}
                    placeholder={form.member_ids.length ? `${form.member_ids.length} selected \u2014 search users...` : "Search and select users..."}
                    aria-label="Search users by name or email"
                    aria-expanded={employeePickerOpen}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                  <button type="button" onClick={() => (employeePickerOpen ? setEmployeePickerOpen(false) : openPicker())} aria-label="Toggle user list" className="rounded-lg p-1 text-gray-400 transition hover:bg-neutral-bg">
                    <ChevronDown size={16} className={`transition-transform ${employeePickerOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {selectedMembers.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedMembers.map((employee) => (
                      <span key={employee.id} className="inline-flex items-center gap-2 rounded-full border border-brand-red/15 bg-brand-red/5 py-1 pl-1 pr-2 text-xs font-medium text-brand-red">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-red text-[10px] font-bold text-white">{initials(nameOf(employee))}</span>
                        {nameOf(employee)}
                        <button type="button" onClick={() => toggle("member_ids", employee.id)} aria-label={`Remove ${nameOf(employee)}`} className="rounded-full p-0.5 transition hover:bg-brand-red/10 hover:text-brand-red"><X size={13} /></button>
                      </span>
                    ))}
                  </div>
                )}

                {employeePickerOpen && (
                  <>
                    <button type="button" aria-label="Close user list" onClick={() => setEmployeePickerOpen(false)} className="fixed inset-0 z-10 cursor-default" />
                    <div className={`absolute left-0 right-0 z-20 max-h-64 overflow-y-auto rounded-2xl border border-neutral-border bg-white p-2 shadow-2xl ring-1 ring-black/5 ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}>
                      <div className="flex justify-between px-2 py-1.5 text-xs font-medium text-neutral-text-secondary"><span>{filteredEmployees.length} of {employees.length} users</span><span>{form.member_ids.length} selected</span></div>
                      {filteredEmployees.length ? filteredEmployees.map((employee) => {
                        const canAssign = employee.role === "ADMIN" && !employee.is_blocked;
                        const picked = form.member_ids.includes(employee.id);
                        return (
                          <button type="button" key={employee.id} disabled={!canAssign} onMouseDown={(event) => event.preventDefault()} onClick={() => toggle("member_ids", employee.id)} className={`flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm transition ${canAssign ? (picked ? "bg-brand-red/5" : "hover:bg-brand-red/5") : "cursor-not-allowed opacity-60"}`}>
                            <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${picked ? "border-brand-red bg-brand-red text-white" : "border-neutral-border bg-white text-transparent"}`}><Check size={12} strokeWidth={3} /></span>
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">{initials(nameOf(employee))}</span>
                            <span className="min-w-0 flex-1"><span className="block truncate font-medium">{nameOf(employee)}</span><span className="block truncate text-xs text-neutral-text-secondary">{employee.email}</span></span>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${canAssign ? "bg-brand-red/5 text-brand-red" : "bg-neutral-bg text-neutral-text-secondary"}`}>{employee.is_blocked ? "Blocked" : employee.role === "ADMIN" ? "ADMIN" : "USER \u00b7 grant ADMIN first"}</span>
                          </button>
                        );
                      }) : <p className="p-3 text-sm text-neutral-text-secondary">No users match your search.</p>}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="rounded-xl bg-neutral-bg p-3 text-sm text-neutral-text-secondary">No user accounts are available.</p>
            )}
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-3xl border-t border-neutral-border bg-neutral-bg/70 px-6 py-4 md:px-7">
          <p className="text-sm text-neutral-text-secondary"><span className="font-semibold text-neutral-text-primary">{form.permissions.length}</span> sections &middot; <span className="font-semibold text-neutral-text-primary">{form.member_ids.length}</span> members</p>
          <div className="flex items-center gap-2">
            {editingId && <button type="button" onClick={reset} className="rounded-xl px-5 py-2.5 text-sm font-medium text-neutral-text-secondary transition hover:bg-neutral-bg">Cancel</button>}
            <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-red/20 transition hover:-translate-y-0.5 hover:bg-brand-red-hover active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
              {saving ? <LoaderCircle size={16} className="animate-spin" /> : editingId ? <Pencil size={15} /> : <UserPlus size={16} />}
              {saving ? "Saving..." : editingId ? "Save team access" : "Create team"}
            </button>
          </div>
        </div>
      </form>

      {/* ---------------- RIGHT: PREVIEW + TEAMS ---------------- */}
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-red via-brand-red to-brand-red-hover p-6 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">{editingId ? "Editing preview" : "Live preview"}</p>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">How the team will look</span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 text-lg font-bold">{initials(form.name)}</div>
              <div className="min-w-0">
                <h3 className="truncate text-xl font-bold">{form.name.trim() || "Untitled team"}</h3>
                <p className="break-words text-sm text-white/80">{form.description.trim() || "Add a description so everyone knows what this team handles."}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/15 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">Sections</p>
                <p className="mt-1 text-2xl font-bold">{form.permissions.length}<span className="text-sm font-medium text-white/80">/{permissionOptions.length}</span></p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">Members</p>
                <div className="mt-1 flex items-center gap-2"><span className="text-2xl font-bold">{form.member_ids.length + (form.new_employee.email.trim() ? 1 : 0)}</span><AvatarStack people={selectedMembers} max={3} onDark /></div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {form.permissions.length ? form.permissions.map((permission) => {
                const option = permissionOptions.find((item) => item.id === permission);
                const Icon = option?.icon || Check;
                return <span key={permission} className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium"><Icon size={12} />{option?.label || permission}</span>;
              }) : <span className="text-sm text-white/80">No sections selected yet</span>}
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold">Teams <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand-red/10 px-2 text-xs font-bold leading-none text-brand-red">{teams.length}</span></h3>
            <button type="button" onClick={load} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-brand-red transition hover:bg-brand-red/5"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh</button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-neutral-border bg-white p-5">
                  <div className="flex items-center gap-3"><div className="h-11 w-11 rounded-xl bg-neutral-bg" /><div className="flex-1 space-y-2"><div className="h-3 w-1/3 rounded bg-neutral-bg" /><div className="h-3 w-1/2 rounded bg-neutral-bg" /></div></div>
                  <div className="mt-4 h-16 rounded-xl bg-neutral-bg" />
                </div>
              ))}
            </div>
          ) : teams.length ? teams.map((team) => {
            const members = team.members || [];
            const granted = team.permissions || [];
            const pct = Math.round((granted.length / permissionOptions.length) * 100);
            return (
              <article key={team.id} className={`rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${editingId === team.id ? "border-brand-red ring-4 ring-brand-red/10" : "border-neutral-border"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-red to-brand-red-hover text-sm font-bold text-white shadow-md shadow-brand-red/20">{initials(team.name)}</div>
                    <div className="min-w-0">
                      <h4 className="truncate font-bold">{team.name}</h4>
                      {team.description && <p className="mt-0.5 break-words text-sm text-neutral-text-secondary">{team.description}</p>}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button type="button" onClick={() => editTeam(team)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-red transition hover:bg-brand-red/5"><Pencil size={14} />Edit</button>
                    <button type="button" onClick={() => remove(team)} className="rounded-lg p-2 text-brand-red transition hover:bg-brand-red/5" aria-label={`Delete ${team.name}`}><Trash2 size={16} /></button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-neutral-bg p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-text-secondary">Members</p>
                    <div className="mt-1.5 flex items-center gap-2"><span className="text-lg font-bold">{members.length}</span><AvatarStack people={members} max={3} /></div>
                  </div>
                  <div className="rounded-xl bg-neutral-bg p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-text-secondary">Access</p>
                    <p className="mt-1.5 text-lg font-bold">{granted.length}<span className="text-sm font-medium text-neutral-text-secondary">/{permissionOptions.length}</span></p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-border"><div className="h-full rounded-full bg-brand-red transition-all" style={{ width: `${pct}%` }} /></div>
                  </div>
                </div>

                <div className="mt-4">
                  {members.length ? (
                    <div className="divide-y divide-neutral-border rounded-xl border border-neutral-border">
                      {members.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-2.5">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">{initials(nameOf(member))}</span>
                          <span className="min-w-0"><span className="block truncate text-sm font-medium text-neutral-text-primary">{nameOf(member)}</span><span className="block truncate text-xs text-neutral-text-secondary">{member.email}</span></span>
                        </div>
                      ))}
                    </div>
                  ) : <p className="rounded-xl bg-neutral-bg p-3 text-sm text-neutral-text-secondary">No employees assigned</p>}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {granted.length ? granted.map((permission) => {
                    const option = permissionOptions.find((item) => item.id === permission);
                    const Icon = option?.icon || Check;
                    return <span key={permission} className="inline-flex items-center gap-1.5 rounded-full border border-brand-red/15 bg-brand-red/5 px-2.5 py-1 text-xs font-medium text-brand-red"><Icon size={12} />{option?.label || permission}</span>;
                  }) : <span className="text-sm text-neutral-text-secondary">No sections granted</span>}
                </div>
              </article>
            );
          }) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-neutral-border bg-white/70 px-6 py-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-red/5 text-brand-red shadow-inner"><Users size={28} /></div>
              <p className="mt-4 font-semibold text-neutral-text-primary">No teams yet</p>
              <p className="mt-1 max-w-xs text-sm text-neutral-text-secondary">Create a team and assign employees and panel sections.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TeamManagement;
