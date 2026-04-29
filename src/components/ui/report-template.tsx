import React from "react";
import { CaseSummary, ComplianceAuditResult, WorkforceInsight } from "@/lib/ai";
import namLaborisLogo from "@/assets/namlaboris-logo.jpg";

interface ReportTemplateProps {
  cases: CaseSummary[];
  audit: ComplianceAuditResult | null;
  insights: WorkforceInsight[];
}

export const ReportTemplate = React.forwardRef<HTMLDivElement, ReportTemplateProps>(
  ({ cases, audit, insights }, ref) => {
    const now = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        style={{
          padding: "40px",
          fontFamily: "'Inter', sans-serif",
          color: "#1e293b", // approx var(--brand-navy-deep)
          backgroundColor: "white",
          width: "800px", // fixed width for PDF rendering consistency
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #8b1a1a", paddingBottom: "20px", marginBottom: "30px" }}>
          <div>
            <img src={namLaborisLogo} alt="NamLaboris" style={{ height: "40px", marginBottom: "10px" }} />
            <h1 style={{ fontSize: "24px", margin: "0", fontWeight: 700, color: "#1e293b" }}>Labour Governance Report</h1>
            <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0" }}>Generated on {now}</p>
          </div>
          <div style={{ textAlign: "right", fontSize: "10px", color: "#888" }}>
            <p style={{ margin: "0" }}>CONFIDENTIAL</p>
            <p style={{ margin: "0" }}>For Internal Use Only</p>
          </div>
        </div>

        {/* Cases */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "18px", color: "#8b1a1a", borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Active Cases Overview</h2>
          {cases.map((c) => (
            <div key={c.caseId} style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f9f9fb", borderRadius: "8px", borderLeft: "4px solid #8b1a1a" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "14px", fontWeight: 600 }}>{c.title} <span style={{ fontSize: "10px", color: "#888", fontWeight: "normal" }}>({c.caseId})</span></h3>
                <span style={{ fontSize: "10px", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", backgroundColor: "#1e293b", color: "white" }}>{c.type.toUpperCase()}</span>
              </div>
              <p style={{ margin: "0 0 8px", fontSize: "12px", lineHeight: 1.5, color: "#444" }}>{c.summary}</p>
              <p style={{ margin: "0", fontSize: "11px", fontWeight: 600, color: "#8b1a1a" }}>Next Step: <span style={{ color: "#444", fontWeight: "normal" }}>{c.nextStep}</span></p>
            </div>
          ))}
        </section>

        {/* Compliance */}
        {audit && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "18px", color: "#8b1a1a", borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Compliance Audit Result</h2>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "36px", fontWeight: 700, color: audit.score >= 80 ? "#10b981" : audit.score >= 60 ? "#f59e0b" : "#ef4444", marginRight: "16px" }}>
                {audit.score}%
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>Overall Compliance Score</div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#1e293b", color: "white", textAlign: "left" }}>
                  <th style={{ padding: "8px" }}>Area</th>
                  <th style={{ padding: "8px" }}>Status</th>
                  <th style={{ padding: "8px" }}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {audit.findings.map((f, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px", fontWeight: 600 }}>{f.area}</td>
                    <td style={{ padding: "8px", color: f.status === "pass" ? "#10b981" : f.status === "warning" ? "#f59e0b" : "#ef4444", fontWeight: "bold", textTransform: "uppercase", fontSize: "10px" }}>{f.status}</td>
                    <td style={{ padding: "8px", color: "#444" }}>{f.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "12px", backgroundColor: "rgba(139, 26, 26, 0.05)", border: "1px solid #8b1a1a", borderRadius: "8px" }}>
              <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: "bold", color: "#8b1a1a" }}>AI Recommendation</p>
              <p style={{ margin: "0", fontSize: "12px", lineHeight: 1.5 }}>{audit.recommendation}</p>
            </div>
          </section>
        )}

        {/* Insights */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "18px", color: "#ceaa5f", borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "16px" }}>Workforce Insights</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {insights.map((ins, i) => (
              <div key={i} style={{ border: "1px solid #eee", borderRadius: "8px", padding: "12px" }}>
                <p style={{ margin: "0 0 4px", fontSize: "10px", textTransform: "uppercase", color: "#888", fontWeight: "bold" }}>{ins.metric}</p>
                <p style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>{ins.value}</p>
                <p style={{ margin: "0", fontSize: "11px", color: "#444", lineHeight: 1.4 }}>{ins.aiNote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{ marginTop: "60px", paddingTop: "20px", borderTop: "1px solid #eee", textAlign: "center", fontSize: "10px", color: "#888" }}>
          <p style={{ margin: "0 0 4px" }}>This report was generated automatically by NamLaboris AI and does not constitute formal legal advice.</p>
          <p style={{ margin: "0" }}>NamLaboris © {new Date().getFullYear()}</p>
        </div>
      </div>
    );
  }
);
ReportTemplate.displayName = "ReportTemplate";
