import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a resume?",
      answer: "Choose a template, fill in your details, and download instantly.",
    },
    {
      question: "Is it free to use?",
      answer: "Yes, basic features are free. Premium templates may require payment.",
    },
    {
      question: "Can I edit after downloading?",
      answer: "Yes, you can edit anytime from your dashboard.",
    },
    {
      question: "Do I need an account?",
      answer: "Yes, an account is required to save your designs.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      {/* HERO */}
      <div className="relative text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          FAQs
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Everything you need to know about Touch Simply
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="relative max-w-3xl mx-auto px-4 pb-20 space-y-4">

        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={index}
              layout
              className={`rounded-2xl border backdrop-blur-xl transition ${
                isOpen
                  ? "bg-white/10 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-sm md:text-base">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-purple-400" />
                </motion.div>
              </button>

              {/* ANSWER */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;