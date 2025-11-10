export type GTMSource = "Clay" | "HeyReach" | "SmartLead" | "Manual";

export type Stage =
  | "New"
  | "Enriched"
  | "Outreach"
  | "Replied"
  | "Qualified"
  | "Opportunity"
  | "Won"
  | "Lost";

export type Page =
  | "pipeline"
  | "contacts"
  | "accounts"
  | "sequences"
  | "workflows"
  | "tasks"
  | "integrations"
  | "revenue"
  | "analytics"
  | "roles";



export type DealPriority = "Low" | "Medium" | "High";

export interface Deal {
  id: string;
  contactName: string;
  companyName: string;
  title: string;
  stage: Stage;
  owner: string;
  segment: string;
  source: GTMSource;
  lastTouch: string;
  nextStep: string;
  channel: "Email" | "LinkedIn" | "Call";
  tags: string[];
  value: number; // deal value in EUR (dummy)
  priority: DealPriority;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  channel: "Email" | "LinkedIn";
  lastActivity: string;
  status: "Active" | "Paused" | "Unsubscribed";
}

export interface Account {
  id: string;
  name: string;
  segment: string;
  owner: string;
  openDeals: number;
  lastTouch: string;
}

export interface Sequence {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Draft";
  primaryChannel: "LinkedIn" | "Email" | "Call" | "Social";
  channelMix: ("LinkedIn" | "Email" | "Call" | "Social")[];
  audience: string;
  leads: number;
  sent: number;
  replies: number;
  meetings: number;
  owner: string;
  tools: string; // e.g. "HeyReach + SmartLead"
  createdAt: string;
  lastRun: string;
  tags: string[];
  channels: {
    type: "LinkedIn" | "Email" | "Call" | "Social";
    sent: number;
    replies: number;
    meetings: number;
  }[];
  templates: {
    id: string;
    name: string;
    channel: "LinkedIn" | "Email" | "Call" | "Social";
    snippet: string;
  }[];
}

export interface Task {
  id: string;
  title: string;
  type:
    | "Call"
    | "Email"
    | "Manual Step"
    | "Onboarding"
    | "Renewal"
    | "Success"
    | "Internal";
  owner: string;
  due: string; // display string (we can normalize later)
  status: "Today" | "Upcoming" | "Overdue" | "Done";
  entityType: "Deal" | "Contact" | "Account" | "Subscription";
  entityName: string;

  // New fields for project-style management
  priority: "Low" | "Medium" | "High";
  tags: string[];
  relatedDealId?: string;      // for layering on specific deal
  dependsOnIds?: string[];     // task IDs this task depends on
}
