import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Terms & Conditions
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
          Please read these terms carefully before using our platform.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white shadow-sm rounded-2xl p-8 md:p-10 border border-gray-100">

          {/* Intro */}
          <p className="text-gray-600 leading-relaxed mb-8">
            Welcome to <span className="font-semibold text-gray-800">Touch Simply</span>. 
            By accessing or using our platform, you agree to comply with and be bound by the following Terms & Conditions. 
            If you do not agree with any part of these terms, please refrain from using our services.
          </p>

          <div className="space-y-8">

            {/* 1 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                1. Use of Service
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                You agree to use our platform only for lawful purposes and in accordance with these Terms.
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>You must not misuse, hack, or disrupt the platform</li>
                <li>You agree not to engage in fraudulent or illegal activities</li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. User Accounts
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                Certain features require account registration.
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>You are responsible for maintaining account confidentiality</li>
                <li>You must provide accurate and up-to-date information</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. Intellectual Property
              </h2>
              <p className="text-gray-600 text-sm">
                All templates, designs, and content available on this platform are the intellectual property of Touch Simply and are protected under applicable laws. Unauthorized use, reproduction, or distribution is strictly prohibited.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Payments & Subscriptions
              </h2>
              <p className="text-gray-600 text-sm">
                Some features may require payment. By purchasing any paid service, you agree to our pricing, billing cycle, and terms. Refunds and cancellations are governed by our Refund Policy.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-600 text-sm">
                We shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Account Termination
              </h2>
              <p className="text-gray-600 text-sm">
                We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in harmful activities.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                7. Changes to Terms
              </h2>
              <p className="text-gray-600 text-sm">
                We may update these Terms & Conditions from time to time. Continued use of the platform after updates constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                8. Governing Law
              </h2>
              <p className="text-gray-600 text-sm">
                These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the appropriate courts.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                9. Contact Us
              </h2>
              <p className="text-gray-600 text-sm">
                If you have any questions regarding these Terms & Conditions, please contact us at:
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

export default TermsConditions;