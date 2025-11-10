import React, { useMemo, useState } from "react";

type WorkflowStatus = "Active" | "Draft" | "Paused";
type WorkflowStepType = "trigger" | "condition" | "action";

interface WorkflowStep {
  id: string;
  type: WorkflowStepType;
  title: string;
  tool: string;
  description: string;
  branch?: "yes" | "no"; // for condition branches
}

interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  audience: string;
  description: string;
  primaryTool: string;
  lastEdited: string;
  steps: WorkflowStep[];
}

type ChatRole = "user" | "agent";

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

const initialWorkflows: Workflow[] = [
  {
    id: "w1",
    name: "High-enrichment → LinkedIn → Backup email",
    status: "Active",
    audience: "Mid-market / Retail ICP",
    description:
      "If enrichment score is high, enroll in HeyReach. If no reply, move to SmartLead backup.",
    primaryTool: "Clay + HeyReach + SmartLead",
    lastEdited: "Today · 10:23",
    steps: [
      {
        id: "w1-s1",
        type: "trigger",
        title: "When enrichment score > 80",
        tool: "Clay",
        description: "Record is enriched and scored in Clay above 80/100.",
      },
      {
        id: "w1-s2",
        type: "action",
        title: "Enroll in LinkedIn sequence",
        tool: "HeyReach",
        description: "Add to 'Loyalty SaaS · Mid-market Fashion' sequence.",
      },
      {
        id: "w1-s3",
        type: "condition",
        title: "No reply within 7 days",
        tool: "HeyReach",
        description:
          "Check sequence status. If no positive reply or meeting booked within 7 days.",
      },
      {
        id: "w1-s4-yes",
        type: "action",
        branch: "yes",
        title: "Move to backup email sequence",
        tool: "SmartLead",
        description:
          "Enroll in SmartLead 'Retail CX leaders · backup' cold email flow.",
      },
      {
        id: "w1-s4-no",
        type: "action",
        branch: "no",
        title: "Stop LinkedIn sequence + create task",
        tool: "CRM",
        description:
          "Stop outreach sequence and create a manual follow-up task for the owner.",
      },
    ],
  },
];

const badgeClassesByStatus: Record<WorkflowStatus, string> = {
  Active: "bg-emerald-950 text-emerald-300 border border-emerald-700",
  Draft: "bg-slate-900 text-slate-300 border border-slate-700",
  Paused: "bg-amber-950 text-amber-300 border border-amber-700",
};

