import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DemoRequestPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // frontend-only: in real app you'd send this to backend / CRM
    setTimeout(() => {
      navigate("/"); // go back to landing after short delay
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-900/80 bg-slate-950/80">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
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
        <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/40 text-xs">
          <h1 className="text-xl font-semibold mb-1">Request a live GTM demo</h1>
          <p className="text-sm text-slate-400 mb-4">
            Tell us a bit about your motion and stack. We&apos;ll walk you
            through how to model it in this GTM CRM.
          </p>

          {submitted ? (
            <div className="mt-2 text-sm text-emerald-300">
              Demo request submitted (frontend-only). Redirecting you back to
              the main site…
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-300">Company</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Acme Retail"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-300">
                    Primary GTM role
                  </label>
                  <select className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>Founder / Leadership</option>
                    <option>Sales / SDR / AE</option>
                    <option>RevOps</option>
                    <option>Marketing / Growth</option>
                    <option>Agency / Consultant</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300">
                  Current GTM tools in use
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Clay, HeyReach, SmartLead, Salesforce, HubSpot..."
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300">
                  What do you want this GTM CRM to solve?
                </label>
                <textarea
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
                  placeholder="Example: centralize replies from Clay + HeyReach, model subscriptions, track outbound projects on deals..."
                />
              </div>

              <button
                type="submit"
                className="w-full mt-1 rounded-xl bg-indigo-600 py-2 text-xs font-semibold hover:bg-indigo-500"
              >
                Submit demo request
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default DemoRequestPage;
