import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // frontend-only: pretend account is created and go to app
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-900/80 bg-slate-950/80">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <button
            className="text-[11px] text-slate-400 hover:text-slate-200"
            onClick={() => navigate("/")}
          >
            ← Back to marketing site
          </button>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-[11px] font-bold">
              GT
            </div>
            <span className="text-xs font-semibold">GTM CRM</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/40">
          <h1 className="text-xl font-semibold mb-1">Create your workspace</h1>
          <p className="text-sm text-slate-400 mb-4">
            Set up a GTM CRM sandbox for your team. No backend yet—just flows.
          </p>

          <form className="space-y-3 text-xs" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-slate-300">Full name</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Sarah Johnson"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-slate-300">Work email</label>
              <input
                type="email"
                required
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-slate-300">Company</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Acme Retail"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-slate-300">Role</label>
                <select className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>Founder / CEO</option>
                  <option>Sales / SDR / AE</option>
                  <option>RevOps</option>
                  <option>Marketing</option>
                  <option>Agency / Consultant</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-slate-300">Team size</label>
                <select className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>1–3</option>
                  <option>4–10</option>
                  <option>11–25</option>
                  <option>26–100</option>
                  <option>100+</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-slate-300">Password</label>
              <input
                type="password"
                required
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-1 rounded-xl bg-indigo-600 py-2 text-xs font-semibold hover:bg-indigo-500"
            >
              Create account &amp; enter app
            </button>
          </form>

          <div className="mt-4 text-[11px] text-slate-400">
            Already have an account?{" "}
            <button
              className="text-indigo-400 hover:text-indigo-300"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
