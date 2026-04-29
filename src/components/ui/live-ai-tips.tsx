// src/components/ui/live-ai-tips.tsx
import React, { useEffect, useState } from "react";
import { subscribeLiveTips } from "@/lib/ai";

export const LiveAiTips: React.FC = () => {
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeLiveTips((tip) => {
      setTips((prev) => [...prev, tip]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!tips.length) return null;

  return (
    <div className="mt-4 space-y-2 rounded-xl border border-[var(--brand-gold)]/25 bg-[var(--brand-gold)]/8 px-3 py-2.5">
      <p className="text-xs font-semibold text-[var(--brand-gold)] mb-1">Live AI Tips</p>
      <ul className="list-disc list-inside text-xs text-foreground/70">
        {tips.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
};
