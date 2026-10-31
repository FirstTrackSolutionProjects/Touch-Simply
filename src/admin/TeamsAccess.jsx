import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Activity, Bell, BookOpen, Check, ChevronDown, FileText, LayoutDashboard, LoaderCircle, Package, Pencil, RefreshCw, Search, ShieldCheck, Trash2, User, Users, X } from "lucide-react";
import { createAdminTeam, deleteAdminTeam, getAdminTeamEmployees, getAdminTeams, updateAdminTeam } from "./adminService";

const permissionOptions = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: User },
  { id: "resumes", label: "Resumes", icon: FileText },
  { id: "transactions", label: "Transactions", icon: Activity },
  { id: "templates", label: "Templates", icon: BookOpen },
  { id: "plans", label: "Credit plans", icon: Package },
  { id: "notifications", label: "Announcements", icon: Bell },
];
const initials = (text) => (text || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
const inputCls = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100";
const nameOf = (person) => [person?.first_name, person?.middle_name, person?.last_name].filter(Boolean).join(" ") || "User";

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeePickerOpen, setEmployeePickerOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const pickerRef = useRef(null);
  const openPicker = () => {
    const rect = pickerRef.current?.getBoundingClientRect();
    setOpenUp(rect ? window.innerHeight - rect.bottom < 320 && rect.top > 320 : false);
    setEmployeePickerOpen(true);
  };
  const [form, setForm] = useState({ name: "", description: "", member_ids: [], permissions: [] });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const reset = () => { setEditingId(null); setForm({ name: "", description: "", member_ids: [], permissions: [] }); };
  const editTeam = (team) => {
    setEditingId(team.id);
    setForm({ name: team.name, description: team.description || "", member_ids: team.member_ids || [], permissions: team.permissions || [] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggle = (key, value) => setForm((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  const filteredEmployees = employees.filter((employee) => `${nameOf(employee)} ${employee.email || ""}`.toLowerCase().includes(employeeSearch.trim().toLowerCase()));
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

  return <div className="grid items-start gap-6 xl:grid-cols-2">
    <form onSubmit={save} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:p-7">
      <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200"><ShieldCheck size={22} /></div>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Owner controls</p><h3 className="mt-0.5 text-xl font-bold">{editingId ? "Edit team access" : "Create a team"}</h3><p className="mt-1 text-sm leading-relaxed text-slate-500">Employees see only the panel sections selected below. Access is also enforced on the backend.</p></div>
        {editingId && <span className="ml-auto shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">Editing</span>}
      </div>

      <label className="block text-sm font-semibold">Team name<input required maxLength="100" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={inputCls} placeholder="e.g. Content team" /></label>

      <label className="block text-sm font-semibold"><span className="flex items-center justify-between">Description <span className="text-xs font-normal text-slate-400">optional · {form.description.length}/500</span></span><textarea maxLength="500" rows="3" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className={`${inputCls} resize-none`} placeholder="What this team is responsible for" /></label>

      <fieldset>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Panel sections this team can access <span className="ml-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700">{form.permissions.length}/{permissionOptions.length}</span></p>
          <button type="button" onClick={() => setForm((current) => ({ ...current, permissions: current.permissions.length === permissionOptions.length ? [] : permissionOptions.map((p) => p.id) }))} className="text-xs font-semibold text-violet-700 hover:underline">{form.permissions.length === permissionOptions.length ? "Clear all" : "Select all"}</button>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">{permissionOptions.map(({ id, label, icon: Icon }) => { const checked = form.permissions.includes(id); return <label key={id} className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium transition-all ${checked ? "border-violet-500 bg-violet-50 text-violet-800 shadow-sm" : "border-slate-200 hover:border-violet-300 hover:bg-violet-50/50"}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${checked ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600"}`}><Icon size={17} /></span><span className="flex-1">{label}</span><input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle("permissions", id)} />{checked && <Check size={16} className="text-violet-600" />}</label>; })}</div>
      </fieldset>

      <fieldset><legend className="mb-1 text-sm font-semibold">Assign employees to this team</legend><p className="mb-3 text-xs leading-relaxed text-slate-500">Search for users by name or email, then choose team members from the dropdown. Only active ADMIN accounts can be assigned.</p>{employees.length ? <div ref={pickerRef} className="relative"><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 transition hover:border-slate-300 focus-within:border-violet-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100"><Search size={16} className="shrink-0 text-slate-400" /><input value={employeeSearch} onFocus={openPicker} onChange={(event) => { setEmployeeSearch(event.target.value); if (!employeePickerOpen) openPicker(); }} onKeyDown={(event) => { if (event.key === "Escape") setEmployeePickerOpen(false); }} placeholder={form.member_ids.length ? `${form.member_ids.length} selected — search users...` : "Search and select users..."} aria-label="Search users by name or email" aria-expanded={employeePickerOpen} className="w-full bg-transparent text-sm outline-none" /><button type="button" onClick={() => (employeePickerOpen ? setEmployeePickerOpen(false) : openPicker())} aria-label="Toggle user list" className="rounded p-1 text-slate-400 hover:bg-slate-100"><ChevronDown size={16} /></button></div>{form.member_ids.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{employees.filter((employee) => form.member_ids.includes(employee.id)).map((employee) => <span key={employee.id} className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 py-1 pl-2.5 pr-1.5 text-xs font-medium text-violet-700">{nameOf(employee)}<button type="button" onClick={() => toggle("member_ids", employee.id)} aria-label={`Remove ${nameOf(employee)}`} className="rounded-full hover:text-rose-600"><X size={13} /></button></span>)}</div>}{employeePickerOpen && <><button type="button" aria-label="Close user list" onClick={() => setEmployeePickerOpen(false)} className="fixed inset-0 z-10 cursor-default" /><div className={`absolute left-0 right-0 z-20 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-black/5 ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}><div className="flex justify-between px-2 py-1.5 text-xs text-slate-500"><span>{filteredEmployees.length} of {employees.length} users</span><span>{form.member_ids.length} selected</span></div>{filteredEmployees.length ? filteredEmployees.map((employee) => { const canAssign = employee.role === "ADMIN" && !employee.is_blocked; return <button type="button" key={employee.id} disabled={!canAssign} onMouseDown={(event) => event.preventDefault()} onClick={() => toggle("member_ids", employee.id)} className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm ${canAssign ? "hover:bg-violet-50" : "cursor-not-allowed opacity-60"}`}><input type="checkbox" readOnly checked={form.member_ids.includes(employee.id)} tabIndex={-1} className="accent-violet-600" /><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{initials(nameOf(employee))}</span><span className="min-w-0 flex-1"><span className="block truncate font-medium">{nameOf(employee)}</span><span className="block truncate text-xs text-slate-500">{employee.email}</span></span><span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${canAssign ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-500"}`}>{employee.is_blocked ? "Blocked" : employee.role === "ADMIN" ? "ADMIN" : "USER · grant ADMIN first"}</span></button>; }) : <p className="p-3 text-sm text-slate-500">No users match your search.</p>}</div></>}</div> : <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">No user accounts are available.</p>}</fieldset>

      <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-5">{editingId && <button type="button" onClick={reset} className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">Cancel</button>}<button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">{saving && <LoaderCircle size={16} className="animate-spin" />}{saving ? "Saving..." : editingId ? "Save team access" : "Create team"}</button></div>
    </form>

    <section className="space-y-4"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-xl font-bold">Teams <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700">{teams.length}</span></h3><button onClick={load} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh</button></div>{loading ? <div className="grid min-h-40 place-items-center rounded-2xl border border-slate-200 bg-white"><LoaderCircle className="animate-spin text-violet-600" /></div> : teams.length ? teams.map((team) => <article key={team.id} className={`rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${editingId === team.id ? "border-violet-400 ring-4 ring-violet-100" : "border-slate-200"}`}><div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-start gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">{initials(team.name)}</div><div className="min-w-0"><h4 className="truncate font-bold">{team.name}</h4>{team.description && <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{team.description}</p>}</div></div><div className="flex shrink-0 gap-1"><button onClick={() => editTeam(team)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"><Pencil size={14} />Edit</button><button onClick={() => remove(team)} className="rounded-lg p-2 text-rose-600 transition hover:bg-rose-50" aria-label={`Delete ${team.name}`}><Trash2 size={16} /></button></div></div>

      <div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Members · {team.members?.length || 0}</p><div className="mt-2 space-y-2 text-sm text-slate-700">{team.members?.length ? team.members.map((member) => <div key={member.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{initials(nameOf(member))}</span><span className="min-w-0"><span className="block truncate font-medium">{nameOf(member)}</span><span className="block truncate text-xs text-slate-500">{member.email}</span></span></div>) : <p className="text-sm text-slate-500">No employees assigned</p>}</div></div>

      <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Granted sections</p><div className="mt-2 flex flex-wrap gap-1.5">{(team.permissions || []).length ? team.permissions.map((permission) => <span key={permission} className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">{permissionOptions.find((item) => item.id === permission)?.label || permission}</span>) : <span className="text-sm text-slate-500">No sections granted</span>}</div></article>) : <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Users size={26} /></div><p className="mt-4 font-semibold text-slate-800">No teams yet</p><p className="mt-1 max-w-xs text-sm text-slate-500">Create a team and assign employees and panel sections.</p></div>}</section>
  </div>;
}

export default TeamManagement;