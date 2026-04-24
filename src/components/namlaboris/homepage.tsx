import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  Briefcase,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileSearch,
  Gavel,
  GraduationCap,
  Landmark,
  LibraryBig,
  PlayCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Star,
  Bell,
  Calendar,
  Download,
  Search,
  Settings,
  LayoutDashboard,
  FolderOpen,
  BookOpen,
} from "lucide-react";

import namLaborisLogo from "@/assets/namlaboris-logo.png";
import supremeCourtImg from "@/assets/supreme-court.jpg";
import robotImg from "@/assets/namlaboris-robot.png";
import logoSadc from "@/assets/logo-sadc.png";
import logoNef from "@/assets/logo-nef.png";
import logoIlo from "@/assets/logo-ilo.png";
import logoLawSociety from "@/assets/logo-lawsociety.jpeg";
import logoNamibiaCoat from "@/assets/logo-namibia-coat.png";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Home", href: "#top", active: true },
  { label: "ADR Cases", href: "#modules" },
  { label: "Compliance", href: "#compliance" },
  { label: "Training", href: "#training" },
  { label: "Pricing", href: "#pricing" },
];

const heroStats = [
  { value: "12K+", label: "Cases Resolved" },
  { value: "98%", label: "Compliance Score" },
  { value: "16", label: "SADC Jurisdictions" },
];

const quickActions = [
  { title: "File a Dispute", subtitle: "Start a Case", icon: Gavel, accent: "gold" },
  { title: "Get Legal Advice", subtitle: "Ask an Expert", icon: Bot, accent: "copper" },
  { title: "Compliance Check", subtitle: "Audit Your Policies", icon: ShieldCheck, accent: "mint" },
];

const platformModules = [
  { title: "AI Legal Assistant", desc: "Structured labour-law reasoning for disciplinary, grievance, and arbitration prep.", icon: Bot, tag: "AI Powered" },
  { title: "ADR Case Management", desc: "Cross-jurisdiction case research from Namibia and the wider SADC labour ecosystem.", icon: Scale, tag: "Live Tracker" },
  { title: "Compliance Suite", desc: "HR audits, contract review, policy alignment, and risk-based remediation guidance.", icon: ShieldCheck, tag: "Real-time" },
  { title: "Policy Builder", desc: "Generate compliant workplace policies aligned with labour-governance standards.", icon: LibraryBig, tag: "Templates" },
  { title: "Training Hub", desc: "Online, webinar, and in-house programs for hearings, discipline & grievance practice.", icon: GraduationCap, tag: "Accredited" },
  { title: "Workforce Analytics", desc: "Dispute trends, risk indexes, and workforce stability signals for better decisions.", icon: ChartNoAxesCombined, tag: "Insights" },
];

const trainingCourses = [
  "Chairing & Initiating Disciplinary Hearings",
  "Cross Examination Skills in Hearings",
  "Managing Workplace Discipline",
  "Conducting Arbitrations at OLC",
  "Managing Workplace Grievances",
  "Retrenchments & Business Transfers",
];

const knowledgeResources = [
  { label: "Labour Act Interpretation Guides", icon: Landmark },
  { label: "Arbitration Awards Library", icon: Gavel },
  { label: "Labour Court Decisions", icon: Scale },
  { label: "SADC Comparative Research", icon: FileSearch },
  { label: "ILO Labour Standards", icon: ShieldCheck },
  { label: "HR Governance Research", icon: Briefcase },
];

const membershipPlans = [
  { name: "Corporate", audience: "Employers & Companies", fee: "N$2,850", per: "/month", features: ["Case management dashboard", "Policy builder access", "Quarterly compliance audit", "5 user seats"], featured: false },
  { name: "Professional", audience: "HR Practitioners & Consultants", fee: "N$3,650", per: "/month", features: ["Everything in Corporate", "AI Legal Assistant", "Training Hub access", "ADR case research", "10 user seats"], featured: true },
  { name: "Institutional", audience: "Universities & Government", fee: "N$5,500", per: "/month", features: ["Everything in Professional", "Workforce analytics", "API access", "Custom integrations", "Unlimited seats"], featured: false },
];

