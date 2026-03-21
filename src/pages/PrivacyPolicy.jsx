import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-200">
          Your privacy is important to us. This policy explains how we handle your data.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow rounded-xl mt-[-40px]">

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">Touch Simply</span>, we are committed to protecting your
          personal information. This Privacy Policy outlines how we collect, use, and safeguard your data
          when you use our resume builder platform.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We may collect personal information such as your name, email address, phone number, and resume content
          that you provide while using our platform.
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Account details (name, email)</li>
          <li>Resume data (education, experience, skills)</li>
          <li>Usage data (pages visited, actions taken)</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          Your information is used to provide and improve our services.
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>To create and manage your resumes</li>
          <li>To improve user experience</li>
          <li>To send important updates or notifications</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies & Tracking</h2>
        <p className="text-gray-600">
          We may use cookies and similar technologies to enhance your browsing experience and analyze usage.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-600">
          We implement appropriate security measures to protect your personal data from unauthorized access,
          alteration, or disclosure.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
        <p className="text-gray-600">
          We may use third-party services such as payment gateways and analytics tools. These providers
          have their own privacy policies governing the use of your information.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">6. User Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Access your personal data</li>
          <li>Update or correct your data</li>
          <li>Request deletion of your account</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. Changes will be posted on this page.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about this Privacy Policy, you can contact us at:
          <br />
          <span className="font-medium">support@touchsimply.com</span>
        </p>

      </div>

    </div>
  );
};

export default PrivacyPolicy;