import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

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
    <div className="bg-gray-50 min-h-screen px-6 md:px-16 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-600">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            {/* Phone with STD Code */}
            <div className="flex">
              <select
                name="code"
                className="border rounded-l-md px-3 bg-gray-100"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border-t border-b border-r rounded-r-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">support@touchsimply.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-600">
                Bhubaneswar, Odisha, India
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;