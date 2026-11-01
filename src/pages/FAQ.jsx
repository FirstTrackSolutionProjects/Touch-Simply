import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "What can I create on this platform?", answer: "You can create professional resumes, personal portfolios, and custom logos all in one place." },
    { question: "How do I create a resume?", answer: "Choose a resume template, fill in your details, and download it instantly in PDF format." },
    { question: "Can I design my own logo?", answer: "Yes, you can create custom logos using our logo builder with different styles, fonts, and icons." },
    { question: "Is it free to use?", answer: "Yes, basic features are free. Downloading a resume costs a few credits, and you get 10 free credits when you sign up." },
    { question: "What formats are available for download?", answer: "Resumes can be downloaded as PDF. Logos can be downloaded as image files (PNG)." },
    { question: "Are templates customizable?", answer: "Yes, you can customize colors, fonts, layouts, and content based on your needs." },
    { question: "Is my data safe?", answer: "Yes, your data is securely stored and we do not share it with third parties." },
  ];

  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="min-h-screen bg-neutral-bg py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-text-primary">Frequently Asked Questions</h1>
          <p className="text-neutral-text-secondary mt-4 text-lg">Everything you need to know about Touch Simply.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? "border-brand-red shadow-md" : "border-neutral-border hover:border-gray-300"}`}>
                <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center p-6 text-left">
                  <span className="font-semibold text-neutral-text-primary">{faq.question}</span>
                  <FaChevronDown className={`text-brand-red transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-neutral-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 bg-white p-10 rounded-3xl border border-neutral-border shadow-sm">
          <h3 className="text-2xl font-bold text-neutral-text-primary">Still have questions?</h3>
          <p className="text-neutral-text-secondary mt-2">We're here to help you anytime.</p>
          <Link to="/contact" className="mt-6 inline-block bg-brand-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-red-hover transition">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;