const partners: { name: string; logo: string }[] = [
  { name: "Government of Namibia", logo: logoNamibiaCoat },
  { name: "SADC", logo: logoSadc },
  { name: "ILO", logo: logoIlo },
  { name: "Namibian Employers Federation", logo: logoNef },
  { name: "Law Society of Namibia", logo: logoLawSociety },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" } }),
};

function HeroSection() {
  return (
    <div className="section-wrap relative pt-14 pb-20 lg:pt-20 lg:pb-24">
      {/* Centered headline block (Cravo-style) */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/10 px-3.5 py-1.5 text-xs font-semibold text-[var(--brand-gold-soft)] backdrop-blur-md">
            <Star className="size-3.5 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
            Trusted by 1,200+ HR & Legal Teams across SADC
          </span>
        </motion.div>

        <motion.h1
          initial="hidden" animate="show" variants={fadeUp} custom={1}
          className="mt-7 font-display text-[2.6rem] leading-[1.05] text-foreground sm:text-6xl lg:text-[5rem]"
        >
          Master Labour Law. <br className="hidden sm:block" />
          <span className="gold-text">Govern</span> Your Workforce.
        </motion.h1>

        <motion.p
          initial="hidden" animate="show" variants={fadeUp} custom={2}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
        >
          With NamLaboris, turn complex labour regulation into clear action. Manage disputes, run compliance audits,
          and access AI legal reasoning — built for employers, HR practitioners, and institutions across Namibia & SADC.
        </motion.p>

        <motion.div
          initial="hidden" animate="show" variants={fadeUp} custom={3}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="gold" size="xl">Try for free <ArrowRight className="size-4" /></Button>
          <Button variant="glass" size="xl"><PlayCircle className="size-4" /> Watch demo</Button>
        </motion.div>

        <motion.div
          initial="hidden" animate="show" variants={fadeUp} custom={4}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#" className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md transition-all hover:border-[var(--brand-gold)]/40 hover:bg-white/[0.08]">
            <svg viewBox="0 0 24 24" className="size-5 fill-foreground" aria-hidden><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
            <div className="text-left leading-tight">
              <p className="text-[0.55rem] uppercase tracking-wider text-foreground/60">Download on the</p>
              <p className="text-sm font-semibold text-foreground">App Store</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md transition-all hover:border-[var(--brand-gold)]/40 hover:bg-white/[0.08]">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M3.6 1.7a2 2 0 0 0-1 1.7v17.2c0 .7.4 1.3 1 1.7L13 12 3.6 1.7z" fill="#34A853"/>
              <path d="M16.8 8.6L13.7 12l3.1 3.4 4.2-2.4c1.3-.7 1.3-2.6 0-3.3l-4.2-2.4z" fill="#FBBC04"/>
              <path d="M3.6 22.3l9.4-10.3-2.5-2.7-7 8.7c-.1 1.7.7 4 .1 4.3z" fill="#EA4335"/>
              <path d="M3.6 1.7l10.1 11.1 3.1-3.4L4.6.7c-.4-.2-.7 0-1 1z" fill="#4285F4"/>
            </svg>
            <div className="text-left leading-tight">
              <p className="text-[0.55rem] uppercase tracking-wider text-foreground/60">Get it on</p>
              <p className="text-sm font-semibold text-foreground">Google Play</p>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Glow halo behind window */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] -z-0 h-[420px] w-[80%] -translate-x-1/2 rounded-full bg-[var(--brand-gold)]/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-[62%] -z-0 h-[280px] w-[60%] -translate-x-1/2 rounded-full bg-[var(--brand-copper)]/15 blur-[100px]" />

      {/* App window mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mt-16 w-full max-w-6xl"
      >
        <AppWindow />

        {/* Floating mini cards */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="absolute -left-4 top-32 hidden lg:block"
        >
          <div className="glass-card-strong floating-card flex items-center gap-3 !p-4" style={{ animationDelay: "1s" }}>
            <div className="icon-chip h-10 w-10"><TrendingUp className="size-4" /></div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.14em] text-foreground/60">Resolution Rate</p>
              <p className="font-display text-xl font-semibold gold-text">+24%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="absolute -right-4 bottom-24 hidden lg:block"
        >
          <div className="glass-card floating-card flex items-center gap-3 !p-4" style={{ animationDelay: "2s" }}>
            <div className="icon-chip-mint icon-chip h-10 w-10"><Bot className="size-4" /></div>
            <div>
              <p className="text-xs font-semibold text-foreground">AI Assistant</p>
              <p className="text-[0.65rem] text-foreground/60">Drafting brief…</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AppWindow() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[oklch(0.22_0.05_252)] to-[oklch(0.14_0.04_252)] shadow-[0_60px_120px_-40px_oklch(0_0_0_/_0.7),0_0_0_1px_oklch(1_0_0_/_0.06)_inset]"
    >
      {/* macOS-style title bar */}
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[0.65rem] text-foreground/50">
          <span className="size-1.5 rounded-full bg-[var(--brand-gold)]" />
          app.namlaboris.com / dashboard
        </div>
        <div className="flex items-center gap-2 text-foreground/40">
          <Search className="size-3.5" />
          <Settings className="size-3.5" />
        </div>
      </div>

      {/* App body */}
      <div className="grid grid-cols-12 min-h-[480px]">
        {/* Sidebar */}
        <aside className="col-span-3 hidden border-r border-white/8 bg-white/[0.02] p-4 lg:block">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-foreground/50">
            <Search className="size-3.5" /> Search cases…
            <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5 text-[0.55rem]">⌘F</span>
          </div>
          <p className="mt-5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-foreground/40">Workspace</p>
          <nav className="mt-2 space-y-1 text-sm">
            {[
              { label: "Dashboard", icon: LayoutDashboard, active: true },
              { label: "ADR Cases", icon: Gavel },
              { label: "Compliance", icon: ShieldCheck },
              { label: "AI Assistant", icon: Bot },
              { label: "Policy Builder", icon: LibraryBig },
              { label: "Calendar", icon: Calendar },
            ].map((it) => {
              const Icon = it.icon;
              return (
                <div
                  key={it.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors ${
                    it.active
                      ? "bg-[var(--brand-gold)]/15 text-[var(--brand-gold-soft)] border border-[var(--brand-gold)]/25"
                      : "text-foreground/65 hover:bg-white/5"
                  }`}
                >
                  <Icon className="size-4" />
                  {it.label}
                </div>
              );
            })}
          </nav>
          <p className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-foreground/40">Knowledge</p>
          <nav className="mt-2 space-y-1 text-sm">
            {[
              { label: "Training Hub", icon: GraduationCap },
              { label: "Research", icon: BookOpen },
              { label: "Documents", icon: FolderOpen },
            ].map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.label} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-foreground/65 hover:bg-white/5">
                  <Icon className="size-4" /> {it.label}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <section className="col-span-12 lg:col-span-9 p-5 sm:p-6">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-foreground/45">Overview</p>
              <h3 className="font-display text-xl font-semibold text-foreground">Dashboard</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[0.7rem] text-foreground/65">
                <Calendar className="size-3.5" /> Mon, 6 Apr 2026
              </span>
              <Button variant="gold" size="sm"><Download className="size-3.5" /> Export</Button>
              <span className="relative inline-flex size-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-foreground/65">
                <Bell className="size-3.5" />
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[var(--brand-copper)]" />
              </span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Active Cases", value: "172", delta: "+12", icon: Gavel, up: true },
              { label: "Compliance Score", value: "98%", delta: "+7%", icon: ShieldCheck, up: true },
              { label: "Hearings Booked", value: "24", delta: "-3", icon: Scale, up: false },
            ].map((k) => {
              const Icon = k.icon;
              return (
                <div key={k.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider text-foreground/55">{k.label}</p>
                      <p className="mt-1 font-display text-2xl font-semibold text-foreground">{k.value}</p>
                    </div>
                    <span className="icon-chip h-9 w-9"><Icon className="size-4" /></span>
                  </div>
                  <p className={`mt-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[0.65rem] font-semibold ${k.up ? "bg-[oklch(0.78_0.18_145_/_0.15)] text-[oklch(0.85_0.18_145)]" : "bg-[var(--brand-copper)]/15 text-[oklch(0.85_0.13_35)]"}`}>
                    {k.up ? "↗" : "↘"} {k.delta} <span className="ml-1 text-foreground/45 font-normal">this month</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Chart + side widget */}
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-foreground/55">Case Resolution Trend</p>
                  <p className="mt-1 font-display text-xl font-semibold gold-text">N$ 4.7M recovered</p>
                </div>
                <div className="flex gap-1 rounded-md border border-white/10 bg-white/[0.04] p-0.5 text-[0.65rem]">
                  {["Weekly", "Monthly", "Yearly"].map((t, i) => (
                    <span key={t} className={`rounded px-2 py-1 ${i === 1 ? "bg-[var(--brand-gold)]/20 text-[var(--brand-gold-soft)]" : "text-foreground/55"}`}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Animated SVG chart */}
              <div className="relative mt-4 h-44">
                <svg viewBox="0 0 400 160" className="h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.16 86)" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="oklch(0.82 0.16 86)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="oklch(0.88 0.14 92)" />
                      <stop offset="100%" stopColor="oklch(0.7 0.16 32)" />
                    </linearGradient>
                  </defs>
                  {[30, 60, 90, 120].map((y) => (
                    <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="oklch(1 0 0 / 0.05)" strokeDasharray="3 4" />
                  ))}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 1.6, ease: "easeInOut" }}
                    d="M0,110 C40,90 60,60 90,70 C120,80 140,40 180,50 C220,60 240,30 280,38 C320,46 340,80 380,55 L400,50"
                    fill="none"
                    stroke="url(#chartLine)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                    d="M0,110 C40,90 60,60 90,70 C120,80 140,40 180,50 C220,60 240,30 280,38 C320,46 340,80 380,55 L400,50 L400,160 L0,160 Z"
                    fill="url(#chartFill)"
                  />
                  <motion.circle
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.4 }}
                    cx="280" cy="38" r="5" fill="oklch(0.88 0.14 92)" stroke="oklch(0.16 0.04 252)" strokeWidth="2"
                  />
                </svg>
                <div className="absolute left-[68%] top-2 rounded-lg border border-[var(--brand-gold)]/40 bg-[var(--background)] px-2 py-1 text-[0.6rem] font-semibold text-[var(--brand-gold-soft)]">
                  Mar • N$ 980K
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[0.6rem] text-foreground/45">
                {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* Live cases widget */}
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[0.65rem] uppercase tracking-wider text-foreground/55">Live Caseload</p>
                <span className="inline-flex items-center gap-1 text-[0.6rem] font-semibold text-[oklch(0.85_0.18_145)]">
                  <span className="live-dot" /> LIVE
                </span>
              </div>
              <div className="mt-4 space-y-3.5">
                {[
                  { l: "Disciplinary", v: 78, color: "var(--gradient-gold)" },
                  { l: "Arbitration", v: 56, color: "var(--gradient-copper)" },
                  { l: "Grievance", v: 42, color: "linear-gradient(135deg, oklch(0.78 0.14 165), oklch(0.62 0.14 200))" },
                  { l: "Retrenchment", v: 23, color: "linear-gradient(135deg, oklch(0.7 0.14 280), oklch(0.55 0.16 260))" },
                ].map((s, i) => (
                  <div key={s.l}>
                    <div className="flex justify-between text-[0.7rem]">
                      <span className="text-foreground/70">{s.l}</span>
                      <span className="text-foreground/55">{s.v} cases</span>
                    </div>
                    <div className="stat-bar mt-1.5">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${s.v}%` }}
                        transition={{ delay: 1.2 + i * 0.15, duration: 1, ease: "easeOut" }}
                        style={{ background: s.color, display: "block", height: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--brand-gold)]/25 bg-[var(--brand-gold)]/8 p-2.5">
                <Bot className="size-4 text-[var(--brand-gold-soft)]" />
                <p className="text-[0.65rem] text-foreground/75"><span className="font-semibold text-foreground">AI tip:</span> 3 cases need urgent review</p>
              </div>
            </div>
          </div>

          {/* Bottom row: hearings + AI */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[0.65rem] uppercase tracking-wider text-foreground/55">Upcoming Hearings</p>
                <Clock className="size-3.5 text-foreground/40" />
              </div>
              <div className="mt-3 space-y-2.5">
                {[
                  { c: "Smith vs. XYZ Ltd.", t: "Tomorrow • 10:00", tag: "Disciplinary" },
                  { c: "Nampower Arbitration", t: "Thu • 14:00", tag: "Arbitration" },
                  { c: "Kavango Grievance", t: "Fri • 09:30", tag: "Grievance" },
                ].map((h) => (
                  <div key={h.c} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{h.c}</p>
                      <p className="text-[0.65rem] text-foreground/55">{h.t}</p>
                    </div>
                    <span className="rounded-full border border-[var(--brand-gold)]/25 bg-[var(--brand-gold)]/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-[var(--brand-gold-soft)]">
                      {h.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--brand-gold)]/25 bg-gradient-to-br from-[var(--brand-gold)]/10 to-[var(--brand-copper)]/5 p-4">
              <div className="flex items-center gap-2">
                <span className="icon-chip h-8 w-8"><Bot className="size-4" /></span>
                <div>
                  <p className="text-xs font-semibold text-foreground">AI Legal Assistant</p>
                  <p className="text-[0.6rem] text-foreground/55">Section 33 • Labour Act, 2007</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-white/8 bg-[var(--background)]/40 p-3 text-xs leading-relaxed text-foreground/75">
                <span className="shimmer-text">Drafting reply: dismissal must follow a fair procedure including the right to be heard, with reasonable notice…</span>
                <span className="ml-0.5 inline-block h-3 w-1 translate-y-0.5 bg-[var(--brand-gold)]" style={{ animation: "blink 1s steps(2) infinite" }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Cite case law", "Draft warning", "Summarise"].map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.6rem] text-foreground/70">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function NamLaborisHomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-orb" style={{ top: "-120px", left: "-80px", width: "420px", height: "420px", background: "var(--brand-gold)" }} />
      <div className="glow-orb" style={{ top: "10%", right: "-100px", width: "380px", height: "380px", background: "var(--brand-copper)", opacity: 0.35 }} />
      <div className="glow-orb" style={{ top: "60%", left: "30%", width: "500px", height: "500px", background: "oklch(0.62 0.14 220)", opacity: 0.25 }} />

      {/* NAV */}
      <header className="relative z-30 border-b border-white/5 backdrop-blur-xl">
        <div className="section-wrap flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={namLaborisLogo} alt="NamLaboris logo" className="h-10 w-10 rounded-lg object-cover" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[var(--brand-gold)] ring-2 ring-[var(--background)]" />
            </div>
            <div>
              <p className="font-display text-base font-bold leading-none text-foreground">NamLaboris</p>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-foreground/50">Labour Intelligence</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <a key={item.label} href={item.href} className={`nav-link ${item.active ? "active" : ""}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" className="hidden sm:inline-flex">Login</Button>
            <Button variant="gold" size="sm">Register <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative grid-bg overflow-hidden">
        {/* Supreme Court backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={supremeCourtImg}
            alt="Supreme Court of Namibia"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.04_252)]/70 via-[oklch(0.16_0.04_252)]/75 to-[oklch(0.13_0.04_252)]/95" />
        </div>

        {/* Robot mascot — integrated right side */}
        <motion.img
          src={robotImg}
          alt="NamLaboris AI legal assistant"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-4%] top-[8%] z-0 hidden h-[85%] w-auto object-contain opacity-95 drop-shadow-[0_40px_80px_oklch(0.82_0.16_86_/_0.4)] xl:block"
          style={{ maskImage: "linear-gradient(to left, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)" }}
        />

        <HeroSection />

        {/* Partners marquee */}
        <div className="relative border-y border-white/10 bg-white/[0.04] py-8 backdrop-blur-md">
          <div className="overflow-hidden">
            <div className="marquee items-center gap-16 whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM MODULES */}
      <section id="modules" className="relative py-24">
        <div className="section-wrap">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="brand-pill"><Zap className="size-3" /> Core Platform</span>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Operational tools built for{" "}
              <span className="gold-text">labour governance.</span>
            </h2>
            <p className="mt-4 text-foreground/65">Six interconnected modules covering the full workflow — from intake to award.</p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platformModules.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.article
                  key={m.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="feature-tile"
                >
                  <div className="flex items-start justify-between">
                    <div className="icon-chip"><Icon className="size-5" /></div>
                    <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--brand-gold-soft)]">{m.tag}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-foreground">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">{m.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-gold-soft)]">
                    Explore module <ChevronRight className="size-3.5" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE / DASHBOARD */}
      <section id="compliance" className="relative py-24">
        <div className="section-wrap">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="brand-pill"><ShieldCheck className="size-3" /> Compliance Suite</span>
              <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
                A working layer for{" "}
                <span className="gold-text">legal alignment</span> & risk control.
              </h2>
              <p className="mt-5 text-foreground/65">
                Continuous compliance scoring, HR governance maturity tracking, automated policy checks, and guided investigation workflows. Built around real procedures — not marketing demos.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "HR Compliance Audit",
                  "Employment Contract Review",
                  "Policy Compliance Check",
                  "Disciplinary Process Builder",
                  "Employment Equity",
                  "Investigation Workflow",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <CheckCircle2 className="size-4 text-[var(--brand-gold)]" />
                    <span className="text-sm text-foreground/85">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Button variant="gold" size="lg">Start Free Audit</Button>
                <Button variant="glass" size="lg">View Sample Report</Button>
              </div>
            </motion.div>

            {/* Live dashboard mock */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass-card-strong overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="live-dot" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">Live Compliance Score</span>
                  </div>
                  <span className="text-xs text-foreground/50">Updated just now</span>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="font-display text-6xl font-semibold gold-text">94</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-foreground/55">/ 100 score</p>
                  </div>
                  <div className="rounded-full border border-[oklch(0.78_0.18_145_/_0.4)] bg-[oklch(0.78_0.18_145_/_0.1)] px-3 py-1 text-xs font-semibold text-[oklch(0.85_0.15_145)]">
                    +6 this week
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  {[
                    { l: "Employment Contracts", v: 98 },
                    { l: "Disciplinary Records", v: 91 },
                    { l: "Equity & Diversity", v: 88 },
                    { l: "Policy Coverage", v: 96 },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="flex justify-between text-xs">
                        <span className="text-foreground/70">{s.l}</span>
                        <span className="font-semibold text-foreground">{s.v}%</span>
                      </div>
                      <div className="stat-bar mt-1.5"><span style={{ width: `${s.v}%` }} /></div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {[
                    { l: "Active Cases", v: "78", c: "icon-chip" },
                    { l: "Hearings", v: "12", c: "icon-chip-copper icon-chip" },
                    { l: "Resolved", v: "92%", c: "icon-chip-mint icon-chip" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="font-display text-2xl font-semibold text-foreground">{m.v}</p>
                      <p className="text-[0.6rem] uppercase tracking-[0.14em] text-foreground/55">{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="floating-card absolute -bottom-6 -left-6 hidden md:block"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="glass-card flex items-center gap-3 !p-4">
                  <div className="icon-chip h-10 w-10"><Users className="size-4" /></div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">23 members online</p>
                    <p className="text-[0.65rem] text-foreground/60">3 active hearings</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section id="training" className="relative py-24">
        <div className="section-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="brand-pill"><GraduationCap className="size-3" /> Training Hub</span>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Programs built for <span className="gold-text">applied capability.</span>
            </h2>
            <p className="mt-4 text-foreground/65">Online • Webinar • In-house • Distance learning</p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trainingCourses.map((c, i) => (
              <motion.article
                key={c}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="feature-tile"
              >
                <div className="icon-chip-copper icon-chip"><GraduationCap className="size-5" /></div>
                <h3 className="mt-5 font-display text-lg text-foreground">{c}</h3>
                <p className="mt-2 text-sm text-foreground/60">Progressive module delivery for applied workplace capability.</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs">
                  <span className="text-foreground/50">6 weeks • Online</span>
                  <span className="font-semibold text-[var(--brand-gold-soft)]">Enroll →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE */}
      <section className="relative py-24">
        <div className="section-wrap">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.article
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
              className="glass-card-strong"
            >
              <span className="brand-pill"><LibraryBig className="size-3" /> Knowledge Centre</span>
              <h3 className="mt-5 font-display text-3xl text-foreground">Research depth for serious labour-law work.</h3>
              <p className="mt-3 text-foreground/65">Labour Act guides, arbitration awards, court decisions, ILO standards, and SADC comparative research — one indexed reference environment.</p>
              <div className="mt-6 grid gap-3">
                {knowledgeResources.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <Icon className="size-4 text-[var(--brand-gold)]" />
                      <span className="text-sm text-foreground/85">{r.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.article>

            <motion.article
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="glass-card overflow-hidden"
            >
              <span className="brand-pill"><ChartNoAxesCombined className="size-3" /> Institutional Insights</span>
              <h3 className="mt-5 font-display text-3xl text-foreground">Policy, market & governance updates.</h3>
              <p className="mt-3 text-foreground/65">Stay ahead of legislative amendments, regulatory developments, and labour market research curated for decision-makers.</p>

              <div className="mt-6 space-y-3">
                {[
                  { l: "Labour Act Amendment 2026", t: "Policy Update", d: "2 days ago" },
                  { l: "SADC Wage Comparison Report", t: "Research", d: "1 week ago" },
                  { l: "Q1 Workforce Stability Index", t: "Analytics", d: "2 weeks ago" },
                  { l: "OLC Arbitration Trends", t: "Insights", d: "3 weeks ago" },
                ].map((n) => (
                  <div key={n.l} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{n.l}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-foreground/50">{n.t} • {n.d}</p>
                    </div>
                    <ChevronRight className="size-4 text-foreground/40" />
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24">
        <div className="section-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="brand-pill"><Briefcase className="size-3" /> Membership</span>
            <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl">
              Three pathways. <span className="gold-text">One platform.</span>
            </h2>
            <p className="mt-4 text-foreground/65">All subscriptions include once-off registration of N$1,500.</p>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {membershipPlans.map((p, i) => (
              <motion.article
                key={p.name}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className={p.featured ? "glass-card-strong relative" : "feature-tile"}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--brand-navy-deep)]" style={{ background: "var(--gradient-gold)" }}>
                    Most Popular
                  </span>
                )}
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--brand-gold-soft)]">{p.name}</p>
                <p className="mt-2 text-sm text-foreground/60">{p.audience}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <p className="font-display text-4xl font-semibold text-foreground">{p.fee}</p>
                  <p className="text-sm text-foreground/55">{p.per}</p>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--brand-gold)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={p.featured ? "gold" : "glass"} size="lg" className="mt-7 w-full">
                  Select {p.name}
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="section-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 p-10 text-center sm:p-16"
            style={{ background: "var(--gradient-mesh)" }}
          >
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-[oklch(0.16_0.04_252_/_0.7)]" />
            <div className="relative">
              <span className="brand-pill"><Sparkles className="size-3" /> Ready when you are</span>
              <h2 className="mt-5 font-display text-4xl text-foreground sm:text-5xl lg:text-6xl">
                Join the future of <span className="gold-text">labour-law technology.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-foreground/70">
                Built in Namibia, designed for SADC. Become a member today and bring discipline, intelligence, and clarity into every workplace decision.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button variant="gold" size="xl">Start Membership Application <ArrowRight className="size-4" /></Button>
                <Button variant="glass" size="xl">Talk to Sales</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 bg-black/30 py-12 backdrop-blur-md">
        <div className="section-wrap">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <img src={namLaborisLogo} alt="" className="h-9 w-9 rounded-lg" />
                <p className="font-display text-lg font-bold text-foreground">NamLaboris</p>
              </div>
              <p className="mt-4 text-sm text-foreground/55">Labour governance intelligence for Namibia & SADC.</p>
            </div>
            {[
              { t: "Platform", l: ["ADR Cases", "Compliance", "AI Assistant", "Analytics"] },
              { t: "Resources", l: ["Knowledge Centre", "Training Hub", "Research", "API Docs"] },
              { t: "Company", l: ["About", "Careers", "Contact", "Privacy"] },
            ].map((g) => (
              <div key={g.t}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-gold-soft)]">{g.t}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.l.map((x) => (
                    <li key={x}><a href="#" className="text-sm text-foreground/65 hover:text-foreground">{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-foreground/45 sm:flex-row">
            <p>© 2026 NamLaboris Agency. All rights reserved.</p>
            <p>Windhoek, Namibia</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
