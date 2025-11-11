import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-10 text-sm space-y-8">
        <section className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Pricing &amp; plans
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Start with a 14-day free trial. No credit card required. After the
            trial, you can continue on a simple monthly subscription or switch
            to annual billing and save 20%.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-[2fr,2fr] items-start">
          {/* Monthly */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col gap-2">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              GTM OS · Pro (Monthly)
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-slate-50">€49</span>
              <span className="text-[11px] text-slate-400">
                / seat / month
              </span>
            </div>
            <p className="text-[12px] text-slate-400">
              Best for early teams that want flexibility and the ability to
              scale up or down month by month.
            </p>
            <ul className="mt-2 space-y-1 text-[12px] text-slate-300">
              <li>• 14-day free trial</li>
              <li>• Full access to all GTM views</li>
              <li>• Unlimited deals, contacts &amp; accounts</li>
              <li>• Workflow builder &amp; basic automations</li>
              <li>• Email support during trial &amp; subscription</li>
            </ul>
            <button className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-xs font-semibold hover:bg-indigo-500">
              Start 14-day trial
            </button>
          </div>

          {/* Annual */}
          <div className="rounded-2xl border border-dashed border-emerald-500/60 bg-slate-900/60 p-5 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Save 20% · Annual billing</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-semibold text-slate-50">€39</span>
              <span className="text-[11px] text-slate-400">
                / seat / month billed yearly
              </span>
            </div>
            <p className="text-[12px] text-slate-300">
              Ideal for teams that are committed to a GTM OS and want to lock in
              savings. Billed annually per seat.
            </p>
            <ul className="mt-2 space-y-1 text-[12px] text-slate-300">
              <li>• Effective €468 per seat / year</li>
              <li>• Same features as the monthly Pro plan</li>
              <li>• Priority on roadmap feedback and design partner calls</li>
            </ul>
            <p className="mt-3 text-[11px] text-slate-500">
              You can start on monthly during the trial and switch to annual
              later, or go straight annual once the 14 days are over.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">What&apos;s included</h2>
          <p className="text-slate-300 max-w-2xl">
            All plans include the same core product. Pricing scales primarily by
            seats. If you need custom onboarding, SLAs or support, we&apos;ll
            structure that as a separate engagement.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
