import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Home, Scale, ShieldCheck, Bot, FileText, Calendar, GraduationCap, BookOpen, Briefcase, Search, TrendingUp, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import namLaborisLogo from "@/assets/namlaboris-logo.jpg";

const navItems = [
  { label: "Dashboard",    icon: Home,          to: "/dashboard", section: null },
  { label: "ADR Cases",    icon: Scale,         to: "/adr-cases", section: "CASES" },
  { label: "Compliance",   icon: ShieldCheck,   to: "/compliance", section: "CASES" },
  { label: "AI Assistant", icon: Bot,           to: "/assistant", section: "CASES" },
  { label: "Policy Builder",icon: FileText,     to: "/policy-builder", section: "CASES" },
  { label: "Calendar",     icon: Calendar,      to: "/calendar", section: "CASES" },
  { label: "Training Hub", icon: GraduationCap, to: "/training", section: "KNOWLEDGE" },
  { label: "Research",     icon: BookOpen,      to: "/research", section: "KNOWLEDGE" },
  { label: "Documents",    icon: Briefcase,     to: "/documents", section: "KNOWLEDGE" },
];

export const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const name = (user?.user_metadata?.full_name as string) || user?.email || "Member";
  const initials = name.split(/\s+/).map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  let currentSection = "";

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col bg-[#1a2332] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <img src={namLaborisLogo} alt="NamLaboris" className="h-9 w-auto rounded" />
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50">
          <Search className="size-3.5 shrink-0" />
          <span>Search cases…</span>
          <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">⌘K</span>
        </div>
      </div>

      {/* Resolution Rate badge */}
      <div className="mx-4 mt-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-[var(--brand-gold)] to-[#8b1a1a] px-4 py-3">
        <TrendingUp className="size-5 shrink-0 text-white" />
        <div>
          <p className="text-[0.6rem] font-bold uppercase tracking-widest text-white/70">Resolution Rate</p>
          <p className="font-display text-xl font-bold text-white">+24%</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const showSection = item.section && item.section !== currentSection;
          if (showSection) currentSection = item.section!;
          const Icon = item.icon;
          // Use activeOptions to match sub-paths if needed
          return (
            <div key={item.label}>
              {showSection && (
                <p className="mt-4 mb-1 px-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/35">
                  {item.section}
                </p>
              )}
              <Link
                to={item.to as any}
                activeProps={{
                  className: "bg-[var(--brand-gold)] text-white",
                }}
                inactiveProps={{
                  className: "text-white/65 hover:bg-white/8 hover:text-white",
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors"
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-[var(--brand-gold)] text-xs font-bold text-white">
              {initials || <UserIcon className="size-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{name}</p>
            <p className="truncate text-[0.65rem] text-white/45">{user?.email}</p>
          </div>
          <button onClick={handleSignOut} className="text-white/40 transition hover:text-white" title="Sign out">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
