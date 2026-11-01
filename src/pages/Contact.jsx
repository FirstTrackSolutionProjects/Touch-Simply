import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import sendContactUs from "../services/contact/send_contact_us.contact.service";

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

  return (
    <div className="min-h-screen bg-neutral-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-text-primary">Get in touch</h1>
          <p className="mt-4 text-neutral-text-secondary max-w-xl mx-auto">
            Have questions or ideas? We’d love to hear from you. Fill out the form and we’ll get back to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-4 bg-neutral-bg border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                  required
                />
              ))}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 bg-neutral-bg border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-red text-white font-bold py-4 rounded-xl hover:bg-brand-red-hover transition-all disabled:opacity-70"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center gap-6">
            {[
              { icon: <FaPhoneAlt />, title: "Phone", value: "+91 9040170727" },
              { icon: <FaEnvelope />, title: "Email", value: "support@touchsimply.com" },
              { icon: <FaMapMarkerAlt />, title: "Address", value: "Saheed Nagar, Bhubaneswar, Odisha, India" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-neutral-border shadow-sm hover:shadow-md transition">
                <div className="text-brand-red text-xl mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-neutral-text-primary">{item.title}</h4>
                  <p className="text-neutral-text-secondary mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};