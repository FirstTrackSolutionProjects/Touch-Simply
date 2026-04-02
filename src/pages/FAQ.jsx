import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // first open

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

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-14 md:py-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Everything you need to know about our platform
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">

        <div className="space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-sm transition"
              >

                {/* Question */}
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center p-4 md:p-5 text-left"
                >
                  <span className="font-medium text-gray-900 text-sm md:text-base">
                    {faq.question}
                  </span>

                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-purple-600" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40 px-4 md:px-5 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default FAQ;