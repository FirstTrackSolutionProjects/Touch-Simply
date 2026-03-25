import React from "react";

const RefundCancellation = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Refund & Cancellation Policy
        </h1>
        <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-base">
          Transparent policies to ensure a smooth and fair experience for all users.
        </p>
       
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white shadow-sm rounded-2xl p-8 md:p-10 border border-gray-100">

          {/* Intro */}
          <p className="text-gray-600 leading-relaxed mb-8">
            At <span className="font-semibold text-gray-800">Touch Simply</span>, we strive to provide high-quality services and a seamless user experience. This policy outlines the terms and conditions for cancellations and refunds associated with our platform.
          </p>

          <div className="space-y-8">

            {/* 1 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                1. Cancellation Policy
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                You may cancel your subscription or service at any time through your account settings. After cancellation, access will remain active until the end of your current billing cycle.
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>No additional charges will be applied after cancellation</li>
                <li>Cancellation does not automatically qualify for a refund</li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. Refund Policy
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                Refunds are provided only under specific and valid circumstances:
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>Duplicate payment transactions</li>
                <li>Technical errors causing failed service delivery</li>
                <li>Unauthorized transactions (subject to verification)</li>
              </ul>

              <p className="text-gray-600 mt-3 text-sm">
                Refund requests must be submitted within{" "}
                <span className="font-medium">7 days</span> of the transaction date.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. Non-Refundable Cases
              </h2>
              <p className="text-gray-600 mb-3 text-sm">
                The following scenarios are not eligible for refunds:
              </p>

              <ul className="list-disc ml-6 text-gray-600 space-y-1 text-sm">
                <li>Change of mind after purchase</li>
                <li>Partial usage of services</li>
                <li>Failure to cancel before subscription renewal</li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Refund Processing
              </h2>
              <p className="text-gray-600 text-sm">
                Approved refunds will be processed within{" "}
                <span className="font-medium">5–10 business days</span> and credited back to the original payment method.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Policy Updates
              </h2>
              <p className="text-gray-600 text-sm">
                We reserve the right to modify or update this policy at any time. Any changes will be reflected on this page with an updated revision date.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Contact Us
              </h2>
              <p className="text-gray-600 text-sm">
                For any questions or to request a refund, please contact us at:
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

export default RefundCancellation;