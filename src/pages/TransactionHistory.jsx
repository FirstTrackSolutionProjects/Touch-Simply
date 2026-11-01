import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownLeft, ArrowLeft, ArrowUpRight, CreditCard, ReceiptText } from "lucide-react";
import { getMyTransactions } from "../services/walletService";

const date = (value) => value ? new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";

export default function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    let active = true;
    setLoading(true);
    getMyTransactions({ page, limit, sort_by: "created_at", direction: "desc" })
      .then((response) => {
        if (active) setResult(response?.data || { data: [], total: 0 });
      })
      .catch(() => { if (active) setResult({ data: [], total: 0 }); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page]);

  const pageCount = Math.max(1, Math.ceil(Number(result.total || 0) / limit));
  
  return (
    <main className="min-h-[75vh] bg-neutral-bg px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-neutral-border bg-white shadow-sm">
        <header className="bg-brand-black p-6 text-white sm:p-8">
          <Link to="/profile" className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <ArrowLeft size={16} /> My profile
          </Link>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-brand-red">
              <ReceiptText />
            </span>
            <div>
              <h1 className="text-2xl font-bold">Payment &amp; credit history</h1>
              <p className="mt-1 text-sm text-gray-400">Successful wallet top-ups, credit grants, and download usage.</p>
            </div>
          </div>
        </header>
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-border p-5 sm:px-7">
          <div>
            <p className="font-semibold text-neutral-text-primary">Your transactions</p>
            <p className="text-sm text-neutral-text-secondary">{Number(result.total || 0).toLocaleString()} records</p>
          </div>
          <Link to="/credits/buy" className="rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover transition">
            Buy credits
          </Link>
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-sm text-neutral-text-secondary">Loading history…</div>
        ) : !result.data?.length ? (
          <div className="p-12 text-center">
            <CreditCard className="mx-auto mb-3 text-gray-300" size={36} />
            <p className="font-semibold text-neutral-text-primary">No transactions yet</p>
            <p className="mt-1 text-sm text-neutral-text-secondary">Wallet top-ups and credit usage will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-neutral-bg text-xs uppercase tracking-wide text-neutral-text-secondary">
                <tr>
                  <th className="px-6 py-3">Activity</th>
                  <th className="px-6 py-3">Reference</th>
                  <th className="px-6 py-3">Credits</th>
                  <th className="px-6 py-3">Balance after</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map((item) => {
                  const payment = item.type === "CREDIT" && Boolean(item.payment_id);
                  const positive = item.type === "CREDIT";
                  return (
                    <tr key={item.id} className="border-t border-neutral-border">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 font-semibold text-neutral-text-primary">
                          {positive ? <ArrowDownLeft className="text-green-600" size={17} /> : <ArrowUpRight className="text-brand-red" size={17} />}
                          {payment ? "Payment received" : positive ? "Credits added" : "Resume download"}
                        </span>
                        <span className="mt-1 block pl-6 text-xs text-neutral-text-secondary">
                          {payment ? "Successful" : positive ? "Wallet credit" : "Credits used"}
                        </span>
                      </td>
                      <td className="max-w-[180px] truncate px-6 py-4 font-mono text-xs text-neutral-text-secondary" title={item.payment_id || "—"}>
                        {item.payment_id || "—"}
                      </td>
                      <td className={`px-6 py-4 font-bold ${positive ? "text-green-700" : "text-brand-red"}`}>
                        {positive ? "+" : "−"}{Number(item.amount).toLocaleString()} cr
                      </td>
                      <td className="px-6 py-4 text-neutral-text-primary">{Number(item.balance_after).toLocaleString()} cr</td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-text-secondary">{date(item.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        <footer className="flex items-center justify-between border-t border-neutral-border px-5 py-4 text-sm text-neutral-text-secondary sm:px-7">
          <span>Page {page} of {pageCount}</span>
          <div className="flex gap-2">
            <button disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-neutral-border px-3 py-1.5 disabled:opacity-40 hover:bg-neutral-bg transition">Previous</button>
            <button disabled={page >= pageCount || loading} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-neutral-border px-3 py-1.5 disabled:opacity-40 hover:bg-neutral-bg transition">Next</button>
          </div>
        </footer>
      </section>
    </main>
  );
}