import React from "react";
import { motion } from "framer-motion";

const RefundCancellation = () => {
  const sections = [
    {
      title: "Cancellation",
      desc: "Cancel anytime. Access remains till billing ends.",
    },
    {
      title: "Refund Eligibility",
      desc: "Only valid cases like duplicate or failed transactions.",
    },
    {
      title: "Non-Refundable",
      desc: "No refunds for partial use or change of mind.",
    },
    {
      title: "Processing Time",
      desc: "Refunds processed in 5–10 business days.",
    },
    {
      title: "Updates",
      desc: "Policy may change anytime.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Gradient Glow */}
      <div className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] bg-orange-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-red-500/30 blur-3xl rounded-full"></div>

      {/* Hero */}
      <div className="text-center py-20 relative z-10">
        <h1 className="text-5xl font-bold">Refund Policy</h1>
        <p className="text-gray-400 mt-4">
          Transparent & fair policies for everyone
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-6 relative z-10">
        {sections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold text-orange-400">
              {i + 1}. {item.title}
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RefundCancellation;