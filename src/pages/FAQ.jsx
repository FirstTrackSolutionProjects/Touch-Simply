import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
  {
    question: "What can I create on this platform?",
    answer:
      "You can create professional resumes, personal portfolios, and custom logos all in one place.",
  },
  {
    question: "How do I create a resume?",
    answer:
      "Choose a resume template, fill in your details, and download it instantly in PDF format.",
  },
  {
    question: "How do I build a portfolio?",
    answer:
      "You can create a portfolio by adding your projects, skills, and personal details. Your portfolio will be available as a shareable link.",
  },
  {
    question: "Can I design my own logo?",
    answer:
      "Yes, you can create custom logos using our logo builder with different styles, fonts, and icons.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, basic features are free. Some premium templates and advanced features may require payment.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Yes, creating an account allows you to save and manage your resumes, portfolios, and logos.",
  },
  {
    question: "What formats are available for download?",
    answer:
      "Resumes can be downloaded as PDF. Logos can be downloaded as image files (PNG). Portfolios are available via shareable links.",
  },
  {
    question: "Can I share my portfolio?",
    answer:
      "Yes, each portfolio comes with a unique shareable link that you can send to recruiters or clients.",
  },
  {
    question: "Are templates customizable?",
    answer:
      "Yes, you can customize colors, fonts, layouts, and content based on your needs.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes, your data is securely stored and we do not share it with third parties.",
  },
  {
    question: "Do you provide design suggestions?",
    answer:
      "Yes, we provide smart suggestions to improve your resume content, portfolio layout, and logo design.",
  },
  {
    question: "Is there a limit on downloads?",
    answer:
      "No, you can download your resumes and logos multiple times without restrictions.",
  },
  {
    question: "What if I face any issues?",
    answer:
      "You can contact our support team anytime and we will help you resolve the issue quickly.",
  },
];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      {/* HERO */}
      <div className="relative text-center py-16 md:py-24 px-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 mt-3 md:mt-4 max-w-xl mx-auto text-sm md:text-base">
          Everything you need to know about Touch Simply
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="relative max-w-4xl mx-auto px-4 md:px-6 pb-16 md:pb-24 space-y-4">

        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={index}
              layout
              className={`rounded-xl md:rounded-2xl border transition ${
                isOpen
                  ? "bg-white/10 border-purple-500 shadow-lg shadow-purple-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 md:p-5 text-left"
              >
                <span className="font-medium text-sm md:text-base pr-4">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FaChevronDown className="text-purple-400 text-sm md:text-base" />
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
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-5 pb-4 md:pb-5 text-gray-300 text-xs md:text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 🔥 CONTACT SECTION */}
      <div className="text-center pb-16 px-4">
        <h3 className="text-lg md:text-xl font-semibold">
          Still have questions?
        </h3>
        <p className="text-gray-400 mt-2 text-sm">
          We're here to help you anytime.
        </p>

        <button className="mt-4 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 transition text-sm">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;