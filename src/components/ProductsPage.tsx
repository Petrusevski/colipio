import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-4 py-10 space-y-10 text-sm">
        <section className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Product overview
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Colipio is a GTM-native CRM and command center. It brings
            enrichment, outreach, pipeline, revenue and workflows into a single
            workspace built for modern SaaS and agency teams.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Core modules</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-[13px]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                Pipeline CRM
              </h3>
              <p className="text-slate-400">
                A deal board built around outbound, enrichment and GTM projects
                — not generic &quot;opportunities&quot;.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                Contacts &amp; Accounts
              </h3>
              <p className="text-slate-400">
                Unified contact and account model that sits between Clay,
                sequencers and your existing CRM.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                Sequences &amp; Tasks
              </h3>
              <p className="text-slate-400">
                Multi-channel outreach and manual tasks in one place, tied
                directly to deals and GTM projects.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                Workflows
              </h3>
              <p className="text-slate-400">
                Agentic workflow builder for &quot;enrich → route → enroll in
                sequence → bump if no reply&quot; style automations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                Revenue &amp; Renewals
              </h3>
              <p className="text-slate-400">
                Simple subscription model for MRR / ARR, renewals and expansions
                layered on top of pipeline.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-slate-50 text-sm font-semibold mb-1">
                GTM Analytics
              </h3>
              <p className="text-slate-400">
                From enrichment → sends → replies → meetings → revenue, with
                breakdowns by source, channel and sequence.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Integrations</h2>
          <p className="text-slate-300 max-w-2xl">
            This demo is frontend-only, but the product is designed to sit on
            top of your existing GTM stack: Clay, HeyReach, SmartLead, Salesforce,
            HubSpot and more.
          </p>
          <div className="flex flex-wrap gap-2 text-[12px] text-slate-300">
            {["Clay", "HeyReach", "SmartLead", "Salesforce", "HubSpot", "Apollo", "Outreach", "Salesloft", "Slack", "ZoomInfo"].map(
              (tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
