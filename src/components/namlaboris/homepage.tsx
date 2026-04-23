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

const partners = ["Ministry of Labour", "Office of the Labour Commissioner", "SADC", "ILO", "Namibian Employers Federation", "Law Society of Namibia"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" } }),
};

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
      <section id="top" className="relative grid-bg">
        <HeroSection />

        {/* Partners marquee */}
        <div className="border-y border-white/5 bg-black/20 py-6 backdrop-blur-md">
          <div className="overflow-hidden">
            <div className="marquee gap-14 whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-foreground/40">
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="flex items-center gap-14">
                  {p}
                  <span className="size-1.5 rounded-full bg-[var(--brand-gold)]/50" />
                </span>
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
