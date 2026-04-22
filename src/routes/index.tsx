import { createFileRoute } from "@tanstack/react-router";

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
  return <NamLaborisHomePage />;
}
