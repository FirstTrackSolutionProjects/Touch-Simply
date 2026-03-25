import React from "react";

const Stats = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16 md:py-20">

      <div className="px-6 md:px-12 lg:px-20 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
          Trusted by Thousands of Users
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Resumes Created
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-3xl font-bold text-blue-600">5K+</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Active Users
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-3xl font-bold text-blue-600">4.8</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              User Rating
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Stats;