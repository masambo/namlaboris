import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchCaseSummaries, fetchComplianceAlerts } from "@/lib/ai";
import { AiSummaryCard } from "@/components/ui/ai-summary-card";
import { ComplianceAlertCard } from "@/components/ui/compliance-alert-card";
import { LiveAiTips } from "@/components/ui/live-ai-tips";
import { ExportButton } from "@/components/ui/export-button";
import { ReportTemplate } from "@/components/ui/report-template";
import { fetchWorkforceInsights, runComplianceAudit } from "@/lib/ai";
import { useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bot,
  BookOpen,
  Briefcase,
  Calendar,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Gavel,
  GraduationCap,
  Home,
  Loader2,
  LogOut,
  Scale,
  Search,
  ShieldCheck,
  User as UserIcon,
  TrendingUp,
  TrendingDown,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import namLaborisLogo from "@/assets/namlaboris-logo.jpg";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | NamLaboris" },
      { name: "description", content: "Your NamLaboris labour governance dashboard." },
    ],
  }),
  component: DashboardPage,
});

/* ─── Static data ─── */
const trendData = [
  { month: "Oct", value: 2100000 },
  { month: "Nov", value: 2800000 },
  { month: "Dec", value: 2400000 },
  { month: "Jan", value: 3100000 },
  { month: "Feb", value: 3800000 },
  { month: "Mar", value: 4700000 },
  { month: "Apr", value: 4200000 },
];

const caseload = [
  { type: "Disciplinary", count: 78, color: "#c0392b" },
  { type: "Arbitration",  count: 56, color: "#e67e22" },
  { type: "Grievance",    count: 42, color: "#27ae60" },
  { type: "Retrenchment",count: 23, color: "#2980b9" },
];

const hearings = [
  { name: "Smith vs. XYZ Ltd.", date: "Tomorrow · 10:00", tag: "DISCIPLINARY", tagColor: "bg-[var(--brand-gold)] text-white" },
  { name: "Nampower Arbitration", date: "Thu · 14:00", tag: "ARBITRATION", tagColor: "bg-orange-500 text-white" },
  { name: "Minister vs. Nakale", date: "Fri · 09:00", tag: "GRIEVANCE", tagColor: "bg-emerald-600 text-white" },
];



/* ─── Custom tooltip ─── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const val = (payload[0].value / 1000000).toFixed(1);
  return (
    <div className="rounded-xl border border-white/10 bg-[#1a2332] px-3 py-2 text-xs text-white shadow-lg">
      <p className="font-semibold">{label} · N$ {val}M</p>
    </div>
  );
}



/* ─── Stat Card ─── */
function StatCard({
  label, value, delta, deltaLabel, icon: Icon, positive,
}: {
  label: string; value: string; delta: string; deltaLabel: string;
  icon: React.ElementType; positive: boolean;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-panel)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">{label}</p>
          <p className="mt-1 font-display text-4xl font-bold text-[var(--brand-navy-deep)]">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
          <Icon className="size-5" />
        </span>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        {positive ? (
          <TrendingUp className="size-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="size-3.5 text-red-500" />
        )}
        <span className={`text-xs font-bold ${positive ? "text-emerald-600" : "text-red-500"}`}>{delta}</span>
        <span className="text-xs text-foreground/50">{deltaLabel}</span>
      </div>
    </div>
  );
}

