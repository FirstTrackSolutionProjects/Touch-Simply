import React from "react";
import { FaBolt, FaPaintBrush, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* 🔥 WHO WE ARE */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* IMAGE */}
          <motion.img
            variants={fadeUp}
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="about"
            className="rounded-2xl shadow-lg hover:scale-[1.02] transition duration-500"
          />

          {/* TEXT BLOCK */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-2xl shadow-md p-8 border">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About Touch Simply
              </h1>

              <p className="text-gray-600 leading-relaxed text-md">
                <span className="font-semibold text-gray-800 text-lg">
                  First Track Solution Technologies
                </span>{" "}
                is a growing tech company focused on simplifying digital experiences.
              </p>

              <p className="mt-4 text-gray-600">
                <span className="text-indigo-600 font-medium">
                  Touch Simply
                </span>{" "}
                helps users create impactful resumes quickly and effortlessly.
              </p>

              <p className="mt-4 text-gray-600">
                We focus on speed, simplicity, and great design.
              </p>
            </div>

            {/* EXTRA TEXT */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Who We Are
              </h2>

              <p className="text-gray-600">
                A passionate team building user-friendly tools that make complex tasks simple.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* 🔥 MISSION & VISION */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {[
            {
              title: "Our Mission",
              color: "text-indigo-600",
              text: "Empower individuals with tools to showcase their skills confidently.",
            },
            {
              title: "Our Vision",
              color: "text-purple-600",
              text: "Become a global platform for professional resume creation.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border"
            >
              <h3 className={`text-xl font-semibold mb-3 ${item.color}`}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 WHY CHOOSE US */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-gray-900">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[FaBolt, FaPaintBrush, FaFileAlt].map((Icon, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl mb-4">
                  <Icon />
                </div>

                <h4 className="font-semibold mb-2 text-gray-800">
                  {["Fast & Easy", "Modern Design", "ATS Optimized"][i]}
                </h4>

                <p className="text-gray-600 text-sm">
                  {[
                    "Create resumes in minutes",
                    "Clean templates that stand out",
                    "Built for ATS systems",
                  ][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🔥 STATS */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-700 via-purple-800 to-indigo-900 text-white rounded-2xl p-12 text-center shadow-lg"
        >
          <div className="grid sm:grid-cols-3 gap-8">
            {["10K+", "5K+", "50+"].map((num, i) => (
              <motion.div key={i} variants={fadeUp}>
                <h3 className="text-4xl font-bold">{num}</h3>
                <p className="text-sm text-gray-200 mt-1">
                  {["Resumes Created", "Happy Users", "Templates"][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;