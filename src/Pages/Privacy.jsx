import React from 'react';
import './CSS/StaticPage.css';

const Privacy = () => (
  <div className="page-shell">
    <header className="page-header">
      <h1>Privacy Policy</h1>
      <p>Your trust matters. We explain how your information is collected, used, and protected.</p>
    </header>

    <section className="page-section">
      <h2>Information We Collect</h2>
      <p>
        We collect the personal information that you share when you create an account, place an order, or contact our team. This may include name, email,
        address, and payment details. Technical metadata and usage analytics are captured to improve performance and reliability.
      </p>
    </section>

    <section className="page-section">
      <h2>How We Use Your Data</h2>
      <ul>
        <li>Process orders, payments, and logistics.</li>
        <li>Provide personalized recommendations and offers.</li>
        <li>Prevent fraud and secure your account.</li>
        <li>Respond to support inquiries.</li>
      </ul>
    </section>

    <section className="page-section">
      <h2>Data Protection</h2>
      <p>
        All sensitive information is encrypted in transit and at rest. Access to production systems is restricted to authorized personnel following
        least-privilege principles. We adopt industry best practices and review partners for compliance.
      </p>
    </section>

    <section className="page-section">
      <h2>Your Choices</h2>
      <p>
        You may update or delete your account information by contacting support. If you wish to opt out of marketing emails, use the unsubscribe link in
        any message. For data access requests, email privacy@crazyshopping.in.
      </p>
    </section>
  </div>
);

export default Privacy;