import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Briefcase, Loader2, FileText, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_dashboard/documents")({
  head: () => ({ meta: [{ title: "Documents | NamLaboris" }] }),
  component: DocumentsPage,
});

const docs = [
  { name: "Disciplinary Hearing Notice Template", type: "DOCX", size: "24 KB", category: "Templates" },
  { name: "Retrenchment Section 34 Notice", type: "DOCX", size: "18 KB", category: "Templates" },
  { name: "Grievance Filing Form", type: "PDF", size: "42 KB", category: "Forms" },
  { name: "Employment Contract — Fixed Term", type: "DOCX", size: "56 KB", category: "Contracts" },
  { name: "Employment Contract — Permanent", type: "DOCX", size: "62 KB", category: "Contracts" },
  { name: "OHS Compliance Checklist", type: "PDF", size: "35 KB", category: "Checklists" },
  { name: "Arbitration Bundle Index", type: "DOCX", size: "15 KB", category: "Templates" },
  { name: "Leave Application Form", type: "PDF", size: "28 KB", category: "Forms" },
];

function DocumentsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);
  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" /></div>;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]"><Briefcase className="size-5" /></span>
          <div>
            <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">Documents</h1>
            <p className="text-xs text-foreground/55">Templates, forms, and legal document library</p>
          </div>
        </div>
        <div className="space-y-2">
          {docs.map((d) => (
            <div key={d.name} className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3 hover:border-[var(--brand-gold)]/30 transition">
              <div className="flex items-center gap-3">
                <FileText className="size-4 text-[var(--brand-navy-deep)]/50" />
                <div>
                  <p className="text-sm font-medium text-[var(--brand-navy-deep)]">{d.name}</p>
                  <p className="text-xs text-foreground/40">{d.type} · {d.size} · {d.category}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm"><Download className="size-3.5" /></Button>
            </div>
          ))}
        </div>
    </main>
  );
}
