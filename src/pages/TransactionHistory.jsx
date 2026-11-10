import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Copy, Plus } from "lucide-react";
import { getMyTransactions } from "../services/walletService";
import { getMyInvoices } from "../services/supportService";

const LIMIT = 20;

const num = (n) => Number(n || 0).toLocaleString("en-IN");

const parts = (value) => {
  if (!value) return { day: "—", month: "", year: "", time: "", key: "" };
  const d = new Date(value);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
    year: d.getFullYear(),
    time: d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
    key: d.toDateString(),
  };
};

const describe = (item) => {
  const credit = item.type === "CREDIT";
  if (credit && item.payment_id) return { title: "Payment received", sub: "Wallet top-up" };
  if (credit) return { title: "Coins added", sub: "Credited to wallet" };
  return { title: "Resume download", sub: "PDF download" };
};

const FILTERS = [
  { id: "all", label: "All entries" },
  { id: "in", label: "Credit" },
  { id: "out", label: "Debit" },
];

/* grid shared by header, rows and totals so columns always line up */
const COLS = "md:grid-cols-[96px_minmax(0,1fr)_110px_110px_120px]";

function Stamp({ value }) {
  return (
    <div
      className="flex h-[132px] w-[132px] shrink-0 -rotate-6 select-none items-center justify-center rounded-full border-[3px] border-brand-red text-brand-red"
      aria-label={`Balance ${value ?? "unknown"} coins`}
    >
      <div className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full border border-dashed border-brand-red">
        <span className="text-[11px] font-semibold tracking-wide">Balance</span>
        <span className="text-4xl font-extrabold leading-none tabular-nums">
          {value === null ? "—" : num(value)}
        </span>
        <span className="mt-0.5 text-[11px] font-semibold">coins</span>
      </div>
    </div>
  );
}

function CopyRef({ id, text, copiedId, onCopy }) {
  return (
    <button
      onClick={() => onCopy(id, text)}
      title="Copy reference"
      className="mt-1 inline-flex max-w-full items-center gap-1 text-[11px] text-neutral-text-secondary hover:text-brand-red"
    >
      <span className="truncate">Ref {text}</span>
      {copiedId === id ? <Check size={11} className="shrink-0 text-emerald-600" /> : <Copy size={11} className="shrink-0" />}
    </button>
  );
}

function Entry({ item, showDate, copiedId, onCopy }) {
  const p = parts(item.created_at);
  const info = describe(item);
  const credit = item.type === "CREDIT";

  const dateCell = showDate ? (
    <div className="leading-tight">
      <span className="text-2xl font-extrabold tabular-nums text-neutral-text-primary">{p.day}</span>
      <span className="ml-1 text-xs font-semibold text-neutral-text-secondary md:ml-0 md:block">
        {p.month} {p.year}
      </span>
    </div>
  ) : null;

  const particulars = (
    <div className="min-w-0">
      <p className="truncate font-semibold text-neutral-text-primary">{info.title}</p>
      <p className="truncate text-xs text-neutral-text-secondary">
        {info.sub} · {p.time}
      </p>
      {item.payment_id && <CopyRef id={item.id} text={item.payment_id} copiedId={copiedId} onCopy={onCopy} />}
    </div>
  );

  return (
    <li className="border-b border-[#e9e1d4] last:border-b-0">
      {/* desktop: true ledger columns */}
      <div className={`hidden items-center gap-0 py-3.5 md:grid ${COLS}`}>
        <div className="self-start border-r border-red-200 pl-1 pr-3">{dateCell}</div>
        <div className="px-5">{particulars}</div>
        <div className="px-2 text-right font-bold tabular-nums text-emerald-700">
          {credit ? num(item.amount) : <span className="font-normal text-[#cfc6b6]">—</span>}
        </div>
        <div className="px-2 text-right font-bold tabular-nums text-brand-red">
          {!credit ? num(item.amount) : <span className="font-normal text-[#cfc6b6]">—</span>}
        </div>
        <div className="px-2 text-right font-bold tabular-nums text-neutral-text-primary">
          {num(item.balance_after)}
        </div>
      </div>

      {/* mobile: compact stacked entry */}
      <div className="flex items-start gap-3 py-3.5 md:hidden">
        <div className="w-14 shrink-0 border-r border-red-200 pr-2">{dateCell}</div>
        <div className="min-w-0 flex-1">{particulars}</div>
        <div className="shrink-0 text-right">
          <p className={`font-extrabold tabular-nums ${credit ? "text-emerald-700" : "text-brand-red"}`}>
            {credit ? "+" : "−"}
            {num(item.amount)}
          </p>
          <p className="text-[11px] text-neutral-text-secondary">Bal {num(item.balance_after)}</p>
        </div>
      </div>
    </li>
  );
}

