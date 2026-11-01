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

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) setForm({ ...form, phone: value });
      return;
    }
    setForm({ ...form, [name]: value });
    setError("");
  };

  const checks = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const getStrength = () => {
    const passed = Object.values(checks).filter(Boolean).length;
    if (passed <= 1) return { label: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (passed <= 3) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const getStrengthWidth = () => (Object.values(checks).filter(Boolean).length / 5) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checks.length) return setError("Password must be at least 8 characters");
    if (!checks.uppercase || !checks.lowercase || !checks.number) return setError("Add uppercase, lowercase & number");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    setError("");
    try {
      const nameParts = form.name.trim().split(/\s+/).filter(Boolean);
      const first_name = nameParts.shift() || "";
      const last_name = nameParts.pop() || "";
      const userData = {
        first_name, middle_name: nameParts.join(" "), last_name,
        email: form.email, password: form.password, confirm_password: form.confirmPassword,
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
    <p className={`flex items-center gap-1.5 text-xs md:text-sm ${ok ? "text-green-600" : "text-gray-400"}`}>
      {ok ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} className="text-gray-300" />}
      {text}
    </p>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-bg flex items-center justify-center px-4 py-6 md:py-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[520px] md:min-h-[550px] border border-neutral-border">
        
        <div className="hidden md:flex md:w-1/2 bg-brand-black p-8 lg:p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <img src="/images/logo.png" alt="logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              <span className="text-xl lg:text-2xl font-bold tracking-tight">Touch Simply</span>
            </Link>
            
            <div className="mt-12 lg:mt-16">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Create Account 🚀
              </h1>
              <p className="mt-3 lg:mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">
                Start building your professional presence today.
              </p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-brand-red"></div>
              <span className="text-xs lg:text-sm font-medium">Free • Secure • Professional</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center">
          <div className="w-full">
            <div className="text-center md:hidden mb-6">
              <Link to="/" className="inline-flex flex-col items-center gap-1 hover:opacity-90 transition">
                <img src="/images/logo.png" alt="Touch Simply" className="w-14 h-14 object-contain mb-1" />
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-brand-red">Touch</span>
                  <span className="text-neutral-text-primary"> Simply</span>
                </span>
              </Link>
            </div>
            
            <div className="w-full max-w-sm mx-auto">
              <div className="hidden md:block">
                <h2 className="text-2xl font-bold text-neutral-text-primary">Register</h2>
                <p className="text-neutral-text-secondary mt-1 text-sm">Join our community today</p>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">⚠️</span>
                  <span className="flex-1">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                {["name", "email", "phone"].map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="text-sm font-medium text-neutral-text-primary">
                      {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                    </label>
                    <div className="relative">
                      {field === "name" && <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
                      {field === "email" && <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
                      {field === "phone" && <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />}
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={field === "name" ? "John Doe" : field === "email" ? "you@example.com" : "9876543210"}
                        className="w-full pl-11 pr-4 py-3 border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition bg-neutral-bg hover:bg-white"
                        required
                      />
                    </div>
                  </div>
                ))}
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-text-primary">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create password"
                      className="w-full pl-11 pr-11 py-3 border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition bg-neutral-bg hover:bg-white"
                      onChange={handleChange}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
                
                {form.password && (
                  <div className="bg-neutral-bg rounded-xl p-3 space-y-2 border border-neutral-border">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">Password Strength:</p>
                      <span className={`text-xs font-semibold ${getStrength().color}`}>{getStrength().label}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${getStrength().bg}`} style={{ width: `${getStrengthWidth()}%` }} />
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <Rule ok={checks.length} text="Min 8 characters" />
                      <Rule ok={checks.uppercase} text="Uppercase letter" />
                      <Rule ok={checks.lowercase} text="Lowercase letter" />
                      <Rule ok={checks.number} text="One number" />
                      <Rule ok={checks.special} text="Special character" />
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-text-primary">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="w-full pl-11 pr-11 py-3 border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition bg-neutral-bg hover:bg-white"
                      onChange={handleChange}
                      required
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><FaTimesCircle size={12} /> Passwords do not match</p>
                  )}
                  {form.confirmPassword && form.password === form.confirmPassword && form.password.length > 0 && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><FaCheckCircle size={12} /> Passwords match</p>
                  )}
                </div>
                
                <div className="flex items-start gap-2 mt-1">
                  <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-brand-red focus:ring-brand-red" required />
                  <label htmlFor="terms" className="text-xs text-neutral-text-secondary leading-relaxed">
                    I agree to the <Link to="/terms" className="text-brand-red hover:text-brand-red-dark font-medium">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-brand-red hover:text-brand-red-dark font-medium">Privacy Policy</Link>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-red/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
              
              <p className="text-center text-sm text-neutral-text-secondary mt-6">
                Already have an account? <Link to="/login" className="text-brand-red font-semibold hover:text-brand-red-dark transition">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;