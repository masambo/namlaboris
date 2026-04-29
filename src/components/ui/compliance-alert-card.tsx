// src/components/ui/compliance-alert-card.tsx
import React from "react";

import { cn } from "@/lib/utils";

export interface Alert {
  id: string;
  message: string;
  severity: "low" | "medium" | "high";
}

interface Props {
  alerts: Alert[];
}

const severityColors: Record<Alert["severity"], string> = {
  low: "bg-green-500/10 text-green-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-red-500/10 text-red-500",
};

export const ComplianceAlertCard: React.FC<Props> = ({ alerts }) => {
  if (!alerts?.length) return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">Risk Status</p>
        <div className="size-2 rounded-full bg-emerald-500" />
      </div>
      <p className="mt-4 text-sm font-bold text-emerald-600">Fully Compliant</p>
    </div>
  );

  const highSeverityCount = alerts.filter(a => a.severity === 'high').length;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-red-500/30">
      <div className="flex items-center justify-between">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-foreground/50">Compliance Risk</p>
        <div className={cn("size-2 rounded-full animate-pulse", highSeverityCount > 0 ? "bg-red-500" : "bg-yellow-500")} />
      </div>
      <div className="mt-4">
        <p className={cn("text-xl font-bold", highSeverityCount > 0 ? "text-red-600" : "text-yellow-600")}>
          {alerts.length} Active {alerts.length === 1 ? 'Alert' : 'Alerts'}
        </p>
        <p className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">
          {highSeverityCount} Critical • {alerts.length - highSeverityCount} Moderate
        </p>
      </div>
    </div>
  );
};
