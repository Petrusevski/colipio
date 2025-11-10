import React from "react";
import { Account } from "../types";

interface AccountsPageProps {
  accounts: Account[];
}

const AccountsPage: React.FC<AccountsPageProps> = ({ accounts }) => {
  const totalOpenDeals = accounts.reduce((sum, a) => sum + a.openDeals, 0);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">Accounts</h1>
          <p className="text-sm text-slate-400">
            Group GTM efforts by company, see who owns what, and where deals are
            stacking.
          </p>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-slate-50">
          + Add account
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Total accounts</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {accounts.length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Open deals</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {totalOpenDeals}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Owners</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {Array.from(new Set(accounts.map((a) => a.owner))).join(", ")}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-900/80 text-slate-400">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Account</th>
              <th className="text-left px-3 py-2 font-medium">Segment</th>
              <th className="text-left px-3 py-2 font-medium">Owner</th>
              <th className="text-left px-3 py-2 font-medium">Open deals</th>
              <th className="text-left px-3 py-2 font-medium">Last touch</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr
                key={a.id}
                className="border-t border-slate-800 hover:bg-slate-900/80"
              >
                <td className="px-3 py-2 text-slate-50">{a.name}</td>
                <td className="px-3 py-2 text-slate-300">{a.segment}</td>
                <td className="px-3 py-2 text-slate-300">{a.owner}</td>
                <td className="px-3 py-2 text-slate-300">{a.openDeals}</td>
                <td className="px-3 py-2 text-slate-400">{a.lastTouch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsPage;
