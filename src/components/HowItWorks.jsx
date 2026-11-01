import React from "react";
import { FaPaintBrush, FaPenFancy, FaFileDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  { icon: <FaPaintBrush />, title: "Choose Template", desc: "Select from modern, professional resume designs." },
  { icon: <FaPenFancy />, title: "Add Information", desc: "Fill in your details, experience, and skills." },
  { icon: <FaFileDownload />, title: "Download Resume", desc: "Export your resume instantly as PDF." },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-neutral-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text-primary">
            How It Works
          </h2>
          <p className="text-neutral-text-secondary mt-4 text-lg">
            Build your professional resume in just 3 simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-neutral-border -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="relative bg-white border border-neutral-border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 z-10 flex flex-col items-center group"
            >
              <div className="absolute -top-4 bg-brand-red text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                Step {i + 1}
              </div>
              
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red text-2xl mb-6 mt-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold text-neutral-text-primary mb-3">
                {step.title}
              </h3>
              
              <p className="text-neutral-text-secondary text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;