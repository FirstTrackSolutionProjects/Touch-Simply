import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { loginUser } from "../services/authServices";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {

    const data = await loginUser(form);

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
       alert("Login Successful 🚀");

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    alert(
      error?.response?.data?.message ||
      "Login Failed"
    );
  }
};

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-100">

      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-gray-200 text-lg">
          Continue building and managing your professional designs effortlessly.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password" className="text-purple-600">
                Forgot Password?
              </Link>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition">
              Login
            </button>
          </form>

            {/* Divider */}
          <div className="flex items-center gap-2 mt-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

            {/* Google */}
          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition mt-5">
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-5">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-600 font-medium">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

