import React, { useMemo, useState } from "react";
import { Contact } from "../types";

interface ContactsPageProps {
  contacts: Contact[];
}

const ContactsPage: React.FC<ContactsPageProps> = ({ contacts }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Contact["status"]>(
    "All"
  );

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.company.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ? true : c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [contacts, query, statusFilter]);

  const statusCounts = contacts.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    {} as Record<Contact["status"], number>
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">Contacts</h1>
          <p className="text-sm text-slate-400">
            Every person you&apos;re targeting across Clay, HeyReach and
            SmartLead – in one clean table.
          </p>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-slate-50">
          + Add contact
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Total contacts</div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {contacts.length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Active</div>
          <div className="mt-1 text-lg font-semibold text-emerald-300">
            {statusCounts["Active"] || 0}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400">Paused / Unsubscribed</div>
          <div className="mt-1 text-lg font-semibold text-amber-300">
            {(statusCounts["Paused"] || 0) + (statusCounts["Unsubscribed"] || 0)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
        <input
          type="text"
          placeholder="Search name, company, email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs min-w-[220px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Unsubscribed">Unsubscribed</option>
        </select>
        <span className="text-slate-500">
          {filtered.length} of {contacts.length} contacts
        </span>
      </div>

      <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-900/80">
            <tr className="text-slate-400">
              <th className="text-left px-3 py-2 font-medium">Contact</th>
              <th className="text-left px-3 py-2 font-medium">Company</th>
              <th className="text-left px-3 py-2 font-medium">Email</th>
              <th className="text-left px-3 py-2 font-medium">Channel</th>
              <th className="text-left px-3 py-2 font-medium">Status</th>
              <th className="text-left px-3 py-2 font-medium">Last activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-t border-slate-800 hover:bg-slate-900/80"
              >
                <td className="px-3 py-2">
                  <div className="font-semibold text-slate-50">{c.name}</div>
                  <div className="text-slate-400">{c.title}</div>
                </td>
                <td className="px-3 py-2 text-slate-200">{c.company}</td>
                <td className="px-3 py-2 text-slate-300">{c.email}</td>
                <td className="px-3 py-2 text-slate-300">
                  {c.channel === "Email" ? "✉️ Email" : "💼 LinkedIn"}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] border ${
                      c.status === "Active"
                        ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                        : c.status === "Paused"
                        ? "bg-amber-950 text-amber-300 border-amber-700"
                        : "bg-rose-950 text-rose-300 border-rose-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-400">{c.lastActivity}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-6 text-center text-slate-500 italic"
                >
                  No contacts match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;
