import React, { useEffect, useState } from "react";

const Counter = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
};

const Stats = () => {
  const stats = [
    {
      icon: "📄",
      value: 10000,
      label: "Resumes Created",
      suffix: "+",
    },
    {
      icon: "👥",
      value: 5000,
      label: "Active Users",
      suffix: "+",
    },
    {
      icon: "⭐",
      value: 48,
      label: "User Rating",
      suffix: "/50",
      decimal: true,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16 md:py-20 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="relative px-6 md:px-12 lg:px-20 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Trusted by Thousands of Users
        </h2>

        <p className="text-gray-500 mb-12 text-sm md:text-base">
          Join a growing community building professional resumes effortlessly
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {stats.map((stat, i) => (
            <div
              key={i}
              className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-md p-8 hover:shadow-2xl transition duration-300 hover:-translate-y-2 border border-white/20"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition">
                {stat.icon}
              </div>

              {/* Value */}
              <h3 className="text-3xl font-bold text-blue-600">
                {stat.decimal ? (
                  <>
                    {(stat.value / 10).toFixed(1)}
                  </>
                ) : (
                  <Counter end={stat.value} />
                )}
                {stat.suffix}
              </h3>

              {/* Label */}
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                {stat.label}
              </p>

              {/* Hover Line */}
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;