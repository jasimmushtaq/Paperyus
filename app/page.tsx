"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ControlPanel from "@/components/ControlPanel";
import PaperPreview from "@/components/PaperPreview";
import TemplatesModal from "@/components/TemplatesModal";
import { PaperSettings } from "@/types/paper";
import { defaultSettings } from "@/lib/paperSettings";
import { Template } from "@/lib/templates";
import { runPaperExport, type DownloadFormat } from "@/lib/paperExport";

function HomeContent() {
  const [settings, setSettings] = useState<PaperSettings>(defaultSettings);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState<string | undefined>(undefined);
  const [zoom, setZoom] = useState(0.8);
  const [exportBusy, setExportBusy] = useState(false);
  
  const searchParams = useSearchParams();
  const paperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (searchParams.get("templates") === "true") {
      setIsTemplatesOpen(true);
    }
  }, [searchParams]);

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    setSettings(template.settings);
    setActiveTemplateId(template.id);
    setIsTemplatesOpen(false);
  };

  const handleExportFormat = async (format: DownloadFormat) => {
    setExportBusy(true);
    try {
      await runPaperExport(format, paperRef, svgRef, settings);
    } finally {
      setExportBusy(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenTemplates={() => setIsTemplatesOpen(true)} />
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-4rem)]">
        {/* Left Control Panel */}
        <aside className="w-full md:w-[350px] lg:w-[400px] flex-shrink-0 z-10 shadow-xl">
          <ControlPanel
            settings={settings}
            setSettings={setSettings}
            onExportFormat={handleExportFormat}
            exportBusy={exportBusy}
          />
        </aside>

        {/* Right Preview Area */}
        <section className="flex-1 bg-slate-100 overflow-hidden relative">
          <PaperPreview
            settings={settings}
            paperRef={paperRef}
            svgRef={svgRef}
            zoom={zoom}
            setZoom={setZoom}
          />
        </section>
      </main>
      
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelect={handleSelectTemplate}
        currentTemplateId={activeTemplateId}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
