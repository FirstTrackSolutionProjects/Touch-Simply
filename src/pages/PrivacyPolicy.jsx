import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
          Your privacy matters to us. This policy explains how we collect, use, and protect your information.
        </p>
       
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white shadow-sm rounded-2xl p-8 md:p-10 border border-gray-100">

          {/* Intro */}
          <p className="text-gray-600 leading-relaxed mb-8">
            At <span className="font-semibold text-gray-800">Touch Simply</span>, we are committed to protecting your personal information and maintaining transparency in how we handle your data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
          </p>

          {/* Sections */}
          <div className="space-y-8">

            {/* 1 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-3">
                We may collect personal and usage information to provide a better experience.
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>Account details (name, email address)</li>
                <li>Resume data (education, experience, skills)</li>
                <li>Usage data (pages visited, actions performed)</li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-3">
                Your information helps us deliver and improve our services.
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>To create and manage your resumes</li>
                <li>To improve user experience and features</li>
                <li>To send important updates and notifications</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-600 text-sm">
                We may use cookies and similar technologies to enhance your browsing experience and analyze platform usage.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Data Security
              </h2>
              <p className="text-gray-600 text-sm">
                We implement appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Third-Party Services
              </h2>
              <p className="text-gray-600 text-sm">
                We may use third-party services such as analytics tools or payment providers. These services operate under their own privacy policies.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Your Rights
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                You have full control over your personal data:
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>Access your personal data</li>
                <li>Update or correct your information</li>
                <li>Request deletion of your account</li>
              </ul>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600 text-sm">
                We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                8. Contact Us
              </h2>
              <p className="text-gray-600 text-sm">
                If you have any questions or concerns about this Privacy Policy, feel free to contact us at:
              </p>

              <p className="mt-2 font-medium text-gray-800">
                support@touchsimply.com
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PrivacyPolicy;