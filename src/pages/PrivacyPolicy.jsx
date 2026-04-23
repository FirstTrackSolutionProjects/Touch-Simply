import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "info",
    title: "Information We Collect",
    content: [
      "Account details (name, email address)",
      "Resume data (education, experience, skills)",
      "Usage data (pages visited, actions performed)",
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    content: [
      "To create and manage your resumes",
      "To improve user experience and features",
      "To send important updates and notifications",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    text: "We use cookies and similar technologies to enhance user experience and analyze usage.",
  },
  {
    id: "security",
    title: "Data Security",
    text: "We implement strong security measures to protect your data from unauthorized access.",
  },
  {
    id: "thirdparty",
    title: "Third-Party Services",
    text: "Some services like analytics and payments may be handled by trusted third-party providers.",
  },
  {
    id: "rights",
    title: "Your Rights",
    content: [
      "Access your personal data",
      "Update or correct your information",
      "Request account deletion",
    ],
  },
  {
    id: "changes",
    title: "Changes to Policy",
    text: "We may update this policy anytime. Changes will be reflected on this page.",
  },
  {
    id: "contact",
    title: "Contact Us",
    text: "support@touchsimply.com",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Privacy Policy
        </h1>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto">
          We respect your privacy and are committed to protecting your data.
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* 🔥 SIDEBAR */}
        <div className="hidden md:block sticky top-24 h-fit">
          <div className="bg-white p-5 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 text-gray-800">
              Quick Navigation
            </h3>

            <ul className="space-y-2 text-sm">
              {sections.map((sec, i) => (
                <li key={i}>
                  <a
                    href={`#${sec.id}`}
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {i + 1}. {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🔥 CONTENT */}
        <div className="md:col-span-3 space-y-10">

          {/* INTRO */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold text-gray-800">Touch Simply</span>, 
              we prioritize your privacy and ensure transparency in how your data is handled.
            </p>
          </div>

          {/* SECTIONS */}
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              id={sec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {i + 1}. {sec.title}
              </h2>

              {/* LIST */}
              {sec.content && (
                <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                  {sec.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {/* TEXT */}
              {sec.text && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {sec.text}
                </p>
              )}
            </motion.div>
          ))}

        </div>
      </div>

      

    </div>
  );
};

export default PrivacyPolicy;