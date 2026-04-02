import React from "react";

const LegalPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-14 md:py-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">Legal Policy</h1>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Important legal information about using our platform.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border space-y-8">

          {[
            {
              title: "Compliance",
              desc: "We comply with all applicable laws and regulations.",
            },
            {
              title: "Intellectual Rights",
              desc: "All templates and content are legally protected.",
            },
            {
              title: "User Responsibility",
              desc: "Users are responsible for their created content.",
            },
            {
              title: "Dispute Resolution",
              desc: "Disputes are subject to Indian jurisdiction.",
            },
            {
                title: "Limitation of Liability",
                desc: "We are not liable for any damages or losses.",
            },
            {
                title: "Changes to Policy",
                desc: "We may update this policy from time to time.",
            }
          ].map((item, i) => (
            <div key={i} className="border-l-4 border-purple-600 pl-4">
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

export default LegalPolicy;