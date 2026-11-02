import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Loader2, Zap, Check, ShieldCheck, Download, Coins } from "lucide-react";
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
  { credits: MIN_CREDITS_PURCHASE, label: "Starter" },
  { credits: 10, label: "Popular", badge: "Most Popular" },
  { credits: 25, label: "Pro" },
  { credits: 50, label: "Business" },
];

const BuyCredits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(MIN_CREDITS_PURCHASE);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const credits = custom ? parseInt(custom, 10) : selected;
  const priceINR = credits > 0 ? credits * RATE_PER_CREDIT : 0;
  const invalid = isNaN(credits) || credits < MIN_CREDITS_PURCHASE;
  const downloads = invalid ? 0 : Math.floor(credits / COINS_PER_DOWNLOAD);

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
            toast.success(
              `Coins added! New balance: ${w.data?.balance}`
            );
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
      toast.error(
        err.response?.data?.message || "Could not start payment"
      );
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

  return (
    <div className="relative min-h-screen bg-neutral-bg overflow-hidden px-4 sm:px-6 py-10 md:py-16">
      {/* Background decoration */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] max-w-full bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto"
      >
        <PageBackButton className="mb-5" fallback="/dashboard" />

        <div className="relative overflow-hidden bg-white rounded-[2rem] shadow-2xl shadow-black/5 border border-neutral-border">
          <div className="absolute top-0 left-10 h-1.5 w-20 rounded-b-full bg-brand-red" />

          {/* Header */}
          <div className="relative p-6 sm:p-10 pb-6">
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative flex items-start gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 text-white flex items-center justify-center shadow-lg shadow-brand-red/30">
                <Zap size={26} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary tracking-tight">
                  Buy <span className="text-brand-red">Coins</span>
                </h1>
                <p className="text-sm md:text-base text-neutral-text-secondary mt-2 leading-relaxed">
                  Coins are used to download your designs. 1 download = {COINS_PER_DOWNLOAD} coins (₹{COINS_PER_DOWNLOAD * RATE_PER_CREDIT}).
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 pb-8 sm:pb-10">
            {/* Packs */}
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-text-secondary mb-3">Choose a pack</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              {PACKS.map((p) => {
                const active = selected === p.credits && !custom;
                return (
                  <button
                    key={p.credits}
                    onClick={() => {
                      setSelected(p.credits);
                      setCustom("");
                    }}
                    className={`group relative p-4 md:p-5 rounded-2xl border-2 text-center transition-all duration-300 hover:-translate-y-1 ${
                      active
                        ? "border-brand-red bg-brand-red/5 shadow-xl shadow-brand-red/15"
                        : "border-neutral-border bg-white hover:border-brand-red/40 hover:shadow-lg"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider bg-brand-red text-white px-2.5 py-1 rounded-full shadow-md">
                        {p.badge}
                      </span>
                    )}
                    {active && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shadow">
                        <Check size={12} />
                      </span>
                    )}
                    <div
                      className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all ${
                        active
                          ? "bg-brand-red text-white shadow-md shadow-brand-red/30"
                          : "bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white"
                      }`}
                    >
                      <Zap size={18} />
                    </div>
                    <p className="text-3xl font-extrabold text-neutral-text-primary tracking-tight">{p.credits}</p>
                    <p className="text-xs text-neutral-text-secondary font-medium">{p.label}</p>
                    <p className="text-sm font-bold text-brand-red mt-3 bg-brand-red/10 rounded-lg py-1">
                      ₹{p.credits * RATE_PER_CREDIT}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <span className="flex-1 h-px bg-neutral-border" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-text-secondary">or</span>
              <span className="flex-1 h-px bg-neutral-border" />
            </div>

            {/* Custom */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-neutral-text-primary mb-2">
                Enter a custom amount{" "}
                <span className="font-medium text-neutral-text-secondary">(min. {MIN_CREDITS_PURCHASE} coins)</span>
              </label>
              <div className="relative">
                <Coins size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-text-secondary pointer-events-none" />
                <input
                  type="number"
                  min={MIN_CREDITS_PURCHASE}
                  value={custom}
                  onChange={handleCustomChange}
                  placeholder="e.g. 15"
                  className={`w-full bg-neutral-bg border rounded-xl py-3.5 pl-11 pr-24 text-neutral-text-primary placeholder-neutral-text-secondary/70 outline-none transition-all focus:bg-white focus:ring-4 ${
                    custom && credits < MIN_CREDITS_PURCHASE
                      ? "border-brand-red focus:ring-brand-red/10"
                      : "border-neutral-border focus:border-brand-red/60 focus:ring-brand-red/10"
                  }`}
                />
                {custom && !isNaN(credits) && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-red">
                    ₹{priceINR}
                  </span>
                )}
              </div>
              {custom && credits < MIN_CREDITS_PURCHASE && (
                <p className="text-xs font-semibold text-brand-red mt-2">Minimum purchase is {MIN_CREDITS_PURCHASE} coins.</p>
              )}
            </div>

            {/* Summary */}
            <div className="relative overflow-hidden bg-brand-black rounded-2xl p-5 sm:p-6 mb-6 text-white shadow-xl shadow-black/10 ring-1 ring-white/5">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/40 blur-3xl rounded-full pointer-events-none" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium">You will receive</p>
                  <p className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
                    {invalid ? "—" : credits} <span className="text-base font-bold text-gray-400">coins</span>
                  </p>
                  {!invalid && (
                    <p className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-gray-200">
                      <Download size={12} className="text-brand-red" /> ≈ {downloads} {downloads === 1 ? "download" : "downloads"}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">Total</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-brand-red tracking-tight mt-1">₹{priceINR}</p>
                  <p className="text-[11px] text-gray-500 mt-1">1 coin = ₹{RATE_PER_CREDIT}</p>
                </div>
              </div>
            </div>

            {/* Pay button */}
            <button
              onClick={handleBuy}
              disabled={loading || invalid}
              className="group w-full bg-brand-red text-white py-4 rounded-xl font-bold text-base hover:bg-brand-red-hover hover:-translate-y-0.5 active:scale-[0.99] transition-all shadow-lg shadow-brand-red/30 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
              )}
              {loading ? "Processing..." : `Pay ₹${priceINR}`}
            </button>

            <p className="flex items-center justify-center gap-2 text-xs text-neutral-text-secondary mt-4">
              <ShieldCheck size={14} className="text-brand-red" /> Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyCredits;