import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, BookOpen, Loader2, ExternalLink, Landmark, Gavel, Scale, FileSearch, ShieldCheck, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_dashboard/research")({
  head: () => ({ meta: [{ title: "Research | NamLaboris" }] }),
  component: ResearchPage,
});

const resources = [
  { label: "Labour Act Interpretation Guides", icon: Landmark, desc: "Detailed guides on interpreting the Namibian Labour Act (No. 11 of 2007)." },
  { label: "Arbitration Awards Library", icon: Gavel, desc: "Database of past arbitration awards from the Office of the Labour Commissioner." },
  { label: "Labour Court Decisions", icon: Scale, desc: "Searchable index of Labour Court and Supreme Court labour-related judgments." },
  { label: "SADC Comparative Research", icon: FileSearch, desc: "Cross-border labour law comparison across SADC member states." },
  { label: "ILO Labour Standards", icon: ShieldCheck, desc: "International Labour Organization conventions and recommendations." },
  { label: "HR Governance Research", icon: Briefcase, desc: "Best practices in HR governance, compliance frameworks, and case studies." },
];

function ResearchPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);
  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" /></div>;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]"><BookOpen className="size-5" /></span>
          <div>
            <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">Research Centre</h1>
            <p className="text-xs text-foreground/55">Labour law research and reference materials</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-[var(--brand-gold)]/40 cursor-pointer">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-navy)]/10 text-[var(--brand-navy-deep)]"><Icon className="size-5" /></span>
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-navy-deep)]">{r.label}</p>
                  <p className="mt-1 text-xs text-foreground/60">{r.desc}</p>
                </div>
                <ExternalLink className="size-4 shrink-0 text-foreground/30 ml-auto mt-1" />
              </div>
            );
          })}
        </div>
    </main>
  );
}
