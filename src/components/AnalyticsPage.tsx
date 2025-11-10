import React, { useMemo, useState } from "react";

type OwnerFilter = "All" | "Nikola" | "Ana" | "Eva";
type SourceFilter = "All" | "Clay" | "HeyReach" | "SmartLead" | "Manual";
type ChannelFilter = "All" | "LinkedIn" | "Email" | "Call" | "Social";

interface FunnelRow {
  id: string;
  owner: Exclude<OwnerFilter, "All">;
  source: Exclude<SourceFilter, "All">;
  channel: Exclude<ChannelFilter, "All">;
  enriched: number;
  outreachStarted: number;
  replies: number;
  meetings: number;
}

interface CostRow {
  id: string;
  owner: Exclude<OwnerFilter, "All">;
  source: Exclude<SourceFilter, "All">;
  channel: Exclude<ChannelFilter, "All">;
  leads: number;
  cost: number; // total cost for those leads (enrichment + outreach)
}

interface StageTimeRow {
  id: string;
  stage:
    | "New"
    | "Outreach"
    | "Qualified"
    | "Replied"
    | "Opportunity"
    | "Closed"
    | "Lost";
  owner: Exclude<OwnerFilter, "All">;
  source: Exclude<SourceFilter, "All">;
  avgDays: number;
}

interface ForecastRow {
  id: string;
  source: Exclude<SourceFilter, "All">;
  owner: Exclude<OwnerFilter, "All">;
  channel: Exclude<ChannelFilter, "All">;
  pipelineMrr: number;
  expectedCloseMrr: number;
  winProbability: number; // 0–1
}

const funnelData: FunnelRow[] = [
  {
    id: "f1",
    owner: "Nikola",
    source: "Clay",
    channel: "LinkedIn",
    enriched: 320,
    outreachStarted: 260,
    replies: 48,
    meetings: 16,
  },
  {
    id: "f2",
    owner: "Nikola",
    source: "SmartLead",
    channel: "Email",
    enriched: 210,
    outreachStarted: 210,
    replies: 32,
    meetings: 10,
  },
  {
    id: "f3",
    owner: "Ana",
    source: "HeyReach",
    channel: "LinkedIn",
    enriched: 180,
    outreachStarted: 170,
    replies: 24,
    meetings: 7,
  },
  {
    id: "f4",
    owner: "Ana",
    source: "Manual",
    channel: "Call",
    enriched: 60,
    outreachStarted: 55,
    replies: 12,
    meetings: 5,
  },
  {
    id: "f5",
    owner: "Eva",
    source: "Clay",
    channel: "Email",
    enriched: 140,
    outreachStarted: 120,
    replies: 22,
    meetings: 6,
  },
  {
    id: "f6",
    owner: "Eva",
    source: "SmartLead",
    channel: "Email",
    enriched: 190,
    outreachStarted: 180,
    replies: 30,
    meetings: 9,
  },
];

const costRows: CostRow[] = [
  {
    id: "c1",
    owner: "Nikola",
    source: "Clay",
    channel: "LinkedIn",
    leads: 320,
    cost: 640, // ~$2 per enriched lead
  },
  {
    id: "c2",
    owner: "Nikola",
    source: "SmartLead",
    channel: "Email",
    leads: 210,
    cost: 420,
  },
  {
    id: "c3",
    owner: "Ana",
    source: "HeyReach",
    channel: "LinkedIn",
    leads: 180,
    cost: 360,
  },
  {
    id: "c4",
    owner: "Ana",
    source: "Manual",
    channel: "Call",
    leads: 60,
    cost: 210,
  },
  {
    id: "c5",
    owner: "Eva",
    source: "Clay",
    channel: "Email",
    leads: 140,
    cost: 280,
  },
  {
    id: "c6",
    owner: "Eva",
    source: "SmartLead",
    channel: "Email",
    leads: 190,
    cost: 380,
  },
];

