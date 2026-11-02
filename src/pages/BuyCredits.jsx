import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Loader2, Check, ShieldCheck, Download, Coins } from "lucide-react";
import { motion } from "framer-motion";
import PageBackButton from "../components/PageBackButton";
import {
  createRechargeOrder,
  verifyRechargePayment,
  getWalletBalance,
} from "../services/walletService";

const RATE_PER_CREDIT = 7;
const MIN_CREDITS_PURCHASE = 4;
const COINS_PER_DOWNLOAD = 4;

const PACKS = [
  { credits: MIN_CREDITS_PURCHASE, label: "Starter", note: "Try it out" },
  { credits: 10, label: "Popular", note: "Great for a few resumes", badge: "Most popular" },
  { credits: 25, label: "Pro", note: "For job-hunt season" },
  { credits: 50, label: "Business", note: "Teams and heavy users" },
];

const downloadsFor = (c) => Math.floor(c / COINS_PER_DOWNLOAD);
const plural = (n) => `${n} ${n === 1 ? "download" : "downloads"}`;

const BuyCredits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customRef = useRef(null);
  const [selected, setSelected] = useState(MIN_CREDITS_PURCHASE);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const credits = custom ? parseInt(custom, 10) : selected;
  const priceINR = credits > 0 ? credits * RATE_PER_CREDIT : 0;
  const invalid = isNaN(credits) || credits < MIN_CREDITS_PURCHASE;
  const downloads = invalid ? 0 : downloadsFor(credits);

  const handleBuy = async () => {
    if (isNaN(credits) || credits < MIN_CREDITS_PURCHASE) {
      toast.error(`You must purchase a minimum of ${MIN_CREDITS_PURCHASE} coins.`);
      return;
    }
    setLoading(true);
    try {
      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKeyId) {
        throw new Error("Payment is not configured yet");
      }

      const orderRes = await createRechargeOrder({
        paymentGatewayID: "razorpay",
        amount: priceINR,
        currency: "INR",
      });
      const orderId = orderRes.data?.orderId;
      if (!orderId) throw new Error("Failed to create order");

      const rzp = new window.Razorpay({
        key: razorpayKeyId,
        amount: priceINR * 100,
        currency: "INR",
        name: "Touch Simply",
        description: `${credits} coins`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await verifyRechargePayment({
              paymentGatewayID: "razorpay",
              paymentId: response.razorpay_payment_id,
            });
            const w = await getWalletBalance();
            toast.success(`Coins added! New balance: ${w.data?.balance}`);
            window.dispatchEvent(new Event("touchsimply:balance-changed"));
            navigate(location.state?.from || "/dashboard");
          } catch {
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#E60000" },
      });

      rzp.on("payment.failed", () => toast.error("Payment failed"));
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not start payment");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustom(value);
    if (value === "") {
      setSelected(MIN_CREDITS_PURCHASE);
    } else {
      setSelected(null);
    }
  };

  const customActive = custom !== "";
  const customInvalid = customActive && (isNaN(credits) || credits < MIN_CREDITS_PURCHASE);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-bg px-4 pb-32 pt-6 sm:px-6 md:pt-12 lg:pb-14">
      {/* one quiet shape, nothing else */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[640px] w-[640px] rounded-full bg-red-50"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto max-w-6xl"
      >
        <PageBackButton className="mb-6" fallback="/dashboard" />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          {/* ───────── left: choose ───────── */}
          <section className="min-w-0">
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-neutral-text-primary sm:text-5xl">
              Top up your coins
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-text-secondary">
              Coins pay for your downloads. One resume download costs {COINS_PER_DOWNLOAD} coins
              (₹{COINS_PER_DOWNLOAD * RATE_PER_CREDIT}). Pick a pack or type your own amount.
            </p>

            <div role="radiogroup" aria-label="Choose a coin pack" className="mt-8 space-y-3">
              {PACKS.map((p) => {
                const active = selected === p.credits && !customActive;
                return (
                  <button
                    key={p.credits}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setSelected(p.credits);
                      setCustom("");
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-white px-3.5 py-3.5 text-left transition sm:gap-5 sm:px-6 sm:py-4 ${
                      active
                        ? "border-brand-red shadow-lg ring-4 ring-red-100"
                        : "border-white hover:border-neutral-border"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition sm:h-6 sm:w-6 ${
                        active ? "border-brand-red bg-brand-red text-white" : "border-gray-300"
                      }`}
                      aria-hidden="true"
                    >
                      {active && <Check size={14} strokeWidth={3} />}
                    </span>

                    <span className="w-16 shrink-0 sm:w-24">
                      <span className="block text-3xl font-black leading-none tabular-nums text-neutral-text-primary sm:text-4xl">
                        {p.credits}
                      </span>
                      <span className="text-xs font-medium text-neutral-text-secondary">coins</span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-neutral-text-primary">{p.label}</span>
                        {p.badge && (
                          <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold text-white sm:px-2.5 sm:text-[11px]">
                            {p.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-neutral-text-secondary">
                        {plural(downloadsFor(p.credits))}<span className="hidden sm:inline"> · {p.note}</span>
                      </span>
                    </span>

                    <span className="shrink-0 text-xl font-extrabold tabular-nums text-neutral-text-primary sm:text-2xl">
                      ₹{p.credits * RATE_PER_CREDIT}
                    </span>
                  </button>
                );
              })}

              {/* custom amount row */}
              <label
                className={`flex w-full cursor-text items-center gap-3 rounded-2xl border-2 bg-white px-3.5 py-3.5 transition sm:gap-5 sm:px-6 sm:py-4 ${
                  customInvalid
                    ? "border-brand-red"
                    : customActive
                    ? "border-brand-red shadow-lg ring-4 ring-red-100"
                    : "border-white hover:border-neutral-border"
                }`}
                onClick={() => customRef.current?.focus()}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition sm:h-6 sm:w-6 ${
                    customActive && !customInvalid ? "border-brand-red bg-brand-red text-white" : "border-gray-300"
                  }`}
                  aria-hidden="true"
                >
                  {customActive && !customInvalid && <Check size={14} strokeWidth={3} />}
                </span>

                <span className="w-16 shrink-0 sm:w-24">
                  <input
                    ref={customRef}
                    type="number"
                    inputMode="numeric"
                    min={MIN_CREDITS_PURCHASE}
                    value={custom}
                    onChange={handleCustomChange}
                    placeholder="15"
                    aria-label="Custom number of coins"
                    className="w-full bg-transparent text-3xl font-black leading-none tabular-nums text-neutral-text-primary sm:text-4xl outline-none placeholder:text-gray-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-xs font-medium text-neutral-text-secondary">coins</span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-neutral-text-primary">Your own amount</span>
                  <span
                    className={`mt-0.5 block text-sm ${
                      customInvalid ? "font-semibold text-brand-red" : "text-neutral-text-secondary"
                    }`}
                  >
                    {customInvalid
                      ? `Minimum purchase is ${MIN_CREDITS_PURCHASE} coins`
                      : customActive
                      ? plural(downloads)
                      : `Type any amount, min. ${MIN_CREDITS_PURCHASE} coins`}
                  </span>
                </span>

                <span className="shrink-0 text-xl font-extrabold tabular-nums text-neutral-text-primary sm:text-2xl">
                  {customActive && !customInvalid ? `₹${priceINR}` : <Coins size={22} className="text-gray-300" />}
                </span>
              </label>
            </div>
          </section>

          {/* ───────── right: receipt ───────── */}
          <aside className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl bg-brand-black text-white shadow-2xl shadow-black/20">
              <div className="p-5 pb-5 sm:p-7 sm:pb-6">
                <p className="text-sm font-semibold text-gray-400">Your order</p>

                <p className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-black leading-none tracking-tight tabular-nums sm:text-6xl">
                    {invalid ? "—" : credits}
                  </span>
                  <span className="text-lg font-semibold text-gray-400">coins</span>
                </p>

                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-200">
                  <Download size={13} className="text-brand-red" />
                  {invalid ? "Pick a pack to continue" : `≈ ${plural(downloads)}`}
                </p>

                <dl className="mt-6 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Price per coin</dt>
                    <dd className="font-semibold">₹{RATE_PER_CREDIT}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">One download</dt>
                    <dd className="font-semibold">
                      {COINS_PER_DOWNLOAD} coins · ₹{COINS_PER_DOWNLOAD * RATE_PER_CREDIT}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* perforation */}
              <div className="relative" aria-hidden="true">
                <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-neutral-bg" />
                <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-neutral-bg" />
                <div className="mx-6 border-t-2 border-dashed border-white/20" />
              </div>

              <div className="p-5 pt-5 sm:p-7 sm:pt-6">
                <div className="flex items-end justify-between">
                  <span className="text-sm font-semibold text-gray-400">Total</span>
                  <span className="text-4xl font-black leading-none tracking-tight tabular-nums text-brand-red sm:text-5xl">
                    ₹{priceINR}
                  </span>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={loading || invalid}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-4 text-base font-bold text-white transition hover:bg-brand-red-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CreditCard size={18} className="transition-transform group-hover:scale-110" />
                  )}
                  {loading ? "Processing..." : `Pay ₹${priceINR}`}
                </button>

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} className="text-brand-red" /> Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyCredits;