import React, { useMemo, useState } from "react";

type SubscriptionModel = "SaaS" | "Marketplace";
type SubscriptionStatus =
  | "Active"
  | "Trial"
  | "Pending Renewal"
  | "Past Due"
  | "Churned";

interface Subscription {
  id: string;
  account: string;
  owner: string;
  model: SubscriptionModel;
  plan: string;
  term: "Monthly" | "Annual";
  mrr: number;
  arr: number;
  seats: number;
  status: SubscriptionStatus;
  renewalDate: string; // display only
  lastChange: string;
  nextAction: string;
}

interface SubscriptionChange {
  id: string;
  subscriptionId: string;
  date: string;
  type: "New" | "Upgrade" | "Downgrade" | "Churn" | "Seat change";
  from?: string;
  to?: string;
  notes: string;
  deltaMrr: number;
}

interface RenewalTask {
  id: string;
  subscriptionId: string;
  account: string;
  owner: string;
  due: string;
  type: "Renewal" | "Expansion" | "Save";
  status: "Upcoming" | "Overdue" | "Done";
  notes: string;
}

const initialSubscriptions: Subscription[] = [
  {
    id: "sub1",
    account: "Acme Retail",
    owner: "Nikola",
    model: "SaaS",
    plan: "Pro · 5 seats",
    term: "Annual",
    mrr: 2500,
    arr: 30000,
    seats: 5,
    status: "Active",
    renewalDate: "2026-09-10",
    lastChange: "Upgraded from Starter · 2025-09-10",
    nextAction: "Explore 10-seat expansion before Q3",
  },
  {
    id: "sub2",
    account: "SkyFleet Logistics",
    owner: "Ana",
    model: "Marketplace",
    plan: "Rev-share · 3 agents",
    term: "Monthly",
    mrr: 1800,
    arr: 21600,
    seats: 3,
    status: "Pending Renewal",
    renewalDate: "2025-11-30",
    lastChange: "Added 1 agent seat · 2025-10-15",
    nextAction: "Secure renewal + upsell to 5 agents",
  },
  {
    id: "sub3",
    account: "UrbanFit",
    owner: "Nikola",
    model: "SaaS",
    plan: "Starter · 2 seats",
    term: "Monthly",
    mrr: 600,
    arr: 7200,
    seats: 2,
    status: "Past Due",
    renewalDate: "2025-11-01",
    lastChange: "Card failed · 2025-11-02",
    nextAction: "CS to reach out and recover",
  },
  {
    id: "sub4",
    account: "EuroMart Groceries",
    owner: "Nikola",
    model: "SaaS",
    plan: "Enterprise · 25 seats",
    term: "Annual",
    mrr: 12500,
    arr: 150000,
    seats: 25,
    status: "Active",
    renewalDate: "2026-01-15",
    lastChange: "Expanded from 15 → 25 seats · 2025-10-01",
    nextAction: "Identify upsell to additional regions",
  },
  {
    id: "sub5",
    account: "FitWave Studios",
    owner: "Ana",
    model: "Marketplace",
    plan: "Rev-share · 1 agent",
    term: "Monthly",
    mrr: 400,
    arr: 4800,
    seats: 1,
    status: "Churned",
    renewalDate: "2025-08-01",
    lastChange: "Churned · moved to in-house · 2025-08-10",
    nextAction: "Re-check in 6–9 months",
  },
];