// --- Heuristic "agent" that turns a prompt into a Workflow (frontend only) ---
const generateWorkflowFromPrompt = (prompt: string): Workflow => {
  const trimmed = prompt.trim();
  const lower = trimmed.toLowerCase();
  const idBase = Date.now().toString();

  const mentionsClay = lower.includes("clay") || lower.includes("enrich");
  const mentionsHeyReach =
    lower.includes("heyreach") || lower.includes("linkedin");
  const mentionsSmartLead =
    lower.includes("smartlead") ||
    lower.includes("smart lead") ||
    lower.includes("email");
  const mentionsScore = lower.includes("score");
  const mentionsNoReply =
    lower.includes("no reply") ||
    lower.includes("no-response") ||
    lower.includes("no response");
  const mentionsDays = lower.match(/(\d+)\s*day/);
  const daysText = mentionsDays ? mentionsDays[0] : "7 days";

  const steps: WorkflowStep[] = [];

  // Trigger
  steps.push({
    id: `${idBase}-s1`,
    type: "trigger",
    title: mentionsScore
      ? "When enrichment score is above threshold"
      : "When contact is enriched",
    tool: mentionsClay ? "Clay" : "Clay / Data provider",
    description: mentionsScore
      ? "Record is enriched and enrichment score is above your threshold (e.g. 80/100)."
      : "Record becomes enriched with firmographics and contact data.",
  });

  // Primary sequence action
  if (mentionsHeyReach || !mentionsSmartLead) {
    steps.push({
      id: `${idBase}-s2`,
      type: "action",
      title: "Enroll in primary LinkedIn sequence",
      tool: "HeyReach",
      description:
        "Add contact to the main LinkedIn sequence for this segment.",
    });
  } else {
    steps.push({
      id: `${idBase}-s2`,
      type: "action",
      title: "Enroll in primary email sequence",
      tool: "SmartLead",
      description:
        "Add contact to SmartLead email sequence as primary outreach channel.",
    });
  }

  // Condition: no reply
  if (mentionsNoReply) {
    steps.push({
      id: `${idBase}-s3`,
      type: "condition",
      title: `No reply within ${daysText}`,
      tool: mentionsHeyReach ? "HeyReach" : "SmartLead",
      description: `If there is no positive reply or meeting booked within ${daysText} in the primary sequence.`,
    });
  } else {
    steps.push({
      id: `${idBase}-s3`,
      type: "condition",
      title: "No reply within 7 days",
      tool: mentionsHeyReach ? "HeyReach" : "SmartLead",
      description:
        "If there is no positive reply or meeting booked within 7 days in the primary sequence.",
    });
  }

  // Yes branch → backup channel
  steps.push({
    id: `${idBase}-s4-yes`,
    type: "action",
    branch: "yes",
    title: "Move to backup channel",
    tool: mentionsSmartLead ? "SmartLead" : "HeyReach / SmartLead",
    description: mentionsSmartLead
      ? "Enroll contact in SmartLead backup campaign (email)."
      : "Move contact to a backup sequence (e.g. SmartLead email).",
  });

  // No branch → log or stop
  steps.push({
    id: `${idBase}-s4-no`,
    type: "action",
    branch: "no",
    title: "Stop sequence + log outcome",
    tool: "CRM",
    description:
      "Stop the current sequence and log that contact responded or is already engaged.",
  });

  const nameFromPrompt =
    trimmed.length > 60 ? trimmed.slice(0, 57) + "…" : trimmed;

  return {
    id: `w-${idBase}`,
    name: `Agent: ${nameFromPrompt}`,
    status: "Draft",
    audience: "Defined by prompt",
    description: trimmed,
    primaryTool: [
      mentionsClay && "Clay",
      mentionsHeyReach && "HeyReach",
      mentionsSmartLead && "SmartLead",
    ]
      .filter(Boolean)
      .join(" + ") || "Clay + HeyReach + SmartLead",
    lastEdited: "Just now (Agent)",
    steps,
  };
};

const WorkflowsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [selectedId, setSelectedId] = useState<string>(initialWorkflows[0].id);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "agent",
      text:
        "Hi, I am your GTM workflow agent. Tell me what should happen, and I will draft an automation for Clay / HeyReach / SmartLead.",
    },
  ]);
  const [input, setInput] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [draggingStepId, setDraggingStepId] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const selectedWorkflow = useMemo(
    () => workflows.find((w) => w.id === selectedId) || null,
    [workflows, selectedId]
  );

  // --- Chat send handler ---
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const idBase = Date.now().toString();

    // Add user message
    const userMsg: ChatMessage = {
      id: `u-${idBase}`,
      role: "user",
      text: trimmed,
    };

    // Generate workflow from prompt (frontend heuristic)
    const newWorkflow = generateWorkflowFromPrompt(trimmed);

    // Agent confirmation message
    const agentMsg: ChatMessage = {
      id: `a-${idBase}`,
      role: "agent",
      text:
        "Got it. I created a draft workflow from your description. You can review and reorder the steps on the right.",
    };

    setChatMessages((prev) => [...prev, userMsg, agentMsg]);
    setWorkflows((prev) => [newWorkflow, ...prev]);
    setSelectedId(newWorkflow.id);
    setInput("");
    setLastAction("Draft created from prompt (frontend-only).");
  };

  // Manual new empty-ish workflow
  const handleNewWorkflow = () => {
    const idBase = Date.now().toString();
    const newWorkflow: Workflow = {
      id: `w-${idBase}`,
      name: "New GTM workflow",
      status: "Draft",
      audience: "Define audience segment…",
      description:
        "Describe your automation in the chat and the agent will refine this workflow.",
      primaryTool: "Clay + HeyReach + SmartLead",
      lastEdited: "Just now",
      steps: [
        {
          id: `${idBase}-s1`,
          type: "trigger",
          title: "When contact is enriched",
          tool: "Clay",
          description:
            "Record becomes enriched with firmographics and contact data.",
        },
        {
          id: `${idBase}-s2`,
          type: "action",
          title: "Enroll in outreach sequence",
          tool: "HeyReach / SmartLead",
          description:
            "Add contact to the primary outreach sequence for this segment.",
        },
      ],
    };

    setWorkflows((prev) => [newWorkflow, ...prev]);
    setSelectedId(newWorkflow.id);
    setLastAction("New empty workflow created.");
  };

  // --- Save / Run handlers (frontend-only) ---
  const handleSaveWorkflow = () => {
    if (!selectedWorkflow) return;

    const updated = workflows.map((w) =>
      w.id === selectedWorkflow.id
        ? { ...w, lastEdited: "Just now (saved)" }
        : w
    );

    setWorkflows(updated);
    setLastAction("Workflow saved (frontend-only).");
  };