const stageTimes: StageTimeRow[] = [
  {
    id: "s1",
    stage: "New",
    owner: "Nikola",
    source: "Clay",
    avgDays: 1.2,
  },
  {
    id: "s2",
    stage: "Outreach",
    owner: "Nikola",
    source: "SmartLead",
    avgDays: 3.4,
  },
  {
    id: "s3",
    stage: "Qualified",
    owner: "Ana",
    source: "HeyReach",
    avgDays: 4.1,
  },
  {
    id: "s4",
    stage: "Replied",
    owner: "Ana",
    source: "Manual",
    avgDays: 2.3,
  },
  {
    id: "s5",
    stage: "Opportunity",
    owner: "Eva",
    source: "Clay",
    avgDays: 7.8,
  },
  {
    id: "s6",
    stage: "Closed",
    owner: "Eva",
    source: "SmartLead",
    avgDays: 5.2,
  },
  {
    id: "s7",
    stage: "Lost",
    owner: "Nikola",
    source: "Clay",
    avgDays: 9.1,
  },
];

const forecastRows: ForecastRow[] = [
  {
    id: "p1",
    source: "Clay",
    owner: "Nikola",
    channel: "LinkedIn",
    pipelineMrr: 42000,
    expectedCloseMrr: 21000,
    winProbability: 0.5,
  },
  {
    id: "p2",
    source: "SmartLead",
    owner: "Nikola",
    channel: "Email",
    pipelineMrr: 52000,
    expectedCloseMrr: 26000,
    winProbability: 0.5,
  },
  {
    id: "p3",
    source: "HeyReach",
    owner: "Ana",
    channel: "LinkedIn",
    pipelineMrr: 31000,
    expectedCloseMrr: 15500,
    winProbability: 0.5,
  },
  {
    id: "p4",
    source: "Manual",
    owner: "Ana",
    channel: "Call",
    pipelineMrr: 16000,
    expectedCloseMrr: 6400,
    winProbability: 0.4,
  },
  {
    id: "p5",
    source: "Clay",
    owner: "Eva",
    channel: "Email",
    pipelineMrr: 28000,
    expectedCloseMrr: 11200,
    winProbability: 0.4,
  },
  {
    id: "p6",
    source: "SmartLead",
    owner: "Eva",
    channel: "Email",
    pipelineMrr: 34000,
    expectedCloseMrr: 17000,
    winProbability: 0.5,
  },
];

