import React from "react";
import { FaBolt, FaPaintBrush, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-text-primary">
            About <span className="text-brand-red">Touch Simply</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-text-secondary">
            A growing tech company focused on simplifying digital experiences.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[
            { title: "Our Mission", text: "Empower individuals with tools to showcase their skills confidently." },
            { title: "Our Vision", text: "Become a global platform for professional resume creation." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-bg p-10 rounded-3xl border border-neutral-border"
            >
              <h3 className="text-2xl font-bold text-neutral-text-primary mb-4">{item.title}</h3>
              <p className="text-neutral-text-secondary leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-extrabold mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: <FaBolt />, title: "Fast & Easy", desc: "Create resumes in minutes" },
              { icon: <FaPaintBrush />, title: "Modern Design", desc: "Templates that stand out" },
              { icon: <FaFileAlt />, title: "ATS Optimized", desc: "Built for tracking systems" },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-neutral-border rounded-2xl hover:shadow-lg transition">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-brand-red/10 text-brand-red text-xl mb-6">
                  {item.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-neutral-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;