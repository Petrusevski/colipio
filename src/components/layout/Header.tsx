import React from "react";

interface HeaderProps {
  onLaunchApp?: () => void; // e.g. navigate to sign-in
  onViewDemo?: () => void;  // e.g. navigate to demo
}

const Header: React.FC<HeaderProps> = ({ onLaunchApp, onViewDemo }) => {
  return (
    <header className="border-b border-slate-900/80 backdrop-blur bg-slate-950/80 sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-sm font-bold">
            GT
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">Colipio</span>
            <span className="text-[11px] text-slate-400">Command Center</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300">
          <a href="#home" className="hover:text-slate-50">
            Home
          </a>
          <a href="#product" className="hover:text-slate-50">
            Product
          </a>
          <a href="#integrations" className="hover:text-slate-50">
            Integrations
          </a>
          <a href="#pricing" className="hover:text-slate-50">
            Pricing
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onViewDemo}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-900"
          >
            View demo
          </button>

          <button
            onClick={onLaunchApp}
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-indigo-600 text-xs font-semibold hover:bg-indigo-500"
          >
            Launch app
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