const AnalyticsPage: React.FC = () => {
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>("All");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("All");

  const filteredFunnel = useMemo(
    () =>
      funnelData.filter((row) => {
        const byOwner =
          ownerFilter === "All" || row.owner === ownerFilter;
        const bySource =
          sourceFilter === "All" || row.source === sourceFilter;
        const byChannel =
          channelFilter === "All" || row.channel === channelFilter;
        return byOwner && bySource && byChannel;
      }),
    [ownerFilter, sourceFilter, channelFilter]
  );

  const agg = useMemo(() => {
    const totals = filteredFunnel.reduce(
      (acc, row) => {
        acc.enriched += row.enriched;
        acc.outreachStarted += row.outreachStarted;
        acc.replies += row.replies;
        acc.meetings += row.meetings;
        return acc;
      },
      { enriched: 0, outreachStarted: 0, replies: 0, meetings: 0 }
    );

    const enrichmentToOutreach =
      totals.enriched > 0
        ? Math.round((totals.outreachStarted / totals.enriched) * 100)
        : 0;
    const outreachToReply =
      totals.outreachStarted > 0
        ? Math.round((totals.replies / totals.outreachStarted) * 100)
        : 0;
    const replyToMeeting =
      totals.replies > 0
        ? Math.round((totals.meetings / totals.replies) * 100)
        : 0;

    return {
      totals,
      enrichmentToOutreach,
      outreachToReply,
      replyToMeeting,
    };
  }, [filteredFunnel]);

  const replyByChannel = useMemo(() => {
    const map: Record<
      Exclude<ChannelFilter, "All">,
      { outreach: number; replies: number }
    > = {
      LinkedIn: { outreach: 0, replies: 0 },
      Email: { outreach: 0, replies: 0 },
      Call: { outreach: 0, replies: 0 },
      Social: { outreach: 0, replies: 0 },
    };

    filteredFunnel.forEach((row) => {
      map[row.channel].outreach += row.outreachStarted;
      map[row.channel].replies += row.replies;
    });

    return (Object.keys(map) as Exclude<ChannelFilter, "All">[]).map(
      (ch) => {
        const { outreach, replies } = map[ch];
        const rate =
          outreach > 0 ? Math.round((replies / outreach) * 100) : 0;
        return { channel: ch, outreach, replies, rate };
      }
    );
  }, [filteredFunnel]);

  const filteredCosts = useMemo(
    () =>
      costRows.filter((row) => {
        const byOwner =
          ownerFilter === "All" || row.owner === ownerFilter;
        const bySource =
          sourceFilter === "All" || row.source === sourceFilter;
        const byChannel =
          channelFilter === "All" || row.channel === channelFilter;
        return byOwner && bySource && byChannel;
      }),
    [ownerFilter, sourceFilter, channelFilter]
  );

  const filteredStageTimes = useMemo(
    () =>
      stageTimes.filter((row) => {
        const byOwner =
          ownerFilter === "All" || row.owner === ownerFilter;
        const bySource =
          sourceFilter === "All" || row.source === sourceFilter;
        return byOwner && bySource;
      }),
    [ownerFilter, sourceFilter]
  );

  const filteredForecast = useMemo(
    () =>
      forecastRows.filter((row) => {
        const byOwner =
          ownerFilter === "All" || row.owner === ownerFilter;
        const bySource =
          sourceFilter === "All" || row.source === sourceFilter;
        const byChannel =
          channelFilter === "All" || row.channel === channelFilter;
        return byOwner && bySource && byChannel;
      }),
    [ownerFilter, sourceFilter, channelFilter]
  );

  const totalPipelineMrr = filteredForecast.reduce(
    (sum, r) => sum + r.pipelineMrr,
    0
  );
  const totalExpectedMrr = filteredForecast.reduce(
    (sum, r) => sum + r.expectedCloseMrr,
    0
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs border ${
      active
        ? "bg-indigo-600 border-indigo-500 text-slate-50"
        : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
    }`;

  const barWidth = (value: number, max: number) =>
    max > 0 ? `${Math.max(4, (value / max) * 100)}%` : "4%";

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            GTM Analytics
          </h1>
          <p className="text-sm text-slate-400">
            Enrichment → outreach → replies → revenue. Understand what&apos;s
            working across tools, channels and owners.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 mr-1">Owner:</span>
        {(["All", "Nikola", "Ana", "Eva"] as OwnerFilter[]).map((o) => (
          <button
            key={o}
            className={pill(ownerFilter === o)}
            onClick={() => setOwnerFilter(o)}
          >
            {o}
          </button>
        ))}

        <span className="text-slate-400 ml-4 mr-1">Source:</span>
        {(["All", "Clay", "HeyReach", "SmartLead", "Manual"] as SourceFilter[])
          .map((s) => (
            <button
              key={s}
              className={pill(sourceFilter === s)}
              onClick={() => setSourceFilter(s)}
            >
              {s}
            </button>
          ))}

        <span className="text-slate-400 ml-4 mr-1">Channel:</span>
        {(["All", "LinkedIn", "Email", "Call", "Social"] as ChannelFilter[])
          .map((ch) => (
            <button
              key={ch}
              className={pill(channelFilter === ch)}
              onClick={() => setChannelFilter(ch)}
            >
              {ch}
            </button>
          ))}
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">
            Enrichment → Outreach start
          </div>
          <div className="text-lg font-semibold text-slate-50">
            {agg.enrichmentToOutreach}%
          </div>
          <div className="text-[11px] text-slate-500">
            {agg.totals.enriched} enriched · {agg.totals.outreachStarted} in
            sequences
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Outreach → Reply</div>
          <div className="text-lg font-semibold text-slate-50">
            {agg.outreachToReply}%
          </div>
          <div className="text-[11px] text-slate-500">
            {agg.totals.replies} replies across filtered view
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Reply → Meeting</div>
          <div className="text-lg font-semibold text-slate-50">
            {agg.replyToMeeting}%
          </div>
          <div className="text-[11px] text-slate-500">
            {agg.totals.meetings} meetings booked
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Forecast (filtered)</div>
          <div className="text-lg font-semibold text-slate-50">
            {formatCurrency(totalExpectedMrr)}
          </div>
          <div className="text-[11px] text-slate-500">
            on {formatCurrency(totalPipelineMrr)} pipeline MRR
          </div>
        </div>
      </div>

      {/* Main grid: left = funnel + reply by channel, right = cost, stage time, forecast */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-3 min-h-[280px] text-xs">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-3">
          {/* Funnel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-slate-400 font-semibold">
                Funnel · Enrichment → Outreach → Reply → Meeting
              </div>
              <div className="text-[11px] text-slate-500">
                Dummy numbers, driven by filters above.
              </div>
            </div>
            <div className="space-y-2">
              {[
                {
                  label: "Enriched",
                  value: agg.totals.enriched,
                  color: "bg-slate-500",
                },
                {
                  label: "Outreach started",
                  value: agg.totals.outreachStarted,
                  color: "bg-indigo-500",
                },
                {
                  label: "Replies",
                  value: agg.totals.replies,
                  color: "bg-emerald-500",
                },
                {
                  label: "Meetings",
                  value: agg.totals.meetings,
                  color: "bg-amber-500",
                },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-200">{row.label}</span>
                    <span className="text-slate-400">{row.value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${row.color}`}
                      style={{
                        width: barWidth(
                          row.value,
                          agg.totals.enriched || 1
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply rate by channel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-slate-400 font-semibold">
                Reply rate by channel
              </div>
              <div className="text-[11px] text-slate-500">
                Based on outreach + replies in current filter.
              </div>
            </div>
            <div className="space-y-2">
              {replyByChannel.map((row) => (
                <div key={row.channel}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-200">{row.channel}</span>
                    <span className="text-slate-400">
                      {row.replies} replies ({row.rate}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: barWidth(row.rate, 100),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-3">
          {/* Cost per lead by source */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-slate-400 font-semibold">
                Cost per lead by source
              </div>
              <div className="text-[11px] text-slate-500">
                Enrichment + outreach costs (mock data).
              </div>
            </div>
            <div className="space-y-2">
              {filteredCosts.length === 0 ? (
                <div className="text-[11px] text-slate-500 italic">
                  No cost data for this filter combination (dummy data).
                </div>
              ) : (
                filteredCosts.map((row) => {
                  const cpl =
                    row.leads > 0 ? row.cost / row.leads : 0;
                  return (
                    <div
                      key={row.id}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl p-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-200">
                          {row.source} · {row.channel}
                        </span>
                        <span className="text-slate-400">
                          {row.leads} leads
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-400">
                          Total cost: {formatCurrency(row.cost)}
                        </span>
                        <span className="text-slate-300 font-semibold">
                          CPL: {formatCurrency(Math.round(cpl))}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-500"
                          style={{
                            width: barWidth(cpl, 5), // assume ~$5 max for scale
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Time in pipeline by stage */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-slate-400 font-semibold">
                Avg time in pipeline by stage
              </div>
              <div className="text-[11px] text-slate-500">
                How long deals stay in each stage (mock).
              </div>
            </div>
            <div className="space-y-2">
              {filteredStageTimes.length === 0 ? (
                <div className="text-[11px] text-slate-500 italic">
                  No stage data for this filter (dummy data).
                </div>
              ) : (
                filteredStageTimes.map((row) => (
                  <div key={row.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-200">
                        {row.stage}
                      </span>
                      <span className="text-slate-400">
                        {row.avgDays.toFixed(1)} days
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500"
                        style={{
                          width: barWidth(row.avgDays, 10),
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Forecast by enrichment source */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-slate-400 font-semibold">
                Forecast by enrichment source
              </div>
              <div className="text-[11px] text-slate-500">
                Based on win probabilities per source / channel.
              </div>
            </div>
            <div className="space-y-2">
              {filteredForecast.length === 0 ? (
                <div className="text-[11px] text-slate-500 italic">
                  No forecast rows for this filter.
                </div>
              ) : (
                filteredForecast.map((row) => (
                  <div
                    key={row.id}
                    className="bg-slate-950/60 border border-slate-800 rounded-xl p-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-200">
                        {row.source} · {row.channel}
                      </span>
                      <span className="text-slate-400">
                        Owner: {row.owner}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400">
                        Pipeline:{" "}
                        <span className="text-slate-200">
                          {formatCurrency(row.pipelineMrr)}
                        </span>
                      </span>
                      <span className="text-slate-400">
                        Win prob:{" "}
                        <span className="text-slate-200">
                          {Math.round(row.winProbability * 100)}%
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">
                        Expected:{" "}
                        <span className="text-emerald-300 font-semibold">
                          {formatCurrency(row.expectedCloseMrr)}
                        </span>
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{
                          width: barWidth(
                            row.expectedCloseMrr,
                            Math.max(
                              ...filteredForecast.map(
                                (r) => r.expectedCloseMrr
                              )
                            ) || 1
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
