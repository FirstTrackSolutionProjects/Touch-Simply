import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Send } from "lucide-react";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sendContactUs from "../services/contact/send_contact_us.contact.service";
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
export default function ContactPage() {
  const INITIAL_CONTACT_FORM_STATE = Object.freeze({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [form, setForm] = useState(INITIAL_CONTACT_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  
  // 1. Uncomment the loading state
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      
      // 2. Use 'form' instead of 'formData', as that is your active state variable
      // Note: Ensure `sendContactUs` is imported at the top of your file!
      await sendContactUs(form); //send actual form data to backend
      
      // 3. Trigger your success UI by setting submitted to true 
      // (This replaces the commented out setFormData logic)
      setSubmitted(true); 
      
      // Note: Ensure `toast` is imported (e.g., from 'react-hot-toast' or 'react-toastify')
      toast.success("Message sent successfully");
    } catch (error) {
      console.error(error.message || "Something Went Wrong");
      toast.error(error.message || "Failed to send message")
    } finally {
      setLoading(false); //finally block ensures loading is reset regardless of success or failure(alwaye executed with try and catch block)
    }
  }

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
            {/* <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Send a message
            </h2> */}

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

                  {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-white font-black text-sm tracking-wide py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_4px_24px_rgba(250,204,21,0.3)] hover:shadow-[0_6px_32px_rgba(250,204,21,0.45)] mt-1 group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none" />
                      <Send size={16} />
                      {loading ? "Sending..." : "Send Message"}
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
                value: "+91 9040170727",
              },
              {
                icon: <FaEnvelope />,
                title: "Email",
                value: "support@touchsimply.com",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Address",
                value: "Saheed Nagar, Bhubaneswar, Odisha, India",
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
