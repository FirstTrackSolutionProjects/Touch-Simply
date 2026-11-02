import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaCommentDots } from "react-icons/fa";
import { Send, Loader2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import sendContactUs from "../services/contact/send_contact_us.contact.service";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const fields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your name", icon: <FaUser /> },
  { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com", icon: <FaEnvelope /> },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 00000 00000", icon: <FaPhoneAlt /> },
];

const contactItems = [
  { icon: <FaPhoneAlt />, title: "Phone", value: "+91 9040170727", href: "tel:+919040170727", action: "Call us" },
  { icon: <FaEnvelope />, title: "Email", value: "support@touchsimply.com", href: "mailto:support@touchsimply.com", action: "Write to us" },
  { icon: <FaMapMarkerAlt />, title: "Address", value: "Saheed Nagar, Bhubaneswar, Odisha, India", href: null, action: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendContactUs(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-neutral-bg border border-neutral-border rounded-xl py-3.5 pl-11 pr-4 text-neutral-text-primary placeholder-neutral-text-secondary/70 outline-none transition-all focus:bg-white focus:border-brand-red/60 focus:ring-4 focus:ring-brand-red/10";
  const labelCls = "block text-xs font-bold uppercase tracking-[0.15em] text-neutral-text-secondary mb-2";

  return (
    <div className="relative min-h-screen bg-neutral-bg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] max-w-full bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <motion.span
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/15 text-brand-red text-xs font-bold uppercase tracking-[0.18em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" /> Contact us
          </motion.span>
          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-text-primary tracking-tight leading-tight"
          >
            Get in <span className="text-brand-red">touch</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-5 text-neutral-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Have questions or ideas? We’d love to hear from you. Fill out the form and we’ll get back to you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-10 items-start">
          {/* ================= FORM ================= */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-3 relative overflow-hidden bg-white p-6 sm:p-10 rounded-[2rem] shadow-2xl shadow-black/5 border border-neutral-border"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-red/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute top-0 left-10 h-1.5 w-20 rounded-b-full bg-brand-red" />

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-text-primary tracking-tight">Send us a message</h2>
              <p className="text-neutral-text-secondary text-sm mt-1.5 mb-8">All fields are required.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {fields.slice(0, 2).map((f) => (
                    <div key={f.name}>
                      <label htmlFor={f.name} className={labelCls}>{f.label}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-text-secondary text-sm pointer-events-none">{f.icon}</span>
                        <input
                          id={f.name}
                          type={f.type}
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          className={inputCls}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="phone" className={labelCls}>{fields[2].label}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-text-secondary text-sm pointer-events-none">{fields[2].icon}</span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={fields[2].placeholder}
                      className={inputCls}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className={labelCls}>Your Message</label>
                    <span className="text-[11px] font-semibold text-neutral-text-secondary mb-2">{form.message.length} chars</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-neutral-text-secondary text-sm pointer-events-none"><FaCommentDots /></span>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell us how we can help..."
                      className={`${inputCls} resize-none`}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full flex items-center justify-center gap-2 bg-brand-red text-white font-bold py-4 rounded-xl hover:bg-brand-red-hover hover:-translate-y-0.5 active:scale-[0.99] transition-all shadow-lg shadow-brand-red/30 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ================= INFO ================= */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Dark intro card */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="relative overflow-hidden bg-brand-black rounded-3xl p-7 text-white shadow-xl shadow-black/10 ring-1 ring-white/5"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/40 blur-3xl rounded-full pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                  Let’s talk about <span className="text-brand-red">your idea</span>
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Questions, feedback or partnership? Reach us through any of the channels below.
                </p>
              </div>
            </motion.div>

            {contactItems.map((item, i) => {
              const Wrapper = item.href ? "a" : "div";
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i + 2}
                  variants={fadeUp}
                >
                  <Wrapper
                    {...(item.href ? { href: item.href } : {})}
                    className="group relative flex items-start gap-5 p-6 bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-red/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-brand-red scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-red/10 text-brand-red text-lg flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-red/30 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-neutral-text-primary">{item.title}</h4>
                      <p className="text-neutral-text-secondary mt-1 text-sm md:text-base break-words">{item.value}</p>
                      {item.action && (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-brand-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          {item.action} <ArrowUpRight size={14} />
                        </span>
                      )}
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}