import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Bot, Download, FileText, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { chatWithAssistant } from "@/server/ai";
import { PolicyTemplate } from "@/components/ui/policy-template";
// @ts-ignore
import html2pdf from "html2pdf.js";

export const Route = createFileRoute("/_dashboard/policy-builder")({
  head: () => ({
    meta: [
      { title: "Policy Builder | NamLaboris" },
      { name: "description", content: "AI-powered workplace policy generator aligned with Namibian labour law." },
    ],
  }),
  component: PolicyBuilderPage,
});

const POLICY_TEMPLATES = [
  "Disciplinary Code & Procedure",
  "Grievance Procedure",
  "Leave Policy",
  "Sexual Harassment Policy",
  "Health & Safety Policy",
  "Remote Work Policy",
  "Recruitment & Selection Policy",
  "Performance Management Policy",
  "Retrenchment Procedure",
  "Employment Equity Policy",
  "Overtime & Working Hours Policy",
  "Code of Conduct",
];

const INDUSTRIES = [
  "General / Not Specified",
  "Mining & Quarrying",
  "Agriculture & Forestry",
  "Fishing & Marine",
  "Construction",
  "Retail & Wholesale",
  "Hospitality & Tourism",
  "Banking, Insurance & Finance",
  "Public Sector & Parastatals",
  "Manufacturing",
  "Transport & Logistics",
  "Private Security",
  "Domestic Work",
];

function PolicyBuilderPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [custom, setCustom] = useState("");
  const [industry, setIndustry] = useState("General / Not Specified");
  const [generating, setGenerating] = useState(false);
  const [policy, setPolicy] = useState<{ title: string; content: string } | null>(null);
  const policyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const handleGenerate = async (policyType: string) => {
    if (!policyType.trim()) return;
    setGenerating(true);
    setPolicy(null);
    try {
      const res = await chatWithAssistant({
        data: {
          messages: [
            {
              role: "user",
              content: `You are a Namibian HR policy expert. Draft a professional workplace policy for a company in the "${industry}" industry.
              
Policy Type: "${policyType}"

Strict Requirements:
- NO CONVERSATIONAL FILLER. Do not say "Here is your policy" or "I hope this helps". Start directly with the policy title or content.
- Align strictly with the Namibian Labour Act (No. 11 of 2007) and any relevant industry-specific regulations for the "${industry}" sector.
- Include these sections: Purpose, Scope, Policy Statement, Procedures, Responsibilities.
- Use clear, formal, and authoritative legal language suitable for a corporate handbook.
- Keep the document professional and ready for legal review.
- Return the policy in clean markdown format with proper headings.`,
            },
          ],
        },
      });
      if (res.error) {
        toast.error(res.error);
        setPolicy({
          title: policyType,
          content: `# ${policyType}\n\n> ⚠️ ${res.error}\n\nPlease check your AI configuration or try again later.`,
        });
      } else if (res.reply) {
        setPolicy({ title: policyType, content: res.reply });
      }
    } catch (e: any) {
      toast.error("Failed to generate policy: " + (e?.message || "Unknown error"));
    } finally {
      setGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    if (!policy || !policyRef.current) return;
    
    const element = policyRef.current;

    // Configure html2pdf
    const opt = {
      margin: 20,
      filename: `${policy.title.toLowerCase().replace(/\s+/g, '-')}-policy.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'px', format: [800, 1131], orientation: 'portrait' }
    };

    // Generate PDF
    try {
      const exporter = (html2pdf as any).default || html2pdf;
      await exporter().set(opt).from(element).save();
    } catch (err: any) {
      console.error("Policy export failed:", err);
      toast.error("Export failed: " + (err?.message || "Unknown error"));
    }
  };



  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto px-8 py-8">
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]">
            <FileText className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">Policy Builder</h1>
            <p className="text-xs text-foreground/55">AI-powered workplace policy generation · Namibian Labour Act compliant</p>
          </div>
        </div>

        {!policy ? (
          <div className="space-y-8">
            {/* Industry Selection */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <label className="mb-2 block text-sm font-bold text-[var(--brand-navy-deep)]">Select Industry Context</label>
              <p className="mb-4 text-xs text-foreground/50">Policies may vary based on industry-specific regulations and collective agreements.</p>
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-[var(--brand-gold)] focus:outline-none"
              >
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="space-y-6">
            {/* Template grid */}
            <div>
              <p className="text-sm font-semibold text-[var(--brand-navy-deep)] mb-3">Choose a policy template</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {POLICY_TEMPLATES.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setSelected(t); handleGenerate(t); }}
                    disabled={generating}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition hover:border-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/5 ${
                      selected === t ? "border-[var(--brand-gold)] bg-[var(--brand-gold)]/10 font-semibold text-[var(--brand-navy-deep)]" : "border-border bg-white text-foreground/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom input */}
            <div>
              <p className="text-sm font-semibold text-[var(--brand-navy-deep)] mb-2">Or describe a custom policy</p>
              <div className="flex gap-2">
                <input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="e.g. Whistleblower Protection Policy"
                  className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-[var(--brand-gold)] focus:outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") { setSelected(custom); handleGenerate(custom); } }}
                />
                <Button
                  onClick={() => { setSelected(custom); handleGenerate(custom); }}
                  disabled={!custom.trim() || generating}
                  className="bg-[var(--brand-gold)] text-white hover:brightness-110"
                >
                  <Sparkles className="size-4 mr-1" /> Generate
                </Button>
              </div>
            </div>

            {/* Generating state */}
            {generating && (
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card p-12">
                <Loader2 className="size-5 animate-spin text-[var(--brand-gold)]" />
                <p className="text-sm text-foreground/60">Generating <span className="font-semibold">{selected}</span>…</p>
              </div>
            )}
            </div>
          </div>
        ) : (
          /* Policy result */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-[var(--brand-gold)]" />
                <span className="text-xs font-semibold text-[var(--brand-gold)]">AI Generated</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPolicy(null)}>
                  Generate Another
                </Button>
                <Button size="sm" className="gap-2 bg-[var(--brand-navy)] text-white hover:brightness-110" onClick={handleExportPDF}>
                  <Download className="size-3.5" /> Export PDF
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8 shadow-[var(--shadow-panel)]">
              <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-[var(--brand-navy-deep)] prose-strong:text-[var(--brand-navy-deep)]">
                <ReactMarkdown>{policy.content}</ReactMarkdown>
              </div>
            </div>

            <p className="text-xs text-foreground/40 text-center">
              This policy is AI-generated and should be reviewed by qualified legal counsel before implementation.
            </p>
          </div>
        )}
      </main>

      {/* Hidden policy for PDF export */}
      {policy && (
        <div style={{ position: "absolute", left: "-9999px", top: 0, opacity: 1, pointerEvents: "none" }}>
          <PolicyTemplate 
            ref={policyRef}
            title={policy.title} 
            content={policy.content} 
          />
        </div>
      )}
    </div>
  );
}
