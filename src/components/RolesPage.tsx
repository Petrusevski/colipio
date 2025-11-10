import React, { useState } from "react";

type RoleKey = "enrichment" | "outreach" | "sales" | "ops";

interface EnrichmentRecord {
  id: string;
  company: string;
  contact: string;
  owner: string;
  sourceHint: string;
  missingFields: string[];
  priority: "High" | "Medium" | "Low";
}

interface OutreachTask {
  id: string;
  contact: string;
  company: string;
  channel: "LinkedIn" | "Email" | "Call";
  step: string;
  sequence: string;
  owner: string;
  due: string;
}

interface SalesDealRow {
  id: string;
  name: string;
  account: string;
  stage:
    | "New"
    | "Outreach"
    | "Qualified"
    | "Replied"
    | "Opportunity"
    | "Closed"
    | "Lost";
  owner: string;
  value: number;
  nextStep: string;
  risk: "Low" | "Medium" | "High";
}

interface OpsTask {
  id: string;
  account: string;
  owner: string;
  type: "Renewal" | "Expansion" | "Save";
  mrr: number;
  renewalDate: string;
  status: "Upcoming" | "Overdue";
  notes: string;
}

const enrichmentRecords: EnrichmentRecord[] = [
  {
    id: "er1",
    company: "Acme Retail",
    contact: "Sarah Johnson",
    owner: "Nikola",
    sourceHint: "Added from CSV",
    missingFields: ["Tech stack", "Region", "LinkedIn URL"],
    priority: "High",
  },
  {
    id: "er2",
    company: "UrbanFit",
    contact: "Julia Rossi",
    owner: "Nikola",
    sourceHint: "Inbound form",
    missingFields: ["Employee count", "Annual revenue"],
    priority: "Medium",
  },
  {
    id: "er3",
    company: "FitWave Studios",
    contact: "Eva Rossi",
    owner: "Ana",
    sourceHint: "Partner referral",
    missingFields: ["Industry tags"],
    priority: "Low",
  },
  {
    id: "er4",
    company: "SkyFleet Logistics",
    contact: "Liam Novak",
    owner: "Ana",
    sourceHint: "Event scan",
    missingFields: ["HQ location", "Tech stack"],
    priority: "High",
  },
];

const outreachTasks: OutreachTask[] = [
  {
    id: "ot1",
    contact: "Sarah Johnson",
    company: "Acme Retail",
    channel: "LinkedIn",
    step: "Step 2 · Soft bump",
    sequence: "Loyalty SaaS · Mid-market cold",
    owner: "Nikola",
    due: "Today · 15:00",
  },
  {
    id: "ot2",
    contact: "Liam Novak",
    company: "SkyFleet Logistics",
    channel: "Email",
    step: "Step 3 · Case study send",
    sequence: "Enrichment → Outreach combo",
    owner: "Ana",
    due: "Today · 16:30",
  },
  {
    id: "ot3",
    contact: "Julia Rossi",
    company: "UrbanFit",
    channel: "Call",
    step: "Follow up on no-show",
    sequence: "SMB Fitness follow-up",
    owner: "Nikola",
    due: "Tomorrow",
  },
  {
    id: "ot4",
    contact: "Martin Schulz",
    company: "EuroMart Groceries",
    channel: "Email",
    step: "Send retail loyalty deck",
    sequence: "Enterprise retail evaluation",
    owner: "Nikola",
    due: "Today · 18:00",
  },
];

const salesDeals: SalesDealRow[] = [
  {
    id: "sd1",
    name: "Acme Retail · Pilot",
    account: "Acme Retail",
    stage: "Opportunity",
    owner: "Nikola",
    value: 18000,
    nextStep: "Confirm pilot scope and pricing",
    risk: "Medium",
  },
  {
    id: "sd2",
    name: "SkyFleet · Evaluation",
    account: "SkyFleet Logistics",
    stage: "Qualified",
    owner: "Ana",
    value: 42000,
    nextStep: "Schedule technical deep dive",
    risk: "Low",
  },
  {
    id: "sd3",
    name: "UrbanFit · Starter plan",
    account: "UrbanFit",
    stage: "Replied",
    owner: "Nikola",
    value: 9000,
    nextStep: "Book demo and share pricing",
    risk: "Medium",
  },
  {
    id: "sd4",
    name: "EuroMart · Enterprise rollout",
    account: "EuroMart Groceries",
    stage: "Opportunity",
    owner: "Nikola",
    value: 65000,
    nextStep: "Send updated proposal · QBR",
    risk: "High",
  },
];

