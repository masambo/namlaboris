import {
  Apple,
  ArrowRight,
  BookOpenText,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  ChevronRight,
  Download,
  Gavel,
  GraduationCap,
  Landmark,
  LibraryBig,
  Play,
  ScanSearch,
  Scale,
  ShieldCheck,
} from "lucide-react";

import namLaborisLogo from "@/assets/namlaboris-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const navigationItems = ["Home", "ADR Cases", "Compliance Tools", "Training Hub", "Analytics"];

const platformModules = [
  {
    title: "AI Legal Assistant",
    summary: "Structured labour law guidance for disciplinary, grievance, and arbitration preparation.",
    icon: Bot,
  },
  {
    title: "ADR Cases",
    summary: "Cross-jurisdiction case research from Namibia and wider SADC labour institutions.",
    icon: Scale,
  },
  {
    title: "Compliance Tools",
    summary: "HR compliance audits, policy alignment checks, and risk-based remediation guidance.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Policy Builder",
    summary: "Generate compliant workplace policy frameworks aligned with labour governance standards.",
    icon: LibraryBig,
  },
  {
    title: "Training Hub",
    summary: "Professional learning programs delivered online, via webinars, and in-house sessions.",
    icon: Gavel,
  },
  {
    title: "Analytics",
    summary: "Dispute trends, risk indexes, and workforce stability signals for informed decisions.",
    icon: ChartNoAxesCombined,
  },
];

const serviceHighlights = [
  { title: "File a Dispute", summary: "Open a structured case and manage hearings.", icon: Gavel },
  { title: "Get Legal Advice", summary: "Ask labour law questions with guided reasoning.", icon: Bot },
  { title: "Compliance Check", summary: "Audit contracts, policy alignment, and statutory risk.", icon: ShieldCheck },
];

const intelligencePanels = [
  {
    title: "Live Case Tracker",
    summary: "Current status, hearing readiness, and dispute milestones in one place.",
    cta: "View Cases",
    tone: "soft",
  },
  {
    title: "Labour Law Insights",
    summary: "Analytics, reports, and sector signals for better workplace decisions.",
    cta: "View Reports",
    tone: "strong",
  },
  {
    title: "Upcoming Hearing",
    summary: "Prepare impartial decisions with documents, timelines, and action prompts.",
    cta: "Learn More",
    tone: "soft",
  },
  {
    title: "Neutrality & Fairness",
    summary: "Guided principles for procedural fairness and governance discipline.",
    cta: "Learn More",
    tone: "soft",
  },
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
  "Labour Act Interpretation Guides",
  "Arbitration Awards",
  "Labour Court Decisions",
  "SADC Labour Law Comparative Research",
  "ILO Labour Standards",
  "HR Governance Research",
];

const institutionalItems = [
  "Labour policy updates",
  "Regulatory developments",
  "Labour market research",
  "Institutional reports",
  "Legislative amendments",
];

const membershipPlans = [
  { name: "Corporate", audience: "Employers & Companies", fee: "N$2,850 / month" },
  { name: "Professional", audience: "HR Practitioners & Consultants", fee: "N$3,650 / month" },
  { name: "Institutional", audience: "Universities & Government Bodies", fee: "N$5,500 / month" },
];

