import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Hero = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 md:py-32">
      {/* Subtle background pattern and red glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div className="max-w-xl text-center md:text-left" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-text-primary leading-tight tracking-tight" variants={itemVariants}>
            Create Stunning{" "}
            <span className="text-brand-red">
              Designs
            </span>{" "}
            in Minutes
          </motion.h1>
          <motion.p className="mt-6 text-neutral-text-secondary text-lg md:text-xl leading-relaxed" variants={itemVariants}>
            Design everything you need in one place with modern templates, real-time preview, and instant downloads.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start" variants={itemVariants}>
            
            {/* Primary Button */}
            <Link to="/templates" className="group bg-brand-red hover:bg-brand-red-hover text-white px-8 py-3.5 rounded-xl shadow-lg shadow-brand-red/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base font-semibold">
              Browse Templates
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            {/* Secondary Button (Sign In) - Made prominent */}
            <Link to={isLoggedIn ? "/dashboard" : "/login"} className="border-2 border-neutral-text-primary text-neutral-text-primary px-8 py-3.5 rounded-xl hover:bg-neutral-text-primary hover:text-white transition-all duration-300 text-base font-semibold text-center">
              {isLoggedIn ? "Go to Dashboard" : "Sign In"}
            </Link>

          </motion.div>
        </motion.div>

        <motion.div className="relative flex justify-center md:justify-end w-full max-w-lg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="absolute w-80 h-80 md:w-96 md:h-96 bg-brand-red/10 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative group">
            <img src="/images/hero-section.jpg" alt="Design preview" className="relative w-80 sm:w-[420px] rounded-2xl shadow-2xl border-2 border-neutral-border transition duration-500 group-hover:scale-105 group-hover:shadow-brand-red/20" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;