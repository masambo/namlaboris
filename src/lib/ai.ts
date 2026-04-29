// src/lib/ai.ts
// AI utility layer — wraps the existing chatWithAssistant server function
// for all dashboard AI features.

import { chatWithAssistant } from "@/server/ai";
import { stripMarkdown } from "@/lib/utils";

/* ─── Types ─── */

export interface CaseSummary {
  caseId: string;
  type: string;
  title: string;
  status: "open" | "in-progress" | "resolved";
  summary: string;
  urgency: "low" | "medium" | "high";
  nextStep: string;
}

export interface ComplianceAlert {
  id: string;
  message: string;
  severity: "low" | "medium" | "high";
  category: string;
}

export interface PolicyDraft {
  title: string;
  content: string;
  generatedAt: string;
}

export interface WorkforceInsight {
  metric: string;
  value: string;
  trend: "up" | "down" | "stable";
  aiNote: string;
}

export interface ComplianceAuditResult {
  score: number;
  findings: { area: string; status: "pass" | "warning" | "fail"; detail: string }[];
  recommendation: string;
}

/* ─── AI Chat helper (reuses existing server function) ─── */

async function aiChat(prompt: string): Promise<string> {
  try {
    const res = await chatWithAssistant({
      data: {
        messages: [{ role: "user", content: prompt }],
      },
    });
    if (res.reply) return res.reply;
    if (res.error) {
      console.warn("AI response error:", res.error);
    }
    return "";
  } catch (err) {
    console.error("aiChat failed:", err);
    return "";
  }
}

/* ─── 1. Case Summaries (ADR Case Support) ─── */

const MOCK_CASES: CaseSummary[] = [
  {
    caseId: "ADR-2026-041",
    type: "Disciplinary",
    title: "Smith vs. XYZ Mining Ltd.",
    status: "in-progress",
    summary: "Employee dismissed for alleged gross misconduct (unauthorized absence). Hearing scheduled. Employee claims medical emergency — documentation pending.",
    urgency: "high",
    nextStep: "Request medical records from employee before hearing date.",
  },
  {
    caseId: "ADR-2026-038",
    type: "Arbitration",
    title: "Nampower Arbitration — Wage Dispute",
    status: "open",
    summary: "Union representing 120 employees disputes the 3.5% wage increase. Conciliation at OLC failed. Matter referred to arbitration under Section 86.",
    urgency: "medium",
    nextStep: "Prepare arbitration bundle with wage benchmarking data.",
  },
  {
    caseId: "ADR-2026-035",
    type: "Grievance",
    title: "Minister vs. Nakale — Unfair Labour Practice",
    status: "in-progress",
    summary: "Employee alleges unfair labour practice under Section 50: denied promotion despite seniority and qualifications. Internal grievance procedure completed.",
    urgency: "medium",
    nextStep: "Review promotion criteria documentation and interview panel records.",
  },
  {
    caseId: "ADR-2026-029",
    type: "Retrenchment",
    title: "Coastal Fisheries — Operational Restructure",
    status: "open",
    summary: "Company restructuring due to reduced catch quotas. 45 positions affected. Section 34 consultation process initiated with union.",
    urgency: "high",
    nextStep: "Issue Section 34(1) notice and schedule first consultation meeting.",
  },
];

export async function fetchCaseSummaries(): Promise<CaseSummary[]> {
  // Try AI-enhanced summaries
  const aiResponse = await aiChat(
    "Generate a brief 2-sentence AI analysis for each of these Namibian labour cases: 1) Disciplinary hearing for unauthorized absence, 2) Wage dispute arbitration for 120 employees, 3) Unfair labour practice grievance about denied promotion, 4) Retrenchment of 45 positions. Format as JSON array with fields: caseIndex (0-3), aiNote (string)."
  );

  if (aiResponse) {
    try {
      // Try to parse AI notes and merge with mock cases
      const parsed = JSON.parse(aiResponse.match(/\[[\s\S]*\]/)?.[0] || "[]");
      return MOCK_CASES.map((c, i) => {
        const note = parsed.find((p: any) => p.caseIndex === i);
        return note ? { ...c, summary: c.summary + " " + stripMarkdown(note.aiNote) } : c;
      });
    } catch {
      // AI responded but not parseable — return mock
    }
  }
  return MOCK_CASES;
}

