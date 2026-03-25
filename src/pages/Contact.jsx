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
    <div className="bg-gray-50 min-h-screen px-6 md:px-16 py-14">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">
          Contact Us
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

        {/* Contact Form */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <div className="flex mt-1">
                <select
                  name="code"
                  className="border rounded-l-lg px-3 bg-gray-100 focus:outline-none"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full p-3 border-t border-b border-r rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">

          {/* Phone */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <FaPhoneAlt className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600 text-sm">+91 98765 43210</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <FaEnvelope className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600 text-sm">
                support@touchsimply.com
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <FaMapMarkerAlt className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">Address</h4>
              <p className="text-gray-600 text-sm">
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