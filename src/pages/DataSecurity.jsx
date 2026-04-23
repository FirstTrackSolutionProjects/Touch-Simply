import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const DataSecurity = () => {
  const items = [
    { title: "Data Protection", desc: "We use industry-standard encryption to protect your data." },
    { title: "Secure Storage", desc: "Your information is stored securely with restricted access." },
    { title: "No Data Selling", desc: "We never sell or share your personal information." },
    { title: "User Control", desc: "You can update or delete your data anytime." },
    { title: "Regular Audits", desc: "We perform regular audits to ensure data security." },
    { title: "Compliance", desc: "We comply with all applicable laws and regulations." },
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-emerald-500/30 blur-3xl rounded-full"></div>

      {/* Hero */}
      <div className="text-center py-20 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold">Data Security</h1>
        <p className="text-gray-400 mt-4">
          Built with privacy-first architecture 🔐
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-6 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-green-400">
              {item.title}
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DataSecurity;