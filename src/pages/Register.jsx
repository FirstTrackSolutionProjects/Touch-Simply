import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setForm({ ...form, phone: value });
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // 🔥 Password Checks
  const checks = {
    length: form.password.length >= 6,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const getStrength = () => {
    const passed = Object.values(checks).filter(Boolean).length;

    if (passed <= 1) return "Weak";
    if (passed <= 3) return "Medium";
    return "Strong";
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checks.length) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!checks.uppercase || !checks.number) {
      alert("Add uppercase & number");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registered Successfully 🚀");
  };

  // 🔥 Dynamic Rule UI
  const Rule = ({ ok, text }) => (
    <p className={`flex items-center gap-2 text-sm ${ok ? "text-green-600" : "text-gray-400"}`}>
      <span>{ok ? "✔" : "•"}</span> {text}
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
            required
          />

          {/* PHONE */}
          <div className="flex border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-3 bg-gray-100 border-r">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="w-5"
              />
              <span className="text-sm font-medium">+91</span>
            </div>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* 🔥 SHOW ONLY WHEN USER TYPES */}
          {form.password && (
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">

              <p className="text-sm font-semibold">
                Password Strength:{" "}
                <span
                  className={
                    getStrength() === "Strong"
                      ? "text-green-600"
                      : getStrength() === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }
                >
                  {getStrength()}
                </span>
              </p>

              <Rule ok={checks.length} text="Minimum 6 characters" />
              <Rule ok={checks.uppercase} text="One uppercase letter" />
              <Rule ok={checks.number} text="One number" />
              <Rule ok={checks.special} text="One special character" />

            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* BUTTON */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition">
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;