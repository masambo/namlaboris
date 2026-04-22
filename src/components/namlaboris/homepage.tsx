import { ArrowRight, Bot, BriefcaseBusiness, ChartSpline, Gavel, LibraryBig, Scale } from "lucide-react";

import namLaborisLogo from "@/assets/namlaboris-logo.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    icon: ChartSpline,
  },
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

      <section className="section-wrap pt-12 sm:pt-16">
        <div className="hero-panel grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <span className="brand-kicker">Namibia • SADC Labour Intelligence</span>
            <h1 className="max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl">
              Professional labour governance infrastructure, designed for real workplace decisions.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              NamLaboris combines AI-assisted legal reasoning, compliance automation, ADR research, and training
              operations into one disciplined platform for employers, consultants, and institutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="xl">
                Start Membership Application
              </Button>
              <Button variant="amber" size="xl">
                View Platform Structure <ArrowRight className="size-4" />
              </Button>
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

          <aside className="surface-strong relative overflow-hidden rounded-md border border-border/30 p-6">
            <div className="pointer-events-none absolute inset-0 opacity-80">
              <div className="signal-orbit" />
            </div>
            <div className="relative space-y-5">
              <Badge variant="secondary" className="bg-secondary/30 text-secondary-foreground">
                Platform Snapshot
              </Badge>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Compliance Intelligence</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary/90">
                  Risk-scored governance checks, policy diagnostics, and corrective recommendations aligned with labour law obligations.
                </p>
              </div>
              <Separator className="bg-secondary/30" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">ADR Research</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary/90">
                  Search precedents, compare arbitration outcomes, and prepare hearings with structured legal context.
                </p>
              </div>
              <Separator className="bg-secondary/30" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Confidential by Design</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary/90">
                  Member submissions are handled under strict confidentiality and compliance-oriented data processing practices.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-wrap pt-14">
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