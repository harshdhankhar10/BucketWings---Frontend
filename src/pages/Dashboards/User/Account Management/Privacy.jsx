import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Your privacy is important to us. This privacy policy outlines how we handle your data.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-600 mt-2">
            This Privacy Policy explains how we collect, use, and share your personal data when you use our services.
            We are committed to ensuring that your privacy is protected.
          </p>
        </section>

        {/* Data We Collect */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">1. Data We Collect</h2>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li><strong>Personal Information:</strong> Name, email, phone number, etc.</li>
            <li><strong>Usage Data:</strong> Website interactions, IP address, browser details.</li>
            <li><strong>Cookies:</strong> Information collected via cookies and similar technologies.</li>
          </ul>
        </section>

        {/* How We Use Data */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Data</h2>
          <p className="text-gray-600 mt-2">
            We use the data we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li>To improve user experience and enhance our services.</li>
            <li>To communicate updates, promotions, and changes to our services.</li>
            <li>To ensure proper functioning and security of the platform.</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">3. Sharing Your Data with Third Parties</h2>
          <p className="text-gray-600 mt-2">
            We only share your data with trusted third parties to provide services such as payment processing, marketing, and analytics.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">4. Cookies and Tracking</h2>
          <p className="text-gray-600 mt-2">
            We use cookies to personalize your experience, analyze site traffic, and provide relevant advertising. You can manage your preferences in your browser settings.
          </p>
        </section>

        {/* User Rights */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights Over Your Data</h2>
          <p className="text-gray-600 mt-2">
            You have the right to access, correct, or delete your personal data at any time. Additionally, you can withdraw your consent for data processing or request data export.
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">6. Data Retention</h2>
          <p className="text-gray-600 mt-2">
            We retain your data only for as long as necessary to fulfill the purposes outlined in this policy.
          </p>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">7. Security of Your Data</h2>
          <p className="text-gray-600 mt-2">
            We implement strict security measures to safeguard your personal information from unauthorized access or disclosure.
          </p>
        </section>

        {/* Policy Changes */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mt-2">
            We may update this policy periodically. Changes will be communicated through our website and via email notifications.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions about this privacy policy, please contact us at <a href="mailto:dhankhar14804@gmail.com" className="text-blue-600 underline">dhankhar14804@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