/* ─── 2. AI Case Analysis (inline AI for any case) ─── */

export async function analyzeCaseWithAI(caseTitle: string, caseSummary: string): Promise<string> {
  const response = await aiChat(
    `You are a Namibian labour law expert. Analyze this case and provide practical recommendations:\n\nCase: ${caseTitle}\nDetails: ${caseSummary}\n\nProvide:\n1. Legal basis (cite Labour Act sections)\n2. Key risks\n3. Recommended next steps\n4. Timeline estimate\n\nKeep it concise (max 200 words).`
  );
  return stripMarkdown(response) || "AI analysis is currently unavailable. Please try again later or consult the AI Assistant for detailed guidance.";
}

/* ─── 3. Compliance Audit ─── */

const MOCK_AUDIT: ComplianceAuditResult = {
  score: 78,
  findings: [
    { area: "Employment Contracts", status: "pass", detail: "All contracts comply with Section 8 requirements." },
    { area: "Disciplinary Code", status: "warning", detail: "Code of conduct last updated 18 months ago — review recommended." },
    { area: "Leave Records", status: "pass", detail: "Annual and sick leave tracking compliant with Section 23–25." },
    { area: "Health & Safety", status: "fail", detail: "No OHS committee established — required under Reg. 156." },
    { area: "Employment Equity", status: "warning", detail: "Affirmative Action report due in 60 days — not yet started." },
    { area: "Wage Compliance", status: "pass", detail: "Minimum wage and overtime payments verified compliant." },
  ],
  recommendation: "Establish an OHS committee immediately and begin the Affirmative Action report. Schedule disciplinary code review within 30 days.",
};

export async function runComplianceAudit(companyType?: string): Promise<ComplianceAuditResult> {
  const aiResponse = await aiChat(
    `You are a Namibian labour compliance auditor. Given a ${companyType || "medium-sized"} company, provide a compliance audit recommendation in 2–3 sentences covering the most critical areas under the Labour Act 2007. Focus on practical, actionable advice.`
  );
  if (aiResponse) {
    return { ...MOCK_AUDIT, recommendation: stripMarkdown(aiResponse) };
  }
  return MOCK_AUDIT;
}

/* ─── 4. Compliance Alerts ─── */

export async function fetchComplianceAlerts(): Promise<ComplianceAlert[]> {
  return [
    { id: "1", message: "OHS committee not established — required under Regulations", severity: "high", category: "Health & Safety" },
    { id: "2", message: "Affirmative Action report due in 60 days", severity: "medium", category: "Employment Equity" },
    { id: "3", message: "3 employment contracts expire next month — renew or terminate", severity: "medium", category: "Contracts" },
    { id: "4", message: "Disciplinary code review overdue by 6 months", severity: "low", category: "Policy" },
  ];
}

/* ─── 5. Policy Builder ─── */

export async function generatePolicy(policyType: string): Promise<PolicyDraft> {
  const response = await aiChat(
    `You are a Namibian HR policy expert. Draft a concise, professional workplace policy for: "${policyType}". \n\nRequirements:\n- Align with the Namibian Labour Act (No. 11 of 2007)\n- Include: Purpose, Scope, Policy Statement, Procedures, Responsibilities\n- Use clear, formal language suitable for a company handbook\n- Keep under 500 words\n\nReturn the policy in markdown format.`
  );

  return {
    title: policyType,
    content: response || `# ${policyType}\n\n*AI policy generation is currently unavailable. Please try again later or use the AI Assistant for detailed guidance.*\n\n## Purpose\nThis policy establishes guidelines for ${policyType.toLowerCase()} in compliance with the Namibian Labour Act (No. 11 of 2007).\n\n## Scope\nThis policy applies to all employees, contractors, and management within the organization.\n\n## Policy Statement\n[Policy details will be generated by AI when available]\n\n## Procedures\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\n## Responsibilities\n- **Management**: Ensure compliance and enforcement\n- **HR Department**: Administer and update this policy\n- **Employees**: Adhere to all provisions`,
    generatedAt: new Date().toISOString(),
  };
}

