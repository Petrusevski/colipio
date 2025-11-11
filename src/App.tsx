import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PipelineBoard from "./components/PipelineBoard";
import IntegrationsPage from "./components/IntegrationsPage";
import ContactsPage from "./components/ContactsPage";
import AccountsPage from "./components/AccountsPage";
import SequencesPage from "./components/SequencesPage";
import TasksPage from "./components/TasksPage";
import WorkflowsPage from "./components/WorkflowsPage";
import RevenuePage from "./components/RevenuePage";
import AnalyticsPage from "./components/AnalyticsPage";
import RolesPage from "./components/RolesPage";

import LandingPage from "./components/LandingPage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import DemoRequestPage from "./components/DemoRequestPage";
import AboutPage from "./components/AboutPage";
import CareersPage from "./components/CareersPage";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import ProductsPage from "./components/ProductsPage";
import PricingPage from "./components/PricingPage";


import { Deal, Stage, Page, Contact, Account, Sequence, Task } from "./types";

/* -------------------------------------------------------------------------- */
/*                                INITIAL DATA                                */
/* -------------------------------------------------------------------------- */

const initialDeals: Deal[] = [
  {
    id: "1",
    contactName: "Sarah Johnson",
    companyName: "Acme Retail",
    title: "VP Marketing",
    stage: "Outreach",
    owner: "Nikola",
    segment: "Mid-market / Fashion",
    source: "Clay",
    lastTouch: "Yesterday · Enriched via Clay",
    nextStep: "Launch LinkedIn sequence in HeyReach",
    channel: "LinkedIn",
    tags: ["ICP", "High Intent"],
    value: 18000,
    priority: "High",
  },
  {
    id: "2",
    contactName: "Liam Novak",
    companyName: "SkyFleet Logistics",
    title: "Head of CX",
    stage: "Qualified",
    owner: "Ana",
    segment: "Enterprise / Logistics",
    source: "SmartLead",
    lastTouch: "2h ago · Replied to cold email",
    nextStep: "Book demo · Send calendar link",
    channel: "Email",
    tags: ["Reply", "Demo Requested"],
    value: 42000,
    priority: "High",
  },
  {
    id: "3",
    contactName: "Julia Rossi",
    companyName: "UrbanFit",
    title: "CRM Manager",
    stage: "New",
    owner: "Nikola",
    segment: "SMB / Fitness",
    source: "Manual",
    lastTouch: "Imported from CSV",
    nextStep: "Enrich in Clay",
    channel: "Email",
    tags: ["To Enrich"],
    value: 9000,
    priority: "Medium",
  },
  {
    id: "4",
    contactName: "Martin Schulz",
    companyName: "EuroMart Groceries",
    title: "Head of Loyalty",
    stage: "Replied",
    owner: "Nikola",
    segment: "Enterprise / Retail",
    source: "SmartLead",
    lastTouch: "Today · Asked for case studies",
    nextStep: "Send retail deck + schedule follow-up",
    channel: "Email",
    tags: ["Reply", "Case Study"],
    value: 65000,
    priority: "High",
  },
];

const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    title: "VP Marketing",
    company: "Acme Retail",
    email: "sarah@acmeretail.com",
    channel: "LinkedIn",
    lastActivity: "Viewed LinkedIn profile · 1h ago",
    status: "Active",
  },
  {
    id: "c2",
    name: "Liam Novak",
    title: "Head of CX",
    company: "SkyFleet Logistics",
    email: "liam.novak@skyfleet.io",
    channel: "Email",
    lastActivity: "Replied to SmartLead sequence · 2h ago",
    status: "Active",
  },
  {
    id: "c3",
    name: "Julia Rossi",
    title: "CRM Manager",
    company: "UrbanFit",
    email: "julia.rossi@urbanfit.app",
    channel: "Email",
    lastActivity: "Added from CSV · Yesterday",
    status: "Paused",
  },
  {
    id: "c4",
    name: "Martin Schulz",
    title: "Head of Loyalty",
    company: "EuroMart Groceries",
    email: "martin.schulz@euromart.eu",
    channel: "Email",
    lastActivity: "Asked for retail case studies · Today",
    status: "Active",
  },
];