/* ─── Page ─── */
function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");
  const [caseSummaries, setCaseSummaries] = useState([] as any[]);
  const [alerts, setAlerts] = useState([] as any[]);
  const [workforceInsights, setWorkforceInsights] = useState([] as any[]);
  const [complianceAudit, setComplianceAudit] = useState<any>(null);
  const [activeView, setActiveView] = useState<"Governance" | "Intelligence">("Governance");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  // Load AI data after auth resolved
  useEffect(() => {
    if (!loading && user) {
      fetchCaseSummaries().then(setCaseSummaries);
      fetchComplianceAlerts().then(setAlerts);
      fetchWorkforceInsights().then(setWorkforceInsights);
      runComplianceAudit().then(setComplianceAudit);
    }
  }, [loading, user]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" />
      </div>
    );
  }

  const name = (user.user_metadata?.full_name as string) || user.email || "Member";
  const firstName = name.split(" ")[0];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Topbar */}
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-white px-8 py-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground/45">Overview</p>
            <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-foreground/50 sm:inline">
              {new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </span>
            <button className="relative rounded-lg border border-border bg-white p-2 text-foreground/60 transition hover:text-foreground">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--brand-gold)]" />
            </button>
            <ExportButton reportRef={reportRef} />
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* View Toggles */}
          <div className="mb-6 flex items-center gap-6 border-b border-border">
            {(['Governance', 'Intelligence'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`pb-3 text-sm font-bold transition-all ${
                  activeView === v 
                    ? "border-b-2 border-[var(--brand-gold)] text-[var(--brand-navy-deep)]"
                    : "text-foreground/40 hover:text-foreground/60"
                }`}
              >
                {v} Overview
              </button>
            ))}
          </div>

          {activeView === "Governance" ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Stat cards */}
              <div className="grid gap-4 sm:grid-cols-4">
                <ComplianceAlertCard alerts={alerts} />
                <StatCard label="Active Cases" value="172" delta="+12" deltaLabel="this month" icon={ClipboardCheck} positive={true} />
                <StatCard label="Score" value="98%" delta="+7%" deltaLabel="this month" icon={ShieldCheck} positive={true} />
                <StatCard label="Hearings" value="24" delta="-3" deltaLabel="this month" icon={Gavel} positive={false} />
              </div>

              {/* Main Content Area */}
              <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                <div className="space-y-5">
                  {/* Area Chart */}
                  <div className="rounded-3xl border border-border bg-[#1e293b] p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40">Case Resolution Trend</p>
                        <p className="mt-1 font-display text-2xl font-bold text-[var(--brand-gold)]">N$ 4.7M recovered</p>
                      </div>
                      <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
                        {(["Weekly", "Monthly", "Yearly"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                              activeTab === t ? "bg-[var(--brand-gold)] text-white" : "text-white/40 hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b1a1a" stopOpacity={0.5} />
                              <stop offset="95%" stopColor="#8b1a1a" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false}
                            tickFormatter={(v) => `N$${(v / 1000000).toFixed(1)}M`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area type="monotone" dataKey="value" stroke="#8b1a1a" strokeWidth={2}
                            fill="url(#areaGrad)" dot={{ r: 3, fill: "#8b1a1a", stroke: "white", strokeWidth: 1.5 }}
                            activeDot={{ r: 5 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Upcoming Hearings */}
                  <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[var(--brand-navy-deep)]">Upcoming Hearings</h3>
                      <Link to="/calendar" className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-gold)] hover:underline">View Full Calendar</Link>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {hearings.map((h) => (
                        <div key={h.name} className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 transition hover:border-[var(--brand-gold)]/40">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[var(--brand-navy-deep)]">{h.name}</p>
                            <p className="text-[10px] text-foreground/40">{h.date}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wider ${h.tagColor}`}>
                            {h.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Caseload */}
                <div className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-bold text-[var(--brand-navy-deep)]">Live Caseload</p>
                    <span className="live-dot" />
                  </div>
                  <div className="flex-1 space-y-4">
                    {caseSummaries.slice(0, 3).map((cs) => (
                      <AiSummaryCard key={cs.caseId} caseId={cs.caseId} title={cs.title} summary={cs.summary} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm" className="w-full text-xs">
                      <Link to="/adr-cases">View All Cases</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 lg:grid-cols-[1fr_380px]">
              <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 text-white">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--brand-gold)]/20 text-[var(--brand-gold)]">
                      <Bot className="size-6" />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl">AI Legal Assistant</h2>
                      <p className="text-sm text-white/40">Namibian Labour Law Authority (Act 11 of 2007)</p>
                    </div>
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-white/70">
                    Ask any question regarding labour law, procedural fairness, or compliance. Our assistant is trained on the latest Namibian OLC precedents and legislative updates.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      "Dismissal procedures",
                      "Retrenchment checklist",
                      "Arbitration strategy",
                      "Contract templates",
                    ].map((s) => (
                      <button
                        key={s}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-xs font-semibold text-white/60 transition hover:border-[var(--brand-gold)] hover:bg-white/10 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <Button asChild size="lg" className="mt-8 w-full bg-[var(--brand-gold)] text-white hover:brightness-110">
                    <Link to="/assistant">Launch Full Assistant Interface</Link>
                  </Button>
                </div>

                <div className="rounded-3xl border border-border bg-white p-8">
                  <h3 className="font-display text-xl text-[var(--brand-navy-deep)]">Policy Builder</h3>
                  <p className="mt-2 text-sm text-foreground/50">Generate legally compliant workplace policies in seconds.</p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {[ 
                      { t: "Disciplinary Code", d: "Standard hearing procedures" },
                      { t: "Grievance Policy", d: "Conflict resolution steps" },
                    ].map((p) => (
                      <div key={p.t} className="rounded-2xl border border-border p-4 transition hover:border-[var(--brand-gold)]">
                        <p className="text-sm font-bold text-[var(--brand-navy-deep)]">{p.t}</p>
                        <p className="text-[10px] text-foreground/40">{p.d}</p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="mt-6 w-full">
                    <Link to="/policy-builder">Open Policy Builder</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <LiveAiTips />
                <div className="rounded-3xl border-2 border-dashed border-border p-8 text-center">
                  <Bot className="mx-auto size-8 text-foreground/20" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-foreground/40">More AI Tools Coming Soon</p>
                  <p className="mt-2 text-xs text-foreground/40">Advanced audit automation and ADR prediction engines are currently in training.</p>
                </div>
              </div>
            </div>
          ) }
        </main>
      {/* Hidden report for PDF export */}
      <div style={{ position: "absolute", left: "-9999px", top: 0, opacity: 1, pointerEvents: "none" }}>
        <ReportTemplate 
          ref={reportRef}
          cases={caseSummaries} 
          audit={complianceAudit} 
          insights={workforceInsights} 
        />
      </div>
    </div>
  );
}
