# GTM CRM – Pipeline Command Center

A Vite + React + TypeScript + Tailwind-based **GTM-native CRM** that sits on top of tools like Clay, HeyReach, SmartLead and other GTM products.

The goal is to be the **single source of truth for GTM workflows**:
- Track deals and pipeline
- Orchestrate enrichment → outreach → revenue workflows
- Layer project / task management on top of deals
- Sync with the GTM stack (Clay, HeyReach, SmartLead, Salesforce, HubSpot, etc.)

---

## Stack

- **Vite** (React + TypeScript)
- **React** (SPA)
- **Tailwind CSS**
- Frontend-only – all data is currently mocked for UX exploration

---

## Core Features

### 1. GTM Pipeline CRM
- Kanban-style **deal pipeline** with draggable stages (New, Outreach, Qualified, Replied, Opportunity, Closed, Lost).
- Each deal is GTM-aware: segment, source (Clay / HeyReach / SmartLead / Manual), last touch, next step, tags, value, priority.

### 2. Agentic Workflow Builder
- **Workflows** page with split-screen layout:
  - Left: AI-style “agent” chat panel to describe automation in natural language.
  - Right: Visual workflow graph of nodes (triggers, conditions, actions).
- Nodes like:
  - Trigger: *When enrichment score > X*
  - Actions: *Enroll in sequence*, *Update stage*, *Create task*
  - Branching: *If no reply in 7 days → move to backup channel*
- Buttons for **New Workflow**, **Save**, **Run** (frontend-only hooks to later add backend orchestration).

### 3. Outreach Hub (Multi-channel)
- **Sequences** page with:
  - Sequence list (name, status, primary channel, channel mix, owner, tools).
  - Per-sequence breakdown:
    - Channel performance (LinkedIn, Email, Call).
    - GTM-ready templates:
      - “Loyalty SaaS cold outreach”
      - “Enrichment → outreach combo”
      - Expansion / upsell for existing customers.
- Designed to plug into HeyReach, SmartLead, Apollo, etc. later.

### 4. Revenue & Subscriptions

- **Revenue** page for recurring models (SaaS + agent marketplace):
  - Subscriptions list (account, owner, model, plan, term, MRR, ARR, seats, status).
  - Subscription change history (upgrades, downgrades, seat changes, churn).
  - Renewal / expansion / save tasks section.
- All fields use dummy data but are structured for MRR/ARR + renewal logic.

### 5. GTM Analytics Dashboards

- **Analytics** page with:
  - Funnel: **Enriched → Outreach started → Replies → Meetings**.
  - **Reply rate by channel** (LinkedIn, Email, Call, Social).
  - **Cost per lead** by source (Clay, HeyReach, SmartLead, Apollo, Manual).
  - **Time in pipeline by stage**.
  - **Forecast by enrichment source** (pipeline MRR & expected close MRR).
- Filters:
  - **Owner** (Nikola, Ana, Eva)
  - **Source tool**
  - **Channel**

### 6. Role-based UX Views

- **Role views** page with 4 dashboards:
  - **Enrichment** – records to enrich, missing fields, priority.
  - **Outreach** – today’s multi-channel manual steps (LinkedIn, Email, Call).
  - **Sales** – pipeline deals with value, stage, risk, next steps.
  - **Ops / Renewals** – renewal, expansion, save tasks tied to accounts & MRR.
- Switch role via pills at the top and the entire layout adapts.

### 7. GTM Integrations & Central Sync

- **Integrations** page as a central sync hub:
  - Core GTM tools:
    - Clay, HeyReach, SmartLead
  - + extra major GTM tools:
    - Salesforce, HubSpot, Apollo, Outreach, Salesloft, ZoomInfo,
      LinkedIn Sales Navigator, Gong, Slack, Intercom
  - Per-connector:
    - Status (Connected / Not Connected / Coming Soon)
    - Capabilities (Contacts / Sequences / Replies / Deals / Tasks)
    - **Live sync** toggle (mock)
    - **Webhook ingestion** toggle (mock)
    - Field mapping preview (how tool fields map into CRM)
    - Recent sync events (dummy log panel)
- All toggles are frontend-only; ready to hook into real auth + webhooks.

### 8. Task / Project Management on Deals

- **Tasks** page is a lightweight project manager on top of deals:
  - Columns by **status**: Today / Upcoming / Overdue / Done
  - Each task has:
    - Type (Call, Email, Manual Step, Onboarding, Success, Renewal, Internal)
    - Priority (Low / Medium / High)
    - Tags
    - Linked entity (Deal / Contact / Account / Subscription)
    - `relatedDealId` for on-deal context
    - `dependsOnIds` for dependencies
  - Detail panel:
    - Shows dependencies (“waiting on…”) and dependents (“unblocks…”)
- Meant for onboarding, CS, renewal and internal GTM projects layered on deals.

---

## Project Structure (high level)

```txt
.
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.cjs / tailwind.config.js
├─ postcss.config.cjs / postcss.config.js
├─ src
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ types.ts
│  ├─ index.css (Tailwind)
│  ├─ components
│  │  ├─ Layout.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ PipelineBoard.tsx
│  │  ├─ ContactsPage.tsx
│  │  ├─ AccountsPage.tsx
│  │  ├─ SequencesPage.tsx
│  │  ├─ WorkflowsPage.tsx
│  │  ├─ RevenuePage.tsx
│  │  ├─ AnalyticsPage.tsx
│  │  ├─ RolesPage.tsx
│  │  ├─ IntegrationsPage.tsx
│  │  ├─ TasksPage.tsx
│  │  └─ (any shared UI primitives you add later)