function Skeleton() {
  return (
    <ul aria-label="Loading entries">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="flex animate-pulse items-center gap-4 border-b border-[#e9e1d4] py-4">
          <span className="h-8 w-14 rounded bg-[#efe8da]" />
          <span className="h-4 flex-1 rounded bg-[#efe8da]" />
          <span className="h-4 w-16 rounded bg-[#efe8da]" />
        </li>
      ))}
    </ul>
  );
}

export default function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getMyTransactions({ page, limit: LIMIT, sort_by: "created_at", direction: "desc" })
      .then((response) => {
        if (active) setResult(response?.data || { data: [], total: 0 });
      })
      .catch(() => {
        if (active) setResult({ data: [], total: 0 });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page]);

  useEffect(() => { getMyInvoices().then((response) => setInvoices(response?.data || [])).catch(() => setInvoices([])); }, []);

  const items = result.data || [];
  const total = Number(result.total || 0);
  const pageCount = Math.max(1, Math.ceil(total / LIMIT));
  const balance = page === 1 && items.length ? Number(items[0].balance_after) : null;

  const filtered = useMemo(
    () =>
      items.filter((i) =>
        filter === "all" ? true : filter === "in" ? i.type === "CREDIT" : i.type !== "CREDIT"
      ),
    [items, filter]
  );

  const totals = useMemo(
    () =>
      filtered.reduce(
        (acc, i) => {
          if (i.type === "CREDIT") acc.credit += Number(i.amount || 0);
          else acc.debit += Number(i.amount || 0);
          return acc;
        },
        { credit: 0, debit: 0 }
      ),
    [filtered]
  );

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <main className="min-h-[75vh] bg-[#f6f1e7] px-4 py-8 sm:px-6 sm:py-12">
      {/* the passbook */}
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-l-md rounded-r-3xl bg-[#fffdf8] shadow-[0_24px_50px_-24px_rgba(60,35,10,.45)] ring-1 ring-[#e5dccb]">
        {/* red spine with stitches */}
        <div className="absolute inset-y-0 left-0 w-4 bg-brand-red sm:w-6" aria-hidden="true">
          <div className="absolute inset-y-3 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/50" />
        </div>

        <div className="pl-7 pr-5 pb-2 pt-6 sm:pl-12 sm:pr-9 sm:pt-8">
          {/* cover */}
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-text-secondary transition hover:text-brand-red"
          >
            <ArrowLeft size={15} /> My profile
          </Link>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-text-primary sm:text-4xl">
                Coin <span className="text-brand-red">Passbook</span>
              </h1>
              <p className="mt-1 text-sm text-neutral-text-secondary">
                Every top-up, grant and download, entered in order.
              </p>
              <Link
                to="/credits/buy"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-red"
              >
                <Plus size={16} /> Buy coins
              </Link>
              <Link to="/support" className="ml-2 mt-4 inline-flex items-center gap-2 rounded-lg border border-[#d9ceb9] px-4 py-2.5 text-sm font-semibold text-neutral-text-primary">Contact support</Link>
            </div>
            <Stamp value={balance} />
          </div>

          <section className="mt-8 rounded-2xl border border-[#e5dccb] bg-white/70 p-4 sm:p-5">
            <h2 className="text-lg font-bold text-neutral-text-primary">Invoices</h2>
            <p className="mt-1 text-xs text-neutral-text-secondary">Invoices appear here after they have been emailed to you.</p>
            <div className="mt-3 divide-y divide-[#e9e1d4]">
              {invoices.map((invoice) => <div key={invoice.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><p className="font-semibold">{invoice.invoice_number}</p><p className="text-xs text-neutral-text-secondary">{new Date(invoice.emailed_at || invoice.created_at).toLocaleDateString("en-IN")} · Payment {invoice.payment_id}</p></div><strong>{invoice.currency} {num(invoice.amount)}</strong></div>)}
              {!invoices.length && <p className="py-3 text-sm text-neutral-text-secondary">No emailed invoices yet.</p>}
            </div>
          </section>

          {/* filter: ledger-style underline tabs */}
          <div className="mt-8 flex gap-6 border-b border-[#e0d6c3]" role="tablist" aria-label="Filter entries">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`-mb-px border-b-2 pb-2.5 text-sm font-semibold transition ${
                  filter === f.id
                    ? "border-brand-red text-neutral-text-primary"
                    : "border-transparent text-neutral-text-secondary hover:text-neutral-text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto pb-2.5 text-xs text-neutral-text-secondary">
              {num(total)} {total === 1 ? "entry" : "entries"}
            </span>
          </div>

          {/* ledger head */}
          <div
            className={`hidden border-b-[3px] border-double border-[#cfc3ab] py-2.5 text-xs font-semibold text-neutral-text-secondary md:grid ${COLS}`}
          >
            <span className="pl-1">Date</span>
            <span className="px-5">Particulars</span>
            <span className="px-2 text-right">Credit</span>
            <span className="px-2 text-right">Debit</span>
            <span className="px-2 text-right">Balance</span>
          </div>

          {/* ledger body */}
          {loading ? (
            <Skeleton />
          ) : !items.length ? (
            <div className="py-16 text-center">
              <p className="text-xl font-bold text-neutral-text-primary">No entries yet</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-neutral-text-secondary">
                Your passbook is blank. Buy coins and your first entry will be written here.
              </p>
            </div>
          ) : !filtered.length ? (
            <p className="py-14 text-center text-sm text-neutral-text-secondary">
              No {filter === "in" ? "credit" : "debit"} entries on this page.
            </p>
          ) : (
            <ul>
              {filtered.map((item, idx) => {
                const showDate =
                  idx === 0 || parts(item.created_at).key !== parts(filtered[idx - 1].created_at).key;
                return (
                  <Entry
                    key={item.id}
                    item={item}
                    showDate={showDate}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                  />
                );
              })}
            </ul>
          )}

          {/* totals row */}
          {!loading && filtered.length > 0 && (
            <>
              <div
                className={`hidden border-t-[3px] border-double border-[#cfc3ab] py-3 text-sm font-bold md:grid ${COLS}`}
              >
                <span />
                <span className="px-5 text-neutral-text-secondary">Total on this page</span>
                <span className="px-2 text-right tabular-nums text-emerald-700">{num(totals.credit)}</span>
                <span className="px-2 text-right tabular-nums text-brand-red">{num(totals.debit)}</span>
                <span />
              </div>
              <div className="flex items-center justify-between border-t-[3px] border-double border-[#cfc3ab] py-3 text-sm font-bold md:hidden">
                <span className="text-neutral-text-secondary">Page total</span>
                <span className="tabular-nums">
                  <span className="text-emerald-700">+{num(totals.credit)}</span>
                  <span className="mx-2 text-[#cfc6b6]">/</span>
                  <span className="text-brand-red">−{num(totals.debit)}</span>
                </span>
              </div>
            </>
          )}

          {/* pagination */}
          <div className="flex items-center justify-between py-4 text-sm text-neutral-text-secondary">
            <span>
              Page {page} of {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((v) => v - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#d9ceb9] px-3 py-1.5 font-medium transition hover:border-brand-black hover:text-neutral-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} /> Previous
              </button>
              <button
                disabled={page >= pageCount || loading}
                onClick={() => setPage((v) => v + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#d9ceb9] px-3 py-1.5 font-medium transition hover:border-brand-black hover:text-neutral-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