const opsTasks: OpsTask[] = [
  {
    id: "op1",
    account: "SkyFleet Logistics",
    owner: "Ana",
    type: "Renewal",
    mrr: 1800,
    renewalDate: "2025-11-30",
    status: "Upcoming",
    notes: "Confirm renewal + upsell to 5 agents.",
  },
  {
    id: "op2",
    account: "UrbanFit",
    owner: "Nikola",
    type: "Save",
    mrr: 600,
    renewalDate: "2025-11-01",
    status: "Overdue",
    notes: "Card failed; propose downgrade instead of churn.",
  },
  {
    id: "op3",
    account: "Acme Retail",
    owner: "Nikola",
    type: "Expansion",
    mrr: 2500,
    renewalDate: "2026-09-10",
    status: "Upcoming",
    notes: "Explore expansion to EU stores for loyalty.",
  },
  {
    id: "op4",
    account: "FitWave Studios",
    owner: "Ana",
    type: "Renewal",
    mrr: 400,
    renewalDate: "2026-03-01",
    status: "Upcoming",
    notes: "Post-churn win-back motion with discount.",
  },
];

const badgePriority: Record<EnrichmentRecord["priority"], string> = {
  High: "bg-red-950 text-red-300 border border-red-700",
  Medium: "bg-amber-950 text-amber-300 border border-amber-700",
  Low: "bg-slate-900 text-slate-300 border border-slate-700",
};

const riskColor: Record<SalesDealRow["risk"], string> = {
  High: "text-red-300",
  Medium: "text-amber-300",
  Low: "text-emerald-300",
};

const opsStatusClass: Record<OpsTask["status"], string> = {
  Upcoming: "bg-slate-950 text-emerald-300 border border-emerald-700",
  Overdue: "bg-red-950 text-red-300 border border-red-700",
};

