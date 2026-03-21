import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    code: "+91",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Register Data:", form);

    navigate("/login");
  };

  const handleGoogleSignup = () => {
    alert("Google Signup Clicked");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-600 to-blue-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Join Touch Simply 🚀</h1>
          <p className="text-gray-200">
            Create your account and start building professional resumes in minutes.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create your account
          </h2>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border py-3 rounded-md hover:bg-gray-100 transition mb-4"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

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
              placeholder="Email address"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            {/* Phone with STD */}
            <div className="flex">
              <select
                name="code"
                value={form.code}
                onChange={handleChange}
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

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            {/* Terms */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required />
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>
            </label>

            <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
              Register
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;