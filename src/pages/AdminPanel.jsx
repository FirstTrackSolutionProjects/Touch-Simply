import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Activity, ArrowDownLeft, ArrowUpRight, Bell, BookOpen, ChevronLeft, ChevronRight,
  CreditCard, FileText, LayoutDashboard, LoaderCircle, LogOut,
  Menu, Package, Pencil, Plus, Search, Send, ShieldCheck, ShieldOff, Trash2, Users, Wallet, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  adjustAdminCredits, broadcastAdminNotification, createAdminPlan, createAdminTemplate, deleteAdminPlan, deleteAdminResume, deleteAdminTemplate,
  getAdminOverview, getAdminPlans, getAdminResumes, getAdminTemplates,
  getAdminTransactions, getAdminUsers, getAdminNotifications, setAdminUserRole, setAdminUserStatus, updateAdminPlan, updateAdminResume, updateAdminTemplate, updateAdminUser,
} from "../services/adminService";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "resumes", label: "Resumes", icon: FileText },
  { id: "transactions", label: "Transactions", icon: Activity },
  { id: "templates", label: "Templates", icon: BookOpen },
  { id: "plans", label: "Credit plans", icon: Package },
  { id: "notifications", label: "Announcements", icon: Bell },
];

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
const date = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
const nameOf = (person) => [person?.first_name, person?.middle_name, person?.last_name].filter(Boolean).join(" ") || "User";

