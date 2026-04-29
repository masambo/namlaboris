// src/components/ui/recommendation-panel.tsx
import React, { useEffect, useState } from "react";
import { analyzeCaseWithAI } from "@/lib/ai";
import { Loader2 } from "lucide-react";

interface Props {
  caseId: string;
  title: string;
  summary: string;
}

export const RecommendationPanel: React.FC<Props> = ({ caseId, title, summary }) => {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await analyzeCaseWithAI(title, summary);
      setAnalysis(result);
      setLoading(false);
    })();
  }, [caseId, title, summary]);

  if (loading) {
    return (
      <div className="mt-2 flex items-center gap-2 text-xs text-foreground/50">
        <Loader2 className="size-3.5 animate-spin" /> Generating AI analysis…
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-border bg-background p-3 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
      {analysis}
    </div>
  );
};
