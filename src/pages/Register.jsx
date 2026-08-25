import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { registerUser } from "../services/authServices";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setForm({ ...form, phone: value });
      }
      return;
    }
    setForm({ ...form, [name]: value });
    setError("");
  };

  const checks = {
    length: form.password.length >= 6,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const getStrength = () => {
    const passed = Object.values(checks).filter(Boolean).length;
    if (passed <= 1) return { label: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (passed <= 3) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const getStrengthWidth = () => {
    const passed = Object.values(checks).filter(Boolean).length;
    return (passed / 4) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checks.length) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!checks.uppercase || !checks.number) {
      setError("Add uppercase & number");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      };

      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const Rule = ({ ok, text }) => (
    <p className={`flex items-center gap-1.5 md:gap-2 text-xs md:text-sm ${ok ? "text-green-600" : "text-gray-400"}`}>
      {ok ? <FaCheckCircle size={12} className="md:w-[14px] md:h-[14px]" /> : <FaTimesCircle size={12} className="md:w-[14px] md:h-[14px] text-gray-300" />}
      {text}
    </p>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-6 md:py-8">
      
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[520px] md:min-h-[550px]">
        
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
                Create Account 🚀
              </h1>
              <p className="mt-3 lg:mt-4 text-purple-100 text-base lg:text-lg leading-relaxed">
                Start building your professional presence today.
              </p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 text-purple-100">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-xs lg:text-sm font-medium">Free • Secure • Professional</span>
            </div>
          </div>
        </div>
        
        {/* Right Side - Registration Form */}
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
                <h2 className="text-2xl font-bold text-gray-800">Register</h2>
                <p className="text-gray-500 mt-1 text-sm">Join our community today</p>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">⚠️</span>
                  <span className="flex-1">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-gray-50/50 hover:bg-white text-sm md:text-base"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
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
                
                {/* Phone Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-gray-50/50 hover:bg-white text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create password"
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
                
                {/* Password Strength */}
                {form.password && (
                  <div className="bg-gray-50/70 rounded-xl p-3 md:p-4 space-y-2 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm font-medium">Password Strength:</p>
                      <span className={`text-xs md:text-sm font-semibold ${getStrength().color}`}>
                        {getStrength().label}
                      </span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getStrength().bg}`}
                        style={{ width: `${getStrengthWidth()}%` }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-0.5 md:gap-1 mt-1 md:mt-2">
                      <Rule ok={checks.length} text="Min 6 characters" />
                      <Rule ok={checks.uppercase} text="Uppercase letter" />
                      <Rule ok={checks.number} text="One number" />
                      <Rule ok={checks.special} text="Special character" />
                    </div>
                  </div>
                )}
                
                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-gray-50/50 hover:bg-white text-sm md:text-base"
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showConfirm ? <FaEyeSlash size={16} className="md:w-[18px] md:h-[18px]" /> : <FaEye size={16} className="md:w-[18px] md:h-[18px]" />}
                    </button>
                  </div>
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-xs md:text-sm text-red-500 flex items-center gap-1 mt-1">
                      <FaTimesCircle size={12} className="md:w-[14px] md:h-[14px]" /> Passwords do not match
                    </p>
                  )}
                  {form.confirmPassword && form.password === form.confirmPassword && form.password.length > 0 && (
                    <p className="text-xs md:text-sm text-green-600 flex items-center gap-1 mt-1">
                      <FaCheckCircle size={12} className="md:w-[14px] md:h-[14px]" /> Passwords match
                    </p>
                  )}
                </div>
                
                {/* Terms */}
                <div className="flex items-start gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    required
                  />
                  <label htmlFor="terms" className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-600 hover:text-purple-700 font-medium transition">
                      Terms & Conditions
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy-policy" className="text-purple-600 hover:text-purple-700 font-medium transition">
                      Privacy Policy
                    </Link>
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
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
              
              {/* Login Link */}
              <p className="text-center text-xs md:text-sm text-gray-500 mt-4 md:mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;