function AdminPanel() {
  const { user, logout } = useAuth();
  const isOwner = String(user?.role || "").toUpperCase() === "OWNER";
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [overview, setOverview] = useState(null);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState("");
  const [creditTarget, setCreditTarget] = useState(null);
  const [creditForm, setCreditForm] = useState({ operation: "CREDIT", amount: "" });
  const [planTarget, setPlanTarget] = useState(null);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planForm, setPlanForm] = useState({ title: "", coins: "", cost: "" });
  const [userTarget, setUserTarget] = useState(null);
  const [userForm, setUserForm] = useState({ first_name: "", middle_name: "", last_name: "" });
  const [resumeTarget, setResumeTarget] = useState(null);
  const [resumeForm, setResumeForm] = useState({ title: "", description: "" });
  const [templateTarget, setTemplateTarget] = useState(null);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [templateForm, setTemplateForm] = useState({ title: "", short_description: "", long_description: "", type: "", engine: "LATEX", simple_mode: false, author_name: "", s3_key: "" });
  const [noticeForm, setNoticeForm] = useState({ title: "", message: "" });
  const pageSize = 10;

  const loadOverview = useCallback(async () => {
    const response = await getAdminOverview();
    setOverview(response.data);
  }, []);

  const loadSection = useCallback(async (selectedSection, currentPage, query) => {
    setLoading(true);
    try {
      if (selectedSection === "overview") {
        await loadOverview();
        setRows([]);
        setTotal(0);
      } else if (selectedSection === "users" || selectedSection === "resumes" || selectedSection === "transactions") {
        const getter = selectedSection === "users" ? getAdminUsers : selectedSection === "resumes" ? getAdminResumes : getAdminTransactions;
        const response = await getter({ page: currentPage, limit: pageSize, search: query });
        const key = selectedSection;
        setRows(response.data?.[key] || []);
        setTotal(response.data?.total || 0);
      } else if (selectedSection === "templates") {
        const response = await getAdminTemplates();
        setRows(response.data || []);
        setTotal(response.data?.length || 0);
      } else if (selectedSection === "plans") {
        const response = await getAdminPlans();
        setRows(response.data || []);
        setTotal(response.data?.length || 0);
      } else if (selectedSection === "notifications") {
        const response = await getAdminNotifications();
        setRows(response.data || []);
        setTotal(response.data?.length || 0);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Admin data load nahi ho paya");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [loadOverview]);

  useEffect(() => {
    const timer = window.setTimeout(() => loadSection(section, page, search), search ? 250 : 0);
    return () => window.clearTimeout(timer);
  }, [section, page, search, loadSection]);

  const title = navItems.find((item) => item.id === section)?.label || "Overview";
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const filteredLocalRows = useMemo(() => {
    if (section !== "templates" && section !== "plans") return rows;
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(term));
  }, [rows, search, section]);

  const selectSection = (id) => {
    setSection(id);
    setPage(1);
    setSearch("");
    setSidebarOpen(false);
  };

  const refresh = () => loadSection(section, page, search);

  const exportCurrentPage = () => {
    const data = ["templates", "plans"].includes(section) ? filteredLocalRows : rows;
    if (!data.length) return toast.info("Export karne ke liye data nahi hai");
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map((row) => keys.map((key) => `"${String(row[key] ?? "").replaceAll('"', '""')}"`).join(","))].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `touch-simply-${section}-page-${page}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleBlock = async (person) => {
    const action = person.is_blocked ? "unblock" : "block";
    if (!window.confirm(`${nameOf(person)} ko ${action} karna hai?`)) return;
    setBusyKey(`user-${person.id}`);
    try {
      await setAdminUserStatus(person.id, !person.is_blocked);
      toast.success(person.is_blocked ? "User unblocked" : "User blocked");
      await refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "User status update nahi hua");
    } finally { setBusyKey(""); }
  };

  const editUser = (person) => {
    setUserTarget(person);
    setUserForm({ first_name: person.first_name || "", middle_name: person.middle_name || "", last_name: person.last_name || "" });
  };

  const saveUser = async (event) => {
    event.preventDefault();
    if (!userTarget) return;
    setBusyKey("user-edit");
    try {
      await updateAdminUser(userTarget.id, userForm);
      toast.success("User profile updated");
      setUserTarget(null);
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Profile update nahi hua"); }
    finally { setBusyKey(""); }
  };

  const changeRole = async (person, role) => {
    if (role === person.role || !window.confirm(`${nameOf(person)} ka role ${role} karna hai?`)) return;
    setBusyKey(`user-${person.id}`);
    try {
      await setAdminUserRole(person.id, role);
      toast.success("User role updated");
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Role change nahi hua"); }
    finally { setBusyKey(""); }
  };

  const submitCreditAdjustment = async (event) => {
    event.preventDefault();
    if (!creditTarget) return;
    setBusyKey("credit");
    try {
      const amount = Number(creditForm.amount);
      await adjustAdminCredits(creditTarget.id, creditForm.operation, amount);
      toast.success("Wallet update ho gaya");
      setCreditTarget(null);
      setCreditForm({ operation: "CREDIT", amount: "" });
      await refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Wallet update nahi hua");
    } finally { setBusyKey(""); }
  };

  const removeResume = async (resume) => {
    if (!window.confirm(`“${resume.title}” resume permanently delete karna hai?`)) return;
    setBusyKey(`resume-${resume.id}`);
    try {
      await deleteAdminResume(resume.id);
      toast.success("Resume delete ho gaya");
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Resume delete nahi hua"); }
    finally { setBusyKey(""); }
  };

  const editResume = (resume) => {
    setResumeTarget(resume);
    setResumeForm({ title: resume.title || "", description: resume.description || "" });
  };

  const saveResume = async (event) => {
    event.preventDefault();
    if (!resumeTarget) return;
    setBusyKey(`resume-${resumeTarget.id}`);
    try {
      await updateAdminResume(resumeTarget.id, resumeForm);
      toast.success("Resume details updated");
      setResumeTarget(null);
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Resume update nahi hua"); }
    finally { setBusyKey(""); }
  };

  const editTemplate = (template = null) => {
    setTemplateTarget(template);
    setTemplateModalOpen(true);
    setTemplateForm(template ? {
      title: template.title || "", short_description: template.short_description || "", long_description: template.long_description || "", type: template.type || "", engine: template.engine || "LATEX", simple_mode: Boolean(template.simple_mode), author_name: template.author_name || "", s3_key: template.s3_key || "",
    } : { title: "", short_description: "", long_description: "", type: "", engine: "LATEX", simple_mode: false, author_name: "", s3_key: "" });
  };

  const saveTemplate = async (event) => {
    event.preventDefault();
    setBusyKey("template");
    try {
      if (templateTarget) await updateAdminTemplate(templateTarget.id, templateForm);
      else await createAdminTemplate(templateForm);
      toast.success(templateTarget ? "Template updated" : "Template created");
      setTemplateTarget(null);
      setTemplateModalOpen(false);
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Template save nahi hua"); }
    finally { setBusyKey(""); }
  };

  const removeTemplate = async (template) => {
    if (!window.confirm(`“${template.title}” template delete karna hai?`)) return;
    try { await deleteAdminTemplate(template.id); toast.success("Template deleted"); await refresh(); }
    catch (error) { toast.error(error?.response?.data?.message || "Template delete nahi hua; ho sakta hai koi resume ise use kar raha ho"); }
  };

  const sendAnnouncement = async (event) => {
    event.preventDefault();
    setBusyKey("announcement");
    try {
      const response = await broadcastAdminNotification(noticeForm);
      toast.success(`Announcement ${response.data?.recipientCount ?? 0} users ko bheja`);
      setNoticeForm({ title: "", message: "" });
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Announcement nahi bheja ja saka"); }
    finally { setBusyKey(""); }
  };

  const openPlan = (plan = null) => {
    setPlanTarget(plan);
    setPlanModalOpen(true);
    setPlanForm(plan ? { title: plan.title, coins: String(plan.coins), cost: String(plan.cost) } : { title: "", coins: "", cost: "" });
  };

  const submitPlan = async (event) => {
    event.preventDefault();
    setBusyKey("plan");
    const payload = { title: planForm.title.trim(), coins: Number(planForm.coins), cost: Number(planForm.cost) };
    try {
      if (planTarget) await updateAdminPlan(planTarget.id, payload);
      else await createAdminPlan(payload);
      toast.success(planTarget ? "Plan update ho gaya" : "Plan create ho gaya");
      setPlanTarget(null);
      setPlanModalOpen(false);
      await refresh();
    } catch (error) { toast.error(error?.response?.data?.message || "Plan save nahi hua"); }
    finally { setBusyKey(""); }
  };

  const removePlan = async (plan) => {
    if (!window.confirm(`“${plan.title}” plan delete karna hai?`)) return;
    try { await deleteAdminPlan(plan.id); toast.success("Plan delete ho gaya"); await refresh(); }
    catch (error) { toast.error(error?.response?.data?.message || "Plan delete nahi hua"); }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900">
      {sidebarOpen && <button aria-label="Close menu" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#10152b] text-white transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <Link to="/" className="flex items-center gap-3"><img src="/images/logo.png" alt="" className="h-9 w-9 object-contain" /><span className="font-bold tracking-wide">Touch Simply</span></Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <div className="px-5 pt-7 pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Workspace</div>
        <nav className="space-y-1 px-3">
          {navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => selectSection(id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${section === id ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={18} /><span>{label}</span></button>)}
        </nav>
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/[.04] p-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-200">{(user?.first_name || "A").slice(0, 1).toUpperCase()}</div><div className="min-w-0"><div className="truncate text-sm font-semibold">{nameOf(user)}</div><div className="truncate text-xs text-slate-500">{isOwner ? "Owner" : "Administrator"}</div></div></div>
          <Link to="/dashboard" className="mb-2 block rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">Go to user dashboard</Link>
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><LogOut size={16} /> Sign out</button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3"><button aria-label="Open navigation" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"><Menu size={20} /></button><div><p className="text-xs text-slate-400">Touch Simply / Admin</p><h1 className="text-lg font-bold">{title}</h1></div></div>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-slate-500 sm:inline">{user?.email}</span><span className="grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">{(user?.first_name || "A").slice(0, 1).toUpperCase()}</span></div>
        </header>

        <div className="mx-auto max-w-[1500px] p-4 md:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><p className="text-sm font-medium text-violet-600">{isOwner ? "Owner workspace" : "Admin workspace"}</p><h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{section === "overview" ? "Good to see you, " + (user?.first_name || (isOwner ? "Owner" : "Admin")) : title}</h2><p className="mt-1 text-sm text-slate-500">Manage Touch Simply users, content, and credits.</p></div>
            {section !== "overview" && <div className="flex w-full gap-2 md:w-auto"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm md:w-[320px]"><Search size={17} className="text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={`Search ${title.toLowerCase()}...`} className="w-full bg-transparent text-sm outline-none" /></label>{section !== "notifications" && <button onClick={exportCurrentPage} className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-violet-300 hover:text-violet-700">Export page</button>}</div>}
          </div>

          {section === "overview" && <Overview data={overview} loading={loading} onOpen={selectSection} />}
          {section !== "overview" && loading && <div className="grid min-h-[300px] place-items-center"><LoaderCircle className="animate-spin text-violet-600" size={32} /></div>}
          {!loading && section === "users" && <UsersTable rows={rows} busyKey={busyKey} isOwner={isOwner} selfId={user?.id} selfEmail={user?.email} onBlock={handleBlock} onCredits={(person) => setCreditTarget(person)} onEdit={editUser} onRole={changeRole} />}
          {!loading && section === "resumes" && <ResumesTable rows={rows} busyKey={busyKey} onDelete={removeResume} onEdit={editResume} />}
          {!loading && section === "transactions" && <TransactionsTable rows={rows} />}
          {!loading && section === "templates" && <TemplatesTable rows={filteredLocalRows} onAdd={() => editTemplate()} onEdit={editTemplate} onDelete={removeTemplate} />}
          {!loading && section === "plans" && <PlansTable rows={filteredLocalRows} onAdd={() => openPlan()} onEdit={openPlan} onDelete={removePlan} />}
          {!loading && section === "notifications" && <NotificationsSection rows={rows} noticeForm={noticeForm} setNoticeForm={setNoticeForm} onSubmit={sendAnnouncement} busy={busyKey === "announcement"} />}

          {!loading && ["users", "resumes", "transactions"].includes(section) && <div className="mt-5 flex items-center justify-between text-sm text-slate-500"><span>{total ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}` : "No records"}</span><div className="flex gap-2"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"><ChevronLeft size={17} /></button><span className="min-w-8 self-center text-center">{page} / {pageCount}</span><button disabled={page >= pageCount} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"><ChevronRight size={17} /></button></div></div>}
        </div>
      </main>

      {creditTarget && <Modal title={`Adjust credits · ${nameOf(creditTarget)}`} onClose={() => setCreditTarget(null)}><form onSubmit={submitCreditAdjustment} className="space-y-4"><p className="text-sm text-slate-500">Current balance: <b className="text-slate-800">{Number(creditTarget.wallet_balance || 0).toLocaleString()} credits</b></p><label className="block text-sm font-medium">Action<select value={creditForm.operation} onChange={(event) => setCreditForm((form) => ({ ...form, operation: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5"><option value="CREDIT">Add credits</option><option value="DEBIT">Deduct credits</option></select></label><label className="block text-sm font-medium">Credits<input required min="1" max="1000000" type="number" step="1" value={creditForm.amount} onChange={(event) => setCreditForm((form) => ({ ...form, amount: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" placeholder="e.g. 10" /></label><div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setCreditTarget(null)} className="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Cancel</button><button disabled={busyKey === "credit"} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{busyKey === "credit" ? "Saving…" : "Confirm adjustment"}</button></div></form></Modal>}
      {planModalOpen && <Modal title={planTarget ? "Edit credit plan" : "Create credit plan"} onClose={() => { setPlanModalOpen(false); setPlanTarget(null); }}><form onSubmit={submitPlan} className="space-y-4"><label className="block text-sm font-medium">Plan name<input required maxLength="100" value={planForm.title} onChange={(event) => setPlanForm((form) => ({ ...form, title: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" placeholder="Starter" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Credits<input required type="number" min="1" step="1" value={planForm.coins} onChange={(event) => setPlanForm((form) => ({ ...form, coins: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label><label className="block text-sm font-medium">Price (INR)<input required type="number" min="0" step="1" value={planForm.cost} onChange={(event) => setPlanForm((form) => ({ ...form, cost: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label></div><div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => { setPlanModalOpen(false); setPlanTarget(null); }} className="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Cancel</button><button disabled={busyKey === "plan"} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{busyKey === "plan" ? "Saving…" : "Save plan"}</button></div></form></Modal>}
      {userTarget && <Modal title={`Edit user · ${userTarget.email}`} onClose={() => setUserTarget(null)}><form onSubmit={saveUser} className="space-y-4">{[["first_name", "First name"], ["middle_name", "Middle name"], ["last_name", "Last name"]].map(([key, label]) => <label key={key} className="block text-sm font-medium">{label}<input required={key !== "middle_name"} maxLength="100" value={userForm[key]} onChange={(event) => setUserForm((form) => ({ ...form, [key]: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>)}<div className="flex justify-end gap-2"><button type="button" onClick={() => setUserTarget(null)} className="rounded-xl px-4 py-2 text-sm">Cancel</button><button disabled={busyKey === "user-edit"} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Save user</button></div></form></Modal>}
      {resumeTarget && <Modal title="Edit resume details" onClose={() => setResumeTarget(null)}><form onSubmit={saveResume} className="space-y-4"><label className="block text-sm font-medium">Title<input required maxLength="100" value={resumeForm.title} onChange={(event) => setResumeForm((form) => ({ ...form, title: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label><label className="block text-sm font-medium">Description<textarea maxLength="255" rows="3" value={resumeForm.description} onChange={(event) => setResumeForm((form) => ({ ...form, description: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label><div className="flex justify-end gap-2"><button type="button" onClick={() => setResumeTarget(null)} className="rounded-xl px-4 py-2 text-sm">Cancel</button><button disabled={busyKey === `resume-${resumeTarget.id}`} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Save resume</button></div></form></Modal>}
      {templateModalOpen && <Modal title={templateTarget ? "Edit template" : "Add template"} onClose={() => { setTemplateModalOpen(false); setTemplateTarget(null); }}><form onSubmit={saveTemplate} className="max-h-[75vh] space-y-3 overflow-y-auto pr-1">{[["title", "Template name", 100], ["type", "Type", 100], ["author_name", "Author", 100], ["short_description", "Short description", 100]].map(([key, label, max]) => <label key={key} className="block text-sm font-medium">{label}<input required maxLength={max} value={templateForm[key]} onChange={(event) => setTemplateForm((form) => ({ ...form, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>)}<label className="block text-sm font-medium">Full description<textarea maxLength="20000" rows="3" value={templateForm.long_description} onChange={(event) => setTemplateForm((form) => ({ ...form, long_description: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>{!templateTarget && <label className="block text-sm font-medium">S3 folder key<input required value={templateForm.s3_key} onChange={(event) => setTemplateForm((form) => ({ ...form, s3_key: event.target.value }))} placeholder="Existing template asset folder in S3" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>}<div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Engine<select value={templateForm.engine} onChange={(event) => setTemplateForm((form) => ({ ...form, engine: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5"><option value="LATEX">LaTeX</option><option value="XELATEX">XeLaTeX</option></select></label><label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" checked={templateForm.simple_mode} onChange={(event) => setTemplateForm((form) => ({ ...form, simple_mode: event.target.checked }))} /> Simple mode</label></div><div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => { setTemplateModalOpen(false); setTemplateTarget(null); }} className="rounded-xl px-4 py-2 text-sm">Cancel</button><button disabled={busyKey === "template"} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Save template</button></div></form></Modal>}
    </div>
  );
}

function Overview({ data, loading, onOpen }) {
  const stats = data?.stats || {};
  const toneClasses = {
    violet: "bg-violet-50 text-violet-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };
  const cards = [
    { label: "Total users", value: stats.users, note: `${stats.blockedUsers || 0} blocked`, icon: Users, tone: "violet" },
    { label: "Resumes created", value: stats.resumes, note: "Across all accounts", icon: FileText, tone: "blue" },
    { label: "Transactions", value: stats.transactions, note: "Credit ledger entries", icon: CreditCard, tone: "amber" },
    { label: "Credits in wallets", value: Number(stats.creditsInWallets || 0).toLocaleString(), note: `${stats.templates || 0} templates`, icon: Wallet, tone: "emerald" },
  ];
  return <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ label, value, note, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className={`grid h-11 w-11 place-items-center rounded-xl ${toneClasses[tone]}`}><Icon size={20} /></div><span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">Live data</span></div><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold">{loading ? "—" : Number(value || 0).toLocaleString()}</p><p className="mt-1 text-xs text-slate-400">{note}</p></div>)}</div>
    <div className="mt-6 grid gap-5 xl:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><SectionHeading icon={Users} title="Recent users" action="Manage users" onAction={() => onOpen("users")} /><div className="divide-y divide-slate-100">{(data?.recentUsers || []).map((person) => <div key={person.id} className="flex items-center justify-between px-5 py-4"><div className="flex min-w-0 items-center gap-3"><Avatar label={nameOf(person)} /><div className="min-w-0"><p className="truncate text-sm font-semibold">{nameOf(person)}</p><p className="truncate text-xs text-slate-500">{person.email}</p></div></div><span className="shrink-0 text-xs text-slate-400">{date(person.created_at)}</span></div>)}{!loading && !data?.recentUsers?.length && <EmptyState text="No users yet" />}</div></div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><SectionHeading icon={Activity} title="Recent transactions" action="View ledger" onAction={() => onOpen("transactions")} /><div className="divide-y divide-slate-100">{(data?.recentTransactions || []).map((transaction) => <div key={transaction.id} className="flex items-center justify-between px-5 py-4"><div className="flex min-w-0 items-center gap-3"><div className={`grid h-9 w-9 place-items-center rounded-xl ${transaction.type === "CREDIT" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{transaction.type === "CREDIT" ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}</div><div className="min-w-0"><p className="truncate text-sm font-semibold">{transaction.email}</p><p className="text-xs text-slate-500">{transaction.type} · {date(transaction.created_at)}</p></div></div><span className={`font-semibold ${transaction.type === "CREDIT" ? "text-emerald-600" : "text-slate-800"}`}>{transaction.type === "CREDIT" ? "+" : "−"}{Number(transaction.amount).toLocaleString()}</span></div>)}{!loading && !data?.recentTransactions?.length && <EmptyState text="No transactions yet" />}</div></div>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{navItems.filter((item) => item.id !== "overview").map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onOpen(id)} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200"><span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600"><Icon size={18} /></span><span><span className="block text-sm font-semibold">{label}</span><span className="text-xs text-slate-400">Open section</span></span></span><ChevronRight size={17} className="text-slate-400" /></button>)}</div>
  </>;
}

function UsersTable({ rows, busyKey, isOwner, selfId, selfEmail, onBlock, onCredits, onEdit, onRole }) {
  return <DataTable headers={["User", "Role", "Wallet", "Joined", "Status", "Actions"]} empty="No users match this search">
    {rows.map((person) => {
      const isSelf = (selfId !== undefined && selfId !== null && String(person.id) === String(selfId)) || Boolean(selfEmail && person.email?.toLowerCase() === selfEmail.toLowerCase());
      const isProtectedOwner = String(person.role || "").toUpperCase() === "OWNER";
      const canChangeRole = isOwner && !isSelf && !isProtectedOwner;
      return <tr key={person.id} className="border-t border-slate-100 hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3"><Avatar label={nameOf(person)} /><div><div className="flex items-center gap-2"><p className="font-semibold">{nameOf(person)}</p>{isSelf && <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">You</span>}</div><p className="text-xs text-slate-500">{person.email}</p></div></div></td><td className="px-5 py-4">{canChangeRole ? <select disabled={busyKey === `user-${person.id}`} aria-label={`Role for ${person.email}`} value={person.role} onChange={(event) => onRole(person, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"><option value="USER">USER</option><option value="ADMIN">ADMIN</option></select> : <span className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-semibold ${isProtectedOwner ? "border-violet-200 bg-violet-50 text-violet-700" : "border-slate-200 bg-slate-100 text-slate-600"}`}>{isProtectedOwner ? "OWNER" : person.role}</span>}</td><td className="px-5 py-4 font-medium">{Number(person.wallet_balance || 0).toLocaleString()} cr</td><td className="px-5 py-4 text-slate-500">{date(person.created_at)}</td><td className="px-5 py-4"><Status blocked={person.is_blocked} /></td><td className="px-5 py-4">{isSelf || isProtectedOwner ? <span className="text-xs text-slate-400">{isSelf ? "Current account" : "Protected owner account"}</span> : <div className="flex items-center gap-2"><button title="Edit profile" onClick={() => onEdit(person)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil size={16} /></button><button onClick={() => onCredits(person)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold hover:border-violet-300 hover:text-violet-700">Credits</button><button disabled={busyKey === `user-${person.id}`} title={person.is_blocked ? "Unblock" : "Block"} onClick={() => onBlock(person)} className={`rounded-lg p-2 ${person.is_blocked ? "text-emerald-600 hover:bg-emerald-50" : "text-rose-500 hover:bg-rose-50"}`}>{person.is_blocked ? <ShieldCheck size={17} /> : <ShieldOff size={17} />}</button></div>}</td></tr>;
    })}
  </DataTable>;
}

function ResumesTable({ rows, busyKey, onDelete, onEdit }) {
  return <DataTable headers={["Resume", "Owner", "Template", "Mode", "Updated", "Actions"]} empty="No resumes match this search">
    {rows.map((resume) => <tr key={resume.id} className="border-t border-slate-100 hover:bg-slate-50/70"><td className="px-5 py-4"><p className="font-semibold">{resume.title}</p><p className="max-w-[300px] truncate text-xs text-slate-500">{resume.description}</p></td><td className="px-5 py-4"><p className="font-medium">{resume.owner_name}</p><p className="text-xs text-slate-500">{resume.user_email}</p></td><td className="px-5 py-4 text-slate-600">{resume.template_title || "—"}</td><td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">{resume.simple_mode ? "Simple" : "Manual"}</span></td><td className="px-5 py-4 text-slate-500">{date(resume.updated_at)}</td><td className="px-5 py-4"><div className="flex gap-1"><button onClick={() => onEdit(resume)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="Edit resume"><Pencil size={16} /></button><button disabled={busyKey === `resume-${resume.id}`} onClick={() => onDelete(resume)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 disabled:opacity-50" title="Delete resume">{busyKey === `resume-${resume.id}` ? <LoaderCircle className="animate-spin" size={17} /> : <Trash2 size={17} />}</button></div></td></tr>)}
  </DataTable>;
}

function TransactionsTable({ rows }) {
  return <DataTable headers={["User", "Type", "Credits", "Balance after", "Payment reference", "Date"]} empty="No transactions match this search">
    {rows.map((item) => <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50/70"><td className="px-5 py-4"><p className="font-semibold">{item.owner_name}</p><p className="text-xs text-slate-500">{item.user_email}</p></td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.type === "CREDIT" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{item.type}</span></td><td className={`px-5 py-4 font-bold ${item.type === "CREDIT" ? "text-emerald-600" : "text-slate-800"}`}>{item.type === "CREDIT" ? "+" : "−"}{Number(item.amount).toLocaleString()}</td><td className="px-5 py-4">{Number(item.balance_after).toLocaleString()} cr</td><td className="max-w-[200px] truncate px-5 py-4 text-xs text-slate-500">{item.payment_id || "Admin / usage"}</td><td className="px-5 py-4 text-slate-500">{date(item.created_at)}</td></tr>)}
  </DataTable>;
}

function TemplatesTable({ rows, onAdd, onEdit, onDelete }) {
  return <><div className="mb-4 flex justify-end"><button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus size={17} /> Add template</button></div><DataTable headers={["Template", "Type", "Engine", "Mode", "Author", "Actions"]} empty="No templates found">
    {rows.map((item) => <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50/70"><td className="px-5 py-4"><p className="font-semibold">{item.title}</p><p className="max-w-[450px] truncate text-xs text-slate-500">{item.short_description}</p></td><td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{item.type}</span></td><td className="px-5 py-4 text-slate-600">{item.engine}</td><td className="px-5 py-4">{item.simple_mode ? "Simple" : "Manual"}</td><td className="px-5 py-4 text-slate-600">{item.author_name}</td><td className="px-5 py-4"><div className="flex gap-1"><button onClick={() => onEdit(item)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="Edit template"><Pencil size={16} /></button><button onClick={() => onDelete(item)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" title="Delete template"><Trash2 size={16} /></button></div></td></tr>)}
  </DataTable></>;
}

function PlansTable({ rows, onAdd, onEdit, onDelete }) {
  return <><div className="mb-4 flex justify-end"><button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 hover:bg-violet-700"><Plus size={17} /> New plan</button></div><DataTable headers={["Plan", "Credits", "Price", "Rate", "Actions"]} empty="No credit plans configured">
    {rows.map((plan) => <tr key={plan.id} className="border-t border-slate-100 hover:bg-slate-50/70"><td className="px-5 py-4 font-semibold">{plan.title}</td><td className="px-5 py-4">{Number(plan.coins).toLocaleString()} credits</td><td className="px-5 py-4 font-bold">{money(plan.cost)}</td><td className="px-5 py-4 text-slate-500">{plan.coins ? `${money(plan.cost / plan.coins)} / credit` : "—"}</td><td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => onEdit(plan)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:text-violet-700">Edit</button><button onClick={() => onDelete(plan)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"><Trash2 size={16} /></button></div></td></tr>)}
  </DataTable></>;
}

function NotificationsSection({ rows, noticeForm, setNoticeForm, onSubmit, busy }) {
  return <div className="grid gap-5 xl:grid-cols-[minmax(320px,420px)_1fr]">
    <form onSubmit={onSubmit} className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 font-semibold"><Send size={17} className="text-violet-600" /> Send to active users</h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">Blocked accounts and other admins won’t receive this in-app announcement.</p>
      <label className="mt-5 block text-sm font-medium">Title<input required maxLength="100" value={noticeForm.title} onChange={(event) => setNoticeForm((form) => ({ ...form, title: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
      <label className="mt-4 block text-sm font-medium">Message<textarea required maxLength="255" rows="4" value={noticeForm.message} onChange={(event) => setNoticeForm((form) => ({ ...form, message: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5" /></label>
      <button disabled={busy} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Send size={15} />{busy ? "Sending…" : "Send announcement"}</button>
    </form>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h3 className="font-semibold">Recent announcement deliveries</h3><p className="mt-1 text-xs text-slate-500">Latest 100 notification records</p></div><div className="divide-y divide-slate-100">{rows.map((item) => <div key={item.id} className="px-5 py-4"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-sm text-slate-600">{item.message}</p><p className="mt-2 text-xs text-slate-400">{item.recipient_email}</p></div><span className="shrink-0 text-xs text-slate-400">{date(item.created_at)}</span></div></div>)}{!rows.length && <EmptyState text="No announcements sent yet" />}</div></div>
  </div>;
}

function DataTable({ headers, children, empty }) {
  const isEmpty = !children || (Array.isArray(children) && children.length === 0);
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500"><tr>{headers.map((header) => <th key={header} className="px-5 py-3.5 font-semibold">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>{isEmpty && <EmptyState text={empty} />}</div>;
}

function SectionHeading({ icon: Icon, title, action, onAction }) {
  return <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h3 className="flex items-center gap-2 font-semibold"><Icon size={17} className="text-violet-600" />{title}</h3><button onClick={onAction} className="text-xs font-semibold text-violet-600 hover:text-violet-800">{action} →</button></div>;
}

function Avatar({ label }) { return <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 text-xs font-bold text-violet-700">{label.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase()}</div>; }
function Status({ blocked }) { return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${blocked ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${blocked ? "bg-rose-500" : "bg-emerald-500"}`} />{blocked ? "Blocked" : "Active"}</span>; }
function EmptyState({ text }) { return <div className="grid min-h-36 place-items-center px-5 text-sm text-slate-400">{text}</div>; }
function Modal({ title, children, onClose }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold">{title}</h3><button aria-label="Close dialog" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div>{children}</div></div>; }

export default AdminPanel;
