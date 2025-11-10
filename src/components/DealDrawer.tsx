import React from "react";
import { Deal } from "../types";

interface DealDrawerProps {
  deal: Deal | null;
  onClose: () => void;
}

const formatCurrency = (value: number) =>
  "€" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });

type JourneyPhase = "Enrichment" | "Outreach" | "Sales" | "Renewal";
type JourneyStatus = "pending" | "in-progress" | "done" | "skipped";

interface JourneyStep {
  id: string;
  phase: JourneyPhase;
  label: string;
  tool: string;
  status: JourneyStatus;
  note?: string;
}

// Derive a GTM journey from the deal's stage/source/channel (frontend only)
const getJourneyForDeal = (deal: Deal): JourneyStep[] => {
  const isEnriched =
    deal.source === "Clay" ||
    deal.lastTouch.toLowerCase().includes("enriched") ||
    deal.tags.some((t) => t.toLowerCase().includes("enrich"));

  const isOutreachStarted =
    ["Outreach", "Replied", "Qualified", "Opportunity", "Won", "Lost"].includes(
      deal.stage
    );

  const hasReply =
    ["Replied", "Qualified", "Opportunity", "Won"].includes(deal.stage) ||
    deal.tags.some((t) => t.toLowerCase().includes("reply"));

  const isSalesActive = ["Qualified", "Opportunity"].includes(deal.stage);
  const isClosed = ["Won", "Lost"].includes(deal.stage);
  const isWon = deal.stage === "Won";

  const enrichmentStep: JourneyStep = {
    id: "enrichment",
    phase: "Enrichment",
    label: isEnriched ? "Enriched via Clay / data provider" : "Planned enrichment",
    tool: isEnriched ? "Clay" : "Clay (planned)",
    status: isEnriched ? "done" : "pending",
    note: isEnriched
      ? "Firmographic & contact data available."
      : "Send to Clay or similar for enrichment.",
  };

  const outreachTool =
    deal.source === "HeyReach" || deal.channel === "LinkedIn"
      ? "HeyReach"
      : deal.source === "SmartLead" || deal.channel === "Email"
      ? "SmartLead"
      : "HeyReach / SmartLead";

  const outreachStep: JourneyStep = {
    id: "outreach",
    phase: "Outreach",
    label: hasReply
      ? "Active sequence · replied"
      : isOutreachStarted
      ? "Active sequence · awaiting reply"
      : "Not yet enrolled in sequence",
    tool: outreachTool,
    status: hasReply ? "done" : isOutreachStarted ? "in-progress" : "pending",
    note: hasReply
      ? "Move fast on reply while intent is high."
      : isOutreachStarted
      ? "Monitor opens/clicks and adjust copy."
      : "Enroll in the best-fit sequence from your GTM tools.",
  };

  const salesStep: JourneyStep = {
    id: "sales",
    phase: "Sales",
    label: isClosed
      ? `Deal ${deal.stage.toLowerCase()}`
      : isSalesActive
      ? "In evaluation / negotiation"
      : "Not yet qualified",
    tool: "Pipeline",
    status: isClosed ? "done" : isSalesActive ? "in-progress" : "pending",
    note: isClosed
      ? "Reflect learnings and adjust ICP or messaging."
      : isSalesActive
      ? "Confirm pain, value, and clear next step."
      : "Qualify once first reply shows real interest.",
  };

  const renewalStep: JourneyStep = {
    id: "renewal",
    phase: "Renewal",
    label: isWon ? "Plan onboarding & renewal milestones" : "Not applicable yet",
    tool: "CS / Success",
    status: isWon ? "in-progress" : "pending",
    note: isWon
      ? "Create success plan, adoption metrics, and renewal checkpoints."
      : "Once deal is won, shift into success / retention mode.",
  };

  return [enrichmentStep, outreachStep, salesStep, renewalStep];
};

