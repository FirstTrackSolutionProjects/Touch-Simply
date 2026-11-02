import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { getAuthResult, loginUser, googleLoginUser } from "../services/authServices";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
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
      const auth = getAuthResult(data);
      const user = await login(
        auth.token,
        auth.user
      );
      if (!user) throw new Error("Could not verify your login. Please try again.");
      const destination = location.state?.from;
      navigate(destination?.pathname || "/dashboard", { state: destination?.state });
    } catch (error) {
      setError(error?.response?.data?.message || error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-bg flex items-center justify-center px-4 py-6 md:py-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[480px] md:min-h-[500px] border border-neutral-border">
        
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden md:flex md:w-1/2 bg-brand-black p-8 lg:p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <img src="/images/logo.png" alt="logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
              <span className="text-xl lg:text-2xl font-bold tracking-tight">Touch Simply</span>
            </Link>
            
            <div className="mt-12 lg:mt-16">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Welcome Back! 👋
              </h1>
              <p className="mt-3 lg:mt-4 text-gray-400 text-base lg:text-lg leading-relaxed">
                Continue building your professional journey with us.
              </p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-brand-red"></div>
              <span className="text-xs lg:text-sm font-medium">Secure • Fast • Reliable</span>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex items-center">
          <div className="w-full">
            {/* Mobile Branding */}
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
                <h2 className="text-2xl font-bold text-neutral-text-primary">Login</h2>
                <p className="text-neutral-text-secondary mt-1 text-sm">Access your account to continue</p>
              </div>

              {location.state?.from && (
                <p className="mt-4 rounded-xl border border-brand-red/20 bg-brand-red/5 p-3 text-sm text-brand-red-dark font-medium">
                  Log in to continue with your selected template.
                </p>
              )}
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">⚠️</span>
                  <span className="flex-1">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-4 md:space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-text-primary">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition bg-neutral-bg hover:bg-white"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-neutral-text-primary">Password</label>
                    <Link to="/forgot-password" className="text-xs md:text-sm text-brand-red hover:text-brand-red-dark font-medium transition">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3 border border-neutral-border rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition bg-neutral-bg hover:bg-white"
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center gap-2 text-sm text-neutral-text-secondary cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red" />
                    Remember me
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-red/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-neutral-border"></div>
                <span className="text-sm text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-neutral-border"></div>
              </div>
              
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const data = await googleLoginUser(credentialResponse.credential);
                      const auth = getAuthResult(data);
                      await login(
                        auth.token,
                        auth.user
                      );
                      const destination = location.state?.from;
                      navigate(destination?.pathname || "/dashboard", { state: destination?.state });
                    } catch (error) {
                      setError(error?.response?.data?.message || error.message || "Google Login Failed");
                    }
                  }}
                  onError={() => setError("Google Login Failed")}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="pill"
                  width="100%"
                  containerProps={{ style: { width: '100%' } }}
                />
              </div>
              
              <p className="text-center text-sm text-neutral-text-secondary mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-brand-red font-semibold hover:text-brand-red-dark transition">
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
