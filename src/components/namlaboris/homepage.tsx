import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Gavel,
  GraduationCap,
  Landmark,
  LibraryBig,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import namLaborisLogo from "@/assets/namlaboris-logo.jpg";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import logoSadc from "@/assets/logo-sadc.png";
import logoNef from "@/assets/logo-nef.png";
import logoIlo from "@/assets/logo-ilo.png";
import logoLawSociety from "@/assets/logo-lawsociety.jpeg";
import logoNamibiaCoat from "@/assets/logo-namibia-coat.png";
import { Button } from "@/components/ui/button";
import heroHandshake from "@/assets/hero-handshake.jpg";
import caseTrackerImg from "@/assets/case-tracker.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOut,
  User as UserIcon,
  MessageSquare,
  ClipboardCheck,
  CalendarClock,
  Award,
} from "lucide-react";

const navigationItems = [
  { label: "Home", href: "#top", active: true },
  { label: "ADR Cases", href: "#modules" },
  { label: "Compliance Tools", href: "#compliance" },
  { label: "Training Hub", href: "#training" },
  { label: "Analytics", href: "#modules" },
];

const platformModules = [
  { title: "AI Legal Assistant", desc: "Structured labour-law guidance for disciplinary, grievance, and arbitration preparation under the Namibian Labour Act, 2007.", icon: Bot },
  { title: "ADR Case Support", desc: "Practical research and procedural support across Namibian and broader SADC labour disputes.", icon: Scale },
  { title: "Compliance Suite", desc: "HR audits, contract reviews, policy alignment, and risk-based remediation guidance.", icon: ShieldCheck },
  { title: "Policy Builder", desc: "Generate compliant workplace policies aligned with current labour-governance standards.", icon: LibraryBig },
  { title: "Training Hub", desc: "Online, webinar, and in-house programs for hearings, discipline & grievance practice.", icon: GraduationCap },
  { title: "Workforce Insights", desc: "Dispute trends, risk indices, and workforce stability signals for informed decisions.", icon: ChartNoAxesCombined },
];

