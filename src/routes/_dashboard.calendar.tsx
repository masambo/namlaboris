import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Calendar as CalIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_dashboard/calendar")({
  head: () => ({ meta: [{ title: "Calendar | NamLaboris" }] }),
  component: CalendarPage,
});

const events = [
  { date: "2026-04-30", time: "10:00", title: "Smith vs. XYZ Ltd. — Disciplinary Hearing", type: "Hearing", color: "border-l-red-500" },
  { date: "2026-05-01", time: "14:00", title: "Nampower Arbitration — Wage Dispute", type: "Arbitration", color: "border-l-orange-500" },
  { date: "2026-05-02", time: "09:00", title: "Minister vs. Nakale — Grievance Review", type: "Grievance", color: "border-l-emerald-500" },
  { date: "2026-05-05", time: "11:00", title: "Coastal Fisheries — Retrenchment Consultation", type: "Consultation", color: "border-l-blue-500" },
  { date: "2026-05-08", time: "15:00", title: "OHS Committee Meeting", type: "Internal", color: "border-l-purple-500" },
  { date: "2026-05-12", time: "09:30", title: "Disciplinary Hearing Training — Session 3", type: "Training", color: "border-l-[var(--brand-gold)]" },
];

function CalendarPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);
  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-[var(--brand-gold)]" /></div>;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]"><CalIcon className="size-5" /></span>
          <h1 className="font-display text-2xl text-[var(--brand-navy-deep)]">Calendar</h1>
        </div>
        <div className="space-y-3">
          {events.map((e) => (
            <div key={e.title} className={`rounded-xl border border-border ${e.color} border-l-4 bg-card px-5 py-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-navy-deep)]">{e.title}</p>
                  <p className="text-xs text-foreground/50 mt-0.5">{new Date(e.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} · {e.time}</p>
                </div>
                <span className="rounded-full bg-[var(--brand-navy)]/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase text-[var(--brand-navy-deep)]">{e.type}</span>
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}
