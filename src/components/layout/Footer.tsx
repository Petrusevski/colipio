import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900/80 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
        <div>
          GTM CRM · Pipeline Command Center ·{" "}
          <span className="text-slate-300">Frontend demo</span>
        </div>
        <div className="flex gap-3">
          <a href="https://github.com/yourusername/gtm-crm" className="hover:text-slate-300">
            GitHub
          </a>
          <a href="#" className="hover:text-slate-300">
            Changelog
          </a>
          <a href="/contact" className="hover:text-slate-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
