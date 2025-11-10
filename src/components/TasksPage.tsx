import React, { useMemo, useState } from "react";
import { Task } from "../types";

interface TasksPageProps {
  tasks: Task[];
}

type OwnerFilter = "All" | "Nikola" | "Ana";
type StatusFilter = "All" | Task["status"];
type TaskTypeFilter =
  | "All"
  | "Call"
  | "Email"
  | "Manual Step"
  | "Onboarding"
  | "Success"
  | "Renewal"
  | "Internal";

const priorityClasses: Record<Task["priority"], string> = {
  High: "bg-red-950 text-red-300 border border-red-700",
  Medium: "bg-amber-950 text-amber-300 border border-amber-700",
  Low: "bg-slate-900 text-slate-300 border border-slate-700",
};

const statusColumnTitles: { key: Task["status"]; label: string }[] = [
  { key: "Today", label: "Today" },
  { key: "Upcoming", label: "Upcoming" },
  { key: "Overdue", label: "Overdue" },
  { key: "Done", label: "Done" },
];

const TasksPage: React.FC<TasksPageProps> = ({ tasks }) => {
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [typeFilter, setTypeFilter] = useState<TaskTypeFilter>("All");
  const [dealOnly, setDealOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    tasks[0]?.id ?? null
  );

  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) => {
        if (ownerFilter !== "All" && t.owner !== ownerFilter) return false;
        if (statusFilter !== "All" && t.status !== statusFilter) return false;
        if (typeFilter !== "All" && t.type !== typeFilter) return false;
        if (dealOnly && t.entityType !== "Deal") return false;
        return true;
      }),
    [tasks, ownerFilter, statusFilter, typeFilter, dealOnly]
  );

  const tasksByStatus = useMemo(() => {
    const map: Record<Task["status"], Task[]> = {
      Today: [],
      Upcoming: [],
      Overdue: [],
      Done: [],
    };
    filteredTasks.forEach((t) => map[t.status].push(t));
    return map;
  }, [filteredTasks]);

  const selectedTask =
    filteredTasks.find((t) => t.id === selectedId) ?? filteredTasks[0] ?? null;

  const dependencies = useMemo(() => {
    if (!selectedTask) return [];
    const ids = selectedTask.dependsOnIds ?? [];
    return tasks.filter((t) => ids.includes(t.id));
  }, [selectedTask, tasks]);

  const dependents = useMemo(() => {
    if (!selectedTask) return [];
    return tasks.filter((t) => t.dependsOnIds?.includes(selectedTask.id));
  }, [selectedTask, tasks]);

  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs border ${
      active
        ? "bg-indigo-600 border-indigo-500 text-slate-50"
        : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
    }`;

  const formatEntity = (t: Task) =>
    `${t.entityType === "Deal" ? "Deal" : t.entityType}: ${t.entityName}`;

  const totalToday = tasks.filter((t) => t.status === "Today").length;
  const totalUpcoming = tasks.filter((t) => t.status === "Upcoming").length;
  const totalOverdue = tasks.filter((t) => t.status === "Overdue").length;
  const totalDealTasks = tasks.filter((t) => t.entityType === "Deal").length;

  return (
    <div className="flex flex-col gap-4 h-full text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Tasks & Projects on Deals
          </h1>
          <p className="text-sm text-slate-400">
            Onboarding, success and renewal tasks layered directly on deals.
            Priorities, tags and dependencies included.
          </p>
        </div>
      </div>

      {/* Top summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Today</div>
          <div className="text-lg font-semibold text-slate-50">
            {totalToday}
          </div>
          <div className="text-[11px] text-slate-500">
            Tasks due today across all roles.
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Upcoming</div>
          <div className="text-lg font-semibold text-slate-50">
            {totalUpcoming}
          </div>
          <div className="text-[11px] text-slate-500">
            Prepare onboarding, success and renewal motions.
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Overdue</div>
          <div className="text-lg font-semibold text-red-300">
            {totalOverdue}
          </div>
          <div className="text-[11px] text-slate-500">
            Follow up and unblock dependencies.
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Deal-linked tasks</div>
          <div className="text-lg font-semibold text-slate-50">
            {totalDealTasks}
          </div>
          <div className="text-[11px] text-slate-500">
            On-deal tasks for onboarding, success and renewal.
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-slate-400 mr-1">Owner:</span>
        {(["All", "Nikola", "Ana"] as OwnerFilter[]).map((o) => (
          <button
            key={o}
            className={pill(ownerFilter === o)}
            onClick={() => setOwnerFilter(o)}
          >
            {o}
          </button>
        ))}

        <span className="text-slate-400 ml-4 mr-1">Status:</span>
        {(["All", "Today", "Upcoming", "Overdue", "Done"] as StatusFilter[]).map(
          (s) => (
            <button
              key={s}
              className={pill(statusFilter === s)}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          )
        )}

        <span className="text-slate-400 ml-4 mr-1">Type:</span>
        {(
          [
            "All",
            "Call",
            "Email",
            "Manual Step",
            "Onboarding",
            "Success",
            "Renewal",
            "Internal",
          ] as TaskTypeFilter[]
        ).map((t) => (
          <button
            key={t}
            className={pill(typeFilter === t)}
            onClick={() => setTypeFilter(t)}
          >
            {t}
          </button>
        ))}

        <label className="ml-auto flex items-center gap-2 text-[11px] text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            className="rounded border-slate-600 bg-slate-900"
            checked={dealOnly}
            onChange={(e) => setDealOnly(e.target.checked)}
          />
          Show only tasks on deals
        </label>
      </div>

      {/* Main layout: board + detail panel */}
      <div className="flex-1 flex flex-col xl:flex-row gap-4 min-h-[280px]">
        {/* Board */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {statusColumnTitles.map(({ key, label }) => {
            const columnTasks = tasksByStatus[key];
            return (
              <div
                key={key}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-slate-400 font-semibold">
                    {label}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {columnTasks.length} task
                    {columnTasks.length === 1 ? "" : "s"}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2 overflow-auto">
                  {columnTasks.length === 0 ? (
                    <div className="text-[11px] text-slate-500 italic">
                      Nothing in this column (with filters).
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => setSelectedId(task.id)}
                        className={`w-full text-left rounded-xl border px-2 py-2 text-[11px] ${
                          selectedTask?.id === task.id
                            ? "border-indigo-500 bg-slate-950"
                            : "border-slate-800 bg-slate-950/60 hover:bg-slate-900/80"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-100">
                            {task.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] ${priorityClasses[task.priority]}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <div className="text-slate-400">
                          {formatEntity(task)}
                        </div>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          <span className="text-slate-500">
                            {task.type}
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-500">
                            Owner: {task.owner}
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-500">
                            {task.due}
                          </span>
                        </div>
                        {task.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {task.dependsOnIds && task.dependsOnIds.length > 0 && (
                          <div className="mt-1 text-[10px] text-amber-300">
                            ⏳ Waiting on {task.dependsOnIds.length} task
                            {task.dependsOnIds.length === 1 ? "" : "s"}
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="w-full xl:w-80 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col">
          {selectedTask ? (
            <>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-slate-400 uppercase text-[11px]">
                    Task
                  </div>
                  <div className="text-sm font-semibold text-slate-50">
                    {selectedTask.title}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${priorityClasses[selectedTask.priority]}`}
                >
                  {selectedTask.priority}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {formatEntity(selectedTask)}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                Type:{" "}
                <span className="text-slate-200">
                  {selectedTask.type}
                </span>{" "}
                · Owner:{" "}
                <span className="text-slate-200">
                  {selectedTask.owner}
                </span>{" "}
                · Status:{" "}
                <span className="text-slate-200">
                  {selectedTask.status}
                </span>{" "}
                · Due:{" "}
                <span className="text-slate-200">{selectedTask.due}</span>
              </div>

              {selectedTask.tags.length > 0 && (
                <div className="mt-2">
                  <div className="text-[11px] text-slate-400 mb-1">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedTask.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[11px] text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dependencies */}
              <div className="mt-3 space-y-2">
                <div className="text-[11px] text-slate-400 font-semibold">
                  Dependencies
                </div>
                {dependencies.length === 0 ? (
                  <div className="text-[11px] text-slate-500 italic">
                    No dependencies. This task can be executed independently.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {dependencies.map((t) => (
                      <div
                        key={t.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 text-[11px] bg-slate-950/80"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-slate-200">
                            {t.title}
                          </span>
                          <span className="text-slate-500">
                            {t.status}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          {formatEntity(t)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dependents */}
              <div className="mt-3 space-y-2">
                <div className="text-[11px] text-slate-400 font-semibold">
                  Unblocks
                </div>
                {dependents.length === 0 ? (
                  <div className="text-[11px] text-slate-500 italic">
                    No other tasks depend on this one yet.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {dependents.map((t) => (
                      <div
                        key={t.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 text-[11px] bg-slate-950/80"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-slate-200">
                            {t.title}
                          </span>
                          <span className="text-slate-500">
                            {t.status}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          {formatEntity(t)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 text-[11px] text-slate-500">
                This panel is frontend-only. Later, you can:
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Attach tasks directly to deals and subscriptions.</li>
                  <li>Auto-generate onboarding/renewal projects per deal.</li>
                  <li>Sync completion back to your main CRM or billing.</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[11px] text-slate-500">
              No tasks match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
