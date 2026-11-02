import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import {
  createRechargeOrder,
  verifyRechargePayment,
  getWalletBalance,
} from "../services/walletService";

const RATE_PER_CREDIT = 7;
const MIN_CREDITS_PURCHASE = 4;

const PACKS = [
  { credits: MIN_CREDITS_PURCHASE, label: "Starter" },
  { credits: 10, label: "Popular" },
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
        theme: { color: "#7c3aed" },
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <button
          type="button"
          onClick={() => navigate(location.state?.from || "/dashboard")}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-purple-700"
        >
          <ArrowLeft size={17} /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Buy Coins
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Coins are used to download your designs. 1 download = 4 coins (₹
          {4 * RATE_PER_CREDIT}).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {PACKS.map((p) => (
            <button
              key={p.credits}
              onClick={() => {
                setSelected(p.credits);
                setCustom("");
              }}
              className={`p-4 rounded-xl border-2 transition text-center ${
                selected === p.credits && !custom
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <p className="text-lg font-bold text-gray-900">{p.credits}</p>
              <p className="text-xs text-gray-500">{p.label}</p>
              <p className="text-sm font-semibold text-purple-600 mt-2">
                ₹{p.credits * RATE_PER_CREDIT}
              </p>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter a custom amount (min. {MIN_CREDITS_PURCHASE} coins)
          </label>
          <input
            type="number"
            min={MIN_CREDITS_PURCHASE}
            value={custom}
            onChange={handleCustomChange}
            placeholder={`e.g. 15`}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          {custom && credits < MIN_CREDITS_PURCHASE && (
            <p className="text-xs text-red-500 mt-2">Minimum purchase is {MIN_CREDITS_PURCHASE} coins.</p>
          )}
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-6">
          <div>
            <p className="text-xs text-gray-500">You will receive</p>
            <p className="text-lg font-bold">{isNaN(credits) || credits < MIN_CREDITS_PURCHASE ? "—" : credits} coins</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-bold text-purple-600">
              ₹{priceINR}
            </p>
          </div>
        </div>

        <button
          onClick={handleBuy}
          disabled={loading || isNaN(credits) || credits < MIN_CREDITS_PURCHASE}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <CreditCard size={18} />
          )}
          {loading ? "Processing..." : `Pay ₹${priceINR}`}
        </button>
      </div>
    </div>
  );
};

export default BuyCredits;
