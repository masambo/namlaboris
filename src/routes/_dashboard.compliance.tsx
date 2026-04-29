import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Loader2, ShieldCheck, UploadCloud, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { runComplianceAudit, type ComplianceAuditResult } from "@/lib/ai";

export const Route = createFileRoute("/_dashboard/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance Suite | NamLaboris" },
      { name: "description", content: "AI-powered HR compliance audits and risk assessment." },
    ],
  }),
  component: CompliancePage,
});

const statusIcon = { pass: CheckCircle2, warning: AlertTriangle, fail: XCircle };
const statusColor = { pass: "text-emerald-500", warning: "text-yellow-500", fail: "text-red-500" };

const REQUIRED_DOCS = [
  { id: "contracts", label: "Employment Contracts" },
  { id: "disciplinary", label: "Disciplinary Code" },
  { id: "ohs", label: "OHS Records" },
  { id: "equity", label: "Affirmative Action Report" },
];

function CompliancePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [audit, setAudit] = useState<ComplianceAuditResult | null>(null);
  const [running, setRunning] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});

  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);

  const handleFileUpload = (id: string) => {
    // Simulate file upload delay
    setUploadedDocs(prev => ({ ...prev, [id]: true }));
  };

  const allDocsUploaded = REQUIRED_DOCS.every(doc => uploadedDocs[doc.id]);

  const handleAudit = async () => {
    if (!allDocsUploaded) return;
    setRunning(true);
    const result = await runComplianceAudit("all documents uploaded");
    setAudit(result);
    setRunning(false);
  };

  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" /></div>;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]"><ShieldCheck className="size-5" /></span>
          <div>
            <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">Compliance Suite</h1>
            <p className="text-xs text-foreground/55">AI-powered HR compliance audit · Labour Act 2007</p>
          </div>
        </div>

        {!audit ? (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Upload Section */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[var(--brand-navy-deep)]">1. Upload Documents</h2>
                <p className="text-sm text-foreground/60">Please upload the following required documents for AI analysis.</p>
              </div>
              <div className="space-y-4 flex-1">
                {REQUIRED_DOCS.map((doc) => {
                  const isUploaded = uploadedDocs[doc.id];
                  return (
                    <div key={doc.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                      <div className="flex items-center gap-3">
                        <FileText className={`size-5 ${isUploaded ? "text-[var(--brand-gold)]" : "text-foreground/30"}`} />
                        <span className={`text-sm font-semibold ${isUploaded ? "text-foreground" : "text-foreground/60"}`}>{doc.label}</span>
                      </div>
                      {isUploaded ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase text-emerald-700">
                          <CheckCircle2 className="size-3" /> Uploaded
                        </span>
                      ) : (
                        <label className="cursor-pointer rounded-lg bg-[var(--brand-navy)]/10 px-3 py-1.5 text-xs font-bold text-[var(--brand-navy)] transition hover:bg-[var(--brand-navy)]/20">
                          Upload
                          <input type="file" className="hidden" onChange={() => handleFileUpload(doc.id)} accept=".pdf,.doc,.docx" />
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audit Section */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
              <ShieldCheck className={`size-16 mb-6 ${allDocsUploaded ? "text-[var(--brand-gold)]" : "text-foreground/20"}`} />
              <h2 className="font-display text-xl text-[var(--brand-navy-deep)]">2. Run Audit</h2>
              <p className="mt-2 text-sm text-foreground/60 max-w-sm">
                Once all documents are uploaded, our AI will scan them against key areas of the Namibian Labour Act to provide an overall compliance score and findings.
              </p>
              <Button 
                onClick={handleAudit} 
                disabled={running || !allDocsUploaded} 
                className="mt-8 w-full max-w-xs bg-[var(--brand-gold)] text-white hover:brightness-110 disabled:opacity-50"
              >
                {running ? <><Loader2 className="size-4 animate-spin mr-2" /> Analysing Documents…</> : "Start Compliance Audit"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/50">Overall Compliance Score</p>
                <p className={`mt-1 font-display text-5xl font-bold ${audit.score >= 80 ? "text-emerald-600" : audit.score >= 60 ? "text-yellow-500" : "text-red-500"}`}>{audit.score}%</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setAudit(null)}>Start New Audit</Button>
            </div>

            {/* Findings */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-sm font-bold text-[var(--brand-navy-deep)] mb-4">Findings</h2>
              <div className="space-y-3">
                {audit.findings.map((f) => {
                  const Icon = statusIcon[f.status];
                  return (
                    <div key={f.area} className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3">
                      <Icon className={`size-5 mt-0.5 shrink-0 ${statusColor[f.status]}`} />
                      <div>
                        <p className="text-sm font-semibold text-[var(--brand-navy-deep)]">{f.area}</p>
                        <p className="text-xs text-foreground/65 mt-0.5">{f.detail}</p>
                      </div>
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase ${f.status === "pass" ? "bg-emerald-100 text-emerald-700" : f.status === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{f.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="rounded-2xl border-2 border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/5 p-6">
              <p className="text-xs font-semibold text-[var(--brand-gold)] mb-2">AI Recommendation</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{audit.recommendation}</p>
            </div>
          </div>
        )}
    </main>
  );
}
