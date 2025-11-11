import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goPricing = () => navigate("/pricing");
  const goProducts = () => navigate("/products");
  const goToDemo = () => navigate("/demo");
  const goToSignIn = () => navigate("/signin");

  return (
    <header className="border-b border-slate-900/80 backdrop-blur bg-slate-950/80 sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-sm font-bold">
            GT
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="text-sm font-semibold text-slate-50">
              Colipio
            </span>
            <span className="text-[11px] text-slate-400">
              GTM Command Center
            </span>
          </div>
        </button>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goHome}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-900"
          >
            Home
          </button>
           <button
            type="button"
            onClick={goProducts}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-900"
          >
            Products
          </button>
 <button
            type="button"
            onClick={goPricing}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-900"
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={goToDemo}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-900"
          >
            View demo
          </button>

          <button
            type="button"
            onClick={goToSignIn}
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
