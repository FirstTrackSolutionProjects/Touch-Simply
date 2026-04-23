import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* 🔥 BACKGROUND GRADIENT BLOBS */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative px-6 md:px-16 py-20 max-w-6xl mx-auto">

        {/* 🔥 HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get in touch
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Have questions or ideas? We’d love to hear from you. Fill out the form and we’ll get back to you.
          </p>
        </motion.div>

        {/* 🔥 MAIN GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >

          {/* 🔥 FORM */}
          <motion.div
            variants={fadeUp}
            className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Send a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                onChange={handleChange}
                required
              />

              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:scale-[1.02] transition shadow-lg">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* 🔥 CONTACT INFO */}
          <motion.div
            variants={stagger}
            className="flex flex-col justify-center gap-6"
          >

            {[ 
              {
                icon: <FaPhoneAlt />,
                title: "Phone",
                value: "+91 98765 43210",
              },
              {
                icon: <FaEnvelope />,
                title: "Email",
                value: "support@touchsimply.com",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Address",
                value: "Bhubaneswar, Odisha, India",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                className="flex items-start gap-4 p-6 rounded-xl border bg-white shadow-md hover:shadow-xl transition"
              >
                <div className="text-purple-600 text-lg mt-1">
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}

          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};

export default Contact;