const initialAccounts: Account[] = [
  {
    id: "a1",
    name: "Acme Retail",
    segment: "Mid-market / Fashion",
    owner: "Nikola",
    openDeals: 2,
    lastTouch: "Outbound sequence step · 1d ago",
  },
  {
    id: "a2",
    name: "SkyFleet Logistics",
    segment: "Enterprise / Logistics",
    owner: "Ana",
    openDeals: 1,
    lastTouch: "Demo requested · 2h ago",
  },
  {
    id: "a3",
    name: "UrbanFit",
    segment: "SMB / Fitness",
    owner: "Nikola",
    openDeals: 1,
    lastTouch: "Contact enriched · Yesterday",
  },
];

const initialSequences: Sequence[] = [
  {
    id: "seq1",
    name: "Loyalty SaaS · Mid-market cold outreach",
    status: "Active",
    primaryChannel: "LinkedIn",
    channelMix: ["LinkedIn", "Email", "Call"],
    audience: "Retail & Fashion · 50–500 employees",
    leads: 240,
    sent: 1200,
    replies: 126,
    meetings: 34,
    owner: "Nikola",
    tools: "HeyReach + SmartLead",
    createdAt: "2025-09-10",
    lastRun: "2025-11-09 · 21:15",
    tags: ["Cold", "ICP-validated", "Loyalty SaaS"],
    channels: [
      { type: "LinkedIn", sent: 800, replies: 92, meetings: 24 },
      { type: "Email", sent: 300, replies: 28, meetings: 8 },
      { type: "Call", sent: 100, replies: 6, meetings: 2 },
    ],
    templates: [
      {
        id: "t1",
        name: "Loyalty SaaS cold opener (LinkedIn)",
        channel: "LinkedIn",
        snippet:
          "Hey {{first_name}}, quick one – we help retail brands increase repeat purchases by 12–18% with a smarter loyalty stack. Curious if you're already testing anything in this direction?",
      },
      {
        id: "t2",
        name: "Follow-up after profile view",
        channel: "LinkedIn",
        snippet:
          "Saw you checked my profile – appreciate you taking a look. Happy to share 2–3 quick loyalty experiments leaders in {{industry}} are running right now.",
      },
    ],
  },
];

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Call Sarah about demo agenda",
    type: "Call",
    owner: "Nikola",
    due: "Today · 16:00",
    status: "Today",
    entityType: "Deal",
    entityName: "Acme Retail · Demo",
    priority: "High",
    tags: ["Onboarding", "Demo Prep", "Retail"],
    relatedDealId: "1",
    dependsOnIds: [],
  },
  {
    id: "t2",
    title: "Send recap email to Liam",
    type: "Email",
    owner: "Ana",
    due: "Today · 18:00",
    status: "Today",
    entityType: "Contact",
    entityName: "Liam Novak",
    priority: "Medium",
    tags: ["Follow-up", "Enterprise"],
    relatedDealId: "2",
    dependsOnIds: ["t1"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   APP JSX                                  */
/* -------------------------------------------------------------------------- */

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("pipeline");
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [contacts] = useState<Contact[]>(initialContacts);
  const [accounts] = useState<Account[]>(initialAccounts);
  const [sequences] = useState<Sequence[]>(initialSequences);
  const [tasks] = useState<Task[]>(initialTasks);

  const handleStageChange = (id: string, newStage: Stage) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, stage: newStage } : d))
    );
  };

  return (
    <Routes>
      {/* Marketing & Auth pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/demo" element={<DemoRequestPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/pricing" element={<PricingPage />} />



      {/* Main app layout */}
      <Route
        path="/app"
        element={
          <Layout currentPage={page} onNavigate={setPage}>
            {page === "pipeline" && (
              <PipelineBoard deals={deals} onStageChange={handleStageChange} />
            )}
            {page === "contacts" && <ContactsPage contacts={contacts} />}
            {page === "accounts" && <AccountsPage accounts={accounts} />}
            {page === "sequences" && <SequencesPage sequences={sequences} />}
            {page === "tasks" && <TasksPage tasks={tasks} />}
            {page === "workflows" && <WorkflowsPage />}
            {page === "integrations" && <IntegrationsPage />}
            {page === "revenue" && <RevenuePage />}
            {page === "analytics" && <AnalyticsPage />}
            {page === "roles" && <RolesPage />}
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
