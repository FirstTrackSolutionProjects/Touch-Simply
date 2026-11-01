import React from "react";
import { FaMoneyBillWave, FaChartLine, FaBolt, FaPalette, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  { icon: <FaMoneyBillWave />, title: "Free to Use", desc: "No hidden charges. Build and download resumes for free." },
  { icon: <FaChartLine />, title: "ATS Friendly", desc: "Optimized formats to pass Applicant Tracking Systems." },
  { icon: <FaBolt />, title: "Fast & Easy", desc: "Create a professional resume in just a few minutes." },
  { icon: <FaPalette />, title: "Professional Templates", desc: "Choose from a wide range of professionally designed templates." },
];

const Benefits = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary leading-tight">
              Why Choose <span className="text-brand-red">Touch Simply</span>?
            </h2>
            <p className="text-neutral-text-secondary mt-4 text-lg">
              We make resume building simple, fast, and effective so you can focus on landing your dream job.
            </p>
            <ul className="mt-8 space-y-4">
              {["Easy to use interface", "Professional templates", "Instant download"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-text-primary font-medium group">
                  <div className="bg-brand-red/10 p-1.5 rounded-full text-brand-red group-hover:scale-110 transition-transform">
                    <FaCheckCircle size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Cards */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-neutral-bg border border-neutral-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-red/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-neutral-border text-brand-red text-xl mb-5 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg text-neutral-text-primary mb-2">
                  {b.title}
                </h3>
                <p className="text-neutral-text-secondary text-sm leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;