import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-10 text-sm text-slate-200">
        <h1 className="text-2xl font-semibold mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-[12px] text-slate-400 mb-6">
          Last updated: {new Date().toLocaleDateString()} · This document is a
          general template for a SaaS product operating in the EU/EEA. It does
          not constitute legal advice. Please have it reviewed and adapted by a
          qualified lawyer in your jurisdiction.
        </p>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">1. Who we are</h2>
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your access
            to and use of the Colipio Labs products and services (collectively,
            the &quot;Service&quot;). References to &quot;we&quot;,
            &quot;us&quot; or &quot;our&quot; mean{" "}
            <span className="font-semibold">Colipio Labs</span> (the
            &quot;Provider&quot;), a company established in the European Union.
          </p>
          <p>
            If you are accepting these Terms on behalf of a company or other
            legal entity, you represent and warrant that you have the authority
            to bind that entity. In that case, &quot;Customer&quot; or
            &quot;you&quot; refers to that entity and its authorised users.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">2. Scope of the Service</h2>
          <p>
            The Service is a web-based application for managing go-to-market
            workflows, CRM data and related analytics. In this demo version, the
            Service is provided as a frontend-only sandbox without a live
            backend or production data.
          </p>
          <p>
            We may improve, modify or discontinue features from time to time.
            Where required under EU law, we will inform existing paying
            customers in advance of any material changes that could negatively
            affect them.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">3. Trial, subscription and pricing</h2>
          <p>
            We may offer a free trial period (for example, 14 days) during which
            you can access the Service without charge. Trial access is provided
            on an &quot;as is&quot; basis and may be restricted or cancelled at
            any time.
          </p>
          <p>
            After the trial, access to the Service is subject to payment of
            subscription fees as communicated on our pricing page or in a
            specific order form. Prices are usually stated exclusive of VAT; if
            applicable, VAT will be added in accordance with EU VAT rules.
          </p>
          <p>
            You may choose between monthly billing and annual billing with
            applicable discounts. Unless otherwise stated, subscriptions renew
            automatically at the end of each term unless cancelled in
            accordance with these Terms.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">4. Customer account and eligibility</h2>
          <p>
            To use the Service you must create an account and provide accurate,
            current and complete information. You are responsible for maintaining
            the confidentiality of your login credentials and for all activities
            under your account.
          </p>
          <p>
            The Service is primarily intended for business users (B2B). If you
            are a consumer located in the EU/EEA or UK, mandatory consumer
            protection rules in your country may grant you additional rights.
            These Terms do not limit such mandatory rights.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">5. Data protection &amp; GDPR</h2>
          <p>
            In the course of providing the Service, we may process personal data
            on your behalf as a data processor under Regulation (EU) 2016/679
            (the General Data Protection Regulation, &quot;GDPR&quot;) and
            corresponding laws in the EEA and UK.
          </p>
          <p>
            Where we process personal data as a processor, the relationship will
            be governed by a separate Data Processing Agreement
            (&quot;DPA&quot;) that reflects the requirements of Article 28
            GDPR. The DPA forms an integral part of these Terms.
          </p>
          <p>
            Our use of personal data as a controller (for example, for our own
            billing, account management and marketing) is described in our
            Privacy Policy. We will comply with applicable data protection laws
            and implement appropriate technical and organisational measures to
            protect personal data.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">6. Acceptable use</h2>
          <p>
            You agree not to misuse the Service and not to allow anyone else to
            do so. In particular, you must not:
          </p>
          <ul className="list-disc list-inside text-slate-300">
            <li>
              use the Service in violation of any applicable laws or regulations
              (including EU/EEA data protection and anti-spam rules);
            </li>
            <li>
              upload or process unlawful content, or content that infringes
              third-party rights;
            </li>
            <li>
              attempt to gain unauthorised access to the Service or its
              underlying infrastructure;
            </li>
            <li>
              reverse engineer, decompile or attempt to extract the source code,
              except as permitted by mandatory law;
            </li>
            <li>
              use the Service to build a competing product or for benchmarking
              in a misleading way.
            </li>
          </ul>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">
            7. Intellectual property and licence
          </h2>
          <p>
            We retain all intellectual property rights in and to the Service,
            including software, design, trademarks, documentation and know-how.
            These rights are licensed, not sold, to you.
          </p>
          <p>
            Subject to your compliance with these Terms and payment of fees (if
            applicable), we grant you a limited, non-exclusive,
            non-transferable, non-sublicensable licence to access and use the
            Service for your internal business purposes during the subscription
            term.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">8. Service availability &amp; support</h2>
          <p>
            We aim to provide a reliable Service but do not guarantee that it
            will be available at all times. Maintenance, updates, incidents or
            factors outside our reasonable control may result in temporary
            interruptions.
          </p>
          <p>
            For paying customers, support terms (response times, channels,
            scope) may be defined in a separate service description or order
            form. Nothing in these Terms prevents you from exercising statutory
            rights you may have under EU/EEA law regarding lack of conformity of
            digital services.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">9. Term, cancellation &amp; termination</h2>
          <p>
            Your subscription continues for the agreed term (monthly or annual)
            and renews automatically unless cancelled before the end of the
            current term. You can usually cancel via your account settings or by
            contacting us in writing.
          </p>
          <p>
            We may suspend or terminate your access if you materially breach
            these Terms, fail to pay fees when due, or use the Service in a way
            that causes risk or harm. Where required by law, we will provide
            prior notice and an opportunity to remedy before termination.
          </p>
          <p>
            Upon termination or expiry, your right to use the Service ends. We
            may retain or delete data in accordance with our data retention
            policies, subject to applicable legal obligations.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">10. Warranties and liability</h2>
          <p>
            To the fullest extent permitted by applicable law, the Service is
            provided on an &quot;as is&quot; and &quot;as available&quot;
            basis. We do not warrant that the Service will be error-free or
            uninterrupted.
          </p>
          <p>
            We are not liable for indirect or consequential damages such as loss
            of profits, loss of business, or loss of data, except where such
            limitation is not permitted under mandatory law.
          </p>
          <p>
            Nothing in these Terms excludes or limits liability where it would
            be unlawful to do so, including liability for gross negligence,
            intentional misconduct or mandatory consumer rights under EU/EEA
            law.
          </p>
        </section>

        <section className="space-y-3 mb-6">
          <h2 className="text-base font-semibold">11. Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of{" "}
            <span className="font-semibold">[insert EU Member State]</span>,
            without regard to conflict-of-law principles. If you are a consumer,
            this choice of law does not deprive you of the protection afforded
            by mandatory provisions of the law of your country of residence.
          </p>
          <p>
            Any disputes arising out of or in connection with these Terms will
            be subject to the non-exclusive jurisdiction of the courts of{" "}
            <span className="font-semibold">[insert city / country]</span>. If
            you are a consumer in the EU/EEA, you may also have the right to use
            the EU Online Dispute Resolution (ODR) platform or local consumer
            bodies.
          </p>
        </section>

        <section className="space-y-3 mb-10">
          <h2 className="text-base font-semibold">12. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time, for example to reflect
            changes in the Service, in the law or in our business. We will
            notify you of any material changes in a manner consistent with
            applicable EU/EEA law (for example, by email or in-app notice).
          </p>
          <p>
            If you continue using the Service after the updated Terms become
            effective, you are deemed to have accepted them. If you do not agree
            with the changes, you should stop using the Service and, where
            applicable, cancel your subscription.
          </p>
        </section>

        <p className="text-[11px] text-slate-500">
          This template is provided for convenience only and does not replace
          tailored legal advice. Please adapt company details, governing law and
          data processing terms to your actual situation.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
