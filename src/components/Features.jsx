import React from "react";
import { FaBolt, FaPaintBrush, FaFilePdf, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  { icon: <FaBolt />, title: "Easy Editor", desc: "Drag & drop builder with real-time preview." },
  { icon: <FaPaintBrush />, title: "Modern Templates", desc: "Beautiful, job-ready resume designs." },
  { icon: <FaFilePdf />, title: "PDF Export", desc: "Download your resume instantly as PDF." },
  { icon: <FaSave />, title: "Auto Save", desc: "Your data is saved automatically." },
];

const Features = () => {
  return (
    <section className="relative py-24 bg-neutral-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary">
            Powerful Features
          </h2>
          <p className="text-neutral-text-secondary mt-4 text-lg">
            Everything you need to build a professional resume effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-white border border-neutral-border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-brand-red/30 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-red/5 text-brand-red text-2xl mb-6 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-neutral-text-primary mb-2">
                {f.title}
              </h3>
              <p className="text-neutral-text-secondary text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;