// Pricing data taken directly from the NamLaboris Training Hub brochure
const trainingCourses: { course: string; sessions: number; modules: number; cost: string }[] = [
  { course: "Chairing & Initiating Disciplinary Hearings", sessions: 6, modules: 2, cost: "N$5,500" },
  { course: "Cross Examination Skills in Hearings", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Managing Workplace Discipline", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Conducting Arbitrations at OLC", sessions: 4, modules: 2, cost: "N$5,500" },
  { course: "Managing Workplace Grievances", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Negotiation Skills in Workplace", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Union Representation for Shop Stewards", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Organisational Rights & Collective Bargaining", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Managing Incapacity & Poor Performance", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Retrenchments & Business Transfers", sessions: 3, modules: 1, cost: "N$3,200" },
  { course: "Recruitment & Workforce Transformation", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Employment Equity Compliance", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Code of Good Practice on Dismissal", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Workplace Harassment & Discrimination", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Conflict Management in the Workplace", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Cyber Security Awareness in Workplace", sessions: 2, modules: 1, cost: "N$2,400" },
  { course: "Protection of Personal Information Act", sessions: 2, modules: 1, cost: "N$2,400" },
  { course: "Promotion of Access to Information Act", sessions: 2, modules: 1, cost: "N$2,400" },
  { course: "Occupational Safety & Health Compliance", sessions: 3, modules: 1, cost: "N$2,900" },
  { course: "Supervisors Compliance Training", sessions: 2, modules: 1, cost: "N$2,400" },
];

const groupDiscounts = [
  { range: "5 – 9 Delegates", discount: "5% Discount" },
  { range: "10 – 14 Delegates", discount: "10% Discount" },
  { range: "15+ Delegates", discount: "15% Discount" },
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
  {
    name: "Corporate",
    audience: "Employers & Companies",
    fee: "N$2,850",
    per: "/month",
    features: ["Case management dashboard", "Policy builder access", "Quarterly compliance audit", "5 user seats"],
    featured: false,
  },
  {
    name: "Professional",
    audience: "HR Practitioners & Consultants",
    fee: "N$3,650",
    per: "/month",
    features: ["Everything in Corporate", "AI Legal Assistant", "Training Hub access", "ADR case research", "10 user seats"],
    featured: true,
  },
  {
    name: "Institutional",
    audience: "Universities & Government",
    fee: "N$5,500",
    per: "/month",
    features: ["Everything in Professional", "Workforce analytics", "API access", "Custom integrations", "Unlimited seats"],
    featured: false,
  },
];

const partners: { name: string; logo: string }[] = [
  { name: "Government of Namibia", logo: logoNamibiaCoat },
  { name: "SADC", logo: logoSadc },
  { name: "ILO", logo: logoIlo },
  { name: "Namibian Employers Federation", logo: logoNef },
  { name: "The Law Society of Namibia", logo: logoLawSociety },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" } }),
};

function NavAuthButtons() {
  const { user, loading, signOut } = useAuth();
  if (loading) return <div className="h-9 w-24" />;
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
          <Link to="/assistant">AI Assistant</Link>
        </Button>
        <Button variant="default" size="sm" onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild variant="default" size="sm" className="bg-[var(--brand-gold)] text-white hover:brightness-110">
        <Link to="/signup">Register <ArrowRight className="size-4" /></Link>
      </Button>
    </div>
  );
}

/* ---------------- Hero ---------------- */

function HeroSection() {
  return (
    <div className="section-wrap relative pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.span
            initial="hidden" animate="show" variants={fadeUp}
            className="brand-pill"
          >
            <Sparkles className="size-3" /> Integrated Workplace Governance
          </motion.span>

          <motion.h1
            initial="hidden" animate="show" variants={fadeUp} custom={1}
            className="mt-6 font-display text-[2.4rem] leading-[1.08] text-[var(--brand-navy-deep)] sm:text-5xl lg:text-[3.6rem]"
          >
            Empowering Workplaces. <br className="hidden sm:block" />
            Strengthening Relations. <br className="hidden sm:block" />
            <span className="gold-text">Building Futures.</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="show" variants={fadeUp} custom={2}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            NamLaboris is the Integrated Workplace Governance & Labour Advisory Authority — a professional
            advisory practice anchored in the Namibian Labour Act (No. 11 of 2007) and SADC labour standards.
            We support employers, HR practitioners, consultants, and institutions across Namibia and the region.
          </motion.p>

          <motion.div
            initial="hidden" animate="show" variants={fadeUp} custom={3}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="xl" className="bg-[var(--brand-gold)] text-white hover:brightness-110">
              <Link to="/signup">Become a Member <ArrowRight className="size-4" /></Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#training"><PlayCircle className="size-4" /> View Training</a>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden" animate="show" variants={fadeUp} custom={4}
            className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {[
              { v: "20+", l: "Training Programs" },
              { v: "16", l: "SADC Jurisdictions" },
              { v: "2007", l: "Labour Act Anchored" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-bold text-[var(--brand-navy-deep)]">{s.v}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-foreground/55">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: institutional brand panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-deep)]">
            {/* navy header band */}
            <div className="flex items-center justify-between bg-[var(--brand-navy)] px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <img src={namLaborisLogo} alt="NamLaboris" className="h-12 w-auto" />
              </div>
              <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/80 sm:inline">
                Est. Windhoek, Namibia
              </span>
            </div>

            {/* crimson tab */}
            <div className="relative bg-[var(--brand-gold)] px-6 py-4 text-white">
              <p className="font-display text-2xl font-bold">Labour Advisory</p>
              <p className="text-sm italic text-white/85">Specialists at your service</p>
            </div>

            <div className="space-y-4 px-6 py-6">
              <p className="text-sm leading-relaxed text-foreground/75">
                As labour-law specialists, NamLaboris delivers <strong className="text-[var(--brand-gold)]">current,
                practical, and aligned</strong> guidance across the full employment lifecycle — from contracting
                to disciplinary hearings, arbitration, and compliance.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Disciplinary hearings & arbitrations",
                  "Compliance audits & policy reviews",
                  "AI-assisted labour-law research",
                  "Accredited training programmes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--brand-gold)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                {[
                  { v: "20+", l: "Courses" },
                  { v: "5", l: "Delivery Modes" },
                  { v: "15%", l: "Group Discount" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-xl font-bold text-[var(--brand-navy-deep)]">{s.v}</p>
                    <p className="text-[0.6rem] uppercase tracking-[0.14em] text-foreground/55">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

export function NamLaborisHomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="relative z-30 border-b border-border bg-white/95 backdrop-blur">
        <div className="section-wrap flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={namLaborisLogo} alt="NamLaboris logo" className="h-11 w-auto" />
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <a key={item.label} href={item.href} className={`nav-link ${item.active ? "active" : ""}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <NavAuthButtons />
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative grid-bg overflow-hidden bg-background">
        <HeroSection />

        {/* Partners strip */}
        <div className="border-y border-border bg-[var(--muted)]/50">
          <div className="section-wrap py-6">
            <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Aligned with national, regional, and international labour bodies
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {partners.map((p) => (
                <div key={p.name} className="flex items-center gap-3 grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100">
                  <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain" />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/70">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM MODULES */}
      <section id="modules" className="relative py-20 lg:py-24">
        <div className="section-wrap">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="brand-pill">Our Services</span>
            <h2 className="mt-5 font-display text-3xl text-[var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
              Practical tools for <span className="gold-text">labour governance.</span>
            </h2>
            <p className="mt-4 text-foreground/70">
              Six interconnected services covering the full workflow — from intake to award.
            </p>
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
                  <div className="icon-chip"><Icon className="size-5" /></div>
                  <h3 className="mt-5 font-display text-xl text-[var(--brand-navy-deep)]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{m.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-gold)]">
                    Learn more <ChevronRight className="size-3.5" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section id="compliance" className="relative bg-[var(--muted)]/40 py-20 lg:py-24">
        <div className="section-wrap">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <span className="brand-pill"><ShieldCheck className="size-3" /> Compliance Suite</span>
              <h2 className="mt-5 font-display text-3xl text-[var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
                A working layer for <span className="gold-text">legal alignment</span> & risk control.
              </h2>
              <p className="mt-5 text-foreground/70">
                Continuous compliance scoring, HR governance maturity tracking, automated policy checks, and
                guided investigation workflows. Built around real procedures — not marketing demos.
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
                  <div key={item} className="flex items-center gap-3 rounded-md border border-border bg-white px-4 py-3">
                    <CheckCircle2 className="size-4 text-[var(--brand-gold)]" />
                    <span className="text-sm text-foreground/85">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="bg-[var(--brand-gold)] text-white hover:brightness-110">Start Free Audit</Button>
                <Button variant="outline" size="lg">View Sample Report</Button>
              </div>
            </motion.div>

            {/* Knowledge Centre card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-panel)]"
            >
              <div className="bg-[var(--brand-navy)] px-6 py-4 text-white">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">Knowledge Centre</p>
                <p className="font-display text-xl font-bold">Research depth for serious labour-law work.</p>
              </div>
              <div className="grid gap-2.5 p-6">
                {knowledgeResources.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.label} className="flex items-center gap-3 rounded-md border border-border bg-[var(--muted)]/40 px-4 py-3">
                      <Icon className="size-4 text-[var(--brand-gold)]" />
                      <span className="text-sm text-foreground/85">{r.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRAINING — full course table from the brochure */}
      <section id="training" className="relative py-20 lg:py-24">
        <div className="section-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <span className="brand-pill"><GraduationCap className="size-3" /> Training Hub</span>
            <h2 className="mt-5 font-display text-3xl text-[var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
              Training is <span className="gold-text">our specialty.</span>
            </h2>
            <p className="mt-4 text-foreground/70">
              Programs equip HR practitioners, managers, labour consultants, and union representatives with the
              practical skills required to manage labour relations effectively. Online • Webinar • In-house • Distance learning.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Course table */}
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-panel)]">
              <div className="bg-[var(--brand-gold)] px-5 py-3 text-white">
                <p className="font-display text-base font-bold uppercase tracking-wider">Training Course Structure</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--brand-navy)] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Course</th>
                      <th className="px-3 py-3 text-center font-semibold">Sessions</th>
                      <th className="px-3 py-3 text-center font-semibold">Modules</th>
                      <th className="px-4 py-3 text-right font-semibold">Cost (N$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingCourses.map((c, i) => (
                      <tr key={c.course} className={i % 2 === 0 ? "bg-white" : "bg-[var(--muted)]/40"}>
                        <td className="px-4 py-2.5 text-foreground/85">{c.course}</td>
                        <td className="px-3 py-2.5 text-center text-foreground/75">{c.sessions}</td>
                        <td className="px-3 py-2.5 text-center text-foreground/75">{c.modules}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-[var(--brand-gold)]">{c.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-border bg-[var(--muted)]/40 px-5 py-3 text-xs text-foreground/65">
                Training programs typically include multiple sessions and modules delivered through distance
                learning, webinars, or workshops, allowing delegates to complete training progressively.
              </div>
            </div>

            {/* Investment guide + discounts */}
            <div className="space-y-6">
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-panel)]">
                <div className="bg-[var(--brand-navy)] px-5 py-3 text-center text-white">
                  <p className="font-display text-base font-bold uppercase tracking-wider">Training Investment Guide</p>
                </div>
                <div className="space-y-3 px-5 py-5 text-sm">
                  <p className="text-center font-semibold text-[var(--brand-navy-deep)]">Per Participant</p>
                  <p className="text-center text-foreground/70">All prices are per participant and include:</p>
                  <ul className="space-y-2 pt-2">
                    {[
                      "Training materials",
                      "Certificate of Completion",
                      "Practical activities & assessments",
                      "Post-training support",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-foreground/85">
                        <CheckCircle2 className="size-4 shrink-0 text-[var(--brand-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-panel)]">
                <div className="bg-[var(--brand-gold)] px-5 py-3 text-center text-white">
                  <p className="font-display text-base font-bold uppercase tracking-wider">Group Discounts</p>
                </div>
                <div className="divide-y divide-border">
                  {groupDiscounts.map((g) => (
                    <div key={g.range} className="flex items-center justify-between px-5 py-3 text-sm">
                      <span className="font-semibold text-[var(--brand-navy-deep)]">{g.range}</span>
                      <span className="text-[var(--brand-gold)] font-bold">{g.discount}</span>
                    </div>
                  ))}
                </div>
                <p className="border-t border-border px-5 py-3 text-xs text-foreground/60">
                  Discounts apply to the total training invoice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP / PRICING */}
      <section id="pricing" className="relative bg-[var(--muted)]/40 py-20 lg:py-24">
        <div className="section-wrap">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <span className="brand-pill"><Briefcase className="size-3" /> Membership</span>
            <h2 className="mt-5 font-display text-3xl text-[var(--brand-navy-deep)] sm:text-4xl lg:text-5xl">
              Three pathways. <span className="gold-text">One platform.</span>
            </h2>
            <p className="mt-4 text-foreground/70">All subscriptions include a once-off registration of N$1,500.</p>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {membershipPlans.map((p, i) => (
              <motion.article
                key={p.name}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className={
                  p.featured
                    ? "relative overflow-hidden rounded-2xl border-2 border-[var(--brand-gold)] bg-white p-7 shadow-[var(--shadow-glow)]"
                    : "feature-tile"
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--brand-gold)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--brand-gold)] font-bold">{p.name}</p>
                <p className="mt-2 text-sm text-foreground/65">{p.audience}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <p className="font-display text-4xl font-bold text-[var(--brand-navy-deep)]">{p.fee}</p>
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
                <Button
                  size="lg"
                  className={
                    p.featured
                      ? "mt-7 w-full bg-[var(--brand-gold)] text-white hover:brightness-110"
                      : "mt-7 w-full bg-[var(--brand-navy)] text-white hover:brightness-110"
                  }
                >
                  Select {p.name}
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="relative py-20 lg:py-24">
        <div className="section-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-border bg-[var(--brand-navy)] text-white shadow-[var(--shadow-deep)]"
          >
            <div className="grid gap-8 p-10 sm:p-14 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/85">
                  <Sparkles className="size-3" /> Training Enquiries
                </span>
                <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
                  Empowering workplaces. <br className="hidden sm:block" />
                  Strengthening relations. <em className="font-normal italic text-[var(--brand-gold-soft)]">Building futures.</em>
                </h2>
                <p className="mt-5 max-w-xl text-white/75">
                  Built in Namibia, designed for SADC. Become a member today and bring discipline, intelligence,
                  and clarity into every workplace decision.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button asChild size="xl" className="bg-[var(--brand-gold)] text-white hover:brightness-110">
                    <Link to="/signup">Start Membership Application <ArrowRight className="size-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="xl" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <a href="mailto:training@namlaboris.com">Talk to Us</a>
                  </Button>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-white/15 bg-white/5 p-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">NamLaboris Training Desk</p>
                <div className="space-y-3 text-sm">
                  <a href="tel:+264816587338" className="flex items-center gap-3 text-white hover:text-[var(--brand-gold-soft)]">
                    <Phone className="size-4 text-[var(--brand-gold-soft)]" /> +264 81 658 7338
                  </a>
                  <a href="mailto:training@namlaboris.com" className="flex items-center gap-3 text-white hover:text-[var(--brand-gold-soft)]">
                    <Mail className="size-4 text-[var(--brand-gold-soft)]" /> training@namlaboris.com
                  </a>
                  <p className="flex items-center gap-3 text-white/85">
                    <MapPin className="size-4 text-[var(--brand-gold-soft)]" /> Windhoek, Namibia
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border bg-[var(--brand-navy-deep)] py-12 text-white/85">
        <div className="section-wrap">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <img src={namLaborisLogo} alt="NamLaboris" className="h-12 w-auto rounded bg-white p-1.5" />
              <p className="mt-4 text-sm text-white/65">
                Integrated Workplace Governance & Labour Advisory Authority for Namibia & SADC.
              </p>
            </div>
            {[
              { t: "Services", l: ["ADR Cases", "Compliance", "AI Assistant", "Insights"] },
              { t: "Resources", l: ["Knowledge Centre", "Training Hub", "Research", "Documents"] },
              { t: "Company", l: ["About", "Careers", "Contact", "Privacy"] },
            ].map((g) => (
              <div key={g.t}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-gold-soft)]">{g.t}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.l.map((x) => (
                    <li key={x}><a href="#" className="text-sm text-white/70 hover:text-white">{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
            <p>© 2026 NamLaboris. All rights reserved.</p>
            <p className="font-semibold uppercase tracking-[0.18em] text-[var(--brand-gold-soft)]">
              Empowering Workplaces · Strengthening Relations · Building Futures
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}