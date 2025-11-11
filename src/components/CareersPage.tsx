import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const CareersPage: React.FC = () => {
  const roles = [
    {
      title: "Founding Engineer (Full-stack)",
      type: "Remote · Full-time",
      desc: "Help shape the product, architecture and developer experience for the GTM command center.",
    },
    {
      title: "Product Designer (GTM workflows)",
      type: "Remote · Full-time",
      desc: "Design views, flows and patterns for enrichment, outreach, pipelines and revenue dashboards.",
    },
    {
      title: "GTM Advisor / Partner",
      type: "Part-time · Contract",
      desc: "Bring real-world GTM playbooks, work with early users and help us shape Colipio for teams like yours.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-12 space-y-8">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            Careers at Colipio Labs
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            We&apos;re a small, product-obsessed team building a GTM-native CRM
            for modern SaaS and agency workflows. If you love connecting tools,
            designing flows and working close to users, we&apos;d love to talk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Open roles</h2>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-50">
                    {role.title}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {role.type}
                  </span>
                </div>
                <p className="text-[12px] text-slate-300">{role.desc}</p>
                <button className="mt-2 w-fit rounded-lg bg-indigo-600 px-3 py-1 text-[11px] font-semibold hover:bg-indigo-500">
                  Express interest
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">How we work</h2>
          <p className="text-sm text-slate-300">
            We&apos;re default-remote, async-friendly and deeply focused on
            product. You&apos;ll work with founders, early design partners and
            real GTM teams shaping the product every week.
          </p>
          <p className="text-sm text-slate-300">
            No formal hiring process yet — if this resonates, reach out with
            your background and a short note on how you&apos;d plug into the
            product.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
