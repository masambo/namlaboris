import React from "react";
import namLaborisLogo from "@/assets/namlaboris-logo.jpg";
import ReactMarkdown from "react-markdown";

interface PolicyTemplateProps {
  title: string;
  content: string;
}

export const PolicyTemplate = React.forwardRef<HTMLDivElement, PolicyTemplateProps>(
  ({ title, content }, ref) => {
    const now = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        style={{
          padding: "60px",
          fontFamily: "'Inter', sans-serif",
          color: "#1e293b",
          backgroundColor: "white",
          width: "800px",
          margin: "0 auto",
          lineHeight: 1.6,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #1e293b", paddingBottom: "20px", marginBottom: "40px" }}>
          <div>
            <img src={namLaborisLogo} alt="NamLaboris" style={{ height: "50px", marginBottom: "10px" }} />
          </div>
          <div style={{ textAlign: "right" }}>
            <h1 style={{ fontSize: "22px", margin: "0", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Workplace Policy</h1>
            <p style={{ fontSize: "12px", color: "#8b1a1a", fontWeight: "bold", margin: "4px 0 0" }}>{title}</p>
          </div>
        </div>

        {/* Policy Title Section */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>{title}</h2>
          <div style={{ width: "60px", height: "4px", backgroundColor: "#8b1a1a", margin: "0 auto" }}></div>
        </div>

        {/* Policy Content */}
        <div style={{ fontSize: "13px", color: "#333", textAlign: "justify" }}>
          <div className="prose prose-sm max-w-none">
            {/* We use a simple markdown parser or just render it cleanly. 
                Since this is for a PDF, we'll rely on the parent's markdown rendering if possible, 
                but for a standalone template, we'll use ReactMarkdown. */}
            <ReactMarkdown 
              components={{
                h1: ({node, ...props}) => <h1 style={{fontSize: '18px', color: '#1e293b', marginTop: '24px', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '4px'}} {...props} />,
                h2: ({node, ...props}) => <h2 style={{fontSize: '16px', color: '#1e293b', marginTop: '20px', marginBottom: '10px'}} {...props} />,
                h3: ({node, ...props}) => <h3 style={{fontSize: '14px', color: '#1e293b', marginTop: '16px', marginBottom: '8px'}} {...props} />,
                p: ({node, ...props}) => <p style={{marginBottom: '12px'}} {...props} />,
                ul: ({node, ...props}) => <ul style={{paddingLeft: '20px', marginBottom: '12px'}} {...props} />,
                li: ({node, ...props}) => <li style={{marginBottom: '6px'}} {...props} />,
                strong: ({node, ...props}) => <strong style={{color: '#1e293b', fontWeight: 700}} {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Signatures Area */}
        <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: "1px", backgroundColor: "#ccc", marginBottom: "10px" }}></div>
              <p style={{ fontSize: "10px", fontWeight: "bold", margin: "0" }}>Company Representative</p>
              <p style={{ fontSize: "9px", color: "#888", margin: "0" }}>Date: ____________________</p>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: "1px", backgroundColor: "#ccc", marginBottom: "10px" }}></div>
              <p style={{ fontSize: "10px", fontWeight: "bold", margin: "0" }}>Employee / Union Representative</p>
              <p style={{ fontSize: "9px", color: "#888", margin: "0" }}>Date: ____________________</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "60px", textAlign: "center", fontSize: "9px", color: "#aaa" }}>
          <p style={{ margin: "0 0 4px" }}>This policy was drafted with the assistance of NamLaboris AI and is aligned with the Namibian Labour Act, 2007.</p>
          <p style={{ margin: "0" }}>NamLaboris © {new Date().getFullYear()} | Generated on {now}</p>
        </div>
      </div>
    );
  }
);
PolicyTemplate.displayName = "PolicyTemplate";
