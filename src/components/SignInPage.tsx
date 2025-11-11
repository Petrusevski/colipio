import React from "react";

interface SignInPageProps {
  onBackToLanding: () => void;
  onGoToSignUp: () => void;
  onSignedIn: () => void; // go into app
}

const SignInPage: React.FC<SignInPageProps> = ({
  onBackToLanding,
  onGoToSignUp,
  onSignedIn,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // frontend-only: just drop user into the app
    onSignedIn();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-900/80 bg-slate-950/80">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <button
            className="text-[11px] text-slate-400 hover:text-slate-200"
            onClick={onBackToLanding}
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
          <h1 className="text-xl font-semibold mb-1">Sign in</h1>
          <p className="text-sm text-slate-400 mb-4">
            Access your GTM CRM workspace.
          </p>

          <form className="space-y-3 text-xs" onSubmit={handleSubmit}>
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
              <label className="block text-slate-300">Password</label>
              <input
                type="password"
                required
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-600 bg-slate-900"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-1 rounded-xl bg-indigo-600 py-2 text-xs font-semibold hover:bg-indigo-500"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 text-[11px] text-slate-400">
            Don&apos;t have an account?{" "}
            <button
              className="text-indigo-400 hover:text-indigo-300"
              onClick={onGoToSignUp}
            >
              Create one
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
