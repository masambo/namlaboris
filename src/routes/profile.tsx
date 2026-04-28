import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Loader2, LogOut, Save, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | NamLaboris" },
      { name: "description", content: "Manage your NamLaboris profile, organization details, and account settings." },
    ],
  }),
  component: ProfilePage,
});

type Profile = {
  id: string;
  full_name: string | null;
  organization: string | null;
  role_title: string | null;
  avatar_url: string | null;
};

function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, organization, role_title, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (error) toast.error(error.message);
      if (data) {
        setProfile(data as Profile);
        setFullName(data.full_name ?? "");
        setOrganization(data.organization ?? "");
        setRoleTitle(data.role_title ?? "");
      }
      setFetching(false);
    })();
  }, [user]);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName.trim() || null,
        organization: organization.trim() || null,
        role_title: roleTitle.trim() || null,
      });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile updated");
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-foreground/50" />
      </div>
    );
  }

  const displayName = fullName || profile?.full_name || user.email || "Member";
  const initials = displayName
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="section-wrap flex items-center justify-between py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground">
            <ArrowLeft className="size-4" /> Home
          </Link>
          <Button variant="outline" size="sm" onClick={() => { signOut(); navigate({ to: "/" }); }}>
            <LogOut className="size-3.5" /> Sign out
          </Button>
        </div>
      </header>

      <main className="section-wrap py-12">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-[var(--brand-navy)] text-lg font-semibold text-white">
                {initials || <UserIcon className="size-6" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-3xl text-[var(--brand-navy-deep)]">{displayName}</h1>
              <p className="text-sm text-foreground/60">{user.email}</p>
            </div>
          </div>

          <form onSubmit={onSave} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-panel)]">
            <h2 className="font-display text-xl text-[var(--brand-navy-deep)]">Profile details</h2>

            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1.5"
                placeholder="Your full name"
                disabled={fetching}
              />
            </div>

            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="mt-1.5"
                placeholder="Company, firm or institution"
                disabled={fetching}
              />
            </div>

            <div>
              <Label htmlFor="roleTitle">Role / Title</Label>
              <Input
                id="roleTitle"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="mt-1.5"
                placeholder="HR Manager, Legal Counsel, etc."
                disabled={fetching}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="button" variant="outline" asChild>
                <Link to="/assistant">Open AI Assistant</Link>
              </Button>
              <Button type="submit" disabled={busy || fetching} className="bg-[var(--brand-gold)] text-white hover:brightness-110">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}