export function NamLaborisHomePage() {
  return (
    <main className="page-frame min-h-screen pb-16">
      <header className="border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="section-wrap flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={namLaborisLogo} alt="NamLaboris Agency logo" className="h-11 w-11 rounded-md object-cover" />
            <div>
              <p className="text-sm font-bold text-foreground">NamLaboris</p>
              <p className="text-xs text-muted-foreground">Labour Governance Intelligence</p>
            </div>
          </div>
          <nav className="hidden items-center gap-7 lg:flex">
            {navigationItems.map((item, index) => (
              <a
                key={item}
                href={index === 0 ? "#top" : `#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-semibold text-foreground/88 transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="quiet" size="sm">
              Member Login
            </Button>
            <Button variant="hero" size="sm">
              Join Platform
            </Button>
          </div>
        </div>
      </header>

      <section id="top" className="section-wrap pt-8 sm:pt-12">
        <div className="hero-panel refined-hero grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
          <div className="space-y-6">
            <span className="brand-kicker">Namibia • SADC Labour Intelligence</span>
            <h1 className="max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Labour governance, ADR support, and compliance intelligence in one working platform.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              NamLaboris gives employers, HR practitioners, consultants, and institutions a disciplined digital
              workspace for case tracking, AI legal reasoning, policy control, training delivery, and labour
              intelligence across Namibia and the wider SADC region.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="xl">
                Start Membership Application
              </Button>
              <Button variant="amber" size="xl">
                View Platform Structure <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {serviceHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="service-tile">
                    <div className="service-tile__icon">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Explore <ChevronRight className="size-4" />
                    </span>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
              <div className="intelligence-grid">
                {intelligencePanels.map((panel) => (
                  <article
                    key={panel.title}
                    className={panel.tone === "strong" ? "intelligence-card intelligence-card--strong" : "intelligence-card"}
                  >
                    <div>
                      <p className="text-2xl font-semibold text-foreground">{panel.title}</p>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{panel.summary}</p>
                    </div>
                    <Button variant={panel.tone === "strong" ? "hero" : "quiet"} size="sm" className="w-fit">
                      {panel.cta}
                    </Button>
                  </article>
                ))}
              </div>

              <aside className="phone-showcase">
                <div className="phone-shell">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div>
                      <p className="text-2xl font-semibold text-foreground">Hello, Anna.</p>
                      <p className="mt-1 text-sm text-muted-foreground">How can we assist you today?</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "File a Dispute", variant: "hero", icon: Gavel },
                        { label: "Get Legal Help", variant: "quiet", icon: ScanSearch },
                        { label: "Compliance Check", variant: "quiet", icon: ShieldCheck },
                        { label: "Training Hub", variant: "amber", icon: GraduationCap },
                      ].map((action) => {
                        const Icon = action.icon;

                        return (
                          <button key={action.label} className={`phone-action phone-action--${action.variant}`} type="button">
                            <span className="inline-flex items-center gap-3">
                              <Icon className="size-4" />
                              {action.label}
                            </span>
                            <ChevronRight className="size-4" />
                          </button>
                        );
                      })}
                    </div>

                    <div className="phone-panel">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Upcoming Hearing</p>
                      <p className="mt-3 text-lg font-semibold text-foreground">Smith vs. XYZ Ltd.</p>
                      <p className="mt-1 text-sm text-muted-foreground">Hearing tomorrow at 10:00 AM</p>
                      <Button variant="quiet" size="sm" className="mt-4 w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="store-buttons">
                  <Button variant="quiet" size="lg" className="store-button">
                    <Apple className="size-5" />
                    <span>
                      <small className="block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Download on the
                      </small>
                      App Store
                    </span>
                  </Button>
                  <Button variant="hero" size="lg" className="store-button">
                    <Play className="size-5" />
                    <span>
                      <small className="block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
                        Get it on
                      </small>
                      Google Play
                    </span>
                  </Button>
                </div>
              </aside>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <article className="metric-card">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Registration</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">N$1,500</p>
              </article>
              <article className="metric-card">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Jurisdictions</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">SADC + Namibia</p>
              </article>
              <article className="metric-card">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Coverage</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">ADR • HR • Compliance</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="adr-cases" className="section-wrap pt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Core Platform Modules</p>
            <h2 className="mt-2 text-3xl text-foreground">Operational tools built around labour governance.</h2>
          </div>
          <Badge variant="outline" className="border-border/80 px-3 py-1 text-xs tracking-[0.1em] text-muted-foreground">
            Real workflow depth, not demo features.
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {platformModules.map((module) => {
            const Icon = module.icon;

            return (
              <Card key={module.title} className="feature-card rounded-md">
                <CardHeader className="p-0">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md surface-tint text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">{module.summary}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="compliance-tools" className="section-band mt-14">
        <div className="section-wrap py-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <Badge variant="secondary" className="bg-secondary/40 text-secondary-foreground">
                Compliance Dashboard
              </Badge>
              <h2 className="text-3xl text-foreground">A working layer for legal alignment, risk control, and disciplinary readiness.</h2>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                The platform structure calls for compliance risk scoring, HR governance maturity tracking, policy checks,
                and guided investigation workflows. This section restores that depth instead of presenting only high-level marketing copy.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "HR Compliance Audit",
                  "Employment Contract Review",
                  "Policy Compliance Check",
                  "Disciplinary Process Builder",
                  "Employment Equity Compliance",
                  "Workplace Investigation Guide",
                ].map((item) => (
                  <div key={item} className="list-chip">
                    <ShieldCheck className="size-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="insight-stack">
              <article className="insight-panel">
                <div className="insight-panel__icon">
                  <Landmark className="size-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">Cross-jurisdiction ADR research</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Research awards from Namibia, South Africa, Zambia, Botswana, Zimbabwe, and wider SADC institutions.
                  </p>
                </div>
              </article>
              <article className="insight-panel">
                <div className="insight-panel__icon">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">Membership onboarding workflow</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Registration, reference generation, invoice automation, portal setup, and confidentiality-first intake.
                  </p>
                </div>
              </article>
              <article className="insight-panel">
                <div className="insight-panel__icon">
                  <Download className="size-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">Knowledge exports and guided outputs</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Export legal research, generate compliant policy drafts, and surface practical recommendations for teams.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="training-hub" className="section-wrap pt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Training Hub</p>
            <h2 className="mt-2 text-3xl text-foreground">Programmes built for hearings, discipline, grievance, and labour governance practice.</h2>
          </div>
          <Badge variant="outline" className="border-border/80 px-3 py-1 text-xs tracking-[0.1em] text-muted-foreground">
            Online • Webinar • In-house • Distance learning
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trainingCourses.map((course) => (
            <article key={course} className="feature-card rounded-md">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md surface-amber text-accent-foreground">
                <GraduationCap className="size-5" />
              </div>
              <p className="text-xl font-semibold text-foreground">{course}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Progressive module delivery for applied workplace capability building.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="analytics" className="section-wrap pt-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="surface-strong rounded-md border border-border/30 p-6 sm:p-8">
            <Badge variant="secondary" className="bg-secondary/30 text-secondary-foreground">
              Knowledge Centre
            </Badge>
            <h2 className="mt-5 text-3xl text-secondary">Research depth for labour law work.</h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary/85">
              Labour Act interpretation guides, arbitration awards, labour court decisions, ILO standards, and comparative SADC labour research in one reference environment.
            </p>
            <div className="mt-6 grid gap-3">
              {knowledgeResources.map((resource) => (
                <div key={resource} className="knowledge-row">
                  <BookOpenText className="size-4 text-accent" />
                  <span>{resource}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-md border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-panel)] sm:p-8">
            <Badge variant="outline" className="border-border/80 text-muted-foreground">
              Institutional Insights
            </Badge>
            <h2 className="mt-5 text-3xl text-foreground">Policy, market, and governance updates that keep members ahead.</h2>
            <div className="mt-6 space-y-3">
              {institutionalItems.map((item) => (
                <div key={item} className="list-chip">
                  <ChartNoAxesCombined className="size-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-band mt-14">
        <div className="section-wrap py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Membership Framework</p>
              <h2 className="mt-2 text-3xl text-foreground">Three membership pathways aligned to organisation type.</h2>
            </div>
            <p className="text-sm font-medium text-muted-foreground">All subscriptions require once-off registration of N$1,500.</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {membershipPlans.map((plan) => (
              <article key={plan.name} className="rounded-md border border-border/80 bg-card/90 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{plan.name}</p>
                <p className="mt-3 text-2xl font-semibold text-foreground">{plan.fee}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.audience}</p>
                <Button variant="quiet" size="sm" className="mt-5 w-full">
                  Select {plan.name}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}