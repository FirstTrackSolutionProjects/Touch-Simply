import React, { useEffect, useState } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { name: "Rahul Sharma", role: "Software Engineer", text: "This helped me get a job quickly! The UI is amazing." },
  { name: "Ananya Das", role: "UI Designer", text: "Super easy to use and beautiful templates." },
  { name: "Amit Verma", role: "Backend Developer", text: "Best free resume builder I have ever used." },
  { name: "Priya Singh", role: "HR Manager", text: "Very fast and professional experience." },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-brand-black text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16">
          Loved by Thousands of Users
        </h2>

        <div className="relative h-64 sm:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="flex justify-center gap-1 text-brand-red mb-6">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={20} />)}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed max-w-2xl mx-auto">
                "{testimonials[index].text}"
              </p>
              
              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                  <FaUserCircle size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white">{testimonials[index].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? "bg-brand-red" : "bg-gray-700 hover:bg-gray-500"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;