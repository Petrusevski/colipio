import React, { useMemo, useState } from "react";
import { Sequence } from "../types";

interface SequencesPageProps {
  sequences: Sequence[];
}

type ChannelFilter = "All" | "LinkedIn" | "Email" | "Call" | "Social";

const SequencesPage: React.FC<SequencesPageProps> = ({ sequences }) => {
  const [selectedId, setSelectedId] = useState<string>(sequences[0]?.id ?? "");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("All");
  const [search, setSearch] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [composerChannel, setComposerChannel] = useState<
    "LinkedIn" | "Email" | "Call" | "Social"
  >("LinkedIn");
  const [composerText, setComposerText] = useState("");
  const [composerInfo, setComposerInfo] = useState<string | null>(null);

  const filteredSequences = useMemo(
    () =>
      sequences.filter((seq) => {
        const matchesChannel =
          channelFilter === "All" ||
          seq.channelMix.includes(channelFilter as any);
        const lc = search.toLowerCase();
        const matchesText =
          !lc ||
          seq.name.toLowerCase().includes(lc) ||
          seq.audience.toLowerCase().includes(lc) ||
          seq.tags.some((t) => t.toLowerCase().includes(lc));
        return matchesChannel && matchesText;
      }),
    [sequences, channelFilter, search]
  );

  const selected =
    filteredSequences.find((s) => s.id === selectedId) ||
    filteredSequences[0] ||
    null;

  // Derived metrics across filtered sequences
  const totalLeads = filteredSequences.reduce((sum, s) => sum + s.leads, 0);
  const totalSent = filteredSequences.reduce((sum, s) => sum + s.sent, 0);
  const totalReplies = filteredSequences.reduce((sum, s) => sum + s.replies, 0);
  const totalMeetings = filteredSequences.reduce(
    (sum, s) => sum + s.meetings,
    0
  );
  const replyRate =
    totalSent > 0 ? Math.round((totalReplies / totalSent) * 100) : 0;
  const meetingRate =
    totalSent > 0 ? Math.round((totalMeetings / totalSent) * 100) : 0;

  // When sequence / channel changes, pick a sensible default template
  React.useEffect(() => {
    if (!selected) return;

    const templateForChannel =
      selected.templates.find((t) => t.channel === composerChannel) ||
      selected.templates[0] ||
      null;

    if (templateForChannel) {
      setSelectedTemplateId(templateForChannel.id);
      setComposerText(templateForChannel.snippet);
    } else {
      setSelectedTemplateId(null);
      setComposerText("");
    }
    setComposerInfo(null);
  }, [selectedId, composerChannel, selected]);

  const handleTemplateChange = (templateId: string) => {
    if (!selected) return;
    const tpl = selected.templates.find((t) => t.id === templateId);
    setSelectedTemplateId(templateId);
    setComposerText(tpl ? tpl.snippet : "");
    setComposerInfo(null);
  };

  const handleSendMock = () => {
    if (!selected) return;
    if (!composerText.trim()) {
      setComposerInfo("Add some content before sending.");
      return;
    }

    setComposerInfo(
      `Mock send: would send a ${composerChannel} touch for "${selected.name}". Backend integration comes later.`
    );
  };

  const channelPill = (label: ChannelFilter) => (
    <button
      key={label}
      onClick={() => setChannelFilter(label)}
      className={`px-3 py-1.5 rounded-full text-xs border ${
        channelFilter === label
          ? "bg-indigo-600 border-indigo-500 text-slate-50"
          : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );

  const channelIcon = (type: "LinkedIn" | "Email" | "Call" | "Social") => {
    if (type === "LinkedIn") return "🔗";
    if (type === "Email") return "✉️";
    if (type === "Call") return "📞";
    return "📣";
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header + metrics */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            Outreach & Sequences
          </h1>
          <p className="text-sm text-slate-400">
            Built-in outreach console with multi-channel tracking across
            LinkedIn, email, calls and social.
          </p>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Leads in view</div>
          <div className="text-lg font-semibold text-slate-50">
            {totalLeads}
          </div>
          <div className="text-[11px] text-slate-500">
            Across {filteredSequences.length} sequences
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Touches sent</div>
          <div className="text-lg font-semibold text-slate-50">
            {totalSent}
          </div>
          <div className="text-[11px] text-slate-500">
            All channels combined
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Reply rate</div>
          <div className="text-lg font-semibold text-slate-50">
            {replyRate}%
          </div>
          <div className="text-[11px] text-slate-500">
            {totalReplies} replies recorded
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-slate-400 mb-1">Meeting rate</div>
          <div className="text-lg font-semibold text-slate-50">
            {meetingRate}%
          </div>
          <div className="text-[11px] text-slate-500">
            {totalMeetings} meetings booked
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {channelPill("All")}
        {channelPill("LinkedIn")}
        {channelPill("Email")}
        {channelPill("Call")}
        {channelPill("Social")}
        <input
          type="text"
          placeholder="Search by name, audience, tag…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs min-w-[220px] focus:outline-none focus:ring-1 focus:ring-indigo-500 ml-auto"
        />
      </div>

      {/* Main layout: left list + right detail/console */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[280px]">
        {/* Left: sequences list */}
        <div className="w-full md:w-72 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Sequences</span>
            <span className="text-[11px] text-slate-500">
              {filteredSequences.length} shown
            </span>
          </div>
          <div className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/60">
            {filteredSequences.length === 0 ? (
              <div className="p-3 text-slate-500 italic">
                No sequences match your filters.
              </div>
            ) : (
              <ul className="divide-y divide-slate-800">
                {filteredSequences.map((seq) => (
                  <li
                    key={seq.id}
                    onClick={() => setSelectedId(seq.id)}
                    className={`p-3 cursor-pointer hover:bg-slate-900/80 ${
                      selected?.id === seq.id ? "bg-slate-900/80" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-slate-50">
                        {seq.name}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          seq.status === "Active"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                            : seq.status === "Paused"
                            ? "bg-amber-950 text-amber-300 border border-amber-700"
                            : "bg-slate-900 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {seq.status}
                      </span>
                    </div>
                    <div className="text-slate-400 mb-1">
                      {seq.audience}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        {seq.primaryChannel} · {seq.tools}
                      </span>
                      <span>{seq.leads} leads</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: detail + outreach console */}
        <div className="flex-1 flex flex-col gap-3 text-xs">
          {selected ? (
            <>
              {/* Sequence summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="text-slate-400 uppercase text-[11px]">
                      Sequence
                    </div>
                    <div className="text-sm font-semibold text-slate-50">
                      {selected.name}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 text-right">
                    <div>Owner: {selected.owner}</div>
                    <div>Last run: {selected.lastRun}</div>
                  </div>
                </div>
                <div className="text-slate-400 mb-1">
                  {selected.audience}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    {selected.leads} leads
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    {selected.sent} touches · {selected.replies} replies ·{" "}
                    {selected.meetings} meetings
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-slate-200">
                    Channels: {selected.channelMix.join(" · ")}
                  </span>
                </div>
              </div>

              {/* Channel stats + outreach console */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Channel stats */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
                  <div className="text-slate-400 font-semibold mb-1">
                    Channel performance
                  </div>
                  {selected.channels.map((ch) => {
                    const replyRate =
                      ch.sent > 0
                        ? Math.round((ch.replies / ch.sent) * 100)
                        : 0;
                    const meetingRate =
                      ch.sent > 0
                        ? Math.round((ch.meetings / ch.sent) * 100)
                        : 0;

                    return (
                      <div
                        key={ch.type}
                        className="bg-slate-950/60 border border-slate-800 rounded-xl p-2"
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <div className="flex items-center gap-1">
                            <span>{channelIcon(ch.type)}</span>
                            <span className="text-slate-100">
                              {ch.type}
                            </span>
                          </div>
                          <span className="text-slate-500">
                            {ch.sent} sent
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] mb-1">
                          <span className="text-slate-400">
                            {ch.replies} replies ({replyRate}%)
                          </span>
                          <span className="text-slate-400">
                            {ch.meetings} meetings ({meetingRate}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{
                              width: `${Math.min(replyRate, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-[11px] text-slate-500 mt-1">
                    Numbers are dummy. Later you can feed this from HeyReach /
                    SmartLead / your own events.
                  </div>
                </div>

                {/* Outreach timeline (multi-channel) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
                  <div className="text-slate-400 font-semibold mb-1">
                    Multi-channel timeline (mock)
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex gap-2">
                      <div className="w-10 text-slate-500">Now</div>
                      <div className="flex-1">
                        <div className="text-slate-200">
                          {channelIcon("LinkedIn")} LinkedIn DM sent to{" "}
                          <span className="text-indigo-300">3 leads</span>
                        </div>
                        <div className="text-slate-500">
                          Using template:{" "}
                          <span className="italic">
                            Loyalty SaaS cold opener
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 text-slate-500">2h ago</div>
                      <div className="flex-1">
                        <div className="text-slate-200">
                          {channelIcon("Email")} Email follow-up with case
                          studies
                        </div>
                        <div className="text-slate-500">
                          14 opens · 3 replies · 1 meeting booked
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 text-slate-500">Yesterday</div>
                      <div className="flex-1">
                        <div className="text-slate-200">
                          {channelIcon("Call")} Call block completed
                        </div>
                        <div className="text-slate-500">
                          8 calls · 3 conversations · 1 opportunity created
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-10 text-slate-500">2d ago</div>
                      <div className="flex-1">
                        <div className="text-slate-200">
                          {channelIcon("LinkedIn")} Profile views spike
                        </div>
                        <div className="text-slate-500">
                          22 profile views after content post linked in
                          sequence.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    This is only visual for now. Later you can plug in live
                    activity from your GTM tools.
                  </div>
                </div>

                {/* Outreach composer (multi-channel) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-slate-400 font-semibold">
                      Outreach composer
                    </div>
                    <div className="flex gap-1 text-[11px]">
                      {(["LinkedIn", "Email", "Call", "Social"] as const).map(
                        (ch) => (
                          <button
                            key={ch}
                            onClick={() =>
                              setComposerChannel(ch as typeof composerChannel)
                            }
                            className={`px-2 py-0.5 rounded-full border ${
                              composerChannel === ch
                                ? "bg-indigo-600 border-indigo-500 text-slate-50"
                                : "bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            {channelIcon(ch)} {ch}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Template selector */}
                  <div className="flex flex-col gap-1 text-[11px]">
                    <div className="text-slate-400">Template</div>
                    <select
                      className="bg-slate-950 border border-slate-700 rounded-xl px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={selectedTemplateId ?? ""}
                      onChange={(e) =>
                        handleTemplateChange(e.target.value || "")
                      }
                    >
                      {selected.templates.length === 0 && (
                        <option value="">No templates for this sequence</option>
                      )}
                      {selected.templates
                        .filter((t) => t.channel === composerChannel)
                        .map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      {selected.templates.filter(
                        (t) => t.channel === composerChannel
                      ).length === 0 &&
                        selected.templates.length > 0 && (
                          <option value="">
                            No {composerChannel} templates · showing nothing
                          </option>
                        )}
                    </select>
                  </div>

                  {/* Composer */}
                  <div className="flex-1 flex flex-col gap-1 text-[11px]">
                    <div className="text-slate-400">
                      {composerChannel === "Call"
                        ? "Call script / notes"
                        : "Message body (mock)"}
                    </div>
                    <textarea
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 min-h-[120px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={composerText}
                      onChange={(e) => setComposerText(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-[11px] text-slate-500">
                        This won&apos;t send anything yet – it&apos;s a
                        frontend-only console. Later you connect your GTM tools.
                      </div>
                      <button
                        onClick={handleSendMock}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[11px] text-slate-50"
                      >
                        Send ({composerChannel})
                      </button>
                    </div>
                    {composerInfo && (
                      <div className="mt-1 text-[11px] text-emerald-400">
                        {composerInfo}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-2xl">
              Select a sequence on the left to see multi-channel performance and
              outreach console.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SequencesPage;
