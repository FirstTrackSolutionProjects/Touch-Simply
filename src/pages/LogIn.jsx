import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser, googleLoginUser } from "../services/authServices";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-6 md:py-8">
      
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[480px] md:min-h-[500px]">
        
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8 lg:p-12 flex-col justify-between text-white relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <img src="/images/logo.png" alt="logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              <span className="text-xl lg:text-2xl font-bold">Touch Simply</span>
            </Link>
            
            <div className="mt-12 lg:mt-16">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Welcome Back! 👋
              </h1>
              <p className="mt-3 lg:mt-4 text-purple-100 text-base lg:text-lg leading-relaxed">
                Continue building your professional journey with us.
              </p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 text-purple-100">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-xs lg:text-sm font-medium">Secure • Fast • Reliable</span>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center">
          
          {/* Mobile Branding - Fixed */}
          <div className="w-full">
            <div className="text-center md:hidden mb-6">
              <Link to="/" className="inline-flex flex-col items-center gap-1 hover:opacity-90 transition">
                <img 
                  src="/images/logo.png" 
                  alt="Touch Simply" 
                  className="w-14 h-14 object-contain mb-1" 
                />
                <span className="text-xl font-bold text-gray-800 tracking-wide">
                  Touch Simply
                </span>
              </Link>
            </div>
            
            <div className="w-full max-w-sm mx-auto">
              <div className="hidden md:block">
                <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                <p className="text-gray-500 mt-1 text-sm">Access your account to continue</p>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">⚠️</span>
                  <span className="flex-1">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
                
                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-gray-50/50 hover:bg-white text-sm md:text-base"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Link to="/forgot-password" className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-medium transition">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-gray-50/50 hover:bg-white text-sm md:text-base"
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <FaEyeSlash size={16} className="md:w-[18px] md:h-[18px]" /> : <FaEye size={16} className="md:w-[18px] md:h-[18px]" />}
                    </button>
                  </div>
                </div>
                
                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-xs md:text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    Remember me
                  </label>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 md:py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              
              {/* Divider */}
              <div className="flex items-center gap-3 md:gap-4 my-4 md:my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs md:text-sm text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              {/* Google Login */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const data = await googleLoginUser(credentialResponse.credential);
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("user", JSON.stringify(data.user));
                      navigate("/dashboard");
                    } catch (error) {
                      setError(error?.response?.data?.message || "Google Login Failed");
                    }
                  }}
                  onError={() => {
                    setError("Google Login Failed");
                  }}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="pill"
                  width="100%"
                  containerProps={{
                    style: { width: '100%' }
                  }}
                />
              </div>
              
              {/* Register Link */}
              <p className="text-center text-xs md:text-sm text-gray-500 mt-4 md:mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-purple-600 font-semibold hover:text-purple-700 transition">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;