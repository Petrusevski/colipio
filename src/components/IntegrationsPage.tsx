import React, { useMemo, useState } from "react";

type ConnectorStatus = "Connected" | "Not Connected" | "Coming Soon";
type ConnectorCategory =
  | "Enrichment"
  | "Outreach"
  | "CRM"
  | "Intelligence"
  | "Comms";

interface Connector {
  id: string;
  name: string;
  logo: string; // emoji or short label
  category: ConnectorCategory;
  description: string;
  status: ConnectorStatus;
  liveSync: boolean;
  webhook: boolean;
  lastSync: string | null;
  primaryUse: string;
  supports: {
    contacts: boolean;
    sequences: boolean;
    replies: boolean;
    deals: boolean;
    tasks: boolean;
  };
}

interface SyncEvent {
  id: string;
  connectorId: string;
  title: string;
  timestamp: string;
  detail: string;
  type:
    | "Enrichment"
    | "Sequence"
    | "Reply"
    | "Deal"
    | "Task"
    | "System";
}

const initialConnectors: Connector[] = [
  // Core 3 (your target)
  {
    id: "clay",
    name: "Clay",
    logo: "🧱",
    category: "Enrichment",
    description:
      "Enrich companies and contacts with firmographics, tech stack and intent signals.",
    status: "Connected",
    liveSync: true,
    webhook: true,
    lastSync: "Just now · 10 records enriched",
    primaryUse: "Enrichment → scoring → routing into outreach.",
    supports: {
      contacts: true,
      sequences: false,
      replies: false,
      deals: true,
      tasks: false,
    },
  },
  {
    id: "heyreach",
    name: "HeyReach",
    logo: "🔗",
    category: "Outreach",
    description: "LinkedIn sequence engine for multi-channel prospecting.",
    status: "Connected",
    liveSync: true,
    webhook: true,
    lastSync: "5 min ago · 3 reply events ingested",
    primaryUse: "LinkedIn sequences and engagement tracking.",
    supports: {
      contacts: true,
      sequences: true,
      replies: true,
      deals: false,
      tasks: true,
    },
  },
  {
    id: "smartlead",
    name: "SmartLead",
    logo: "✉️",
    category: "Outreach",
    description: "Email sequence engine with warmup, routing and inboxes.",
    status: "Connected",
    liveSync: true,
    webhook: true,
    lastSync: "12 min ago · sequence statuses updated",
    primaryUse: "Cold email, warm campaigns and reply tracking.",
    supports: {
      contacts: true,
      sequences: true,
      replies: true,
      deals: false,
      tasks: true,
    },
  },

  // Extra 10 GTM tools
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "☁️",
    category: "CRM",
    description:
      "Your primary CRM. Mirror opportunities and accounts bi-directionally.",
    status: "Not Connected",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Sync deals, accounts and activities.",
    supports: {
      contacts: true,
      sequences: false,
      replies: false,
      deals: true,
      tasks: true,
    },
  },
  {
    id: "hubspot",
    name: "HubSpot",
    logo: "🧡",
    category: "CRM",
    description:
      "HubSpot CRM + Marketing. Sync contacts, companies, deals and lifecycle.",
    status: "Connected",
    liveSync: true,
    webhook: false,
    lastSync: "30 min ago · 2 deals updated",
    primaryUse: "Keep CRM deals aligned with GTM pipeline.",
    supports: {
      contacts: true,
      sequences: false,
      replies: false,
      deals: true,
      tasks: true,
    },
  },
  {
    id: "apollo",
    name: "Apollo.io",
    logo: "🚀",
    category: "Outreach",
    description:
      "Prospecting + email sequences. Pull lists and contact data into GTM CRM.",
    status: "Not Connected",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Contact lists and intent-based outreach.",
    supports: {
      contacts: true,
      sequences: true,
      replies: true,
      deals: false,
      tasks: false,
    },
  },
  {
    id: "outreach",
    name: "Outreach",
    logo: "📨",
    category: "Outreach",
    description:
      "Enterprise outreach platform. Mirror sequence and reply events.",
    status: "Coming Soon",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Outreach sequences and rep workflows.",
    supports: {
      contacts: true,
      sequences: true,
      replies: true,
      deals: false,
      tasks: true,
    },
  },
  {
    id: "salesloft",
    name: "Salesloft",
    logo: "🎯",
    category: "Outreach",
    description:
      "Sales engagement platform. Map cadences and tasks into your GTM CRM.",
    status: "Coming Soon",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Rep tasking & cadences.",
    supports: {
      contacts: true,
      sequences: true,
      replies: true,
      deals: false,
      tasks: true,
    },
  },
  {
    id: "zoominfo",
    name: "ZoomInfo",
    logo: "🔍",
    category: "Enrichment",
    description:
      "Data provider for contact and account enrichment and intent signals.",
    status: "Not Connected",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Enrichment + list building.",
    supports: {
      contacts: true,
      sequences: false,
      replies: false,
      deals: false,
      tasks: false,
    },
  },
  {
    id: "linkedin_sales_nav",
    name: "LinkedIn Sales Navigator",
    logo: "💼",
    category: "Outreach",
    description:
      "Pull saved searches and lists; log InMail and connection events.",
    status: "Not Connected",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Prospecting lists + engagement signals.",
    supports: {
      contacts: true,
      sequences: false,
      replies: true,
      deals: false,
      tasks: false,
    },
  },
  {
    id: "gong",
    name: "Gong",
    logo: "🎧",
    category: "Intelligence",
    description:
      "Conversation intelligence. Sync calls, meetings and deal risk insights.",
    status: "Not Connected",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Call analysis and revenue intelligence.",
    supports: {
      contacts: false,
      sequences: false,
      replies: false,
      deals: true,
      tasks: false,
    },
  },
  {
    id: "slack",
    name: "Slack",
    logo: "💬",
    category: "Comms",
    description:
      "Notify channels about replies, meetings and pipeline changes.",
    status: "Connected",
    liveSync: false,
    webhook: true,
    lastSync: "Yesterday · 14 notifications sent",
    primaryUse: "Pipeline + reply alerts to GTM channels.",
    supports: {
      contacts: false,
      sequences: false,
      replies: true,
      deals: true,
      tasks: false,
    },
  },
  {
    id: "intercom",
    name: "Intercom",
    logo: "💡",
    category: "Comms",
    description:
      "Sync active users, conversations and product-qualified lead signals.",
    status: "Not Connected",
    liveSync: false,
    webhook: false,
    lastSync: null,
    primaryUse: "Product usage → GTM triggers.",
    supports: {
      contacts: true,
      sequences: false,
      replies: true,
      deals: false,
      tasks: false,
    },
  },
];

