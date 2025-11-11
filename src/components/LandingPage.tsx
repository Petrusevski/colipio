import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchApp = () => navigate("/signin");
  const handleGetStarted = () => navigate("/signup");
  const handleViewDemo = () => navigate("/demo");

  const features = [
    {
      title: "GTM-native pipeline CRM",
      desc: "Deal board built for enrichment, sequences and outbound—not generic opportunities.",
      badge: "Pipeline",
    },
    {
      title: "Agentic workflow builder",
      desc: "Describe flows in natural language and turn them into visual automations.",
      badge: "Automation",
    },
    {
      title: "Multi-channel outreach hub",
      desc: "Email, LinkedIn, calls and social in one place, connected to your GTM tools.",
      badge: "Outreach",
    },
    {
      title: "Recurring revenue view",
      desc: "Track SaaS and agent marketplace MRR, ARR, churn and renewals.",
      badge: "Revenue",
    },
    {
      title: "GTM analytics",
      desc: "Enrichment → outreach → replies → meetings. See what actually works.",
      badge: "Analytics",
    },
    {
      title: "Role-based dashboards",
      desc: "Enrichment, SDR / AE, Ops & Renewals each get their own command center.",
      badge: "Roles",
    },
    {
      title: "Deep GTM integrations",
      desc: "Clay, HeyReach, SmartLead and the rest of your GTM stack in sync.",
      badge: "Connectors",
    },
    {
      title: "Projects on top of deals",
      desc: "Onboarding, success and renewal tasks layered directly on deals.",
      badge: "Projects",
    },
  ];

  const tools = [
    "Clay",
    "HeyReach",
    "SmartLead",
    "Salesforce",
    "HubSpot",
    "Apollo",
    "Outreach",
    "Salesloft",
    "ZoomInfo",
    "Slack",
  ];

  const roleTiles = [
    {
      label: "Enrichment",
      emoji: "🔍",
      desc: "See records missing key data, send to enrichment, route into outreach.",
    },
    {
      label: "SDR / AE",
      emoji: "📬",
      desc: "Today’s manual steps, multi-channel follow-ups and active sequences.",
    },
    {
      label: "Sales leadership",
      emoji: "📊",
      desc: "Pipeline health, GTM analytics and forecast by enrichment source.",
    },
    {
      label: "RevOps / CS",
      emoji: "🛟",
      desc: "Renewals, expansions and saves tied to subscriptions and MRR.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Reusable global header */}
      <Header onLaunchApp={handleLaunchApp} onViewDemo={handleViewDemo} />

      {/* Main content */}
      <main className="flex-1 mx-auto max-w-6xl px-4 pb-16 pt-8 space-y-16">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-[11px] text-slate-300 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Built for Clay · HeyReach · SmartLead era GTM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
              A GTM-native CRM that actually understands{" "}
              <span className="text-indigo-400">outbound</span>.
            </h1>
            <p className="mt-3 text-sm text-slate-300 max-w-xl">
              One place for enrichment, sequences, pipeline, revenue and
              workflows. Plug in your GTM tools and make this the{" "}
              <span className="text-slate-100">single source of truth</span> for
              your go-to-market motion.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {/* → Sign up */}
              <button
                className="px-4 py-2 rounded-xl bg-indigo-600 text-xs font-semibold hover:bg-indigo-500"
                onClick={handleGetStarted}
              >
                Get started free
              </button>

              {/* → Sign in */}
              <button
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-900"
                onClick={handleLaunchApp}
              >
                Launch app
              </button>

              {/* → Demo form */}
              <button
                className="px-4 py-2 rounded-xl border border-slate-700/70 text-xs text-slate-300 hover:bg-slate-900/70"
                onClick={handleViewDemo}
              >
                Book a GTM walkthrough
              </button>

              <span className="text-[11px] text-slate-500">
                Frontend-only demo · No credit card
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-sm text-[11px] text-slate-400">
              <div>
                <div className="text-slate-100 font-semibold">8</div>
                <div>GTM views out of the box</div>
              </div>
              <div>
                <div className="text-slate-100 font-semibold">10+</div>
                <div>Connectors ready to wire</div>
              </div>
              <div>
                <div className="text-slate-100 font-semibold">1</div>
                <div>Command center for your stack</div>
              </div>
            </div>
          </div>

          {/* Hero preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-indigo-500/20 via-emerald-500/10 to-transparent blur-2xl" />
            <div className="relative rounded-[28px] border border-slate-800 bg-slate-950/80 shadow-lg shadow-black/60 p-3 text-[11px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-300">Pipeline overview</span>
                </div>
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                  GTM CRM
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {["New", "Outreach", "Opportunity"].map((stage) => (
                  <div
                    key={stage}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300">{stage}</span>
                      <span className="text-slate-500 text-[10px]">
                        3 deals
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="rounded-xl bg-slate-950 border border-slate-800 px-2 py-1">
                        <div className="text-slate-100">
                          Acme Retail · Pilot
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>$18k MRR</span>
                          <span>Clay → HeyReach</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-950 border border-slate-800 px-2 py-1">
                        <div className="text-slate-100">
                          SkyFleet · Evaluation
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>$42k MRR</span>
                          <span>SmartLead</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-2">
                  <div className="text-slate-300 mb-1">
                    Workflow: Enrich → Outreach
                  </div>
                  <div className="space-y-1 text-[10px] text-slate-400">
                    <div>When enrichment score &gt; 80</div>
                    <div>→ Enroll in “Loyalty SaaS cold”</div>
                    <div>→ If no reply in 7 days → LinkedIn bump</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-2">
                  <div className="text-slate-300 mb-1">
                    Revenue snapshot (mock)
                  </div>
                  <div className="text-slate-100 text-sm">$51k MRR</div>
                  <div className="text-[10px] text-slate-500">
                    4 subscriptions · 2 at-risk renewals
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-2/3 bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product */}
        <section id="product" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">
                Everything GTM teams need, in one place.
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                You already have Clay, HeyReach, SmartLead and a CRM. This is
                the layer that finally connects them into a single GTM system.
              </p>
            </div>
            <div className="text-[11px] text-slate-500">
              All views are powered by the same underlying deal + contact
              model.
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 flex flex-col gap-1"
              >
                <span className="inline-flex w-fit rounded-full bg-slate-950 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-400">
                  {f.badge}
                </span>
                <h3 className="text-xs font-semibold text-slate-50">
                  {f.title}
                </h3>
                <p className="text-[11px] text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">
                Role-based dashboards out of the box.
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Every GTM persona gets a tailored workspace—on top of the same
                shared data model.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {roleTiles.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 flex flex-col gap-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{r.emoji}</span>
                  <span className="text-xs font-semibold text-slate-50">
                    {r.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section id="integrations" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">
                Built to sit on top of your GTM stack.
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Plug in enrichment, outreach, CRM and intelligence tools. Keep
                this GTM CRM as the single source of truth.
              </p>
            </div>
            <div className="text-[11px] text-slate-500">
              All integrations are mocked in this demo—ready for API wiring.
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="text-slate-200 mr-1">Connectors:</span>
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[11px]"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-3 text-[11px] text-slate-400">
              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-2">
                <div className="text-slate-200 mb-1">Central sync</div>
                <p>
                  Live sync and webhook ingestion let you keep sequences,
                  replies and deals in lockstep with the rest of your stack.
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-2">
                <div className="text-slate-200 mb-1">Field mapping</div>
                <p>
                  Opinionated defaults for enrichment, outreach and CRM—customizable
                  later via a mapping UI.
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-2">
                <div className="text-slate-200 mb-1">GTM telemetry</div>
                <p>
                  Everything flows into GTM Analytics: enrichment rates, reply
                  rates, channel performance and forecast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / CTA */}
        <section id="pricing" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">
                14-day free trial. Simple pricing afterwards.
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Test your GTM OS with real flows and dummy data for two weeks.
                After the trial, keep everything running on a simple monthly
                subscription or switch to annual and save 20%.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[2fr,3fr] items-start">
            {/* Main subscription plan */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col gap-2">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                GTM OS · Pro
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-50">
                  €49
                </span>
                <span className="text-[11px] text-slate-400">
                  /seat /month
                </span>
              </div>

              <p className="text-[11px] text-slate-400">
                14-day free trial, then €49 per seat per month. Cancel
                anytime. Ideal for SaaS founders, small GTM teams and agencies.
              </p>

              <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                <li>• Full access to all GTM views</li>
                <li>• Unlimited deals, contacts &amp; accounts</li>
                <li>• Workflow builder &amp; basic automations</li>
                <li>• Email support during trial &amp; subscription</li>
              </ul>

              <button className="mt-3 w-full rounded-xl bg-indigo-600 py-2 text-xs font-semibold hover:bg-indigo-500">
                Start 14-day free trial
              </button>

              <p className="mt-1 text-[10px] text-slate-500">
                No commitment during trial. You decide on monthly vs. annual
                at the end of the 14 days.
              </p>
            </div>

            {/* Annual option / explainer */}
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-4 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Save 20% with annual</span>
              </div>

              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-semibold text-slate-50">
                  €39
                </span>
                <span className="text-[11px] text-slate-400">
                  /seat /month billed yearly
                </span>
              </div>

              <p className="text-[11px] text-slate-300">
                Switch to annual after your trial and lock in a 20% discount:
                pay once per year, keep the same features and seats, and avoid
                monthly billing friction.
              </p>

              <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                <li>• €468 per seat per year (vs. €588 on monthly)</li>
                <li>• Same feature set as the monthly Pro plan</li>
                <li>• Perfect for committed teams and agencies</li>
              </ul>

              <div className="mt-3 text-[11px] text-slate-500">
                You can start on monthly, upgrade to annual later, or go
                straight annual after your 14-day trial if the GTM OS fits
                your workflow.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Reusable global footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
