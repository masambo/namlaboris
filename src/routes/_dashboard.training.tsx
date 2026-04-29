import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, GraduationCap, Loader2, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_dashboard/training")({
  head: () => ({ meta: [{ title: "Training Hub | NamLaboris" }] }),
  component: TrainingPage,
});

const courses = [
  { course: "Chairing & Initiating Disciplinary Hearings", sessions: 6, cost: "N$5,500", level: "Advanced" },
  { course: "Cross Examination Skills in Hearings", sessions: 3, cost: "N$3,200", level: "Intermediate" },
  { course: "Managing Workplace Discipline", sessions: 3, cost: "N$3,200", level: "Foundation" },
  { course: "Conducting Arbitrations at OLC", sessions: 4, cost: "N$5,500", level: "Advanced" },
  { course: "Managing Workplace Grievances", sessions: 3, cost: "N$3,200", level: "Foundation" },
  { course: "Negotiation Skills in Workplace", sessions: 3, cost: "N$3,200", level: "Intermediate" },
  { course: "Union Representation for Shop Stewards", sessions: 3, cost: "N$2,900", level: "Foundation" },
  { course: "Retrenchments & Business Transfers", sessions: 3, cost: "N$3,200", level: "Intermediate" },
  { course: "Employment Equity Compliance", sessions: 3, cost: "N$2,900", level: "Foundation" },
  { course: "Workplace Harassment & Discrimination", sessions: 3, cost: "N$2,900", level: "Foundation" },
];

const levelColor: Record<string, string> = {
  Foundation: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
};

function TrainingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);
  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" /></div>;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-10 bg-[#fdfcfb]">
        {/* Hero Section */}
        <div className="relative mb-16 overflow-hidden rounded-[2rem] bg-[var(--brand-navy-deep)] p-12 text-white">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-gold-soft)]">
              <GraduationCap className="size-3" /> Excellence in Labour Relations
            </span>
            <h1 className="mt-6 font-display text-4xl leading-tight lg:text-5xl">
              Advance Your Professional <span className="text-[var(--brand-gold-soft)]">Labour Expertise</span>
            </h1>
            <p className="mt-6 text-lg text-white/70">
              NamLaboris Training Desk provides accredited, industry-leading courses for HR professionals, union representatives, and legal practitioners.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="bg-[var(--brand-gold)] text-white hover:brightness-110">
                View All Courses
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                Training Calendar
              </Button>
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-20%] size-[500px] rounded-full bg-[#8b1a1a]/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[10%] size-[300px] rounded-full bg-[var(--brand-gold)]/10 blur-[80px]" />
        </div>

        {/* Stats Row */}
        <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[ 
            { l: "Active Students", v: "1,240+", i: GraduationCap },
            { l: "Course Modules", v: "48", i: ChevronRight },
            { l: "Certified Experts", v: "15", i: ChevronRight },
            { l: "Satisfaction Rate", v: "99.2%", i: ChevronRight },
          ].map((s, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">{s.l}</p>
              <p className="mt-2 text-2xl font-bold text-[var(--brand-navy-deep)]">{s.v}</p>
            </div>
          ))}
        </div>

        {/* Course Grid */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-[var(--brand-navy-deep)]">Available Curricula</h2>
            <p className="text-sm text-foreground/50">Browse our certified professional development paths</p>
          </div>
          <div className="flex gap-2">
            {["All", "Foundation", "Intermediate", "Advanced"].map((f) => (
              <button key={f} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${f === 'All' ? 'bg-[var(--brand-navy-deep)] text-white' : 'bg-white border border-border text-foreground/60 hover:border-[var(--brand-gold)]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.course} className="group relative flex flex-col rounded-3xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand-gold)]/40 hover:shadow-xl">
              <div className="mb-4 flex items-start justify-between">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${levelColor[c.level]}`}>
                  {c.level}
                </span>
                <span className="text-lg font-bold text-[var(--brand-navy-deep)]">{c.cost}</span>
              </div>
              <h3 className="mb-3 font-display text-lg font-bold leading-tight text-[var(--brand-navy-deep)] group-hover:text-[var(--brand-gold)]">
                {c.course}
              </h3>
              <p className="mb-6 flex-1 text-xs leading-relaxed text-foreground/60">
                A comprehensive program covering the intricate aspects of {c.course.toLowerCase()}, tailored for the Namibian market.
              </p>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-[var(--brand-gold)]" />
                  <span className="text-[10px] font-bold text-foreground/40">{c.sessions} MODULES</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/5 hover:text-[var(--brand-gold)]">
                  Enroll Now <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-[2.5rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-12 text-center text-white">
          <h2 className="font-display text-3xl">Custom In-House Training?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            We provide tailored workplace training solutions for large organizations and corporate teams directly at your premises.
          </p>
          <Button size="xl" className="mt-8 bg-[var(--brand-gold)] text-white hover:brightness-110">
            Request Consultation
          </Button>
        </div>
    </main>
  );
}