const initialEvents: SyncEvent[] = [
  {
    id: "e1",
    connectorId: "clay",
    title: "Clay enrichment job completed",
    timestamp: "Just now",
    detail: "10 contacts enriched and scores updated.",
    type: "Enrichment",
  },
  {
    id: "e2",
    connectorId: "heyreach",
    title: "HeyReach reply ingested",
    timestamp: "5 min ago",
    detail: "Liam Novak replied: \"Interested, send more info\".",
    type: "Reply",
  },
  {
    id: "e3",
    connectorId: "smartlead",
    title: "SmartLead sequence sync",
    timestamp: "12 min ago",
    detail: "3 contacts moved to Step 4 in 'Retail evaluation'.",
    type: "Sequence",
  },
  {
    id: "e4",
    connectorId: "hubspot",
    title: "HubSpot deal updated",
    timestamp: "30 min ago",
    detail: "Deal 'Acme Retail · Pilot' stage moved to Opportunity.",
    type: "Deal",
  },
  {
    id: "e5",
    connectorId: "slack",
    title: "Slack notification sent",
    timestamp: "Yesterday",
    detail: "#gtm-team notified about 2 new meetings.",
    type: "System",
  },
];

const statusClasses: Record<ConnectorStatus, string> = {
  Connected: "bg-emerald-950 text-emerald-300 border border-emerald-700",
  "Not Connected": "bg-slate-900 text-slate-300 border border-slate-700",
  "Coming Soon": "bg-slate-900 text-slate-500 border border-slate-700",
};

