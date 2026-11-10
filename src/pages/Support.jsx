import { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "react-toastify";
import { createMyTicket, getMyTickets } from "../services/supportService";

const input = "w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-red";
const statusLabel = { OPEN: "Open", IN_PROGRESS: "In progress", RESOLVED: "Resolved" };

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [busy, setBusy] = useState(false);
  const load = () => getMyTickets().then((r) => setTickets(r.data || [])).catch(() => toast.error("Could not load your tickets"));
  useEffect(() => { load(); }, []);
  const submit = async (event) => {
    event.preventDefault(); setBusy(true);
    try { await createMyTicket(form); setForm({ subject: "", message: "" }); toast.success("Support ticket sent"); await load(); }
    catch (error) { toast.error(error?.response?.data?.message || "Could not send your ticket"); }
    finally { setBusy(false); }
  };
  return <main className="min-h-[75vh] bg-neutral-bg px-4 py-10"><div className="mx-auto max-w-3xl"><h1 className="text-3xl font-black text-neutral-text-primary">Contact <span className="text-brand-red">Support</span></h1><p className="mt-2 text-neutral-text-secondary">Send a request and follow its status here.</p><form onSubmit={submit} className="mt-7 space-y-4 rounded-2xl border border-neutral-border bg-white p-5 shadow-sm"><label className="block text-sm font-semibold">Subject<input required minLength={3} maxLength={160} className={`${input} mt-2`} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></label><label className="block text-sm font-semibold">How can we help?<textarea required minLength={10} maxLength={10000} rows={5} className={`${input} mt-2`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label><button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-bold text-white disabled:opacity-60"><Send size={16} />{busy ? "Sending…" : "Raise ticket"}</button></form><section className="mt-9"><h2 className="flex items-center gap-2 text-xl font-bold"><MessageCircle size={20} />Your tickets</h2><div className="mt-4 space-y-3">{tickets.map((ticket) => <article key={ticket.id} className="rounded-xl border border-neutral-border bg-white p-4"><div className="flex justify-between gap-3"><h3 className="font-semibold">#{ticket.id} · {ticket.subject}</h3><span className="rounded-full bg-neutral-bg px-3 py-1 text-xs font-semibold">{statusLabel[ticket.status] || ticket.status}</span></div><p className="mt-2 whitespace-pre-wrap text-sm text-neutral-text-secondary">{ticket.message}</p><p className="mt-3 text-xs text-neutral-text-secondary">{new Date(ticket.created_at).toLocaleString()}</p></article>)}{!tickets.length && <p className="rounded-xl bg-white p-5 text-sm text-neutral-text-secondary">No tickets yet.</p>}</div></section></div></main>;
}
