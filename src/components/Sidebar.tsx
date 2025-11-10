import React from "react";
import { Page } from "../types";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const navItem =
    "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-sm transition-colors";
  const isActive = (page: Page) =>
    currentPage === page
      ? "bg-slate-800 text-slate-50"
      : "text-slate-300 hover:bg-slate-900";

  return (
    <aside className="w-60 bg-slate-950 border-r border-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          Colipio
        </div>
        <div className="mt-1 font-semibold text-slate-50 text-sm">
          Pipeline Command Center
        </div>
        <div className="mt-1 text-[11px] text-slate-500">
          Built for GTM teams
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 text-sm">
        <div
          className={`${navItem} ${isActive("pipeline")}`}
          onClick={() => onNavigate("pipeline")}
        >
          <span>📊</span>
          <span>Pipeline</span>
        </div>

                <div
          className={`${navItem} ${isActive("roles")}`}
          onClick={() => onNavigate("roles")}
        >
          <span>🧑‍💻</span>
          <span>Role views</span>
        </div>

        <div
          className={`${navItem} ${isActive("contacts")}`}
          onClick={() => onNavigate("contacts")}
        >

          <span>👥</span>
          <span>Contacts</span>
        </div>
        <div
          className={`${navItem} ${isActive("accounts")}`}
          onClick={() => onNavigate("accounts")}
        >
          <span>🏢</span>
          <span>Accounts</span>
        </div>
        <div
          className={`${navItem} ${isActive("sequences")}`}
          onClick={() => onNavigate("sequences")}
        >
          <span>📨</span>
          <span>Sequences</span>
        </div>
        <div
          className={`${navItem} ${isActive("workflows")}`}
          onClick={() => onNavigate("workflows")}
        >
          <span>🧩</span>
          <span>Workflows</span>
        </div>
        <div
          className={`${navItem} ${isActive("tasks")}`}
          onClick={() => onNavigate("tasks")}
        >
          <span>✅</span>
          <span>Tasks</span>
        </div>
        {/* 👉 New Revenue nav item */}
        <div
          className={`${navItem} ${isActive("revenue")}`}
          onClick={() => onNavigate("revenue")}
        >
          <span>💰</span>
          <span>Revenue</span>
        </div>
       

        {/* 👇 NEW: Analytics nav item */}
        <div
          className={`${navItem} ${isActive("analytics")}`}
          onClick={() => onNavigate("analytics")}
        >
          <span>📈</span>
          <span>Analytics</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-xs uppercase tracking-wide text-slate-500">
          System
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-xs uppercase tracking-wide text-slate-500">
          System
        </div>

        <div
          className={`${navItem} ${isActive("integrations")}`}
          onClick={() => onNavigate("integrations")}
        >
          <span>🔗</span>
          <span>Integrations</span>
        </div>
        <div
          className={`${navItem} text-slate-500 opacity-60 cursor-default`}
        >
          <span>⚙️</span>
          <span>Settings (coming soon)</span>
        </div>
      </nav>

      <div className="p-3 border-t border-slate-800 text-xs text-slate-500">
        <div>
          Workspace: <span className="text-slate-300">Default</span>
        </div>
        <div className="mt-1">
          Owner: <span className="text-slate-300">You</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