const IntegrationsPage: React.FC = () => {
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);
  const [events] = useState<SyncEvent[]>(initialEvents);
  const [categoryFilter, setCategoryFilter] =
    useState<ConnectorCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("clay");

  const filteredConnectors = useMemo(
    () =>
      connectors.filter((c) => {
        const byCategory =
          categoryFilter === "All" || c.category === categoryFilter;
        const lc = search.toLowerCase();
        const byText =
          !lc ||
          c.name.toLowerCase().includes(lc) ||
          c.description.toLowerCase().includes(lc) ||
          c.primaryUse.toLowerCase().includes(lc);
        return byCategory && byText;
      }),
    [connectors, categoryFilter, search]
  );

  const selected =
    connectors.find((c) => c.id === selectedId) || filteredConnectors[0] || null;

  const connectedCount = connectors.filter((c) => c.status === "Connected")
    .length;
  const liveSyncCount = connectors.filter(
    (c) => c.status === "Connected" && c.liveSync
  ).length;
  const webhookCount = connectors.filter(
    (c) => c.status === "Connected" && c.webhook
  ).length;

  const formatSupports = (c: Connector) => {
    const entries: string[] = [];
    if (c.supports.contacts) entries.push("Contacts");
    if (c.supports.sequences) entries.push("Sequences");
    if (c.supports.replies) entries.push("Replies");
    if (c.supports.deals) entries.push("Deals / pipeline");
    if (c.supports.tasks) entries.push("Tasks");
    return entries.join(" · ");
  };

  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs border ${
      active
        ? "bg-indigo-600 border-indigo-500 text-slate-50"
        : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
    }`;

  const toggleLiveSync = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (c.status !== "Connected") return c; // no-op
        return { ...c, liveSync: !c.liveSync };
      })
    );
  };

  const toggleWebhook = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (c.status !== "Connected") return c; // no-op
        return { ...c, webhook: !c.webhook };
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 h-full text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            GTM Integrations & Central Sync
          </h1>
          <p className="text-sm text-slate-400">
            Connect Clay, HeyReach, SmartLead and other GTM tools. Ingest
            enrichment, sequence status and reply events so this CRM becomes the
            single source of truth.
          </p>
        </div>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Connected tools</div>
          <div className="text-lg font-semibold text-slate-50">
            {connectedCount} / {connectors.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Clay, HeyReach, SmartLead, HubSpot, Slack are live.
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Live sync enabled</div>
          <div className="text-lg font-semibold text-slate-50">
            {liveSyncCount}
          </div>
          <div className="text-[11px] text-slate-500">
            Streaming updates into the GTM CRM.
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Webhook ingestion</div>
          <div className="text-lg font-semibold text-slate-50">
            {webhookCount}
          </div>
          <div className="text-[11px] text-slate-500">
            Reply, sequence and deal events via webhooks.
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Recent events (mock)</div>
          <div className="text-lg font-semibold text-slate-50">
            {events.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Last: {events[0]?.title ?? "No events yet"}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-slate-400 mr-1">Category:</span>
        {(["All", "Enrichment", "Outreach", "CRM", "Intelligence", "Comms"] as const).map(
          (cat) => (
            <button
              key={cat}
              className={pill(categoryFilter === cat)}
              onClick={() =>
                setCategoryFilter(
                  cat === "All" ? "All" : (cat as ConnectorCategory)
                )
              }
            >
              {cat}
            </button>
          )
        )}

        <input
          type="text"
          placeholder="Search tools by name or use…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs min-w-[220px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Main layout: left connectors list + right detail + events */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-[300px]">
        {/* Left: connectors list */}
        <div className="w-full lg:w-80 flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-400">
            <span>Connectors</span>
            <span className="text-[11px] text-slate-500">
              {filteredConnectors.length} shown
            </span>
          </div>
          <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/60">
            {filteredConnectors.length === 0 ? (
              <div className="p-3 text-slate-500 italic">
                No tools match your filters.
              </div>
            ) : (
              <ul className="divide-y divide-slate-800">
                {filteredConnectors.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`p-3 cursor-pointer hover:bg-slate-900/80 ${
                      selected?.id === c.id ? "bg-slate-900/80" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{c.logo}</span>
                        <div>
                          <div className="font-semibold text-slate-50 text-xs">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {c.category}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${statusClasses[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">
                      {c.description}
                    </div>
                    {c.lastSync && (
                      <div className="mt-1 text-[11px] text-slate-500">
                        Last sync: {c.lastSync}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: detail + events */}
        <div className="flex-1 flex flex-col gap-3">
          {selected ? (
            <>
              {/* Selected connector detail */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-lg">
                      {selected.logo}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-50">
                        {selected.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {selected.category} · {selected.primaryUse}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${statusClasses[selected.status]}`}
                  >
                    {selected.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300">
                  {selected.description}
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] mt-1">
                  <span className="text-slate-400">Syncs:</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    {formatSupports(selected) || "None (yet)"}
                  </span>
                </div>

                {/* Live sync + webhook toggles */}
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
                    <div>
                      <div className="text-slate-200">Live sync</div>
                      <div className="text-slate-500">
                        Stream updates into GTM CRM.
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLiveSync(selected.id)}
                      disabled={selected.status !== "Connected"}
                      className={`px-3 py-1 rounded-full border text-[11px] ${
                        selected.status !== "Connected"
                          ? "bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed"
                          : selected.liveSync
                          ? "bg-emerald-600 border-emerald-500 text-slate-50"
                          : "bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {selected.status !== "Connected"
                        ? "Connect first"
                        : selected.liveSync
                        ? "On"
                        : "Off"}
                    </button>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
                    <div>
                      <div className="text-slate-200">Webhook ingestion</div>
                      <div className="text-slate-500">
                        Ingest reply & sequence events into CRM.
                      </div>
                    </div>
                    <button
                      onClick={() => toggleWebhook(selected.id)}
                      disabled={selected.status !== "Connected"}
                      className={`px-3 py-1 rounded-full border text-[11px] ${
                        selected.status !== "Connected"
                          ? "bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed"
                          : selected.webhook
                          ? "bg-indigo-600 border-indigo-500 text-slate-50"
                          : "bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {selected.status !== "Connected"
                        ? "Connect first"
                        : selected.webhook
                        ? "On"
                        : "Off"}
                    </button>
                  </div>
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  All toggles are frontend-only for now. Later you can attach
                  them to real auth flows, sync jobs and webhook endpoints.
                </div>
              </div>

              {/* Bottom: mapping hint + recent events */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Mapping preview (simple, static) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
                  <div className="text-slate-400 font-semibold mb-1">
                    Field mapping preview
                  </div>
                  <div className="text-[11px] text-slate-500 mb-1">
                    Example of how this connector maps into your GTM CRM
                    objects. Later you can make this fully configurable.
                  </div>
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        {selected.name} &rarr; CRM
                      </span>
                      <span className="text-slate-500">
                        (mock mapping for demo)
                      </span>
                    </div>
                    {selected.supports.contacts && (
                      <div className="text-slate-300">
                        <span className="font-semibold">Contact:</span> email →
                        email; first_name → first name; last_name → last name;
                        linkedin_url → LinkedIn profile.
                      </div>
                    )}
                    {selected.supports.deals && (
                      <div className="text-slate-300">
                        <span className="font-semibold">Deal / pipeline:</span>{" "}
                        opportunity_name → deal name; stage → pipeline stage;
                        amount_mrr → MRR.
                      </div>
                    )}
                    {selected.supports.sequences && (
                      <div className="text-slate-300">
                        <span className="font-semibold">Sequence:</span> seq_id
                        → external sequence id; step_index → step; status →
                        step result.
                      </div>
                    )}
                    {selected.supports.replies && (
                      <div className="text-slate-300">
                        <span className="font-semibold">Reply events:</span>{" "}
                        thread_id → activity id; sentiment → outcome; booked_meeting
                        → meeting created.
                      </div>
                    )}
                    {selected.supports.tasks && (
                      <div className="text-slate-300">
                        <span className="font-semibold">Tasks:</span> cadence_step
                        → task type; due_at → due date.
                      </div>
                    )}
                    {!selected.supports.contacts &&
                      !selected.supports.deals &&
                      !selected.supports.sequences &&
                      !selected.supports.replies &&
                      !selected.supports.tasks && (
                        <div className="text-slate-400">
                          This connector is informational only for now.
                        </div>
                      )}
                  </div>
                </div>

                {/* Recent sync events */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-slate-400 font-semibold">
                      Recent sync events
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Filtered by selected connector.
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto space-y-2">
                    {events.filter((e) => e.connectorId === selected.id)
                      .length === 0 ? (
                      <div className="text-[11px] text-slate-500 italic">
                        No recent events for this tool in the mock data.
                      </div>
                    ) : (
                      events
                        .filter((e) => e.connectorId === selected.id)
                        .map((e) => (
                          <div
                            key={e.id}
                            className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 text-[11px]"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-slate-200">
                                {e.title}
                              </span>
                              <span className="text-slate-500">
                                {e.timestamp}
                              </span>
                            </div>
                            <div className="text-slate-400">{e.detail}</div>
                            <div className="mt-1 text-[10px] text-slate-500">
                              Type: {e.type}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    When you wire this up, each webhook or polling job can
                    append a new event here for full GTM observability.
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-2xl">
              Select a connector on the left to configure live sync and webhook
              ingestion.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
