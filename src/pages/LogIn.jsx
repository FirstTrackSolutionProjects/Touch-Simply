import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", form);

    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    // 👉 Connect Google Auth here
    alert("Google Login Clicked");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT SIDE (IMAGE / BRANDING) */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-gray-200">
            Login to continue building your professional resume and land your dream job.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
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
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            {/* Password with toggle */}
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

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;