const RolesPage: React.FC = () => {
  const [role, setRole] = useState<RoleKey>("enrichment");

  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs border ${
      active
        ? "bg-indigo-600 border-indigo-500 text-slate-50"
        : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
    }`;

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Role-based views
          </h1>
          <p className="text-sm text-slate-400">
            Switch between Enrichment, Outreach, Sales and Ops dashboards. Each
            role sees the work that actually matters to them.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            className={pill(role === "enrichment")}
            onClick={() => setRole("enrichment")}
          >
            🔍 Enrichment
          </button>
          <button
            className={pill(role === "outreach")}
            onClick={() => setRole("outreach")}
          >
            📬 Outreach
          </button>
          <button
            className={pill(role === "sales")}
            onClick={() => setRole("sales")}
          >
            💼 Sales pipeline
          </button>
          <button
            className={pill(role === "ops")}
            onClick={() => setRole("ops")}
          >
            🛟 Ops & renewals
          </button>
        </div>
      </div>

      {/* Role-specific dashboards */}
      {role === "enrichment" && (
        <div className="flex-1 flex flex-col lg:flex-row gap-3 text-xs">
          {/* Left: metrics */}
          <div className="w-full lg:w-72 flex flex-col gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
              <div className="text-slate-400 mb-1 font-semibold">
                Enrichment overview
              </div>
              <div className="text-slate-300">
                Records to enrich:{" "}
                <span className="font-semibold">
                  {enrichmentRecords.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                You can later drive this from Clay queues or internal
                enrichment jobs.
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
              <div className="text-slate-400 font-semibold mb-1">
                How this role works
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                <li>Pull records missing key firmographic fields.</li>
                <li>Prioritize by impact (ICP, open deals, trial users).</li>
                <li>One-click send to Clay / enrichment providers (later).</li>
                <li>Push enriched contacts into Outreach / Sequences view.</li>
              </ul>
            </div>
          </div>

          {/* Right: table of records to enrich */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-400 font-semibold">
                Records to enrich
              </div>
              <div className="text-[11px] text-slate-500">
                Frontend-only. Later this can be driven from your actual data.
              </div>
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="min-w-full text-[11px]">
                <thead className="bg-slate-950">
                  <tr className="text-slate-400 text-left">
                    <th className="px-3 py-2">Company</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Owner</th>
                    <th className="px-3 py-2">Missing fields</th>
                    <th className="px-3 py-2">Priority</th>
                    <th className="px-3 py-2">Hint</th>
                    <th className="px-3 py-2">Suggested action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichmentRecords.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-slate-800 hover:bg-slate-900/80"
                    >
                      <td className="px-3 py-2 text-slate-100">
                        {r.company}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.contact}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {r.owner}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {r.missingFields.join(", ")}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] ${badgePriority[r.priority]}`}
                        >
                          {r.priority}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-400">
                        {r.sourceHint}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        Send to Clay for enrichment, then push to outreach.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {role === "outreach" && (
        <div className="flex-1 flex flex-col lg:flex-row gap-3 text-xs">
          {/* Left: metrics */}
          <div className="w-full lg:w-72 flex flex-col gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
              <div className="text-slate-400 mb-1 font-semibold">
                Outreach overview
              </div>
              <div className="text-slate-300">
                Manual steps due:{" "}
                <span className="font-semibold">
                  {outreachTasks.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Think of this as a &quot;rep console&quot; for LinkedIn / email
                / calls.
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
              <div className="text-slate-400 font-semibold mb-1">
                How this role works
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                <li>See all manual steps for today by channel.</li>
                <li>Jump directly into LinkedIn / inbox / dialer (later).</li>
                <li>Update outcomes to feed GTM Analytics & Pipeline.</li>
                <li>Sync sequence performance back into Sequences view.</li>
              </ul>
            </div>
          </div>

          {/* Right: outreach tasks table */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-400 font-semibold">
                Outreach dashboard · Today&apos;s tasks
              </div>
              <div className="text-[11px] text-slate-500">
                Channels: LinkedIn, Email, Calls.
              </div>
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="min-w-full text-[11px]">
                <thead className="bg-slate-950">
                  <tr className="text-slate-400 text-left">
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Company</th>
                    <th className="px-3 py-2">Channel</th>
                    <th className="px-3 py-2">Step</th>
                    <th className="px-3 py-2">Sequence</th>
                    <th className="px-3 py-2">Owner</th>
                    <th className="px-3 py-2">Due</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {outreachTasks.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-slate-800 hover:bg-slate-900/80"
                    >
                      <td className="px-3 py-2 text-slate-100">
                        {t.contact}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {t.company}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.channel}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.step}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.sequence}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.owner}
                      </td>
                      <td className="px-3 py-2 text-slate-400">
                        {t.due}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        Mark as sent / log outcome (later API).
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {role === "sales" && (
        <div className="flex-1 flex flex-col lg:flex-row gap-3 text-xs">
          {/* Left: metrics */}
          <div className="w-full lg:w-72 flex flex-col gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
              <div className="text-slate-400 mb-1 font-semibold">
                Sales pipeline snapshot
              </div>
              <div className="text-slate-300">
                Open deals:{" "}
                <span className="font-semibold">
                  {salesDeals.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Uses the same stages as your main pipeline, just focused on
                what sales cares about today.
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
              <div className="text-slate-400 font-semibold mb-1">
                How this role works
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                <li>Highlight deals at risk or stuck in stage.</li>
                <li>Surface next best actions per opportunity.</li>
                <li>Feed forecast into Revenue & Analytics pages.</li>
                <li>Later: sync directly with your primary CRM if needed.</li>
              </ul>
            </div>
          </div>

          {/* Right: deals grid */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-400 font-semibold">
                Sales pipeline · Deals needing attention
              </div>
              <div className="text-[11px] text-slate-500">
                Frontend-only summary of key opportunities.
              </div>
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="min-w-full text-[11px]">
                <thead className="bg-slate-950">
                  <tr className="text-slate-400 text-left">
                    <th className="px-3 py-2">Deal</th>
                    <th className="px-3 py-2">Account</th>
                    <th className="px-3 py-2">Stage</th>
                    <th className="px-3 py-2">Owner</th>
                    <th className="px-3 py-2">Value</th>
                    <th className="px-3 py-2">Risk</th>
                    <th className="px-3 py-2">Next step</th>
                  </tr>
                </thead>
                <tbody>
                  {salesDeals.map((d) => (
                    <tr
                      key={d.id}
                      className="border-t border-slate-800 hover:bg-slate-900/80"
                    >
                      <td className="px-3 py-2 text-slate-100">
                        {d.name}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {d.account}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {d.stage}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {d.owner}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {formatCurrency(d.value)}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`font-semibold ${riskColor[d.risk]}`}
                        >
                          {d.risk}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {d.nextStep}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {role === "ops" && (
        <div className="flex-1 flex flex-col lg:flex-row gap-3 text-xs">
          {/* Left: metrics */}
          <div className="w-full lg:w-72 flex flex-col gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
              <div className="text-slate-400 mb-1 font-semibold">
                Ops & renewals snapshot
              </div>
              <div className="text-slate-300">
                Active tasks:{" "}
                <span className="font-semibold">
                  {opsTasks.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Ties in with the Revenue page to manage renewals, saves and
                expansions.
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
              <div className="text-slate-400 font-semibold mb-1">
                How this role works
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                <li>See upcoming renewals and at-risk accounts.</li>
                <li>Coordinate with Sales & CS on save motions.</li>
                <li>Trigger tasks into the global Tasks module later.</li>
                <li>Feed MRR/ARR projections back to Revenue/Analytics.</li>
              </ul>
            </div>
          </div>

          {/* Right: ops tasks table */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-400 font-semibold">
                Ops & renewal dashboard
              </div>
              <div className="text-[11px] text-slate-500">
                Mix of renewal, expansion and save tasks (dummy data).
              </div>
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="min-w-full text-[11px]">
                <thead className="bg-slate-950">
                  <tr className="text-slate-400 text-left">
                    <th className="px-3 py-2">Account</th>
                    <th className="px-3 py-2">Owner</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">MRR</th>
                    <th className="px-3 py-2">Renewal date</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {opsTasks.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-slate-800 hover:bg-slate-900/80"
                    >
                      <td className="px-3 py-2 text-slate-100">
                        {t.account}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.owner}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.type}
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {formatCurrency(t.mrr)}
                      </td>
                      <td className="px-3 py-2 text-slate-400">
                        {t.renewalDate}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-0.5 rounded-full ${opsStatusClass[t.status]}`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-300">
                        {t.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPage;
