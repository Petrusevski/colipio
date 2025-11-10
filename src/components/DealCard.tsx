import React from "react";
import { Deal, Stage } from "../types";

interface DealCardProps {
  deal: Deal;
  onClick: () => void;
  onStageChange: (id: string, stage: Stage) => void;
  allStages: Stage[];
}

const formatCurrency = (value: number) =>
  "€" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const DealCard: React.FC<DealCardProps> = ({
  deal,
  onClick,
  onStageChange,
  allStages,
}) => {
  const channelEmoji =
    deal.channel === "Email" ? "✉️" : deal.channel === "LinkedIn" ? "💼" : "📞";

  const stageOptions = allStages.filter((s) => s !== deal.stage);

  const priorityColor =
    deal.priority === "High"
      ? "bg-rose-900/70 text-rose-200 border-rose-700/70"
      : deal.priority === "Medium"
      ? "bg-amber-900/70 text-amber-200 border-amber-700/70"
      : "bg-slate-800 text-slate-200 border-slate-700";

  return (
    <div
      className="bg-slate-900 border border-slate-700 rounded-2xl p-3 text-xs cursor-pointer hover:border-indigo-500 hover:bg-slate-900/80 transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="font-semibold text-slate-50 text-sm">
            {deal.contactName}
          </div>
          <div className="text-slate-400">
            {deal.title} · {deal.companyName}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
            {deal.source}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] border ${priorityColor}`}
          >
            {deal.priority} priority
          </span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
          {deal.segment}
        </span>
        {deal.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full bg-indigo-900/60 text-[10px] text-indigo-200 border border-indigo-800/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400 flex-1">
          <div className="flex items-center gap-1">
            <span>{channelEmoji}</span>
            <span>{deal.lastTouch}</span>
          </div>
          <div className="mt-1 text-slate-200">
            Next:{" "}
            <span className="font-medium text-indigo-300">{deal.nextStep}</span>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-200 font-semibold">
          {formatCurrency(deal.value)}
        </div>
      </div>

      <div
        className="mt-2 flex items-center justify-between gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[11px] text-slate-500">Owner: {deal.owner}</div>
        <select
          className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={deal.stage}
          onChange={(e) => onStageChange(deal.id, e.target.value as Stage)}
        >
          <option value={deal.stage}>{deal.stage}</option>
          {stageOptions.map((stage) => (
            <option key={stage} value={stage}>
              → {stage}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DealCard;
