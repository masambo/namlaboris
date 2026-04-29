// src/components/ui/export-button.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
// @ts-ignore
import html2pdf from "html2pdf.js";

export const ExportButton: React.FC<{ reportRef?: React.RefObject<HTMLDivElement> }> = ({ reportRef }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const element = reportRef?.current;
      if (!element) {
        throw new Error("Export target not found");
      }

      // Configure html2pdf
      const opt = {
        margin: 10,
        filename: 'namlaboris-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          logging: true,
          width: 800,
          windowWidth: 800,
        },
        jsPDF: { unit: 'px', format: [800, 1131], orientation: 'portrait' }
      };

      // Generate PDF
      const exporter = (html2pdf as any).default || html2pdf;
      await exporter().set(opt).from(element).save();

    } catch (err: any) {
      console.error("PDF export failed:", err);
      toast.error("Export failed: " + (err?.message || "Unknown error"));
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button size="sm" className="gap-2 bg-[var(--brand-navy)] text-white hover:brightness-110" onClick={handleExport} disabled={exporting}>
      {exporting ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5" />}
      {exporting ? "Generating PDF…" : "Export PDF"}
    </Button>
  );
};