const initialChanges: SubscriptionChange[] = [
  {
    id: "chg1",
    subscriptionId: "sub1",
    date: "2025-09-10",
    type: "Upgrade",
    from: "Starter · 3 seats",
    to: "Pro · 5 seats",
    notes: "Increased usage in 2 new countries.",
    deltaMrr: 1000,
  },
  {
    id: "chg2",
    subscriptionId: "sub2",
    date: "2025-10-15",
    type: "Seat change",
    from: "2 agents",
    to: "3 agents",
    notes: "New region added for outreach.",
    deltaMrr: 600,
  },
  {
    id: "chg3",
    subscriptionId: "sub3",
    date: "2025-11-02",
    type: "Downgrade",
    from: "Starter · 3 seats",
    to: "Starter · 2 seats",
    notes: "Seasonal slowdown, cut 1 seat, then card failed.",
    deltaMrr: -300,
  },
  {
    id: "chg4",
    subscriptionId: "sub4",
    date: "2025-10-01",
    type: "Upgrade",
    from: "Enterprise · 15 seats",
    to: "Enterprise · 25 seats",
    notes: "Rollout to 2 additional regions; strong adoption.",
    deltaMrr: 5000,
  },
  {
    id: "chg5",
    subscriptionId: "sub5",
    date: "2025-08-10",
    type: "Churn",
    from: "Rev-share · 1 agent",
    to: "Churned",
    notes: "Moved outbound back in-house; performance was okay.",
    deltaMrr: -400,
  },
];

const initialTasks: RenewalTask[] = [
  {
    id: "rt1",
    subscriptionId: "sub2",
    account: "SkyFleet Logistics",
    owner: "Ana",
    due: "2025-11-25",
    type: "Renewal",
    status: "Upcoming",
    notes: "Confirm renewal and propose 2 extra agents.",
  },
  {
    id: "rt2",
    subscriptionId: "sub1",
    account: "Acme Retail",
    owner: "Nikola",
    due: "2026-08-15",
    type: "Expansion",
    status: "Upcoming",
    notes: "Review expansion into loyalty for EU stores.",
  },
  {
    id: "rt3",
    subscriptionId: "sub3",
    account: "UrbanFit",
    owner: "Nikola",
    due: "2025-11-05",
    type: "Save",
    status: "Overdue",
    notes: "Payment failed; try recovery and potential downgrade.",
  },
  {
    id: "rt4",
    subscriptionId: "sub5",
    account: "FitWave Studios",
    owner: "Ana",
    due: "2026-03-01",
    type: "Renewal",
    status: "Upcoming",
    notes: "Post-churn check-in. Share win-back offer.",
  },
];

const statusBadgeClasses: Record<SubscriptionStatus, string> = {
  Active: "bg-emerald-950 text-emerald-300 border border-emerald-700",
  Trial: "bg-indigo-950 text-indigo-300 border border-indigo-700",
  "Pending Renewal": "bg-amber-950 text-amber-300 border border-amber-700",
  "Past Due": "bg-red-950 text-red-300 border border-red-700",
  Churned: "bg-slate-900 text-slate-400 border border-slate-700",
};

