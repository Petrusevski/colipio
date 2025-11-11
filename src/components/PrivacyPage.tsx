import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-10 text-sm text-slate-200">
        <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
        <p className="text-[12px] text-slate-400 mb-6">
          Last updated: {new Date().toLocaleDateString()} · This Privacy Policy
          explains how we collect, use and protect personal data in compliance
          with the General Data Protection Regulation (EU) 2016/679 (“GDPR”)
          and corresponding laws in the EEA and UK.
        </p>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">1. Who we are and how to contact us</h2>
          <p>
            The Service is operated by <strong>Colipio Labs</strong> (“we”,
            “us”, or “our”), established in the European Union. We act as a
            <strong>data controller</strong> for personal data we collect for
            our own purposes (e.g. accounts, billing, communication) and as a
            <strong>data processor</strong> where we handle customer data on
            behalf of a business customer.
          </p>
          <p>
            For any privacy-related questions, please contact:
            <br />
            <span className="text-slate-300">
              privacy@colipio-labs.eu · [insert postal address]
            </span>
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">2. Personal data we collect</h2>
          <ul className="list-disc list-inside text-slate-300">
            <li>
              <strong>Account data:</strong> name, email address, company,
              password hash, and role information.
            </li>
            <li>
              <strong>Usage data:</strong> activity logs, device type, browser,
              IP address, and session metadata.
            </li>
            <li>
              <strong>Communication data:</strong> messages or forms submitted
              via our website or support channels.
            </li>
            <li>
              <strong>Billing data:</strong> payment information processed
              securely by our payment providers (we never store full card data).
            </li>
          </ul>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">3. How we use personal data</h2>
          <ul className="list-disc list-inside text-slate-300">
            <li>To create and manage user accounts.</li>
            <li>To provide and improve our SaaS services.</li>
            <li>To respond to support requests and inquiries.</li>
            <li>To send service or billing notifications.</li>
            <li>To comply with legal obligations (e.g. tax records).</li>
            <li>With consent, to send occasional product updates or newsletters.</li>
          </ul>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">4. Lawful bases under GDPR</h2>
          <p>Our processing is based on one or more of the following lawful bases:</p>
          <ul className="list-disc list-inside text-slate-300">
            <li>
              <strong>Contract performance</strong> – to deliver the services
              you have requested.
            </li>
            <li>
              <strong>Legitimate interest</strong> – to improve and secure our
              platform, communicate with users, and prevent misuse.
            </li>
            <li>
              <strong>Legal obligation</strong> – to comply with accounting,
              tax, or regulatory duties.
            </li>
            <li>
              <strong>Consent</strong> – for optional communications such as
              marketing emails (you can withdraw consent at any time).
            </li>
          </ul>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">5. Data sharing and international transfers</h2>
          <p>
            We use trusted third-party service providers for hosting, analytics,
            and payments. These providers process data only under contract and
            in compliance with GDPR Article 28.
          </p>
          <p>
            If data is transferred outside the EEA or UK, we ensure an adequate
            level of protection through mechanisms such as EU Standard
            Contractual Clauses (SCCs) or adequacy decisions.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">6. Data retention</h2>
          <p>
            We retain personal data only as long as necessary for the purposes
            described above or as required by law. Trial or demo data may be
            deleted automatically after a defined period. You may request
            deletion at any time.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">7. Your rights under GDPR</h2>
          <p>
            You have the following rights regarding your personal data (subject
            to conditions and limitations in applicable law):
          </p>
          <ul className="list-disc list-inside text-slate-300">
            <li>Right of access – obtain a copy of your data.</li>
            <li>Right to rectification – correct inaccurate or incomplete data.</li>
            <li>Right to erasure – request deletion (“right to be forgotten”).</li>
            <li>Right to restriction or objection to processing.</li>
            <li>Right to data portability.</li>
            <li>
              Right to withdraw consent (where processing is based on consent).
            </li>
            <li>
              Right to lodge a complaint with your local supervisory authority.
            </li>
          </ul>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">8. Cookies and analytics</h2>
          <p>
            Our website may use cookies or local storage to remember preferences
            and collect anonymous usage statistics. You can control cookies
            through your browser settings or cookie-consent banner in accordance
            with the ePrivacy Directive and national implementations.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">9. Security</h2>
          <p>
            We apply appropriate technical and organisational measures to
            protect personal data, including encryption, access controls, and
            secure hosting. However, no online service can guarantee absolute
            security.
          </p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="text-base font-semibold">10. Updates to this policy</h2>
          <p>
            We may revise this Privacy Policy from time to time to reflect
            updates in our practices or in law. The current version will always
            be available on this page with the effective date shown at the top.
          </p>
        </section>

        <p className="text-[11px] text-slate-500">
          This document is a general GDPR-compliant template. Please adapt the
          company name, contact details, hosting providers, and supervisory
          authority references to your actual operations.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
