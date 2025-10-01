import React from 'react';
import './CSS/StaticPage.css';

const Terms = () => (
  <div className="page-shell">
    <header className="page-header">
      <h1>Terms & Conditions</h1>
      <p>Review the rules that govern your use of the CrazyShopping website and services.</p>
    </header>

    <section className="page-section">
      <h2>Using Our Services</h2>
      <p>
        By creating an account or placing an order, you confirm that the information provided is accurate and that you agree to comply with local laws.
        You are responsible for safeguarding your login credentials and notifying us of unauthorized activity.
      </p>
    </section>

    <section className="page-section">
      <h2>Orders & Payments</h2>
      <ul>
        <li>All prices are listed in Indian Rupees.</li>
        <li>Orders are confirmed once payment is authorized.</li>
        <li>Refunds follow the policy communicated on each product page.</li>
      </ul>
    </section>

    <section className="page-section">
      <h2>Limitation of Liability</h2>
      <p>
        CrazyShopping is not liable for indirect or incidental damages arising from delays, third-party logistics failures, or misuse of products. We do
        not guarantee uninterrupted platform availability but work to resolve defects swiftly.
      </p>
    </section>

    <section className="page-section">
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to support@crazyshopping.in. We reserve the right to update this page and will notify customers of
        significant changes via email.
      </p>
    </section>
  </div>
);

export default Terms;