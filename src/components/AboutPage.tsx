import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-12 space-y-8">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            About Colipio Labs
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Colipio Labs is building a GTM-native CRM and command center for
            SaaS teams and agencies. We connect enrichment, outreach, pipeline
            and revenue into one opinionated workspace so GTM teams can focus on
            what matters: shipping plays and closing revenue.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">What we&apos;re building</h2>
          <p className="text-sm text-slate-300">
            Modern GTM teams are juggling Clay, enrichment tools, outbound
            sequencers, CRMs and spreadsheets. Data is fragmented, context is
            scattered and visibility is limited. We&apos;re designing Colipio as
            the layer that finally makes these systems feel like one product.
          </p>
          <p className="text-sm text-slate-300">
            This frontend demo is a clickable sandbox to explore the product
            shape, flows and views. Under the hood, it&apos;s built with React,
            Vite and Tailwind, ready to be wired to your own APIs and data
            sources.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Who it&apos;s for</h2>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>SaaS founders designing their first GTM motion</li>
            <li>RevOps teams gluing multiple tools together</li>
            <li>Agencies running GTM motions for multiple clients</li>
            <li>Teams that want a shared command center instead of 10 tabs</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
