import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Page } from "../types";

interface LayoutProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  currentPage,
  onNavigate,
  children,
}) => {
  return (
    <div className="h-screen flex bg-slate-950 text-slate-100">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto h-full flex flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
