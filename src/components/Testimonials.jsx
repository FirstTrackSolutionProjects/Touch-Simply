import React, { useEffect, useState } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      text: "This helped me get a job quickly! The UI is amazing.",
    },
    {
      name: "Ananya Das",
      role: "UI Designer",
      text: "Super easy to use and beautiful templates.",
    },
    {
      name: "Amit Verma",
      role: "Backend Developer",
      text: "Best free resume builder I have ever used.",
    },
    {
      name: "Priya Singh",
      role: "HR Manager",
      text: "Very fast and professional experience.",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Loved by Thousands of Users ❤️
      </h2>

      {/* Slider */}
      <div className="relative max-w-3xl mx-auto">

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 md:p-10 rounded-3xl shadow-xl transition-all duration-500">

          {/* User Icon */}
          <div className="flex justify-center mb-4 text-purple-400 text-5xl">
            <FaUserCircle />
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-300 text-lg italic leading-relaxed">
            "{testimonials[index].text}"
          </p>

          {/* User Info */}
          <h4 className="mt-6 font-semibold text-white text-lg">
            {testimonials[index].name}
          </h4>
          <p className="text-sm text-gray-400">
            {testimonials[index].role}
          </p>
        </div>

       

        

      </div>
    </section>
  );
};

export default Testimonials;