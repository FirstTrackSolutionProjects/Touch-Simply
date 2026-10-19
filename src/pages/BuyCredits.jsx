// Touch-Simply/src/pages/BuyCredits.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Loader2 } from "lucide-react";
import {
  createRechargeOrder,
  verifyRechargePayment,
  getWalletBalance,
} from "../services/walletService";

// Conversion: 1 credit = ₹7 (matches "28 Rupees ~ 4 credits" in diagram → ₹7/credit)
const RATE_PER_CREDIT = 7;

const PACKS = [
  { credits: 4, label: "Starter" },
  { credits: 10, label: "Popular" },
  { credits: 25, label: "Pro" },
  { credits: 50, label: "Business" },
];

const BuyCredits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(4);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const credits = custom ? Math.max(1, parseInt(custom) || 1) : selected;
  const priceINR = credits * RATE_PER_CREDIT;

  const handleBuy = async () => {
    setLoading(true);
    try {
      const orderRes = await createRechargeOrder({
        paymentGatewayID: "razorpay",
        amount: priceINR,
        currency: "INR",
      });
      const orderId = orderRes.data?.orderId;
      if (!orderId) throw new Error("Failed to create order");

      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "test",
        amount: priceINR * 100,
        currency: "INR",
        name: "Touch Simply",
        description: `${credits} credits`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await verifyRechargePayment({
              paymentGatewayID: "razorpay",
              paymentId: response.razorpay_payment_id,
            });
            const w = await getWalletBalance();
            toast.success(
              `Credits added! New balance: ${w.data?.balance}`
            );
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Buy Credits
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Credits are used to download your designs. 1 credit = ₹
          {RATE_PER_CREDIT}
        </p>

        {/* Packs */}
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

        {/* Custom amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter custom credits
          </label>
          <input
            type="number"
            min={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="e.g. 15"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Total */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-6">
          <div>
            <p className="text-xs text-gray-500">You will receive</p>
            <p className="text-lg font-bold">{credits} credits</p>
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
          disabled={loading}
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