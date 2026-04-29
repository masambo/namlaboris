import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { NamLaborisHomePage } from "@/components/namlaboris/homepage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NamLaboris | Labour Governance Platform" },
      {
        name: "description",
        content:
          "NamLaboris is a professional labour governance platform for AI legal guidance, compliance tools, ADR research, analytics, and training.",
      },
      { property: "og:title", content: "NamLaboris | Labour Governance Platform" },
      {
        property: "og:description",
        content:
          "Professional labour governance infrastructure for employers, HR practitioners, consultants, and institutions across Namibia and SADC.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return <NamLaborisHomePage />;
}
