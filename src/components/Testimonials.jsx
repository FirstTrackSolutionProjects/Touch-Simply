import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      image: "",
      text: "This helped me get a job quickly! The UI is amazing.",
    },
    {
      name: "Ananya Das",
      role: "UI Designer",
      image: "",
      text: "Super easy to use and beautiful templates.",
    },
    {
      name: "Amit Verma",
      role: "Backend Developer",
      image: "",
      text: "Best free resume builder I have ever used.",
    },
    {
      name: "Priya Singh",
      role: "HR Manager",
      image: "",
      text: "Very fast and professional experience.",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Controls
  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
        Loved by Thousands of Users ❤️
      </h2>

      {/* Slider */}
      <div className="relative max-w-3xl mx-auto">

        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl transition-all duration-500">

          {/* User Image */}
          <div className="flex justify-center mb-4">
            <img
              src={testimonials[index].image}
              alt="user"
              className="w-16 h-16 rounded-full border-4 border-blue-100 shadow-md"
            />
          </div>

          {/* Stars */}
          <div className="text-yellow-400 text-xl mb-4">
            ★★★★★
          </div>

          {/* Text */}
          <p className="text-gray-600 text-lg italic leading-relaxed">
            "{testimonials[index].text}"
          </p>

          {/* User Info */}
          <h4 className="mt-6 font-semibold text-gray-900 text-lg">
            {testimonials[index].name}
          </h4>
          <p className="text-sm text-gray-500">
            {testimonials[index].role}
          </p>
        </div>
    </div>
    </section>
  );
};

export default Testimonials;