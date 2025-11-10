import React, { useMemo, useState } from "react";
import { Deal, Stage } from "../types";
import DealCard from "./DealCard";
import DealDrawer from "./DealDrawer";

interface PipelineBoardProps {
  deals: Deal[];
  onStageChange: (id: string, stage: Stage) => void;
}

const stages: Stage[] = [
  "New",
  "Enriched",
  "Outreach",
  "Replied",
  "Qualified",
  "Opportunity",
  "Won",
  "Lost",
];

type ViewMode = "board" | "table";

const formatCurrency = (value: number) =>
  "€" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const PipelineBoard: React.FC<PipelineBoardProps> = ({
  deals,
  onStageChange,
}) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const [ownerFilter, setOwnerFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const owners = useMemo(
    () => Array.from(new Set(deals.map((d) => d.owner))),
    [deals]
  );

  const sources = useMemo(
    () => Array.from(new Set(deals.map((d) => d.source))),
    [deals]
  );

  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      const matchesOwner = ownerFilter === "All" || d.owner === ownerFilter;
      const matchesSource = sourceFilter === "All" || d.source === sourceFilter;
      const matchesSearch =
        search.trim().length === 0 ||
        d.contactName.toLowerCase().includes(search.toLowerCase()) ||
        d.companyName.toLowerCase().includes(search.toLowerCase());
      return matchesOwner && matchesSource && matchesSearch;
    });
  }, [deals, ownerFilter, sourceFilter, search]);

  const totalPipeline = filteredDeals.reduce((sum, d) => sum + d.value, 0);
  const activeDeals = filteredDeals.filter(
    (d) => d.stage !== "Won" && d.stage !== "Lost"
  );
  const winDeals = filteredDeals.filter((d) => d.stage === "Won");

  const recentActivity = [
'Liam replied to SmartLead sequence · "Interested, send more info."',
    "Sarah viewed LinkedIn profile and visited pricing page.",
    "Martin requested retail loyalty case studies.",
    "Eva clicked pilot offer link from HeyReach sequence.",
  ];

  return (
  <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Pipeline overview
          </h1>
          <p className="text-sm text-slate-400">
            GTM-native view of your deals across Clay, HeyReach and SmartLead.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
            <button
              className={`px-3 py-1.5 ${
                viewMode === "board"
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-300"
              }`}
              onClick={() => setViewMode("board")}
            >
              Board
            </button>
            <button
              className={`px-3 py-1.5 ${
                viewMode === "table"
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-300"
              }`}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Pipeline value (filtered)</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {formatCurrency(totalPipeline)}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Open deals</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {activeDeals.length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Closed won (count)</div>
          <div className="mt-1 text-lg font-semibold text-emerald-300">
            {winDeals.length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Owners in view</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {Array.from(new Set(filteredDeals.map((d) => d.owner))).join(", ") ||
              "—"}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <input
          type="text"
          placeholder="Search contact or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs min-w-[220px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <select
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All owners</option>
          {owners.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="text-slate-500">
          {filteredDeals.length} of {deals.length} records shown
        </span>
      </div>

      <div className="flex gap-4 min-h-[260px]">
        <div className="flex-1 flex flex-col gap-4">
          {viewMode === "board" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
              {stages.map((stage) => {
                const stageDeals = filteredDeals.filter((d) => d.stage === stage);
                return (
                  <div
                    key={stage}
                    className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 flex flex-col min-h-[220px]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold tracking-wide uppercase text-slate-400">
                        {stage}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {stageDeals.length} Records
                      </span>
                    </div>
                    <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                      {stageDeals.map((deal) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          onClick={() => setSelectedDeal(deal)}
                          onStageChange={onStageChange}
                          allStages={stages}
                        />
                      ))}
                      {stageDeals.length === 0 && (
                        <div className="text-xs text-slate-500 italic mt-2">
                          No records in this stage yet.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/60">
              <table className="min-w-full text-xs">
                <thead className="bg-slate-900/80 text-slate-400">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium">Deal</th>
                    <th className="text-left px-3 py-2 font-medium">Stage</th>
                    <th className="text-left px-3 py-2 font-medium">Owner</th>
                    <th className="text-left px-3 py-2 font-medium">Source</th>
                    <th className="text-left px-3 py-2 font-medium">Value</th>
                    <th className="text-left px-3 py-2 font-medium">Last touch</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.map((d) => (
                    <tr
                      key={d.id}
                      className="border-t border-slate-800 hover:bg-slate-900/80 cursor-pointer"
                      onClick={() => setSelectedDeal(d)}
                    >
                      <td className="px-3 py-2">
                        <div className="font-semibold text-slate-50">
                          {d.contactName}
                        </div>
                        <div className="text-slate-400">
                          {d.title} · {d.companyName}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-slate-300">{d.stage}</td>
                      <td className="px-3 py-2 text-slate-300">{d.owner}</td>
                      <td className="px-3 py-2 text-slate-300">{d.source}</td>
                      <td className="px-3 py-2 text-slate-200">
                        {formatCurrency(d.value)}
                      </td>
                      <td className="px-3 py-2 text-slate-400">{d.lastTouch}</td>
                    </tr>
                  ))}
                  {filteredDeals.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 py-6 text-center text-slate-500 italic"
                      >
                        No records match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-slate-400 font-semibold">Recent activity</div>
            <span className="text-[11px] text-slate-500">
              Dummy GTM feed (replace with real events)
            </span>
          </div>
          <div className="space-y-2">
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-slate-300 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2"
              >
                <span className="mt-0.5 text-slate-500">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 font-semibold mb-2">
            Simple GTM hints
          </div>
          <ul className="space-y-1 text-slate-300">
            <li>• Filter by owner to focus each rep&apos;s lane.</li>
            <li>• Use table view to bulk-review value vs. stage.</li>
            <li>• Sync sequences per stage (e.g. Outreach → HeyReach).</li>
            <li>• Later: plug in your AI playbooks here.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PipelineBoard;
