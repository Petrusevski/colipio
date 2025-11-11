import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900/80 bg-slate-950/90 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* === Column 1: Brand / About === */}
        <div>
          <h3 className="text-slate-200 font-semibold text-sm mb-2">Colipio Labs</h3>
          <p className="text-[12px] leading-relaxed text-slate-500">
            Building the GTM-native CRM and automation command center for SaaS
            teams and agencies. Connecting enrichment, outreach & revenue into
            one unified workspace.
          </p>
          <p className="text-[11px] text-slate-600 mt-3">
            &copy; {year} Colipio Labs. All rights reserved.
          </p>
        </div>

{/* === Column 2: Navigation Links === */}
<div className="flex flex-col gap-2 text-[12px] text-slate-400">
  <h4 className="text-slate-200 font-semibold mb-1">Explore</h4>
  <a href="/products" className="hover:text-slate-100 transition-colors">
    Products
  </a>
  <a href="/about" className="hover:text-slate-100 transition-colors">
    About Us
  </a>
  <a href="/careers" className="hover:text-slate-100 transition-colors">
    Careers
  </a>
  <a href="/pricing" className="hover:text-slate-100 transition-colors">
    Pricing
  </a>
  <a href="/terms" className="hover:text-slate-100 transition-colors">
    Terms &amp; Conditions
  </a>
  <a href="/privacy" className="hover:text-slate-100 transition-colors">
    Privacy Policy
  </a>
</div>


        {/* === Column 3: Social Media === */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-2 text-sm">Connect with us</h4>
          <div className="flex gap-3 mt-1">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/company/colipio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://twitter.com/colipioHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
