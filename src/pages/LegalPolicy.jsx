import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "compliance",
    title: "Compliance",
    desc: "We comply with all applicable laws and regulations governing digital platforms and data handling.",
  },
  {
    id: "rights",
    title: "Intellectual Property Rights",
    desc: "All templates, designs, and content provided on this platform are protected under applicable intellectual property laws.",
  },
  {
    id: "responsibility",
    title: "User Responsibility",
    desc: "Users are solely responsible for the content they create, share, or distribute using our platform.",
  },
  {
    id: "dispute",
    title: "Dispute Resolution",
    desc: "Any disputes arising shall be subject to the jurisdiction of courts located in India.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    desc: "We are not liable for any indirect, incidental, or consequential damages arising from platform usage.",
  },
  {
    id: "changes",
    title: "Changes to Policy",
    desc: "We reserve the right to update or modify this policy at any time without prior notice.",
  },
];

const LegalPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Legal Policy</h1>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Please review our legal terms carefully before using the platform.
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* 🔥 SIDEBAR */}
        <div className="hidden md:block sticky top-24 h-fit">
          <div className="bg-white p-5 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 text-gray-800">
              On this page
            </h3>

            <ul className="space-y-2 text-sm">
              {sections.map((sec, i) => (
                <li key={i}>
                  <a
                    href={`#${sec.id}`}
                    className="text-gray-600 hover:text-purple-600 transition"
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

          {sections.map((item, i) => (
            <motion.div
              key={i}
              id={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {i + 1}. {item.title}
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;