// src/components/ui/ai-summary-card.tsx
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecommendationPanel } from "@/components/ui/recommendation-panel";
import { Bot } from "lucide-react";

export interface AiSummaryProps {
  caseId: string;
  title: string;
  summary: string;
}

export const AiSummaryCard: React.FC<AiSummaryProps> = ({ caseId, title, summary }) => {
  const [showReco, setShowReco] = useState(false);
  return (
    <Card className="mb-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Bot className="size-4 mt-0.5 shrink-0 text-[var(--brand-gold)]" />
          <div>
            <h3 className="font-display text-sm font-semibold text-[var(--brand-navy-deep)]">{title}</h3>
            <p className="mt-1 text-xs text-foreground/70 leading-relaxed">{summary}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-fit text-xs" onClick={() => setShowReco((v) => !v)}>
          {showReco ? "Hide Analysis" : "AI Analysis"}
        </Button>
        {showReco && <RecommendationPanel caseId={caseId} title={title} summary={summary} />}
      </div>
    </Card>
  );
};