const handleRunWorkflow = () => {
  if (!selectedWorkflow) return;

  setWorkflows((prev) =>
    prev.map((w) =>
      w.id === selectedWorkflow.id
        ? { ...w, status: "Active", lastEdited: "Just now (run)" }
        : w
    )
  );

  setLastAction(
    "Run triggered (mock) – connect orchestration/backend here later."
  );
};


  // Drag & drop handlers for steps
  const handleStepDragStart = (stepId: string) => {
    setDraggingStepId(stepId);
  };

  const handleStepDragEnd = () => {
    setDraggingStepId(null);
  };

  const handleStepDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetStepId: string
  ) => {
    e.preventDefault();
    if (!draggingStepId || !selectedWorkflow) return;
    if (draggingStepId === targetStepId) return;

    const updated = workflows.map((w) => {
      if (w.id !== selectedWorkflow.id) return w;

      const steps = [...w.steps];
      const fromIndex = steps.findIndex((s) => s.id === draggingStepId);
      const toIndex = steps.findIndex((s) => s.id === targetStepId);
      if (fromIndex === -1 || toIndex === -1) return w;

      const [moved] = steps.splice(fromIndex, 1);
      steps.splice(toIndex, 0, moved);
      return { ...w, steps };
    });

    setWorkflows(updated);
    setDraggingStepId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Workflow Agent
          </h1>
          <p className="text-sm text-slate-400">
            Chat with the agent on the left. Watch your GTM automation appear
            visually on the right.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800"
            onClick={() => setShowSaved((s) => !s)}
          >
            📁 Saved workflows
          </button>
          <button
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-50"
            onClick={handleNewWorkflow}
          >
            + New empty workflow
          </button>
        </div>
      </div>

      {/* Main split: left chat, right visual */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-[320px]">
        {/* LEFT: AI chat */}
        <div className="w-full lg:w-[40%] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[13px]">
                🤖
              </div>
              <div>
                <div className="text-slate-100 font-semibold">GTM Agent</div>
                <div className="text-slate-500">
                  Describe your workflow. I&apos;ll build it.
                </div>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-auto px-3 py-2 space-y-2 text-xs">
            {chatMessages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 leading-snug ${
                    m.role === "user"
                      ? "bg-indigo-600 text-slate-50"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-2 text-xs">
            <textarea
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 min-h-[60px] max-h-[120px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder='E.g. "When enrichment score > 80 in Clay, enroll in HeyReach. If no reply in 7 days move to SmartLead."'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="mt-1 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                I&apos;ll create a new draft workflow from your message.
              </div>
              <button
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[11px] text-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={input.trim().length < 5}
              >
                ✨ Generate workflow
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Visual workflow + saved list */}
        <div className="relative flex-1 flex flex-col gap-3">
          {/* Saved workflows panel */}
          {showSaved && (
            <div className="absolute right-0 top-0 z-10 w-full md:w-72 bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-300 font-semibold">
                  Saved workflows
                </div>
                <button
                  className="text-slate-500 hover:text-slate-200 text-[11px]"
                  onClick={() => setShowSaved(false)}
                >
                  Close
                </button>
              </div>
              <div className="max-h-64 overflow-auto space-y-1">
                {workflows.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setSelectedId(w.id);
                      setShowSaved(false);
                      setLastAction(null);
                    }}
                    className={`w-full text-left px-2 py-1 rounded-xl border text-[11px] ${
                      selectedWorkflow?.id === w.id
                        ? "bg-slate-900 border-slate-600 text-slate-100"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    <div className="font-semibold">{w.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {w.primaryTool}
                    </div>
                    <div className="text-[10px] text-slate-600">
                      Last edited: {w.lastEdited}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedWorkflow ? (
            <>
              {/* Workflow header */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-slate-400 uppercase text-[11px]">
                      Workflow
                    </div>
                    <div className="text-sm font-semibold text-slate-50">
                      {selectedWorkflow.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        badgeClassesByStatus[selectedWorkflow.status]
                      }`}
                    >
                      {selectedWorkflow.status}
                    </span>
                    <button
                      className="px-2 py-1 rounded-xl bg-slate-950 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
                      onClick={handleSaveWorkflow}
                    >
                      💾 Save
                    </button>
                    <button
                      className="px-2 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[11px] text-slate-50"
                      onClick={handleRunWorkflow}
                    >
                      ▶ Run
                    </button>
                  </div>
                </div>
                <div className="text-slate-400 mb-1">
                  {selectedWorkflow.description}
                </div>
                <div className="text-[11px] text-slate-500">
                  Primary tools: {selectedWorkflow.primaryTool} · Audience:{" "}
                  {selectedWorkflow.audience}
                </div>
              </div>

              {/* Visual flow */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex-1 text-xs overflow-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-slate-400 font-semibold">
                    Visual flow (drag steps to reorder)
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <span className="text-slate-500">
                      Frontend-only. Later you can persist & execute via your
                      backend.
                    </span>
                    {lastAction && (
                      <span className="text-emerald-400">{lastAction}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-stretch gap-4 min-w-[520px]">
                  {selectedWorkflow.steps.map((step, index) => {
                    const isCondition = step.type === "condition";
                    const isTrigger = step.type === "trigger";
                    const isAction = step.type === "action";
                    const isBranchYes = step.branch === "yes";
                    const isBranchNo = step.branch === "no";

                    let headerColor =
                      "bg-slate-800 text-slate-200 border border-slate-700";
                    if (isTrigger) {
                      headerColor =
                        "bg-indigo-900/70 text-indigo-100 border border-indigo-700";
                    } else if (isCondition) {
                      headerColor =
                        "bg-amber-900/70 text-amber-100 border border-amber-700";
                    } else if (isAction) {
                      headerColor =
                        "bg-emerald-900/70 text-emerald-100 border border-emerald-700";
                    }

                    const isDragging = draggingStepId === step.id;

                    return (
                      <div
                        key={step.id}
                        className={`flex-1 min-w-[180px] flex flex-col ${
                          isBranchYes || isBranchNo ? "mt-4" : ""
                        } ${
                          isDragging
                            ? "opacity-70 border border-dashed border-indigo-500"
                            : ""
                        }`}
                        draggable
                        onDragStart={() => handleStepDragStart(step.id)}
                        onDragEnd={handleStepDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleStepDrop(e, step.id)}
                      >
                        <div
                          className={`rounded-xl px-3 py-2 text-[11px] ${headerColor} cursor-move`}
                          title="Drag to reorder"
                        >
                          <div className="flex items-center justify-between">
                            <div className="uppercase tracking-wide">
                              {isTrigger
                                ? "Trigger"
                                : isCondition
                                ? "Condition"
                                : "Action"}
                              {isBranchYes && " · Yes branch"}
                              {isBranchNo && " · No branch"}
                            </div>
                            <span className="text-[10px] text-slate-300">
                              ☰
                            </span>
                          </div>
                          <div className="mt-1 text-[12px] font-semibold">
                            {step.title}
                          </div>
                          <div className="mt-1 text-slate-200">
                            Tool: {step.tool}
                          </div>
                        </div>
                        <div className="mt-1 text-slate-400 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 leading-snug">
                          {step.description}
                        </div>

                        {index < selectedWorkflow.steps.length - 1 && (
                          <div className="flex-1 flex items-center justify-center mt-2">
                            <div className="h-px w-10 bg-slate-700" />
                            <div className="text-slate-500 text-[11px] mx-1">
                              →
                            </div>
                            <div className="h-px w-10 bg-slate-700" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-2xl">
              Start by telling the agent what to automate on the left. I&apos;ll
              render the workflow here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowsPage;
