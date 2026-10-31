import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown, LoaderCircle, Search, Trash2, X } from "lucide-react";
import { createAdminTeam, deleteAdminTeam, getAdminTeamEmployees, getAdminTeams, updateAdminTeam } from "./adminService";

const permissionOptions = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "resumes", label: "Resumes" },
  { id: "transactions", label: "Transactions" },
  { id: "templates", label: "Templates" },
  { id: "plans", label: "Credit plans" },
  { id: "notifications", label: "Announcements" },
];
const nameOf = (person) => [person?.first_name, person?.middle_name, person?.last_name].filter(Boolean).join(" ") || "User";
function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeePickerOpen, setEmployeePickerOpen] = useState(false);
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
    if (!window.confirm(`Delete team â€œ${team.name}â€? Its panel access will be revoked.`)) return;
    try { await deleteAdminTeam(team.id); toast.success("Team deleted and access revoked"); await load(); if (editingId === team.id) reset(); }
    catch (error) { toast.error(error?.response?.data?.message || "Could not delete team"); }
  };

  return <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
    <form onSubmit={save} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div><p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Owner controls</p><h3 className="mt-1 text-xl font-bold">{editingId ? "Edit team access" : "Create a team"}</h3><p className="mt-1 text-sm text-slate-500">Employees see only the panel sections selected below. Access is also enforced on the backend.</p></div>
      <label className="block text-sm font-medium">Team name<input required maxLength="100" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" placeholder="e.g. Content team" /></label>
      <label className="block text-sm font-medium">Description <span className="font-normal text-slate-400">(optional)</span><textarea maxLength="500" rows="2" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" placeholder="What this team is responsible for" /></label>
      <fieldset><legend className="mb-2 text-sm font-semibold">Panel sections this team can access</legend><div className="grid gap-2 sm:grid-cols-2">{permissionOptions.map(({ id, label }) => <label key={id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 p-2.5 text-sm hover:bg-violet-50"><input type="checkbox" checked={form.permissions.includes(id)} onChange={() => toggle("permissions", id)} className="accent-violet-600" />{label}</label>)}</div></fieldset>
      <fieldset><legend className="mb-1 text-sm font-semibold">Assign employees to this team</legend><p className="mb-3 text-xs text-slate-500">Search for users by name or email, then choose team members from the dropdown. Only active ADMIN accounts can be assigned.</p>{employees.length ? <div className="relative"><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100"><Search size={16} className="shrink-0 text-slate-400" /><input value={employeeSearch} onFocus={() => setEmployeePickerOpen(true)} onChange={(event) => { setEmployeeSearch(event.target.value); setEmployeePickerOpen(true); }} onKeyDown={(event) => { if (event.key === "Escape") setEmployeePickerOpen(false); }} placeholder={form.member_ids.length ? `${form.member_ids.length} selected â€” search users...` : "Search and select users..."} aria-label="Search users by name or email" aria-expanded={employeePickerOpen} className="w-full bg-transparent text-sm outline-none" /><button type="button" onClick={() => setEmployeePickerOpen((open) => !open)} aria-label="Toggle user list" className="rounded p-1 text-slate-400 hover:bg-slate-100"><ChevronDown size={16} /></button></div>{form.member_ids.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{employees.filter((employee) => form.member_ids.includes(employee.id)).map((employee) => <span key={employee.id} className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">{nameOf(employee)}<button type="button" onClick={() => toggle("member_ids", employee.id)} aria-label={`Remove ${nameOf(employee)}`} className="rounded-full hover:text-rose-600"><X size={13} /></button></span>)}</div>}{employeePickerOpen && <><button type="button" aria-label="Close user list" onClick={() => setEmployeePickerOpen(false)} className="fixed inset-0 z-10 cursor-default" /><div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><div className="flex justify-between px-2 py-1.5 text-xs text-slate-500"><span>{filteredEmployees.length} of {employees.length} users</span><span>{form.member_ids.length} selected</span></div>{filteredEmployees.length ? filteredEmployees.map((employee) => { const canAssign = employee.role === "ADMIN" && !employee.is_blocked; return <button type="button" key={employee.id} disabled={!canAssign} onMouseDown={(event) => event.preventDefault()} onClick={() => toggle("member_ids", employee.id)} className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm ${canAssign ? "hover:bg-violet-50" : "cursor-not-allowed opacity-60"}`}><input type="checkbox" readOnly checked={form.member_ids.includes(employee.id)} tabIndex={-1} className="accent-violet-600" /><span className="min-w-0 flex-1"><span className="block truncate font-medium">{nameOf(employee)}</span><span className="block truncate text-xs text-slate-500">{employee.email}</span></span><span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${canAssign ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-500"}`}>{employee.is_blocked ? "Blocked" : employee.role === "ADMIN" ? "ADMIN" : "USER Â· grant ADMIN first"}</span></button>; }) : <p className="p-3 text-sm text-slate-500">No users match your search.</p>}</div></>}</div> : <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">No user accounts are available.</p>}</fieldset>
      <div className="flex justify-end gap-2">{editingId && <button type="button" onClick={reset} className="rounded-xl px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100">Cancel</button>}<button disabled={saving} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : editingId ? "Save team access" : "Create team"}</button></div>
    </form>
    <section className="space-y-3"><div className="flex items-center justify-between"><h3 className="text-xl font-bold">Teams</h3><button onClick={load} className="text-sm font-semibold text-violet-700">Refresh</button></div>{loading ? <div className="grid min-h-40 place-items-center"><LoaderCircle className="animate-spin text-violet-600" /></div> : teams.length ? teams.map((team) => <article key={team.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h4 className="font-bold">{team.name}</h4>{team.description && <p className="mt-1 text-sm text-slate-500">{team.description}</p>}</div><div className="flex gap-1"><button onClick={() => editTeam(team)} className="rounded-lg px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50">Edit</button><button onClick={() => remove(team)} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" aria-label={`Delete ${team.name}`}><Trash2 size={16} /></button></div></div><p className="mt-4 text-xs font-semibold uppercase text-slate-400">Members Â· {team.members?.length || 0}</p><div className="mt-1 space-y-1 text-sm text-slate-700">{team.members?.length ? team.members.map((member) => <div key={member.id}><span className="font-medium">{nameOf(member)}</span><span className="ml-2 text-xs text-slate-500">{member.email}</span></div>) : "No employees assigned"}</div><p className="mt-4 text-xs font-semibold uppercase text-slate-400">Granted sections</p><div className="mt-2 flex flex-wrap gap-1.5">{(team.permissions || []).length ? team.permissions.map((permission) => <span key={permission} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">{permissionOptions.find((item) => item.id === permission)?.label || permission}</span>) : <span className="text-sm text-slate-500">No sections granted</span>}</div></article>) : <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No teams yet. Create a team and assign employees and panel sections.</div>}</section>
  </div>;
}


export default TeamManagement;