const RevenuePage: React.FC = () => {
  const [subscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [changes] = useState<SubscriptionChange[]>(initialChanges);
  const [tasks] = useState<RenewalTask[]>(initialTasks);
  const [selectedId, setSelectedId] = useState<string>(
    initialSubscriptions[0]?.id ?? ""
  );
  const [modelFilter, setModelFilter] = useState<SubscriptionModel | "All">(
    "All"
  );
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "All">(
    "All"
  );
  const [termView, setTermView] = useState<"MRR" | "ARR">("MRR");
  const [search, setSearch] = useState("");

  const filteredSubscriptions = useMemo(
    () =>
      subscriptions.filter((sub) => {
        const matchesModel =
          modelFilter === "All" || sub.model === modelFilter;
        const matchesStatus =
          statusFilter === "All" || sub.status === statusFilter;
        const lc = search.toLowerCase();
        const matchesText =
          !lc ||
          sub.account.toLowerCase().includes(lc) ||
          sub.plan.toLowerCase().includes(lc) ||
          sub.owner.toLowerCase().includes(lc);
        return matchesModel && matchesStatus && matchesText;
      }),
    [subscriptions, modelFilter, statusFilter, search]
  );

  const selected =
    filteredSubscriptions.find((s) => s.id === selectedId) ||
    filteredSubscriptions[0] ||
    null;

  // Derived metrics
  const activeSubs = subscriptions.filter((s) => s.status === "Active");
  const totalMrr = activeSubs.reduce((sum, s) => sum + s.mrr, 0);
  const totalArr = activeSubs.reduce((sum, s) => sum + s.arr, 0);

  const netNewMrrLast30 = changes.reduce((sum, c) => sum + c.deltaMrr, 0);

  const churnedMrr = subscriptions
    .filter((s) => s.status === "Churned")
    .reduce((sum, s) => sum + s.mrr, 0);

  const churnRate =
    totalMrr + churnedMrr > 0
      ? Math.round((churnedMrr / (totalMrr + churnedMrr)) * 100)
      : 0;

  const upcomingTasks = tasks.filter((t) => t.status !== "Done");

  const selectedChanges = useMemo(
    () =>
      selected
        ? changes.filter((c) => c.subscriptionId === selected.id)
        : [],
    [changes, selected]
  );

  const selectedTasks = useMemo(
    () =>
      selected
        ? tasks.filter((t) => t.subscriptionId === selected.id)
        : [],
    [tasks, selected]
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const pillClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs border ${
      active
        ? "bg-indigo-600 border-indigo-500 text-slate-50"
        : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Revenue & Subscriptions
          </h1>
          <p className="text-sm text-slate-400">
            Track recurring revenue, subscription changes, and renewal actions
            for your SaaS and agent marketplace deals.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            className={pillClass(termView === "MRR")}
            onClick={() => setTermView("MRR")}
          >
            MRR view
          </button>
          <button
            className={pillClass(termView === "ARR")}
            onClick={() => setTermView("ARR")}
          >
            ARR view
          </button>
        </div>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Total {termView}</div>
          <div className="text-lg font-semibold text-slate-50">
            {termView === "MRR" ? formatCurrency(totalMrr) : formatCurrency(totalArr)}
          </div>
          <div className="text-[11px] text-slate-500">
            Across {activeSubs.length} active subscriptions
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Net new MRR (last 30d)</div>
          <div
            className={`text-lg font-semibold ${
              netNewMrrLast30 >= 0 ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {formatCurrency(netNewMrrLast30)}
          </div>
          <div className="text-[11px] text-slate-500">
            Upgrades, downgrades & churn (mock window)
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Churned MRR</div>
          <div className="text-lg font-semibold text-slate-50">
            {formatCurrency(churnedMrr)}
          </div>
          <div className="text-[11px] text-slate-500">
            Approx. churn rate: {churnRate}%
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Renewal & expansion tasks</div>
          <div className="text-lg font-semibold text-slate-50">
            {upcomingTasks.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Generated from subscription renewals (frontend-only)
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 mr-1">Model:</span>
        <button
          className={pillClass(modelFilter === "All")}
          onClick={() => setModelFilter("All")}
        >
          All
        </button>
        <button
          className={pillClass(modelFilter === "SaaS")}
          onClick={() => setModelFilter("SaaS")}
        >
          SaaS
        </button>
        <button
          className={pillClass(modelFilter === "Marketplace")}
          onClick={() => setModelFilter("Marketplace")}
        >
          Agent marketplace
        </button>

        <span className="text-slate-400 ml-4 mr-1">Status:</span>
        {(["All", "Active", "Pending Renewal", "Past Due", "Churned"] as const)
          .map((status) => (
            <button
              key={status}
              className={pillClass(statusFilter === (status as any))}
              onClick={() =>
                setStatusFilter(
                  status === "All" ? "All" : (status as SubscriptionStatus)
                )
              }
            >
              {status}
            </button>
          ))}

        <input
          type="text"
          placeholder="Search accounts, plans, owners…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs min-w-[220px] focus:outline-none focus:ring-1 focus:ring-indigo-500 ml-auto"
        />
      </div>

      {/* Main layout: left list + right detail */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[280px]">
        {/* Left: subscriptions list */}
        <div className="w-full md:w-80 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Subscriptions</span>
            <span className="text-[11px] text-slate-500">
              {filteredSubscriptions.length} shown
            </span>
          </div>
          <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/60">
            {filteredSubscriptions.length === 0 ? (
              <div className="p-3 text-slate-500 italic">
                No subscriptions match your filters.
              </div>
            ) : (
              <ul className="divide-y divide-slate-800">
                {filteredSubscriptions.map((sub) => (
                  <li
                    key={sub.id}
                    onClick={() => setSelectedId(sub.id)}
                    className={`p-3 cursor-pointer hover:bg-slate-900/80 ${
                      selected?.id === sub.id ? "bg-slate-900/80" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-slate-50">
                        {sub.account}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          statusBadgeClasses[sub.status]
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <div className="text-slate-400 mb-1">
                      {sub.plan} · {sub.model}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        {sub.term} · Owner: {sub.owner}
                      </span>
                      <span>
                        {formatCurrency(sub.mrr)} MRR /{" "}
                        {formatCurrency(sub.arr)} ARR
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: subscription detail + changes + renewal tasks */}
        <div className="flex-1 flex flex-col gap-3 text-xs">
          {selected ? (
            <>
              {/* Selected subscription header */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-slate-400 uppercase text-[11px]">
                      Subscription
                    </div>
                    <div className="text-sm font-semibold text-slate-50">
                      {selected.account} · {selected.plan}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <div>Owner: {selected.owner}</div>
                    <div>Renewal date: {selected.renewalDate}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded-full ${statusBadgeClasses[selected.status]}`}
                  >
                    {selected.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    Model: {selected.model}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    {formatCurrency(selected.mrr)} MRR /{" "}
                    {formatCurrency(selected.arr)} ARR
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    {selected.seats} seats
                  </span>
                </div>
                <div className="mt-1 text-slate-400 text-[11px]">
                  {selected.lastChange}
                </div>
                <div className="mt-1 text-slate-500 text-[11px]">
                  Next action: {selected.nextAction}
                </div>
              </div>

              {/* Bottom grid: changes & tasks */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Change history */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
                  <div className="text-slate-400 font-semibold mb-2">
                    Subscription change history
                  </div>
                  <div className="flex-1 overflow-auto space-y-2">
                    {selectedChanges.length === 0 ? (
                      <div className="text-slate-500 text-[11px] italic">
                        No changes recorded yet (dummy data).
                      </div>
                    ) : (
                      selectedChanges.map((chg) => (
                        <div
                          key={chg.id}
                          className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 text-[11px]"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-slate-200">
                              {chg.type}
                            </span>
                            <span className="text-slate-500">
                              {chg.date}
                            </span>
                          </div>
                          <div className="text-slate-400">
                            {chg.from && chg.to && (
                              <div>
                                {chg.from} → {chg.to}
                              </div>
                            )}
                            <div className="text-slate-500">
                              {chg.notes}
                            </div>
                          </div>
                          <div
                            className={`mt-1 font-semibold ${
                              chg.deltaMrr >= 0
                                ? "text-emerald-300"
                                : "text-red-300"
                            }`}
                          >
                            {chg.deltaMrr >= 0 ? "+" : ""}
                            {formatCurrency(chg.deltaMrr)} MRR
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Later you can populate this from billing events (upgrades,
                    downgrades, seat changes, cancellations).
                  </div>
                </div>

                {/* Renewal / expansion tasks */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
                  <div className="text-slate-400 font-semibold mb-2">
                    Renewal & expansion tasks
                  </div>
                  <div className="flex-1 overflow-auto space-y-2">
                    {selectedTasks.length === 0 ? (
                      <div className="text-slate-500 text-[11px] italic">
                        No tasks yet for this subscription (dummy data).
                      </div>
                    ) : (
                      selectedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 text-[11px]"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-slate-200">
                              {task.type} · {task.account}
                            </span>
                            <span className="text-slate-500">
                              {task.due}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-slate-400">
                              Owner: {task.owner}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full ${
                                task.status === "Upcoming"
                                  ? "bg-slate-950 text-emerald-300 border border-emerald-700"
                                  : task.status === "Overdue"
                                  ? "bg-red-950 text-red-300 border border-red-700"
                                  : "bg-slate-900 text-slate-300 border border-slate-700"
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                          <div className="text-slate-500">{task.notes}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    This simulates “generate renewal tasks from subscriptions”.
                    Later you can sync this with your actual Tasks module.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-2xl">
              No subscriptions selected. Choose one on the left to see its MRR,
              history and renewal tasks.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
