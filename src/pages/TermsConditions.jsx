import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-14 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-gray-200">
          Please read these terms carefully before using our platform.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow rounded-xl mt-[-40px]">

        <p className="text-gray-600 mb-6">
          Welcome to <span className="font-semibold">Touch Simply</span>. By accessing or using our
          resume builder platform, you agree to comply with and be bound by the following terms and conditions.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
        <p className="text-gray-600 mb-4">
          You agree to use our platform only for lawful purposes and in accordance with these Terms.
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>You must not misuse or attempt to disrupt the service</li>
          <li>You agree not to use the platform for fraudulent activities</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="text-gray-600 mb-4">
          To access certain features, you may be required to create an account.
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>You are responsible for maintaining account confidentiality</li>
          <li>You must provide accurate and complete information</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="text-gray-600">
          All content, templates, and design elements available on this platform are the property of
          Touch Simply and are protected by applicable laws.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Payments & Subscriptions</h2>
        <p className="text-gray-600">
          Certain features may require payment. By purchasing, you agree to our pricing and billing terms.
          Refunds and cancellations are governed by our Refund Policy.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
        <p className="text-gray-600">
          We are not responsible for any direct, indirect, or incidental damages resulting from the use
          or inability to use our services.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
        <p className="text-gray-600">
          We reserve the right to suspend or terminate your account if you violate these terms.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="text-gray-600">
          We may update these Terms & Conditions from time to time. Continued use of the platform
          constitutes acceptance of the updated terms.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
        <p className="text-gray-600">
          These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction
          of local courts.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about these Terms, please contact us at:
          <br />
          <span className="font-medium">support@touchsimply.com</span>
        </p>

       

      </div>

    </div>
  );
};

export default TermsConditions;