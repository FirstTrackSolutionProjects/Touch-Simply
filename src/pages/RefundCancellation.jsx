import React from "react";

const RefundCancellation = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-14 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Refund & Cancellation Policy</h1>
        <p className="text-gray-100">
          Transparent policies to ensure a smooth and fair experience for all users.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow rounded-xl mt-[-40px]">

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">Touch Simply</span>, we strive to provide high-quality services.
          This policy outlines the terms for cancellations and refunds for our services.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Cancellation Policy</h2>
        <p className="text-gray-600 mb-4">
          You can cancel your subscription or service at any time through your account settings.
          Once canceled, you will continue to have access until the end of your billing period.
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>No additional charges will be applied after cancellation</li>
          <li>Cancellation does not automatically trigger a refund</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Refund Policy</h2>
        <p className="text-gray-600 mb-4">
          Refunds are issued only under specific circumstances to ensure fairness.
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Duplicate payment transactions</li>
          <li>Technical errors resulting in failed service delivery</li>
          <li>Unauthorized transactions (subject to verification)</li>
        </ul>

        <p className="text-gray-600 mt-4">
          Refund requests must be submitted within <span className="font-medium">7 days</span> of the transaction.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Non-Refundable Cases</h2>
        <p className="text-gray-600 mb-4">
          The following situations are not eligible for refunds:
        </p>

        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Change of mind after purchase</li>
          <li>Partial use of services</li>
          <li>Failure to cancel before renewal</li>
        </ul>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Processing of Refunds</h2>
        <p className="text-gray-600">
          Approved refunds will be processed within <span className="font-medium">5-10 business days</span>
          and credited back to the original payment method.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
        <p className="text-gray-600">
          We reserve the right to update this policy at any time. Changes will be reflected on this page.
        </p>

        {/* Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions or wish to request a refund, please contact us at:
          <br />
          <span className="font-medium">support@touchsimply.com</span>
        </p>

       

      </div>

    </div>
  );
};

export default RefundCancellation;