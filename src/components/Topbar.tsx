import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search contacts, companies, sequences…"
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button className="hidden md:inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-indigo-500">
          ⌘K
          <span className="text-slate-500">Command palette (soon)</span>
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="hidden md:inline text-slate-400 mr-1">
          Sync GTM tools:
        </span>
        <button className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200">
          Clay
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200">
          HeyReach
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200">
          SmartLead
        </button>
        <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-50">
          + Import CSV
        </button>
      </div>
    </header>
  );
};

export default Topbar;