const DealDrawer: React.FC<DealDrawerProps> = ({ deal, onClose }) => {
  if (!deal) return null;

  const journey = getJourneyForDeal(deal);

  const statusStyles: Record<
    JourneyStatus,
    { dot: string; badge: string; label: string }
  > = {
    "pending": {
      dot: "bg-slate-600",
      badge: "bg-slate-900 text-slate-400 border border-slate-700",
      label: "Pending",
    },
    "in-progress": {
      dot: "bg-amber-400",
      badge: "bg-amber-950 text-amber-300 border border-amber-700",
      label: "In progress",
    },
    "done": {
      dot: "bg-emerald-400",
      badge: "bg-emerald-950 text-emerald-300 border border-emerald-700",
      label: "Done",
    },
    "skipped": {
      dot: "bg-slate-700",
      badge: "bg-slate-900 text-slate-500 border border-slate-700",
      label: "Skipped",
    },
  };

  return (
    <div className="hidden lg:flex w-80 xl:w-96 flex-col bg-slate-950/90 border-l border-slate-800 p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs uppercase text-slate-500">Record</div>
          <div className="text-lg font-semibold text-slate-50">
            {deal.contactName}
          </div>
          <div className="text-sm text-slate-400">
            {deal.title} · {deal.companyName}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-200 text-sm"
        >
          ✖
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1 text-[11px]">
        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Stage: {deal.stage}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Owner: {deal.owner}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Source: {deal.source}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
          Value: {formatCurrency(deal.value)}
        </span>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        {/* GTM Journey section */}
        <section>
          <div className="text-slate-400 font-semibold mb-1">GTM Journey</div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] text-slate-400">
                End-to-end path from enrichment to renewal.
              </div>
              <div className="text-[11px] text-slate-500">
                Frontend-only, derived from dummy data.
              </div>
            </div>
            <div className="flex items-stretch gap-3">
              {journey.map((step, idx) => {
                const style = statusStyles[step.status];
                return (
                  <div
                    key={step.id}
                    className="flex-1 flex flex-col text-[11px] min-w-[0]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${style.dot}`}
                      />
                      <div className="uppercase tracking-wide text-slate-300">
                        {step.phase}
                      </div>
                    </div>
                    <div className="text-slate-100 text-[12px]">
                      {step.label}
                    </div>
                    <div className="text-slate-400 mt-0.5">{step.tool}</div>
                    {step.note && (
                      <div className="mt-1 text-slate-500 leading-snug">
                        {step.note}
                      </div>
                    )}
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full ${style.badge}`}
                      >
                        {style.label}
                      </span>
                    </div>
                    {idx < journey.length - 1 && (
                      <div className="mt-2 flex-1 hidden xl:flex items-center">
                        <div className="h-px w-full bg-slate-800" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Next Best Action (existing) */}
        <section>
          <div className="text-slate-400 font-semibold mb-1">
            Next Best Action
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-slate-200">
            <ul className="list-disc ml-4 space-y-1">
              <li>Confirm ICP fit and firmographics in Clay.</li>
              <li>
                Enroll in the relevant HeyReach sequence (e.g. “Loyalty SaaS – 
                Mid-market Fashion”).
              </li>
              <li>
                If no reply after 4 touches, push to SmartLead for a parallel
                email sequence.
              </li>
            </ul>
          </div>
        </section>

        {/* Activity (existing dummy timeline) */}
        <section>
          <div className="text-slate-400 font-semibold mb-1">Activity</div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
            <div className="flex gap-2">
              <div className="text-[10px] mt-0.5 text-slate-500">Now</div>
              <div className="flex-1">
                <div className="text-slate-200">
                  Opened record in GTM CRM (you)
                </div>
                <div className="text-slate-500 text-[11px]">
                  Viewing latest playbook suggestions
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="text-[10px] mt-0.5 text-slate-500">2h ago</div>
              <div className="flex-1">
                <div className="text-slate-200">
                  Replied to SmartLead sequence · “Interested, send more info.”
                </div>
                <div className="text-slate-500 text-[11px]">
                  Source: SmartLead
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="text-[10px] mt-0.5 text-slate-500">Yesterday</div>
              <div className="flex-1">
                <div className="text-slate-200">
                  Enriched contact and company details.
                </div>
                <div className="text-slate-500 text-[11px]">
                  Source: Clay
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations (existing) */}
        <section>
          <div className="text-slate-400 font-semibold mb-1">
            Integrations
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-slate-200 space-y-1">
            <div className="flex justify-between">
              <span>Clay</span>
              <span className="text-[11px] text-emerald-400">Synced</span>
            </div>
            <div className="flex justify-between">
              <span>HeyReach</span>
              <span className="text-[11px] text-amber-400">
                Not enrolled in sequence
              </span>
            </div>
            <div className="flex justify-between">
              <span>SmartLead</span>
              <span className="text-[11px] text-emerald-400">
                Active email campaign
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DealDrawer;
