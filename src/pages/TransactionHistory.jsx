import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  FileDown,
  Plus,
  ReceiptText,
  Wallet,
} from "lucide-react";
import { getMyTransactions } from "../services/walletService";

const LIMIT = 20;

const timeOnly = (value) =>
  value
    ? new Date(value).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
    : "—";

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const dayLabel = (value) => {
  if (!value) return "Unknown date";
  const d = new Date(value);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "in", label: "Coins in" },
  { id: "out", label: "Coins out" },
];

const describe = (item) => {
  const credit = item.type === "CREDIT";
  const payment = credit && Boolean(item.payment_id);
  if (payment) return { title: "Payment received", sub: "Wallet top-up successful", kind: "payment" };
  if (credit) return { title: "Coins added", sub: "Added to your wallet", kind: "credit" };
  return { title: "Resume download", sub: "Coins used for a PDF download", kind: "debit" };
};

function Stat({ label, value, tone = "default" }) {
  const toneClass =
    tone === "in" ? "text-emerald-400" : tone === "out" ? "text-red-400" : "text-white";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`mt-1 text-xl font-bold tabular-nums ${toneClass}`}>{value}</p>
    </div>
  );
}

function Row({ item, copiedId, onCopy }) {
  const info = describe(item);
  const positive = item.type === "CREDIT";

  const iconWrap =
    info.kind === "debit"
      ? "bg-red-50 text-brand-red"
      : info.kind === "payment"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";

  const Icon = info.kind === "debit" ? FileDown : info.kind === "payment" ? CreditCard : ArrowDownLeft;

  return (
    <li className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-neutral-bg sm:px-7">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${iconWrap}`}>
        <Icon size={19} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-neutral-text-primary">{info.title}</p>
        <p className="truncate text-xs text-neutral-text-secondary">
          {info.sub} · {timeOnly(item.created_at)}
        </p>
        {item.payment_id && (
          <button
            onClick={() => onCopy(item.id, item.payment_id)}
            className="mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-md bg-neutral-bg px-2 py-0.5 font-mono text-[11px] text-neutral-text-secondary hover:text-brand-red"
            title="Copy payment reference"
          >
            <span className="truncate">{item.payment_id}</span>
            {copiedId === item.id ? <Check size={11} className="shrink-0 text-emerald-600" /> : <Copy size={11} className="shrink-0" />}
          </button>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p className={`text-base font-extrabold tabular-nums ${positive ? "text-emerald-600" : "text-brand-red"}`}>
          {positive ? "+" : "−"}
          {Number(item.amount).toLocaleString()}
        </p>
        <p className="text-[11px] text-neutral-text-secondary">
          Balance {Number(item.balance_after).toLocaleString()}
        </p>
      </div>
    </li>
  );
}

function SkeletonRows() {
  return (
    <ul className="divide-y divide-neutral-border" aria-label="Loading transactions">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="flex animate-pulse items-center gap-4 px-5 py-4 sm:px-7">
          <span className="h-11 w-11 rounded-2xl bg-neutral-bg" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-40 rounded bg-neutral-bg" />
            <div className="h-3 w-56 max-w-full rounded bg-neutral-bg" />
          </div>
          <div className="space-y-2">
            <div className="ml-auto h-4 w-14 rounded bg-neutral-bg" />
            <div className="h-3 w-20 rounded bg-neutral-bg" />
          </div>
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

  const items = result.data || [];
  const total = Number(result.total || 0);
  const pageCount = Math.max(1, Math.ceil(total / LIMIT));

  // Latest first (desc) => page 1, first item = current balance
  const currentBalance = page === 1 && items.length ? Number(items[0].balance_after) : null;

  const stats = useMemo(() => {
    let added = 0;
    let used = 0;
    items.forEach((i) => {
      if (i.type === "CREDIT") added += Number(i.amount || 0);
      else used += Number(i.amount || 0);
    });
    return { added, used };
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter((i) =>
        filter === "all" ? true : filter === "in" ? i.type === "CREDIT" : i.type !== "CREDIT"
      ),
    [items, filter]
  );

  const groups = useMemo(() => {
    const map = new Map();
    filtered.forEach((item) => {
      const key = dayLabel(item.created_at);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    return [...map.entries()];
  }, [filtered]);

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  const from = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const to = Math.min(page * LIMIT, total);

  return (
    <main className="min-h-[75vh] bg-neutral-bg px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* ───────── hero ───────── */}
        <header
          className="relative overflow-hidden rounded-3xl bg-brand-black p-6 text-white shadow-xl sm:p-8"
          style={{
            backgroundImage:
              "radial-gradient(520px 260px at 100% 0%, rgba(224,48,30,.45), transparent 65%), radial-gradient(360px 200px at 0% 100%, rgba(224,48,30,.18), transparent 70%)",
          }}
        >
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} /> My profile
          </Link>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-300">
                <Wallet size={16} className="text-brand-red" />
                Wallet balance
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl">
                  {currentBalance === null ? "—" : currentBalance.toLocaleString()}
                </span>
                <span className="text-lg font-semibold text-gray-400">coins</span>
              </p>
              <p className="mt-2 max-w-md text-sm text-gray-400">
                Top-ups, coin grants and resume downloads, all in one place.
              </p>
            </div>

            <Link
              to="/credits/buy"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:bg-brand-red-hover"
            >
              <Plus size={17} /> Buy coins
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3">
            <Stat label="Total records" value={total.toLocaleString()} />
            <Stat label="Added (this page)" value={`+${stats.added.toLocaleString()}`} tone="in" />
            <Stat label="Used (this page)" value={`−${stats.used.toLocaleString()}`} tone="out" />
          </div>
        </header>

        {/* ───────── list card ───────── */}
        <section className="overflow-hidden rounded-3xl border border-neutral-border bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border px-5 py-4 sm:px-7">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-50 text-brand-red">
                <ReceiptText size={18} />
              </span>
              <div>
                <h1 className="font-bold leading-tight text-neutral-text-primary">Transactions</h1>
                <p className="text-xs text-neutral-text-secondary">
                  {total === 0 ? "No records" : `Showing ${from}–${to} of ${total.toLocaleString()}`}
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-xl bg-neutral-bg p-1" role="tablist" aria-label="Filter transactions">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    filter === f.id
                      ? "bg-brand-black text-white shadow"
                      : "text-neutral-text-secondary hover:text-neutral-text-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <SkeletonRows />
          ) : !items.length ? (
            <div className="px-6 py-16 text-center">
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-red-50 text-brand-red">
                <CreditCard size={28} />
              </span>
              <p className="text-lg font-bold text-neutral-text-primary">No transactions yet</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-neutral-text-secondary">
                Buy coins to download your resumes. Every top-up and download will show up here.
              </p>
              <Link
                to="/credits/buy"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-red-hover"
              >
                <Plus size={16} /> Buy coins
              </Link>
            </div>
          ) : !filtered.length ? (
            <div className="px-6 py-14 text-center text-sm text-neutral-text-secondary">
              No {filter === "in" ? "coins added" : "coins used"} on this page.
            </div>
          ) : (
            <div>
              {groups.map(([label, rows]) => (
                <div key={label}>
                  <p className="sticky top-0 border-y border-neutral-border bg-neutral-bg/90 px-5 py-1.5 text-xs font-semibold text-neutral-text-secondary backdrop-blur first:border-t-0 sm:px-7">
                    {label}
                  </p>
                  <ul className="divide-y divide-neutral-border">
                    {rows.map((item) => (
                      <Row key={item.id} item={item} copiedId={copiedId} onCopy={handleCopy} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <footer className="flex items-center justify-between border-t border-neutral-border px-5 py-3.5 text-sm text-neutral-text-secondary sm:px-7">
            <span>
              Page {page} of {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((v) => v - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-neutral-border px-3 py-1.5 font-medium transition hover:border-brand-black hover:text-neutral-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} /> Previous
              </button>
              <button
                disabled={page >= pageCount || loading}
                onClick={() => setPage((v) => v + 1)}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-black px-3 py-1.5 font-medium text-white transition hover:bg-brand-red disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}