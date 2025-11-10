import React, { useState } from "react";
import Layout from "./components/Layout";
import PipelineBoard from "./components/PipelineBoard";
import IntegrationsPage from "./components/IntegrationsPage";
import ContactsPage from "./components/ContactsPage";
import AccountsPage from "./components/AccountsPage";
import SequencesPage from "./components/SequencesPage";
import TasksPage from "./components/TasksPage";
import { Deal, Stage, Page, Contact, Account, Sequence, Task } from "./types";
import WorkflowsPage from "./components/WorkflowsPage";
import RevenuePage from "./components/RevenuePage";
import AnalyticsPage from "./components/AnalyticsPage";
import RolesPage from "./components/RolesPage";


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
  {
    id: "5",
    contactName: "Eva Rossi",
    companyName: "FitWave Studios",
    title: "Founder",
    stage: "Opportunity",
    owner: "Ana",
    segment: "SMB / Fitness",
    source: "HeyReach",
    lastTouch: "3d ago · Viewed pricing page",
    nextStep: "Follow up with pilot offer",
    channel: "LinkedIn",
    tags: ["Warm", "Pilot"],
    value: 12000,
    priority: "Medium",
  },
  {
    id: "6",
    contactName: "David Kim",
    companyName: "NorthLine Telecom",
    title: "Retention Lead",
    stage: "Lost",
    owner: "Nikola",
    segment: "Enterprise / Telco",
    source: "Clay",
    lastTouch: "Last week · Chose competitor",
    nextStep: "Set reminder to re-check in 6 months",
    channel: "Email",
    tags: ["Lost", "Competitor"],
    value: 80000,
    priority: "High",
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
      {
        id: "t3",
        name: "Email follow-up with 2 case studies",
        channel: "Email",
        snippet:
          "Subject: Quick loyalty wins for {{company}}\n\nHi {{first_name}},\n\nWe recently helped {{brand_1}} and {{brand_2}} lift repeat orders by 14–19% via simple loyalty nudges. Happy to send a 1-page breakdown if useful.",
      },
    ],
  },
  {
    id: "seq2",
    name: "Enrichment → Outreach combo",
    status: "Active",
    primaryChannel: "Email",
    channelMix: ["Email", "LinkedIn"],
    audience: "Tech-enabled retail & DTC",
    leads: 180,
    sent: 760,
    replies: 82,
    meetings: 21,
    owner: "Eva",
    tools: "Clay + SmartLead + HeyReach",
    createdAt: "2025-10-02",
    lastRun: "2025-11-08 · 16:42",
    tags: ["Enrichment", "Multi-channel", "Playbook"],
    channels: [
      { type: "Email", sent: 500, replies: 70, meetings: 18 },
      { type: "LinkedIn", sent: 260, replies: 12, meetings: 3 },
    ],
    templates: [
      {
        id: "t4",
        name: "Clay-enriched intro (Email)",
        channel: "Email",
        snippet:
          "Hi {{first_name}},\n\nNoticed via Clay that you're using {{tech_stack_item}} and expanding in {{region}}. We're helping similar teams turn that data into higher LTV via loyalty and retention experiments.",
      },
      {
        id: "t5",
        name: "Soft touch LinkedIn nudge",
        channel: "LinkedIn",
        snippet:
          "Love what you're doing at {{company}} around {{initiative}}. Curious how you're thinking about retention/loyalty in the next 6–12 months?",
      },
    ],
  },
  {
    id: "seq3",
    name: "Expansion / Upsell: existing customers",
    status: "Paused",
    primaryChannel: "Call",
    channelMix: ["Call", "Email"],
    audience: "Existing high-usage customers",
    leads: 60,
    sent: 210,
    replies: 40,
    meetings: 18,
    owner: "Martin",
    tools: "CRM only",
    createdAt: "2025-08-18",
    lastRun: "2025-11-01 · 11:03",
    tags: ["Expansion", "CS", "Renewal"],
    channels: [
      { type: "Call", sent: 90, replies: 30, meetings: 15 },
      { type: "Email", sent: 120, replies: 10, meetings: 3 },
    ],
    templates: [
      {
        id: "t6",
        name: "Quarterly value review (Call)",
        channel: "Call",
        snippet:
          "Call agenda: 1) Review results from last 90 days. 2) Highlight underused features. 3) Explore uplift from upgrading tier or adding new modules.",
      },
      {
        id: "t7",
        name: "Post-call recap (Email)",
        channel: "Email",
        snippet:
          "Hi {{first_name}},\n\nGreat speaking just now. As discussed, here's a quick recap and the 2–3 experiments we can run next quarter to increase your program performance.",
      },
    ],
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
  {
    id: "c5",
    name: "Eva Rossi",
    title: "Founder",
    company: "FitWave Studios",
    email: "eva@fitwave.studio",
    channel: "LinkedIn",
    lastActivity: "Clicked pricing link · 3d ago",
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
  {
    id: "a4",
    name: "EuroMart Groceries",
    segment: "Enterprise / Retail",
    owner: "Nikola",
    openDeals: 1,
    lastTouch: "Requested case studies · Today",
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
    relatedDealId: "1", // Acme Retail
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
    tags: ["Follow-up", "Enterprise", "Logistics"],
    relatedDealId: "2", // SkyFleet Logistics
    dependsOnIds: ["t4"],
  },
  {
    id: "t3",
    title: "Manual step: personalize first email",
    type: "Manual Step",
    owner: "Nikola",
    due: "Tomorrow",
    status: "Upcoming",
    entityType: "Deal",
    entityName: "UrbanFit · Pilot",
    priority: "High",
    tags: ["Outreach", "Personalization", "Fitness"],
    relatedDealId: "3", // UrbanFit
    dependsOnIds: ["t1"],
  },
  {
    id: "t4",
    title: "Follow up on no-show",
    type: "Call",
    owner: "Nikola",
    due: "Yesterday",
    status: "Overdue",
    entityType: "Deal",
    entityName: "SkyFleet · Evaluation",
    priority: "High",
    tags: ["Recovery", "Enterprise", "Critical"],
    relatedDealId: "2", // SkyFleet Logistics
    dependsOnIds: [],
  },
  {
    id: "t5",
    title: "Onboarding checklist: Acme Retail",
    type: "Onboarding",
    owner: "Nikola",
    due: "This week",
    status: "Upcoming",
    entityType: "Deal",
    entityName: "Acme Retail · Pilot",
    priority: "Medium",
    tags: ["Onboarding", "Playbook", "Retail"],
    relatedDealId: "1",
    dependsOnIds: ["t1"],
  },
  {
    id: "t6",
    title: "Success QBR deck for EuroMart",
    type: "Success",
    owner: "Nikola",
    due: "Next week",
    status: "Upcoming",
    entityType: "Account",
    entityName: "EuroMart Groceries",
    priority: "Medium",
    tags: ["Success", "QBR", "Enterprise"],
    relatedDealId: "4", // EuroMart
    dependsOnIds: [],
  },
  {
    id: "t7",
    title: "Prepare renewal strategy for SkyFleet",
    type: "Renewal",
    owner: "Ana",
    due: "End of month",
    status: "Upcoming",
    entityType: "Subscription",
    entityName: "SkyFleet Logistics · Rev-share",
    priority: "High",
    tags: ["Renewal", "Expansion", "Rev-share"],
    relatedDealId: "2",
    dependsOnIds: ["t2", "t4"],
  },
  {
    id: "t8",
    title: "Internal: define onboarding playbook v1",
    type: "Internal",
    owner: "Nikola",
    due: "Later",
    status: "Upcoming",
    entityType: "Account",
    entityName: "All · Playbook",
    priority: "Low",
    tags: ["Internal", "Process", "Onboarding"],
    relatedDealId: undefined,
    dependsOnIds: [],
  },
];


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
    <Layout currentPage={page} onNavigate={setPage}>
      {page === "pipeline" && (
        <PipelineBoard deals={deals} onStageChange={handleStageChange} />
      )}
      {page === "roles" && <RolesPage />}  {/* 👈 new */}
      {page === "contacts" && <ContactsPage contacts={contacts} />}
      {page === "accounts" && <AccountsPage accounts={accounts} />}
      {page === "sequences" && <SequencesPage sequences={sequences} />}
      {page === "workflows" && <WorkflowsPage />}
      {page === "tasks" && <TasksPage tasks={tasks} />}
      {page === "integrations" && <IntegrationsPage />}
      {page === "revenue" && <RevenuePage />}
      {page === "analytics" && <AnalyticsPage />} {/* 👈 new */}



    </Layout>
  );
};

export default App;