/* ─── 6. Workforce Insights ─── */

export async function fetchWorkforceInsights(): Promise<WorkforceInsight[]> {
  const insights: WorkforceInsight[] = [
    { metric: "Dispute Resolution Rate", value: "87%", trend: "up", aiNote: "Resolution rate improved 12% this quarter. Conciliation success driving the increase." },
    { metric: "Average Case Duration", value: "23 days", trend: "down", aiNote: "Faster than the 30-day SADC benchmark. Early intervention strategy is working." },
    { metric: "Employee Grievances", value: "14", trend: "up", aiNote: "Grievances up from 9 last month. Majority relate to overtime pay — investigate compliance." },
    { metric: "Compliance Score", value: "78%", trend: "stable", aiNote: "Score held steady. OHS and Employment Equity areas need attention to improve." },
    { metric: "Training Completion", value: "62%", trend: "up", aiNote: "Completion up 8% since mandatory hearing training was introduced." },
    { metric: "Retrenchment Risk Index", value: "Low", trend: "stable", aiNote: "No major restructuring signals detected. Monitor quarterly revenue trends." },
  ];

  // Try to get AI-enhanced insights
  const aiResponse = await aiChat(
    "You are a workforce analytics AI. Given these metrics for a Namibian company — 87% dispute resolution rate, 23-day avg case duration, 14 grievances this month, 78% compliance score — provide a 2-sentence executive summary of the workforce health and one key recommendation."
  );

  if (aiResponse) {
    insights[0].aiNote = stripMarkdown(aiResponse);
  }
  return insights;
}

/* ─── 7. Export Report ─── */

export async function exportReport(
  cases: CaseSummary[],
  audit: ComplianceAuditResult | null,
  insights: WorkforceInsight[]
): Promise<string> {
  const now = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let report = `NAMLABORIS — LABOUR GOVERNANCE REPORT\nGenerated: ${now}\n${"=".repeat(50)}\n\n`;

  // Cases section
  report += "ACTIVE CASES\n" + "-".repeat(30) + "\n";
  cases.forEach((c) => {
    report += `\n[${c.caseId}] ${c.title}\nType: ${c.type} | Status: ${c.status} | Urgency: ${c.urgency}\nSummary: ${c.summary}\nNext Step: ${c.nextStep}\n`;
  });

  // Compliance section
  if (audit) {
    report += "\n\nCOMPLIANCE AUDIT\n" + "-".repeat(30) + "\n";
    report += `Overall Score: ${audit.score}%\n\n`;
    audit.findings.forEach((f) => {
      report += `[${f.status.toUpperCase()}] ${f.area}: ${f.detail}\n`;
    });
    report += `\nRecommendation: ${audit.recommendation}\n`;
  }

  // Insights section
  report += "\n\nWORKFORCE INSIGHTS\n" + "-".repeat(30) + "\n";
  insights.forEach((ins) => {
    report += `${ins.metric}: ${ins.value} (${ins.trend})\n  → ${ins.aiNote}\n`;
  });

  report += `\n${"=".repeat(50)}\nDisclaimer: This report is for informational purposes only and does not constitute legal advice.\n`;

  const blob = new Blob([report], { type: "text/plain" });
  return URL.createObjectURL(blob);
}

/* ─── 8. Live AI Tips ─── */

export function subscribeLiveTips(callback: (tip: string) => void): () => void {
  const tips = [
    "3 cases flagged as high urgency — review before end of day.",
    "OHS committee establishment overdue — compliance risk detected.",
    "Affirmative Action report deadline approaching in 60 days.",
    "Wage dispute arbitration bundle preparation should begin this week.",
    "Section 34 retrenchment consultation requires union notification.",
    "Employment contracts expiring next month — 3 renewals needed.",
    "Disciplinary code hasn't been reviewed in 18 months.",
    "Training completion rate improving — consider expanding program.",
  ];

  let index = 0;

  // Emit first tip immediately
  setTimeout(() => {
    callback(tips[0]);
    index = 1;
  }, 2000);

  // Then rotate every 15 seconds
  const interval = setInterval(() => {
    callback(tips[index % tips.length]);
    index++;
  }, 15000);

  return () => clearInterval(interval);
}
