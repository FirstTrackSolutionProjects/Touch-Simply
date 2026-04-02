import React from "react";

const DataSecurity = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-14 md:py-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">Data Security</h1>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Your data privacy and protection is our priority.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border space-y-8">

          {[
            {
              title: "Data Protection",
              desc: "We use industry-standard encryption to protect your data.",
            },
            {
              title: "Secure Storage",
              desc: "Your information is stored securely with restricted access.",
            },
            {
              title: "No Data Selling",
              desc: "We never sell or share your personal information.",
            },
            {
              title: "User Control",
              desc: "You can update or delete your data anytime.",
            },
            {
                title: "Regular Audits",
                desc: "We perform regular audits to ensure data security.",
            },
            {
                title: "Compliance with Laws",
                desc: "We comply with all applicable laws and regulations.",
            },
          ].map((item, i) => (
            <div key={i} className="border-l-4 border-green-500 pl-4">
              <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                {i + 1}. {item.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DataSecurity;