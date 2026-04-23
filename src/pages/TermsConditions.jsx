import React from "react";
import { motion } from "framer-motion";

const TermsConditions = () => {
  const sections = [
    {
      title: "Use of Service",
      desc: "You agree to use our platform lawfully.",
    },
    {
      title: "User Accounts",
      desc: "You are responsible for maintaining account security.",
    },
    {
      title: "Intellectual Property",
      desc: "All designs & templates belong to Touch Simply.",
    },
    {
      title: "Payments",
      desc: "Paid features follow billing and refund rules.",
    },
    {
      title: "Liability",
      desc: "We are not liable for indirect damages.",
    },
    {
      title: "Termination",
      desc: "Accounts may be suspended for violations.",
    },
    {
      title: "Changes",
      desc: "Terms may be updated anytime.",
    },
    {
      title: "Jurisdiction",
      desc: "Governed by Indian law.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 to-black text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-purple-500/30 blur-3xl -translate-x-1/2"></div>

      {/* Hero */}
      <div className="text-center py-20 relative z-10">
        <h1 className="text-5xl font-bold">Terms & Conditions</h1>
        <p className="text-gray-400 mt-4">
          Clear rules for a smooth experience
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-6 relative z-10">
        {sections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold text-purple-400">
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

export default TermsConditions;