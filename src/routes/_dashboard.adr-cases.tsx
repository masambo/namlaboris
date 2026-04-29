import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Scale, Bot } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { fetchCaseSummaries, analyzeCaseWithAI, type CaseSummary } from "@/lib/ai";

export const Route = createFileRoute("/_dashboard/adr-cases")({
  head: () => ({ meta: [{ title: "ADR Cases | NamLaboris" }] }),
  component: AdrCasesPage,
});

const urgencyColor = { low: "bg-green-100 text-green-700", medium: "bg-yellow-100 text-yellow-700", high: "bg-red-100 text-red-700" };
const statusColor = { open: "bg-blue-100 text-blue-700", "in-progress": "bg-orange-100 text-orange-700", resolved: "bg-emerald-100 text-emerald-700" };

function AdrCasesPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [analysisMap, setAnalysisMap] = useState<Record<string, string>>({});
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);
  useEffect(() => { if (!loading && user) { fetchCaseSummaries().then((c) => { setCases(c); setLoadingCases(false); }); } }, [loading, user]);

  const handleAnalyze = async (c: CaseSummary) => {
    setAnalyzingId(c.caseId);
    const result = await analyzeCaseWithAI(c.title, c.summary);
    setAnalysisMap((m) => ({ ...m, [c.caseId]: result }));
    setAnalyzingId(null);
  };

  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" /></div>;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]"><Scale className="size-5" /></span>
          <div>
            <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">ADR Cases</h1>
            <p className="text-xs text-foreground/55">Alternative Dispute Resolution case management with AI analysis</p>
          </div>
        </div>

        {loadingCases ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="size-5 animate-spin text-[var(--brand-gold)]" /></div>
        ) : (
          <div className="space-y-4">
            {cases.map((c) => (
              <div key={c.caseId} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-foreground/40">{c.caseId}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase ${statusColor[c.status]}`}>{c.status}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase ${urgencyColor[c.urgency]}`}>{c.urgency}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-[var(--brand-navy-deep)]">{c.title}</h3>
                    <p className="mt-1 text-sm text-foreground/65">{c.summary}</p>
                    <p className="mt-2 text-xs text-foreground/50"><span className="font-semibold">Next step:</span> {c.nextStep}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAnalyze(c)} disabled={analyzingId === c.caseId}>
                    {analyzingId === c.caseId ? <><Loader2 className="size-3 animate-spin mr-1" /> Analyzing…</> : <><Bot className="size-3 mr-1" /> AI Analysis</>}
                  </Button>
                </div>
                {analysisMap[c.caseId] && (
                  <div className="mt-3 rounded-xl border border-[var(--brand-gold)]/20 bg-[var(--brand-gold)]/5 p-4 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                    {analysisMap[c.caseId]}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
    </main>
  );
}
